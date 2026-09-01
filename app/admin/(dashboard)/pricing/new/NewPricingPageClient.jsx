"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PricingForm from "@/components/Admin/pricing/PricingForm";

export default function NewPricingPageClient() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(data) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/pricing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let result;

      try {
        result = await res.json();
      } catch {
        throw new Error(
          `Server returned an invalid response (${res.status}).`
        );
      }

      if (!res.ok || !result.success) {
        let message =
          result?.error || "Failed to create pricing plan.";

        if (result?.details?.fieldErrors) {
          const fieldErrors = Object.entries(
            result.details.fieldErrors
          )
            .flatMap(([field, messages]) =>
              Array.isArray(messages)
                ? messages.map(
                    (fieldMessage) =>
                      `${field}: ${fieldMessage}`
                  )
                : []
            )
            .join("\n");

          if (fieldErrors) {
            message += `\n\n${fieldErrors}`;
          }
        }

        throw new Error(message);
      }

      router.push("/admin/pricing");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while creating the pricing plan."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-slate-950">
        New Pricing Plan
      </h1>

      <PricingForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}
