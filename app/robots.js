import { absoluteUrl } from "@/config/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/admin/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
