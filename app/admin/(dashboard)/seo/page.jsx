import { requireAdmin } from "@/lib/auth";
import SeoDashboard from "./SeoDashboard";

export const metadata = { title: "SEO Dashboard" };

export default async function AdminSeoPage() {
  await requireAdmin();
  return <SeoDashboard />;
}
