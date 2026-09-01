import PricingPlans from "@/components/pricing/PricingPlans";
import { getPublishedPricingPlans } from "@/lib/pricing";
import { absoluteUrl, siteConfig } from "@/config/site";

export const metadata = {
  title: {
    absolute:
      "Website Development Pricing & Cost in India | HD Web Studios",
  },

  description:
    "Transparent website development pricing in Ludhiana, Punjab. High-performance Next.js packages with 100% code ownership and zero hidden fees.",

  alternates: {
    canonical: absoluteUrl("/pricing"),
  },

  openGraph: {
    title:
      "Website Development Pricing & Packages | HD Web Studios",

    description:
      "Transparent website development packages with full code ownership and no hidden fees.",

    url: absoluteUrl("/pricing"),

    siteName: siteConfig.name,

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Website Development Pricing & Packages | HD Web Studios",

    description:
      "Transparent website development packages with 100% IP ownership.",
  },
};

const pricingFaqs = [
  {
    q: "Are there any hidden recurring fees or plugin renewal costs?",
    a: "No. Our custom Next.js websites do not require mandatory monthly plugin or software licensing fees. You only pay for your domain and standard cloud hosting.",
  },
  {
    q: "Do I own the complete website source code and database?",
    a: "Yes. Upon project completion and full payment, you receive complete source-code ownership and the required database and deployment access, with no vendor lock-in.",
  },
  {
    q: "What is your payment milestone structure?",
    a: "Our standard payment structure is 50% advance upon project kickoff and requirement finalization, followed by 50% after final staging review, QA approval, and before live deployment.",
  },
  {
    q: "How long does a website take to launch?",
    a: "The timeline depends on the selected package, content readiness, and project requirements. A typical business website can be completed within approximately 7 to 14 business days.",
  },
  {
    q: "Can I upgrade my package or add new features later?",
    a: "Yes. Additional features and modules can be added later, including ecommerce functionality, custom portals, CMS features, service pages, automation, and business workflows.",
  },
];

export default async function PricingPage() {
  /*
   * Pricing plans are loaded exclusively from the backend/database.
   * There are no hardcoded pricing plans or fallback dummy data here.
   */
  const plans = await getPublishedPricingPlans();

  const pricingJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/pricing#faq`,
    mainEntity: pricingFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingJsonLd),
        }}
      />

      <PricingPlans plans={plans} />
    </>
  );
}
