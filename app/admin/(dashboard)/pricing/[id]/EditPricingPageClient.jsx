"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLoader from "@/components/Admin/common/AdminLoader";
import PricingForm from "@/components/Admin/pricing/PricingForm";

export default function EditPricingPageClient({ planId }) {
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/pricing/${planId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setInitialData(data.item || data.plan);
        else setError(data.error || "Failed to load plan.");
      })
      .catch((err) => setError(err.message));
  }, [planId]);

  async function handleSubmit(data) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/pricing/${planId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "Failed to update plan.");
      router.push("/admin/pricing");
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
      <h1 className="text-2xl font-bold text-slate-950 mb-6">Edit Pricing Plan</h1>
      <PricingForm initialData={initialData} onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
}
