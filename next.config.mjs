/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/stories",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/stories/:slug*",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/services/create-srvice-for-business-website-development",
        destination: "/services/business-website-development",
        permanent: true,
      },
      {
        source: "/services/web-development",
        destination: "/services/business-website-development",
        permanent: true,
      },
      {
        source: "/services/website-design",
        destination: "/services/business-website-development",
        permanent: true,
      },
      {
        source: "/services/website-redesign",
        destination: "/services/website-redesign-modernization",
        permanent: true,
      },
      {
        source: "/services/local-seo",
        destination: "/services/local-seo-google-business-optimization",
        permanent: true,
      },
      {
        source: "/services/ecommerce-development",
        destination: "/services/ecommerce-website-development",
        permanent: true,
      },
      {
        source: "/services/custom-web-apps",
        destination: "/services/custom-web-application-development",
        permanent: true,
      },
      {
        source: "/services/website-maintenance",
        destination: "/services/website-maintenance-support",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/portfolio/:slug",
        destination: "/work/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
