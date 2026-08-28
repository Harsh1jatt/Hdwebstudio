import { absoluteUrl } from "@/config/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/", "/_next/image/", "/logo.svg", "/favicon.ico", "/images/"],
        disallow: [
          "/admin",
          "/admin/",
          "/api/admin/",
          "/api/auth/",
          "/api/setup-admin",
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

