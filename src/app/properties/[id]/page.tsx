"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Bath,
  Maximize,
  Building2,
  Check,
  Star,
  Mail,
  Heart,
  MapPin,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { SkeletonDetail } from "@/components/ui/Skeleton";
import PropertyCard from "@/components/properties/PropertyCard";
import { api } from "@/lib/api";

interface PropertyDetail {
  id: string;
  _id: string;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  location: string;
  images: string[];
  category: string;
  type: "sale" | "rent";
  bedrooms: number;
  bathrooms: number;
  area: number;
  rating: number;
  featured: boolean;
  createdAt: string;
}

const reviews = [
  {
    name: "Michael Chen",
    role: "Buyer",
    rating: 5,
    text: "Exceptional property and seamless transaction. The listing was accurate and the agent was incredibly helpful throughout the process.",
  },
  {
    name: "Jessica Williams",
    role: "Tenant",
    rating: 4,
    text: "Great experience with DreamNest. The property exceeded expectations and the rental process was straightforward and professional.",
  },
  {
    name: "Robert Kim",
    role: "Investor",
    rating: 5,
    text: "Outstanding investment opportunity. The property has appreciated significantly and the rental yield has been excellent.",
  },
];

const amenities = [
  "Central AC",
  "Hardwood Floors",
  "Stainless Appliances",
  "Walk-in Closets",
  "Pool Access",
  "Fitness Center",
  "Parking Garage",
  "Rooftop Terrace",
];

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [related, setRelated] = useState<PropertyDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get<PropertyDetail>(
          `/api/properties/${params.id}`,
        );
        setProperty(res);
        setSelectedImage(0);

        const relatedRes = await api.get<{ properties: PropertyDetail[] }>(
          `/api/properties?category=${res.category}&limit=4`,
        );
        setRelated(
          relatedRes.properties
            .filter((p) => (p.id || p._id) !== params.id)
            .slice(0, 4),
        );
      } catch {
        setProperty(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SkeletonDetail />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <h2 className="font-heading text-2xl text-navy mb-2">
            Property Not Found
          </h2>
          <p className="text-gray mb-6">
            The property you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/explore">
            <Button variant="primary">Browse Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images =
    property.images?.length > 0
      ? property.images
      : [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        ];

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-gray mb-6">
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
          <span>/</span>
          <Link href="/explore" className="hover:text-navy">
            Explore
          </Link>
          <span>/</span>
          <span className="text-navy font-medium">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-72 md:h-96 rounded-box overflow-hidden">
              <Image
                src={images[selectedImage]}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge variant={property.type === "sale" ? "gold" : "navy"}>
                  {property.type === "sale" ? "For Sale" : "For Rent"}
                </Badge>
                {property.featured && <Badge variant="gold">Featured</Badge>}
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-16 rounded-field overflow-hidden shrink-0 border-2 transition-colors ${
                      i === selectedImage ? "border-gold" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="card bg-white rounded-box border border-gray-light p-6">
              <h2 className="font-heading text-2xl text-navy mb-4">Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {(
                  [
                    { label: "Bedrooms", value: property.bedrooms, Icon: Home },
                    {
                      label: "Bathrooms",
                      value: property.bathrooms,
                      Icon: Bath,
                    },
                    {
                      label: "Area",
                      value: `${property.area} sqft`,
                      Icon: Maximize,
                    },
                    {
                      label: "Type",
                      value:
                        property.category.charAt(0).toUpperCase() +
                        property.category.slice(1),
                      Icon: Building2,
                    },
                  ] as unknown as {
                    label: string;
                    value: string | number;
                    Icon: React.ComponentType<{ className?: string }>;
                  }[]
                ).map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 rounded-field bg-base-200"
                  >
                    <item.Icon className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <p className="text-xs text-gray">{item.label}</p>
                      <p className="text-sm font-semibold text-navy">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {property.fullDescription && (
              <div className="card bg-white rounded-box border border-gray-light p-6">
                <h2 className="font-heading text-2xl text-navy mb-4">
                  Description
                </h2>
                <p className="text-gray leading-relaxed whitespace-pre-line">
                  {property.fullDescription}
                </p>
              </div>
            )}

            <div className="card bg-white rounded-box border border-gray-light p-6">
              <h2 className="font-heading text-2xl text-navy mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2 text-sm text-gray"
                  >
                    <Check className="w-4 h-4 text-gold shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-white rounded-box border border-gray-light p-6">
              <h2 className="font-heading text-2xl text-navy mb-4">Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.name}
                    className="border-b border-gray-light pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center text-navy font-semibold text-sm">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy">
                            {review.name}
                          </p>
                          <p className="text-xs text-gray">{review.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-gold fill-gold" : "text-gray-light"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card bg-white rounded-box border border-gray-light p-6 sticky top-24">
              <p className="text-sm text-gray">Price</p>
              <p className="text-3xl font-heading text-gold mt-1">
                {property.type === "rent"
                  ? `$${property.price.toLocaleString()}/mo`
                  : `$${property.price.toLocaleString()}`}
              </p>

              <div className="mt-6 space-y-3">
                <Link href="/contact" className="block">
                  <Button variant="primary" className="w-full">
                    <Mail className="w-4 h-4" />
                    Inquire Now
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  <Heart className="w-4 h-4" />
                  Save Property
                </Button>
              </div>

              <hr className="my-6 border-gray-light" />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {property.location}
                </div>
                <div className="flex items-center gap-2 text-gray">
                  <Calendar className="w-4 h-4 shrink-0" />
                  Listed {new Date(property.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-gray">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  Property ID: {property.id || property._id}
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="font-heading text-2xl md:text-3xl text-navy mb-8">
              Related Properties
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <PropertyCard
                  key={p.id || p._id}
                  id={p.id || p._id}
                  title={p.title}
                  description={p.description}
                  price={p.price}
                  location={p.location}
                  image={
                    p.images?.[0] ||
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
                  }
                  type={p.type}
                  bedrooms={p.bedrooms}
                  bathrooms={p.bathrooms}
                  area={p.area}
                  rating={p.rating}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
