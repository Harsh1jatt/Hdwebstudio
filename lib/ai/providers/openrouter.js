/**
 * OpenRouter AI Provider Implementation
 *
 * Fallback provider supporting free-tier and standard open models:
 * - google/gemini-2.0-flash-exp:free
 * - meta-llama/llama-3.3-70b-instruct:free
 * - mistralai/mistral-7b-instruct:free
 * - qwen/qwen-2.5-72b-instruct:free
 */

const DEFAULT_FREE_MODEL = "google/gemini-2.0-flash-exp:free";
const FALLBACK_FREE_MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "qwen/qwen-2.5-72b-instruct:free",
];

export async function generateOpenRouter({
  prompt,
  systemInstruction = "",
  jsonMode = false,
  model = DEFAULT_FREE_MODEL,
  temperature = 0.7,
  maxOutputTokens = 4096,
  timeoutMs = 45000,
}) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenRouter API key is not configured (OPENROUTER_API_KEY).");
  }

  const messages = [];
  if (systemInstruction?.trim()) {
    messages.push({ role: "system", content: systemInstruction.trim() });
  }
  messages.push({ role: "user", content: prompt });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://hdwebstudios.in",
        "X-Title": "HD Web Studios AI Engine",
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxOutputTokens,
        temperature: Math.max(0, Math.min(2, temperature)),
        ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`OpenRouter API error (HTTP ${res.status}): ${errText.slice(0, 200)}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("OpenRouter returned an empty message.");
    }

    return {
      text: content.trim(),
      provider: "openrouter",
      model,
      usage: data.usage || null,
    };
  } catch (err) {
    clearTimeout(timer);
    if (err.name === "AbortError") {
      throw new Error(`OpenRouter request timed out after ${Math.round(timeoutMs / 1000)}s.`);
    }
    throw err;
  }
}

export { FALLBACK_FREE_MODELS };
