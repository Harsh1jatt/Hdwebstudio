import { getPublishedServices } from "@/lib/services";
import ServicesListing from "@/components/services/ServicesListing";
import { absoluteUrl, siteConfig } from "@/config/site";

export const metadata = {
  title: { absolute: "Website Development & Digital Solutions in Ludhiana | HD Web Studios" },
  description:
    "Explore custom website development, website redesign, ecommerce stores, web apps, and Local SEO services in Ludhiana, Punjab. Fast Next.js architecture.",
  alternates: {
    canonical: absoluteUrl("/services"),
  },
  openGraph: {
    title: "Website Development & Digital Services | HD Web Studios",
    description:
      "Custom website development, ecommerce, and Local SEO services in Ludhiana, Punjab. Sub-second performance and full code ownership.",
    url: absoluteUrl("/services"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development & Digital Services | HD Web Studios",
    description: "Custom website development, ecommerce, and Local SEO services in Ludhiana.",
  },
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

  const serviceListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "HD Web Studios Services",
    description: "Professional website development, web applications, SEO, and digital growth solutions for businesses in Ludhiana, Punjab and across India.",
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => (
      {
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/services/${s.slug}`),
        name: s.title,
      }
    )),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListJsonLd) }} />
      <ServicesListing services={services} />
    </>
  );
}
