import { requireAdmin } from "@/lib/auth";
import AgentChat from "@/components/Admin/chat/AgentChat";

export const metadata = {
  title: "AI Assistant",
};

export default async function ChatPage() {
  await requireAdmin();

  return (
    <div className="mx-auto h-[calc(100vh-8rem)] max-w-3xl">
      <AgentChat />
    </div>
  );
}
