export function SkeletonCard() {
  return (
    <div className="card bg-white rounded-box border border-gray-light overflow-hidden animate-pulse">
      <div className="h-52 bg-gray-light" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-light rounded w-3/4" />
        <div className="h-3 bg-gray-light rounded w-full" />
        <div className="h-3 bg-gray-light rounded w-1/2" />
        <div className="flex gap-4 pt-2">
          <div className="h-3 bg-gray-light rounded w-12" />
          <div className="h-3 bg-gray-light rounded w-12" />
          <div className="h-3 bg-gray-light rounded w-12" />
        </div>
        <div className="h-5 bg-gray-light rounded w-1/3" />
      </div>
    </div>
  );
}

export function SkeletonTableRows({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="card bg-white rounded-box border border-gray-light p-5 animate-pulse">
          <div className="flex gap-4">
            <div className="w-14 h-14 bg-gray-light rounded-field shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-light rounded w-1/3" />
              <div className="h-3 bg-gray-light rounded w-1/4" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-8 bg-gray-light rounded-field" />
              <div className="w-16 h-8 bg-gray-light rounded-field" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-96 bg-gray-light rounded-box" />
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-20 h-16 bg-gray-light rounded-field" />
        ))}
      </div>
      <div className="h-8 bg-gray-light rounded w-1/3" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-light rounded-field" />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-light rounded w-full" />
        <div className="h-4 bg-gray-light rounded w-5/6" />
        <div className="h-4 bg-gray-light rounded w-4/6" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-light rounded"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
}
