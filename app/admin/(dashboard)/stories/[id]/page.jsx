import { requireAdmin } from "@/lib/auth";
import StoryEditClient from "./StoryEditClient";

export const metadata = { title: "Edit Story" };

export default async function EditStoryPage() {
  await requireAdmin();
  return <StoryEditClient />;
}
