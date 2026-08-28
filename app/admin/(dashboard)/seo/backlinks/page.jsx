import { requireAdmin } from "@/lib/auth";
import BacklinksManager from "./BacklinksManager";

export const metadata = { title: "Backlinks & Outreach CRM | HD Web Studios" };

export default async function AdminBacklinksPage() {
  await requireAdmin();
  return <BacklinksManager />;
}
