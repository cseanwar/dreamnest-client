"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { SkeletonText } from "@/components/ui/Skeleton";
import { api } from "@/lib/api";

const categories = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "condo", label: "Condo" },
  { value: "office", label: "Office" },
  { value: "land", label: "Land" },
];

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    fullDescription: "",
    price: "",
    location: "",
    category: "house",
    type: "sale" as "sale" | "rent",
    bedrooms: "",
    bathrooms: "",
    area: "",
    images: "",
  });

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  useEffect(() => {
    if (!params.id) return;
    api.get<Record<string, unknown>>(`/api/properties/${params.id}`)
      .then((data) => {
        setForm({
          title: (data.title as string) || "",
          description: (data.description as string) || "",
          fullDescription: (data.fullDescription as string) || "",
          price: String((data.price as number) ?? ""),
          location: (data.location as string) || "",
          category: (data.category as string) || "house",
          type: (data.type as "sale" | "rent") || "sale",
          bedrooms: String((data.bedrooms as number) ?? ""),
          bathrooms: String((data.bathrooms as number) ?? ""),
          area: String((data.area as number) ?? ""),
          images: ((data.images as string[]) || []).join("\n"),
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params.id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.title || !form.price || !form.location) {
      setError("Title, price, and location are required");
      return;
    }

    if (Number(form.price) <= 0) {
      setError("Price must be a positive number");
      return;
    }

    setIsLoading(true);
    try {
      const images = form.images
        ? form.images.split("\n").map((u) => u.trim()).filter(Boolean)
        : [];

      await api.put(`/api/properties/${params.id}`, {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms) || 0,
        bathrooms: Number(form.bathrooms) || 0,
        area: Number(form.area) || 0,
        images,
      });

      router.push("/items/manage");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update property");
    } finally {
      setIsLoading(false);
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-base-200 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card bg-white rounded-box border border-gray-light p-6 md:p-8">
              <SkeletonText lines={10} />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (notFound) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-base-200">
          <div className="text-center">
            <h2 className="font-heading text-2xl text-navy mb-2">Property Not Found</h2>
            <p className="text-gray mb-6">This property does not exist or has been removed.</p>
            <Link href="/items/manage">
              <Button variant="primary">Back to My Listings</Button>
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-base-200 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-heading text-navy">Edit Property</h1>
            <p className="text-gray mt-2">Update the details of your property listing</p>
          </div>

          <div className="card bg-white rounded-box border border-gray-light p-6 md:p-8">
            {error && (
              <div className="alert alert-error mb-6 rounded-field text-sm">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Title *"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g. Modern Downtown Apartment"
              />

              <div>
                <label className="label pb-1">
                  <span className="label-text font-body text-sm text-navy">Short Description</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Brief overview of the property"
                  rows={3}
                  className="textarea w-full rounded-field border border-gray-light bg-white text-navy placeholder:text-gray focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="label pb-1">
                  <span className="label-text font-body text-sm text-navy">Full Description</span>
                </label>
                <textarea
                  value={form.fullDescription}
                  onChange={(e) => updateField("fullDescription", e.target.value)}
                  placeholder="Detailed description of the property"
                  rows={6}
                  className="textarea w-full rounded-field border border-gray-light bg-white text-navy placeholder:text-gray focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Price *"
                  type="number"
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  placeholder="e.g. 500000"
                />
                <Input
                  label="Location *"
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="e.g. Manhattan, NY"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="form-control w-full">
                  <label className="label pb-1">
                    <span className="label-text font-body text-sm text-navy">Category</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="select w-full rounded-field border border-gray-light bg-white text-navy focus:outline-none focus:border-gold"
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label pb-1">
                    <span className="label-text font-body text-sm text-navy">Type</span>
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => updateField("type", e.target.value)}
                    className="select w-full rounded-field border border-gray-light bg-white text-navy focus:outline-none focus:border-gold"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Input
                  label="Bedrooms"
                  type="number"
                  value={form.bedrooms}
                  onChange={(e) => updateField("bedrooms", e.target.value)}
                  placeholder="e.g. 3"
                />
                <Input
                  label="Bathrooms"
                  type="number"
                  value={form.bathrooms}
                  onChange={(e) => updateField("bathrooms", e.target.value)}
                  placeholder="e.g. 2"
                />
                <Input
                  label="Area (sqft)"
                  type="number"
                  value={form.area}
                  onChange={(e) => updateField("area", e.target.value)}
                  placeholder="e.g. 1800"
                />
              </div>

              <div className="form-control w-full">
                <label className="label pb-1">
                  <span className="label-text font-body text-sm text-navy">
                    Image URLs <span className="text-gray font-normal">(one per line)</span>
                  </span>
                </label>
                <textarea
                  value={form.images}
                  onChange={(e) => updateField("images", e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  rows={3}
                  className="textarea w-full rounded-field border border-gray-light bg-white text-navy placeholder:text-gray focus:outline-none focus:border-gold"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <Button type="submit" variant="primary" isLoading={isLoading}>
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/items/manage")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
