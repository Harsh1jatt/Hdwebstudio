// ─── app/page.js — Harshdeep Web Studios ─────────────────────────────────────
// Updated homepage with optimized section order for maximum conversion.
// New sections added: GoogleReviews, WhyChooseUs, Process, FreeAudit, WhatsAppFloat
// Removed: ClientLogos (was showing framework logos, hurting credibility)
// ─────────────────────────────────────────────────────────────────────────────

import Hero from "@/components/Home/Hero";
import ProofStrip from "@/components/Home/ProofStrip";
import GoogleReviews from "@/components/Home/GoogleReviews";
import PortfolioPreview from "@/components/Home/PortfolioPreview";
import Services from "@/components/Home/Services";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Benefits from "@/components/Home/Benefits";
import Process from "@/components/Home/Process";
import FreeAudit from "@/components/Home/FreeAudit";
import Testimonials from "@/components/Home/Testimonials";
import FAQ from "@/components/Home/FAQ";
import FinalCTA from "@/components/Home/FinalCTA";
import WhatsAppFloat from "@/components/Home/WhatsAppFloat";

export const metadata = {
  // ─── Primary keyword: "Website Designer in Ludhiana" (higher search volume than Developer for local)
  title: "Website Designer in Ludhiana | Harshdeep Web Studios — Web Design & SEO Punjab",

  description:
    "Looking for a professional website designer in Ludhiana? Harshdeep Web Studios builds fast, SEO-optimized business websites for clinics, institutes & manufacturers. ⭐ 5-Star Google Rating. Free website audit available. Call 75894 34135.",

  keywords: [
    "Website Designer in Ludhiana",
    "Website Developer in Ludhiana",
    "Web Design Company in Ludhiana",
    "Business Website Development Ludhiana",
    "Website Development Company Punjab",
    "SEO Services Ludhiana",
    "Web Design for Clinics Ludhiana",
    "Coaching Institute Website Ludhiana",
    "MERN Stack Developer Ludhiana",
    "Harshdeep Web Studios",
  ],

  openGraph: {
    title: "Harshdeep Web Studios — Website Designer in Ludhiana, Punjab",
    description:
      "We build high-converting business websites for clinics, institutes & manufacturers in Ludhiana. Fast delivery. 5-star rated. Free website audit.",
    url: "https://hdwebstudio.vercel.app",
    siteName: "Harshdeep Web Studios",
    locale: "en_IN",
    type: "website",
    // Add OG image for better social sharing:
    // images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },

  // ─── Local Business Schema — paste in layout.js <head> or use next-seo
  // See: https://developers.google.com/search/docs/appearance/structured-data/local-business
};

// ─── LocalBusiness Schema (inject in layout.js <head> for site-wide coverage)
// {
//   "@context": "https://schema.org",
//   "@type": "LocalBusiness",
//   "name": "Harshdeep Web Studios",
//   "description": "Professional website design and development agency in Ludhiana, Punjab",
//   "url": "https://hdwebstudio.vercel.app",
//   "telephone": "+917589434135",
//   "address": {
//     "@type": "PostalAddress",
//     "addressLocality": "Ludhiana",
//     "addressRegion": "Punjab",
//     "addressCountry": "IN"
//   },
//   "geo": { "@type": "GeoCoordinates", "latitude": 30.9010, "longitude": 75.8573 },
//   "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "12" },
//   "openingHours": "Mo-Sa 09:00-19:00",
//   "priceRange": "₹₹",
//   "sameAs": ["https://g.page/r/YOUR_GOOGLE_BUSINESS_PROFILE_ID"]
// }

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — H1, Google rating, dual CTA */}
      <Hero />

      {/* 2. Stat Bar — quick trust numbers */}
      <ProofStrip />

      {/* 3. Google Reviews — trust before features (highest impact section) */}
      <GoogleReviews />

      {/* 4. Portfolio — show don't tell, mini case studies */}
      <PortfolioPreview />

      {/* 5. Services — rewritten for business outcomes */}
      <Services />

      {/* 6. Why Choose Us — comparison table vs. freelancer/agency */}
      <WhyChooseUs />

      {/* 7. Benefits — plain business language, 6 cards */}
      <Benefits />

      {/* 8. Process — 3 steps, removes anxiety for first-time buyers */}
      <Process />

      {/* 9. Free Audit — lead capture with WhatsApp integration */}
      <FreeAudit />

      {/* 10. Testimonials — star ratings, verified badges */}
      <Testimonials />

      {/* 11. FAQ — accordion, 10 questions, FAQ schema markup */}
      <FAQ />

      {/* 12. Final CTA — scarcity + strategy call + founder signature */}
      <FinalCTA />

      {/* Floating WhatsApp button — visible on all sections after scroll */}
      <WhatsAppFloat />
    </>
  );
}