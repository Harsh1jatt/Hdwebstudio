import { requireAdmin } from "@/lib/auth";
import EditPostPageClient from "./EditPostPageClient";

export const metadata = {
  title: "Edit Blog Post",
};

export default async function EditPostPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  return <EditPostPageClient postId={id} />;
}

