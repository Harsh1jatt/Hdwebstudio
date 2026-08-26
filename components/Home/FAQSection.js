"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, Minus, Plus } from "lucide-react";
import { whatsAppUrl } from "@/config/site";
import { SECTION_Y, SectionHeading } from "./ui";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function FAQItem({ faq, index, isOpen, onToggle }) {
  const contentId = `faq-content-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-300 hover:border-slate-300">
      <button
        id={buttonId}
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
      >
        <span className="pr-2 text-sm font-semibold leading-6 text-slate-900 sm:text-base">
          {faq.question || faq.q}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
            isOpen ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"
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
            <div className="border-t border-slate-100 px-5 pb-6 pt-4 sm:px-6">
              <p className="text-sm leading-7 text-slate-500">{faq.answer || faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection({ faqs }) {
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
    <section className={`bg-slate-50 ${SECTION_Y}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Common Questions"
          title={
            <>
              Questions Before You Start?
              <br className="hidden sm:block" />
              <span className="text-slate-400"> We&apos;ve Got Answers.</span>
            </>
          }
          description="Everything you need to know about working with us and building the right digital solution for your business."
        />

        <div className="mt-12 space-y-3 lg:mt-14">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question || faq.q}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-9">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <MessageCircle className="h-5 w-5 text-blue-600" aria-hidden="true" />
          </div>

          <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-950">Have a Business Problem We Can Solve?</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Tell us what you&apos;re trying to achieve. We&apos;ll understand your requirements and help you find the
            right digital solution.
          </p>

          <a
            href={whatsAppUrl("Hi Harshdeep, I want to discuss a digital solution for my business.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600"
          >
            Let&apos;s Discuss Your Project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>

          <p className="mt-4 text-xs text-slate-400">No obligation. Just a conversation about your goals.</p>
        </div>
      </div>
    </section>
  );
}
