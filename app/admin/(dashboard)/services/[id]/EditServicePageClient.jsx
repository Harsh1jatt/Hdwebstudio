"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ServiceForm from "@/components/Admin/services/ServiceForm";
import AdminLoader from "@/components/Admin/common/AdminLoader";

export default function EditServicePageClient({ serviceId }) {
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadService() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/admin/services/${serviceId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Unable to load service.");
        }

        setService(data.service);
      } catch (err) {
        setError(err.message || "Unable to load service.");
      } finally {
        setLoading(false);
      }
    }

    loadService();
  }, [serviceId]);

  async function handleSubmit(payload) {
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/admin/services/${serviceId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Unable to save service.");
      }

      setService(data.service);
      setSuccess("Service saved successfully.");
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to save service.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <AdminLoader />;
  }

  if (!service && error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          Services CMS
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
          Edit service
        </h2>
        <p className="mt-2 text-sm text-slate-500">{service?.eyebrow}</p>
      </div>

      <ServiceForm
        mode="edit"
        initialData={service}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={error}
        success={success}
      />
    </div>
  );
}
