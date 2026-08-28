"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  BookOpen,
  Sparkles,
  Layers,
  Play,
  HelpCircle,
  MessageSquare,
  Mail,
  BarChart3,
  Globe,
  RefreshCw,
  Compass,
  ArrowRight,
  Link2,
  TrendingUp,
  ImageIcon,
  DollarSign,
  Users,
  Settings,
  ExternalLink,
  Command,
  X,
} from "lucide-react";

const COMMANDS = [
  // Creation
  { id: "new-blog", title: "New Blog Post", category: "Create", href: "/admin/blog/new", icon: BookOpen, shortcut: "N" },
  { id: "new-service", title: "New Service", category: "Create", href: "/admin/services/new", icon: Sparkles },
  { id: "new-project", title: "New Project / Case Study", category: "Create", href: "/admin/projects/new", icon: Layers },
  { id: "new-story", title: "New Web Story", category: "Create", href: "/admin/stories/new", icon: Play },
  { id: "new-faq", title: "New FAQ", category: "Create", href: "/admin/faqs/new", icon: HelpCircle },
  { id: "new-testimonial", title: "New Testimonial", category: "Create", href: "/admin/testimonials/new", icon: MessageSquare },

  // Navigation
  { id: "leads", title: "View Enquiries & Leads", category: "Navigation", href: "/admin/leads", icon: Mail, shortcut: "L" },
  { id: "blogs", title: "Blog Articles Manager", category: "Navigation", href: "/admin/blog", icon: BookOpen, shortcut: "B" },
  { id: "services", title: "Services Catalog", category: "Navigation", href: "/admin/services", icon: Sparkles, shortcut: "S" },
  { id: "projects", title: "Projects & Work Showcase", category: "Navigation", href: "/admin/projects", icon: Layers, shortcut: "P" },
  { id: "stories", title: "Web Stories", category: "Navigation", href: "/admin/stories", icon: Play },
  { id: "faqs", title: "FAQs", category: "Navigation", href: "/admin/faqs", icon: HelpCircle },
  { id: "testimonials", title: "Testimonials", category: "Navigation", href: "/admin/testimonials", icon: MessageSquare },
  { id: "media", title: "Media Library", category: "Navigation", href: "/admin/media", icon: ImageIcon },
  { id: "pricing", title: "Pricing Packages", category: "Navigation", href: "/admin/pricing", icon: DollarSign },
  { id: "settings", title: "Global Site Settings", category: "Navigation", href: "/admin/settings", icon: Settings },

  // SEO & Growth
  { id: "seo-dash", title: "SEO Health Dashboard", category: "SEO & Growth", href: "/admin/seo", icon: BarChart3 },
  { id: "seo-sitemap", title: "Sitemap Manager", category: "SEO & Growth", href: "/admin/seo/sitemap", icon: Globe },
  { id: "seo-gsc", title: "Google Search Console", category: "SEO & Growth", href: "/admin/seo/gsc", icon: Search },
  { id: "seo-test", title: "Live SEO Diagnostics", category: "SEO & Growth", href: "/admin/seo/test", icon: Compass },
  { id: "seo-redirects", title: "301 Redirects Manager", category: "SEO & Growth", href: "/admin/seo/redirects", icon: ArrowRight },
  { id: "seo-backlinks", title: "Backlink CRM", category: "SEO & Growth", href: "/admin/seo/backlinks", icon: Link2 },
  { id: "seo-keywords", title: "Keyword Tracker", category: "SEO & Growth", href: "/admin/seo/keywords", icon: TrendingUp },

  // Public Links
  { id: "view-site", title: "View Public Website", category: "Public Site", href: "/", icon: ExternalLink, external: true },
  { id: "view-blog", title: "View Public Blog", category: "Public Site", href: "/blog", icon: ExternalLink, external: true },
  { id: "view-services", title: "View Public Services", category: "Public Site", href: "/services", icon: ExternalLink, external: true },
  { id: "view-sitemap", title: "View Live /sitemap.xml", category: "Public Site", href: "/sitemap.xml", icon: ExternalLink, external: true },
  { id: "view-llms", title: "View Live /llms.txt", category: "Public Site", href: "/llms.txt", icon: ExternalLink, external: true },
];

export default function CommandPalette({ isOpen, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return COMMANDS;
    const q = query.toLowerCase();
    return COMMANDS.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q) ||
        cmd.href.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          executeCommand(selected);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  function executeCommand(cmd) {
    onClose();
    if (cmd.external) {
      window.open(cmd.href, "_blank");
    } else {
      router.push(cmd.href);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 p-4 pt-16 sm:pt-24 backdrop-blur-xs">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-scaleUp">
        {/* Search Bar */}
        <div className="flex items-center border-b border-slate-100 px-4 py-3.5">
          <Search className="h-4 w-4 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, page name, or action..."
            autoFocus
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs text-slate-400">
              No matching commands or pages found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => executeCommand(cmd)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs transition ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                        isSelected ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon size={14} />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold block">{cmd.title}</span>
                      <span
                        className={`text-[10px] ${
                          isSelected ? "text-blue-100" : "text-slate-400"
                        }`}
                      >
                        {cmd.category} &bull; {cmd.href}
                      </span>
                    </div>
                  </div>

                  {cmd.shortcut && (
                    <span
                      className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                        isSelected ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {cmd.shortcut}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-4 py-2 text-[11px] text-slate-400">
          <span>Use &uarr; &darr; to navigate, Enter to select</span>
          <span className="font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
}
