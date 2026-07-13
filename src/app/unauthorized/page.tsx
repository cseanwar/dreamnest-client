import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-gold" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading text-navy">Sign In Required</h1>
        <p className="text-gray text-base md:text-lg mt-4">
          You need to be signed in to access this page. Please log in or create an account to continue.
        </p>
        <div className="flex justify-center gap-4 pt-8">
          <Link
            href="/login"
            className="btn bg-gold text-navy hover:bg-gold-light border-none px-8 rounded-field"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="btn bg-transparent text-navy border-2 border-navy hover:bg-navy hover:text-white px-8 rounded-field transition-all duration-300"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
