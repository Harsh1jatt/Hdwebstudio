const SITE_URL = "https://hdwebstudios.in";

export default function sitemap() {
  const currentDate = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/services/web-development`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/services/ui-ux`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/services/seo`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/services/ecommerce`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/portfolio`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/pricing`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${SITE_URL}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${SITE_URL}/refund-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}