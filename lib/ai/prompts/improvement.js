/**
 * HD Web Studios — Field-Level Content Improvement Prompts
 *
 * Provides targeted content transformations for any text field.
 */

export function buildImprovementPrompt({
  text,
  action = "make_human",
  context = "",
  instructions = "",
  brandMemory,
}) {
  const actionGuides = {
    make_human: `REWRITE TO SOUND COMPLETELY HUMAN:
- Strip out all generic AI patterns, robotic phrasing, and corporate buzzwords.
- Break predictable sentence rhythms. Blend punchy short sentences with natural, explanatory sentences.
- Write with the voice of an experienced web engineer and strategist speaking directly to a business owner.
- Ground claims in real technical reality (speed, UX, conversion, customer trust).`,

    rewrite: `REWRITE FRESH COPY:
- Provide a clear, compelling rephrasing of the text while preserving all essential factual details and context.`,

    clarity: `IMPROVE CLARITY & READABILITY:
- Simplify convoluted sentences and eliminate unnecessary fluff.
- Make the main point immediately obvious in the first sentence.`,

    seo: `ENHANCE ON-PAGE SEO & SEARCH INTENT:
- Improve semantic keyword coverage and topical clarity naturally without keyword stuffing.
- Ensure the text directly answers user search intent.`,

    persuasive: `MAKE MORE PERSUASIVE & CONVERSION-FOCUSED:
- Strengthen the commercial value proposition and customer benefits.
- Emphasize ROI, lead acquisition, responsiveness, and clear action.`,

    shorten: `MAKE CONCISE:
- Reduce word count by ~35-50% while retaining the core message and commercial impact.`,

    expand: `EXPAND WITH COMPREHENSIVE DETAIL:
- Add practical depth, concrete examples, and thorough explanation without adding empty fluff.`,

    grammar: `FIX GRAMMAR & POLISH:
- Correct all grammatical, punctuation, and phrasing errors while maintaining the original voice.`,
  };

  const selectedGuide = actionGuides[action] || actionGuides.make_human;

  return `TASK: Improve and transform the following text for ${brandMemory.brandName}.

OPERATION: ${action.toUpperCase()}
GUIDELINES:
${selectedGuide}

${context ? `ADDITIONAL CONTEXT:\n${context}\n` : ""}
${instructions ? `SPECIAL INSTRUCTIONS FROM USER:\n${instructions}\n` : ""}

ORIGINAL TEXT:
"""
${text}
"""

OUTPUT FORMAT:
Return ONLY the improved text directly without markdown fences, quotes, or conversational preamble. If the original text contained HTML tags (<p>, <strong>, etc.), preserve appropriate HTML tags in the output.`;
}
