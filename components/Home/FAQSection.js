"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, Minus, Plus } from "lucide-react";
import { whatsAppUrl } from "@/config/site";
import { SECTION_Y, SectionHeading } from "./ui";

function FAQItem({ faq, index, isOpen, onToggle }) {
  const contentId = `faq-content-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-300 hover:border-blue-300">
      <button
        id={buttonId}
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left sm:px-6"
      >
        <span className="pr-2 text-xs sm:text-sm font-bold text-slate-900">
          {faq.question || faq.q}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
            isOpen ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
          }`}
        >
          {isOpen ? <Minus className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="border-t border-slate-100 px-5 pb-5 pt-3.5 sm:px-6">
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">{faq.answer || faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  function handleToggle(index) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question || faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.answer || faq.a },
    })),
  };

  return (
    <section className={`bg-slate-50/70 border-b border-slate-200/80 ${SECTION_Y}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Commercial FAQ"
          title="Clear Answers to Technical & Investment Questions."
          description="Everything you need to know about our development timelines, source code ownership, and growth framework."
        />

        <div className="mt-12 space-y-3 lg:mt-14">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question || faq.q || index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50/60 to-cyan-50/60 p-7 text-center shadow-xs sm:p-9">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-blue-200 text-blue-600 shadow-xs">
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
          </div>

          <h3 className="mt-4 text-xl font-black text-slate-950">Have a Custom Technical Requirement?</h3>
          <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm text-slate-600 leading-relaxed">
            Speak directly with Harshdeep to discuss custom integrations, APIs, or specialized architectures.
          </p>

          <a
            href={whatsAppUrl("Hi Harshdeep, I want to discuss a custom web development project for my business.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Chat with Lead Engineer
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
