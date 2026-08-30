"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Phone, Mail, Clock, MapPin, CheckCircle2, ShieldCheck, MessageCircle, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";

import {
  siteConfig,
  telUrl,
  mailtoUrl,
  whatsAppUrl,
} from "@/config/site";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";

export default function ContactPageClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.target);
    const payload = {
      name: form.get("name")?.toString() || "",
      business: form.get("business")?.toString() || "",
      phone: form.get("phone")?.toString() || "",
      email: form.get("email")?.toString() || "",
      service: form.get("service")?.toString() || "",
      budget: form.get("budget")?.toString() || "",
      message: form.get("message")?.toString() || "",
      honeypot: form.get("honeypot")?.toString() || "",
      source: "contact-page",
    };

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      trackEvent(AnalyticsEvents.LEAD_SUBMITTED, {
        source: "contact-page",
        has_business: Boolean(payload.business),
        has_email: Boolean(payload.email),
      });

      router.push("/thank-you");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative border-b border-slate-200 bg-slate-50/70 py-14 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-4">
            <Breadcrumbs items={[{ label: "Contact & Discovery" }]} />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
            <Sparkles size={13} className="text-blue-600" />
            Direct Lead Developer Access
          </span>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950"
          >
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Remarkable.
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed sm:text-base"
          >
            Speak directly with Harshdeep and our engineering team in Ludhiana, Punjab. We deliver transparent quotes, clear milestones, and 100% intellectual property ownership.
          </motion.p>
        </div>
      </div>

      {/* Contact Methods Grid */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16"
        >
          {/* Call */}
          <motion.div
            variants={fadeUp}
            className="p-6 bg-slate-50/50 border border-slate-200 rounded-3xl shadow-xs hover:shadow-xl hover:bg-white hover:border-blue-300 transition-all flex flex-col items-center text-center group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 text-blue-600 mb-4 shadow-xs">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-950 mb-1">Direct Call</h3>
            <p className="text-xs text-slate-500 mb-4">{siteConfig.phoneDisplay}</p>
            <a
              href={telUrl()}
              onClick={() => trackEvent(AnalyticsEvents.PHONE_CLICKED, { location: "contact_page" })}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-blue-700 transition"
            >
              Call Now
            </a>
          </motion.div>

          {/* Email */}
          <motion.div
            variants={fadeUp}
            className="p-6 bg-slate-50/50 border border-slate-200 rounded-3xl shadow-xs hover:shadow-xl hover:bg-white hover:border-blue-300 transition-all flex flex-col items-center text-center group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 text-blue-600 mb-4 shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-950 mb-1">Email Us</h3>
            <p className="text-xs text-slate-500 mb-4">{siteConfig.email}</p>
            <a
              href={mailtoUrl()}
              onClick={() => trackEvent(AnalyticsEvents.EMAIL_CLICKED, { location: "contact_page" })}
              className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-slate-50 transition"
            >
              Send Email
            </a>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            variants={fadeUp}
            className="p-6 bg-slate-50/50 border border-slate-200 rounded-3xl shadow-xs hover:shadow-xl hover:bg-white hover:border-emerald-300 transition-all flex flex-col items-center text-center group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 text-emerald-600 mb-4 shadow-xs">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-950 mb-1">WhatsApp Chat</h3>
            <p className="text-xs text-slate-500 mb-4">Instant developer response</p>
            <a
              href={whatsAppUrl("Hi Harshdeep, I would like to discuss a website project with HD Web Studios.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(AnalyticsEvents.WHATSAPP_CLICKED, { location: "contact_page" })}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-emerald-700 transition"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* Contact Form & Studio Details Grid */}
        <div className="grid gap-8 lg:grid-cols-12 max-w-6xl mx-auto">
          {/* Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl shadow-xs p-6 sm:p-10"
          >
            <h2 className="text-2xl font-black text-slate-950 mb-2">
              Share Your Project Details
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill out this quick form and we will review your requirements and respond within 24 hours.
            </p>

            <form className="grid grid-cols-1 gap-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Your Name <span className="text-red-500">*</span></label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm bg-slate-50/50 focus:bg-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-business" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Business / Brand Name</label>
                <input
                  id="contact-business"
                  name="business"
                  type="text"
                  placeholder="e.g. Sharma Traders & Exporters"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm bg-slate-50/50 focus:bg-white"
                />
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-phone" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm bg-slate-50/50 focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Email Address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-service" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Service Needed</label>
                  <select
                    id="contact-service"
                    name="service"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="Business Website Development">Business Website Development</option>
                    <option value="Website Redesign & Modernization">Website Redesign & Modernization</option>
                    <option value="Ecommerce Website Development">Ecommerce Website Development</option>
                    <option value="Custom Web Application Development">Custom Web Application Development</option>
                    <option value="Local SEO & Google Optimization">Local SEO & Google Optimization</option>
                    <option value="Website Maintenance & Support">Website Maintenance & Support</option>
                    <option value="Other">Other Custom Inquiry</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-budget" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Estimated Budget</label>
                  <select
                    id="contact-budget"
                    name="budget"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>Select budget range</option>
                    <option value="Under ₹15,000">Under ₹15,000 (Starter Website)</option>
                    <option value="₹15,000 - ₹30,000">₹15,000 - ₹30,000 (Business Acquisition)</option>
                    <option value="₹30,000 - ₹60,000">₹30,000 - ₹60,000 (Ecommerce / Portal)</option>
                    <option value="₹60,000+">₹60,000+ (Custom Software / SaaS)</option>
                    <option value="Flexible / Undecided">Flexible / Undecided</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Project Details <span className="text-red-500">*</span></label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell us about your project — your target audience, design preferences, and timeline."
                  rows="4"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm bg-slate-50/50 focus:bg-white"
                  required
                ></textarea>
              </div>

              {/* honeypot field for spam prevention */}
              <input name="honeypot" type="text" className="hidden" autoComplete="off" />

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-600/20 hover:bg-blue-700 transition disabled:opacity-60"
                >
                  {loading ? "Sending Details…" : "Send Project Details"}
                </button>
                {error && <p className="text-red-600 text-xs mt-3">{error}</p>}
              </div>
            </form>
          </motion.div>

          {/* Location & Studio Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <h3 className="text-base font-bold text-slate-950 mb-4 flex items-center gap-2">
                <MapPin className="text-blue-600" size={18} />
                Ludhiana Development Studio
              </h3>
              <p className="text-xs leading-relaxed text-slate-600">
                <strong>HD Web Studios</strong><br />
                {siteConfig.address.streetAddress}<br />
                {siteConfig.address.addressLocality}, {siteConfig.address.addressRegion} {siteConfig.address.postalCode}, {siteConfig.address.addressCountry}
              </p>

              <div className="mt-6 border-t border-slate-100 pt-4 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <Clock className="text-blue-600 shrink-0" size={15} />
                  <span><strong>Hours:</strong> Mon – Sat, 9:00 AM – 7:00 PM IST</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <ShieldCheck className="text-blue-600 shrink-0" size={15} />
                  <span><strong>Coverage:</strong> Ludhiana, Punjab & Global Remote</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50/60 p-6 sm:p-8 shadow-xs">
              <h3 className="text-sm font-bold text-slate-950 mb-2">Our Consultation Promise</h3>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>Zero aggressive sales tactics — just practical engineering advice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>Fixed, milestone-based quotes with zero hidden charges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>100% intellectual property ownership of your source code.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Lazy Interactive Map Section */}
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xs">
          {!showMap ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50/80">
              <MapPin size={32} className="text-blue-600 mb-3" />
              <h3 className="text-base font-extrabold text-slate-950">HD Web Studios Location Map</h3>
              <p className="mt-1 text-xs text-slate-600 max-w-md">
                Kakka Rd, Subhash Nagar, Ludhiana, Punjab 141007
              </p>
              <button
                type="button"
                onClick={() => setShowMap(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-blue-700"
              >
                Load Interactive Google Map
              </button>
            </div>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.335470729439!2d75.8963434!3d30.9353533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217ef672d80faf7d%3A0x4a06735f7c283190!2sBaba%20Namdev%20Colony%2C%20Kakka%20Village%2C%20Subhash%20Nagar%2C%20Jagirpur%2C%20Ludhiana%2C%20Punjab%20141007!5e0!3m2!1sen!2sin!4v1693800000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              className="border-0 w-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
}
