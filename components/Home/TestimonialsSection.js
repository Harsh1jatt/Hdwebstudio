import { Quote } from "lucide-react";
import { CONTAINER, SECTION_Y, SectionHeading } from "./ui";

function getInitials(name) {
  if (!name) return "?";
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

function ClientAvatar({ name }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
      {getInitials(name)}
    </div>
  );
}

export default function TestimonialsSection({ testimonials = [] }) {
  if (!testimonials.length) return null;
  return (
    <section className={`bg-white ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="Client Feedback"
          title={
            <>
              Built for Businesses.
              <br className="hidden sm:block" />
              <span className="text-slate-400"> Trusted by Our Clients.</span>
            </>
          }
          description="We believe the best measure of our work is the experience of the businesses we work with."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={`${testimonial.name}-${testimonial.role}`}
              className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 sm:p-8"
            >
              <div className="absolute right-7 top-7 text-slate-200 transition-colors duration-300 group-hover:text-blue-100">
                <Quote className="h-10 w-10" strokeWidth={1.5} />
              </div>

              <blockquote className="relative mt-6 flex-1 text-[15px] leading-7 text-slate-600">
                &ldquo;{testimonial.content || testimonial.quote}&rdquo;
              </blockquote>

              <footer className="mt-8 flex items-center gap-3 border-t border-slate-200 pt-6">
                <ClientAvatar name={testimonial.name} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-950">{testimonial.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{testimonial.role}</p>
                  {testimonial.location && <p className="mt-0.5 text-xs text-slate-400">{testimonial.location}</p>}
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
