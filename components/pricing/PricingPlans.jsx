"use client";

import { motion } from "framer-motion";
import { FaWordpress } from "react-icons/fa";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { resolveIcon } from "@/lib/icons";

function PlanIcon({ name, className }) {
  if (name === "Wordpress") {
    return <FaWordpress className={className} />;
  }

  const Icon = resolveIcon(name);
  return <Icon className={className} />;
}

export default function PricingPlans({ plans = [] }) {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-200/40 via-emerald-100/30 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-6 bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl"
        >
          Transparent Pricing, Maximum Value
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-lg text-gray-600"
        >
          Invest in your growth. Every package is designed to maximize your ROI
          — clear pricing, no hidden costs, only results.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-10 md:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name || plan.title}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className={`group relative flex flex-col rounded-2xl border bg-white p-8 shadow-lg transition hover:shadow-2xl ${
                plan.highlighted || plan.popular
                  ? "border-blue-500 shadow-blue-200"
                  : "border-slate-200"
              }`}
            >
              {(plan.highlighted || plan.popular) && (
                <span className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 px-3 py-1 text-sm font-semibold text-white shadow-md">
                  {plan.badge || "Most Popular"}
                </span>
              )}

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500/10 to-emerald-500/10">
                <PlanIcon
                  name={plan.icon}
                  className="h-10 w-10 text-blue-600"
                />
              </div>

              <h2 className="mb-2 text-xl font-bold text-gray-900">
                {plan.name || plan.title}
              </h2>
              <div className="mb-6">
                <p className="text-lg text-gray-500 line-through">
                  {plan.price}
                </p>
                <p className="text-2xl font-semibold text-blue-600">
                  {plan.discountPrice}
                </p>
              </div>

              <ul className="flex-1 space-y-2 text-left text-gray-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-sm italic text-gray-500">{plan.note}</p>

              <a
                href={plan.ctaUrl || "/contact"}
                className="mt-8 block w-full rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 py-3 text-center font-medium text-white shadow-md transition hover:scale-105 hover:shadow-lg"
              >
                {plan.ctaText || "Get Started"}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-20 max-w-3xl rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-left shadow-sm"
        >
          <h3 className="mb-2 text-xl font-semibold text-yellow-700">
            Important Note
          </h3>
          <p className="mb-3 text-gray-700">
            Work begins only after an{" "}
            <span className="font-semibold">advance payment</span>. Once you book
            a service, you will receive a confirmation call where we&apos;ll
            discuss your exact requirements.
          </p>
          <p className="text-gray-700">
            Based on the discussion, we&apos;ll confirm the scope and timeline
            of the project. This ensures complete clarity before starting — no
            surprises, only results.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
