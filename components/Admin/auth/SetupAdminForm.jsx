"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import AdminInput from "../common/AdminInput";
import AdminButton from "../common/AdminButton";

export default function AdminSetupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password || !confirmPassword) {
      setError("Please complete all required fields.");
      return;
    }

    if (normalizedName.length < 2) {
      setError("Please enter a valid administrator name.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: normalizedName,
          email: normalizedEmail,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to create administrator account."
        );
      }

      router.replace("/admin/login");
      router.refresh();
    } catch (err) {
      setError(
        err?.message ||
          "Something went wrong while creating the admin account."
      );

      setLoading(false);
    }
  }

  return (
    <div className="w-full">

      {/* Mobile Brand */}
      <div className="mb-8 flex items-center gap-3 lg:hidden">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-white">
          HD
        </div>

        <div>
          <p className="text-sm font-bold text-slate-900">
            HD Web Studios
          </p>

          <p className="text-xs text-slate-500">
            Admin Workspace
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
          Initial setup
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-slate-950">
          Create your admin account
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Set up the administrator account that will manage
          your HD Web Studios business workspace.
        </p>
      </div>

      {/* Setup Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Name */}
        <AdminInput
          label="Administrator name"
          id="admin-name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Enter your full name"
          icon={<User className="h-[18px] w-[18px]" />}
          autoComplete="name"
          required
        />

        {/* Email */}
        <AdminInput
          label="Email address"
          id="admin-email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="admin@hdwebstudios.in"
          icon={<Mail className="h-[18px] w-[18px]" />}
          autoComplete="email"
          required
        />

        {/* Password */}
        <AdminInput
          label="Password"
          id="admin-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="Create a secure password"
          icon={<Lock className="h-[18px] w-[18px]" />}
          autoComplete="new-password"
          trailing={
            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (current) => !current
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
          required
        />

        {/* Confirm Password */}
        <AdminInput
          label="Confirm password"
          id="admin-confirm-password"
          type={
            showConfirmPassword
              ? "text"
              : "password"
          }
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
          placeholder="Re-enter your password"
          icon={<Lock className="h-[18px] w-[18px]" />}
          autoComplete="new-password"
          trailing={
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (current) => !current
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              aria-label={
                showConfirmPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
          required
        />

        {/* Password Requirements */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3">
          <p className="mb-2 text-xs font-semibold text-slate-600">
            Password requirements
          </p>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />
              At least 8 characters
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />
              Use a strong and unique password
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5 text-sm text-red-700"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

            <span className="leading-5">
              {error}
            </span>
          </div>
        )}

        {/* Submit */}
        <AdminButton
          type="submit"
          loading={loading}
          loadingText="Creating account..."
          fullWidth
        >
          <span>
            Create administrator account
          </span>

          {!loading && (
            <ArrowRight className="h-4 w-4" />
          )}
        </AdminButton>
      </form>

      {/* Security Note */}
      <div className="mt-8 border-t border-slate-100 pt-6">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

          <p className="text-xs leading-5 text-slate-400">
            This setup is intended for the initial
            HD Web Studios administrator account.
            Keep your credentials secure.
          </p>
        </div>
      </div>
    </div>
  );
}
