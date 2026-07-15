"use client";

import { useState, useEffect } from "react";
import AdminRoute from "@/components/auth/AdminRoute";
import { SkeletonTableRows } from "@/components/ui/Skeleton";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Shield, ShieldOff, Trash2 } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api.get<{ users: AdminUser[] }>("/api/admin/users")
      .then((res) => { if (!cancelled) setUsers(res.users); })
      .catch(() => { if (!cancelled) setUsers([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/api/admin/users/${deleteTarget.id}`);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      alert("Failed to delete user");
    } finally {
      setDeleting(false);
    }
  }

  async function toggleRole(userId: string, currentRole: string) {
    const newRole = currentRole === "admin" ? "user" : "admin";
    setUpdating(userId);
    try {
      await api.patch<{ user: AdminUser }>(`/api/admin/users/${userId}/role`, { role: newRole });
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole as "user" | "admin" } : u)));
    } catch {
      alert("Failed to update user role");
    } finally {
      setUpdating(null);
    }
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-base-200">
        <div className="bg-navy py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-heading text-white">User Management</h1>
            <p className="text-white/70 mt-2">View and manage user roles</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card bg-white rounded-box border border-gray-light overflow-hidden">
            {loading ? (
              <div className="p-6">
                <SkeletonTableRows rows={5} />
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray">No users found</p>
              </div>
            ) : (
              <table className="table w-full">
                <thead>
                  <tr className="border-b border-gray-light bg-base-200">
                    <th className="text-left text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Name</th>
                    <th className="text-left text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Email</th>
                    <th className="text-left text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Role</th>
                    <th className="text-left text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Joined</th>
                    <th className="text-right text-xs font-semibold text-gray uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-gray-light hover:bg-base-200 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-navy">{u.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray">{u.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge text-xs border-none ${u.role === "admin" ? "bg-gold text-navy" : "bg-navy text-white"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray">{new Date(u.createdAt).toLocaleDateString()}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {u.email !== "anwar@dreamnest.com" && (
                          <button
                            onClick={() => toggleRole(u.id, u.role)}
                            disabled={updating === u.id}
                            className="btn btn-ghost btn-sm"
                            title={u.role === "admin" ? "Revoke admin" : "Make admin"}
                          >
                            {updating === u.id ? (
                              <span className="loading loading-spinner loading-xs" />
                            ) : u.role === "admin" ? (
                              <ShieldOff className="w-4 h-4 text-error" />
                            ) : (
                              <Shield className="w-4 h-4 text-gold" />
                            )}
                          </button>
                        )}
                        {u.email !== "anwar@dreamnest.com" && currentUser?.id !== u.id && (
                          <button
                            onClick={() => setDeleteTarget(u)}
                            className="btn btn-ghost btn-sm ml-1"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4 text-gray hover:text-error transition-colors" />
                          </button>
                        )}
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
        title="Delete User"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This will also remove all their property listings.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </AdminRoute>
  );
}
