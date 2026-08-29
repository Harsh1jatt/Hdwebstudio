/**
 * HD Web Studios — Central AI Engine Dispatcher
 *
 * Coordinates: Task Dispatcher -> Context Builder -> Prompt Builder -> Provider -> Validation -> Audit Log
 */

import mongoose from "mongoose";
import { slugify } from "../slugify.js";
import { callAiProvider } from "./provider.js";
import { getBrandMemory } from "./context/brandMemory.js";
import {
  getRelevantServices,
  getRelevantBlogs,
  getRelevantProjects,
  getRelevantFAQs,
  getPublishedPagesIndex,
} from "./context/dbRetriever.js";
import { buildSystemPrompt } from "./prompts/system.js";
import { buildServicePrompt } from "./prompts/service.js";
import {
  buildBlogPrompt,
  buildBlogOutlinePrompt,
  buildBlogFromOutlinePrompt,
} from "./prompts/blog.js";
import { buildProjectPrompt } from "./prompts/project.js";
import { buildFaqPrompt } from "./prompts/faq.js";
import { buildImprovementPrompt } from "./prompts/improvement.js";
import { buildSectionRegenerationPrompt } from "./prompts/section.js";
import { buildReviewerPrompt } from "./prompts/reviewer.js";
import { buildSeoMetadataPrompt, buildKeywordAnalysisPrompt } from "./prompts/seo.js";
import AiActionLog from "../../models/AiActionLog.js";

/**
 * Defensive JSON parser that strips markdown code blocks and trailing commas.
 */
export function extractAndParseJson(text) {
  if (typeof text !== "string") return text;
  let clean = text.trim();

  // Strip ```json and ``` code blocks
  if (clean.startsWith("```")) {
    clean = clean.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  }

  // Find opening and closing brackets if surrounded by extraneous text
  const firstBrace = clean.indexOf("{");
  const firstBracket = clean.indexOf("[");

  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    const lastBrace = clean.lastIndexOf("}");
    if (lastBrace !== -1 && lastBrace > firstBrace) {
      clean = clean.slice(firstBrace, lastBrace + 1);
    }
  } else if (firstBracket !== -1) {
    const lastBracket = clean.lastIndexOf("]");
    if (lastBracket !== -1 && lastBracket > firstBracket) {
      clean = clean.slice(firstBracket, lastBracket + 1);
    }
  }

  // Attempt direct parse
  try {
    return JSON.parse(clean);
  } catch (err) {
    // Attempt minor repair: remove trailing commas before } or ]
    const repaired = clean.replace(/,\s*([}\]])/g, "$1");
    try {
      return JSON.parse(repaired);
    } catch {
      throw new Error(`Failed to parse structured JSON from AI output: ${err.message}`);
    }
  }
}

/**
 * Record action to audit log safely.
 */
async function logAiAction({ adminId, adminName, task, entityType, entityTitle, prompt, status, summary, details, error }) {
  try {
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      return;
    }
    await AiActionLog.create({
      adminId: adminId || "admin",
      adminName: adminName || "Admin",
      prompt: prompt ? String(prompt).slice(0, 500) : task,
      action: task,
      tool: `ai_${task}`,
      entityType: entityType || "system",
      entitySlug: entityTitle ? String(entityTitle).slice(0, 100) : "",
      status: status || "completed",
      summary: summary || `Executed AI task: ${task}`,
      details: details || {},
      error: error ? String(error) : "",
    });
  } catch (e) {
    console.warn("[AiEngine] Audit log notice:", e.message);
  }
}

/**
 * Intelligently extracts clean service title and separates user brief.
 */
function parseServiceInput(input = {}) {
  const raw = (input.serviceName || input.title || input.prompt || "").trim();
  let cleanName = raw;
  let targetAudience = (input.targetAudience || "").trim();
  let location = (input.location || "").trim();
  let businessGoal = (input.businessGoal || "").trim();
  let specialInstructions = (input.specialInstructions || "").trim();

  // If user entered a full command/brief (e.g. "Generate a Local SEO Services page for small businesses in Ludhiana...")
  if (/^(?:generate|create|write|build|make)\s+/i.test(raw) || raw.length > 40) {
    if (!specialInstructions || !specialInstructions.includes(raw)) {
      specialInstructions = specialInstructions ? `${raw}\n\n${specialInstructions}` : raw;
    }

    // Try extracting specific service name from text
    const match = raw.match(/^(?:generate|create|build|write|make)\s+(?:a\s+)?(?:new\s+)?(.+?)(?:\s+page|\s+service|\s+for|\s+in|\.|$)/i);
    if (match && match[1]) {
      let candidate = match[1].trim().replace(/(?:page|service|services)$/i, "").trim();
      if (candidate.length >= 3 && candidate.length <= 40) {
        cleanName = `${candidate} Services`;
      }
    }

    // Extract location if present in text
    if (!location) {
      const locMatch = raw.match(/\bin\s+([A-Z][a-zA-Z\s,]+?)(?:\.|\s+focus|\s+for|\s+avoid|$)/i);
      if (locMatch) location = locMatch[1].trim();
    }

    // Extract audience if present in text
    if (!targetAudience) {
      const audMatch = raw.match(/\bfor\s+([a-zA-Z\s]+?)(?:\s+in|\.|\s+focus|\s+avoid|$)/i);
      if (audMatch) targetAudience = audMatch[1].trim();
    }
  }

  // Clean candidate name of any command verbs or preambles
  cleanName = cleanName
    .replace(/^(?:generate|create|build|write|make)\s+(?:a\s+)?(?:new\s+)?/i, "")
    .replace(/\s+page.*$/i, "")
    .replace(/\s+for\s+.*$/i, "")
    .replace(/[":{}]+/g, "")
    .trim();

  if (!cleanName || cleanName.length < 3 || cleanName.length > 50) {
    if (/\b(?:local seo|seo|maps|google business profile)\b/i.test(raw)) {
      cleanName = "Local SEO Services";
    } else if (/\b(?:google ads|ads|ppc|paid search)\b/i.test(raw)) {
      cleanName = "Google Ads Management";
    } else if (/\b(?:ecommerce|shop|store)\b/i.test(raw)) {
      cleanName = "E-Commerce Development";
    } else {
      cleanName = "Business Web Development";
    }
  }

  return {
    cleanServiceName: cleanName,
    targetAudience,
    location,
    businessGoal,
    specialInstructions,
  };
}

/**
 * Validates that output is strictly a Service CMS schema and normalizes all fields.
 */
function validateAndNormalizeServiceOutput(data, requestedServiceName) {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid output: Expected a JSON object.");
  }

  // Reject accidental blog/article schema
  if (data.readingTime !== undefined || data.contentFormat !== undefined || (data.content && !data.whatYouGet && !data.overview)) {
    throw new Error("Output failed validation: Model returned blog article schema instead of Service CMS schema.");
  }

  // System instruction leak detection
  const leakedStrings = [
    "you are the ai",
    "agency operating system",
    "lead content strategist",
    "task: generate",
    "avoid guaranteed",
    "write naturally",
  ];

  const checkText = `${data.title || ""} ${data.eyebrow || ""} ${data.slug || ""} ${data.tagline || ""}`.toLowerCase();
  for (const leaked of leakedStrings) {
    if (checkText.includes(leaked)) {
      throw new Error(`Output failed validation: Detected leaked instruction phrase ("${leaked}").`);
    }
  }

  const cleanName = requestedServiceName || "Web Development";
  let title = (data.title || data.heroTitle || cleanName).trim();
  if (title.length > 90 || /^(?:generate|task:|create)/i.test(title)) {
    title = `${cleanName} for Growing Businesses`;
  }

  let eyebrow = (data.eyebrow || cleanName).trim();
  if (eyebrow.length > 40 || /^(?:generate|task:|create)/i.test(eyebrow)) {
    eyebrow = cleanName;
  }

  let slug = (data.slug || slugify(cleanName)).toLowerCase().trim();
  if (slug.length > 60 || slug.includes("generate-") || slug.includes("task-")) {
    slug = slugify(cleanName);
  }

  const description = (data.description || data.fullDescription || "").trim();
  const shortDescription = (data.shortDescription || description.slice(0, 160)).trim();
  const tagline = (data.tagline || `High-performance ${cleanName.toLowerCase()} engineered for commercial growth.`).trim();
  const category = data.category || (/\b(?:seo|maps|google ads|growth)\b/i.test(cleanName) ? "SEO & Growth" : "Web Development");
  const accent = data.accent || data.accentColor || (category === "SEO & Growth" ? "orange" : category === "E-Commerce" ? "emerald" : "blue");

  // Normalize overview structure
  let overview = {
    heading: `Strategic ${cleanName} Engineered for Real Business Results`,
    paragraphs: [],
    highlights: [],
  };

  if (data.overview && typeof data.overview === "object") {
    overview.heading = data.overview.heading || data.overviewHeading || overview.heading;
    overview.paragraphs = Array.isArray(data.overview.paragraphs)
      ? data.overview.paragraphs
      : Array.isArray(data.overviewParagraphs)
      ? data.overviewParagraphs
      : [description || `Professional ${cleanName.toLowerCase()} solutions tailored to your market.`];
    overview.highlights = Array.isArray(data.overview.highlights)
      ? data.overview.highlights
      : Array.isArray(data.overviewHighlights)
      ? data.overviewHighlights
      : [];
  } else {
    overview.heading = data.overviewHeading || overview.heading;
    overview.paragraphs = Array.isArray(data.overviewParagraphs) ? data.overviewParagraphs : [description];
    overview.highlights = Array.isArray(data.overviewHighlights) ? data.overviewHighlights : [];
  }

  // Normalize whatYouGet deliverables
  const whatYouGet = Array.isArray(data.whatYouGet)
    ? data.whatYouGet
    : Array.isArray(data.deliverables)
    ? data.deliverables
    : [];

  if (whatYouGet.length === 0) {
    throw new Error("Output failed validation: Service deliverables ('whatYouGet') array is missing.");
  }

  // Normalize FAQ
  const faq = Array.isArray(data.faq)
    ? data.faq
    : Array.isArray(data.faqs)
    ? data.faqs.map((f) => ({ q: f.q || f.question || "FAQ Question", a: f.a || f.answer || "FAQ Answer" }))
    : [];

  // Normalize heroStats
  const heroStats = Array.isArray(data.heroStats) && data.heroStats.length > 0
    ? data.heroStats
    : [
        { label: "Turnaround", value: "7–14 Days" },
        { label: "Execution", value: "100% Bespoke" },
        { label: "Acquisition", value: "Calls & WA" },
      ];

  return {
    slug: slugify(slug),
    icon: data.icon || "Globe",
    eyebrow,
    title,
    tagline,
    shortDescription,
    description: description || tagline,
    category,
    accent,
    order: Number(data.order) || 0,
    published: true,
    heroStats,
    overview,
    whatYouGet,
    faq,
    seoTitle: data.seoTitle || `${title} | HD Web Studios`,
    seoDescription: data.seoDescription || shortDescription.slice(0, 155),
    ogImage: data.ogImage || "/images/og-services.jpg",
  };
}

/**
 * Master AI Task Dispatcher
 *
 * @param {Object} request
 * @param {string} request.task - AI task identifier
 * @param {Object} request.input - Task input payload
 * @param {Object} [request.options] - Provider / model overrides
 * @param {Object} [request.adminContext] - Authenticated admin details
 * @returns {Promise<{ success: boolean, data?: any, error?: string, provider?: string, model?: string }>}
 */
export async function executeAiTask({ task, input = {}, options = {}, adminContext = {} }) {
  const brandMemory = await getBrandMemory();
  const systemInstruction = buildSystemPrompt(brandMemory);

  const startTime = Date.now();
  let result = null;
  let entityType = "system";
  let entityTitle = "";

  try {
    switch (task) {
      // ─── 1. Generate Service ───
      case "generate_service": {
        entityType = "service";
        const parsedInput = parseServiceInput(input);
        entityTitle = parsedInput.cleanServiceName;

        const existingServices = await getRelevantServices({ limit: 6, query: entityTitle });
        const prompt = buildServicePrompt({
          serviceName: parsedInput.cleanServiceName,
          targetAudience: parsedInput.targetAudience,
          location: parsedInput.location,
          businessGoal: parsedInput.businessGoal,
          specialInstructions: parsedInput.specialInstructions,
          existingServices,
          brandMemory,
        });

        let aiRes = await callAiProvider({
          prompt,
          systemInstruction,
          jsonMode: true,
          contentType: "service",
          temperature: options.temperature ?? 0.6,
          model: options.model,
          provider: options.provider,
        });

        let parsedJson = extractAndParseJson(aiRes.text);
        let normalizedContent = null;

        try {
          normalizedContent = validateAndNormalizeServiceOutput(parsedJson, parsedInput.cleanServiceName);
        } catch (valErr) {
          console.warn("[AiEngine] Service validation warning, executing corrective retry:", valErr.message);

          // Corrective retry with strict schema enforcement
          const retryPrompt = `${prompt}\n\nCRITICAL SCHEMA CORRECTION: Your previous output failed schema validation (${valErr.message}). Return strictly the Service CMS JSON schema with: slug, icon, eyebrow, title, tagline, shortDescription, description, category, accent, heroStats, overview, whatYouGet, faq, seoTitle, seoDescription. Do NOT output blog fields or prompt instructions.`;

          aiRes = await callAiProvider({
            prompt: retryPrompt,
            systemInstruction,
            jsonMode: true,
            contentType: "service",
            temperature: 0.3,
            model: options.model,
            provider: options.provider,
          });

          parsedJson = extractAndParseJson(aiRes.text);
          normalizedContent = validateAndNormalizeServiceOutput(parsedJson, parsedInput.cleanServiceName);
        }

        result = {
          content: normalizedContent,
          provider: aiRes.provider,
          model: aiRes.model,
        };
        break;
      }

      // ─── 2. Regenerate Service Section ───
      case "regenerate_service_section": {
        entityType = "service";
        entityTitle = input.serviceName || input.title || "Service Section";
        const sectionType = input.sectionType || "overview";

        const prompt = buildSectionRegenerationPrompt({
          sectionType,
          entityType: "service",
          entityTitle,
          currentSectionData: input.currentSectionData,
          fullDocumentContext: input.fullDocumentContext || {},
          userInstructions: input.instructions || input.prompt || "",
          brandMemory,
        });

        const jsonMode = !["intro", "conclusion"].includes(sectionType);
        const aiRes = await callAiProvider({
          prompt,
          systemInstruction,
          jsonMode,
          contentType: "service",
          temperature: options.temperature ?? 0.7,
        });

        const content = jsonMode ? extractAndParseJson(aiRes.text) : aiRes.text;
        result = {
          sectionType,
          content,
          provider: aiRes.provider,
          model: aiRes.model,
        };
        break;
      }

      // ─── 3. Generate Blog ───
      case "generate_blog": {
        entityType = "blog";
        entityTitle = input.topic || input.title || input.prompt || "New Blog Post";

        const [existingServices, existingBlogs] = await Promise.all([
          getRelevantServices({ limit: 4 }),
          getRelevantBlogs({ limit: 4, query: entityTitle }),
        ]);

        const prompt = buildBlogPrompt({
          topic: entityTitle,
          focusKeyword: input.focusKeyword,
          secondaryKeywords: input.secondaryKeywords || [],
          targetAudience: input.targetAudience,
          location: input.location,
          searchIntent: input.searchIntent,
          tone: input.tone,
          specialInstructions: input.specialInstructions || input.prompt,
          existingServices,
          existingBlogs,
          brandMemory,
        });

        const aiRes = await callAiProvider({
          prompt,
          systemInstruction,
          jsonMode: true,
          contentType: "blog",
          temperature: options.temperature ?? 0.7,
          model: options.model,
          provider: options.provider,
        });

        const parsed = extractAndParseJson(aiRes.text);
        result = {
          content: parsed,
          provider: aiRes.provider,
          model: aiRes.model,
        };
        break;
      }

      // ─── 4. Generate Blog Outline ───
      case "generate_blog_outline": {
        entityType = "blog";
        entityTitle = input.topic || input.title || "Blog Outline";

        const prompt = buildBlogOutlinePrompt({
          topic: entityTitle,
          focusKeyword: input.focusKeyword,
          targetAudience: input.targetAudience,
          specialInstructions: input.specialInstructions,
          brandMemory,
        });

        const aiRes = await callAiProvider({
          prompt,
          systemInstruction,
          jsonMode: true,
          contentType: "blog",
          temperature: 0.6,
        });

        const parsed = extractAndParseJson(aiRes.text);
        result = {
          outline: parsed,
          provider: aiRes.provider,
          model: aiRes.model,
        };
        break;
      }

      // ─── 5. Generate Blog from Approved Outline ───
      case "generate_blog_from_outline": {
        entityType = "blog";
        entityTitle = input.topic || input.title || "Blog Post";

        const existingServices = await getRelevantServices({ limit: 4 });
        const prompt = buildBlogFromOutlinePrompt({
          topic: entityTitle,
          outline: input.outline,
          focusKeyword: input.focusKeyword,
          existingServices,
          brandMemory,
        });

        const aiRes = await callAiProvider({
          prompt,
          systemInstruction,
          jsonMode: true,
          contentType: "blog",
          temperature: 0.7,
        });

        const parsed = extractAndParseJson(aiRes.text);
        result = {
          content: parsed,
          provider: aiRes.provider,
          model: aiRes.model,
        };
        break;
      }

      // ─── 6. Generate Project / Case Study ───
      case "generate_project": {
        entityType = "project";
        entityTitle = input.projectName || input.title || input.prompt || "New Project";

        const prompt = buildProjectPrompt({
          projectName: entityTitle,
          client: input.client,
          industry: input.industry,
          category: input.category,
          technologies: input.technologies || [],
          projectGoal: input.projectGoal,
          challenge: input.challenge,
          solution: input.solution,
          features: input.features || [],
          results: input.results || [],
          liveUrl: input.liveUrl,
          specialNotes: input.specialNotes || input.prompt,
          brandMemory,
        });

        const aiRes = await callAiProvider({
          prompt,
          systemInstruction,
          jsonMode: true,
          contentType: "project",
          temperature: options.temperature ?? 0.6,
        });

        const parsed = extractAndParseJson(aiRes.text);
        result = {
          content: parsed,
          provider: aiRes.provider,
          model: aiRes.model,
        };
        break;
      }

      // ─── 7. Regenerate Project Section ───
      case "regenerate_project_section": {
        entityType = "project";
        entityTitle = input.projectName || input.title || "Project Section";
        const sectionType = input.sectionType || "challenge_solution";

        const prompt = buildSectionRegenerationPrompt({
          sectionType,
          entityType: "project",
          entityTitle,
          fullDocumentContext: input.fullDocumentContext || {},
          userInstructions: input.instructions || input.prompt || "",
          brandMemory,
        });

        const aiRes = await callAiProvider({
          prompt,
          systemInstruction,
          jsonMode: true,
          contentType: "project",
          temperature: 0.6,
        });

        const content = extractAndParseJson(aiRes.text);
        result = {
          sectionType,
          content,
          provider: aiRes.provider,
          model: aiRes.model,
        };
        break;
      }

      // ─── 8. Generate FAQ ───
      case "generate_faq": {
        entityType = "faq";
        entityTitle = input.topic || input.title || "FAQs";

        const prompt = buildFaqPrompt({
          topic: entityTitle,
          contextType: input.contextType || "service",
          contextSummary: input.contextSummary || "",
          count: input.count || 4,
          brandMemory,
        });

        const aiRes = await callAiProvider({
          prompt,
          systemInstruction,
          jsonMode: true,
          contentType: "service",
          temperature: 0.65,
        });

        const parsed = extractAndParseJson(aiRes.text);
        result = {
          faqs: parsed,
          provider: aiRes.provider,
          model: aiRes.model,
        };
        break;
      }

      // ─── 9. Content Improvement (Make More Human, Rewrite, Clarity, SEO, Persuasive, etc.) ───
      case "improve_content": {
        entityType = "content_improvement";
        const text = input.text || "";
        const action = input.action || "make_human";

        if (!text.trim()) {
          throw new Error("No text provided to improve.");
        }

        const prompt = buildImprovementPrompt({
          text,
          action,
          context: input.context,
          instructions: input.instructions,
          brandMemory,
        });

        const aiRes = await callAiProvider({
          prompt,
          systemInstruction,
          jsonMode: false,
          temperature: 0.7,
        });

        result = {
          action,
          original: text,
          improved: aiRes.text.trim(),
          provider: aiRes.provider,
          model: aiRes.model,
        };
        break;
      }

      // ─── 10. AI Quality Reviewer ───
      case "review_content": {
        entityType = "quality_review";
        entityTitle = input.title || "Content Review";

        const prompt = buildReviewerPrompt({
          title: entityTitle,
          content: input.content,
          contentType: input.contentType || "service",
          targetKeyword: input.targetKeyword,
          brandMemory,
        });

        const aiRes = await callAiProvider({
          prompt,
          systemInstruction,
          jsonMode: true,
          temperature: 0.4,
        });

        const parsed = extractAndParseJson(aiRes.text);
        result = {
          review: parsed,
          provider: aiRes.provider,
          model: aiRes.model,
        };
        break;
      }

      // ─── 11. Generate SEO Metadata ───
      case "generate_seo": {
        entityType = "seo";
        entityTitle = input.title || "SEO Metadata";

        const prompt = buildSeoMetadataPrompt({
          title: entityTitle,
          content: input.content || "",
          contentType: input.contentType || "service",
          focusKeyword: input.focusKeyword,
          location: input.location,
          brandMemory,
        });

        const aiRes = await callAiProvider({
          prompt,
          systemInstruction,
          jsonMode: true,
          temperature: 0.5,
        });

        const parsed = extractAndParseJson(aiRes.text);
        result = {
          seo: parsed,
          provider: aiRes.provider,
          model: aiRes.model,
        };
        break;
      }

      // ─── 12. Keyword & Search Intent Analysis ───
      case "analyze_keywords": {
        entityType = "seo";
        entityTitle = input.topic || "Keyword Analysis";

        const prompt = buildKeywordAnalysisPrompt({
          topic: entityTitle,
          industry: input.industry,
          brandMemory,
        });

        const aiRes = await callAiProvider({
          prompt,
          systemInstruction,
          jsonMode: true,
          temperature: 0.5,
        });

        const parsed = extractAndParseJson(aiRes.text);
        result = {
          keywords: parsed,
          provider: aiRes.provider,
          model: aiRes.model,
        };
        break;
      }

      // ─── 13. Suggest Internal Links ───
      case "suggest_internal_links": {
        entityType = "seo";
        const publishedPages = await getPublishedPagesIndex();
        result = {
          pages: publishedPages,
          count: publishedPages.length,
        };
        break;
      }

      // ─── 14. Safe Diagnostic Connection Test ───
      case "test_connection": {
        entityType = "diagnostic";
        entityTitle = "AI Provider Connection Test";

        const aiRes = await callAiProvider({
          prompt: "Test connection. Reply with a short confirmation message.",
          temperature: 0.1,
          maxTokens: 30,
          provider: options.provider,
          model: options.model,
        });

        result = {
          provider: aiRes.provider || "gemini",
          model: aiRes.model || "gemini-2.0-flash",
          status: "success",
        };
        break;
      }

      default:
        throw new Error(`Unknown AI task: "${task}".`);
    }

    // Log success
    const elapsedMs = Date.now() - startTime;
    await logAiAction({
      adminId: adminContext.adminId,
      adminName: adminContext.adminName,
      task,
      entityType,
      entityTitle,
      prompt: input.serviceName || input.topic || input.projectName || input.prompt || task,
      status: "completed",
      summary: `Completed ${task} for "${entityTitle || "system"}" in ${elapsedMs}ms (${result.provider || "engine"})`,
      details: { task, elapsedMs, provider: result.provider, model: result.model },
    });

    return {
      success: true,
      ...result,
      elapsedMs,
    };
  } catch (error) {
    const elapsedMs = Date.now() - startTime;
    console.error(`[AiEngine] Error executing task "${task}":`, error.message);

    await logAiAction({
      adminId: adminContext.adminId,
      adminName: adminContext.adminName,
      task,
      entityType,
      entityTitle,
      prompt: input.serviceName || input.topic || input.projectName || input.prompt || task,
      status: "failed",
      summary: `Failed ${task}: ${error.message}`,
      error: error.message,
    });

    return {
      success: false,
      error: error.message || "Failed to execute AI task.",
      elapsedMs,
    };
  }
}
