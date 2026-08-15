import { requireAdmin } from "@/lib/auth";
import EditTeamMemberPageClient from "./EditTeamMemberPageClient";

export const metadata = { title: "Edit Team Member" };

export default async function EditTeamMemberPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  return <EditTeamMemberPageClient memberId={id} />;
}
