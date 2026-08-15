import PricingPlans from "@/components/pricing/PricingPlans";
import { getPublishedPricingPlans } from "@/lib/pricing";
import { absoluteUrl, siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pricing | HD Web Studios",
  description:
    "Transparent website development and digital solution pricing from HD Web Studios.",
  alternates: {
    canonical: absoluteUrl("/pricing"),
  },
  openGraph: {
    title: "Pricing | HD Web Studios",
    description: siteConfig.description,
    url: absoluteUrl("/pricing"),
    siteName: siteConfig.name,
    type: "website",
  },
};

export default async function PricingPage() {
  const plans = await getPublishedPricingPlans();
  return <PricingPlans plans={plans} />;
}
