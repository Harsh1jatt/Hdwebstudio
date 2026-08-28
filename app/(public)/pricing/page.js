import PricingPlans from "@/components/pricing/PricingPlans";
import { getPublishedPricingPlans } from "@/lib/pricing";
import { absoluteUrl, siteConfig } from "@/config/site";

export const metadata = {
  title: { absolute: "Website Development Pricing & Cost in India | HD Web Studios" },
  description:
    "Transparent website development pricing in Ludhiana, Punjab. High-performance Next.js packages from ₹14,999 with 100% code ownership and zero hidden fees.",
  alternates: {
    canonical: absoluteUrl("/pricing"),
  },
  openGraph: {
    title: "Website Development Pricing & Packages | HD Web Studios",
    description:
      "Transparent website development pricing in Ludhiana, Punjab. Starter packages from ₹14,999 with full code ownership.",
    url: absoluteUrl("/pricing"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Pricing & Packages | HD Web Studios",
    description: "Transparent website development packages from ₹14,999 with 100% IP ownership.",
  },
};

const pricingFaqs = [
  {
    q: "Are there any hidden recurring fees or plugin renewal costs?",
    a: "No. Unlike WordPress agencies that charge annual plugin license fees, our custom Next.js websites have zero mandatory monthly licensing overhead. You only pay for your domain and standard cloud hosting.",
  },
  {
    q: "Do I own the complete website source code and database?",
    a: "Yes, 100%. Upon project milestone completion and full payment, you receive complete repository ownership, database credentials, and production deployment control with zero vendor lock-in.",
  },
  {
    q: "What is your payment milestone structure?",
    a: "Our standard payment structure is 50% advance upon project kickoff and requirement finalization, and 50% upon final staging review, QA approval, and live deployment.",
  },
  {
    q: "How long does a Starter or Business website take to launch?",
    a: "Starter websites typically launch within 7 to 10 business days. Comprehensive Business Acquisition websites with custom CMS take 10 to 14 business days.",
  },
  {
    q: "Can I upgrade my package or add new features later?",
    a: "Yes. Our modular Next.js architecture allows you to easily add ecommerce capabilities, custom portals, new service landing pages, or automated workflows at any time.",
  },
];

export default async function PricingPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <PricingPlans plans={plans} />
    </>
  );
}
