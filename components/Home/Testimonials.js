"use client";
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/motion';

const testimonials = [
  { name: 'Aman K.', role: 'Founder, Raretech', quote: 'HD Web Studio delivered a reliable admin panel and a fast website that increased enquiries.' },
  { name: 'Priya S.', role: 'Owner, JMD Solar', quote: 'Professional, responsive, and great support after launch.' },
  { name: 'Rohit M.', role: 'Marketing Lead', quote: 'Our conversion rate improved significantly after the redesign.' },
];

export default function Testimonials(){
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" className="text-3xl font-bold mb-6">What Our Clients Say</motion.h2>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t,i)=> (
            <motion.blockquote key={i} variants={fadeUp} className="p-6 bg-slate-50 rounded-2xl">
              <p className="text-slate-700 italic">“{t.quote}”</p>
              <footer className="mt-4 text-sm font-semibold text-slate-900">{t.name} <span className="text-slate-500">— {t.role}</span></footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
