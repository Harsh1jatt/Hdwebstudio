import { requireAdmin } from "@/lib/auth";
import SeoTester from "./SeoTester";

export const metadata = { title: "SEO Live Diagnostics | HD Web Studios" };

export default async function AdminSeoTestPage() {
  await requireAdmin();
  return <SeoTester />;
}
