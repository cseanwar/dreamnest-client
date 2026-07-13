import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="form-control w-full">
        {label && (
          <label htmlFor={inputId} className="label pb-1">
            <span className="label-text font-body text-sm text-navy">{label}</span>
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`input w-full rounded-field border ${
            error ? "border-error" : "border-gray-light"
          } bg-white text-navy placeholder:text-gray focus:outline-none focus:border-gold ${className}`}
          {...props}
        />
        {error && (
          <span className="label pt-1">
            <span className="label-text-alt text-error">{error}</span>
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
