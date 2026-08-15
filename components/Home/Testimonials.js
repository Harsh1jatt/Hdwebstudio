"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";

import { fadeUp, staggerContainer } from "../../lib/motion";

/*
Add your real Google Business Profile information here.

Example:

const googleRating = {
rating: "5.0",
reviewCount: "25+",
url: "YOUR_REAL_GOOGLE_REVIEW_URL",
};

Keep null until you have verified data.
*/

const googleRating = null;

function StarRating() {
return ( <div
   className="flex items-center gap-1"
   aria-label="5 out of 5 stars"
 >
{[...Array(5)].map((_, index) => ( <Star
       key={index}
       className="h-4 w-4 fill-yellow-400 text-yellow-400"
       aria-hidden="true"
     />
))} </div>
);
}

function ClientAvatar({ initials }) {
return ( <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
{initials} </div>
);
}

export default function Testimonials({ testimonials = [] }) {
const shouldReduceMotion = useReducedMotion();

return ( <section className="bg-white py-20 sm:py-24 lg:py-28"> <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

 
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
        Client Feedback
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-4 text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl"
      >
        Built for Businesses.
        <br className="hidden sm:block" />
        <span className="text-slate-400">
          {" "}Trusted by Our Clients.
        </span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg"
      >
        We believe the best measure of our work is the experience of the
        businesses we work with.
      </motion.p>
    </div>

    {/* Testimonials */}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3"
    >
      {testimonials.map((testimonial) => (
        <motion.article
          key={`${testimonial.name}-${testimonial.role}`}
          variants={fadeUp}
          className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 sm:p-8"
        >
          <div className="absolute right-7 top-7 text-slate-200 transition-colors duration-300 group-hover:text-blue-100">
            <Quote
              className="h-10 w-10"
              strokeWidth={1.5}
            />
          </div>

          <div className="relative">
            <StarRating />
          </div>

          <blockquote className="relative mt-6 flex-1 text-[15px] leading-7 text-slate-600">
            &ldquo;{testimonial.content || testimonial.quote}&rdquo;
          </blockquote>

          <footer className="mt-8 flex items-center gap-3 border-t border-slate-200 pt-6">
            <ClientAvatar initials={testimonial.initials} />

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-950">
                {testimonial.name}
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                {testimonial.role}
              </p>

              {testimonial.location && (
                <p className="mt-0.5 text-xs text-slate-400">
                  {testimonial.location}
                </p>
              )}
            </div>
          </footer>
        </motion.article>
      ))}
    </motion.div>

    {/* Google Rating */}
    {googleRating && (
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
        className="mt-12 flex justify-center"
      >
        <a
          href={googleRating.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  aria-hidden="true"
                />
              ))}
            </div>

            <span className="text-sm font-bold text-slate-900">
              {googleRating.rating}
            </span>
          </div>

          <span className="h-4 w-px bg-slate-200" />

          <span className="text-sm text-slate-500">
            {googleRating.reviewCount} Google Reviews
          </span>

          <ExternalLink
            className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </motion.div>
    )}

  </div>
</section>


);
}
