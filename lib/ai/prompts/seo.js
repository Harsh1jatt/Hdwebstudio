/**
 * HD Web Studios — SEO Assistant Prompts
 *
 * Provides specialized prompts for SEO titles, meta descriptions, keyword intent, and content gaps.
 */

export function buildSeoMetadataPrompt({
  title,
  content = "",
  contentType = "service",
  focusKeyword = "",
  location = "",
  brandMemory,
}) {
  return `TASK: Generate high-performing, click-worthy SEO metadata for a ${contentType} titled "${title}" at ${brandMemory.brandName}.

CONTEXT:
- Title: ${title}
- Primary Keyword: ${focusKeyword || title}
- Geo Location: ${location || `${brandMemory.primaryMarket.city}, ${brandMemory.primaryMarket.state}`}
- Summary: ${content.slice(0, 300)}

CONSTRAINTS:
- SEO Title: 45 to 60 characters. Must include primary keyword + HD Web Studios / Location naturally.
- Meta Description: 125 to 155 characters. Must include a clear commercial benefit and direct call to action without keyword stuffing.
- Secondary Keywords: 4 to 6 relevant search phrases.

OUTPUT FORMAT:
Return ONLY a valid JSON object:
{
  "seoTitle": "High-CTR SEO Title under 60 chars | HD Web Studios",
  "seoDescription": "Engaging meta description between 120-155 characters that drives clicks.",
  "focusKeyword": "${focusKeyword || title.toLowerCase()}",
  "secondaryKeywords": ["keyword phrase 1", "keyword phrase 2", "keyword phrase 3", "keyword phrase 4"],
  "searchIntent": "Commercial | Transactional | Informational"
}`;
}

export function buildKeywordAnalysisPrompt({
  topic,
  industry = "",
  brandMemory,
}) {
  return `TASK: Analyze search queries and keyword opportunities for "${topic}" in ${industry || "web development & digital growth"} for ${brandMemory.brandName} (${brandMemory.primaryMarket.city}, ${brandMemory.primaryMarket.state}, India).

OUTPUT FORMAT:
Return ONLY a valid JSON object:
{
  "primaryKeyword": "Primary high-intent keyword",
  "searchIntent": "Commercial / Transactional",
  "buyerKeywords": [
    "Commercial search term 1",
    "Commercial search term 2",
    "Commercial search term 3"
  ],
  "localKeywords": [
    "Local search term in Ludhiana / Punjab 1",
    "Local search term in Punjab 2"
  ],
  "informationalKeywords": [
    "Question or guide search term 1",
    "Question or guide search term 2"
  ],
  "contentGaps": [
    "Sub-topic or angle competitors often miss 1",
    "Sub-topic or angle competitors often miss 2"
  ]
}`;
}
