import { absoluteUrl } from "@/config/site";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import Project from "@/models/Project";
import Post from "@/models/Post";
import Story from "@/models/Story";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const currentDate = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/stories", priority: 0.7, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/thank-you", priority: 0.2, changeFrequency: "yearly" },
  ];

  try {
    await connectDB();

    const [services, projects, posts, stories] = await Promise.all([
      Service.find({ published: true }).select("slug updatedAt").sort({ order: 1 }).lean(),
      Project.find({ published: true }).select("slug updatedAt").sort({ order: 1 }).lean(),
      Post.find({ status: "published" }).select("slug updatedAt").sort({ publishedAt: -1 }).lean(),
      Story.find({ status: "published" }).select("slug updatedAt").sort({ publishedAt: -1 }).lean(),
    ]);

    const serviceRoutes = services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: s.updatedAt || currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    }));

    const portfolioRoutes = projects.map((p) => ({
      url: absoluteUrl(`/portfolio/${p.slug}`),
      lastModified: p.updatedAt || currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    const blogRoutes = posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updatedAt || currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const storyRoutes = stories.map((s) => ({
      url: absoluteUrl(`/stories/${s.slug}`),
      lastModified: s.updatedAt || currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const staticMapped = staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified: currentDate,
      changeFrequency,
      priority,
    }));

    return [...staticMapped, ...serviceRoutes, ...portfolioRoutes, ...blogRoutes, ...storyRoutes];
  } catch (error) {
    console.error("[sitemap] Failed to fetch dynamic routes:", error);
    return staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified: currentDate,
      changeFrequency,
      priority,
    }));
  }
}
