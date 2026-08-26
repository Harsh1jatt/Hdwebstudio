"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import adminNavGroups from "@/config/admin-nav";

export default function AdminMobileNav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-[10px] font-bold text-white">
            HD
          </span>
          <span className="text-sm font-semibold text-slate-900">Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 shadow-lg">
          {adminNavGroups.map((group) => (
            <div key={group.label} className="mb-3">
              <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-4 w-4 text-slate-400" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-slate-100 pt-2 mt-2">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
