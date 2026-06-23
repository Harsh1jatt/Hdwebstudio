// ─── app/page.js — Harshdeep Web Studios ─────────────────────────────────────
// Production-ready homepage for SEO, local lead generation, and CRO.
// ─────────────────────────────────────────────────────────────────────────────

import Hero from "@/components/Home/Hero";
import TrustBar from "@/components/Home/TrustBar";
import PortfolioPreview from "@/components/Home/PortfolioPreview";
import Services from "@/components/Home/Services";
// import Founder from "@/components/Home/Founder";
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
    "Website Designer in Ludhiana | Harshdeep Web Studios — Web Design & SEO Punjab",
  description:
    "Looking for a professional website designer in Ludhiana? Harshdeep Web Studios builds fast, SEO-optimized business websites for clinics, institutes & manufacturers in Punjab. ⭐ 5-Star Google Rating. Free website audit. Call 75894 34135.",
  keywords: [
    "Website Designer in Ludhiana",
    "Website Developer in Ludhiana",
    "Web Design Company in Ludhiana",
    "Website Development Company in Ludhiana",
    "Website Development Punjab",
    "Business Website Development Ludhiana",
    "MERN Stack Developer Ludhiana",
    "Website Design Services Punjab",
    "Custom Website Development Ludhiana",
    "SEO Services Ludhiana",
  ],
  openGraph: {
    title:
      "Harshdeep Web Studios — Website Designer in Ludhiana, Punjab",
    description:
      "Professional website design & development for clinics, coaching institutes, manufacturers & local businesses across Ludhiana and Punjab. Fast delivery. 5-star rated.",
    url: "https://hdwebstudio.vercel.app",
    siteName: "Harshdeep Web Studios",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png", // create a 1200×630 OG image and place in /public/
        width: 1200,
        height: 630,
        alt: "Harshdeep Web Studios — Website Designer in Ludhiana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshdeep Web Studios — Website Designer in Ludhiana",
    description:
      "Fast, SEO-optimized business websites for Punjab businesses. Free website audit available.",
  },
  alternates: {
    canonical: "https://hdwebstudio.vercel.app",
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
      {/* 1. Hero — H1, Google rating badge, above-fold CTA */}
      <Hero />

      {/* 2. Trust Bar — real project count, Google rating, delivery speed */}
      <TrustBar />

      {/* 3. Portfolio — 3 real projects as mini case studies (show before tell) */}
      <PortfolioPreview />

      {/* 4. Services — outcome-focused, 4 service cards */}
      <Services />

      {/* 5. Founder — personal authority, no-outsourcing trust signal */}
      {/* <Founder /> */}

      {/* 6. Benefits — plain business language, why choose us */}
      <Benefits />

      {/* 7. Process — 3-step, removes buyer anxiety */}
      <Process />

      {/* 8. Free Audit — lead magnet, WhatsApp form */}
      <FreeAudit />

      {/* 9. Testimonials — real client quotes with stars */}
      <Testimonials />

      {/* 10. FAQ — 10 SEO-optimized questions, accordion, FAQ schema */}
      <FAQ />

      {/* 11. Final CTA — scarcity + strategy call + WhatsApp */}
      <FinalCTA />

      {/* Sticky floating WhatsApp button — visible site-wide after scroll */}
      <WhatsAppFloat />
    </>
  );
}