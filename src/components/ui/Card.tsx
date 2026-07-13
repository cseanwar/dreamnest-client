import Image from "next/image";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`card bg-white rounded-box border border-gray-light shadow-sm ${
        hover ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
    </figure>
  );
}

export function CardBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card-body p-5 ${className}`}>{children}</div>;
}

export function CardActions({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card-actions justify-end mt-4 ${className}`}>{children}</div>;
}
