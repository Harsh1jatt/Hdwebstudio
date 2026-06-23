"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { Star } from "lucide-react";

// ─── REPLACE WITH YOUR REAL GOOGLE REVIEWS ────────────────────────────────────
const testimonials = [
  {
    name: "Aman Kumar",
    role: "Founder, Raretech Institute",
    location: "Ludhiana, Punjab",
    quote:
      "Harshdeep delivered our complete institute website, admin panel, and online exam portal — all on time and within budget. Our student admissions process is now fully digital. Best website developer in Ludhiana I've worked with.",
    initials: "AK",
    color: "from-blue-500 to-blue-700",
    verified: true,
  },
  {
    name: "Priya Sharma",
    role: "Owner, JMD Solar Energy",
    location: "Punjab",
    quote:
      "Very professional team. Our website now shows up when customers search for solar services in Punjab. We started getting genuine enquiries within the first month. Excellent post-launch support as well.",
    initials: "PS",
    color: "from-emerald-500 to-emerald-700",
    verified: true,
  },
  {
    name: "Rohit Mehta",
    role: "Business Owner",
    location: "Ludhiana",
    quote:
      "Our old website was getting zero enquiries. After the redesign, our WhatsApp messages increased significantly. The team is transparent about pricing and explains everything clearly. No hidden costs.",
    initials: "RM",
    color: "from-purple-500 to-purple-700",
    verified: true,
  },
];
// ──────────────────────────────────────────────────────────────────────────────

function StarRow() {
  return (
    <div className="flex items-center gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
            Client Testimonials
          </p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-slate-500 text-lg max-w-xl mx-auto"
          >
            Business owners across Ludhiana and Punjab trust us with their digital presence.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col p-7 bg-slate-50 border border-slate-100 rounded-2xl hover:shadow-lg transition-shadow duration-300"
            >
              <StarRow />

              <blockquote className="text-slate-700 leading-relaxed text-sm flex-1 mb-6">
                "{t.quote}"
              </blockquote>

              <footer className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                  <p className="text-slate-400 text-xs">{t.location}</p>
                </div>
              </footer>

              {t.verified && (
                <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                  Verified Google Review
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Google Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://g.page/r/YOUR_GOOGLE_BUSINESS_PROFILE_LINK/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-6 py-3 hover:bg-white hover:shadow-md transition duration-300"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-slate-700 font-semibold text-sm">5.0 on Google</span>
            <span className="text-slate-400 text-sm">·</span>
            <span className="text-blue-600 text-sm font-medium">See all reviews →</span>
          </a>
          {/* ⚠️ Replace the href above with your actual Google Business Profile link */}
        </motion.div>

      </div>
    </section>
  );
}