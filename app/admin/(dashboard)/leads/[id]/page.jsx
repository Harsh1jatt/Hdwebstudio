import { requireAdmin } from "../../../../../lib/auth";
import LeadDetailClient from "./LeadDetailClient";

export const metadata = {
  title: "Lead Details",
};

export default async function AdminLeadDetailPage({ params }) {
  await requireAdmin();
  const { id } = await params;

  return (
    <div className="space-y-6">
      <LeadDetailClient leadId={id} />
    </div>
  );
}
