"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CommandPalette from "./CommandPalette";
import { Keyboard, X } from "lucide-react";

export default function KeyboardShortcuts() {
  const router = useRouter();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable ||
          activeEl.classList?.contains?.("ProseMirror"));

      // 1. Ctrl+K or Cmd+K always opens Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
        return;
      }

      // If user is actively typing in a text field, do not trigger single-letter shortcuts
      if (isInput) return;

      // Single letter shortcuts
      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        router.push("/admin/projects/new");
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        router.push("/admin/services");
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        router.push("/admin/projects");
      } else if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        router.push("/admin/leads");
      } else if (e.key === "/") {
        e.preventDefault();
        setPaletteOpen(true);
      } else if (e.key === "?") {
        e.preventDefault();
        setHelpOpen((prev) => !prev);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <>
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* Keyboard Shortcuts Helper Guide */}
      {helpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scaleUp">
            <button
              onClick={() => setHelpOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Keyboard size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Admin Keyboard Shortcuts</h3>
                <p className="text-xs text-slate-500">Fast one-key navigation across the CMS.</p>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-xs">
              {[
                { key: "Ctrl/Cmd + K", label: "Open Global Command Palette" },
                { key: "/", label: "Focus Search & Command Palette" },
                { key: "N", label: "New Project / Case Study" },
                { key: "S", label: "Services Catalog" },
                { key: "P", label: "Projects & Work" },
                { key: "L", label: "View Leads" },
                { key: "?", label: "Toggle this Help Guide" },
                { key: "ESC", label: "Close Active Modal" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-2.5"
                >
                  <span className="text-slate-700 font-medium">{item.label}</span>
                  <kbd className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-[11px] font-bold text-slate-900 shadow-xs">
                    {item.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
