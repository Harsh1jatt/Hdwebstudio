/**
 * Scans content and compares with site pages to recommend natural, contextual internal links.
 * Browser & Server safe (no direct Mongoose model imports).
 */

let candidatesCache = null;
let lastFetchTime = 0;

async function getCandidatePages() {
  if (typeof window !== "undefined") {
    if (candidatesCache && Date.now() - lastFetchTime < 60000) {
      return candidatesCache;
    }
    try {
      const res = await fetch("/api/admin/seo/internal-links");
      const json = await res.json();
      if (json.success) {
        candidatesCache = json;
        lastFetchTime = Date.now();
        return json;
      }
    } catch {
      /* ignore fetch issues */
    }
  }
  return { services: [], posts: [], projects: [] };
}

export async function findInternalLinkRecommendations({
  content = "",
  currentSlug = "",
  services: customServices,
  posts: customPosts,
  projects: customProjects,
}) {
  if (!content) return { recommendations: [] };

  let services = customServices;
  let posts = customPosts;
  let projects = customProjects;

  if (!services || !posts || !projects) {
    const fetched = await getCandidatePages();
    services = services || fetched.services || [];
    posts = posts || fetched.posts || [];
    projects = projects || fetched.projects || [];
  }

  const filteredServices = services.filter((s) => s.slug !== currentSlug);
  const filteredPosts = posts.filter((p) => p.slug !== currentSlug);
  const filteredProjects = projects.filter((pr) => pr.slug !== currentSlug);

  const targetPages = [
    {
      title: "Contact & Discovery",
      slug: "contact",
      url: "/contact",
      whyRelevant: "Direct conversion action for potential clients seeking estimates or consultations.",
      keywords: ["contact us", "get a quote", "free consultation", "discuss your project", "start discovery", "reach out"],
    },
    {
      title: "Free Website Audit Tool",
      slug: "audit",
      url: "/audit",
      whyRelevant: "Lead magnet for visitors interested in evaluating their current site performance.",
      keywords: ["website audit", "free digital audit", "audit your site", "performance review", "check site speed"],
    },
    {
      title: "Selected Work & Case Studies",
      slug: "work",
      url: "/work",
      whyRelevant: "Social proof demonstrating real-world technical deliverables and business outcomes.",
      keywords: ["case studies", "selected work", "our portfolio", "past projects", "client work"],
    },
    {
      title: "Pricing Packages",
      slug: "pricing",
      url: "/pricing",
      whyRelevant: "Commercial intent reference for visitors evaluating project budgets.",
      keywords: ["transparent pricing", "website development cost", "pricing packages", "development rates"],
    },
    ...filteredServices.map((s) => ({
      title: s.title,
      slug: s.slug,
      url: `/services/${s.slug}`,
      whyRelevant: `Commercial service landing page addressing ${s.title.toLowerCase()}.`,
      keywords: [
        s.title.toLowerCase(),
        s.slug.replace(/-/g, " "),
        ...(s.eyebrow ? [s.eyebrow.toLowerCase()] : []),
        ...(s.category ? [s.category.toLowerCase()] : []),
      ],
    })),
    ...filteredProjects.map((pr) => ({
      title: `${pr.title} Case Study`,
      slug: pr.slug,
      url: `/work/${pr.slug}`,
      whyRelevant: `Case study proof for ${pr.client || pr.category || "client project"}.`,
      keywords: [
        pr.title.toLowerCase(),
        `${pr.title.toLowerCase()} case study`,
        ...(pr.client ? [pr.client.toLowerCase()] : []),
      ],
    })),
    ...filteredPosts.map((p) => ({
      title: p.title,
      slug: p.slug,
      url: `/blog/${p.slug}`,
      whyRelevant: "Informational resource providing detailed topical background.",
      keywords: [
        p.title.toLowerCase(),
        p.slug.replace(/-/g, " "),
        ...(p.focusKeyword ? [p.focusKeyword.toLowerCase()] : []),
      ],
    })),
  ];

  const lowerContent = content.toLowerCase();
  const recommendations = [];
  const addedUrls = new Set();

  for (const page of targetPages) {
    if (addedUrls.has(page.url)) continue;

    for (const kw of page.keywords) {
      if (kw.length < 3) continue;
      const index = lowerContent.indexOf(kw);

      if (index !== -1) {
        const start = Math.max(0, index - 35);
        const end = Math.min(content.length, index + kw.length + 35);
        const snippet = content.slice(start, end).trim();

        recommendations.push({
          targetTitle: page.title,
          targetUrl: page.url,
          suggestedAnchor: kw,
          whyRelevant: page.whyRelevant,
          contextSnippet: `...${snippet}...`,
          priority: page.url.startsWith("/services") || page.url === "/contact" ? "high" : "normal",
        });

        addedUrls.add(page.url);
        break;
      }
    }

    if (recommendations.length >= 8) break;
  }

  return {
    count: recommendations.length,
    recommendations,
  };
}
