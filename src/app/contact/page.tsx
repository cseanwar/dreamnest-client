"use client";

import { useState, FormEvent, ReactNode } from "react";
import { MapPin, Mail, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("Name, email, and message are required");
      return;
    }

    setStatus("loading");
    try {
      await api.post("/api/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setError("Failed to send message. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen">
      <div className="bg-navy py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-white">Contact Us</h1>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Have a question or want to get in touch? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="card bg-white rounded-box border border-gray-light p-6 md:p-8">
                <h2 className="font-heading text-2xl text-navy mb-6">Send a Message</h2>

                {status === "success" && (
                  <div className="alert alert-success mb-6 rounded-field text-sm">
                    <span>Message sent successfully! We&apos;ll get back to you soon.</span>
                  </div>
                )}

                {error && (
                  <div className="alert alert-error mb-6 rounded-field text-sm">
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Name *"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your full name"
                    />
                    <Input
                      label="Email *"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                  <Input
                    label="Subject"
                    value={form.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    placeholder="How can we help?"
                  />
                  <div className="form-control w-full">
                    <label className="label pb-1">
                      <span className="label-text font-body text-sm text-navy">Message *</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="textarea w-full rounded-field border border-gray-light bg-white text-navy placeholder:text-gray focus:outline-none focus:border-gold"
                    />
                  </div>
                  <Button type="submit" variant="primary" isLoading={status === "loading"}>
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              {([
                { title: "Visit Us", icon: MapPin, lines: ["123 Dream Street", "Suite 400", "New York, NY 10001"] },
                { title: "Contact Info", icon: Mail, lines: ["hello@dreamnest.com", "+1 (555) 123-4567"] },
                { title: "Business Hours", icon: Clock, lines: ["Mon – Fri: 9:00 AM – 6:00 PM", "Sat: 10:00 AM – 4:00 PM", "Sun: Closed"] },
              ] as { title: string; icon: React.ComponentType<{ className?: string }>; lines: string[] }[]).map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="card bg-white rounded-box border border-gray-light p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base text-navy mb-1">{item.title}</h3>
                        {item.lines.map((line) => (
                          <p key={line} className="text-sm text-gray">{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
