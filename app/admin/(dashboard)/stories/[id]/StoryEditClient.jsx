"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import StoryForm from "@/components/Admin/stories/StoryForm";
import AdminLoader from "@/components/Admin/common/AdminLoader";

export default function StoryEditClient({ storyId }) {
  const router = useRouter();
  const params = useParams();
  const id = storyId || params?.id;
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const res = await fetch(`/api/admin/stories/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load story.");
        setStory(data.story);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(payload) {
    if (!id) return;
    const res = await fetch(`/api/admin/stories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to update story.");
    router.push("/admin/stories");
    router.refresh();
  }

  if (loading) return <AdminLoader />;
  if (error) return <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">{error}</div>;
  if (!story) return <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">Story not found.</div>;

  return <StoryForm initialData={story} storyId={id} mode="edit" onSubmit={handleSubmit} />;
}
