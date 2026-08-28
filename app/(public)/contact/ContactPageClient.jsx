"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Phone, Mail } from "lucide-react";

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

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.target);
    const payload = {
      name: form.get('name')?.toString() || '',
      business: form.get('business')?.toString() || '',
      phone: form.get('phone')?.toString() || '',
      email: form.get('email')?.toString() || '',
      service: form.get('service')?.toString() || '',
      budget: form.get('budget')?.toString() || '',
      message: form.get('message')?.toString() || '',
      honeypot: form.get('honeypot')?.toString() || '',
      source: 'contact-page',
    };

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');

      trackEvent(AnalyticsEvents.LEAD_SUBMITTED, {
        source: 'contact-page',
        has_business: Boolean(payload.business),
        has_email: Boolean(payload.email),
      });

      router.push('/thank-you');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-gray-50">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.05),transparent_60%)]" />

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-md bg-gradient-to-b from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent"
        >
          Let&apos;s Get in Touch
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-5 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto"
        >
          Share your project details and we will guide you in building
          a professional website or digital solution.
        </motion.p>
      </div>

      {/* Contact Methods */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16"
        >
          {/* Call */}
          <motion.div
            variants={fadeUp}
            className="p-6 bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center group"
          >
            <Phone className="w-10 h-10 text-blue-600 mb-4 group-hover:animate-bounce" />
            <h3 className="text-xl font-semibold mb-2">Call</h3>
            <p className="text-gray-600 mb-4">{siteConfig.phoneDisplay}</p>
            <a
              href={telUrl()}
              onClick={() => trackEvent(AnalyticsEvents.PHONE_CLICKED, { location: "contact_page" })}
              className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
            >
              Call Now
            </a>
          </motion.div>

          {/* Email */}
          <motion.div
            variants={fadeUp}
            className="p-6 bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center group"
          >
            <Mail className="w-10 h-10 text-green-600 mb-4 group-hover:animate-pulse" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600 mb-4">{siteConfig.email}</p>
            <a
              href={mailtoUrl()}
              onClick={() => trackEvent(AnalyticsEvents.EMAIL_CLICKED, { location: "contact_page" })}
              className="px-6 py-2 rounded-full bg-green-600 text-white font-medium shadow hover:bg-green-700 transition"
            >
              Send Email
            </a>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            variants={fadeUp}
            className="p-6 bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center group"
          >
            <svg viewBox="0 0 24 24" className="w-10 h-10 fill-emerald-500 mb-4" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <h3 className="text-xl font-semibold mb-2">Whatsapp</h3>
            <p className="text-gray-600 mb-4">{siteConfig.phoneDisplay}</p>
            <a
              href={whatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(AnalyticsEvents.WHATSAPP_CLICKED, { location: "contact_page" })}
              className="px-6 py-2 rounded-full bg-emerald-500 text-white font-medium shadow hover:bg-emerald-600 transition"
            >
              Chat on Whatsapp
            </a>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl p-8 sm:p-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Share Your Project Details
          </h2>
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-slate-700">Your Name <span className="text-red-500">*</span></label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="e.g. Rahul Sharma"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-business" className="mb-1.5 block text-sm font-semibold text-slate-700">Business / Brand Name</label>
              <input
                id="contact-business"
                name="business"
                type="text"
                placeholder="e.g. Sharma Traders"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-semibold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-service" className="mb-1.5 block text-sm font-semibold text-slate-700">Service Needed</label>
                <select
                  id="contact-service"
                  name="service"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base bg-white"
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
                <label htmlFor="contact-budget" className="mb-1.5 block text-sm font-semibold text-slate-700">Estimated Budget</label>
                <select
                  id="contact-budget"
                  name="budget"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base bg-white"
                  defaultValue=""
                >
                  <option value="" disabled>Select budget range</option>
                  <option value="Under ₹15,000">Under ₹15,000 (Starter Website)</option>
                  <option value="₹15,000 - ₹30,000">₹15,000 - ₹30,000 (Business Acquisition)</option>
                  <option value="₹30,000 - ₹60,000">₹30,000 - ₹60,000 (Ecommerce / Portal)</option>
                  <option value="₹60,000+">₹60,000+ (Custom SaaS / ERP)</option>
                  <option value="Flexible / Undecided">Flexible / Undecided</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-slate-700">Project Details <span className="text-red-500">*</span></label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell us about your project — your goals, specific requirements, or questions."
                rows="4"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
                required
              ></textarea>
            </div>

            {/* honeypot field for bots */}
            <input name="honeypot" type="text" className="hidden" autoComplete="off" />

            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-sm sm:text-base disabled:opacity-60 w-full sm:w-auto"
              >
                {loading ? 'Sending…' : 'Send Details'}
              </button>
              {error && <p className="text-red-600 mt-3">{error}</p>}
            </div>
          </form>
        </motion.div>
      </div>

      {/* Map Section */}
      <div className="relative max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.335470729439!2d75.8963434!3d30.9353533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217ef672d80faf7d%3A0x4a06735f7c283190!2sBaba%20Namdev%20Colony%2C%20Kakka%20Village%2C%20Subhash%20Nagar%2C%20Jagirpur%2C%20Ludhiana%2C%20Punjab%20141007!5e0!3m2!1sen!2sin!4v1693800000000!5m2!1sen!2sin"
            width="100%"
            height="450"
            className="border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
