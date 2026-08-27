"use client";

import { motion } from "framer-motion";
import { Icon, Container, SectionHeading } from "./shared/ui";


const defaultProcess = [
  { icon: "Compass", title: "Discovery", text: "Understanding your business, audience, and goals." },
  { icon: "ClipboardList", title: "Planning", text: "Mapping the structure, content, and technical approach." },
  { icon: "PenTool", title: "UI Design", text: "Designing a user experience around real customer journeys." },
  { icon: "Code2", title: "Development", text: "Building with clean, modern, maintainable code." },
  { icon: "TestTube2", title: "Testing", text: "Reviewing performance, responsiveness, and edge cases." },
  { icon: "Rocket", title: "Launch", text: "Deploying your project with everything checked and ready." },
  { icon: "LifeBuoy", title: "Support", text: "Staying available for updates and improvements after launch." },
];

export default function ProcessTimeline({ data }) {
  const process = data?.length ? data : defaultProcess;
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/60 to-white py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Development Process"
          title="A Clear Path From Idea To Launch."
          description="The same order of operations every time — so you always know what's happening next."
        />

        {/* Desktop timeline */}
        <div className="relative mt-20 hidden lg:block">
          <div className="absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 top-6 h-px w-full bg-gradient-to-r from-blue-600 to-cyan-400"
          />
          <div className="grid grid-cols-7 gap-4">
            {process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
              >
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-md ring-1 ring-slate-100">
                  <Icon name={step.icon} className="h-5 w-5" />
                </span>
                <span className="mt-4 text-[11px] font-bold uppercase tracking-wider text-blue-500">
                  0{i + 1}
                </span>
                <h3 className="mt-1 text-sm font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="relative mt-14 flex flex-col gap-8 lg:hidden">
          <div className="absolute bottom-4 left-6 top-4 w-px bg-gradient-to-b from-blue-600 via-cyan-400 to-transparent" />
          {process.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex items-start gap-4 pl-0"
            >
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-md ring-1 ring-slate-100">
                <Icon name={step.icon} className="h-5 w-5" />
              </span>
              <div className="pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500">
                  Step 0{i + 1}
                </span>
                <h3 className="text-sm font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
