import { requireAdmin } from "@/lib/auth";
import FAQsManager from "@/components/Admin/faqs/FAQsManager";

export const metadata = { title: "FAQs" };

export default async function FAQsPage() {
  await requireAdmin();
  return <FAQsManager />;
}
