"use client";

import { useState } from "react";
import AdminInput from "@/components/Admin/common/AdminInput";

const INTERNAL_PAGES = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function InternalLinkPicker({ onSelect, onClose }) {
  const [href, setHref] = useState("");
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const filtered = INTERNAL_PAGES.filter((p) =>
    p.label.toLowerCase().includes(search.toLowerCase())
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!href.trim()) return;
    onSelect(href.trim(), text.trim() || undefined);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">Insert link</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <AdminInput
            id="link-href"
            label="URL"
            value={href}
            onChange={(e) => setHref(e.target.value)}
            placeholder="/services/web-development"
          />
          <AdminInput
            id="link-text"
            label="Link text (optional)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Learn more about our services"
          />
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Quick internal links
            </p>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pages..."
              className="mb-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <div className="max-h-32 space-y-1 overflow-y-auto">
              {filtered.map((page) => (
                <button
                  key={page.href}
                  type="button"
                  onClick={() => setHref(page.href)}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                >
                  {page.label} <span className="text-slate-400">{page.href}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Insert link
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
