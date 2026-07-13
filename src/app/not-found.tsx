import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4">
      <div className="text-center max-w-md">
        <div className="relative">
          <p className="text-[10rem] md:text-[12rem] font-heading text-navy/5 leading-none select-none">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-heading text-navy">Lost Your Way?</h1>
              <p className="text-gray text-base md:text-lg">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Link
                  href="/"
                  className="btn bg-navy text-white hover:bg-navy-light border-none px-8 rounded-field"
                >
                  Back Home
                </Link>
                <Link
                  href="/explore"
                  className="btn bg-transparent text-navy border-2 border-navy hover:bg-navy hover:text-white px-8 rounded-field transition-all duration-300"
                >
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
