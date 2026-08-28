/**
 * AI Provider Abstraction Layer
 *
 * Supports multiple providers with graceful fallback:
 * 1. Google Generative AI (Gemini 2.0 / 1.5)
 * 2. Hugging Face Inference
 * 3. OpenAI / Custom compatible endpoints
 * 4. Deterministic Local Brand Intelligence Engine (Zero external API dependency fallback)
 */

import { DEFAULT_BRAND_CONTEXT } from "./brandContext.js";
import { slugify } from "../slugify.js";

const PROVIDER = process.env.AI_PROVIDER || "local";

/**
 * Generate text or structured output from a prompt.
 */
export async function generateAI(prompt, options = {}) {
  const provider = options.provider || PROVIDER;

  try {
    if (provider === "google" && process.env.GOOGLE_AI_API_KEY) {
      return await generateWithGoogle(prompt, options);
    }
    if (provider === "openai" && process.env.OPENAI_API_KEY) {
      return await generateWithOpenAI(prompt, options);
    }
    if (provider === "huggingface" && process.env.HUGGINGFACE_API_KEY) {
      return await generateWithHuggingFace(prompt, options);
    }
    return generateLocal(prompt, options);
  } catch (error) {
    console.warn(`[AI Provider: ${provider}] Fallback to local engine. Error:`, error.message);
    return generateLocal(prompt, options);
  }
}

async function generateWithGoogle(prompt, options) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  const model = options.model || "gemini-2.0-flash";
  const maxTokens = options.maxTokens || 4096;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: options.temperature ?? 0.6,
        },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Google AI response error: ${res.status}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty candidate from Google AI");
  return { text };
}

async function generateWithOpenAI(prompt, options) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = options.model || "gpt-4o-mini";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: options.maxTokens || 2048,
      temperature: options.temperature ?? 0.6,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
  const data = await res.json();
  return { text: data.choices?.[0]?.message?.content || "" };
}

async function generateWithHuggingFace(prompt, options) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  const model = options.model || "mistralai/Mistral-7B-Instruct-v0.3";

  const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: options.maxTokens || 2048,
        temperature: options.temperature ?? 0.6,
        return_full_text: false,
      },
    }),
  });

  if (!res.ok) throw new Error(`HuggingFace error: ${res.status}`);
  const data = await res.json();
  const text = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;
  return { text: text || "" };
}

/**
 * High-grade deterministic local generation engine.
 * Fully aligned with HD Web Studios Mongoose CMS Schemas.
 */
export function generateLocal(prompt, options = {}) {
  const topic = prompt.replace(/^Generate.*for\s+/i, "").replace(/[":{}]+/g, "").trim();
  const contentType = options.contentType || (prompt.includes("service") ? "service" : prompt.includes("project") ? "project" : "blog");

  if (contentType === "service") {
    const category = detectCategory(topic);
    const accent = category === "E-Commerce" ? "emerald" : category === "Web Applications" ? "purple" : category === "SEO & Growth" ? "orange" : "blue";
    const icon = selectIconForTopic(topic, category);
    const slug = slugify(topic);

    return {
      text: JSON.stringify({
        slug,
        icon,
        eyebrow: `${topic} Solutions`,
        title: topic,
        tagline: `High-performance ${topic.toLowerCase()} engineered for business growth in Ludhiana, Punjab and across India.`,
        shortDescription: `Custom ${topic.toLowerCase()} designed for sub-second speed, seamless mobile UX, and continuous customer acquisition.`,
        description: `We build bespoke ${topic.toLowerCase()} systems engineered to turn search visitors into paying clients. Combining Next.js App Router performance, mobile-first UX design, and localized Google search structure, we help your business establish market authority.`,
        category,
        accent,
        order: 0,
        published: true,
        heroStats: [
          { label: "Turnaround", value: "7–14 Days" },
          { label: "Performance", value: "<1s Load" },
          { label: "Ownership", value: "100% Code" },
        ],
        overview: {
          heading: `Strategic ${topic} Engineered for Real Business Needs`,
          paragraphs: [
            `In modern business, having a fast and professional digital presence is essential. When it comes to ${topic.toLowerCase()}, generic templates and slow legacy builders consistently underperform against bespoke, conversion-engineered web architecture.`,
            `At HD Web Studios, we develop custom solutions built specifically around your target buyers and business workflow. Every component is designed to load instantly on mobile devices, build commercial trust, and make contacting your sales team effortless.`,
          ],
          highlights: [
            { icon: "Smartphone", title: "Mobile-First UX", text: "Touch-optimized layouts designed for Indian smartphone users." },
            { icon: "Gauge", title: "Core Web Vitals", text: "Sub-second Next.js architecture with zero layout shift." },
            { icon: "Search", title: "Built-In Schema", text: "LocalBusiness and Service structured data for Google 3-Pack rankings." },
          ],
        },
        whatYouGet: [
          { icon: "Layout", title: "Bespoke Brand Layout", text: "Tailored UI design reflecting your exact business identity and value proposition" },
          { icon: "Smartphone", title: "Mobile-First UX", text: "Optimized for frictionless browsing and quick inquiry calls across all mobile screens" },
          { icon: "Search", title: "Local SEO & Schema", text: "Structured Schema.org markup and meta tags optimized for Google search" },
          { icon: "Gauge", title: "Core Web Vitals Speed", text: "Sub-second load times engineered with modern Next.js App Router stack" },
          { icon: "Shield", title: "Spam-Protected Capture", text: "Security-validated lead capture forms connected with WhatsApp triggers" },
          { icon: "Headphones", title: "Post-Launch Support", text: "Direct developer communication with ongoing maintenance and performance monitoring" },
        ],
        faq: [
          { q: `What is the timeline for ${topic.toLowerCase()}?`, a: `Standard business implementations are typically delivered within 7 to 14 business days, with clear milestones established upfront.` },
          { q: `How much does ${topic.toLowerCase()} cost?`, a: `Pricing is transparent and customized based on scope, feature requirements, and integration needs. Contact us for a free estimate.` },
          { q: `Do you work with businesses outside Ludhiana?`, a: `Yes. While based in Ludhiana, Punjab, we build digital solutions for clients across India, Delhi NCR, and international markets.` },
          { q: `Will my website be mobile-friendly and fast?`, a: `Every project is developed mobile-first and optimized for Core Web Vitals to deliver sub-second performance.` },
        ],
        seoTitle: `${topic} Company in Ludhiana, Punjab | HD Web Studios`,
        seoDescription: `Professional ${topic.toLowerCase()} in Ludhiana, Punjab. High-performance, mobile-first web engineering to grow your business inquiries.`,
        ogImage: "/images/og-services.jpg",
      }),
    };
  }

  if (contentType === "project") {
    const slug = slugify(topic);
    const category = detectCategory(topic);

    return {
      text: JSON.stringify({
        title: topic,
        slug,
        client: `${topic.split(" ")[0]} Enterprise`,
        shortDescription: `A high-speed web application and conversion platform engineered for ${topic.toLowerCase()}.`,
        description: `We engineered a bespoke digital platform for ${topic.toLowerCase()} to streamline customer inquiries, optimize mobile performance, and enhance search engine visibility.`,
        industry: "Manufacturing / Business Services",
        category,
        services: ["Business Website Development", "Local SEO", "Custom Web Application"],
        technologies: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"],
        demoUrl: "",
        liveUrl: "https://example.com",
        results: [
          "Sub-second page load times across 4G mobile networks",
          "100% Core Web Vitals compliance on Google PageSpeed Insights",
          "Automated lead capture with instant WhatsApp inquiry routing",
        ],
        challenge: "The client previously operated with a slow, outdated website that was difficult to navigate on mobile devices and failed to generate qualified customer inquiries.",
        solution: "We rebuilt the digital architecture from the ground up using Next.js App Router and MongoDB, creating a clean mobile-first UI with localized SEO schema and WhatsApp integration.",
        features: [
          "Responsive mobile-first user interface",
          "Real-time inquiry capture with honeypot spam protection",
          "Structured LocalBusiness schema markup",
          "Search-optimized service catalog",
        ],
        seoTitle: `${topic} Case Study | HD Web Studios`,
        seoDescription: `Read how HD Web Studios engineered a custom, high-speed digital solution for ${topic.toLowerCase()}.`,
        tags: [topic.toLowerCase(), "case study", "web development", "next.js", "hd web studios"],
        published: true,
        order: 0,
      }),
    };
  }

  // Blog format
  const slug = slugify(topic);
  const category = detectCategory(topic);

  return {
    text: JSON.stringify({
      title: topic,
      slug,
      excerpt: `A practical guide to ${topic.toLowerCase()} for businesses looking to scale their online presence and generate qualified leads.`,
      content: `<p>In modern business, having an effective digital acquisition channel is essential. When it comes to <strong>${topic.toLowerCase()}</strong>, companies that focus on clarity, speed, and trust consistently outperform the competition.</p>
<h2>Why ${topic} Matters for Growing Businesses</h2>
<p>Investing in professional ${topic.toLowerCase()} provides compounding advantages for your brand:</p>
<ul>
<li><strong>Enhanced Trust & Authority</strong>: First impressions dictate whether prospects reach out or bounce to a competitor.</li>
<li><strong>Higher Conversion Rates</strong>: Clean visual hierarchy and clear CTAs turn passive visitors into inquiries.</li>
<li><strong>Local Search Visibility</strong>: Strategic optimization ensures your business appears when high-intent buyers search online.</li>
</ul>
<h2>Key Pillars of an Effective Strategy</h2>
<p>Executing ${topic.toLowerCase()} effectively requires a structured roadmap:</p>
<ol>
<li><strong>Understand Search Intent</strong>: Align your messaging with what potential clients are actually looking for.</li>
<li><strong>Optimize for Mobile Users</strong>: Over 65% of regional and business searches occur on mobile devices.</li>
<li><strong>Implement Clear CTAs</strong>: Every page must feature prominent contact options via direct call or WhatsApp.</li>
</ol>
<h2>How HD Web Studios Can Help</h2>
<p>At <strong>HD Web Studios</strong>, we build web solutions and digital growth engines for businesses in <a href="/about">Ludhiana, Punjab</a> and across India. We focus on real business outcomes — more leads, faster websites, and transparent communication.</p>
<h2>Frequently Asked Questions</h2>
<h3>How quickly can we start?</h3>
<p>You can <a href="/contact">contact our team today</a> to schedule a discovery discussion.</p>`,
      category,
      tags: [topic.toLowerCase(), "web development", "seo", "hd web studios", "business growth"],
      seoTitle: `${topic} Guide | HD Web Studios`,
      seoDescription: `Comprehensive guide to ${topic.toLowerCase()} by HD Web Studios in Ludhiana, Punjab. Learn how to grow your business online.`,
      focusKeyword: topic.toLowerCase().split(" ").slice(0, 3).join(" "),
      readingTime: "5 min read",
      author: "Harshdeep",
      status: "draft",
    }),
  };
}

function selectIconForTopic(topic, category) {
  const lower = topic.toLowerCase();
  if (/shop|ecommerce|store|cart|retail/i.test(lower)) return "ShoppingBag";
  if (/app|software|portal|custom|code|api/i.test(lower)) return "Code";
  if (/seo|rank|growth|google|search/i.test(lower)) return "TrendingUp";
  if (/speed|fast|performance|modern/i.test(lower)) return "Zap";
  if (/security|maintain|support|patch/i.test(lower)) return "ShieldCheck";
  if (/mobile|responsive|phone/i.test(lower)) return "Smartphone";
  if (/database|erp|management|inventory/i.test(lower)) return "Database";
  return "Globe";
}

function detectCategory(topic) {
  const lower = topic.toLowerCase();
  if (/seo|search|ranking|google|local/i.test(lower)) return "SEO & Growth";
  if (/ecommerce|shop|store|d2c/i.test(lower)) return "E-Commerce";
  if (/app|portal|dashboard|software|system|management/i.test(lower)) return "Web Applications";
  if (/maintenance|support|patch|security/i.test(lower)) return "Maintenance";
  return "Web Development";
}
