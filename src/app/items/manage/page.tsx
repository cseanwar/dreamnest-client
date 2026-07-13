"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Button from "@/components/ui/Button";
import { Plus, Building2 } from "lucide-react";
import { SkeletonTableRows } from "@/components/ui/Skeleton";
import { ConfirmModal } from "@/components/ui";
import { api } from "@/lib/api";

interface UserProperty {
  id: string;
  _id: string;
  title: string;
  price: number;
  location: string;
  type: "sale" | "rent";
  category: string;
  createdAt: string;
  images: string[];
}

export default function ManagePropertiesPage() {
  const [properties, setProperties] = useState<UserProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.get<{ properties: UserProperty[] }>("/api/properties?limit=50")
      .then((res) => { if (!cancelled) setProperties(res.properties); })
      .catch(() => { if (!cancelled) setProperties([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  function handleDeleteClick(id: string) {
    setConfirmId(id);
  }

  async function handleDeleteConfirm() {
    if (!confirmId) return;
    setDeleting(confirmId);
    try {
      await api.delete(`/api/properties/${confirmId}`);
      setProperties((prev) => prev.filter((p) => (p.id || p._id) !== confirmId));
      setConfirmId(null);
    } catch {
      alert("Failed to delete property");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-base-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading text-navy">My Listings</h1>
              <p className="text-gray mt-1">Manage your property listings</p>
            </div>
            <Link href="/items/add">
              <Button variant="primary">
                <Plus className="w-4 h-4" />
                Add Property
              </Button>
            </Link>
          </div>

          {loading ? (
            <SkeletonTableRows rows={5} />
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <Building2 className="w-16 h-16 text-gray-light mx-auto mb-4" />
              <h3 className="font-heading text-xl text-navy mb-2">No listings yet</h3>
              <p className="text-gray mb-6">Start by adding your first property</p>
              <Link href="/items/add">
                <Button variant="primary">Add Property</Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:block">
              <div className="card bg-white rounded-box border border-gray-light overflow-hidden">
                <table className="table w-full">
                  <thead>
                    <tr className="border-b border-gray-light bg-base-200">
                      <th className="text-left text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Property</th>
                      <th className="text-left text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Price</th>
                      <th className="text-left text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Type</th>
                      <th className="text-left text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Date</th>
                      <th className="text-right text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((p) => {
                      const pid = p.id || p._id;
                      return (
                        <tr key={pid} className="border-b border-gray-light hover:bg-base-200 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Image
                                src={p.images?.[0] || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&q=80"}
                                alt={p.title}
                                width={56}
                                height={56}
                                className="rounded-field object-cover shrink-0"
                              />
                              <div>
                                <p className="font-medium text-navy text-sm">{p.title}</p>
                                <p className="text-xs text-gray">{p.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-navy">
                              {p.type === "rent" ? `$${p.price.toLocaleString()}/mo` : `$${p.price.toLocaleString()}`}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`badge text-xs border-none ${p.type === "sale" ? "bg-gold text-navy" : "bg-navy text-white"}`}>
                              {p.type === "sale" ? "For Sale" : "For Rent"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray">{new Date(p.createdAt).toLocaleDateString()}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <Link href={`/properties/${pid}`}>
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </Link>
                              <Link href={`/items/edit/${pid}`}>
                                <Button variant="ghost" size="sm" className="text-gold hover:text-gold">
                                  Edit
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteClick(pid)}
                                className="text-error hover:text-error"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!loading && properties.length > 0 && (
            <div className="md:hidden space-y-4">
              {properties.map((p) => {
                const pid = p.id || p._id;
                return (
                  <div key={pid} className="card bg-white rounded-box border border-gray-light p-4">
                    <div className="flex gap-3">
                      <Image
                        src={p.images?.[0] || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&q=80"}
                        alt={p.title}
                        width={80}
                        height={80}
                        className="rounded-field object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-navy text-sm truncate">{p.title}</h3>
                        <p className="text-xs text-gray truncate">{p.location}</p>
                        <p className="text-sm font-heading text-gold mt-1">
                          {p.type === "rent" ? `$${p.price.toLocaleString()}/mo` : `$${p.price.toLocaleString()}`}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Link href={`/properties/${pid}`}>
                            <Button variant="ghost" size="sm">View</Button>
                          </Link>
                          <Link href={`/items/edit/${pid}`}>
                            <Button variant="ghost" size="sm" className="text-gold">Edit</Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(pid)}
                            className="text-error"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        open={confirmId !== null}
        title="Delete Property"
        message="Are you sure you want to delete this property? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmId(null)}
        isLoading={deleting !== null}
      />
    </ProtectedRoute>
  );
}
