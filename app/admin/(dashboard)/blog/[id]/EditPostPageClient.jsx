"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import PostForm from "@/components/Admin/blog/PostForm";
import AdminLoader from "@/components/Admin/common/AdminLoader";

export default function EditPostPageClient({ postId }) {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/admin/posts/${postId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Unable to load post.");
        setPost(data.post);
      } catch (err) {
        setError(err.message || "Unable to load post.");
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [postId]);

  async function handleSubmit(payload) {
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Unable to save post.");
      setPost(data.post);
      setSuccess("Post saved successfully.");
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to save post.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <AdminLoader />;
  if (!post && error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Blog CMS</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Edit post</h2>
        <p className="mt-2 text-sm text-slate-500">{post?.title || ""}</p>
      </div>

      <PostForm
        mode="edit"
        postId={postId}
        initialData={post}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={error}
        success={success}
      />
    </div>
  );
}

