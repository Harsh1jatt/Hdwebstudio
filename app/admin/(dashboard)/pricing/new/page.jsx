import { requireAdmin } from "@/lib/auth";
import NewPricingPageClient from "./NewPricingPageClient";

export const metadata = { title: "New Pricing Plan" };

export default async function NewPricingPage() {
  await requireAdmin();
  return <NewPricingPageClient />;
}
