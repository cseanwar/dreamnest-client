"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

const faqs = [
  {
    question: "How do I start searching for a property?",
    answer: "Simply use our search bar on the Explore page to filter by location, property type, price range, and more. You can save your searches and set up alerts for new listings that match your criteria.",
    category: "Getting Started",
  },
  {
    question: "Do I need an account to browse properties?",
    answer: "No, you can browse and search for properties without an account. However, creating a free account allows you to save favorite properties, submit inquiries, and list your own properties.",
    category: "Getting Started",
  },
  {
    question: "What documents do I need to list a property?",
    answer: "To list a property, you'll need a registered account. Once logged in, you can add your property details including photos, description, price, and location. Property ownership verification may be required for certain listings.",
    category: "Listing Properties",
  },
  {
    question: "How do I add images to my property listing?",
    answer: "On the Add Property page, you can paste image URLs in the designated field — one per line. Images from major hosting services work best. We recommend using high-quality photos to attract more interest.",
    category: "Listing Properties",
  },
  {
    question: "How do I edit or remove a listing?",
    answer: "Go to 'My Listings' in your account dashboard. There you can view all your properties. To delete a listing, simply click the Delete button next to the property you want to remove.",
    category: "Listing Properties",
  },
  {
    question: "How are rental payments handled?",
    answer: "Rental payments are arranged directly between tenants and property owners. DreamNest provides the platform for listing and discovery but does not process payments directly. We recommend using secure payment methods and having a formal lease agreement.",
    category: "Rentals",
  },
  {
    question: "Can I save properties for later?",
    answer: "Yes! Once you create an account, you can save your favorite properties to revisit later. Your saved properties are accessible from your profile dashboard at any time.",
    category: "Account",
  },
  {
    question: "How do I contact a property owner?",
    answer: "Each property listing has a contact form or direct inquiry option. Simply click the 'Inquire' button on the property details page, and your message will be forwarded to the property owner or listing agent.",
    category: "Account",
  },
  {
    question: "Is there a fee for using DreamNest?",
    answer: "Browsing and searching for properties is completely free. Creating an account and listing properties is also free. Premium features and promoted listings may incur fees, which are clearly displayed before purchase.",
    category: "Account",
  },
  {
    question: "How do I reset my password?",
    answer: "On the login page, click the 'Forgot Password' link. Enter your registered email address, and we'll send you instructions to reset your password securely.",
    category: "Account",
  },
];

const categories = ["All", ...new Set(faqs.map((f) => f.category))];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen">
      <div className="bg-navy py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-white">Frequently Asked Questions</h1>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Everything you need to know about using DreamNest
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-5 py-2 text-sm font-medium rounded-field transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-navy text-white"
                    : "bg-white border border-gray-light text-gray hover:border-gold hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((faq, i) => {
              const globalIndex = faqs.indexOf(faq);
              return (
                <motion.div
                  key={globalIndex}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.05 }}
                  className="card bg-white rounded-box border border-gray-light overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-navy pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                        openIndex === globalIndex ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === globalIndex && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-sm text-gray leading-relaxed border-t border-gray-light pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12 p-8 card bg-base-200 rounded-box">
            <h3 className="font-heading text-xl text-navy mb-2">Still have questions?</h3>
            <p className="text-gray mb-6">We&apos;re here to help you</p>
            <Link href="/contact">
              <Button variant="primary">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
