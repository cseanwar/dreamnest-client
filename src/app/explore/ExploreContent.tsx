"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import PropertyCard, { PropertyCardSkeleton } from "@/components/properties/PropertyCard";
import Pagination from "@/components/properties/Pagination";
import { api } from "@/lib/api";

interface PropertyData {
  id: string;
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  category: string;
  type: "sale" | "rent";
  bedrooms: number;
  bathrooms: number;
  area: number;
  rating: number;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const categories = [
  { value: "", label: "All Categories" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "condo", label: "Condo" },
  { value: "office", label: "Office" },
  { value: "land", label: "Land" },
];

const typeOptions = [
  { value: "", label: "All Types" },
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);
      if (type) params.set("type", type);
      if (sort) params.set("sort", sort);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      params.set("page", String(page));
      params.set("limit", "12");

      const res = await api.get<{ properties: PropertyData[]; pagination: PaginationData }>(
        `/api/properties?${params.toString()}`
      );
      setProperties(res.properties);
      setPagination(res.pagination);
    } catch {
      setProperties([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, type, sort, minPrice, maxPrice, page]);

  function handleFilterChange() {
    setPage(1);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleFilterChange();
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-navy py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-heading text-white text-center">Explore Properties</h1>
          <p className="text-white/70 text-center mt-2 max-w-xl mx-auto">
            Discover your perfect property from our curated collection
          </p>

          <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl mx-auto">
            <div className="join w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by location, property name..."
                className="input join-item flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-l-field focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="btn join-item bg-gold text-navy hover:bg-gold-light border-none px-6 rounded-r-field"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap lg:flex-nowrap gap-3 items-center mb-8">
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); handleFilterChange(); }}
            className="select select-bordered bg-white border-gray-light text-navy text-sm rounded-field focus:outline-none focus:border-gold min-w-0"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) => { setType(e.target.value); handleFilterChange(); }}
            className="select select-bordered bg-white border-gray-light text-navy text-sm rounded-field focus:outline-none focus:border-gold min-w-0"
          >
            {typeOptions.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>

          <div className="flex items-center gap-1">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min $"
              className="input input-bordered bg-white border-gray-light text-navy text-sm w-24 lg:w-20 rounded-field focus:outline-none focus:border-gold"
            />
            <span className="text-gray text-sm">-</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max $"
              className="input input-bordered bg-white border-gray-light text-navy text-sm w-24 lg:w-20 rounded-field focus:outline-none focus:border-gold"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); handleFilterChange(); }}
            className="select select-bordered bg-white border-gray-light text-navy text-sm rounded-field focus:outline-none focus:border-gold min-w-0"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          {(search || category || type || minPrice || maxPrice) && (
            <button
              onClick={() => {
                setSearch("");
                setCategory("");
                setType("");
                setSort("newest");
                setMinPrice("");
                setMaxPrice("");
                setPage(1);
                router.replace("/explore");
              }}
              className="btn btn-ghost text-sm text-gray hover:text-navy"
            >
              Clear Filters
            </button>
          )}
        </div>

        {!loading && pagination && (
          <p className="text-sm text-gray mb-6">
            <span className="font-medium text-navy">{pagination.total}</span>{" "}
            {pagination.total === 1 ? "property" : "properties"} found
            {(search || category || type || minPrice || maxPrice) && " — showing " + properties.length}
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-light mx-auto mb-4" />
            <h3 className="font-heading text-xl text-navy mb-2">No properties found</h3>
            <p className="text-gray">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.map((p) => (
                <PropertyCard
                  key={p.id || p._id}
                  id={p.id || p._id}
                  title={p.title}
                  description={p.description}
                  price={p.price}
                  location={p.location}
                  image={p.images?.[0] || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"}
                  type={p.type}
                  bedrooms={p.bedrooms}
                  bathrooms={p.bathrooms}
                  area={p.area}
                  rating={p.rating}
                />
              ))}
            </div>

            {pagination && (
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
