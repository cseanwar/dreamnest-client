import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

const team = [
  { name: "Alexandra Reed", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name: "Marcus Johnson", role: "Head of Operations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name: "Sophia Chen", role: "Lead Designer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
  { name: "David Kim", role: "Head of Technology", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
];

const values = [
  { title: "Trust & Transparency", description: "Every transaction is built on honest communication and clear expectations. We believe in full disclosure at every step." },
  { title: "Innovation First", description: "We leverage cutting-edge technology to make property search smarter, faster, and more intuitive for everyone." },
  { title: "Client Centricity", description: "Your goals drive everything we do. Our platform is designed around the needs of buyers, sellers, and renters alike." },
  { title: "Community Impact", description: "We're committed to building stronger communities by helping people find homes where they can truly thrive." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-navy py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-white">About DreamNest</h1>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto text-lg">
            We&apos;re on a mission to transform the way people discover, buy, and rent properties
            through innovation, trust, and exceptional service.
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-heading text-navy mt-3">Redefining Real Estate Since 2020</h2>
              <div className="w-12 h-1 bg-gold mt-4" />
              <p className="text-gray mt-6 leading-relaxed">
                DreamNest was born from a simple idea: finding a home should be inspiring, not exhausting.
                What started as a small team of passionate real estate professionals and technologists has grown into
                a trusted platform connecting thousands of people with their ideal properties.
              </p>
              <p className="text-gray mt-4 leading-relaxed">
                Today, we serve clients across the country with a comprehensive suite of tools for buying, selling,
                and renting properties. Our platform combines cutting-edge technology with deep industry expertise
                to deliver an experience that&apos;s seamless, transparent, and genuinely helpful.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 rounded-box overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80" alt="Modern apartment" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="h-64 rounded-box overflow-hidden mt-8 relative">
                <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" alt="Luxury home" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading text-navy">Our Values</h2>
            <div className="w-12 h-1 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card bg-white rounded-box border border-gray-light p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="font-heading text-lg text-navy mb-2">{v.title}</h3>
                <p className="text-sm text-gray leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading text-navy">Meet Our Team</h2>
            <div className="w-12 h-1 bg-gold mx-auto mt-4" />
            <p className="text-gray mt-4 max-w-xl mx-auto">The passionate people behind DreamNest</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card bg-white rounded-box border border-gray-light overflow-hidden hover:shadow-lg transition-all duration-300 text-center">
                <div className="h-56 overflow-hidden relative">
                  <Image src={member.image} alt={member.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg text-navy">{member.name}</h3>
                  <p className="text-sm text-gray">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading text-white">Ready to Find Your Dream Home?</h2>
          <p className="text-white/70 mt-4 max-w-lg mx-auto">Join thousands of happy homeowners who found their perfect property with DreamNest.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/explore">
              <Button variant="secondary">Browse Properties</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
