/**
 * HD Web Studios — Context-Specific FAQ Generator Prompts
 *
 * Generates tailored FAQs for Services, Blogs, Projects, and Industries.
 */

export function buildFaqPrompt({
  topic,
  contextType = "service",
  contextSummary = "",
  count = 4,
  brandMemory,
}) {
  return `TASK: Generate ${count} context-specific frequently asked questions (FAQs) with clear, practical answers for "${topic}" (${contextType}) at ${brandMemory.brandName}.

CONTEXT DETAILS:
${contextSummary || `Topic: ${topic}. Focus on real buyer concerns, timelines, costs, technology, and maintenance.`}

FAQ REQUIREMENTS:
- DO NOT use generic questions that could apply to any random agency.
- Tailor questions directly to ${topic}. Address actual commercial decision factors:
  - Technical decisions (e.g. why Next.js vs WordPress, or why custom MERN vs off-the-shelf).
  - Practical timelines and deliverables.
  - Transparent pricing factors.
  - Ownership, code assets, and post-launch maintenance.
  - Geographic service reach (e.g. Ludhiana, Punjab, Pan-India, international).

OUTPUT FORMAT:
Return ONLY a JSON array of objects matching:
[
  {
    "q": "Specific question addressing a real customer concern?",
    "a": "Direct, practical, and transparent 2-3 sentence answer."
  }
]`;
}
