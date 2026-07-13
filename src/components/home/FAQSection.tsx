"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionWrapper, { SectionHeader } from "@/components/ui/SectionWrapper";

const faqs = [
  {
    question: "How do I start searching for a property?",
    answer: "Simply use our search bar on the Explore page to filter by location, property type, price range, and more. You can save your searches and set up alerts for new listings that match your criteria.",
  },
  {
    question: "What documents do I need to list a property?",
    answer: "To list a property, you'll need a registered account. Once logged in, you can add your property details including photos, description, price, and location. Property ownership verification may be required for certain listings.",
  },
  {
    question: "How are rental payments handled?",
    answer: "Rental payments are arranged directly between tenants and property owners. DreamNest provides the platform for listing and discovery but does not process payments directly. We recommend using secure payment methods and having a formal lease agreement.",
  },
  {
    question: "Can I save properties for later?",
    answer: "Yes! Once you create an account, you can save your favorite properties to revisit later. Your saved properties are accessible from your profile dashboard at any time.",
  },
  {
    question: "How do I contact a property owner?",
    answer: "Each property listing has a contact form or direct inquiry option. Simply click the 'Inquire' button on the property details page, and your message will be forwarded to the property owner or listing agent.",
  },
  {
    question: "Is there a fee for using DreamNest?",
    answer: "Browsing and searching for properties is completely free. Creating an account and listing properties is also free. Premium features and promoted listings may incur fees, which are clearly displayed before purchase.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper bg="light" id="faq">
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Quick answers to common questions about our platform"
      />

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.05 }}
            className="card bg-white rounded-box border border-gray-light overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-medium text-navy pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {openIndex === i && (
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
        ))}
      </div>
    </SectionWrapper>
  );
}
