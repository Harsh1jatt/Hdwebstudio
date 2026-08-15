"use client";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";
import { whatsAppUrl } from "@/config/site";
import { Check, X, AlertCircle } from "lucide-react";

const rows = [
  {
    feature: "Delivery Time",
    us: "7–14 Days",
    freelancer: "1–3 Months",
    agency: "2–6 Months",
    usGood: true,
    freelancerGood: false,
    agencyGood: false,
  },
  {
    feature: "Local Ludhiana Knowledge",
    us: "Yes — We're Local",
    freelancer: "Unknown Location",
    agency: "No Local Context",
    usGood: true,
    freelancerGood: false,
    agencyGood: false,
  },
  {
    feature: "Post-Launch Support",
    us: "Direct WhatsApp",
    freelancer: "Usually Disappears",
    agency: "Expensive Retainer",
    usGood: true,
    freelancerGood: false,
    agencyGood: false,
  },
  {
    feature: "SEO Included",
    us: "Every Project",
    freelancer: "Extra Cost",
    agency: "Extra Cost",
    usGood: true,
    freelancerGood: null,
    agencyGood: null,
  },
  {
    feature: "You Own Everything",
    us: "100% Ownership",
    freelancer: "Sometimes",
    agency: "Often Locked In",
    usGood: true,
    freelancerGood: null,
    agencyGood: false,
  },
  {
    feature: "Transparent Pricing",
    us: "Clear Quote Upfront",
    freelancer: "Varies Wildly",
    agency: "Expensive + Hidden Fees",
    usGood: true,
    freelancerGood: null,
    agencyGood: false,
  },
];

function StatusIcon({ good }) {
  if (good === true) return <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />;
  if (good === false) return <X className="w-4 h-4 text-red-400 flex-shrink-0" />;
  return <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />;
}

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
            The Honest Comparison
          </p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-5"
          >
            Why Ludhiana Businesses Choose Us
            <span className="block text-slate-400 text-2xl md:text-3xl mt-2 font-normal">
              Over a Freelancer or a Big Agency
            </span>
          </motion.h2>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-6 py-4 font-semibold text-slate-500 w-1/4">Feature</th>
                <th className="px-6 py-4 font-bold text-blue-700 bg-blue-50 w-1/4 text-center">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-blue-500 mb-0.5">Best Choice</span>
                  Harshdeep Web Studios
                </th>
                <th className="px-6 py-4 font-semibold text-slate-500 w-1/4 text-center">Typical Freelancer</th>
                <th className="px-6 py-4 font-semibold text-slate-500 w-1/4 text-center">Big Agency</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-6 py-4 font-medium text-slate-700">{row.feature}</td>
                  <td className="px-6 py-4 bg-blue-50/40 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <StatusIcon good={row.usGood} />
                      <span className="font-semibold text-slate-800">{row.us}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <StatusIcon good={row.freelancerGood} />
                      <span className="text-slate-500">{row.freelancer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <StatusIcon good={row.agencyGood} />
                      <span className="text-slate-500">{row.agency}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-5 mt-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Good</span>
          <span className="flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Varies</span>
          <span className="flex items-center gap-1.5"><X className="w-3.5 h-3.5 text-red-400" /> Problem</span>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href={whatsAppUrl(
              "Hi Harshdeep, I'd like to discuss my website project."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition duration-300"
          >
            💬 Let's Discuss Your Project on WhatsApp →
          </a>
        </motion.div>

      </div>
    </section>
  );
}