"use client";

import { useEffect, useState } from "react";
import AdminInput from "@/components/Admin/common/AdminInput";
import AdminButton from "@/components/Admin/common/AdminButton";
import MediaPicker from "@/components/Admin/media/MediaPicker";
import { Save, Building2, Phone, Globe, BarChart3, FileText } from "lucide-react";

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
          <Icon className="h-4 w-4 text-slate-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          {description && <p className="text-xs text-slate-500">{description}</p>}
        </div>
      </div>
    </div>
  );
}

export default function SettingsForm() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setSettings(data.settings);
      })
      .catch(() => setError("Failed to load settings."))
      .finally(() => setLoading(false));
  }, []);

  function updateField(section, key, value) {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed.");
      setMessage("Settings saved successfully.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="py-12 text-center text-sm text-slate-500">Loading settings...</div>;
  }

  if (!settings) {
    return <div className="py-12 text-center text-sm text-red-600">{error || "Failed to load settings."}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Configuration</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">Site Settings</h2>
          <p className="mt-0.5 text-sm text-slate-500">Manage your brand, contact info, social links, and site defaults.</p>
        </div>
        <AdminButton onClick={handleSave} loading={saving} loadingText="Saving...">
          <Save className="h-4 w-4" /> Save settings
        </AdminButton>
      </div>

      {message && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>
      )}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {/* Brand */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <SectionHeader icon={Building2} title="Brand" description="Business name, tagline, logo, and identity" />
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput id="brandName" label="Business Name" value={settings.brand?.name || ""} onChange={(e) => updateField("brand", "name", e.target.value)} />
          <AdminInput id="brandShort" label="Short Name" value={settings.brand?.shortName || ""} onChange={(e) => updateField("brand", "shortName", e.target.value)} />
        </div>
        <AdminInput id="brandTagline" label="Tagline / Headline" value={settings.brand?.tagline || ""} onChange={(e) => updateField("brand", "tagline", e.target.value)} helperText="Shown on homepage and social previews" />
        <div className="grid gap-4 md:grid-cols-2">
          <MediaPicker
            label="Logo"
            value={settings.brand?.logo || ""}
            onChange={(url) => updateField("brand", "logo", url)}
          />
          <MediaPicker
            label="Favicon"
            value={settings.brand?.favicon || ""}
            onChange={(url) => updateField("brand", "favicon", url)}
          />
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <SectionHeader icon={Phone} title="Contact" description="Phone, email, WhatsApp, and address" />
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput id="contactEmail" label="Email" type="email" value={settings.contact?.email || ""} onChange={(e) => updateField("contact", "email", e.target.value)} />
          <AdminInput id="contactPhone" label="Phone" type="tel" value={settings.contact?.phone || ""} onChange={(e) => updateField("contact", "phone", e.target.value)} />
          <AdminInput id="contactWhatsapp" label="WhatsApp Number" value={settings.contact?.whatsapp || ""} onChange={(e) => updateField("contact", "whatsapp", e.target.value)} />
          <AdminInput id="contactAddress" label="Address" value={settings.contact?.address || ""} onChange={(e) => updateField("contact", "address", e.target.value)} />
          <AdminInput id="contactCity" label="City" value={settings.contact?.city || ""} onChange={(e) => updateField("contact", "city", e.target.value)} />
          <AdminInput id="contactState" label="State" value={settings.contact?.state || ""} onChange={(e) => updateField("contact", "state", e.target.value)} />
          <AdminInput id="contactCountry" label="Country" value={settings.contact?.country || ""} onChange={(e) => updateField("contact", "country", e.target.value)} />
          <AdminInput id="contactPincode" label="Pincode" value={settings.contact?.pincode || ""} onChange={(e) => updateField("contact", "pincode", e.target.value)} />
        </div>
      </div>

      {/* Social Media */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <SectionHeader icon={Globe} title="Social Media" description="Social profiles shown in footer and metadata" />
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput id="socialFacebook" label="Facebook URL" value={settings.social?.facebook || ""} onChange={(e) => updateField("social", "facebook", e.target.value)} placeholder="https://facebook.com/yourpage" />
          <AdminInput id="socialInstagram" label="Instagram URL" value={settings.social?.instagram || ""} onChange={(e) => updateField("social", "instagram", e.target.value)} placeholder="https://instagram.com/yourhandle" />
          <AdminInput id="socialTwitter" label="Twitter / X URL" value={settings.social?.twitter || ""} onChange={(e) => updateField("social", "twitter", e.target.value)} placeholder="https://x.com/yourhandle" />
          <AdminInput id="socialLinkedin" label="LinkedIn URL" value={settings.social?.linkedin || ""} onChange={(e) => updateField("social", "linkedin", e.target.value)} placeholder="https://linkedin.com/company/yours" />
          <AdminInput id="socialYoutube" label="YouTube URL" value={settings.social?.youtube || ""} onChange={(e) => updateField("social", "youtube", e.target.value)} placeholder="https://youtube.com/@yourchannel" />
          <AdminInput id="socialGithub" label="GitHub URL" value={settings.social?.github || ""} onChange={(e) => updateField("social", "github", e.target.value)} placeholder="https://github.com/yourorg" />
        </div>
      </div>

      {/* SEO Defaults */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <SectionHeader icon={BarChart3} title="SEO Defaults" description="Default metadata for pages without custom SEO" />
        <AdminInput id="seoDefaultTitle" label="Default SEO Title" value={settings.seo?.defaultTitle || ""} onChange={(e) => updateField("seo", "defaultTitle", e.target.value)} helperText="Appended to page titles as fallback" />
        <AdminInput id="seoDefaultDesc" label="Default Meta Description" value={settings.seo?.defaultDescription || ""} onChange={(e) => updateField("seo", "defaultDescription", e.target.value)} multiline rows={3} helperText="120–160 characters recommended" />
        <AdminInput id="seoDefaultKeywords" label="Default Keywords" value={settings.seo?.defaultKeywords || ""} onChange={(e) => updateField("seo", "defaultKeywords", e.target.value)} />
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput id="seoDefaultOg" label="Default OG Image URL" value={settings.seo?.defaultOgImage || ""} onChange={(e) => updateField("seo", "defaultOgImage", e.target.value)} placeholder="/logo.svg" />
          <AdminInput id="seoFavicon" label="Favicon URL" value={settings.seo?.favicon || ""} onChange={(e) => updateField("seo", "favicon", e.target.value)} placeholder="/favicon.ico" />
        </div>
      </div>

      {/* Business */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <SectionHeader icon={Building2} title="Business" description="Hours, service area, and business info" />
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput id="bizHours" label="Business Hours" value={settings.business?.businessHours || ""} onChange={(e) => updateField("business", "businessHours", e.target.value)} />
          <AdminInput id="bizFounded" label="Founded Year" value={settings.business?.foundedYear || ""} onChange={(e) => updateField("business", "foundedYear", e.target.value)} />
          <AdminInput id="bizArea" label="Service Area" value={settings.business?.serviceArea || ""} onChange={(e) => updateField("business", "serviceArea", e.target.value)} />
        </div>
      </div>

      {/* Analytics */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <SectionHeader icon={BarChart3} title="Analytics" description="Tracking IDs and measurement" />
        <AdminInput id="gaId" label="Google Analytics ID" value={settings.analytics?.googleAnalyticsId || ""} onChange={(e) => updateField("analytics", "googleAnalyticsId", e.target.value)} placeholder="G-XXXXXXXXXX" />
      </div>

      {/* Footer */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <SectionHeader icon={FileText} title="Footer" description="Footer text and copyright" />
        <AdminInput id="footerText" label="Footer Tagline" value={settings.footer?.footerText || ""} onChange={(e) => updateField("footer", "footerText", e.target.value)} />
        <AdminInput id="copyrightText" label="Copyright Text" value={settings.footer?.copyrightText || ""} onChange={(e) => updateField("footer", "copyrightText", e.target.value)} helperText="Defaults to © {year} {brand name}" />
      </div>

      {/* Save at bottom */}
      <div className="flex justify-end">
        <AdminButton onClick={handleSave} loading={saving} loadingText="Saving...">
          <Save className="h-4 w-4" /> Save settings
        </AdminButton>
      </div>
    </div>
  );
}
