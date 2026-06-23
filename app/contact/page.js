"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { Phone, Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function ContactPage() {
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

      // success -> redirect to thank-you
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
          Let's Get in Touch
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
            <p className="text-gray-600 mb-4">+91 75894 34135</p>
            <a
              href="tel:+917589434135"
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
            <p className="text-gray-600 mb-4">contact@harshdeepweb.com</p>
            <a
              href="mailto:contact@harshdeepweb.com"
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
            <SiWhatsapp className="w-10 h-10 text-emerald-500 mb-4 group-hover:animate-pulse" />
            <h3 className="text-xl font-semibold mb-2">Whatsapp</h3>
            <p className="text-gray-600 mb-4">+91 75894 34135</p>
            <a
              href="https://wa.me/917589434135"
              target="_blank"
              rel="noopener noreferrer"
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
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
              required
            />
            <input
              name="business"
              type="text"
              placeholder="Business / Brand Name"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
            />
            <textarea
              name="message"
              placeholder="What type of website or digital solution do you need?"
              rows="5"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
              required
            ></textarea>

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
