"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import UserDropdown from "./UserDropdown";

const navLinks = {
  public: [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  private: [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/items/add", label: "Add Property" },
    { href: "/items/manage", label: "My Listings" },
    { href: "/about", label: "About" },
  ],
};

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = user ? navLinks.private : navLinks.public;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-heading text-navy tracking-tight"
          >
            Dream<span className="text-gold">Nest</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = isActive(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-field ${
                    active
                      ? "text-gold bg-gold/5"
                      : "text-gray hover:text-navy hover:bg-base-200"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <UserDropdown />
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden btn btn-ghost btn-square"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-navy" />
            ) : (
              <Menu className="w-6 h-6 text-navy" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-light bg-white">
          <div className="px-4 py-4 space-y-2">
            {links.map((link) => {
              const active = isActive(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium rounded-field ${
                    active
                      ? "text-gold bg-gold/5"
                      : "text-gray hover:text-navy hover:bg-base-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <hr className="my-2 border-gray-light" />
            {user ? (
              <>
                <div className="px-4 py-3 border-b border-gray-light">
                  <p className="text-sm font-medium text-navy">{user.name}</p>
                  <p className="text-xs text-gray">{user.email}</p>
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
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-navy hover:bg-base-200 rounded-field"
                >
                  My Profile
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-gold hover:bg-base-200 rounded-field"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <hr className="my-2 border-gray-light" />
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-error bg-transparent border border-error/40 hover:bg-error hover:text-white rounded-field transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 px-4 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1"
                >
                  <Button variant="primary" size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
