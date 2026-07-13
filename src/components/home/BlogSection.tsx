"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper, { SectionHeader } from "@/components/ui/SectionWrapper";

const posts = [
  {
    title: "2025 Real Estate Market Trends",
    excerpt: "Discover the key trends shaping the housing market this year, from interest rate shifts to emerging neighborhood hotspots.",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80",
    date: "Mar 15, 2025",
    author: "Alex Thompson",
    slug: "market-trends-2025",
  },
  {
    title: "A Guide to First-Time Home Buying",
    excerpt: "Everything you need to know before making your first property purchase, from budgeting to closing the deal.",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
    date: "Feb 28, 2025",
    author: "Maria Garcia",
    slug: "first-time-home-buying-guide",
  },
  {
    title: "Maximizing Your Property Value",
    excerpt: "Smart renovations and improvements that deliver the highest return on investment when selling your home.",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    date: "Feb 10, 2025",
    author: "David Park",
    slug: "maximizing-property-value",
  },
];

export default function BlogSection() {
  return (
    <SectionWrapper bg="light" id="blog">
      <SectionHeader
        title="Latest Insights"
        subtitle="Expert advice and market analysis from our real estate professionals"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="card bg-white rounded-box border border-gray-light overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                <figure className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </figure>
                <div className="p-5">
                  <p className="text-xs text-gray mb-2">{post.date} &middot; {post.author}</p>
                  <h3 className="font-heading text-lg text-navy group-hover:text-gold transition-colors mb-2">{post.title}</h3>
                  <p className="text-sm text-gray line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/blog"
          className="btn bg-navy text-white hover:bg-navy-light border-none px-8 rounded-field"
        >
          View All Articles
        </Link>
      </div>
    </SectionWrapper>
  );
}
