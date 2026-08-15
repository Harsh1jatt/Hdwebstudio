"use client";

import { useState, useEffect } from "react";
import AdminInput from "@/components/Admin/common/AdminInput";
import AdminButton from "@/components/Admin/common/AdminButton";
import AdminLoader from "@/components/Admin/common/AdminLoader";
import MediaPicker from "@/components/Admin/media/MediaPicker";

const SECTIONS = [
  {
    key: "brand",
    label: "Brand",
    fields: [
      { key: "name", label: "Brand Name" },
      { key: "shortName", label: "Short Name" },
      { key: "tagline", label: "Tagline" },
    ],
  },
  {
    key: "contact",
    label: "Contact",
    fields: [
      { key: "email", label: "Email", type: "email" },
      { key: "phone", label: "Phone" },
      { key: "whatsapp", label: "WhatsApp" },
      { key: "address", label: "Address" },
      { key: "city", label: "City" },
      { key: "state", label: "State" },
      { key: "country", label: "Country" },
      { key: "pincode", label: "Pincode" },
    ],
  },
  {
    key: "social",
    label: "Social",
    fields: [
      { key: "facebook", label: "Facebook" },
      { key: "instagram", label: "Instagram" },
      { key: "linkedin", label: "LinkedIn" },
      { key: "github", label: "GitHub" },
      { key: "youtube", label: "YouTube" },
    ],
  },
  {
    key: "seo",
    label: "SEO",
    fields: [
      { key: "defaultTitle", label: "Default Title" },
      { key: "defaultDescription", label: "Default Description" },
      { key: "defaultKeywords", label: "Default Keywords" },
      { key: "defaultOgImage", label: "Default OG Image", media: true },
      { key: "favicon", label: "Favicon", media: true },
    ],
  },
  {
    key: "business",
    label: "Business",
    fields: [
      { key: "businessHours", label: "Business Hours" },
      { key: "foundedYear", label: "Founded Year" },
      { key: "serviceArea", label: "Service Area" },
    ],
  },
  {
    key: "analytics",
    label: "Analytics",
    fields: [{ key: "googleAnalyticsId", label: "Google Analytics ID" }],
  },
  {
    key: "footer",
    label: "Footer",
    fields: [
      { key: "footerText", label: "Footer Text" },
      { key: "copyrightText", label: "Copyright Text" },
    ],
  },
];

function buildDefaultState() {
  const state = {};
  for (const section of SECTIONS) {
    state[section.key] = {};
    for (const field of section.fields) {
      state[section.key][field.key] = "";
    }
  }
  return state;
}

export default function SettingsForm() {
  const [settings, setSettings] = useState(buildDefaultState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [collapsed, setCollapsed] = useState({});

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        const payload = data.settings || data;
        const merged = buildDefaultState();
        for (const section of SECTIONS) {
          if (payload[section.key]) {
            for (const field of section.fields) {
              merged[section.key][field.key] =
                payload[section.key][field.key] ?? "";
            }
          }
        }
        setSettings(merged);
      })
      .catch(() => setError("Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  const updateField = (section, key, value) =>
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));

  const toggleSection = (key) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Save failed");
      setSuccess("Settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoader />;

  return (
    <div className="space-y-5">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {success}
        </div>
      )}

      {SECTIONS.map((section) => (
        <div
          key={section.key}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <button
            type="button"
            onClick={() => toggleSection(section.key)}
            className="flex w-full items-center justify-between px-6 py-4 text-left"
          >
            <h2 className="text-base font-semibold text-slate-800">
              {section.label}
            </h2>
            <svg
              className={`h-5 w-5 text-slate-400 transition-transform ${collapsed[section.key] ? "" : "rotate-180"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {!collapsed[section.key] && (
            <div className="grid gap-4 border-t border-slate-100 px-6 py-5 sm:grid-cols-2">
              {section.fields.map((field) =>
                field.media ? (
                  <MediaPicker
                    key={field.key}
                    label={field.label}
                    value={settings[section.key]?.[field.key] ?? ""}
                    onChange={(url) => updateField(section.key, field.key, url)}
                  />
                ) : (
                  <AdminInput
                    key={field.key}
                    id={`${section.key}-${field.key}`}
                    label={field.label}
                    type={field.type || "text"}
                    value={settings[section.key]?.[field.key] ?? ""}
                    onChange={(e) =>
                      updateField(section.key, field.key, e.target.value)
                    }
                    placeholder={field.label}
                  />
                )
              )}
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-end pt-2">
        <AdminButton
          onClick={handleSave}
          loading={saving}
          loadingText="Saving..."
        >
          Save Settings
        </AdminButton>
      </div>
    </div>
  );
}
