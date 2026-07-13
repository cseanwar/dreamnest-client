import Link from "next/link";
import { Ban } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-6">
          <Ban className="w-10 h-10 text-error" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading text-navy">Access Denied</h1>
        <p className="text-gray text-base md:text-lg mt-4">
          You don&apos;t have permission to access this page. If you believe this is a mistake, please contact support.
        </p>
        <div className="flex justify-center gap-4 pt-8">
          <Link
            href="/"
            className="btn bg-navy text-white hover:bg-navy-light border-none px-8 rounded-field"
          >
            Back Home
          </Link>
          <Link
            href="/contact"
            className="btn bg-transparent text-navy border-2 border-navy hover:bg-navy hover:text-white px-8 rounded-field transition-all duration-300"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
