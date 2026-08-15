import { requireAdmin } from "@/lib/auth";
import EditPricingPageClient from "./EditPricingPageClient";

export const metadata = { title: "Edit Pricing Plan" };

export default async function EditPricingPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  return <EditPricingPageClient planId={id} />;
}
