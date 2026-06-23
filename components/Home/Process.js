"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";

const steps = [
  {
    step: "01",
    title: "You Enquire — We Listen",
    desc: "Send us a WhatsApp message or fill the contact form. We'll understand your business, your goals, and what you need — no technical knowledge required from your side. You'll get an honest recommendation and a clear quote within 24 hours.",
    highlight: "Free · No Obligation · Honest Advice",
  },
  {
    step: "02",
    title: "We Design & Build",
    desc: "We get to work immediately. You'll see a live preview of your website within a few days. You give feedback, we refine. No endless revisions, no confusion — a clear, structured process that keeps things moving fast.",
    highlight: "7–14 Day Delivery · WhatsApp Updates · Your Approval Required",
  },
  {
    step: "03",
    title: "You Launch & Grow",
    desc: "Your website goes live, fully optimized for Google and ready to receive enquiries. We hand over 100% ownership — domain, hosting, files. And we stay available on WhatsApp for 30 days post-launch for any support.",
    highlight: "Full Ownership · SEO-Ready · 30-Day Post-Launch Support",
  },
];

export default function Process() {
  return (
    <section className="py-20 md:py-28 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            How It Works
          </p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Getting a Professional Website is
            <span className="text-cyan-400"> Simpler Than You Think</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Three clear steps. Zero confusion. Just results.
          </motion.p>
        </div>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex gap-6 md:gap-10 items-start p-7 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/8 transition-colors duration-300"
            >
              {/* Step Number */}
              <div className="text-4xl md:text-6xl font-extrabold text-white/10 flex-shrink-0 leading-none mt-1 select-none">
                {step.step}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-4 text-sm md:text-base">{step.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {step.highlight.split(" · ").map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="https://wa.me/917589434135?text=Hi%20Harshdeep%2C%20I%27d%20like%20to%20start%20Step%201%20and%20discuss%20my%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold shadow-lg shadow-cyan-500/20 transition duration-300"
          >
            💬 Start Step 1 — WhatsApp Us Now
          </a>
          <p className="text-slate-500 text-xs mt-4">Takes 2 minutes. No commitment required.</p>
        </motion.div>

      </div>
    </section>
  );
}