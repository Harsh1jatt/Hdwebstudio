"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../../lib/motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How much does a business website cost in Ludhiana?",
    a: "Our business website packages start from ₹8,000 and scale based on your requirements — number of pages, design complexity, and any additional features. Every project comes with a clear, itemized quote upfront. No hidden charges, ever. WhatsApp us and we'll give you an exact price within 2 hours.",
  },
  {
    q: "How long does it take to build my website?",
    a: "Most business websites are live in 7 to 14 days. Complex projects like admin panels, student management systems, or e-commerce stores take 3 to 4 weeks. We give you a firm delivery date before we start — and we stick to it. No open-ended timelines.",
  },
  {
    q: "Will my website rank on Google?",
    a: "Every website we build includes on-page SEO — proper heading structure, meta tags, image optimization, page speed optimization, and Google Search Console setup. For local businesses, we also optimize your Google Maps listing. Most clients see their website indexed on Google within 2 to 4 weeks of launch, with local ranking improvements over the following 4 to 12 weeks.",
  },
  {
    q: "I already have a website. Can you improve it?",
    a: "Absolutely. Website redesign and performance optimization is one of our most common services. We'll audit your current website for free and tell you exactly what's holding you back — before you spend a single rupee. Many clients are surprised how much low-cost fixes improve their enquiry rate.",
  },
  {
    q: "Do you provide hosting and domain?",
    a: "Yes. We can handle domain registration, hosting setup, and SSL certificate as part of your package. We also help you migrate if you already have existing hosting. Most importantly — you retain full ownership of all accounts. Nothing is locked to us.",
  },
  {
    q: "What kind of businesses do you work with?",
    a: "We specialize in clinics and healthcare professionals, coaching institutes and schools, manufacturers and industrial businesses, solar and construction companies, and local service businesses across Ludhiana, Punjab. If you run a local business and need more customers online — we're the right fit.",
  },
  {
    q: "Will I be able to update my website myself?",
    a: "Yes. We can build your website on WordPress with a simple admin panel so you can add photos, update text, and publish blog posts without any technical knowledge. We also provide a short 1-on-1 training session after handover so you feel confident managing your own site.",
  },
  {
    q: "What happens after my website goes live?",
    a: "We don't disappear after delivery. You get direct WhatsApp access to us for 30 days post-launch for small fixes, tweaks, or questions — included at no extra cost. We also offer affordable monthly maintenance plans for ongoing updates, security monitoring, and performance checks.",
  },
  {
    q: "Do you work with clients outside Ludhiana?",
    a: "Yes — we work with businesses across Punjab including Amritsar, Jalandhar, Chandigarh, Patiala, Ambala, and beyond. Everything is handled smoothly over WhatsApp and video calls, with clear communication at every step. Location is never a barrier.",
  },
  {
    q: "How do I get started?",
    a: "Simple — send us a WhatsApp message at 75894 34135, or fill out the contact form on this page. We'll review your current online presence, understand your business goals, and give you a free honest recommendation within 24 hours. No sales pressure, no obligation — just a clear plan.",
  },
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-800 text-sm md:text-base pr-2">{faq.q}</span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
          {isOpen
            ? <Minus className="w-3.5 h-3.5 text-blue-600" />
            : <Plus className="w-3.5 h-3.5 text-slate-500" />
          }
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 pt-1 text-slate-500 leading-relaxed text-sm border-t border-slate-100">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  function handleToggle(index) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  // FAQ Schema for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      {/* Inject FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
            Common Questions
          </p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-slate-500 text-lg"
          >
            Everything business owners in Ludhiana want to know before getting started.
          </motion.p>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={handleToggle}
            />
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 p-7 bg-white rounded-2xl border border-slate-200"
        >
          <p className="text-slate-700 font-semibold mb-2">Still have a question?</p>
          <p className="text-slate-500 text-sm mb-5">
            Send us a WhatsApp message and we'll answer within a few hours — honestly and without any sales pressure.
          </p>
          <a
            href="https://wa.me/917589434135?text=Hi%20Harshdeep%2C%20I%20have%20a%20question%20about%20getting%20a%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition duration-300"
          >
            💬 Ask on WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  );
}