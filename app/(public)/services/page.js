import { getPublishedServices } from "@/lib/services";
import ServicesListing from "@/components/services/ServicesListing";
import { absoluteUrl, siteConfig } from "@/config/site";

export const metadata = {
  title: "Services | HD Web Studios",
  description:
    "Professional website development, web applications, SEO, and digital growth solutions for businesses in Ludhiana, Punjab and across India.",
  alternates: {
    canonical: absoluteUrl("/services"),
  },
  openGraph: {
    title: "Services | HD Web Studios",
    description:
      "Website development, web applications, SEO, and digital growth solutions.",
    url: absoluteUrl("/services"),
    siteName: siteConfig.name,
    type: "website",
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
