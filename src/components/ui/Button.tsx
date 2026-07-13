import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const variantClasses: Record<string, string> = {
  primary: "btn bg-navy text-white hover:bg-navy-light border-none",
  secondary: "btn bg-gold text-navy hover:bg-gold-light border-none",
  outline: "btn bg-transparent text-navy border-2 border-navy hover:bg-navy hover:text-white",
  ghost: "btn bg-transparent text-navy hover:bg-gray-light",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, className = "", children, disabled, ...props }, ref) => {
    const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";

    return (
      <button
        ref={ref}
        className={`${variantClasses[variant]} ${sizeClass} ${isLoading ? "loading" : ""} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
