import { executeAiTask } from "../lib/ai/engine.js";

async function testServiceGen() {
  const userBrief = "Generate a Local SEO Services page for small businesses in Ludhiana. Focus on Google Maps visibility, Google Business Profile optimization, local search, reviews, location relevance and generating enquiries. Avoid guaranteed ranking claims and generic AI/agency language. Write naturally for a business owner.";

  const res = await executeAiTask({
    task: "generate_service",
    input: {
      serviceName: "Local SEO Services",
      topic: "Local SEO Services",
      specialInstructions: userBrief,
      location: "Ludhiana, Punjab",
      targetAudience: "Small businesses in Ludhiana",
      businessGoal: "Google Maps visibility and customer enquiries",
    },
  });

  console.log("=== GENERATION RESULT ===");
  console.log("Success:", res.success);
  console.log("Provider:", res.provider);
  console.log("Model:", res.model);
  console.log("\n=== STRUCTURED JSON CONTENT ===");
  console.log(JSON.stringify(res.content, null, 2));
}

testServiceGen();
