import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "gold" | "navy" | "outline";
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: "badge bg-gray-light text-gray border-none",
  gold: "badge bg-gold text-white border-none",
  navy: "badge bg-navy text-white border-none",
  outline: "badge bg-transparent text-navy border border-navy",
};

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return <span className={`${variantClasses[variant]} font-body text-xs px-3 py-1 ${className}`}>{children}</span>;
}
