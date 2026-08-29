/**
 * HD Web Studios — AI Content Quality Reviewer Prompts
 *
 * Inspects generated and user-written content for AI clichés, repetition, keyword stuffing,
 * unsupported claims, and search intent alignment.
 */

export function buildReviewerPrompt({
  title,
  content,
  contentType = "service",
  targetKeyword = "",
  brandMemory,
}) {
  const contentText = typeof content === "string" ? content : JSON.stringify(content, null, 2);

  return `TASK: Conduct a rigorous content quality review for this ${contentType} piece titled "${title}" at ${brandMemory.brandName}.

CONTENT TO REVIEW:
"""
${contentText}
"""

${targetKeyword ? `TARGET KEYWORD: "${targetKeyword}"\n` : ""}

REVIEW CRITERIA:
1. GENERIC AI LANGUAGE: Detect robotic phrasing, corporate buzzwords, and banned clichés (${brandMemory.bannedClichés.slice(0, 10).join(", ")}).
2. REPETITION & FLUFF: Identify paragraphs or bullets that repeat the same concept without adding new value.
3. SEARCH INTENT: Check whether the content directly answers what a prospective buyer is seeking.
4. COMMERCIAL DIFFERENTIATION: Does this sound distinct, or does it feel like a generic copy-paste template?
5. FACTUAL INTEGRITY: Check for unrealistic guarantees ("rank #1") or fabricated statistics.
6. READABILITY & STRUCTURE: Evaluate formatting, heading logic, and scannability.
7. INTERNAL LINKING & CTA: Are there clear conversion triggers and natural link opportunities?

OUTPUT FORMAT REQUIREMENTS:
Return ONLY a valid JSON object matching this structure:
{
  "score": 85, // Integer between 0 and 100
  "grade": "Excellent | Good | Needs Improvement | Critical",
  "summary": "2-sentence overall evaluation of the content quality",
  "strengths": [
    "Specific strength 1",
    "Specific strength 2"
  ],
  "issues": [
    {
      "severity": "critical | warning | info",
      "category": "ai_cliché | repetition | search_intent | formatting | unsupported_claim",
      "message": "Specific explanation of the issue",
      "fixSuggestion": "Concrete instruction on how to fix it"
    }
  ],
  "recommendedAction": "Actionable next step summary"
}`;
}
