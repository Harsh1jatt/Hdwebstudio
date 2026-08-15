import { requireAdmin } from "@/lib/auth";
import TeamManager from "@/components/Admin/team/TeamManager";

export const metadata = { title: "Team" };

export default async function TeamPage() {
  await requireAdmin();
  return <TeamManager />;
}
