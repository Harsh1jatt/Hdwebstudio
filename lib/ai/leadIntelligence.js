/**
 * AI Lead Intelligence Engine
 * Evaluates incoming client inquiries and generates structured insights:
 * - Quality Score & Rating (High / Medium / Low)
 * - Search & Purchase Intent (Commercial / High Intent / Informational / Low Intent)
 * - Inferred Business Type
 * - Recommended Services
 * - Actionable Follow-up Advice
 */

export function analyzeLead(lead) {
  if (!lead) return null;

  const name = lead.name || "Prospect";
  const business = (lead.business || "").trim();
  const phone = lead.phone || "";
  const email = lead.email || "";
  const website = lead.website || "";
  const message = (lead.message || "").toLowerCase();
  const source = lead.source || "website";

  let qualityScore = 50;
  let intent = "Moderate Intent";
  let recommendedAction = "Contact within 24 hours";
  const recommendedServices = [];
  const flags = [];

  // Data completeness signals
  if (phone) qualityScore += 15;
  if (email) qualityScore += 10;
  if (business) qualityScore += 15;
  if (website) qualityScore += 10;

  // Commercial intent keywords in message
  const highIntentWords = [
    "quote", "cost", "price", "budget", "hire", "need website", "redesign",
    "ecommerce", "store", "portal", "urgent", "timeline", "develop", "looking for developer"
  ];
  let highIntentMatches = 0;
  for (const word of highIntentWords) {
    if (message.includes(word)) highIntentMatches++;
  }

  if (highIntentMatches >= 2 || source === "audit-form") {
    qualityScore += 20;
    intent = "High Commercial Intent";
    recommendedAction = "Priority: Call / WhatsApp within 2 hours";
  } else if (highIntentMatches === 1) {
    qualityScore += 10;
    intent = "Commercial Inquiry";
  }

  // Recommended service inference
  if (message.includes("ecommerce") || message.includes("shop") || message.includes("store") || message.includes("product")) {
    recommendedServices.push("Ecommerce Website Development");
  }
  if (message.includes("redesign") || message.includes("old") || message.includes("update") || website) {
    recommendedServices.push("Website Redesign & Modernization");
  }
  if (message.includes("seo") || message.includes("rank") || message.includes("google") || message.includes("local")) {
    recommendedServices.push("Local SEO & Google Business Profile");
  }
  if (message.includes("app") || message.includes("portal") || message.includes("software") || message.includes("dashboard") || message.includes("system")) {
    recommendedServices.push("Custom Web Application Development");
  }
  if (recommendedServices.length === 0) {
    recommendedServices.push("Business Website Development");
  }

  // Estimated Quality Tier
  const finalScore = Math.min(100, Math.max(10, qualityScore));
  const qualityTier = finalScore >= 75 ? "HIGH" : finalScore >= 50 ? "MEDIUM" : "LOW";

  // Business Type Inference
  let inferredBusinessType = "Business / Professional";
  if (message.includes("factory") || message.includes("manufacturing") || message.includes("industrial")) {
    inferredBusinessType = "Manufacturing / Industrial";
  } else if (message.includes("school") || message.includes("college") || message.includes("institute") || message.includes("academy")) {
    inferredBusinessType = "Educational Institute";
  } else if (message.includes("d2c") || message.includes("clothing") || message.includes("brand") || message.includes("retail")) {
    inferredBusinessType = "D2C / Retail Brand";
  } else if (business) {
    inferredBusinessType = business;
  }

  return {
    isAiEstimate: true,
    score: finalScore,
    qualityTier,
    intent,
    inferredBusinessType,
    recommendedServices,
    recommendedAction,
    summary: `${name} has submitted a ${intent.toLowerCase()} inquiry. Estimated quality is ${qualityTier} (${finalScore}/100). Recommended strategy: ${recommendedAction}.`,
  };
}
