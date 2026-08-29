/**
 * HD Web Studios — Granular Section-Level Regeneration Prompts
 *
 * Allows updating individual CMS sections without rewriting the entire document.
 */

export function buildSectionRegenerationPrompt({
  sectionType,
  entityType = "service",
  entityTitle,
  currentSectionData = null,
  fullDocumentContext = {},
  userInstructions = "",
  brandMemory,
}) {
  const contextSummary = `Entity: "${entityTitle}" (${entityType})\nCategory: ${
    fullDocumentContext.category || "General"
  }\nDescription summary: ${fullDocumentContext.description || fullDocumentContext.tagline || ""}`;

  if (entityType === "service") {
    switch (sectionType) {
      case "hero":
        return `TASK: Regenerate the Hero Section copy for service "${entityTitle}" at ${brandMemory.brandName}.
CONTEXT:
${contextSummary}
${userInstructions ? `Instructions: ${userInstructions}\n` : ""}

OUTPUT FORMAT:
Return ONLY a JSON object:
{
  "title": "Compelling hero title",
  "tagline": "Direct 1-sentence value proposition",
  "shortDescription": "2-sentence punchy summary for cards",
  "heroStats": [
    { "label": "e.g. Turnaround", "value": "7–14 Days" },
    { "label": "e.g. Performance", "value": "<1s Load" },
    { "label": "e.g. Ownership", "value": "100% Code" }
  ]
}`;

      case "overview":
        return `TASK: Regenerate the Overview Section for service "${entityTitle}" at ${brandMemory.brandName}.
CONTEXT:
${contextSummary}
${userInstructions ? `Instructions: ${userInstructions}\n` : ""}

OUTPUT FORMAT:
Return ONLY a JSON object:
{
  "heading": "Engaging overview heading tailored specifically to ${entityTitle}",
  "paragraphs": [
    "First paragraph: Real-world business problem clients face with ${entityTitle.toLowerCase()}.",
    "Second paragraph: How ${brandMemory.brandName} engineers the solution to deliver inquiries and growth."
  ]
}`;

      case "highlights":
        return `TASK: Regenerate the 3 Overview Highlights for service "${entityTitle}" at ${brandMemory.brandName}.
CONTEXT:
${contextSummary}
${userInstructions ? `Instructions: ${userInstructions}\n` : ""}

OUTPUT FORMAT:
Return ONLY a JSON array of 3 objects:
[
  { "icon": "Smartphone", "title": "Highlight Title 1", "text": "Specific benefit explanation" },
  { "icon": "Gauge", "title": "Highlight Title 2", "text": "Specific benefit explanation" },
  { "icon": "Search", "title": "Highlight Title 3", "text": "Specific benefit explanation" }
]`;

      case "deliverables":
      case "whatYouGet":
        return `TASK: Regenerate the 6 Deliverable Features (What You Get) for service "${entityTitle}" at ${brandMemory.brandName}.
CONTEXT:
${contextSummary}
${userInstructions ? `Instructions: ${userInstructions}\n` : ""}

OUTPUT FORMAT:
Return ONLY a JSON array of 6 objects:
[
  { "icon": "Layout", "title": "Deliverable 1", "text": "Concrete what is included" },
  { "icon": "Smartphone", "title": "Deliverable 2", "text": "Concrete what is included" },
  { "icon": "Search", "title": "Deliverable 3", "text": "Concrete what is included" },
  { "icon": "Gauge", "title": "Deliverable 4", "text": "Concrete what is included" },
  { "icon": "Shield", "title": "Deliverable 5", "text": "Concrete what is included" },
  { "icon": "Headphones", "title": "Deliverable 6", "text": "Concrete what is included" }
]`;

      case "faqs":
      case "faq":
        return `TASK: Regenerate 4 service-specific FAQs for "${entityTitle}" at ${brandMemory.brandName}.
CONTEXT:
${contextSummary}
${userInstructions ? `Instructions: ${userInstructions}\n` : ""}

OUTPUT FORMAT:
Return ONLY a JSON array of 4 objects:
[
  { "q": "Context-specific question 1?", "a": "Direct practical answer." },
  { "q": "Context-specific question 2?", "a": "Direct practical answer." },
  { "q": "Context-specific question 3?", "a": "Direct practical answer." },
  { "q": "Context-specific question 4?", "a": "Direct practical answer." }
]`;

      case "seo":
        return `TASK: Regenerate SEO Metadata for service "${entityTitle}" at ${brandMemory.brandName}.
CONTEXT:
${contextSummary}
${userInstructions ? `Instructions: ${userInstructions}\n` : ""}

OUTPUT FORMAT:
Return ONLY a JSON object:
{
  "seoTitle": "High-intent SEO Title under 60 chars | HD Web Studios",
  "seoDescription": "Meta description between 120-155 characters with location and value."
}`;
    }
  }

  // Project section regenerations
  if (entityType === "project") {
    switch (sectionType) {
      case "challenge_solution":
      case "challenge":
      case "solution":
        return `TASK: Regenerate the Challenge and Solution narrative for project "${entityTitle}" at ${brandMemory.brandName}.
CONTEXT:
${contextSummary}
${userInstructions ? `Instructions: ${userInstructions}\n` : ""}

OUTPUT FORMAT:
Return ONLY a JSON object:
{
  "challenge": "2-3 sentence client challenge explanation without fabricated metrics.",
  "solution": "2-3 sentence technical and design solution explanation."
}`;

      case "features":
        return `TASK: Regenerate the delivered key features for project "${entityTitle}" at ${brandMemory.brandName}.
CONTEXT:
${contextSummary}
${userInstructions ? `Instructions: ${userInstructions}\n` : ""}

OUTPUT FORMAT:
Return ONLY a JSON array of strings:
[
  "Feature 1 description",
  "Feature 2 description",
  "Feature 3 description",
  "Feature 4 description"
]`;

      case "results":
        return `TASK: Regenerate realistic engineering outcomes for project "${entityTitle}" at ${brandMemory.brandName}.
MANDATE: Never invent fake revenue or percentage stats.
CONTEXT:
${contextSummary}
${userInstructions ? `Instructions: ${userInstructions}\n` : ""}

OUTPUT FORMAT:
Return ONLY a JSON array of strings:
[
  "Outcome 1 (e.g. Sub-second initial page load on 4G networks)",
  "Outcome 2 (e.g. 100% Core Web Vitals score)",
  "Outcome 3 (e.g. Direct WhatsApp lead capture routing)"
]`;
    }
  }

  // Blog section regenerations
  if (entityType === "blog") {
    switch (sectionType) {
      case "intro":
        return `TASK: Regenerate the introductory section for blog "${entityTitle}" at ${brandMemory.brandName}.
CONTEXT:
${contextSummary}
${userInstructions ? `Instructions: ${userInstructions}\n` : ""}

OUTPUT FORMAT:
Return ONLY clean HTML text:
<p>Engaging opening hook without clichés...</p><p>Why this matters to the business owner right now...</p>`;

      case "conclusion":
        return `TASK: Regenerate the conclusion and CTA for blog "${entityTitle}" at ${brandMemory.brandName}.
CONTEXT:
${contextSummary}
${userInstructions ? `Instructions: ${userInstructions}\n` : ""}

OUTPUT FORMAT:
Return ONLY clean HTML text:
<h2>Conclusion & Next Steps</h2><p>Actionable closing summary...</p><p>Contact HD Web Studios link...</p>`;
    }
  }

  // Generic section fallback
  return `TASK: Regenerate the "${sectionType}" section for "${entityTitle}" at ${brandMemory.brandName}.
CONTEXT:
${contextSummary}
${userInstructions ? `Instructions: ${userInstructions}\n` : ""}
Return ONLY the regenerated content.`;
}
