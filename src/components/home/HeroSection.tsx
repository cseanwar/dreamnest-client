"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    title: "Modern Living Redefined",
    subtitle: "Premium residences crafted for contemporary lifestyles",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    title: "Where Dreams Find a Home",
    subtitle: "Curated properties in the world's most desirable locations",
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    title: "Elevate Your Lifestyle",
    subtitle: "Exclusive estates with unparalleled luxury and comfort",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-xl">
          <motion.span
            key={`tag-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-4 py-1.5 bg-gold/90 text-navy text-xs font-semibold uppercase tracking-widest rounded-field mb-4"
          >
            Premium Properties
          </motion.span>

          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-white leading-tight"
          >
            {slides[current].title}
          </motion.h1>

          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-4 text-lg md:text-xl text-white/80 max-w-lg"
          >
            {slides[current].subtitle}
          </motion.p>

          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/explore"
              className="btn bg-gold text-navy hover:bg-gold-light border-none px-8 py-3 h-auto text-sm font-semibold uppercase tracking-wider rounded-field transition-all duration-300"
            >
              Explore Properties
            </Link>
            <Link
              href="/register"
              className="btn bg-transparent text-white border-2 border-white/40 hover:border-white px-8 py-3 h-auto text-sm font-semibold uppercase tracking-wider rounded-field transition-all duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-10 h-1 rounded-full transition-all duration-300 ${
              i === current ? "bg-gold w-14" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
