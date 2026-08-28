import { absoluteUrl } from "@/config/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/_next/static/",
          "/_next/image/",
          "/logo.svg",
          "/logo.png",
          "/favicon.ico",
          "/images/",
          "/projects/",
          "/uploads/",
          "/og/",
        ],
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/thank-you",
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

