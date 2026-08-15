"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLoader from "@/components/Admin/common/AdminLoader";
import TestimonialForm from "@/components/Admin/testimonials/TestimonialForm";

export default function EditTestimonialPageClient({ testimonialId }) {
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/testimonials/${testimonialId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setInitialData(data.item || data.testimonial);
        else setError(data.error || "Failed to load testimonial.");
      })
      .catch((err) => setError(err.message));
  }, [testimonialId]);

  async function handleSubmit(data) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/testimonials/${testimonialId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "Failed to update testimonial.");
      router.push("/admin/testimonials");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!initialData && !error) return <AdminLoader />;
  if (error && !initialData) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-950 mb-6">Edit Testimonial</h1>
      <TestimonialForm initialData={initialData} onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
}
