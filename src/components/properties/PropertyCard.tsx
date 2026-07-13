"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Home, Bath } from "lucide-react";
import Badge from "@/components/ui/Badge";

interface PropertyCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  type: "sale" | "rent";
  bedrooms: number;
  bathrooms: number;
  area: number;
  rating?: number;
}

export default function PropertyCard({ id, title, description, price, location, image, type, bedrooms, bathrooms, area }: PropertyCardProps) {
  return (
    <Link href={`/properties/${id}`}>
      <div className="card bg-white rounded-box border border-gray-light overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group h-full">
        <figure className="relative h-52 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={type === "sale" ? "gold" : "navy"}>
              {type === "sale" ? "For Sale" : "For Rent"}
            </Badge>
          </div>
        </figure>
        <div className="p-5 flex flex-col gap-2">
          <h3 className="font-heading text-lg text-navy line-clamp-1">{title}</h3>
          <p className="text-sm text-gray line-clamp-2">{description}</p>
          <p className="text-xs text-gray flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {location}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray mt-1">
            <span className="flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              {bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {bathrooms}
            </span>
            <span>{area} sqft</span>
          </div>
          <p className="text-xl font-heading text-gold mt-1">
            {type === "rent" ? `$${price.toLocaleString()}/mo` : `$${price.toLocaleString()}`}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="card bg-white rounded-box border border-gray-light overflow-hidden animate-pulse">
      <div className="h-52 bg-gray-light" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-light rounded w-3/4" />
        <div className="h-3 bg-gray-light rounded w-full" />
        <div className="h-3 bg-gray-light rounded w-1/2" />
        <div className="flex gap-4 pt-2">
          <div className="h-3 bg-gray-light rounded w-12" />
          <div className="h-3 bg-gray-light rounded w-12" />
          <div className="h-3 bg-gray-light rounded w-12" />
        </div>
        <div className="h-5 bg-gray-light rounded w-1/3" />
      </div>
    </div>
  );
}
