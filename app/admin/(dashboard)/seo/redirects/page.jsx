import { requireAdmin } from "@/lib/auth";
import RedirectsManager from "./RedirectsManager";

export const metadata = { title: "SEO Redirects Manager | HD Web Studios" };

export default async function AdminRedirectsPage() {
  await requireAdmin();
  return <RedirectsManager />;
}
