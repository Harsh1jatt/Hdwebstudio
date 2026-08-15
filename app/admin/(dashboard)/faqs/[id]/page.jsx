import { requireAdmin } from "@/lib/auth";
import EditFAQPageClient from "./EditFAQPageClient";

export const metadata = { title: "Edit FAQ" };

export default async function EditFAQPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  return <EditFAQPageClient faqId={id} />;
}
