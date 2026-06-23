"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { PhoneCall, Clock, Smartphone, Search, KeyRound, MessageCircle } from "lucide-react";

const benefits = [
  {
    title: "Your Phone Will Ring More",
    desc: "We build websites designed to generate leads, not just look good. Most of our clients in Ludhiana start receiving new enquiries within the first 30 days of launch.",
    icon: <PhoneCall className="w-6 h-6 text-blue-600" />,
    bg: "bg-blue-50",
  },
  {
    title: "Live in 7 Days, Not 7 Months",
    desc: "We follow a proven fast-delivery process. Your professional business website will be live in 7 to 14 days — no endless delays, no back-and-forth confusion.",
    icon: <Clock className="w-6 h-6 text-emerald-600" />,
    bg: "bg-emerald-50",
  },
  {
    title: "Looks Perfect on Every Phone",
    desc: "Over 80% of your customers will visit your website on their mobile. We design mobile-first so every visitor gets a smooth, fast, professional experience.",
    icon: <Smartphone className="w-6 h-6 text-purple-600" />,
    bg: "bg-purple-50",
  },
  {
    title: "Google Will Find You",
    desc: "Every website comes with on-page SEO, fast loading speeds, and correct technical structure — so Google can index and rank you above your local competitors.",
    icon: <Search className="w-6 h-6 text-orange-500" />,
    bg: "bg-orange-50",
  },
  {
    title: "You Own Everything — No Lock-In",
    desc: "Your domain, your hosting, your website files. We hand over 100% ownership at delivery. No monthly dependency, no held-hostage situations, ever.",
    icon: <KeyRound className="w-6 h-6 text-indigo-600" />,
    bg: "bg-indigo-50",
  },
  {
    title: "WhatsApp Support After Launch",
    desc: "We don't disappear after delivery. Direct WhatsApp access to your developer for updates, fixes, and questions — because your success is our reputation.",
    icon: <MessageCircle className="w-6 h-6 text-green-600" />,
    bg: "bg-green-50",
  },
];

export default function Benefits() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
            Why 25+ Ludhiana Businesses Trust Us
          </p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-5"
          >
            We Don't Just Build Websites.
            <span className="block text-blue-600 mt-1">We Build Business Growth Engines.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Here's what makes working with Harshdeep Web Studios different from hiring any generic developer or big-city agency.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 list-none"
        >
          {benefits.map((b, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="p-7 bg-white border border-slate-100 rounded-2xl hover:shadow-lg transition-all duration-400 text-left"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${b.bg}`}>
                {b.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{b.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{b.desc}</p>
            </motion.li>
          ))}
        </motion.ul>

      </div>
    </section>
  );
}