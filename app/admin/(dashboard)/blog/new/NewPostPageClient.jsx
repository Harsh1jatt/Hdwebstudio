"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PostForm from "@/components/Admin/blog/PostForm";
import AdminButton from "@/components/Admin/common/AdminButton";

export default function NewPostPageClient() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(payload) {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Unable to create post.");
      router.push(`/admin/blog/${data.post.id}`);
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to create post.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Blog CMS</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Create post</h2>
      </div>
      <PostForm mode="create" onSubmit={handleSubmit} submitting={submitting} error={error} />
    </div>
  );
}

