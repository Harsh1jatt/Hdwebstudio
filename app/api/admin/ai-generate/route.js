import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";

/**
 * AI Content Generator — generates structured blog/service content from a prompt.
 *
 * Creates professional HTML content with:
 * - Semantic headings (H2, H3)
 * - Bold and italic emphasis
 * - Bulleted and numbered lists
 * - Internal links to services, portfolio, contact
 * - SEO metadata (title, description)
 * - Category, tags, excerpt
 */

function generateFromPrompt(prompt) {
  const topic = prompt.trim();
  const lowerTopic = topic.toLowerCase();

  const category = detectCategory(topic);
  const keyword = extractKeyword(topic);

  // Build a well-structured HTML article
  const content = buildArticle(topic, lowerTopic, keyword);

  const title = capitalizeFirst(topic);
  const slug = topic
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);

  const excerpt = `Learn about ${topic.toLowerCase()} — a comprehensive guide covering key concepts, benefits, and practical steps for businesses looking to grow online.`;

  const seoTitle = `${title} | HD Web Studios`;
  const seoDescription = `Discover everything you need to know about ${topic.toLowerCase()}. Practical insights and expert guidance from HD Web Studios in Ludhiana, Punjab.`;

  const tagWords = topic.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const tags = [...new Set([...tagWords, category.toLowerCase(), "guide", "tips"])].slice(0, 8);

  return {
    title,
    slug,
    excerpt,
    content,
    contentFormat: "html",
    category,
    tags,
    seoTitle,
    seoDescription,
    focusKeyword: keyword,
    author: "Harshdeep",
    status: "draft",
  };
}

function buildArticle(topic, lowerTopic, keyword) {
  let html = "";

  // Introduction with bold hook
  html += `<p><strong>Every business needs a strong online presence</strong> — and ${topic.toLowerCase()} is at the heart of that. Whether you're a startup in Ludhiana or an established brand across Punjab, understanding ${topic.toLowerCase()} can be the difference between getting found and getting left behind.</p>\n`;

  // H2: Why it matters
  html += `<h2>Why ${topic} Matters for Your Business</h2>\n`;
  html += `<p>In today's competitive landscape, businesses that invest in ${topic.toLowerCase()} see <strong>measurably better results</strong>. Here's why it's worth your attention:</p>\n`;
  html += `<ul>\n`;
  html += `  <li><strong>Builds credibility</strong> — A professional approach to ${topic.toLowerCase()} signals trust to potential customers</li>\n`;
  html += `  <li><strong>Drives growth</strong> — Businesses with strong ${topic.toLowerCase()} generate more leads and enquiries</li>\n`;
  html += `  <li><strong>Stays competitive</strong> — Your competitors are investing in this; falling behind means losing market share</li>\n`;
  html += `  <li><strong>Long-term ROI</strong> — Unlike paid ads, ${topic.toLowerCase()} delivers compounding returns over time</li>\n`;
  html += `</ul>\n`;

  // H2: Key elements
  html += `<h2>Key Elements of Effective ${topic}</h2>\n`;
  html += `<p>A successful ${topic.toLowerCase()} strategy involves several interconnected elements. <em>Getting each one right</em> is what separates average results from exceptional ones.</p>\n`;

  html += `<h3>1. Strategy and Planning</h3>\n`;
  html += `<p>Before diving into execution, you need a clear strategy. This means understanding your <strong>target audience</strong>, defining measurable goals, and creating a roadmap that aligns with your business objectives.</p>\n`;

  html += `<h3>2. Professional Execution</h3>\n`;
  html += `<p>Strategy without execution is just a wish. <strong>Professional implementation</strong> ensures that every element — from design to technical setup — is built to perform. This is where working with experienced professionals like <a href="/about">HD Web Studios</a> makes a real difference.</p>\n`;

  html += `<h3>3. Optimization and Improvement</h3>\n`;
  html += `<p>The work doesn't end at launch. <em>Continuous optimization</em> based on real data ensures your ${topic.toLowerCase()} keeps improving. Regular audits, performance monitoring, and iterative improvements are essential.</p>\n`;

  // H2: Common mistakes
  html += `<h2>Common Mistakes to Avoid</h2>\n`;
  html += `<p>Many businesses make avoidable errors with ${topic.toLowerCase()}. Here are the most common pitfalls:</p>\n`;
  html += `<ol>\n`;
  html += `  <li><strong>Skipping the strategy phase</strong> — Jumping straight to execution without a plan leads to wasted effort and budget</li>\n`;
  html += `  <li><strong>Ignoring mobile users</strong> — Over 60% of web traffic is mobile; if your solution isn't mobile-first, you're losing customers</li>\n`;
  html += `  <li><strong>Choosing the cheapest option</strong> — Low-cost providers often deliver low-quality results that cost more to fix later</li>\n`;
  html += `  <li><strong>Neglecting SEO</strong> — Without proper <a href="/services/seo-website-growth">SEO optimization</a>, even the best ${topic.toLowerCase()} won't be found</li>\n`;
  html += `  <li><strong>Set it and forget it</strong> — The digital landscape changes constantly; your approach needs to evolve with it</li>\n`;
  html += `</ol>\n`;

  // H2: How we can help
  html += `<h2>How HD Web Studios Can Help</h2>\n`;
  html += `<p>At <strong>HD Web Studios</strong>, we specialize in helping businesses in Ludhiana and across Punjab build a strong digital presence. Our approach combines <a href="/services">strategic thinking with technical expertise</a> to deliver results that matter.</p>\n`;
  html += `<p>We've helped businesses across various industries — from <a href="/portfolio">student portals and education platforms</a> to corporate websites and <a href="/services/web-app-development">custom web applications</a>. Every project is built around your specific business needs.</p>\n`;
  html += `<p><strong>What sets us apart:</strong></p>\n`;
  html += `<ul>\n`;
  html += `  <li>Founder-led team — you work directly with decision-makers</li>\n`;
  html += `  <li>Transparent pricing with <a href="/pricing">clear packages</a></li>\n`;
  html += `  <li>Post-launch support so your investment keeps performing</li>\n`;
  html += `  <li>Focus on real business outcomes, not vanity metrics</li>\n`;
  html += `</ul>\n`;

  // H2: Getting started
  html += `<h2>Getting Started</h2>\n`;
  html += `<p>The best time to improve your ${topic.toLowerCase()} was yesterday. The second-best time is now. Here's how to take the first step:</p>\n`;
  html += `<ol>\n`;
  html += `  <li><strong>Assess your current situation</strong> — Where are you now, and where do you want to be?</li>\n`;
  html += `  <li><strong>Define your goals</strong> — What does success look like for your business?</li>\n`;
  html += `  <li><strong>Get expert guidance</strong> — <a href="/contact">Book a free consultation</a> with our team to discuss your needs</li>\n`;
  html += `  <li><strong>Start building</strong> — With the right plan in place, execution becomes straightforward</li>\n`;
  html += `</ol>\n`;

  html += `<p><em>Ready to take the next step?</em> <a href="/contact">Contact us today</a> for a free digital presence audit and let's discuss how we can help your business grow online.</p>\n`;

  return html;
}

function detectCategory(topic) {
  const lower = topic.toLowerCase();
  if (/seo|search engine|ranking|google|keyword/.test(lower)) return "SEO";
  if (/website|web dev|react|next\.js|frontend|backend|fullstack/.test(lower)) return "Web Development";
  if (/design|ui|ux|figma|layout|visual/.test(lower)) return "Design";
  if (/marketing|digital|social|brand|content/.test(lower)) return "Digital Growth";
  if (/ecommerce|shop|store|product/.test(lower)) return "E-Commerce";
  if (/business|startup|growth|strategy/.test(lower)) return "Business";
  return "Web Development";
}

function extractKeyword(topic) {
  const words = topic.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  return words[0] || topic.toLowerCase().split(" ")[0];
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function POST(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const body = await req.json();
    const { prompt, type = "blog" } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please provide a topic or prompt (at least 5 characters)." },
        { status: 400 }
      );
    }

    const generated = generateFromPrompt(prompt);

    return NextResponse.json({ success: true, content: generated });
  } catch (error) {
    console.error("AI generate error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate content." },
      { status: 500 }
    );
  }
}
