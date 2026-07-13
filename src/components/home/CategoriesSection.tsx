"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper, { SectionHeader } from "@/components/ui/SectionWrapper";
import { api } from "@/lib/api";

const categories = [
  { name: "Luxury Villas", value: "villa", icon: "🏛️", color: "from-amber-500/20 to-amber-600/10" },
  { name: "Modern Apartments", value: "apartment", icon: "🏢", color: "from-blue-500/20 to-blue-600/10" },
  { name: "Cozy Houses", value: "house", icon: "🏠", color: "from-emerald-500/20 to-emerald-600/10" },
  { name: "Penthouse Suites", value: "condo", icon: "🌟", color: "from-purple-500/20 to-purple-600/10" },
  { name: "Commercial Spaces", value: "office", icon: "🏪", color: "from-orange-500/20 to-orange-600/10" },
  { name: "Vacation Rentals", value: "vacation", icon: "🌴", color: "from-teal-500/20 to-teal-600/10" },
];

export default function CategoriesSection() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    api.get<{ categories: { _id: string; count: number }[] }>("/api/properties/stats/category")
      .then((res) => {
        const map: Record<string, number> = {};
        res.categories.forEach((c) => { if (c._id) map[c._id] = c.count; });
        setCounts(map);
      })
      .catch((err) => console.error("Category stats fetch failed:", err, err instanceof Error && 'status' in err ? (err as {status: number}).status : 'no status'));
  }, []);

  return (
    <SectionWrapper bg="light" id="categories">
      <SectionHeader
        title="Browse by Category"
        subtitle="Find exactly what you're looking for across our diverse property categories"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Link
              href={`/explore?category=${cat.value}`}
              className="card bg-white rounded-box border border-gray-light p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group block"
            >
              <span className="text-3xl block mb-2">{cat.icon}</span>
              <h3 className="font-heading text-sm text-navy group-hover:text-gold transition-colors">{cat.name}</h3>
              <p className="text-xs text-gray mt-1">{counts[cat.value] ?? 0} properties</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
