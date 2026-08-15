"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLoader from "@/components/Admin/common/AdminLoader";
import TeamMemberForm from "@/components/Admin/team/TeamMemberForm";

export default function EditTeamMemberPageClient({ memberId }) {
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/team/${memberId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setInitialData(data.item || data.member);
        else setError(data.error || "Failed to load team member.");
      })
      .catch((err) => setError(err.message));
  }, [memberId]);

  async function handleSubmit(data) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/team/${memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "Failed to update team member.");
      router.push("/admin/team");
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
      <h1 className="text-2xl font-bold text-slate-950 mb-6">Edit Team Member</h1>
      <TeamMemberForm initialData={initialData} onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
}
