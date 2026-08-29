import { requireAdmin } from "@/lib/auth";
import HdAiCommandCenter from "@/components/Admin/ai/HdAiCommandCenter";

export const metadata = {
  title: "HD AI Command Center | Admin",
};

export default async function ChatPage() {
  await requireAdmin();

  return (
    <div className="mx-auto h-[calc(100vh-8rem)] max-w-4xl">
      <HdAiCommandCenter />
    </div>
  );
}
