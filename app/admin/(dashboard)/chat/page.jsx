import { requireAdmin } from "@/lib/auth";
import ChatBot from "@/components/Admin/chat/ChatBot";

export const metadata = {
  title: "AI Assistant",
};

export default async function ChatPage() {
  await requireAdmin();
  return (
    <div className="mx-auto h-[calc(100vh-8rem)] max-w-3xl">
      <ChatBot />
    </div>
  );
}
