"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { defaultWhatsAppMessage, whatsAppUrl } from "@/config/site";

const WHATSAPP_URL = whatsAppUrl(defaultWhatsAppMessage);

export default function WhatsAppFloat() {
const [visible, setVisible] = useState(false);
const [showTooltip, setShowTooltip] = useState(false);
const shouldReduceMotion = useReducedMotion();

useEffect(() => {
const handleScroll = () => {
setVisible(window.scrollY > 300);
};

 
// Check initial position
handleScroll();

window.addEventListener("scroll", handleScroll, {
  passive: true,
});

return () => {
  window.removeEventListener("scroll", handleScroll);
};
 

}, []);

return (
<motion.div
initial={false}
animate={
visible
? {
opacity: 1,
scale: 1,
y: 0,
}
: {
opacity: 0,
scale: 0.85,
y: 10,
}
}
transition={{
duration: shouldReduceMotion ? 0 : 0.25,
ease: "easeOut",
}}
className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6"
style={{
pointerEvents: visible ? "auto" : "none",
}}
> <div className="relative flex items-center gap-3">

 
    {/* Tooltip */}
    <div
      className={`pointer-events-none absolute bottom-full right-0 mb-3 hidden whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow-lg transition-all duration-200 sm:block ${
        showTooltip
          ? "translate-y-0 opacity-100"
          : "translate-y-1 opacity-0"
      }`}
      aria-hidden={!showTooltip}
    >
      Have a project in mind? Let's talk.
      
      {/* Tooltip Arrow */}
      <span className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 bg-slate-900" />
    </div>

    {/* WhatsApp Button */}
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuss your project on WhatsApp"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.06,
            }
      }
      whileTap={
        shouldReduceMotion
          ? undefined
          : {
              scale: 0.95,
            }
      }
      className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl shadow-green-500/25 transition-colors duration-200 hover:bg-[#20bd5a] focus:outline-none focus:ring-4 focus:ring-green-500/30"
    >
      {/* Subtle Pulse */}
      {!shouldReduceMotion && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-green-500 opacity-20 animate-ping"
        />
      )}

      {/* WhatsApp Icon */}
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 fill-white"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>

      {/* Screen Reader Text */}
      <span className="sr-only">
        Chat with us on WhatsApp
      </span>
    </motion.a>
  </div>
</motion.div>
 

);
}
