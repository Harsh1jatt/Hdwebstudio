import { requireAdmin } from "@/lib/auth";
import NewTeamMemberPageClient from "./NewTeamMemberPageClient";

export const metadata = { title: "New Team Member" };

export default async function NewTeamMemberPage() {
  await requireAdmin();
  return <NewTeamMemberPageClient />;
}
