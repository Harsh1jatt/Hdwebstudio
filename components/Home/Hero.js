// "use client";
// import { motion } from "framer-motion";
// import { fadeUp, staggerContainer } from "../lib/motion";
// import { ChevronDown } from "lucide-react";

// export default function Hero() {
//   return (
//     <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-blue-600 via-sky-500 to-cyan-400 text-white overflow-hidden">
//       {/* Subtle overlay for depth */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

//       <motion.div
//         variants={staggerContainer}
//         initial="hidden"
//         animate="show"
//         className="relative z-10 flex flex-col items-center"
//       >
//         <motion.h1
//           variants={fadeUp}
//           className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg"
//         >
//           Harshdeep Web Studios
//         </motion.h1>

//         <motion.p
//           variants={fadeUp}
//           className="text-lg md:text-2xl max-w-2xl leading-relaxed text-white/90 mb-10"
//         >
//           We craft stunning, modern, and high-performing web experiences that
//           convert visitors into customers.
//         </motion.p>

//         <motion.div
//           variants={fadeUp}
//           className="flex gap-4"
//         >
//           <a
//             href="/contact"
//             className="px-8 py-3 rounded-full bg-white text-blue-600 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition transform"
//           >
//             Book a Call
//           </a>
//           <a
//             href="/portfolio"
//             className="px-8 py-3 rounded-full border border-white font-semibold hover:bg-white hover:text-blue-600 transition"
//           >
//             See Work
//           </a>
//         </motion.div>
//       </motion.div>

//       {/* Scroll indicator */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatType: "mirror" }}
//         className="absolute bottom-10 flex flex-col items-center"
//       >
//         <span className="text-sm text-white/70 mb-2">Scroll</span>
//         <ChevronDown className="w-6 h-6 text-white/80" />
//       </motion.div>
//     </section>
//   );
// }
"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?utm_source=chatgpt.com",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?utm_source=chatgpt.com",
  "https://images.unsplash.com/photo-1522199710521-72d69614c702?utm_source=chatgpt.com",
  // "/hero/slide3.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // 5s per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 text-white overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {slides.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: idx === current ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-blue-600/50" />
      </div>

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <motion.h1
          variants={fadeUp}
          className="text-5xl font-heading md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg"
        >
          Harshdeep Web Studios
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg md:text-2xl max-w-2xl leading-relaxed text-white/90 mb-10"
        >
          We craft stunning, modern, and high-performing web experiences that
          convert visitors into customers.
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-4">
          <a
            href="/contact"
            className="px-8 py-3 rounded-full bg-white text-blue-600 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition transform"
          >
            Book a Call
          </a>
          <a
            href="/portfolio"
            className="px-8 py-3 rounded-full border border-white font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            See Work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.2,
          duration: 1,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute bottom-10 flex flex-col items-center z-10"
      >
        <span className="text-sm text-white/70 mb-2">Scroll</span>
        <ChevronDown className="w-6 h-6 text-white/80" />
      </motion.div>
    </section>
  );
}
