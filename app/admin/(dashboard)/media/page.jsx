import { requireAdmin } from "@/lib/auth";
import MediaManager from "@/components/Admin/media/MediaManager";
export const metadata = { title: "Media" };
export default async function MediaPage() {
  await requireAdmin();
  return <MediaManager />;
}
