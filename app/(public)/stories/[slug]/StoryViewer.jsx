"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function StoryViewer({ slides = [], storyTitle = "" }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const total = slides.length;

  const goNext = useCallback(() => {
    if (current < total - 1) {
      setDirection(1);
      setCurrent((prev) => prev + 1);
    }
  }, [current, total]);

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((prev) => prev - 1);
    }
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState(null);

  function handleTouchStart(e) {
    setTouchStart(e.touches[0].clientX);
  }

  function handleTouchEnd(e) {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  }

  if (total === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
        <p className="text-slate-500">No slides in this story.</p>
      </div>
    );
  }

  const slide = slides[current];

  return (
    <div className="space-y-6">
      {/* Story Container */}
      <div
        className="relative mx-auto aspect-[9/16] w-full max-w-[400px] overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress Bar */}
        <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 px-3 pt-3">
          {slides.map((_, i) => (
            <div key={i} className="h-0.5 flex-1 rounded-full bg-white/30">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  i < current ? "bg-white" : i === current ? "bg-white" : "bg-transparent"
                }`}
                style={{ width: i <= current ? "100%" : "0%" }}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {current > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {current < total - 1 && (
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {/* Slide Content */}
        <div
          key={current}
          className="absolute inset-0 flex flex-col"
          style={{ backgroundColor: slide.backgroundColor || "#0f172a", color: slide.textColor || "#ffffff" }}
        >
          {/* Image */}
          {slide.image && (
            <div className="relative flex-1">
              <Image
                src={slide.image}
                alt={slide.imageAlt || slide.heading || `${storyTitle} - slide ${current + 1}`}
                fill
                className="object-cover"
                sizes="400px"
                priority={current === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          )}

          {/* Text Content */}
          <div className={`relative z-10 p-6 ${slide.image ? "absolute bottom-0 left-0 right-0" : "flex flex-1 flex-col justify-center"}`}>
            {slide.heading && (
              <h2 className="text-2xl font-bold leading-tight">{slide.heading}</h2>
            )}
            {slide.body && (
              <p className="mt-3 text-sm leading-relaxed opacity-90">{slide.body}</p>
            )}
            {slide.ctaText && slide.ctaUrl && (
              <Link
                href={slide.ctaUrl}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-2.5 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/30"
                style={{ color: slide.textColor || "#ffffff" }}
              >
                {slide.ctaText}
              </Link>
            )}
          </div>
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-3 left-0 right-0 z-20 text-center">
          <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {current + 1} / {total}
          </span>
        </div>
      </div>

      {/* Tap Areas (invisible, for easy tap navigation) */}
      <div className="relative -mt-[calc(100%-48px)] mx-auto max-w-[400px] flex" style={{ height: 0 }}>
        <div className="w-1/3 cursor-pointer" onClick={goPrev} role="button" aria-label="Previous slide" />
        <div className="w-1/3" />
        <div className="w-1/3 cursor-pointer" onClick={goNext} role="button" aria-label="Next slide" />
      </div>
    </div>
  );
}
