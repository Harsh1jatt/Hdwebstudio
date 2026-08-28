import { notFound } from "next/navigation";
import {
  getPublishedServiceBySlug,
  getPublishedServices,
} from "@/lib/services";
import { getPublishedTestimonials } from "@/lib/testimonials";
import { getServicePageData } from "@/lib/settings";
import { absoluteUrl, siteConfig } from "@/config/site";
import Breadcrumbs from "@/components/common/Breadcrumbs";

import ServiceHero from "@/components/services/ServiceHero";
import TrustStats from "@/components/services/TrustStats";
import ServiceOverview from "@/components/services/ServiceOverview";
import WhatYouGet from "@/components/services/WhatYouGet";
import TechStack from "@/components/services/TechStack";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import IndustriesServed from "@/components/services/IndustriesServed";
import FAQSection from "@/components/services/FAQSection";
import TestimonialsPreview from "@/components/services/TestimonialsPreview";
import RelatedServices from "@/components/services/RelatedServices";
import FinalCTA from "@/components/services/FinalCTA";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getPublishedServiceBySlug(slug);

  if (!service) {
    return {};
  }

  const title =
    service.seoTitle || `${service.eyebrow || service.title} | HD Web Studios`;
  const description = service.seoDescription || service.description;
  const ogImage = service.ogImage
    ? absoluteUrl(service.ogImage)
    : absoluteUrl(siteConfig.assets.ogImage || "/logo.svg");

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/services/${service.slug}`),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/services/${service.slug}`),
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ServiceDetailsPage({ params }) {
  const { slug } = await params;
  const service = await getPublishedServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const [allServices, testimonials, servicePageData] = await Promise.all([
    getPublishedServices(),
    getPublishedTestimonials(),
    getServicePageData(),
  ]);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/services/${service.slug}#service`,
    name: service.title,
    description: service.seoDescription || service.shortDescription || service.description || "",
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: absoluteUrl(`/services/${service.slug}`),
    areaServed: [
      { "@type": "City", name: "Ludhiana" },
      { "@type": "State", name: "Punjab" },
      { "@type": "Country", name: "India" },
    ],
  };

  const faqJsonLd = service.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/services/${service.slug}#faq`,
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question || item.q,
          acceptedAnswer: { "@type": "Answer", text: item.answer || item.a },
        })),
      }
    : null;

  return (
    <div className="relative overflow-x-clip bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Top Breadcrumb Bar */}
      <div className="border-b border-slate-100 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
        </div>
      </div>

      <ServiceHero service={service} />
      <TrustStats data={servicePageData.trustStats} />
      <ServiceOverview service={service} />
      <WhatYouGet service={service} />
      <TechStack data={servicePageData.techStack} />
      <ProcessTimeline data={servicePageData.process} />
      <WhyChooseUs data={servicePageData.whyChooseUs} />
      <IndustriesServed data={servicePageData.industries} />
      <TestimonialsPreview testimonials={testimonials} />
      <FAQSection service={service} />
      <RelatedServices currentSlug={service.slug} services={allServices} />
      <FinalCTA service={service} />
    </div>
  );
}

