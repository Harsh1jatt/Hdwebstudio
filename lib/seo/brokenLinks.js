/**
 * Broken Link Detector & Validator
 * Scans internal and external URLs safely with rate limiting and timeout guards.
 */

const scanCache = new Map();
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

export function extractAllLinks(html = "") {
  if (!html || typeof html !== "string") return [];
  const links = [];
  const regex = /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const href = match[1]?.trim();
    const anchor = match[2]?.replace(/<[^>]+>/g, "").trim() || "";
    if (href && !href.startsWith("#") && !href.startsWith("javascript:") && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
      links.push({
        href,
        anchor,
        isInternal: href.startsWith("/") || href.includes("hdwebstudios.in"),
      });
    }
  }
  return links;
}

export async function checkSingleUrl(url, baseUrl = "https://hdwebstudios.in") {
  if (!url) return { url, status: "invalid", statusCode: null, error: "Empty URL" };

  const targetUrl = url.startsWith("/") ? `${baseUrl}${url}` : url;

  const cached = scanCache.get(targetUrl);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.result;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(targetUrl, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "User-Agent": "HDWS-SEO-Audit-Bot/1.0",
      },
    }).catch(async () => {
      // If HEAD method is rejected (e.g. 405 Method Not Allowed), retry with GET
      return await fetch(targetUrl, {
        method: "GET",
        signal: controller.signal,
        headers: {
          "User-Agent": "HDWS-SEO-Audit-Bot/1.0",
        },
      });
    });

    clearTimeout(timeoutId);

    const isOk = response.status >= 200 && response.status < 400;
    const result = {
      url: targetUrl,
      originalHref: url,
      statusCode: response.status,
      status: isOk ? "ok" : response.status === 404 ? "broken" : "warning",
      redirected: response.redirected,
      finalUrl: response.url,
      timestamp: Date.now(),
    };

    scanCache.set(targetUrl, { timestamp: Date.now(), result });
    return result;
  } catch (err) {
    const result = {
      url: targetUrl,
      originalHref: url,
      statusCode: null,
      status: "broken",
      error: err.name === "AbortError" ? "Request Timeout" : err.message,
      timestamp: Date.now(),
    };
    scanCache.set(targetUrl, { timestamp: Date.now(), result });
    return result;
  }
}

export async function scanPageLinks(htmlContent = "", baseUrl = "https://hdwebstudios.in") {
  const extracted = extractAllLinks(htmlContent);
  if (!extracted.length) {
    return { total: 0, internal: 0, external: 0, broken: [], all: [] };
  }

  const results = [];
  for (const link of extracted.slice(0, 25)) {
    const check = await checkSingleUrl(link.href, baseUrl);
    results.push({ ...link, ...check });
  }

  const broken = results.filter((r) => r.status === "broken");

  return {
    total: results.length,
    internal: results.filter((r) => r.isInternal).length,
    external: results.filter((r) => !r.isInternal).length,
    broken,
    all: results,
  };
}
