import connectDB from "@/lib/db";
import Service from "@/models/Service";
import Project from "@/models/Project";
import { siteConfig, absoluteUrl } from "@/config/site";

export const dynamic = "force-dynamic";

export async function GET() {
  let services = [];
  let projects = [];

  try {
    await connectDB();
    [services, projects] = await Promise.all([
      Service.find({ published: true }).select("title slug description category").sort({ order: 1 }).lean(),
      Project.find({ published: true }).select("title slug category client").sort({ order: 1 }).limit(10).lean(),
    ]);
  } catch (err) {
    console.error("[llms.txt] Error fetching dynamic data:", err);
  }

  const content = `# HD Web Studios — Machine-Readable Site Manifest & Entity Information
> High-Performance Web Development, Local SEO & Digital Growth Studio based in Ludhiana, Punjab, India.

## Studio Overview
- Name: ${siteConfig.name}
- Short Name: ${siteConfig.shortName}
- Website: ${siteConfig.url}
- Founder & Lead Developer: Harshdeep
- Primary Location: Ludhiana, Punjab, India (PIN: 141007)
- Service Area: Ludhiana, Punjab, National (India), and Global Remote Clients
- Contact Email: ${siteConfig.email}
- Contact Phone: ${siteConfig.phoneDisplay}
- Official Entity ID: ${siteConfig.url}/#organization
- Core Capabilities: High-performance Next.js website development, MERN stack web applications, Local SEO, Conversion Rate Optimization (CRO), and Business Automation software.

## Core Architectural & Technical Principles
- Modern Next.js App Router architecture with Server Components by default.
- Sub-second Core Web Vitals optimization, mobile-first responsive interfaces.
- Deterministic Schema.org structured data (Organization, LocalBusiness, Service, BreadcrumbList, FAQPage, CreativeWork).
- Clean semantic HTML with accessible hierarchical headings and zero keyword stuffing.
- Direct developer communication without intermediary sales layers.

## Core Services & Capabilities
${services.length > 0 ? services.map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.description?.slice(0, 160) || s.category || "Professional service"}`).join("\n") : `- [Business Website Development](${absoluteUrl("/services/business-website-development")}): Custom business websites engineered for speed, trust, and client acquisition.
- [Website Redesign & Modernization](${absoluteUrl("/services/website-redesign-modernization")}): Upgrade outdated websites to modern Next.js stack while preserving SEO equity.
- [Ecommerce Website Development](${absoluteUrl("/services/ecommerce-website-development")}): High-speed online stores with Razorpay, UPI, and friction-free mobile checkout.
- [Custom Web Application Development](${absoluteUrl("/services/custom-web-application-development")}): Full-stack MERN & Next.js SaaS portals and operational software.
- [Local SEO & Google Business Optimization](${absoluteUrl("/services/local-seo-google-business-optimization")}): Regional search domination for Ludhiana and Punjab businesses.`}

## Key Case Studies & Selected Work
${projects.length > 0 ? projects.map((p) => `- [${p.title}](${absoluteUrl(`/work/${p.slug}`)}): ${p.client ? `Client: ${p.client} — ` : ""}${p.category || "Case Study"}`).join("\n") : `- [Selected Work Catalog](${absoluteUrl("/work")}): Real-world web architectures and custom software deployments.`}

## Verified Public Endpoints
- Homepage: ${absoluteUrl("/")}
- Services Catalog: ${absoluteUrl("/services")}
- Work / Case Studies: ${absoluteUrl("/work")}
- About the Founder & Studio: ${absoluteUrl("/about")}
- Transparent Pricing Packages: ${absoluteUrl("/pricing")}
- Free Website Audit Tool: ${absoluteUrl("/audit")}
- Direct Inquiry & Contact: ${absoluteUrl("/contact")}
- XML Sitemap: ${absoluteUrl("/sitemap.xml")}
- Robots Directive: ${absoluteUrl("/robots.txt")}
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
