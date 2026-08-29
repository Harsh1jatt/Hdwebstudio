/**
 * HD Web Studios — Blog Article Generation Prompts
 *
 * Supports comprehensive article generation, outline-first workflows, and internal link integration.
 */

import { slugify } from "../../slugify.js";

export function buildBlogPrompt({
  topic,
  focusKeyword = "",
  secondaryKeywords = [],
  targetAudience = "",
  location = "",
  searchIntent = "Commercial / Informational",
  tone = "Professional & Practical",
  specialInstructions = "",
  existingServices = [],
  existingBlogs = [],
  brandMemory,
}) {
  const serviceList = existingServices.map((s) => `- ${s.title} (URL: ${s.url})`).join("\n");
  const blogList = existingBlogs.map((b) => `- ${b.title} (URL: ${b.url})`).join("\n");

  return `TASK: Write an authoritative, in-depth blog post on "${topic}" for ${brandMemory.brandName}.

BLOG INPUTS:
- Primary Topic: ${topic}
- Focus Keyword: ${focusKeyword || topic}
- Secondary Keywords: ${secondaryKeywords.length ? secondaryKeywords.join(", ") : "None"}
- Target Audience: ${targetAudience || "Business owners, decision makers, and founders looking for actionable guidance"}
- Geographic Context: ${location || "Ludhiana, Punjab, India & Global"}
- Search Intent: ${searchIntent}
- Tone: ${tone}
- Special Instructions: ${specialInstructions || "None provided"}

RELEVANT INTERNAL PAGES TO LINK CONTEXTUALLY (INCLUDE 2-4 NATURAL <a href="..."> LINKS IN ARTICLE BODY):
Services:
${serviceList || "- /services"}
Existing Blogs:
${blogList || "- /blog"}
Contact & Audit:
- Free Website Audit (URL: /audit)
- Contact & Consultations (URL: /contact)

TOPICAL DEPTH MANDATE:
- Do NOT generate a superficial overview. Cover the subject with genuine technical, commercial, and practical depth.
- If the topic is about costs or pricing, break down the actual cost factors (scope, CMS vs custom code, hosting, maintenance, e-commerce features, quote comparison pitfalls).
- If the topic is about technical development (e.g. Next.js, MERN, WordPress), explain the architectural differences and ROI for businesses.
- Structure with clear <h2> and <h3> headings, bulleted lists, concrete examples, and actionable advice.

OUTPUT FORMAT REQUIREMENTS:
Return ONLY a valid JSON object matching this exact structure:
{
  "title": "Compelling, search-optimized title under 65 chars",
  "slug": "${slugify(topic)}",
  "excerpt": "Engaging 2-sentence summary under 160 characters for listings and search snippet previews",
  "content": "<p>Opening hook establishing why this topic matters to the reader right now without clichés...</p><h2>Subheading 1</h2><p>In-depth content with <strong>important concepts highlighted</strong>...</p><ul><li>List item 1</li><li>List item 2</li></ul><h2>Subheading 2</h2><p>Detailed analysis including contextual internal links such as <a href=\\"/contact\\">contacting our web team</a>...</p><h2>Frequently Asked Questions</h2><h3>Specific Question 1?</h3><p>Direct factual answer.</p><h3>Specific Question 2?</h3><p>Direct factual answer.</p><h2>Conclusion & Next Steps</h2><p>Actionable closing with clear recommendation.</p>",
  "category": "Web Development | SEO & Growth | E-Commerce | Tech & Tutorials",
  "tags": ["relevant", "topic", "tags", "3 to 6 tags"],
  "focusKeyword": "${focusKeyword || topic.toLowerCase()}",
  "secondaryKeywords": ${JSON.stringify(secondaryKeywords || [])},
  "author": "Harshdeep",
  "readingTime": 6,
  "seoTitle": "High-intent SEO Title under 60 chars | HD Web Studios",
  "seoDescription": "Meta description between 120-155 characters summarizing the article value and inviting clicks",
  "suggestedImageConcept": "Brief visual concept description for designers/AI image generator"
}`;
}

export function buildBlogOutlinePrompt({
  topic,
  focusKeyword = "",
  targetAudience = "",
  specialInstructions = "",
  brandMemory,
}) {
  return `TASK: Create a comprehensive, highly-structured blog post outline on "${topic}" for ${brandMemory.brandName}.

INPUTS:
- Topic: ${topic}
- Focus Keyword: ${focusKeyword || topic}
- Target Audience: ${targetAudience || "Business owners, decision makers, and founders"}
- Special Instructions: ${specialInstructions || "None provided"}

OUTPUT FORMAT:
Return ONLY a JSON object:
{
  "title": "Suggested blog title",
  "slug": "${slugify(topic)}",
  "focusKeyword": "${focusKeyword || topic.toLowerCase()}",
  "estimatedWordCount": "1200 - 1800 words",
  "sections": [
    {
      "heading": "Introduction",
      "keyPoints": ["Hook", "Core problem", "What this guide covers"]
    },
    {
      "heading": "Main Section 1 (H2)",
      "subheadings": ["Sub-topic A (H3)", "Sub-topic B (H3)"],
      "keyPoints": ["Point 1", "Point 2", "Point 3"]
    },
    {
      "heading": "Main Section 2 (H2)",
      "subheadings": ["Sub-topic C (H3)"],
      "keyPoints": ["Point 1", "Point 2"]
    },
    {
      "heading": "Frequently Asked Questions",
      "keyPoints": ["FAQ 1", "FAQ 2", "FAQ 3"]
    },
    {
      "heading": "Strategic Takeaways & Next Steps",
      "keyPoints": ["Action checklist", "CTA to HD Web Studios"]
    }
  ]
}`;
}

export function buildBlogFromOutlinePrompt({
  topic,
  outline,
  focusKeyword = "",
  existingServices = [],
  brandMemory,
}) {
  const outlineStr = typeof outline === "string" ? outline : JSON.stringify(outline, null, 2);

  return `TASK: Write the full, in-depth blog post for "${topic}" following this approved outline strictly.

APPROVED OUTLINE:
${outlineStr}

FOCUS KEYWORD: ${focusKeyword || topic}

MANDATE:
- Expand every section thoroughly with concrete details, examples, and semantic HTML (<h2>, <h3>, <p>, <ul>, <ol>, <strong>, <a>).
- Include natural internal links to /services, /contact, or /audit.
- Adhere strictly to human writing rules: no AI corporate clichés.

OUTPUT FORMAT:
Return ONLY a JSON object with fields:
{
  "title": "Final title",
  "slug": "${slugify(topic)}",
  "excerpt": "2-sentence excerpt under 160 chars",
  "content": "<p>Full HTML content...</p>",
  "category": "Web Development | SEO & Growth | E-Commerce | Tech & Tutorials",
  "tags": ["tag1", "tag2", "tag3"],
  "focusKeyword": "${focusKeyword || topic.toLowerCase()}",
  "readingTime": 7,
  "seoTitle": "SEO title under 60 chars | HD Web Studios",
  "seoDescription": "Meta description 120-155 chars"
}`;
}
