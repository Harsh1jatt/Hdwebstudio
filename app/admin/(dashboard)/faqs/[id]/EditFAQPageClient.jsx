"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLoader from "@/components/Admin/common/AdminLoader";
import FAQForm from "@/components/Admin/faqs/FAQForm";

export default function EditFAQPageClient({ faqId }) {
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/faqs/${faqId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setInitialData(data.item || data.faq);
        else setError(data.error || "Failed to load FAQ.");
      })
      .catch((err) => setError(err.message));
  }, [faqId]);

  async function handleSubmit(data) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/faqs/${faqId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "Failed to update FAQ.");
      router.push("/admin/faqs");
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
      <h1 className="text-2xl font-bold text-slate-950 mb-6">Edit FAQ</h1>
      <FAQForm initialData={initialData} onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
}
