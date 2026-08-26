"use client";

import { useState } from "react";

import { ArrowRight, CheckCircle2, Globe2, MessageCircle, ShieldCheck } from "lucide-react";
import { defaultWhatsAppMessage, whatsAppUrl } from "@/config/site";
import { CONTAINER, SECTION_Y } from "./ui";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const auditPoints = [
  "A review of your website's user experience and first impression",
  "Key technical and on-page SEO issues affecting discoverability",
  "Potential conversion problems that may be costing you enquiries",
  "Practical recommendations for improving your website",
];

const businessTypes = [
  "Service Business",
  "Clinic / Healthcare",
  "Coaching / Education",
  "Manufacturing",
  "Restaurant / Hospitality",
  "E-commerce",
  "Professional Services",
  "Other",
];

const initialForm = { name: "", phone: "", business: "", website: "" };

export default function AuditFormSection() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  }

  function validateForm() {
    const trimmedName = form.name.trim();
    const trimmedPhone = form.phone.trim();

    if (!trimmedName) return "Please enter your name.";
    if (!trimmedPhone) return "Please enter your WhatsApp number.";

    const phoneDigits = trimmedPhone.replace(/\D/g, "");
    if (phoneDigits.length < 10) return "Please enter a valid WhatsApp number.";

    if (form.website.trim()) {
      try {
        const websiteUrl = form.website.startsWith("http") ? form.website : `https://${form.website}`;
        new URL(websiteUrl);
      } catch {
        return "Please enter a valid website URL.";
      }
    }
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    const websiteUrl = form.website.trim()
      ? form.website.startsWith("http")
        ? form.website
        : `https://${form.website}`
      : "Not provided";

    const message = `Hi Harshdeep, I'd like to request a Free Website Audit.\n\nName: ${form.name.trim()}\nWhatsApp: ${form.phone.trim()}\nBusiness Type: ${form.business || "Not specified"}\nWebsite: ${websiteUrl}\n\nI'd like to understand how my website can be improved.`;

    window.open(whatsAppUrl(message), "_blank", "noopener,noreferrer");

    setLoading(false);
    setSubmitted(true);
  }

  function resetForm() {
    setForm(initialForm);
    setSubmitted(false);
    setError("");
  }

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50 ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
              <ShieldCheck className="h-4 w-4" />
              Free Website Audit
            </div>

            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl">
              Not Sure What&apos;s Holding Your Website Back?
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Get a practical review of your website and discover where you can improve its design, performance,
              SEO, and ability to turn visitors into enquiries.
            </p>

            <ul className="mt-8 space-y-4">
              {auditPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-blue-600" />
                Delivered via WhatsApp
              </span>
              <span className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-blue-600" />
                Website review included
              </span>
            </div>

            <p className="mt-5 max-w-lg text-xs leading-5 text-slate-400">
              Most audit requests are reviewed within 24 hours. The audit is intended to provide useful
              recommendations — there is no obligation to work with us afterward.
            </p>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/5 sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="mt-6 text-2xl font-bold tracking-tight text-slate-950">Request Received</h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                WhatsApp should have opened in a new tab. Send the pre-filled message to complete your request.
              </p>

              <div className="mt-7 flex flex-col gap-3">
                <a
                  href={whatsAppUrl(defaultWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Open WhatsApp
                  <ArrowRight size={16} />
                </a>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900"
                >
                  Submit another request
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-9"
            >
              <div className="mb-7">
                <h3 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">Request Your Free Audit</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Share a few details and we&apos;ll connect with you on WhatsApp.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="audit-name" className="mb-2 block text-sm font-semibold text-slate-700">
                    Your Name<span className="ml-1 text-blue-600">*</span>
                  </label>
                  <input
                    id="audit-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    autoComplete="name"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label htmlFor="audit-phone" className="mb-2 block text-sm font-semibold text-slate-700">
                    WhatsApp Number<span className="ml-1 text-blue-600">*</span>
                  </label>
                  <input
                    id="audit-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. 98765 43210"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label htmlFor="audit-business" className="mb-2 block text-sm font-semibold text-slate-700">
                    Business Type<span className="ml-2 font-normal text-slate-400">Optional</span>
                  </label>
                  <select
                    id="audit-business"
                    name="business"
                    value={form.business}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="">Select your business type</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="audit-website" className="mb-2 block text-sm font-semibold text-slate-700">
                    Website URL<span className="ml-2 font-normal text-slate-400">Optional</span>
                  </label>
                  <input
                    id="audit-website"
                    type="url"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="e.g. https://yourwebsite.com"
                    autoComplete="url"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                  <p className="mt-2 text-xs text-slate-400">Share your website so we can review the actual experience.</p>
                </div>

                {error && (
                  <div role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Opening WhatsApp..." : "Request My Free Website Audit"}
                  {!loading && (
                    <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
                  )}
                </button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  By submitting this form, you agree to be contacted about your request. Your details will not be
                  sold or shared for unrelated marketing.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
