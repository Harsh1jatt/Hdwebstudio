import Service from "../../models/Service.js";
import Post from "../../models/Post.js";
import Project from "../../models/Project.js";

/**
 * Scans content and compares with published pages to recommend natural internal links.
 */
export async function findInternalLinkRecommendations({ content, currentSlug = "" }) {
  if (!content) return { recommendations: [] };

  const [services, posts, projects] = await Promise.all([
    Service.find({ published: true, slug: { $ne: currentSlug } }).select("title slug category").lean(),
    Post.find({ status: "published", slug: { $ne: currentSlug } }).select("title slug category").lean(),
    Project.find({ published: true, slug: { $ne: currentSlug } }).select("title slug category").lean(),
  ]);

  const targetPages = [
    { title: "Contact Us", slug: "contact", url: "/contact", keywords: ["contact", "quote", "consultation", "enquiry", "get in touch", "talk to us"] },
    { title: "Services Overview", slug: "services", url: "/services", keywords: ["our services", "web development services", "digital solutions"] },
    { title: "Portfolio", slug: "portfolio", url: "/portfolio", keywords: ["portfolio", "case studies", "our work", "past projects"] },
    { title: "Pricing & Packages", slug: "pricing", url: "/pricing", keywords: ["pricing", "cost", "packages", "rates"] },
    ...services.map((s) => ({
      title: s.title,
      slug: s.slug,
      url: `/services/${s.slug}`,
      keywords: [s.title.toLowerCase(), s.slug.replace(/-/g, " "), ...(s.category ? [s.category.toLowerCase()] : [])],
    })),
    ...posts.map((p) => ({
      title: p.title,
      slug: p.slug,
      url: `/blog/${p.slug}`,
      keywords: [p.title.toLowerCase(), p.slug.replace(/-/g, " ")],
    })),
    ...projects.map((pr) => ({
      title: pr.title,
      slug: pr.slug,
      url: `/portfolio/${pr.slug}`,
      keywords: [pr.title.toLowerCase(), `${pr.title.toLowerCase()} case study`],
    })),
  ];

  const lowerContent = content.toLowerCase();
  const recommendations = [];
  const addedUrls = new Set();

  for (const page of targetPages) {
    if (addedUrls.has(page.url)) continue;

    for (const kw of page.keywords) {
      if (kw.length < 4) continue;
      const index = lowerContent.indexOf(kw);

      if (index !== -1) {
        // Extract surrounding context snippet (40 chars before and after)
        const start = Math.max(0, index - 30);
        const end = Math.min(content.length, index + kw.length + 30);
        const snippet = content.slice(start, end).trim();

        recommendations.push({
          targetTitle: page.title,
          targetUrl: page.url,
          suggestedAnchor: kw,
          contextSnippet: `...${snippet}...`,
          priority: page.url.startsWith("/services") ? "high" : "normal",
        });

        addedUrls.add(page.url);
        break;
      }
    }

    if (recommendations.length >= 6) break;
  }

  return {
    count: recommendations.length,
    recommendations,
  };
}
