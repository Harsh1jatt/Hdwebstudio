"use client";

import Image from "next/image";
import SetupAdminForm from "@/components/Admin/auth/SetupAdminForm";

export default function SetupAdminPageClient() {
  return (
    <main className="w-full">
      <div className="grid overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.22)] lg:grid-cols-[0.95fr_1.05fr]">
        <section className="relative hidden min-h-[760px] overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

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
                <p className="font-semibold">HD Web Studios</p>
                <p className="mt-0.5 text-sm text-white/50">
                  Initial Admin Setup
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-lg">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              One-time administrator setup
            </div>

            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight xl:text-5xl">
              Create the account that runs your workspace.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
              Your administrator account gives you secure access to manage
              leads, business operations and the HD Web Studios dashboard.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Secure administrator access",
                "Protected business workspace",
                "Centralized dashboard management",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-white/65"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-xs text-white/35">
            © {new Date().getFullYear()} HD Web Studios
          </p>
        </section>

        <section className="flex min-h-[760px] items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20">
          <div className="w-full max-w-md">
            <SetupAdminForm />
          </div>
        </section>
      </div>

      <p className="mt-5 text-center text-xs text-slate-400">
        Initial setup is available only when no administrator account exists.
      </p>
    </main>
  );
}
