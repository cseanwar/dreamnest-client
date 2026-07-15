"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Button from "@/components/ui/Button";
import { api } from "@/lib/api";
import { User, Mail, Shield, CheckCircle, AlertCircle } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleProfileUpdate(e: React.FormEvent) {
    e.preventDefault();
    setProfileSuccess("");
    setProfileError("");
    setProfileSaving(true);
    try {
      const body: Record<string, string> = {};
      if (name !== user?.name) body.name = name;
      if (email !== user?.email) body.email = email;

      const res = await api.put<{ token: string; user: { id: string; name: string; email: string; role: string } }>(
        "/api/auth/profile", body
      );
      localStorage.setItem("token", res.token);
      window.location.reload();
    } catch (err: unknown) {
      const e = err as { message?: string };
      setProfileError(e.message || "Failed to update profile");
    } finally {
      setProfileSaving(false);
    }
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    setPasswordSuccess("");
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordSaving(true);
    try {
      await api.put("/api/auth/password", { currentPassword, newPassword });
      setPasswordSuccess("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const e = err as { message?: string };
      setPasswordError(e.message || "Failed to update password");
    } finally {
      setPasswordSaving(false);
    }
  }

  const hasProfileChanges = name !== user?.name || email !== user?.email;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-base-200">
        <div className="bg-navy py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-heading text-white">My Profile</h1>
            <p className="text-white/70 mt-2">Manage your account information</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="card bg-white rounded-box border border-gray-light p-6 md:p-8">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-light">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                <User className="w-8 h-8 text-gold" />
              </div>
              <div>
                <h2 className="font-heading text-xl text-navy">{user?.name}</h2>
                <span className={`inline-block mt-1 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  user?.role === "admin" ? "bg-gold/20 text-gold" : "bg-navy/10 text-navy"
                }`}>
                  {user?.role}
                </span>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-5">
              {profileSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-field bg-success/10 text-success text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  {profileSuccess}
                </div>
              )}
              {profileError && (
                <div className="flex items-center gap-2 p-3 rounded-field bg-error/10 text-error text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {profileError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input w-full bg-white border border-gray-light text-navy text-sm rounded-field focus:outline-none focus:border-gold px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full bg-white border border-gray-light text-navy text-sm rounded-field focus:outline-none focus:border-gold px-4 py-2.5"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Mail className="w-5 h-5 text-gray shrink-0" />
                <div className="text-xs text-gray uppercase tracking-wider">
                  {user?.createdAt ? `Member since ${new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}` : "Member"}
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={!hasProfileChanges || profileSaving}
                isLoading={profileSaving}
              >
                Save Changes
              </Button>
            </form>
          </div>

          <div className="card bg-white rounded-box border border-gray-light p-6 md:p-8">
            <h2 className="font-heading text-lg text-navy mb-6">Change Password</h2>

            <form onSubmit={handlePasswordUpdate} className="space-y-5">
              {passwordSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-field bg-success/10 text-success text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  {passwordSuccess}
                </div>
              )}
              {passwordError && (
                <div className="flex items-center gap-2 p-3 rounded-field bg-error/10 text-error text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {passwordError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input w-full bg-white border border-gray-light text-navy text-sm rounded-field focus:outline-none focus:border-gold px-4 py-2.5"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input w-full bg-white border border-gray-light text-navy text-sm rounded-field focus:outline-none focus:border-gold px-4 py-2.5"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input w-full bg-white border border-gray-light text-navy text-sm rounded-field focus:outline-none focus:border-gold px-4 py-2.5"
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={!currentPassword || !newPassword || !confirmPassword || passwordSaving}
                isLoading={passwordSaving}
              >
                Update Password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
