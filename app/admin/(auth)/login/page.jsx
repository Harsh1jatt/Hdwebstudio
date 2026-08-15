"use client";

import Image from "next/image";
import AdminLoginForm from "@/components/Admin/auth/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="w-full">
      <div className="grid overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.22)] lg:grid-cols-[0.95fr_1.05fr]">

        {/* Brand Panel */}
        <section className="relative hidden min-h-[680px] overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">

          {/* Decorative gradients */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

          {/* Decorative rings */}
          <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-80 w-80 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute bottom-[-160px] left-[-100px] h-96 w-96 rounded-full border border-white/5" />

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg">
                <Image
                  src="/logo.svg"
                  alt="HD Web Studios"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>

              <div>
                <p className="font-semibold tracking-tight">
                  HD Web Studios
                </p>

                <p className="mt-0.5 text-sm text-white/50">
                  Admin Workspace
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 max-w-lg">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/70 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Secure administrator access
            </div>

            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight xl:text-5xl">
              Your business.
              <br />
              Your workspace.
              <br />
              One secure dashboard.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
              Manage leads, business operations and digital
              workflows from a secure HD Web Studios
              administration workspace.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                ["01", "Leads"],
                ["02", "Operations"],
                ["03", "Analytics"],
              ].map(([number, label]) => (
                <div
                  key={number}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <p className="text-xs font-semibold text-blue-300">
                    {number}
                  </p>

                  <p className="mt-2 text-xs text-white/60">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="relative z-10 text-xs text-white/35">
            © {new Date().getFullYear()} HD Web Studios
          </p>
        </section>

        {/* Login Form */}
        <section className="flex min-h-[680px] items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20">
          <div className="w-full max-w-md">
            <AdminLoginForm />
          </div>
        </section>
      </div>

      <p className="mt-5 text-center text-xs text-slate-400">
        Authorized administrators only.
      </p>
    </main>
  );
}