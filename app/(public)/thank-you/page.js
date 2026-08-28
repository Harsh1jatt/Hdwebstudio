import Link from "next/link";
import { siteConfig, whatsAppUrl, absoluteUrl } from "@/config/site";
import { CheckCircle2, ArrowRight, MessageCircle, Sparkles, Phone, Mail } from "lucide-react";

export const metadata = {
  title: { absolute: "Thank You for Contacting Us | HD Web Studios" },
  description:
    "We have received your enquiry and our engineering team will get in touch with you within 24 hours.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: absoluteUrl("/thank-you"),
  },
};

export default function ThankYouPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50/60 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-xs">
            <CheckCircle2 size={36} />
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Sparkles size={13} className="text-emerald-600" />
            Request Confirmed
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Thank You for Reaching Out!
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            We have received your details. Harshdeep and our engineering team will review your business requirements and contact you within 24 hours with actionable next steps.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={whatsAppUrl("Hi Harshdeep, I just submitted the contact form on hdwebstudios.in and wanted to connect.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-700"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp Directly
            </a>
            <Link
              href="/work"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Explore Our Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              What Happens Next?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Here is our transparent 3-step consultation process for new clients.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                1
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-950">Requirement Review</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                We review your business goals, existing website (if any), target market in Ludhiana/Punjab, and key technical considerations.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                2
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-950">Strategy & Scoping Call</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                We schedule a quick discovery discussion to align on design architecture, conversion pathways, timeline, and exact deliverables.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                3
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-950">Proposal & Kickoff</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                You receive a transparent project proposal with milestone timelines, zero hidden costs, and 100% intellectual property ownership.
              </p>
            </div>
          </div>

          {/* Quick Contact Box */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <h3 className="text-base font-bold text-slate-950">Need an immediate answer?</h3>
                <p className="text-xs text-slate-600">You can reach out directly to our Ludhiana development office.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5"><Phone size={14} className="text-blue-600" /> {siteConfig.phoneDisplay}</span>
                <span className="flex items-center gap-1.5"><Mail size={14} className="text-blue-600" /> {siteConfig.email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
