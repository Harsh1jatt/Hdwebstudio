"use client";

import { useRouter } from "next/navigation";
import StoryForm from "@/components/Admin/stories/StoryForm";

export default function StoryEditor() {
  const router = useRouter();

  async function handleSubmit(payload) {
    const res = await fetch("/api/admin/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to create story.");
    router.push("/admin/stories");
    router.refresh();
  }

  return <StoryForm mode="create" onSubmit={handleSubmit} />;
}
