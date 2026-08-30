import { absoluteUrl } from "@/config/site";
import { getPublishedServices } from "@/lib/services";
import { getPublishedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const currentDate = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/audit", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  try {
    const [services, projects] = await Promise.all([
      getPublishedServices().catch(() => []),
      getPublishedProjects().catch(() => []),
    ]);

    const serviceRoutes = services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: s.updatedAt ? new Date(s.updatedAt) : currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    }));

    const workRoutes = projects.map((p) => ({
      url: absoluteUrl(`/work/${p.slug}`),
      lastModified: p.updatedAt ? new Date(p.updatedAt) : currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    const staticMapped = staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified: currentDate,
      changeFrequency,
      priority,
    }));

    return [...staticMapped, ...serviceRoutes, ...workRoutes];
  } catch (error) {
    console.error("[sitemap] Error generating sitemap:", error);
    return staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified: currentDate,
      changeFrequency,
      priority,
    }));
  }
}
