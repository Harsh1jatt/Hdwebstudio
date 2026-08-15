"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

import AdminInput from "../common/AdminInput";
import AdminButton from "../common/AdminButton";

export default function AdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    if (!normalizedEmail || !password) {
      setError(
        "Please enter your email and password."
      );

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: normalizedEmail,
            password,
            rememberMe,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to sign in. Please check your credentials."
        );
      }

      /*
       * Login successful.
       * Cookie is automatically stored by browser.
       */

      router.replace("/admin");
    } catch (error) {
      console.error(
        "Admin login failed:",
        error
      );

      setError(
        error?.message ||
          "Something went wrong while signing you in."
      );

      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* Mobile Branding */}
      <div className="mb-8 flex items-center gap-3 lg:hidden">
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <img
            src="/logo.svg"
            alt="HD Web Studios"
            className="h-full w-full object-contain"
          />
        </div>

        <div>
          <p className="text-sm font-bold text-slate-900">
            HD Web Studios
          </p>

          <p className="mt-0.5 text-xs text-slate-500">
            Admin Workspace
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
          Admin Portal
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          Welcome back
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Sign in to your secure workspace and manage
          your HD Web Studios operations.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <AdminInput
          label="Email address"
          id="admin-email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="admin@hdwebstudios.in"
          icon={
            <Mail className="h-[18px] w-[18px]" />
          }
          autoComplete="email"
          required
        />

        <AdminInput
          label="Password"
          id="admin-password"
          type={
            showPassword
              ? "text"
              : "password"
          }
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="Enter your password"
          icon={
            <Lock className="h-[18px] w-[18px]" />
          }
          autoComplete="current-password"
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

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

            <span className="leading-5">
              {error}
            </span>
          </div>
        )}

        {/* Options */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-500">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) =>
                setRememberMe(
                  event.target.checked
                )
              }
              className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-500"
            />

            <span>Remember me</span>
          </label>

          <span className="text-sm font-medium text-slate-400">
            Password protected
          </span>
        </div>

        {/* Button */}
        <AdminButton
          type="submit"
          loading={loading}
          loadingText="Signing in..."
          fullWidth
          disabled={loading}
        >
          <span>
            Sign in to dashboard
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
            This portal is restricted to authorized
            HD Web Studios administrators. Your session
            is protected by secure authentication.
          </p>
        </div>
      </div>
    </div>
  );
}