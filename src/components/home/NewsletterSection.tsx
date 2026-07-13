"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <SectionWrapper id="newsletter">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="card bg-gradient-to-br from-navy to-navy-light rounded-box p-8 md:p-12 border border-navy-light">
          <h2 className="text-3xl md:text-4xl font-heading text-white">Stay in the Loop</h2>
          <p className="mt-3 text-white/70 max-w-lg mx-auto">
            Subscribe to our newsletter for exclusive property alerts, market insights, and expert tips delivered weekly.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="input flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-field focus:outline-none focus:border-gold"
            />
            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </form>

          {status === "success" && (
            <p className="text-gold text-sm mt-4">Thanks for subscribing!</p>
          )}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
