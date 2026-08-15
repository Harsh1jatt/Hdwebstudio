import { requireAdmin } from "@/lib/auth";
import EditServicePageClient from "./EditServicePageClient";

export const metadata = {
  title: "Edit Service",
};

export default async function EditServicePage({ params }) {
  await requireAdmin();
  const { id } = await params;

  return <EditServicePageClient serviceId={id} />;
}
