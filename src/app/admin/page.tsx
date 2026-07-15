"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminRoute from "@/components/auth/AdminRoute";
import { api } from "@/lib/api";
import { Users, Building2, LayoutDashboard, Home, ArrowUpRight } from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  categories: { _id: string; count: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api.get<{ stats: AdminStats }>("/api/admin/stats")
      .then((res) => { if (!cancelled) setStats(res.stats); })
      .catch(() => { if (!cancelled) setStats(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <AdminRoute>
      <div className="min-h-screen bg-base-200">
        <div className="bg-navy py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-heading text-white">Admin Dashboard</h1>
            <p className="text-white/70 mt-2">Manage users, properties, and system settings</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card bg-white rounded-box p-6 animate-pulse">
                  <div className="h-4 bg-gray-light rounded w-1/2 mb-4" />
                  <div className="h-8 bg-gray-light rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : stats ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="card bg-white rounded-box p-6 border border-gray-light">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray font-medium uppercase tracking-wider">Total Users</p>
                    <Users className="w-5 h-5 text-gold" />
                  </div>
                  <p className="text-4xl font-heading text-navy">{stats.totalUsers}</p>
                </div>

                <div className="card bg-white rounded-box p-6 border border-gray-light">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray font-medium uppercase tracking-wider">Properties</p>
                    <Building2 className="w-5 h-5 text-gold" />
                  </div>
                  <p className="text-4xl font-heading text-navy">{stats.totalProperties}</p>
                </div>

                <div className="card bg-white rounded-box p-6 border border-gray-light">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray font-medium uppercase tracking-wider">Categories</p>
                    <LayoutDashboard className="w-5 h-5 text-gold" />
                  </div>
                  <p className="text-4xl font-heading text-navy">{stats.categories.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card bg-white rounded-box border border-gray-light">
                  <div className="px-6 py-4 border-b border-gray-light flex items-center justify-between">
                    <h2 className="font-heading text-lg text-navy">Properties by Category</h2>
                  </div>
                  <div className="p-6">
                    {stats.categories.length === 0 ? (
                      <p className="text-sm text-gray">No properties yet</p>
                    ) : (
                      <div className="space-y-3">
                        {stats.categories.map((cat) => (
                          <div key={cat._id} className="flex items-center justify-between">
                            <span className="text-sm text-navy capitalize">{cat._id}</span>
                            <span className="text-sm font-medium text-gold">{cat.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="card bg-white rounded-box border border-gray-light">
                  <div className="px-6 py-4 border-b border-gray-light">
                    <h2 className="font-heading text-lg text-navy">Quick Actions</h2>
                  </div>
                  <div className="p-6 space-y-3">
                    <Link
                      href="/admin/users"
                      className="flex items-center justify-between p-3 rounded-field bg-base-200 hover:bg-gray-light transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-gold" />
                        <span className="text-sm font-medium text-navy">Manage Users</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-gray" />
                    </Link>
                    <Link
                      href="/admin/properties"
                      className="flex items-center justify-between p-3 rounded-field bg-base-200 hover:bg-gray-light transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Home className="w-5 h-5 text-gold" />
                        <span className="text-sm font-medium text-navy">Manage Properties</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-gray" />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray">Failed to load dashboard data</p>
            </div>
          )}
        </div>
      </div>
    </AdminRoute>
  );
}
