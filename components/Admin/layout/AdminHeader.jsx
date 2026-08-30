"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import adminNavGroups from "@/config/admin-nav";

const pageDescriptions = {
  "/admin": "Overview of your website, leads, and content.",
  "/admin/leads": "Manage enquiries submitted through your website.",
  "/admin/services": "Manage your service offerings.",
  "/admin/projects": "Manage portfolio projects and case studies.",
  "/admin/testimonials": "Manage client testimonials.",
  "/admin/faqs": "Manage frequently asked questions.",
  "/admin/pricing": "Manage pricing plans.",
  "/admin/team": "Manage team members.",
  "/admin/media": "Upload and manage images and files.",
  "/admin/settings": "Site configuration and business details.",
};

function getPageTitle(pathname) {
  for (const group of adminNavGroups) {
    for (const item of group.items) {
      if (pathname === item.href || pathname.startsWith(item.href + "/")) {
        return item.label;
      }
    }
  }
  return "Admin";
}

function getBreadcrumbs(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Dashboard", href: "/admin" }];

  if (segments.length > 1) {
    const page = getPageTitle(pathname);
    if (page !== "Dashboard") {
      crumbs.push({ label: page, href: pathname });
    }
  }

  return crumbs;
}

export default function AdminHeader() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const description = pageDescriptions[pathname] || "";
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="mb-2 flex items-center gap-1 text-xs text-slate-400" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3" />}
            {i < breadcrumbs.length - 1 ? (
              <Link href={crumb.href} className="transition hover:text-slate-600">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-slate-600">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{pageTitle}</h1>
          {description && (
            <p className="mt-0.5 text-sm text-slate-500">{description}</p>
          )}
        </div>
        {pathname === "/admin" && (
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View leads
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </header>
  );
}
