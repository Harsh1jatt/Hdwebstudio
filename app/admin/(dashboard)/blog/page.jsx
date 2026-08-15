import { requireAdmin } from "@/lib/auth";
import PostsManager from "@/components/Admin/blog/PostsManager";

export const metadata = {
  title: "Blog",
};

export default async function AdminBlogPage() {
  await requireAdmin();
  return <PostsManager />;
}

