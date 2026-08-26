import { requireAdmin } from "@/lib/auth";
import StoriesManager from "@/components/Admin/stories/StoriesManager";

export const metadata = { title: "Web Stories" };

export default async function AdminStoriesPage() {
  await requireAdmin();
  return <StoriesManager />;
}
