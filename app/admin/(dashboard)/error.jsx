"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import AdminButton from "@/components/Admin/common/AdminButton";

export default function AdminDashboardError({ error, reset }) {
  useEffect(() => {
    console.error("Admin dashboard error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-slate-900">
        Failed to load admin module
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        {error?.message || "An unexpected error occurred while loading this administrative section."}
      </p>
      <div className="mt-6 flex justify-center">
        <AdminButton onClick={() => reset()}>
          <RefreshCw className="h-4 w-4" />
          Reload Section
        </AdminButton>
      </div>
    </div>
  );
}
