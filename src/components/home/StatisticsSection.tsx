"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

const stats = [
  { value: 12500, suffix: "+", label: "Properties Sold" },
  { value: 8400, suffix: "+", label: "Happy Clients" },
  { value: 18, suffix: "", label: "Industry Awards" },
  { value: 25, suffix: "+", label: "Years Experience" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-heading text-gold tabular-nums">
      {true ? (
        <CountUp to={value} />
      ) : "0"}
      {suffix}
    </span>
  );
}

function CountUp({ to }: { to: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {to.toLocaleString()}
    </motion.span>
  );
}

export default function StatisticsSection() {
  return (
    <SectionWrapper bg="navy" id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <p className="text-sm text-white/70 mt-2 uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
