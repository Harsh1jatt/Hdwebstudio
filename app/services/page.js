"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import {
  Code2,
  Palette,
  Rocket,
  Smartphone,
  ShoppingBag,
  Server,
  Globe,
  ShieldCheck,
  BarChart3,
  Settings,
} from "lucide-react";

const services = [
  {
    title: "Web Development",
    desc: "We build blazing-fast, scalable, and secure websites using the latest MERN stack and modern frameworks. From simple landing pages to enterprise-level web apps, our code is clean, optimized, and designed for long-term growth.",
    icon: <Code2 className="w-10 h-10 text-blue-600" />,
  },
  {
    title: "UI/UX Design",
    desc: "Great design is more than just colors and fonts. We craft user journeys that feel effortless, engaging, and professional. Every pixel is carefully placed to increase conversions and leave a lasting impression.",
    icon: <Palette className="w-10 h-10 text-pink-500" />,
  },
  {
    title: "SEO Optimization",
    desc: "A website is only valuable if people can find it. We optimize Core Web Vitals, meta tags, structured data, and content strategies to ensure your website ranks higher on Google and drives organic traffic.",
    icon: <Rocket className="w-10 h-10 text-emerald-500" />,
  },
  {
    title: "Mobile-Friendly Development",
    desc: "Your users are browsing on mobile. We design and develop fully responsive websites that adapt beautifully across devices. From smartphones to tablets, your website will perform seamlessly everywhere.",
    icon: <Smartphone className="w-10 h-10 text-blue-500" />,
  },
  {
    title: "E-Commerce Solutions",
    desc: "Whether it’s a small online shop or a multi-vendor marketplace, we build e-commerce solutions that are fast, secure, and conversion-focused. We integrate payments, inventory management, and analytics for maximum growth.",
    icon: <ShoppingBag className="w-10 h-10 text-emerald-600" />,
  },
  {
    title: "Backend & API Development",
    desc: "Every strong app needs a powerful engine. We design and implement robust backends with REST and GraphQL APIs, optimized databases, and secure architecture that scales with your business.",
    icon: <Server className="w-10 h-10 text-purple-500" />,
  },
  {
    title: "Custom Web Applications",
    desc: "Need something unique? From booking systems to dashboards, CRMs to management tools — we build custom web applications tailored to your exact business needs.",
    icon: <Globe className="w-10 h-10 text-indigo-600" />,
  },
  {
    title: "Website Security & Maintenance",
    desc: "We keep your website safe, secure, and up to date. With regular updates, malware protection, and 24/7 monitoring, you never have to worry about downtime or hacks.",
    icon: <ShieldCheck className="w-10 h-10 text-red-500" />,
  },
  {
    title: "Analytics & Performance Tracking",
    desc: "Data is power. We integrate Google Analytics, Search Console, and heatmaps so you can track user behavior, traffic sources, and conversion rates. Every decision becomes data-driven.",
    icon: <BarChart3 className="w-10 h-10 text-orange-500" />,
  },
  {
    title: "Website Optimization & Support",
    desc: "Already have a website? We’ll make it faster, smoother, and more professional. From speed optimization to bug fixes and ongoing support, we keep your digital presence at its best.",
    icon: <Settings className="w-10 h-10 text-slate-600" />,
  },
];

export default function Services() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 via-pink-100/30 to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent"
        >
          Our Services
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-lg text-gray-600 mb-14"
        >
          We don’t just create websites — we deliver end-to-end digital solutions designed to scale, engage, and convert. Explore our services to see how we can help your business thrive online.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05, rotate: "-1deg" }}
              className="relative group p-8 rounded-2xl shadow-lg border border-slate-200 bg-white hover:shadow-2xl transition"
            >
              {/* Icon circle with glow */}
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 group-hover:scale-110 transition">
                {s.icon}
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition">
                {s.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{s.desc}</p>

              {/* subtle bottom border accent */}
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-emerald-500 group-hover:w-full transition-all duration-500 rounded-b-xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-16 px-6 rounded-2xl shadow-xl"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Work With Us?</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            From design to development, optimization to support — we’re your one-stop digital partner.
            Let’s bring your project to life together.
          </p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-slate-100 transition">
            Book a Free Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
