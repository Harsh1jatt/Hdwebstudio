"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { Globe, Settings, TrendingUp, Wrench } from "lucide-react";

const services = [
  {
    title: "Business Website Development",
    tagline: "Your website will make your phone ring.",
    desc: "We design professional, fast-loading business websites for clinics, coaching institutes, manufacturers, and service businesses across Ludhiana and Punjab. Every site is mobile-optimized, SEO-ready, and built to convert visitors into paying customers.",
    outcomes: [
      "More Google enquiries every week",
      "Professional credibility with new customers",
      "Outrank local competitors on search",
    ],
    icon: <Globe className="w-8 h-8 text-blue-600" />,
    accent: "blue",
  },
  {
    title: "Custom Admin Panels & Business Portals",
    tagline: "Run your business smarter, not harder.",
    desc: "From student management systems for institutes to inventory dashboards for manufacturers — we build custom backend tools that replace manual work, reduce errors, and save hours every single week.",
    outcomes: [
      "Paperwork and manual tasks reduced",
      "Staff efficiency and accuracy improved",
      "Real-time data access from any device",
    ],
    icon: <Settings className="w-8 h-8 text-emerald-600" />,
    accent: "emerald",
  },
  {
    title: "SEO & Google Rankings",
    tagline: "Get found. Get calls. Get customers.",
    desc: "We optimize your website to rank for the searches your customers are already making — 'clinic in Ludhiana,' 'coaching institute near me,' 'solar panel dealer Punjab.' Technical SEO, Google Maps optimization, and page speed included in every project.",
    outcomes: [
      "First-page Google rankings for local searches",
      "More organic traffic without paid ads",
      "Customers who are already looking for you",
    ],
    icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
    accent: "purple",
  },
  {
    title: "Website Maintenance & Support",
    tagline: "Never worry about your website again.",
    desc: "Monthly maintenance plans that keep your website fast, secure, updated, and always online. One WhatsApp message and it's handled — no technical knowledge needed on your end.",
    outcomes: [
      "Website always online and secure",
      "Updates and changes handled quickly",
      "Direct WhatsApp access to your developer",
    ],
    icon: <Wrench className="w-8 h-8 text-orange-500" />,
    accent: "orange",
  },
];

const accentMap = {
  blue: "bg-blue-50 group-hover:bg-blue-100",
  emerald: "bg-emerald-50 group-hover:bg-emerald-100",
  purple: "bg-purple-50 group-hover:bg-purple-100",
  orange: "bg-orange-50 group-hover:bg-orange-100",
};

export default function Services() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
            What We Build
          </p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight"
          >
            Complete Digital Solutions <br className="hidden md:block" />
            for Growing Businesses in Punjab
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            We don't just build websites — we build business growth engines. Every service is designed around one goal: more customers for your business.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className={`group relative p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${accentMap[service.accent]}`}>
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-1">{service.title}</h3>
              <p className="text-sm font-semibold text-blue-600 mb-3 italic">{service.tagline}</p>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed text-sm mb-5">{service.desc}</p>

              {/* Outcomes */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">What you'll get:</p>
                {service.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    {outcome}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="px-10 py-4 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transition duration-300"
            >
              Get a Free Project Consultation →
            </a>
            <a
              href="https://wa.me/917589434135?text=Hi%20Harshdeep%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full border border-slate-300 font-semibold hover:bg-slate-100 transition duration-300"
            >
              💬 Chat on WhatsApp
            </a>
          </div>
          <p className="text-sm text-slate-400 mt-5">
            ⚡ Fast Delivery &nbsp;·&nbsp; 👨‍💻 Direct Developer Support &nbsp;·&nbsp; 💰 Transparent Pricing
          </p>
        </motion.div>

      </div>
    </section>
  );
}