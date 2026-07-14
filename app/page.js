// ─── app/page.js — Harshdeep Web Studios ─────────────────────────────────────
// Production-ready homepage for SEO, local lead generation, and CRO.
// ─────────────────────────────────────────────────────────────────────────────

import Hero from "@/components/Home/Hero";
import TrustBar from "@/components/Home/TrustBar";
import PortfolioPreview from "@/components/Home/PortfolioPreview";
import Services from "@/components/Home/Services";
import Founder from "@/components/Home/Founder";
import Benefits from "@/components/Home/Benefits";
import Process from "@/components/Home/Process";
import FreeAudit from "@/components/Home/FreeAudit";
import Testimonials from "@/components/Home/Testimonials";
import FAQ from "@/components/Home/FAQ";
import FinalCTA from "@/components/Home/FinalCTA";
import WhatsAppFloat from "@/components/Home/WhatsAppFloat";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata = {
  title:
    "HD Web Studios | Website Development Company in Ludhiana | Next.js, MERN & SEO",

  description:
    "HD Web Studios is a professional website development company in Ludhiana, Punjab. We build business websites, eCommerce stores, custom software, MERN Stack applications, Next.js websites, and SEO-optimized digital solutions for startups, local businesses, institutes, and manufacturers across India.",

  keywords: [
    "HD Web Studios",
    "Website Development Company Ludhiana",
    "Website Designer Ludhiana",
    "Website Developer Ludhiana",
    "Web Design Company Punjab",
    "Next.js Development",
    "React Development",
    "MERN Stack Development",
    "Custom Software Development",
    "Business Website Development",
    "eCommerce Website Development",
    "SEO Services Ludhiana",
    "Website Development India",
  ],

  alternates: {
    canonical: "https://hdwebstudios.in",
  },

  openGraph: {
    title:
      "HD Web Studios | Website Development Company in Ludhiana",

    description:
      "Professional Website Development, Next.js, MERN Stack, eCommerce, SEO and Custom Software Solutions.",

    url: "https://hdwebstudios.in",

    siteName: "HD Web Studios",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HD Web Studios",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "HD Web Studios | Website Development Company",

    description:
      "Professional Website Development, Next.js, MERN Stack & SEO Services.",

    images: ["/og-image.png"],
  },
};
// ─── JSON-LD Schemas (inject into <head> via layout.js or Script component) ───
// PASTE THIS into your layout.js <head> section:
//
// import Script from "next/script";
// <Script id="local-business-schema" type="application/ld+json"
//   dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
// <Script id="org-schema" type="application/ld+json"
//   dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
//
// ── LocalBusiness Schema ──
// {
//   "@context": "https://schema.org",
//   "@type": "LocalBusiness",
//   "name": "Harshdeep Web Studios",
//   "alternateName": "HD Web Studio",
//   "description": "Professional website designer and developer in Ludhiana, Punjab. Specializing in business websites, SEO, and custom admin systems for local businesses.",
//   "url": "https://hdwebstudio.vercel.app",
//   "telephone": "+917589434135",
//   "email": "contact@hdwebstudio.in", // update with real email
//   "address": {
//     "@type": "PostalAddress",
//     "streetAddress": "Ludhiana",  // add street if comfortable
//     "addressLocality": "Ludhiana",
//     "addressRegion": "Punjab",
//     "postalCode": "141001",       // update with actual PIN
//     "addressCountry": "IN"
//   },
//   "geo": {
//     "@type": "GeoCoordinates",
//     "latitude": 30.9010,
//     "longitude": 75.8573
//   },
//   "aggregateRating": {
//     "@type": "AggregateRating",
//     "ratingValue": "5.0",
//     "reviewCount": "5"   // use real count from your Google Business Profile
//   },
//   "openingHoursSpecification": [{
//     "@type": "OpeningHoursSpecification",
//     "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
//     "opens": "09:00",
//     "closes": "19:00"
//   }],
//   "priceRange": "₹₹",
//   "currenciesAccepted": "INR",
//   "paymentAccepted": "Cash, UPI, Bank Transfer",
//   "areaServed": ["Ludhiana","Amritsar","Jalandhar","Chandigarh","Patiala","Punjab"],
//   "sameAs": [
//     "https://g.page/r/YOUR_GOOGLE_BUSINESS_PROFILE_ID", // update this
//     "https://www.instagram.com/hdwebstudio"  // update if applicable
//   ]
// }
//
// ── Organization Schema ──
// {
//   "@context": "https://schema.org",
//   "@type": "Organization",
//   "name": "Harshdeep Web Studios",
//   "url": "https://hdwebstudio.vercel.app",
//   "logo": "https://hdwebstudio.vercel.app/logo.png",
//   "founder": {
//     "@type": "Person",
//     "name": "Harshdeep",
//     "jobTitle": "Founder & Website Developer",
//     "worksFor": { "@type": "Organization", "name": "Harshdeep Web Studios" }
//   },
//   "contactPoint": {
//     "@type": "ContactPoint",
//     "telephone": "+917589434135",
//     "contactType": "customer service",
//     "availableLanguage": ["Hindi","Punjabi","English"]
//   }
// }

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <PortfolioPreview />
      <Services />
      <Founder />
      <Benefits />
      <Process />
      <FreeAudit />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <WhatsAppFloat />
    </>
  );
}