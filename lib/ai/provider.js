/**
 * HD Web Studios — Central AI Provider Router
 *
 * Coordinates primary (Google Gemini) and fallback (OpenRouter free models / Local Engine) providers.
 * Handles environment-based switching, timeout management, rate-limiting, and error normalization.
 */

import { generateGemini } from "./providers/gemini.js";
import { generateOpenRouter } from "./providers/openrouter.js";
import { generateLocalFallback } from "./providers/local.js";

/**
 * Call the configured AI provider with seamless fallback.
 *
 * @param {Object} params
 * @param {string} params.prompt
 * @param {string} [params.systemInstruction]
 * @param {boolean} [params.jsonMode=false]
 * @param {string} [params.provider] - Override default provider
 * @param {string} [params.model] - Override default model
 * @param {number} [params.temperature=0.7]
 * @param {number} [params.maxTokens=4096]
 * @param {string} [params.contentType] - For deterministic fallback
 * @returns {Promise<{ text: string, provider: string, model: string, usage?: any }>}
 */
export async function callAiProvider(params = {}) {
  const {
    prompt,
    systemInstruction = "",
    jsonMode = false,
    temperature = 0.7,
    maxTokens = 4096,
    contentType = "blog",
  } = params;

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    throw new Error("Prompt is required for AI generation.");
  }

  // Determine provider hierarchy
  const primaryProvider =
    params.provider ||
    process.env.AI_PROVIDER ||
    (process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY ? "gemini" : process.env.OPENROUTER_API_KEY ? "openrouter" : "local");

  const fallbackProvider =
    process.env.AI_FALLBACK_PROVIDER ||
    (primaryProvider === "gemini" && process.env.OPENROUTER_API_KEY ? "openrouter" : "local");

  const model = params.model || process.env.AI_MODEL;

  // 1. Try Primary Provider
  try {
    if (primaryProvider === "gemini" || primaryProvider === "google") {
      return await generateGemini({
        prompt,
        systemInstruction,
        jsonMode,
        model: model || "gemini-2.0-flash",
        temperature,
        maxOutputTokens: maxTokens,
      });
    }

    if (primaryProvider === "openrouter") {
      return await generateOpenRouter({
        prompt,
        systemInstruction,
        jsonMode,
        model: model || "google/gemini-2.0-flash-exp:free",
        temperature,
        maxOutputTokens: maxTokens,
      });
    }

    if (primaryProvider === "local") {
      return generateLocalFallback(prompt, { contentType });
    }
  } catch (primaryErr) {
    console.warn(`[AI Engine] Primary provider (${primaryProvider}) failed: ${primaryErr.message}`);

    // 2. Try Fallback Provider
    if (fallbackProvider && fallbackProvider !== primaryProvider && fallbackProvider !== "local") {
      try {
        console.info(`[AI Engine] Attempting fallback provider (${fallbackProvider})...`);
        if (fallbackProvider === "openrouter" && process.env.OPENROUTER_API_KEY) {
          return await generateOpenRouter({
            prompt,
            systemInstruction,
            jsonMode,
            model: "google/gemini-2.0-flash-exp:free",
            temperature,
            maxOutputTokens: maxTokens,
          });
        }
        if ((fallbackProvider === "gemini" || fallbackProvider === "google") && (process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY)) {
          return await generateGemini({
            prompt,
            systemInstruction,
            jsonMode,
            model: "gemini-1.5-flash",
            temperature,
            maxOutputTokens: maxTokens,
          });
        }
      } catch (fallbackErr) {
        console.warn(`[AI Engine] Fallback provider (${fallbackProvider}) also failed: ${fallbackErr.message}`);
      }
    }

    // 3. Fallback to Local Deterministic Engine
    console.warn("[AI Engine] Routing to deterministic local intelligence engine.");
    return generateLocalFallback(prompt, { contentType });
  }

  return generateLocalFallback(prompt, { contentType });
}

/**
 * Backward compatibility alias for legacy call sites.
 */
export async function generateAI(prompt, options = {}) {
  return callAiProvider({
    prompt,
    systemInstruction: options.systemInstruction,
    jsonMode: options.jsonMode ?? (options.contentType ? true : false),
    contentType: options.contentType,
    provider: options.provider,
    model: options.model,
    temperature: options.temperature,
    maxTokens: options.maxTokens,
  });
}
