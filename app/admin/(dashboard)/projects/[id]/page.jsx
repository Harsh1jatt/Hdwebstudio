import { requireAdmin } from "@/lib/auth";
import EditProjectPageClient from "./EditProjectPageClient";

export const metadata = {
  title: "Edit Project",
};

export default async function EditProjectPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  return <EditProjectPageClient projectId={id} />;
}
