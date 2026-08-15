import { requireAdmin } from "@/lib/auth";
import NewPostPageClient from "./NewPostPageClient";

export const metadata = {
  title: "New Blog Post",
};

export default async function NewPostPage() {
  await requireAdmin();
  return <NewPostPageClient />;
}

