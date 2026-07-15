"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown, User, LayoutDashboard, LogOut } from "lucide-react";

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-navy hover:bg-base-200 rounded-field transition-colors cursor-pointer"
      >
        <span className="hidden lg:inline">
          Hello, <span className="text-gold font-medium">{user.name}</span>
        </span>
        <span className="lg:hidden text-gold font-medium">{user.name}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-box shadow-lg border border-gray-light py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-light">
            <p className="text-sm font-medium text-navy truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray mt-0.5">{user.email}</p>
            <p className="text-xs text-gray mt-1.5">
              {" "}
              Logged in as -
              <span
                className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  user.role === "admin"
                    ? "bg-gold/20 text-gold"
                    : "bg-navy/10 text-navy"
                }`}
              >
                {" "}
                {user.role}
              </span>
            </p>
          </div>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-navy hover:bg-base-200 transition-colors"
          >
            <User className="w-4 h-4 text-gray" />
            My Profile
          </Link>

          {user.role === "admin" && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-navy hover:bg-base-200 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-gold" />
              Admin Dashboard
            </Link>
          )}

          <hr className="my-1 border-gray-light" />

          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-error hover:bg-error/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
