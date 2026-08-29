/**
 * Google Gemini AI Provider Implementation
 *
 * Direct REST integration with Google Generative Language API.
 * Features:
 * - Free-tier friendly (gemini-2.0-flash, gemini-1.5-flash)
 * - Structured JSON output support (responseMimeType: "application/json")
 * - System instructions support
 * - Exponential backoff retry on 429 rate limit or 503 service unavailable
 * - AbortController timeout protection
 */

const DEFAULT_MODEL = "gemini-2.0-flash";
const MAX_RETRIES = 2;
const INITIAL_BACKOFF_MS = 1500;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateGemini({
  prompt,
  systemInstruction = "",
  jsonMode = false,
  model = DEFAULT_MODEL,
  temperature = 0.7,
  maxOutputTokens = 4096,
  timeoutMs = 45000,
}) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is not configured (GEMINI_API_KEY or GOOGLE_AI_API_KEY).");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: Math.max(0, Math.min(2, temperature)),
      maxOutputTokens,
      ...(jsonMode ? { responseMimeType: "application/json" } : {}),
    },
  };

  if (systemInstruction?.trim()) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction.trim() }],
    };
  }

  let lastError = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (res.status === 429 || res.status === 503) {
        if (attempt < MAX_RETRIES) {
          const backoff = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
          console.warn(
            `[Gemini Provider] Rate limit / service busy (${res.status}). Retrying in ${backoff}ms (attempt ${attempt + 1}/${MAX_RETRIES})...`
          );
          await sleep(backoff);
          continue;
        }
        throw new Error(`Google AI is temporarily busy (HTTP ${res.status}). Please try again shortly.`);
      }

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        const errMsg = errJson?.error?.message || `HTTP ${res.status}`;
        throw new Error(`Google AI error: ${errMsg}`);
      }

      const data = await res.json();
      const candidate = data.candidates?.[0];

      if (!candidate?.content?.parts?.[0]?.text) {
        if (candidate?.finishReason === "SAFETY") {
          throw new Error("Content generation was blocked by safety filters.");
        }
        throw new Error("Google AI returned an empty response candidate.");
      }

      const rawText = candidate.content.parts[0].text.trim();

      return {
        text: rawText,
        provider: "gemini",
        model,
        usage: data.usageMetadata || null,
      };
    } catch (err) {
      clearTimeout(timer);
      lastError = err;
      if (err.name === "AbortError") {
        throw new Error(`Google AI request timed out after ${Math.round(timeoutMs / 1000)}s.`);
      }
      if (attempt < MAX_RETRIES && (err.message.includes("fetch failed") || err.message.includes("network"))) {
        await sleep(INITIAL_BACKOFF_MS);
        continue;
      }
      break;
    }
  }

  throw lastError || new Error("Gemini generation failed.");
}
