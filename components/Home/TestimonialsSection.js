import { Quote, Star } from "lucide-react";
import { CONTAINER, SECTION_Y, SectionHeading } from "./ui";

function getInitials(name) {
  if (!name) return "?";
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

function ClientAvatar({ name }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-sm font-black text-blue-600 shadow-xs">
      {getInitials(name)}
    </div>
  );
}

export default function TestimonialsSection({ testimonials = [] }) {
  if (!testimonials.length) return null;

  return (
    <section className={`bg-white border-b border-slate-200/80 ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="Verified Testimonials"
          title="Engineered for Businesses. Trusted by Founders."
          description="Read genuine feedback from commercial founders, manufacturers, and service leaders across Ludhiana and India."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={`${testimonial.name}-${testimonial.role}`}
              className="group relative flex h-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-slate-50/50 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:bg-white hover:shadow-xl hover:shadow-blue-600/10 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-slate-300 group-hover:text-blue-200 transition-colors" strokeWidth={1.5} />
                </div>

                <blockquote className="mt-5 text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                  &ldquo;{testimonial.content || testimonial.quote}&rdquo;
                </blockquote>
              </div>

              <footer className="mt-8 flex items-center gap-3.5 border-t border-slate-200/70 pt-5">
                <ClientAvatar name={testimonial.name} />
                <div className="min-w-0">
                  <p className="truncate text-xs sm:text-sm font-extrabold text-slate-950">{testimonial.name}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-500">{testimonial.role || testimonial.company}</p>
                  {testimonial.location && <p className="text-[10px] text-slate-400">{testimonial.location}</p>}
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
