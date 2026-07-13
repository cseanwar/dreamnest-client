import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  bg?: "white" | "navy" | "light";
}

const bgClasses: Record<string, string> = {
  white: "bg-white",
  navy: "bg-navy text-white",
  light: "bg-base-200",
};

export default function SectionWrapper({ children, className = "", id, bg = "white" }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${bgClasses[bg]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  light = false,
  className = "",
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`text-center mb-12 md:mb-16 ${className}`}>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-heading ${light ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl mx-auto text-lg ${light ? "text-gray/80" : "text-gray"}`}>{subtitle}</p>
      )}
      <div className="mt-4 mx-auto w-16 h-1 bg-gold" />
    </div>
  );
}
