"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Globe, ShoppingCart, Search, Wrench, PenTool, Briefcase } from "lucide-react";
import { FaWordpress } from "react-icons/fa";

const pricingPlans = [
  {
    title: "One Page Website",
    price: "₹8,000",
    discountPrice: "₹6,500",
    icon: <Globe className="w-10 h-10 text-blue-600" />,
    features: [
      "Modern responsive design",
      "Fast-loading & SEO ready",
      "Basic contact form",
      "Delivery in 5-7 days",
      "Up to 3 revisions included",
    ],
    note: "Perfect for startups or individuals who need a clean and professional online presence.",
  },
  {
    title: "Multi-Page Business Website",
    price: "₹15,000",
    discountPrice: "₹12,000",
    popular: true,
    icon: <Globe className="w-10 h-10 text-emerald-600" />,
    features: [
      "Up to 7 pages (Home, About, Services, Contact, etc.)",
      "SEO-friendly architecture",
      "Custom design & animations",
      "Admin-friendly structure",
      "Up to 3 revisions included",
    ],
    note: "Ideal for small businesses looking for a complete digital identity with multiple pages.",
  },
  {
    title: "E-commerce Website",
    price: "₹30,000",
    discountPrice: "₹25,000",
    icon: <ShoppingCart className="w-10 h-10 text-pink-600" />,
    features: [
      "Product pages with categories",
      "Cart & Checkout flow",
      "Payment gateway integration",
      "Order & inventory management",
      "Up to 3 revisions included",
    ],
    note: "Designed for businesses ready to sell online with smooth shopping experiences.",
  },
  {
    title: "WordPress Website",
    price: "₹12,000",
    discountPrice: "₹9,500",
    icon: <FaWordpress className="w-10 h-10 text-indigo-600" />,
    features: [
      "Business or blog website",
      "Premium theme setup",
      "Essential plugins installed",
      "Easy to manage dashboard",
      "Up to 3 revisions included",
    ],
    note: "Great choice if you want a website that’s easy to manage with WordPress.",
  },
  {
    title: "Landing Page Design",
    price: "₹10,000",
    discountPrice: "₹7,500",
    icon: <PenTool className="w-10 h-10 text-rose-600" />,
    features: [
      "Conversion-focused design",
      "A/B testing ready",
      "Responsive & modern UI",
      "Delivery in 4 days",
      "Up to 3 revisions included",
    ],
    note: "Best for marketing campaigns or single product/service promotions.",
  },
  {
    title: "Portfolio Website",
    price: "₹12,000",
    discountPrice: "₹9,000",
    icon: <Briefcase className="w-10 h-10 text-amber-600" />,
    features: [
      "Showcase projects & case studies",
      "Image/video gallery support",
      "SEO & speed optimized",
      "Custom branding",
      "Up to 3 revisions included",
    ],
    note: "Show off your skills, projects, and achievements with a professional portfolio.",
  },
  {
    title: "SEO Optimization",
    price: "₹5,000/mo",
    discountPrice: "₹4,000/mo",
    icon: <Search className="w-10 h-10 text-yellow-600" />,
    features: [
      "On-page SEO & keyword optimization",
      "Google indexing & sitemap setup",
      "Performance & speed tuning",
      "Monthly growth report",
      "Up to 3 revisions included",
    ],
    note: "Boost your website rankings and visibility with consistent SEO efforts.",
  },
  {
    title: "Maintenance & Support",
    price: "₹2,500/mo",
    discountPrice: "₹2,000/mo",
    icon: <Wrench className="w-10 h-10 text-gray-700" />,
    features: [
      "Regular updates & security",
      "Backup & monitoring",
      "Bug fixes & small edits",
      "Priority support",
      "Up to 3 revisions included",
    ],
    note: "Peace of mind with continuous support, updates, and maintenance.",
  },
];

export default function Pricing() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 via-emerald-100/30 to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent"
        >
          Transparent Pricing, Maximum Value
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-lg text-gray-600 mb-14"
        >
          Invest in your growth. Every package is designed to maximize your ROI
          — clear pricing, no hidden costs, only results.
        </motion.p>

        {/* Pricing Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10"
        >
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className={`relative group p-8 rounded-2xl shadow-lg border ${
                plan.popular
                  ? "border-blue-500 shadow-blue-200"
                  : "border-slate-200"
              } bg-white hover:shadow-2xl transition flex flex-col`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <span className="absolute -top-3 right-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-tr from-blue-500/10 to-emerald-500/10">
                {plan.icon}
              </div>

              {/* Title + Price */}
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {plan.title}
              </h3>
              <div className="mb-6">
                <p className="text-lg text-gray-500 line-through">{plan.price}</p>
                <p className="text-2xl font-semibold text-blue-600">
                  {plan.discountPrice}
                </p>
              </div>

              {/* Features */}
              <ul className="text-left text-gray-600 space-y-2 flex-1">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>

              {/* Explanation */}
              <p className="mt-4 text-sm text-gray-500 italic">{plan.note}</p>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-8 w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-medium py-3 rounded-xl shadow-md hover:shadow-lg transition"
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
               {/* Important Note Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 max-w-3xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-left shadow-sm"
        >
          <h4 className="text-xl font-semibold text-yellow-700 mb-2">
            Important Note
          </h4>
          <p className="text-gray-700 mb-3">
            Work begins only after an <span className="font-semibold">advance payment</span>.
            Once you book a service, you will receive a confirmation call where we’ll
            discuss your exact requirements.
          </p>
          <p className="text-gray-700">
            Based on the discussion, we’ll confirm the scope and timeline of the project.
            This ensures complete clarity before starting — no surprises, only results.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
