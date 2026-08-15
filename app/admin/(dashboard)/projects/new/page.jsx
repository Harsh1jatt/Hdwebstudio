import { requireAdmin } from "@/lib/auth";
import NewProjectPageClient from "./NewProjectPageClient";

export const metadata = {
  title: "New Project",
};

export default async function NewProjectPage() {
  await requireAdmin();
  return <NewProjectPageClient />;
}
