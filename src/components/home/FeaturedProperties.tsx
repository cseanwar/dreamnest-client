"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionWrapper, { SectionHeader } from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { api } from "@/lib/api";

interface FeaturedProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  type: "sale" | "rent";
  bedrooms: number;
  bathrooms: number;
  area: number;
}

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<FeaturedProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ properties: FeaturedProperty[] }>("/api/properties?limit=4")
      .then((res) => setProperties(res.properties))
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SectionWrapper bg="light" id="featured">
      <SectionHeader
        title="Featured Properties"
        subtitle="Handpicked selections from our most exceptional listings"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : properties.map((property, i) => {
              const badgeLabel = property.type === "rent" ? "For Rent" : "For Sale";
              return (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link href={`/properties/${property.id}`}>
                    <div className="card bg-white rounded-box border border-gray-light overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group h-full">
                      <figure className="relative h-52 overflow-hidden">
                        <Image
                          src={
                            property.images?.[0] ||
                            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
                          }
                          alt={property.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge
                            variant={badgeLabel === "For Sale" ? "gold" : "navy"}
                          >
                            {badgeLabel}
                          </Badge>
                        </div>
                      </figure>
                      <div className="p-5 flex flex-col gap-2">
                        <h3 className="font-heading text-lg text-navy">
                          {property.title}
                        </h3>
                        <p className="text-sm text-gray line-clamp-2">
                          {property.description}
                        </p>
                        <p className="text-xs text-gray flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {property.location}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray mt-1">
                          <span>{property.bedrooms} Beds</span>
                          <span>{property.bathrooms} Baths</span>
                          <span>{property.area} sqft</span>
                        </div>
                        <p className="text-xl font-heading text-gold mt-1">
                          {property.type === "rent"
                            ? `$${property.price.toLocaleString()}/mo`
                            : `$${property.price.toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/explore"
          className="btn bg-navy text-white hover:bg-navy-light border-none px-8 rounded-field"
        >
          View All Properties
        </Link>
      </div>
    </SectionWrapper>
  );
}
