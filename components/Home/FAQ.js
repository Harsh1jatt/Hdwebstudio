"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
Plus,
Minus,
MessageCircle,
ArrowRight,
} from "lucide-react";

import { fadeUp } from "../../lib/motion";

const faqs = [
{
q: "What kind of digital solutions do you provide?",
a: "We help businesses build and improve their digital presence with solutions tailored to their needs. This can include professional business websites, lead-generation websites, e-commerce experiences, custom web applications, business portals, admin dashboards, client systems, and other digital tools that help businesses operate and grow more effectively.",
},
{
q: "Do you only build websites?",
a: "No. A website is often just one part of a business's digital ecosystem. We focus on understanding the problem first and then building the right solution around it. Depending on your requirements, we can help you establish your online presence, generate more enquiries, streamline business processes, build custom web-based systems, or create digital experiences for your customers and team.",
},
{
q: "I have an idea but don't know what solution I need. Can you help?",
a: "Absolutely. You don't need to know the technical details or even have a complete plan before contacting us. Tell us about your business, the problem you're facing, or what you want to achieve. We'll understand your requirements, suggest the most practical approach, and explain what should be built, why it is needed, and how it can help your business.",
},
{
q: "How much does a website or digital solution cost?",
a: "The investment depends entirely on what your business needs. A simple business website and a custom business platform have very different requirements, so we don't believe in forcing every client into the same package. We'll first understand your goals and requirements, then provide a clear project scope and transparent quotation before development begins.",
},
{
q: "How long does it take to complete a project?",
a: "The timeline depends on the scope and complexity of your project. A focused business website may be completed within a few weeks, while larger projects involving custom functionality, business workflows, dashboards, or web applications may require more time. Before starting, we'll discuss the expected timeline, milestones, and deliverables so you always know what to expect.",
},
{
q: "Can you improve my existing website or digital presence?",
a: "Yes. If you already have a website or an existing digital system, we can review it and identify opportunities to improve its design, user experience, performance, mobile experience, SEO foundations, conversion flow, or overall functionality. If the existing system is limiting your growth, we'll also explain whether improving it or rebuilding it would be the better long-term decision.",
},
{
q: "Can you build a custom system for my business?",
a: "Yes. If your business has a process that is currently handled manually or through multiple disconnected tools, we can help turn that process into a custom digital solution. This may include dashboards, admin systems, customer portals, internal tools, booking systems, management platforms, or other web-based applications designed around your specific workflow.",
},
{
q: "Will I be able to manage and update my website or content?",
a: "Yes. We can provide an appropriate content management or administration system based on your requirements. This can allow authorized team members to manage content such as pages, services, projects, FAQs, testimonials, and blog posts without depending on a developer for every small change. The exact level of control is customized according to your business needs.",
},
{
q: "Do you help with SEO and getting more customers online?",
a: "Yes. We build digital experiences with search visibility and conversions in mind. Depending on your project, this can include technical SEO foundations, on-page optimization, performance improvements, structured content, local search considerations, and conversion-focused user experiences. We focus on building a strong foundation, while ongoing rankings and growth depend on factors such as competition, content, authority, and your overall marketing strategy.",
},
{
q: "Do you provide support after the project is completed?",
a: "Yes. We can continue supporting you after launch with maintenance, updates, improvements, troubleshooting, content changes, performance optimization, and future feature development. If your business needs ongoing technical assistance, we can also discuss a suitable support and maintenance arrangement.",
},
{
q: "Do you work with businesses outside Ludhiana and Punjab?",
a: "Yes. While we work with businesses in Ludhiana and across Punjab, we also work remotely with clients from different locations. Communication, project discussions, approvals, and updates can all be handled online, making location no barrier to working together.",
},
{
q: "How do I get started?",
a: "Simply get in touch with us and tell us about your business, your current situation, and what you want to achieve. We'll discuss your requirements, understand the problem you're trying to solve, and recommend the next practical step. There is no need to prepare a technical specification before contacting us.",
},
];

function FAQItem({ faq, index, isOpen, onToggle }) {
const contentId = `faq-content-${index}`;
const buttonId = `faq-button-${index}`;

return ( <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-300 hover:border-slate-300">
<button
id={buttonId}
type="button"
onClick={() => onToggle(index)}
aria-expanded={isOpen}
aria-controls={contentId}
className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
> <span className="pr-2 text-sm font-semibold leading-6 text-slate-900 sm:text-base">
{faq.q} </span>

 
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
        isOpen
          ? "bg-blue-50 text-blue-600"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      {isOpen ? (
        <Minus className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Plus className="h-4 w-4" aria-hidden="true" />
      )}
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
          <p className="text-sm leading-7 text-slate-500">
            {faq.a}
          </p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
 

);
}

export default function FAQ() {
const [openIndex, setOpenIndex] = useState(0);
const shouldReduceMotion = useReducedMotion();

function handleToggle(index) {
setOpenIndex((current) =>
current === index ? null : index
);
}

const schemaData = {
"@context": "https://schema.org",
"@type": "FAQPage",
mainEntity: faqs.map((faq) => ({
"@type": "Question",
name: faq.q,
acceptedAnswer: {
"@type": "Answer",
text: faq.a,
},
})),
};

return ( <section className="bg-slate-50 py-20 sm:py-24 lg:py-28">
{/* FAQ Structured Data */}
<script
type="application/ld+json"
dangerouslySetInnerHTML={{
__html: JSON.stringify(schemaData),
}}
/>

 
  <div className="mx-auto max-w-4xl px-5 sm:px-6">

    {/* Header */}
    <div className="mx-auto max-w-3xl text-center">
      <motion.p
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: 10 }
        }
        whileInView={
          shouldReduceMotion
            ? undefined
            : { opacity: 1, y: 0 }
        }
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600"
      >
        Common Questions
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-4 text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl"
      >
        Questions Before You Start?
        <br className="hidden sm:block" />
        <span className="text-slate-400">
          {" "}We've Got Answers.
        </span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg"
      >
        Everything you need to know about working with us and building
        the right digital solution for your business.
      </motion.p>
    </div>

    {/* FAQ List */}
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 20 }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="mt-12 space-y-3 lg:mt-14"
    >
      {faqs.map((faq, index) => (
        <FAQItem
          key={faq.q}
          faq={faq}
          index={index}
          isOpen={openIndex === index}
          onToggle={handleToggle}
        />
      ))}
    </motion.div>

    {/* Final CTA */}
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 15 }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : { opacity: 1, y: 0 }
      }
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="mt-12 rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-9"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
        <MessageCircle
          className="h-5 w-5 text-blue-600"
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-950">
        Have a Business Problem We Can Solve?
      </h3>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
        Tell us what you're trying to achieve. We'll understand your
        requirements and help you find the right digital solution.
      </p>

      <a
        href="https://wa.me/917589434135?text=Hi%20Harshdeep%2C%20I%20want%20to%20discuss%20a%20digital%20solution%20for%20my%20business."
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600"
      >
        Let's Discuss Your Project
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </a>

      <p className="mt-4 text-xs text-slate-400">
        No obligation. Just a conversation about your goals.
      </p>
    </motion.div>

  </div>
</section>
 

);
}
