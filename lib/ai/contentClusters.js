import Service from "../../models/Service.js";
import Post from "../../models/Post.js";
import Project from "../../models/Project.js";

/**
 * Builds Content Cluster graph showing Pillar services, supporting blogs, and related case studies.
 */
export async function getContentClusters() {
  const [services, posts, projects] = await Promise.all([
    Service.find().select("title slug category published").lean(),
    Post.find().select("title slug category tags status").lean(),
    Project.find().select("title slug category technologies published").lean(),
  ]);

  const categoryMap = {};

  for (const s of services) {
    const cat = s.category || "Web Development";
    if (!categoryMap[cat]) {
      categoryMap[cat] = {
        category: cat,
        pillarServices: [],
        supportingBlogs: [],
        caseStudies: [],
      };
    }
    categoryMap[cat].pillarServices.push({
      id: s._id.toString(),
      title: s.title,
      slug: s.slug,
      url: `/services/${s.slug}`,
      published: s.published,
    });
  }

  for (const p of posts) {
    const cat = p.category || "Web Development";
    if (!categoryMap[cat]) {
      categoryMap[cat] = {
        category: cat,
        pillarServices: [],
        supportingBlogs: [],
        caseStudies: [],
      };
    }
    categoryMap[cat].supportingBlogs.push({
      id: p._id.toString(),
      title: p.title,
      slug: p.slug,
      url: `/blog/${p.slug}`,
      status: p.status,
    });
  }

  for (const pr of projects) {
    const cat = pr.category || "Web Development";
    if (!categoryMap[cat]) {
      categoryMap[cat] = {
        category: cat,
        pillarServices: [],
        supportingBlogs: [],
        caseStudies: [],
      };
    }
    categoryMap[cat].caseStudies.push({
      id: pr._id.toString(),
      title: pr.title,
      slug: pr.slug,
      url: `/work/${pr.slug}`,
      published: pr.published,
    });
  }

  return {
    totalClusters: Object.keys(categoryMap).length,
    clusters: Object.values(categoryMap),
  };
}
