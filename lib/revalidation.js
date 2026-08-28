/**
 * HD Web Studios — On-Demand Path & Sitemap Cache Revalidation
 */

let revalidatePathFn = null;

async function getRevalidatePath() {
  if (revalidatePathFn) return revalidatePathFn;
  try {
    const mod = await import("next/cache");
    revalidatePathFn = mod.revalidatePath;
  } catch {
    revalidatePathFn = () => {};
  }
  return revalidatePathFn;
}

export async function revalidateContent({ type, slug } = {}) {
  try {
    const revalidate = await getRevalidatePath();

    // 1. Invalidate sitemap & machine-readable manifests
    revalidate("/sitemap.xml");
    revalidate("/llms.txt");

    // 2. Invalidate homepage
    revalidate("/");

    // 3. Invalidate listing and detail pages
    if (type === "service") {
      revalidate("/services");
      if (slug) revalidate(`/services/${slug}`);
    } else if (type === "blog" || type === "post") {
      revalidate("/blog");
      if (slug) revalidate(`/blog/${slug}`);
    } else if (type === "project") {
      revalidate("/work");
      if (slug) revalidate(`/work/${slug}`);
      revalidate("/portfolio");
    } else if (type === "story") {
      revalidate("/stories");
      if (slug) revalidate(`/stories/${slug}`);
    } else if (type === "pricing") {
      revalidate("/pricing");
    } else if (type === "about") {
      revalidate("/about");
    } else if (type === "audit") {
      revalidate("/audit");
    } else if (type === "faq" || type === "testimonial") {
      revalidate("/");
      revalidate("/services");
    } else if (type === "settings") {
      revalidate("/", "layout");
      revalidate("/contact");
      revalidate("/about");
    } else if (slug && typeof slug === "string" && slug.startsWith("/")) {
      revalidate(slug);
    }

    return { success: true, timestamp: new Date().toISOString() };
  } catch (error) {
    console.warn("[Revalidation] Notice:", error?.message);
    return { success: false, error: error?.message };
  }
}

export function revalidateCmsPath(path) {
  return revalidateContent({ type: "custom", slug: path });
}

export function revalidateEntityRoutes(type, slug) {
  return revalidateContent({ type, slug });
}

