"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ServiceForm from "@/components/Admin/services/ServiceForm";

export default function NewServicePageClient() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(payload) {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Unable to create service.");
      }

      router.push(`/admin/services/${data.service.id}`);
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to create service.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          Services CMS
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
          Create service
        </h2>
      </div>

      <ServiceForm
        mode="create"
        onSubmit={handleSubmit}
        submitting={submitting}
        error={error}
      />
    </div>
  );
}
