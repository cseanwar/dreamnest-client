"use client";

import { motion } from "framer-motion";
import { Home, ShieldCheck, Search, Users } from "lucide-react";
import SectionWrapper, { SectionHeader } from "@/components/ui/SectionWrapper";

const services = [
  {
    icon: Home,
    title: "Property Sales",
    description: "Expert guidance through every step of your property purchase or sale journey with dedicated agents.",
  },
  {
    icon: ShieldCheck,
    title: "Rental Services",
    description: "Premium rental listings with flexible terms and comprehensive tenant support for property owners.",
  },
  {
    icon: Search,
    title: "Property Search",
    description: "Advanced search tools with intelligent filters to find your ideal property faster and easier.",
  },
  {
    icon: Users,
    title: "Property Management",
    description: "Full-service management solutions for landlords including maintenance, tenants, and finances.",
  },
];

export default function ServicesSection() {
  return (
    <SectionWrapper id="services">
      <SectionHeader
        title="Our Services"
        subtitle="Comprehensive real estate solutions tailored to your needs"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card bg-white rounded-box border border-gray-light p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-navy/5 flex items-center justify-center text-navy group-hover:bg-gold group-hover:text-white transition-all duration-300 mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-lg text-navy mb-2">{service.title}</h3>
                <p className="text-sm text-gray leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
      </div>
    </SectionWrapper>
  );
}
