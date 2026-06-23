"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { Star, ExternalLink } from "lucide-react";

// ─── REPLACE THESE with your real Google reviews ──────────────────────────────
// To get them: open your Google Business Profile → Reviews → copy name, role, quote
const reviews = [
  {
    name: "Aman Kumar",
    role: "Founder, Raretech Institute — Ludhiana",
    quote:
      "Harshdeep delivered our complete institute website, admin panel, and exam portal on time and within budget. Student enquiries moved fully online within weeks of launch. Highly recommended for any institute in Ludhiana.",
    initials: "AK",
    color: "bg-blue-600",
  },
  {
    name: "Priya Sharma",
    role: "Owner, JMD Solar Energy — Punjab",
    quote:
      "Very professional team. Our website now shows up on Google when customers search for solar panels in Punjab. We started getting calls within the first month. Great post-launch support too.",
    initials: "PS",
    color: "bg-emerald-600",
  },
  {
    name: "Rohit Mehta",
    role: "Marketing Head — Local Business, Ludhiana",
    quote:
      "Our old website was not generating any leads. After the redesign by Harshdeep Web Studios, our WhatsApp enquiries increased significantly. The team is responsive and explains everything clearly.",
    initials: "RM",
    color: "bg-purple-600",
  },
];
// ──────────────────────────────────────────────────────────────────────────────

function StarRow() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function GoogleReviews() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
            Real Client Reviews
          </p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Real Businesses. Real Results.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-lg text-slate-500 max-w-xl mx-auto"
          >
            Don't take our word for it — here's what our clients across Ludhiana and Punjab say about working with us.
          </motion.p>

          {/* Aggregate Rating */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mt-6 bg-slate-50 border border-slate-200 rounded-full px-5 py-2.5"
          >
            <StarRow />
            <span className="font-bold text-slate-900">5.0</span>
            <span className="text-slate-400 text-sm">·</span>
            <span className="text-slate-600 text-sm font-medium">Rated on Google</span>
          </motion.div>
        </div>

        {/* Review Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col justify-between p-7 bg-slate-50 border border-slate-200 rounded-2xl hover:shadow-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="mb-4">
                <StarRow />
              </div>

              {/* Quote */}
              <blockquote className="text-slate-700 leading-relaxed text-sm flex-1 mb-6">
                "{review.quote}"
              </blockquote>

              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{review.name}</p>
                  <p className="text-slate-500 text-xs">{review.role}</p>
                </div>
              </div>

              {/* Verified badge */}
              <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                Verified Google Review
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Google Maps CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="https://g.page/r/YOUR_GOOGLE_BUSINESS_PROFILE_LINK/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition text-sm"
          >
            📍 See All Our Reviews on Google Maps
            <ExternalLink className="w-4 h-4" />
          </a>
          {/* ⚠️ Replace the href above with your actual Google Business Profile review link */}
        </motion.div>

      </div>
    </section>
  );
}