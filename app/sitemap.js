import { absoluteUrl } from "@/config/site";
import { getAllPublishedServiceSlugs } from "@/lib/services";
import { getAllPublishedProjectSlugs } from "@/lib/projects";
import { getAllPublishedPostSlugs } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const currentDate = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/thank-you", priority: 0.2, changeFrequency: "yearly" },
  ];

  const serviceSlugs = await getAllPublishedServiceSlugs();
  const serviceRoutes = serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.9,
    changeFrequency: "monthly",
  }));

  const projectSlugs = await getAllPublishedProjectSlugs();
  const portfolioRoutes = projectSlugs.map((slug) => ({
    path: `/portfolio/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const postSlugs = await getAllPublishedPostSlugs();
  const blogRoutes = postSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...blogRoutes].map(
    ({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified: currentDate,
      changeFrequency,
      priority,
    })
  );
}
