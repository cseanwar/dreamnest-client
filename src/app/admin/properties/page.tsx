"use client";

import { useState, useEffect } from "react";
import AdminRoute from "@/components/auth/AdminRoute";
import { SkeletonTableRows } from "@/components/ui/Skeleton";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { api } from "@/lib/api";
import { Home, Trash2 } from "lucide-react";

interface AdminProperty {
  id: string;
  title: string;
  price: number;
  location: string;
  category: string;
  type: string;
  userId: string;
  createdAt: string;
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<AdminProperty | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api.get<{ properties: AdminProperty[] }>("/api/admin/properties")
      .then((res) => { if (!cancelled) setProperties(res.properties); })
      .catch(() => { if (!cancelled) setProperties([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/api/admin/properties/${deleteTarget.id}`);
      setProperties((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      alert("Failed to delete property");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-base-200">
        <div className="bg-navy py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-heading text-white">Property Management</h1>
            <p className="text-white/70 mt-2">View and manage all property listings</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card bg-white rounded-box border border-gray-light overflow-hidden">
            {loading ? (
              <div className="p-6">
                <SkeletonTableRows rows={5} />
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray">No properties found</p>
              </div>
            ) : (
              <table className="table w-full">
                <thead>
                  <tr className="border-b border-gray-light bg-base-200">
                    <th className="text-left text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Title</th>
                    <th className="text-left text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Price</th>
                    <th className="text-left text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Location</th>
                    <th className="text-left text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Category</th>
                    <th className="text-left text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Type</th>
                    <th className="text-right text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p) => (
                    <tr key={p.id} className="border-b border-gray-light hover:bg-base-200 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-navy max-w-[200px] truncate">{p.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(p.price)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray max-w-[160px] truncate">{p.location}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="badge badge-ghost badge-sm text-xs capitalize">{p.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge badge-sm text-xs border-none ${p.type === "sale" ? "bg-gold/20 text-gold" : "bg-navy/10 text-navy"}`}>
                          {p.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="btn btn-ghost btn-sm"
                          title="Delete property"
                        >
                          <Trash2 className="w-4 h-4 text-gray hover:text-error transition-colors" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        open={deleteTarget !== null}
        title="Delete Property"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </AdminRoute>
  );
}
