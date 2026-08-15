"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TeamMemberForm from "@/components/Admin/team/TeamMemberForm";

export default function NewTeamMemberPageClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(data) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "Failed to add team member.");
      router.push("/admin/team");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-950 mb-6">New Team Member</h1>
      <TeamMemberForm onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
}
