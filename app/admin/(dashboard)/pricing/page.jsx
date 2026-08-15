import { requireAdmin } from "@/lib/auth";
import PricingManager from "@/components/Admin/pricing/PricingManager";

export const metadata = { title: "Pricing" };

export default async function PricingPage() {
  await requireAdmin();
  return <PricingManager />;
}
