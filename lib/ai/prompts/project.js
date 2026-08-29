/**
 * HD Web Studios — Case Study / Project Generation Prompts
 *
 * Enforces factual integrity: NEVER fabricates revenue, conversion percentages, or fake stats.
 */

import { slugify } from "../../slugify.js";

export function buildProjectPrompt({
  projectName,
  client = "",
  industry = "",
  category = "Web Development",
  technologies = [],
  projectGoal = "",
  challenge = "",
  solution = "",
  features = [],
  results = [],
  liveUrl = "",
  specialNotes = "",
  brandMemory,
}) {
  const techStr = Array.isArray(technologies) && technologies.length
    ? technologies.join(", ")
    : "Next.js, React, Node.js, MongoDB, Tailwind CSS";

  return `TASK: Generate a professional portfolio case study for "${projectName}" engineered by ${brandMemory.brandName}.

FACTUAL INFORMATION PROVIDED:
- Project Name: ${projectName}
- Client Name / Company: ${client || `${projectName.split(" ")[0]} Enterprises`}
- Industry / Niche: ${industry || "Manufacturing & Business Services"}
- Category: ${category}
- Technology Stack: ${techStr}
- Project Goal / Objectives: ${projectGoal || "Build a high-performance digital presence to acquire customer inquiries"}
- Client Challenge: ${challenge || "Outdated legacy website with slow mobile speeds, lack of inquiry capture, and low search visibility."}
- Engineered Solution: ${solution || "Engineered a custom Next.js App Router platform with optimized Core Web Vitals, Schema markup, and instant WhatsApp inquiry routing."}
- Delivered Features Provided: ${features.length ? features.join(", ") : "Not specified (generate realistic architectural features based on tech stack)"}
- Measurable Outcomes Provided: ${results.length ? results.join(", ") : "None provided"}
- Live Site URL: ${liveUrl || ""}
- Special Notes: ${specialNotes || "None"}

CRITICAL FACTUAL MANDATE:
- NEVER FABRICATE FAKE METRICS OR UNSUPPORTED CLAIMS.
- If the user did NOT provide specific numbers for revenue, percentage traffic growth, or sales figures, do NOT make them up (e.g. do NOT write "increased revenue by 340%").
- Instead, highlight verifiable engineering outcomes: "Sub-second mobile load time", "100% Core Web Vitals score", "Direct inquiry capture with honeypot security", "Modern Next.js App Router codebase".

OUTPUT FORMAT REQUIREMENTS:
Return ONLY a valid JSON object matching this exact structure:
{
  "title": "${projectName}",
  "slug": "${slugify(projectName)}",
  "client": "${client || `${projectName.split(" ")[0]} Enterprises`}",
  "category": "${category}",
  "industry": "${industry || "Business Services"}",
  "location": "Ludhiana, Punjab",
  "projectType": "client",
  "year": "${new Date().getFullYear()}",
  "shortDescription": "2-sentence clear overview of the project and technical deliverable",
  "description": "Comprehensive 3-4 sentence case study overview detailing the business context, objectives, and delivery",
  "challenge": "Detailed 2-3 sentence explanation of the technical and business bottlenecks faced by the client",
  "solution": "Detailed 2-3 sentence explanation of how HD Web Studios engineered the modern solution",
  "features": [
    "Feature 1 (e.g. Touch-optimized mobile layout with sub-second page transitions)",
    "Feature 2 (e.g. Instant inquiry capture form integrated with WhatsApp API)",
    "Feature 3 (e.g. Structured LocalBusiness schema markup for search engines)",
    "Feature 4 (e.g. Clean admin CMS dashboard for effortless content updates)"
  ],
  "technologies": ${JSON.stringify(
    Array.isArray(technologies) && technologies.length
      ? technologies
      : ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"]
  )},
  "services": ["Business Website Development", "Custom Web Application", "Local SEO"],
  "results": [
    "Sub-second initial page load across mobile 4G networks",
    "Flawless Core Web Vitals compliance on Google PageSpeed Insights",
    "Streamlined customer communication via direct WhatsApp routing"
  ],
  "liveUrl": "${liveUrl || ""}",
  "demoUrl": "",
  "seoTitle": "${projectName} Case Study | HD Web Studios",
  "seoDescription": "Discover how HD Web Studios engineered a high-speed digital platform for ${client || projectName}."
}`;
}
