import { requireAdmin } from "@/lib/auth";
import StoryEditClient from "./StoryEditClient";

export const metadata = { title: "Edit Story" };

export default async function EditStoryPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  return <StoryEditClient storyId={id} />;
}
