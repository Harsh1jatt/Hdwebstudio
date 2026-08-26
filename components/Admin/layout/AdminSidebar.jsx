"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, PanelLeftClose, PanelLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import adminNavGroups from "@/config/admin-nav";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 lg:static lg:translate-x-0 ${
        collapsed ? "w-[68px]" : "w-64"
      }`}
    >
      {/* Brand + Collapse toggle */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
            HD
          </span>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold text-slate-900">HD Web Studios</p>
              <p className="text-[11px] text-slate-400">Admin</p>
            </div>
          )}
        </Link>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" style={{ maxHeight: "calc(100vh - 140px)" }}>
        {adminNavGroups.map((group) => (
          <div key={group.label} className="mb-5">
            {!collapsed && (
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {group.label}
              </p>
            )}
            {collapsed && <div className="mx-3 mb-2 h-px bg-slate-100" />}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href + "/"));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    } ${collapsed ? "justify-center px-2" : ""}`}
                  >
                    <item.icon
                      className={`h-4 w-4 shrink-0 ${active ? "text-blue-600" : "text-slate-400"}`}
                    />
                    {!collapsed && item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom: Logout only */}
      <div className="border-t border-slate-100 px-3 py-3">
        <button
          onClick={handleLogout}
          className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 ${
            collapsed ? "justify-center px-2" : ""
          }`}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && "Sign out"}
        </button>
      </div>
    </aside>
  );
}
