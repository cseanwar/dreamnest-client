"use client";

import { Suspense } from "react";
import { SkeletonCard } from "@/components/ui/Skeleton";
import ExploreContent from "./ExploreContent";

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-base-200">
        <div className="bg-navy py-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
