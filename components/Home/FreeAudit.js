"use client";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

const auditPoints = [
  "Why you're not ranking on Google right now",
  "What's stopping visitors from calling you",
  "What your local competitors are doing that you're not",
  "The exact 3 changes that would bring you more enquiries immediately",
];

export default function FreeAudit() {
  const [form, setForm] = useState({ name: "", phone: "", business: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);

    // Build WhatsApp message with form data
    const msg = encodeURIComponent(
      `Hi Harshdeep, I'd like a Free Website Audit.\n\nName: ${form.name}\nPhone: ${form.phone}\nBusiness: ${form.business || "Not specified"}`
    );
    // Open WhatsApp
    window.open(`https://wa.me/917589434135?text=${msg}`, "_blank");

    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="max-w-5xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left — Offer */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full mb-4">
              Free Offer — Worth ₹2,000
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5 leading-tight">
              Get Your Free Website Audit
              <span className="block text-blue-600 mt-1">Delivered in 24 Hours</span>
            </h2>
            <p className="text-slate-500 mb-7 leading-relaxed">
              We'll review your current website (or your competitor's) and send you a clear, honest report showing:
            </p>

            <ul className="space-y-3 mb-8">
              {auditPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>

            <p className="text-xs text-slate-400">
              Takes 2 minutes to request. Report delivered within 24 hours. No sales pressure, ever.
            </p>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-white rounded-2xl p-10 shadow-lg border border-slate-100 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Request Sent!</h3>
                <p className="text-slate-500 text-sm">
                  Your WhatsApp is opening now. Harshdeep will reply within a few hours with your free audit.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Claim Your Free Audit</h3>
                <p className="text-sm text-slate-400 mb-7">Fill in your details — we'll connect on WhatsApp</p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="audit-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      id="audit-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Eg. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="audit-phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      WhatsApp Number *
                    </label>
                    <input
                      id="audit-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Eg. 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="audit-business" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Business Type <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      id="audit-business"
                      type="text"
                      name="business"
                      value={form.business}
                      onChange={handleChange}
                      placeholder="Eg. Clinic, Institute, Manufacturer"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading || !form.name || !form.phone}
                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-sm transition duration-300 mt-2"
                  >
                    {loading ? "Opening WhatsApp..." : "📋 Send My Free Audit Request →"}
                  </button>

                  <p className="text-xs text-center text-slate-400">
                    This opens WhatsApp. We reply within a few hours.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}