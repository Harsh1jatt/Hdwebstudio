import { requireAdmin } from "@/lib/auth";
import StoryEditor from "./StoryEditor";

export const metadata = { title: "New Story" };

export default async function NewStoryPage() {
  await requireAdmin();
  return <StoryEditor />;
}
