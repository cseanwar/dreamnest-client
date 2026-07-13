"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SectionWrapper, { SectionHeader } from "@/components/ui/SectionWrapper";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    text: "DreamNest made finding our dream home effortless. Their team understood exactly what we were looking for and found us the perfect property within weeks. The attention to detail was remarkable.",
  },
  {
    name: "James Rodriguez",
    role: "Property Investor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    text: "As an investor, I need reliable data and great properties. DreamNest delivers on both fronts. Their portfolio management tools and market insights have been invaluable for my investment decisions.",
  },
  {
    name: "Emily Chen",
    role: "First-time Buyer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    text: "I was nervous about buying my first home, but the DreamNest team guided me through every step. From searching to closing, they made the process smooth and stress-free. I couldn't be happier.",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  return (
    <SectionWrapper id="testimonials">
      <SectionHeader
        title="What Our Clients Say"
        subtitle="Real stories from real people who found their perfect home with us"
      />

      <div className="max-w-3xl mx-auto relative">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="card bg-white rounded-box border border-gray-light p-8 md:p-12 text-center"
            >
              <Quote className="w-10 h-10 text-gold/30 mx-auto mb-6" />
              <p className="text-base md:text-lg text-gray leading-relaxed italic">&ldquo;{testimonials[current].text}&rdquo;</p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Image
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-navy text-sm">{testimonials[current].name}</p>
                  <p className="text-xs text-gray">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-gold w-8" : "bg-gray-light hover:bg-gray"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-white border border-gray-light flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-all duration-300 shadow-sm"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-white border border-gray-light flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-all duration-300 shadow-sm"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </SectionWrapper>
  );
}
