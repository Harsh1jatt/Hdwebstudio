/**
 * HD Web Studios — AI Agency Operating System Agent Engine
 *
 * Capabilities:
 * - Natural language instruction parsing
 * - Brand memory grounding & existing CMS state inspection
 * - Multi-step timeline tracking
 * - Keyword cannibalization protection
 * - Deterministic 100-point SEO evaluation
 * - Safe internal linking recommendations
 * - Human-in-the-loop approval workflow
 */

import { callAiProvider } from "./provider.js";
import { executeAiTask } from "./engine.js";
import { TOOLS, getTool, listTools } from "./tools.js";
import { getBrandMemory } from "./context/brandMemory.js";
import { evaluateSEO } from "./seoEngine.js";
import { detectCannibalization } from "./cannibalization.js";
import { findInternalLinkRecommendations } from "./internalLinks.js";
import { auditWebsite } from "./websiteAudit.js";

function log(label, ...args) {
  console.log(`[AI Agent Engine] ${label}:`, ...args);
}

// ─── Intent Recognition ─────────────────────────────────

const INTENT_PATTERNS = [
  // ─── Create Service ───
  {
    intent: "create_service",
    patterns: [
      /(?:create|add|make|build|generate|write)\s+(?:a\s+)?(?:new\s+)?(?:service|services?)\s+(?:for|called|named|titled|about|on|targeting|:)\s+(.+)/i,
      /(?:create|add|make|build|generate|write)\s+(?:a\s+)?(?:new\s+)?(.+?)\s+(?:service|services|service\s+page|landing\s+page)(?:\s+(?:for|in|called|about|targeting|:|\.)\s*(.*))?$/i,
      /(?:new\s+service)\s+(?:for|called|named|about|:)\s+(.+)/i,
    ],
    tool: "create_service",
    extract: (m) => ({
      title: (m[1] && m[1].trim()) || "New Service",
      brief: (m[2] && m[2].trim()) || "",
    }),
  },

  // ─── Create Blog ───
  {
    intent: "create_blog",
    patterns: [
      /(?:create|write|add|make|generate|post)\s+(?:a\s+)?(?:new\s+)?(?:blog|post|article|blog\s*post)\s+(?:about|for|called|named|titled|on|:)\s+(.+)/i,
    ],
    tool: "create_blog",
    extract: (m) => ({ title: m[1].trim() }),
  },

  // ─── Create Project / Portfolio ───
  {
    intent: "create_project",
    patterns: [
      /(?:create|add|make)\s+(?:a\s+)?(?:new\s+)?(?:project|case\s*study|portfolio)\s+(?:for|called|named|titled|:)\s+(.+)/i,
    ],
    tool: "create_project",
    extract: (m) => ({ title: m[1].trim() }),
  },

  // ─── SEO Analysis ───
  {
    intent: "analyze_seo",
    patterns: [
      /(?:analyze|check|audit|inspect|score|evaluate)\s+(?:seo|the\s+seo)\s+(?:for|of|on)\s+(.+)/i,
      /(?:run\s+seo\s+analysis\s+on)\s+(.+)/i,
    ],
    tool: "analyze_seo",
    extract: (m) => ({ target: m[1].trim() }),
  },

  // ─── Website Audit ───
  {
    intent: "audit_website",
    patterns: [
      /(?:audit|analyze|check|inspect)\s+(?:the\s+)?(?:website|site|url)\s+(?:at\s+|https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/i,
    ],
    tool: "audit_website_url",
    extract: (m) => ({ url: m[1].trim() }),
  },

  // ─── Internal Links ───
  {
    intent: "find_internal_links",
    patterns: [
      /(?:find|suggest|recommend)\s+(?:internal\s+links?|links?)\s+(?:for|in)\s+(.+)/i,
    ],
    tool: "find_internal_links",
    extract: (m) => ({ content: m[1].trim() }),
  },

  // ─── Content Clusters ───
  {
    intent: "get_content_clusters",
    patterns: [
      /(?:show|view|get|list|display)\s+(?:content\s+clusters?|clusters?|topic\s+clusters?|pillars?)/i,
    ],
    tool: "get_content_clusters",
    extract: () => ({}),
  },

  // ─── List Content ───
  {
    intent: "search_services",
    patterns: [/(?:show|list|get|view)\s+(?:all\s+)?services?/i, /(?:how many|count)\s+services?/i],
    tool: "search_services",
    extract: () => ({}),
  },
  {
    intent: "search_blogs",
    patterns: [/(?:show|list|get|view)\s+(?:all\s+)?(?:blogs?|posts?|articles?)/i],
    tool: "search_blogs",
    extract: () => ({}),
  },
  {
    intent: "search_projects",
    patterns: [/(?:show|list|get|view)\s+(?:all\s+)?(?:projects?|portfolio)/i],
    tool: "search_projects",
    extract: () => ({}),
  },

  // ─── Content Audit Summary ───
  {
    intent: "audit_summary",
    patterns: [
      /(?:audit|review|check|inspect)\s+(?:the\s+)?(?:content|cms|website|agency\s+operating\s+system|site\s+health)/i,
      /(?:what(?:'s| is)\s+(?:missing|status|inventory))/i,
    ],
    tool: "audit_content_summary",
    extract: () => ({}),
  },

  // ─── Delete ───
  {
    intent: "delete_entity",
    patterns: [
      /delete\s+(?:the\s+)?(service|blog|post|project|faq|testimonial)\s+(?:called|named|titled)?\s*(.*)/i,
    ],
    tool: null,
    extract: (m) => ({ entityType: m[1].toLowerCase(), entityName: m[2].trim() }),
  },

  // ─── Help ───
  {
    intent: "help",
    patterns: [/^(help|commands?|what can you do|how to use|capabilities)$/i],
    tool: null,
    extract: () => ({}),
  },
];

function parseIntent(text) {
  const trimmed = text.trim();
  for (const { intent, patterns, tool, extract } of INTENT_PATTERNS) {
    for (const pattern of patterns) {
      const match = trimmed.match(pattern);
      if (match) {
        return { intent, tool, params: extract ? extract(match) : {}, raw: trimmed };
      }
    }
  }
  return { intent: "freeform_assistant", tool: null, params: { query: trimmed }, raw: trimmed };
}

// ─── Execution Pipeline ─────────────────────────────────

export async function runAgent(userMessage, context = {}) {
  const steps = [];
  const actions = [];
  const intent = parseIntent(userMessage);
  log("Parsed Intent:", intent.intent, intent.params);

  // ─── 1. Help Response ───
  if (intent.intent === "help") {
    return {
      state: "completed",
      message: `🤖 **HD Web Studios — AI Agency Operating System**\n\nI can execute real CMS, SEO, and content actions across the platform:\n\n• **Create Service**: *"Create a new service for Ecommerce Development targeting D2C brands"*\n• **Create Blog**: *"Write a blog post about website redesign costs in India"*\n• **Check SEO**: *"Analyze SEO for Business Website Development"*\n• **Website Audit**: *"Audit website at https://example.com"*\n• **Keyword Protection**: *Automatically scans for cannibalization before creating content*\n• **Internal Links**: *"Find internal links for ecommerce website development"*\n• **Content Clusters**: *"Show content clusters"*\n• **Content Inventory**: *"Check CMS audit summary"*`,
      steps: [{ tool: "help", status: "completed", label: "Rendered Help Guide" }],
      actions: [],
    };
  }

  // ─── 2. Handle Website Audit ───
  if (intent.intent === "audit_website") {
    steps.push({ tool: "audit_website_url", status: "executing", label: `Auditing ${intent.params.url}` });
    const auditReport = await auditWebsite(intent.params.url);
    steps[0].status = auditReport.success ? "completed" : "failed";

    if (!auditReport.success) {
      return {
        state: "failed",
        message: `❌ **Audit Failed:** ${auditReport.error}`,
        steps,
        actions: [],
      };
    }

    const s = auditReport.categoryScores;
    const msg =
      `🌐 **Digital Presence Audit Report** for \`${auditReport.domain}\`\n\n` +
      `• **Overall Score:** **${auditReport.overallScore}/100** (${auditReport.grade})\n` +
      `• **Technical & SSL:** ${s.technical}/15\n` +
      `• **On-Page SEO:** ${s.seo}/20\n` +
      `• **Mobile Viewport:** ${s.mobile}/15\n` +
      `• **Performance & Latency:** ${s.performance}/10 (${auditReport.latencyMs}ms)\n` +
      `• **UX & Hierarchy:** ${s.ux}/10\n` +
      `• **Local SEO & Contact:** ${s.localSeo}/10\n` +
      `• **Conversion & CTAs:** ${s.conversion}/10\n\n` +
      `📋 **Top Recommendations:**\n` +
      auditReport.recommendations.slice(0, 4).map((r) => `• ${r}`).join("\n");

    return {
      state: "completed",
      message: msg,
      steps,
      actions: [{ label: "View Audit Tool", href: "/admin/seo" }],
    };
  }

  // ─── 3. Handle Service Creation with Central Engine ───
  if (intent.intent === "create_service") {
    const title = intent.params.title;

    steps.push({ tool: "get_brand_memory", status: "completed", label: "Loaded Brand Intelligence" });
    const brand = await getBrandMemory();

    steps.push({ tool: "detect_cannibalization", status: "executing", label: "Scanning for Keyword Cannibalization" });
    const conflictCheck = await detectCannibalization({ title, targetType: "service" });

    if (conflictCheck.hasConflict && conflictCheck.highestSeverity === "critical") {
      steps[1].status = "warning";
      return {
        state: "conflict_detected",
        message: `⚠️ **Keyword / Slug Conflict Detected**\n\n${conflictCheck.recommendation}\n\nExisting match: **${conflictCheck.conflicts[0].existingItem.title}** (\`${conflictCheck.conflicts[0].existingItem.url}\`).\n\nWould you like me to update that page instead?`,
        steps,
        actions: [{ label: "Edit Existing Service", href: `/admin/services/${conflictCheck.conflicts[0].existingItem._id}` }],
      };
    }
    steps[1].status = "completed";

    steps.push({ tool: "generate_service_content", status: "executing", label: "Generating Strategic Service Structure" });
    const genResult = await executeAiTask({
      task: "generate_service",
      input: {
        serviceName: title,
        specialInstructions: userMessage,
      },
      adminContext: { adminId: context.adminId, adminName: context.adminName },
    });

    if (!genResult.success || !genResult.content) {
      steps[2].status = "failed";
      return {
        state: "failed",
        message: `❌ **Failed to generate service:** ${genResult.error || "Engine error"}`,
        steps,
        actions: [],
      };
    }

    const serviceData = genResult.content;
    steps[2].status = "completed";

    // Deterministic SEO Evaluation
    steps.push({ tool: "analyze_seo", status: "executing", label: "Running 100-Point SEO Intelligence Evaluation" });
    const seoEval = evaluateSEO(serviceData, "service");
    steps[3].status = "completed";

    // Save as Draft
    steps.push({ tool: "create_service", status: "executing", label: "Saving Service Draft to MongoDB" });
    const saveResult = await TOOLS.create_service.execute(
      { ...serviceData, publish: false },
      { adminId: context.adminId, adminName: context.adminName, prompt: userMessage }
    );
    steps[steps.length - 1].status = saveResult.success ? "completed" : "failed";

    if (!saveResult.success) {
      return {
        state: "failed",
        message: `❌ **Failed to save service:** ${saveResult.message}`,
        steps,
        actions: [],
      };
    }

    const internalLinks = await findInternalLinkRecommendations({ content: serviceData.description });

    const message =
      `✅ **Service Created Successfully (Draft Mode)**\n\n` +
      `• **Title:** ${serviceData.title}\n` +
      `• **Slug:** \`${saveResult.slug}\`\n` +
      `• **SEO Score:** **${seoEval.score}/100** (${seoEval.grade})\n` +
      `• **Tagline:** ${serviceData.tagline}\n` +
      `• **Deliverables:** ${serviceData.whatYouGet?.length || 0} features configured\n` +
      `• **FAQs:** ${serviceData.faq?.length || 0} structured questions\n\n` +
      (internalLinks.count > 0
        ? `🔗 **Recommended Internal Links:**\n` +
          internalLinks.recommendations.slice(0, 3).map((l) => `• Anchor: *"${l.suggestedAnchor}"* &rarr; \`${l.targetUrl}\``).join("\n") +
          `\n\n`
        : "") +
      `🔒 Saved as **Draft**. Review and publish below.`;

    return {
      state: "completed",
      message,
      steps,
      actions: [
        { label: "Review & Edit Service", href: saveResult.editUrl },
        { label: "View Public Preview", href: saveResult.publicUrl },
      ],
    };
  }

  // ─── 4. Handle Blog Creation Pipeline ───
  if (intent.intent === "create_blog") {
    const title = intent.params.title;

    steps.push({ tool: "get_brand_memory", status: "completed", label: "Loaded Brand Intelligence" });
    steps.push({ tool: "detect_cannibalization", status: "completed", label: "Checked Blog Overlap" });

    const conflict = await detectCannibalization({ title, targetType: "blog" });
    if (conflict.hasConflict && conflict.highestSeverity === "critical") {
      return {
        state: "conflict_detected",
        message: `⚠️ **Duplicate Blog Detected:** ${conflict.recommendation}`,
        steps,
        actions: [{ label: "Edit Existing Blog", href: `/admin/blog/${conflict.conflicts[0].existingItem._id}` }],
      };
    }

    steps.push({ tool: "generate_blog_content", status: "executing", label: "Writing Comprehensive SEO Article" });
    const genResult = await executeAiTask({
      task: "generate_blog",
      input: { topic: title },
      adminContext: { adminId: context.adminId, adminName: context.adminName },
    });

    if (!genResult.success || !genResult.content) {
      steps[2].status = "failed";
      return {
        state: "failed",
        message: `❌ **Failed to generate blog:** ${genResult.error || "Engine error"}`,
        steps,
        actions: [],
      };
    }

    const blogData = genResult.content;
    steps[2].status = "completed";

    steps.push({ tool: "analyze_seo", status: "executing", label: "Running 100-Point SEO Intelligence Evaluation" });
    const seoEval = evaluateSEO(blogData, "blog");
    steps[3].status = "completed";

    steps.push({ tool: "create_blog", status: "executing", label: "Saving Blog Article to Database" });
    const saveResult = await TOOLS.create_blog.execute(
      { ...blogData, publish: false },
      { adminId: context.adminId, adminName: context.adminName, prompt: userMessage }
    );
    steps[steps.length - 1].status = saveResult.success ? "completed" : "failed";

    return {
      state: "completed",
      message:
        `✅ **Blog Article Created (Draft Mode)**\n\n` +
        `• **Title:** ${blogData.title}\n` +
        `• **Slug:** \`${saveResult.slug}\`\n` +
        `• **SEO Score:** **${seoEval.score}/100** (${seoEval.grade})\n` +
        `• **Reading Time:** ~${blogData.readingTime || 5} min\n` +
        `• **Status:** Draft\n\n` +
        `🔒 Review and publish when ready.`,
      steps,
      actions: [
        { label: "Review & Edit Post", href: saveResult.editUrl },
        { label: "Preview Article", href: saveResult.publicUrl },
      ],
    };
  }

  // ─── 5. Handle Content Summary ───
  if (intent.intent === "audit_summary") {
    steps.push({ tool: "audit_content_summary", status: "executing", label: "Aggregating CMS Health & Inventory" });
    const summaryResult = await TOOLS.audit_content_summary.execute();
    steps[0].status = "completed";
    const s = summaryResult.summary;

    return {
      state: "completed",
      message:
        `📊 **HD Web Studios CMS & Content Status**\n\n` +
        `• **Active Services:** ${s.services}\n` +
        `• **Published Blogs:** ${s.publishedBlogs} (${s.draftBlogs} drafts)\n` +
        `• **Portfolio Case Studies:** ${s.projects}\n` +
        `• **FAQs Configured:** ${s.faqs}\n` +
        `• **Client Testimonials:** ${s.testimonials}\n` +
        `• **Incoming Client Leads:** ${s.leads}\n\n` +
        `💡 *Ask me to create services, write blogs, or audit client websites at any time.*`,
      steps,
      actions: [{ label: "View SEO Dashboard", href: "/admin/seo" }],
    };
  }

  // ─── 6. Handle Content Clusters ───
  if (intent.intent === "get_content_clusters") {
    steps.push({ tool: "get_content_clusters", status: "executing", label: "Building Content Cluster Map" });
    const clusterResult = await TOOLS.get_content_clusters.execute();
    steps[0].status = "completed";

    const clusterList = clusterResult.clusters
      .map(
        (c) =>
          `• **${c.category} Cluster**\n  - Pillars: ${c.pillarServices.map((s) => s.title).join(", ") || "None"}\n  - Supporting Articles: ${c.supportingBlogs.length}\n  - Case Studies: ${c.caseStudies.length}`
      )
      .join("\n\n");

    return {
      state: "completed",
      message: `🗺️ **Topical Content Clusters** (${clusterResult.totalClusters} Categories):\n\n${clusterList}`,
      steps,
      actions: [{ label: "View All Services", href: "/admin/services" }],
    };
  }

  // ─── 7. Handle Destructive / Delete Actions ───
  if (intent.intent === "delete_entity") {
    return {
      state: "waiting_confirmation",
      needsConfirmation: true,
      confirmAction: `delete_${intent.params.entityType}`,
      confirmParams: { name: intent.params.entityName },
      message: `⚠️ **Confirm Permanent Deletion**\n\nAre you sure you want to delete the ${intent.params.entityType} **"${intent.params.entityName}"**?\n\nThis cannot be undone.`,
      steps: [{ tool: "confirm_deletion", status: "pending", label: "Waiting for human confirmation" }],
      actions: [],
    };
  }

  // ─── 8. Standard Tool Execution Fallback ───
  if (intent.tool && TOOLS[intent.tool]) {
    const tool = TOOLS[intent.tool];
    steps.push({ tool: intent.tool, status: "executing", label: `Executing ${intent.tool}` });
    const result = await tool.execute(intent.params, {
      adminId: context.adminId,
      adminName: context.adminName,
      prompt: userMessage,
    });
    steps[0].status = result.success ? "completed" : "failed";

    return {
      state: result.success ? "completed" : "failed",
      message: result.message || `Executed ${intent.tool}.`,
      steps,
      actions: result.editUrl ? [{ label: "View in Admin", href: result.editUrl }] : [],
    };
  }

  // ─── 9. Conversational Assistant Response ───
  const brand = await getBrandMemory();
  const assistantPrompt = `You are the AI Agency Operating System for ${brand.brandName} (${brand.positioning}). Respond to the administrator's inquiry clearly, professionally, and concisely: "${userMessage}"`;
  const aiRes = await callAiProvider({ prompt: assistantPrompt });

  return {
    state: "completed",
    message: aiRes.text || "How can I help you manage your agency content, SEO, or services today?",
    steps: [{ tool: "assistant_response", status: "completed", label: "Direct Agency Intelligence Response" }],
    actions: [],
  };
}

export async function handleConfirmation(action, params, confirmed, context = {}) {
  if (!confirmed) {
    return { state: "cancelled", message: "Action was cancelled.", actions: [] };
  }

  const tool = getTool(action);
  if (!tool) {
    return { state: "failed", message: `Tool "${action}" not found.`, actions: [] };
  }

  const result = await tool.execute(params, context);
  return {
    state: result.success ? "completed" : "failed",
    message: result.message || "Action completed.",
    actions: [],
  };
}
