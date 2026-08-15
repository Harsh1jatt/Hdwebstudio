"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FAQForm from "@/components/Admin/faqs/FAQForm";

export default function NewFAQPageClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(data) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "Failed to create FAQ.");
      router.push("/admin/faqs");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-950 mb-6">New FAQ</h1>
      <FAQForm onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
}
