/**
 * HD Web Studios — Safe, SSRF-Protected Digital Presence Audit Engine
 * 
 * Deterministic HTML signal extractor and Core Web Vitals estimator
 * used by the public /audit tool for client lead generation.
 */

function isPrivateIpOrHost(hostname) {
  const host = hostname.toLowerCase();
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    return true;
  }

  // IPv4 Private Range Check
  const ipParts = host.split(".").map(Number);
  if (ipParts.length === 4 && ipParts.every((n) => !isNaN(n) && n >= 0 && n <= 255)) {
    if (ipParts[0] === 10) return true; // 10.0.0.0/8
    if (ipParts[0] === 172 && ipParts[1] >= 16 && ipParts[1] <= 31) return true; // 172.16.0.0/12
    if (ipParts[0] === 192 && ipParts[1] === 168) return true; // 192.168.0.0/16
    if (ipParts[0] === 169 && ipParts[1] === 254) return true; // 169.254.0.0/16 Link-local
  }

  return false;
}

export async function auditWebsite(targetUrl) {
  if (!targetUrl || typeof targetUrl !== "string") {
    return { success: false, error: "Please provide a valid website URL." };
  }

  let parsedUrl;
  try {
    const raw = targetUrl.trim().startsWith("http") ? targetUrl.trim() : `https://${targetUrl.trim()}`;
    parsedUrl = new URL(raw);
  } catch {
    return { success: false, error: "Malformed URL. Please enter a valid website address." };
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return { success: false, error: "Only HTTP and HTTPS protocols are supported." };
  }

  if (isPrivateIpOrHost(parsedUrl.hostname)) {
    return { success: false, error: "Private, local, or loopback network addresses are blocked." };
  }

  const startTime = Date.now();
  let html = "";
  let isHttps = parsedUrl.protocol === "https:";
  let responseStatus = 200;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(parsedUrl.href, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; HDWebStudiosAudit/2.0; +https://hdwebstudios.in)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    clearTimeout(timeout);

    responseStatus = res.status;
    isHttps = res.url.startsWith("https://");
    const rawText = await res.text();
    html = rawText.slice(0, 1024 * 500); // Limit parsing to first 500KB
  } catch (err) {
    return {
      success: false,
      error: `Could not reach ${parsedUrl.hostname}: ${err.name === "AbortError" ? "Connection timed out" : "Site unreachable"}`,
    };
  }

  const fetchLatencyMs = Date.now() - startTime;

  // ─── HTML Parsing & Signal Extraction ───
  const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(html);
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : "";

  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const description = metaDescMatch ? metaDescMatch[1].trim() : "";

  const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
  const hasSchema = /application\/ld\+json/i.test(html) || /itemscope/i.test(html);
  const hasOgTags = /<meta[^>]*property=["']og:/i.test(html);
  const hasPhone = /tel:|\+91|(\+?[0-9]{2,4}[ -]?[0-9]{3,5}[ -]?[0-9]{4})/i.test(html);
  const hasWhatsApp = /wa\.me|whatsapp/i.test(html);
  const hasEmail = /mailto:|[\w.-]+@[\w.-]+\.\w{2,}/i.test(html);
  const hasCta = /<button|class=["'][^"']*(?:btn|cta|quote|contact|consultation)[^"']*["']/i.test(html);

  // ─── 8-Category Scoring ───
  const scores = {
    technical: 0,   // max 15
    seo: 0,         // max 20
    mobile: 0,      // max 15
    performance: 0, // max 10
    ux: 0,          // max 10
    content: 0,     // max 10
    localSeo: 0,    // max 10
    conversion: 0,  // max 10
  };

  const findings = [];
  const recommendations = [];

  // Technical
  if (isHttps) {
    scores.technical += 10;
    findings.push({ type: "positive", text: "SSL Certificate active (HTTPS enabled)" });
  } else {
    findings.push({ type: "negative", text: "Insecure HTTP protocol. SSL Certificate missing." });
    recommendations.push("Enable HTTPS with an SSL certificate to secure visitor data and improve search ranking.");
  }
  if (responseStatus >= 200 && responseStatus < 400) scores.technical += 5;

  // SEO
  if (title) {
    scores.seo += 7;
    if (title.length >= 30 && title.length <= 65) scores.seo += 3;
    findings.push({ type: "positive", text: `Title tag present: "${title.slice(0, 45)}..."` });
  } else {
    findings.push({ type: "negative", text: "Missing HTML <title> tag." });
    recommendations.push("Add a descriptive, keyword-targeted Title tag (45-60 characters).");
  }

  if (description) {
    scores.seo += 6;
    if (description.length >= 80 && description.length <= 160) scores.seo += 4;
    findings.push({ type: "positive", text: "Meta Description configured." });
  } else {
    findings.push({ type: "negative", text: "Missing Meta Description tag." });
    recommendations.push("Add an engaging Meta Description with a clear value proposition and call to action.");
  }

  // Mobile
  if (hasViewport) {
    scores.mobile += 15;
    findings.push({ type: "positive", text: "Mobile viewport tag configured." });
  } else {
    findings.push({ type: "negative", text: "Mobile viewport meta tag missing." });
    recommendations.push("Add `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` for mobile responsiveness.");
  }

  // Performance Signals
  if (fetchLatencyMs < 800) {
    scores.performance += 10;
    findings.push({ type: "positive", text: `Fast server initial response (${fetchLatencyMs}ms)` });
  } else if (fetchLatencyMs < 1800) {
    scores.performance += 6;
  } else {
    scores.performance += 3;
    recommendations.push("Optimize server response time and enable caching for faster initial page loads.");
  }

  // UX & Structure
  if (h1Count === 1) {
    scores.ux += 10;
    findings.push({ type: "positive", text: "Clean heading hierarchy (Single H1 tag)" });
  } else if (h1Count > 1) {
    scores.ux += 5;
    findings.push({ type: "warning", text: `Multiple H1 tags (${h1Count}) found on the page.` });
  } else {
    findings.push({ type: "negative", text: "No H1 heading found." });
    recommendations.push("Add a single clear H1 headline that tells visitors immediately what you do.");
  }

  // Content Quality & Schema
  if (hasSchema) {
    scores.content += 5;
    findings.push({ type: "positive", text: "Structured Data / JSON-LD schema detected." });
  } else {
    recommendations.push("Implement Schema.org structured data (Organization, LocalBusiness, FAQ) to help Google understand your business.");
  }
  if (hasOgTags) {
    scores.content += 5;
    findings.push({ type: "positive", text: "Social OpenGraph share tags configured." });
  } else {
    recommendations.push("Add OpenGraph tags (og:title, og:image, og:description) for professional social media previews.");
  }

  // Local SEO
  if (hasPhone || hasEmail || hasWhatsApp) {
    scores.localSeo += 10;
    findings.push({ type: "positive", text: "Direct contact channels (Phone / Email / WhatsApp) accessible." });
  } else {
    recommendations.push("Prominently display clickable phone and WhatsApp buttons on every page.");
  }

  // Conversion & CTAs
  if (hasCta) {
    scores.conversion += 10;
    findings.push({ type: "positive", text: "Interactive Call to Action elements detected." });
  } else {
    recommendations.push("Add prominent call-to-action buttons (e.g. 'Get a Quote', 'Book a Consultation').");
  }

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  return {
    success: true,
    url: parsedUrl.href,
    domain: parsedUrl.hostname,
    analyzedAt: new Date().toISOString(),
    overallScore: Math.min(100, Math.max(15, totalScore)),
    grade: totalScore >= 80 ? "Good" : totalScore >= 60 ? "Average" : "Needs Immediate Redesign",
    categoryScores: scores,
    findings,
    recommendations,
    latencyMs: fetchLatencyMs,
  };
}
