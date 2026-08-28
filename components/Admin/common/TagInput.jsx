"use client";

import { useState } from "react";
import { X, Plus, Tag as TagIcon } from "lucide-react";

/**
 * Modern SaaS Multi-Tag Input Component
 * Supports keyboard entry (Enter, Comma), click-to-remove, duplicate prevention, and clean styling.
 */
export default function TagInput({
  label = "Tags",
  tags = [],
  onChange,
  placeholder = "Type tag and press Enter...",
  helperText = "Press Enter or Comma to add tags",
  suggestions = [],
}) {
  const [input, setInput] = useState("");

  function addTag(rawTag) {
    const clean = rawTag.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "");
    if (!clean) return;
    if (!tags.includes(clean)) {
      onChange([...tags, clean]);
    }
    setInput("");
  }

  function removeTag(tagToRemove) {
    onChange(tags.filter((t) => t !== tagToRemove));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  }

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          {label}
        </label>
      )}

      <div className="min-h-[44px] rounded-xl border border-slate-200 bg-white p-2 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-800 transition hover:bg-slate-200"
            >
              <TagIcon className="h-3 w-3 text-slate-500" />
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-slate-400 hover:text-red-500 focus:outline-hidden"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (input.trim()) addTag(input);
            }}
            placeholder={tags.length === 0 ? placeholder : "Add more..."}
            className="min-w-[120px] flex-1 bg-transparent px-2 py-1 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
        </div>
      </div>

      {helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}

      {/* Suggested Quick Tags */}
      {suggestions.length > 0 && (
        <div className="mt-1.5 flex flex-wrap items-center gap-1 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Suggestions:</span>
          {suggestions
            .filter((s) => !tags.includes(s.toLowerCase()))
            .slice(0, 5)
            .map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => addTag(sug)}
                className="inline-flex items-center gap-0.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition"
              >
                <Plus size={10} /> {sug}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
