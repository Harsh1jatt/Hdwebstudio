/**
 * Deterministic Local AI Engine
 *
 * Provides a zero-external-API fallback guaranteeing the CMS remains functional
 * even during external network outages or missing API keys.
 */

import { slugify } from "../../slugify.js";

export function generateLocalFallback(promptArg, options = {}) {
  let rawPrompt = "";
  let opts = options;

  if (typeof promptArg === "object" && promptArg !== null) {
    rawPrompt = promptArg.prompt || "";
    opts = { ...promptArg, ...options };
  } else if (typeof promptArg === "string") {
    rawPrompt = promptArg;
  }

  const cleanPrompt = String(rawPrompt || "");

  // ─── 1. Content Improvement ───
  if (cleanPrompt.includes("TASK: Improve and transform the following text") || cleanPrompt.includes("OPERATION:")) {
    const textMatch = cleanPrompt.match(/ORIGINAL TEXT:\s*"""\s*([\s\S]*?)\s*"""/i);
    let original = textMatch ? textMatch[1].trim() : cleanPrompt;

    let improved = original
      .replace(/in today's fast-paced digital world,?\s*/gi, "For growing businesses, ")
      .replace(/in today's digital landscape,?\s*/gi, "In modern search, ")
      .replace(/cutting-edge\s*/gi, "high-performance ")
      .replace(/seamless integration/gi, "reliable integration")
      .replace(/seamlessly/gi, "efficiently")
      .replace(/take your business to the next level/gi, "scale your online client acquisition")
      .replace(/look no further/gi, "we provide practical engineering")
      .replace(/game-changer/gi, "proven approach")
      .replace(/delve into/gi, "examine");

    if (improved === original) {
      improved = `Engineered for high performance and conversion: ${original}`;
    }

    return { text: improved };
  }

  // ─── 2. Content Quality Reviewer ───
  if (cleanPrompt.includes("TASK: Conduct a rigorous content quality review") || cleanPrompt.includes("REVIEW CRITERIA:")) {
    const titleMatch = cleanPrompt.match(/titled\s+"([^"]+)"/i);
    const title = titleMatch ? titleMatch[1] : "Content Review";

    const hasCliché = /fast-paced|cutting-edge|seamless|next level/i.test(cleanPrompt);
    const score = hasCliché ? 78 : 92;
    const grade = hasCliché ? "Good" : "Excellent";

    const issues = hasCliché
      ? [
          {
            severity: "warning",
            category: "ai_cliché",
            message: "Detected generic phrasing ('cutting-edge' or 'fast-paced').",
            fixSuggestion: "Replace generic buzzwords with concrete technical deliverables (e.g. Next.js App Router sub-second load times or local schema markup).",
          },
        ]
      : [];

    return {
      text: JSON.stringify({
        score,
        grade,
        summary: `The content for "${title}" is clear and well-structured with strong commercial intent.`,
        strengths: [
          "Clear technical value proposition without superficial hype",
          "Structured headings aligned with user search intent",
          "Focus on tangible business outcomes",
        ],
        issues,
        recommendedAction: "Ready for publication or minor editorial polish.",
      }),
    };
  }

  // ─── 3. Blog Outline ───
  if (cleanPrompt.includes("TASK: Create a comprehensive, highly-structured blog post outline")) {
    const topicMatch = cleanPrompt.match(/on\s+"([^"]+)"/i);
    const topic = topicMatch ? topicMatch[1] : "Business Web Strategy";
    const slug = slugify(topic);

    return {
      text: JSON.stringify({
        title: topic,
        slug,
        focusKeyword: topic.toLowerCase(),
        estimatedWordCount: "1200 - 1800 words",
        sections: [
          {
            heading: "Introduction: Why This Matters to Your Business",
            keyPoints: ["Opening hook on real commercial impact", "Core problem with traditional approaches", "What this guide delivers"],
          },
          {
            heading: "Key Cost & Architecture Factors",
            subheadings: ["Custom Code vs Template CMS", "Performance & Core Web Vitals ROI"],
            keyPoints: ["Comparison of long-term costs", "Ownership of code assets"],
          },
          {
            heading: "Conversion & Search Acquisition Strategy",
            subheadings: ["Local Search Indexing", "Direct Lead Routing via WhatsApp"],
            keyPoints: ["Actionable technical setup", "Mobile user experience"],
          },
          {
            heading: "Frequently Asked Questions",
            keyPoints: ["Implementation timelines", "Ongoing maintenance & hosting"],
          },
          {
            heading: "Conclusion & Strategic Next Steps",
            keyPoints: ["Action checklist", "Consultation CTA"],
          },
        ],
      }),
    };
  }

  // ─── 3.5 Blog From Outline ───
  if (cleanPrompt.includes("TASK: Write the full, in-depth blog post") || cleanPrompt.includes("APPROVED OUTLINE:")) {
    const topicMatch = cleanPrompt.match(/for\s+"([^"]+)"/i);
    const topic = topicMatch ? topicMatch[1] : "Business Web Strategy";
    const slug = slugify(topic);

    return {
      text: JSON.stringify({
        title: topic,
        slug,
        excerpt: `A practical, in-depth guide on ${topic.toLowerCase()} explaining key commercial factors, development costs, and performance considerations for business owners.`,
        content: `<p>When planning ${topic.toLowerCase()}, business owners often face conflicting advice regarding platforms, development costs, and ongoing maintenance. Understanding the technical and business realities helps you make an informed investment that delivers measurable returns.</p><h2>Understanding the Real Business Requirements</h2><p>Every successful digital asset begins with a clear commercial objective: acquiring qualified customer inquiries, establishing regional authority, or streamlining business operations. Building on a modern technology foundation such as Next.js ensures fast load times and long-term code ownership.</p><h2>Key Factors that Influence Results</h2><ul><li><strong>Page Speed &amp; Mobile UX:</strong> Over 70% of local search traffic originates from mobile devices. Sub-second load times directly reduce bounce rates.</li><li><strong>Conversion Architecture:</strong> Clear calls-to-action, direct WhatsApp routing, and frictionless contact touchpoints turn visitors into inquiries.</li><li><strong>Search Engine Entity Signals:</strong> Proper heading hierarchy, structured schema markup, and regional keyword integration help search engines index your services accurately.</li></ul><h2>Frequently Asked Questions</h2><h3>How long does implementation typically take?</h3><p>Most business projects take between 1 to 3 weeks depending on technical complexity and asset availability.</p><h3>How do we ensure long-term performance?</h3><p>Regular security patching, image optimization, and proactive Core Web Vitals monitoring maintain sub-second speed over time.</p><h2>Conclusion &amp; Next Steps</h2><p>Investing in high-speed, well-structured digital infrastructure creates a lasting competitive advantage for your business. For guidance tailored to your specific requirements, <a href="/contact">reach out to the HD Web Studios team</a>.</p>`,
        category: "Web Development",
        tags: ["web development", "business growth", "seo", "ludhiana", "next.js"],
        focusKeyword: topic.toLowerCase(),
        readingTime: 7,
        seoTitle: `${topic} Guide | HD Web Studios`,
        seoDescription: `Read our comprehensive guide on ${topic.toLowerCase()} covering strategy, performance, and commercial implementation.`,
      }),
    };
  }

  // ─── 4. SEO Metadata ───
  if (cleanPrompt.includes("TASK: Generate high-performing, click-worthy SEO metadata")) {
    const titleMatch = cleanPrompt.match(/titled\s+"([^"]+)"/i);
    const title = titleMatch ? titleMatch[1] : "Web Development";
    return {
      text: JSON.stringify({
        seoTitle: `${title.slice(0, 42)} | HD Web Studios`,
        seoDescription: `Custom ${title.toLowerCase()} engineered for sub-second speed, lead generation, and market authority in Ludhiana and Punjab.`,
        focusKeyword: title.toLowerCase(),
        secondaryKeywords: [`${title.toLowerCase()} ludhiana`, "web development agency punjab", "business website"],
        searchIntent: "Commercial",
      }),
    };
  }

  // ─── 5. Case Study / Project (Checked BEFORE Service to avoid conflict) ───
  const isProject =
    opts.contentType === "project" ||
    cleanPrompt.includes("TASK: Generate a factual, compelling portfolio case study") ||
    cleanPrompt.includes("CASE STUDY PARAMETERS:") ||
    cleanPrompt.includes("Project / Case Study Title:");

  if (isProject) {
    let cleanTitle = "Web Application Case Study";
    const titleMatch = cleanPrompt.match(/(?:Project \/ Case Study Title:|for\s+["']?)([^"'\n\r]+)/i);
    if (titleMatch) cleanTitle = titleMatch[1].trim();

    cleanTitle = cleanTitle
      .replace(/^(?:generate|create|build|write|make)\s+(?:a\s+)?(?:new\s+)?/i, "")
      .replace(/[":{}]+/g, "")
      .trim() || "Web Application";

    const slug = slugify(cleanTitle);
    return {
      text: JSON.stringify({
        title: cleanTitle,
        slug,
        client: `${cleanTitle.split(" ")[0]} Solutions`,
        category: "Web Development",
        industry: "Manufacturing & Business Services",
        location: "Ludhiana, Punjab",
        projectType: "client",
        year: new Date().getFullYear().toString(),
        shortDescription: `High-performance digital platform engineered for ${cleanTitle.toLowerCase()} with sub-second mobile transitions and streamlined inquiry capture.`,
        description: `HD Web Studios was commissioned to engineer a modern, high-speed web application for ${cleanTitle}. The previous setup suffered from sluggish mobile performance and low conversion rates. We designed a bespoke Next.js platform delivering rapid page rendering and integrated customer inquiry routing.`,
        challenge: `The client's legacy website suffered from slow page loads on mobile networks, an outdated visual identity, and form submission drop-offs that limited commercial lead flow.`,
        solution: `We engineered a bespoke Next.js App Router platform with optimized Core Web Vitals, Schema.org LocalBusiness markup, and instant WhatsApp inquiry routing.`,
        features: [
          "Touch-optimized mobile layout with sub-second page transitions",
          "Direct WhatsApp and click-to-call conversion buttons",
          "Structured Schema.org markup for local search visibility",
          "Custom administrative CMS for effortless content updates",
        ],
        technologies: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"],
        services: ["Business Website Development", "Local SEO", "Custom Web Application"],
        results: [
          "Sub-second initial page load across mobile 4G networks",
          "100% Core Web Vitals compliance on Google PageSpeed Insights",
          "Streamlined customer communication via direct WhatsApp routing",
        ],
        liveUrl: "",
        demoUrl: "",
        seoTitle: `${cleanTitle} Case Study | HD Web Studios`,
        seoDescription: `Discover how HD Web Studios engineered a high-speed digital platform for ${cleanTitle} with sub-second mobile performance.`,
      }),
    };
  }

  // ─── 6. Service Page Generation ───
  const isService =
    opts.contentType === "service" ||
    cleanPrompt.includes("TASK: Generate a complete, high-converting service") ||
    cleanPrompt.includes("Primary Service Name:") ||
    cleanPrompt.includes("SERVICE PARAMETERS:") ||
    /\b(?:local seo|seo services|google business profile|web development services|google ads)\b/i.test(cleanPrompt);

  if (isService) {
    let cleanTopic = cleanPrompt;
    const nameMatch = cleanPrompt.match(/(?:Primary Service Name:|for\s+["']?|TASK:.*?for\s+["']?)([^"'\n\r]+)/i);
    if (nameMatch) {
      cleanTopic = nameMatch[1].trim();
    }
    cleanTopic = cleanTopic
      .replace(/^(?:generate|create|build|write|make)\s+(?:a\s+)?(?:new\s+)?/i, "")
      .replace(/\s+page.*$/i, "")
      .replace(/\s+for\s+.*$/i, "")
      .replace(/[":{}]+/g, "")
      .trim();

    if (!cleanTopic || cleanTopic.length < 3) cleanTopic = "Local SEO Services";

    const isLocalSeo = /\b(?:local seo|seo|google maps|maps|gbp|google business profile|citations|reviews)\b/i.test(cleanPrompt);
    const isGoogleAds = /\b(?:google ads|ads|ppc|paid search|adwords|roas)\b/i.test(cleanPrompt);
    const isEcommerce = /\b(?:ecommerce|e-commerce|store|shop|woocommerce)\b/i.test(cleanPrompt);

    if (isLocalSeo) {
      return {
        text: JSON.stringify({
          slug: "local-seo-services",
          icon: "TrendingUp",
          eyebrow: "Local Search Growth",
          title: "Local SEO & Google Business Profile Optimization",
          tagline: "Dominate Google Maps 3-Pack rankings and acquire high-intent local customer inquiries in Ludhiana, Punjab and North India.",
          shortDescription: "Strategic Local SEO and Google Maps optimization engineered to rank your business for high-intent local buyer searches.",
          description: "We optimize your complete local search ecosystem to drive verifiable phone calls, walk-in inquiries, and direct WhatsApp consultations. From Google Business Profile optimization and local citations to localized Schema.org markup and review acquisition systems, we establish regional market authority.",
          category: "SEO & Growth",
          accent: "orange",
          order: 0,
          published: true,
          heroStats: [
            { label: "Maps 3-Pack", value: "Optimized" },
            { label: "Local Signals", value: "100% NAP" },
            { label: "Inquiry Capture", value: "Calls & WA" },
          ],
          overview: {
            heading: "Strategic Local SEO Engineered for Real Regional Inquiries",
            paragraphs: [
              "Over 80% of local customers search for services on Google Maps and regional mobile search before making a purchase. Businesses with incomplete profiles or unoptimized local signals lose qualified inquiries to competitors every day.",
              "HD Web Studios deploys a systematic local search framework: verifying Google Business Profile categories, building consistent NAP (Name, Address, Phone) citations, deploying LocalBusiness schema markup, and streamlining customer review collection to secure top Google Maps 3-Pack placements.",
            ],
            highlights: [
              {
                icon: "MapPin",
                title: "Google Maps 3-Pack Prominence",
                text: "Target high-intent buyer keywords across Ludhiana, Punjab, and your surrounding commercial service radius.",
              },
              {
                icon: "Search",
                title: "Local Keyword & Entity Optimization",
                text: "Optimize service titles, geo-tagged descriptions, and local landing pages for proximity and search intent.",
              },
              {
                icon: "Smartphone",
                title: "Direct Mobile Inquiry Routing",
                text: "Connect local searchers directly to your phone line and WhatsApp for frictionless commercial consultations.",
              },
            ],
          },
          whatYouGet: [
            {
              icon: "MapPin",
              title: "Google Business Profile Optimization",
              text: "Full audit, category selection, service menu structuring, photo optimization, and geo-relevance tagging.",
            },
            {
              icon: "Search",
              title: "Local Search & Maps 3-Pack Strategy",
              text: "Targeted ranking strategies for commercial keywords with local search intent across North India.",
            },
            {
              icon: "Layout",
              title: "LocalBusiness Schema & On-Page SEO",
              text: "Structured JSON-LD schema markup, geo-coordinates, and local service landing page optimization.",
            },
            {
              icon: "Shield",
              title: "Citation Building & NAP Consistency",
              text: "Clean, authoritative directory listings ensuring consistent business name, address, and phone numbers.",
            },
            {
              icon: "TrendingUp",
              title: "Customer Review Acquisition Funnels",
              text: "Streamlined feedback funnels to gather positive Google customer reviews that build trust and ranking power.",
            },
            {
              icon: "Headphones",
              title: "Monthly Local Insights & Tracking",
              text: "Transparent monthly reporting on Google Maps views, keyword movements, phone calls, and direct clicks.",
            },
          ],
          faq: [
            {
              q: "How soon can we expect results from Local SEO?",
              a: "Google Business Profile optimizations and citation updates typically show measurable improvements in Google Maps visibility and phone inquiries within 4 to 8 weeks.",
            },
            {
              q: "Do you guarantee #1 ranking on Google Maps?",
              a: "No ethical agency can guarantee specific algorithmic positions. We guarantee strict adherence to Google's Local Search Guidelines, comprehensive citation building, and proven optimization strategies that consistently increase local inquiries.",
            },
            {
              q: "Why is Local SEO important for businesses in Ludhiana and Punjab?",
              a: "Local search captures prospective buyers at the exact moment they need a service. Ranking in the Google Maps 3-Pack delivers the highest conversion rate of any digital acquisition channel.",
            },
            {
              q: "Do we need a physical office or shop address for Google Maps?",
              a: "Yes, a verifiable business location or defined service area is required to establish and rank a Google Business Profile.",
            },
          ],
          seoTitle: "Local SEO Services in Ludhiana & Punjab | HD Web Studios",
          seoDescription: "Dominate Google Maps 3-Pack and capture high-intent local customer inquiries. Proven Local SEO and Google Business Profile optimization.",
          ogImage: "/images/og-services.jpg",
        }),
      };
    }

    const category = isEcommerce ? "E-Commerce" : isGoogleAds ? "SEO & Growth" : detectCategory(cleanTopic);
    const accent = category === "E-Commerce" ? "emerald" : category === "Web Applications" ? "purple" : category === "SEO & Growth" ? "orange" : "blue";
    const icon = selectIconForTopic(cleanTopic, category);
    const slug = slugify(cleanTopic);

    return {
      text: JSON.stringify({
        slug,
        icon,
        eyebrow: `${cleanTopic} Solutions`,
        title: cleanTopic,
        tagline: `High-performance ${cleanTopic.toLowerCase()} engineered for business growth in Ludhiana, Punjab and across India.`,
        shortDescription: `Custom ${cleanTopic.toLowerCase()} designed for sub-second speed, seamless mobile UX, and continuous customer acquisition.`,
        description: `We build bespoke ${cleanTopic.toLowerCase()} systems engineered to turn search visitors into paying clients. Combining Next.js App Router performance, mobile-first UX design, and localized Google search structure, we help your business establish market authority.`,
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
          heading: `Strategic ${cleanTopic} Engineered for Real Business Needs`,
          paragraphs: [
            `Most businesses investing in ${cleanTopic.toLowerCase()} struggle with slow page speeds, high developer lock-in, and platforms that fail to generate phone inquiries or qualified leads.`,
            `HD Web Studios approaches ${cleanTopic.toLowerCase()} with a conversion-first methodology. We build on a clean, scalable stack ensuring fast loading times across 4G mobile networks, direct WhatsApp acquisition funnels, and verifiable Core Web Vitals performance.`,
          ],
          highlights: [
            {
              icon: "Smartphone",
              title: "Mobile-First Conversion UX",
              text: "Engineered specifically for touch interfaces, instant call triggers, and intuitive user navigation.",
            },
            {
              icon: "Gauge",
              title: "Sub-Second Page Transitions",
              text: "Optimized Core Web Vitals ensuring rapid loading and lower bounce rates for paid and organic visitors.",
            },
            {
              icon: "Search",
              title: "Schema.org & Local Search Markup",
              text: "Structured metadata and local business tagging to improve regional search visibility across North India.",
            },
          ],
        },
        whatYouGet: [
          {
            icon: "Layout",
            title: "Custom Responsive Architecture",
            text: "Clean, bespoke design tailored to your specific brand identity, avoiding bloated pre-made templates.",
          },
          {
            icon: "Smartphone",
            title: "Mobile Speed & Layout Optimization",
            text: "Flawless rendering and instant click-to-call/WhatsApp triggers across every device size.",
          },
          {
            icon: "Search",
            title: "Search Engine Optimization",
            text: "On-page metadata, semantic heading hierarchy, XML sitemaps, and OpenGraph tags built in.",
          },
          {
            icon: "Gauge",
            title: "Core Web Vitals Compliance",
            text: "Sub-second LCP and zero cumulative layout shift for superior Google search rankings.",
          },
          {
            icon: "Shield",
            title: "Security & Form Protection",
            text: "Honeypot anti-spam protection, SSL encryption, and secure client inquiry transmission.",
          },
          {
            icon: "Headphones",
            title: "Direct Engineering Support",
            text: "Dedicated post-launch warranty, uptime monitoring, and reliable technical guidance.",
          },
        ],
        faq: [
          {
            q: `How long does it take to build a ${cleanTopic.toLowerCase()} solution?`,
            a: "Standard business websites and landing systems are delivered within 7 to 14 business days, depending on scope and client asset readiness.",
          },
          {
            q: "Do I own 100% of the website and code after launch?",
            a: "Yes. HD Web Studios grants 100% code and content ownership upon project completion without ongoing platform lock-in.",
          },
          {
            q: "How does this service help generate customer inquiries?",
            a: "We structure the user journey with sticky mobile CTAs, direct WhatsApp consultation buttons, high-speed load times, and local search trust badges.",
          },
          {
            q: "Do you provide ongoing maintenance and speed updates?",
            a: "Yes, we offer proactive maintenance packages covering daily backups, security patching, Core Web Vitals checks, and content updates.",
          },
        ],
        seoTitle: `${cleanTopic} in Ludhiana & Punjab | HD Web Studios`,
        seoDescription: `Custom ${cleanTopic.toLowerCase()} engineered for sub-second speed, lead generation, and market authority. Contact HD Web Studios today.`,
        ogImage: "/images/og-services.jpg",
      }),
    };
  }

  // ─── 7. Default: Blog Post ───
  const topic = cleanPrompt.replace(/^Generate.*for\s+/i, "").replace(/[":{}]+/g, "").trim() || "Business Web Strategy";
  const slug = slugify(topic);
  return {
    text: JSON.stringify({
      title: topic,
      slug,
      excerpt: `A practical, in-depth guide on ${topic.toLowerCase()} explaining key commercial factors, development costs, and performance considerations for business owners.`,
      content: `<p>When planning ${topic.toLowerCase()}, business owners often face conflicting advice regarding platforms, development costs, and ongoing maintenance. Understanding the technical and business realities helps you make an informed investment that delivers measurable returns.</p><h2>Understanding the Real Business Requirements</h2><p>Every successful digital asset begins with a clear commercial objective: acquiring qualified customer inquiries, establishing regional authority, or streamlining business operations. Building on a modern technology foundation such as Next.js ensures fast load times and long-term code ownership.</p><h2>Key Factors that Influence Results</h2><ul><li><strong>Page Speed &amp; Mobile UX:</strong> Over 70% of local search traffic originates from mobile devices. Sub-second load times directly reduce bounce rates.</li><li><strong>Conversion Architecture:</strong> Clear calls-to-action, direct WhatsApp routing, and frictionless contact touchpoints turn visitors into inquiries.</li><li><strong>Search Engine Entity Signals:</strong> Proper heading hierarchy, structured schema markup, and regional keyword integration help search engines index your services accurately.</li></ul><h2>Frequently Asked Questions</h2><h3>How long does implementation typically take?</h3><p>Most business projects take between 1 to 3 weeks depending on technical complexity and asset availability.</p><h3>How do we ensure long-term performance?</h3><p>Regular security patching, image optimization, and proactive Core Web Vitals monitoring maintain sub-second speed over time.</p><h2>Conclusion &amp; Next Steps</h2><p>Investing in high-speed, well-structured digital infrastructure creates a lasting competitive advantage for your business. For guidance tailored to your specific requirements, <a href="/contact">reach out to the HD Web Studios team</a>.</p>`,
      category: "Web Development",
      tags: ["web development", "business growth", "seo", "ludhiana", "next.js"],
      focusKeyword: topic.toLowerCase(),
      secondaryKeywords: ["website strategy", "business website guide", "punjab web agency"],
      author: "Harshdeep",
      readingTime: 6,
      seoTitle: `${topic} Guide | HD Web Studios`,
      seoDescription: `Read our comprehensive guide on ${topic.toLowerCase()} covering strategy, performance, and commercial implementation.`,
      suggestedImageConcept: `Modern workspace with analytics dashboards and code architecture for ${topic}`,
    }),
  };
}

function detectCategory(topic) {
  const t = topic.toLowerCase();
  if (t.includes("ecommerce") || t.includes("shop") || t.includes("store")) return "E-Commerce";
  if (t.includes("app") || t.includes("portal") || t.includes("dashboard") || t.includes("mern")) return "Web Applications";
  if (t.includes("seo") || t.includes("ads") || t.includes("google") || t.includes("marketing") || t.includes("maps")) return "SEO & Growth";
  if (t.includes("maintenance") || t.includes("speed") || t.includes("security")) return "Maintenance";
  return "Web Development";
}

function selectIconForTopic(topic, category) {
  const t = topic.toLowerCase();
  if (t.includes("seo") || t.includes("growth") || t.includes("maps")) return "TrendingUp";
  if (t.includes("ecommerce") || t.includes("shop")) return "ShoppingBag";
  if (t.includes("app") || t.includes("dashboard") || t.includes("portal")) return "Layers";
  if (t.includes("speed") || t.includes("performance")) return "Zap";
  if (t.includes("security") || t.includes("maintenance")) return "ShieldCheck";
  if (t.includes("mobile") || t.includes("responsive")) return "Smartphone";
  return "Globe";
}
