// ─── app/page.js — HD Web Studios ─────────────────────────────────────────
// Server Component: SEO metadata + data-fetching.
// Hero and TrustBar render as Server Components.
// HomeClient composes the remaining sections (mix of Server + Client).
// ─────────────────────────────────────────────────────────────────────────────

import { getPublishedServices } from "@/lib/services";
import { getPublishedProjects } from "@/lib/projects";
import { getPublishedTestimonials } from "@/lib/testimonials";
import { getPublishedFaqs } from "@/lib/faqs";
import { getSiteSettings } from "@/lib/settings";
import HomeClient from "@/components/Home/HomeClient";
import HeroSection from "@/components/Home/HeroSection";
import TrustBarSection from "@/components/Home/TrustBarSection";
import { absoluteUrl, siteConfig } from "@/config/site";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata = {
  title: "HD Web Studios | Website Development Company in Ludhiana | Local SEO & Digital Growth",

  description:
    "HD Web Studios is a professional website development company in Ludhiana, Punjab. We build business websites, local SEO, and digital growth solutions for businesses across India.",

  alternates: {
    canonical: siteConfig.url,
  },

  openGraph: {
    title: "HD Web Studios | Website Development Company in Ludhiana",
    description:
      "Professional Website Development, Next.js, MERN Stack, eCommerce, SEO and Custom Software Solutions.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.assets.logo),
        width: 64,
        height: 64,
        alt: siteConfig.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HD Web Studios | Website Development Company in Ludhiana",
    description: "Professional website development, local SEO, and digital growth solutions for businesses.",
    images: [absoluteUrl(siteConfig.assets.logo)],
  },
};

export default async function HomePage() {
  const [services, projects, testimonials, faqs, settings] = await Promise.all([
    getPublishedServices(),
    getPublishedProjects(),
    getPublishedTestimonials(),
    getPublishedFaqs(),
    getSiteSettings(),
  ]);

  return (
    <>
      <HeroSection settings={settings} />
      <TrustBarSection />
      <HomeClient
        services={services}
        projects={projects}
        testimonials={testimonials}
        faqs={faqs}
      />
    </>
  );
}