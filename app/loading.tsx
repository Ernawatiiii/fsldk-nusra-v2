export default function Loading() {
  return (
    <main>
      {/* Header skeleton */}
      <section className="bg-nusra py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="h-3 w-24 bg-white/20 rounded mb-3 animate-pulse" />
          <div className="h-12 w-96 max-w-full bg-white/20 rounded mb-4 animate-pulse" />
          <div className="h-6 w-80 max-w-full bg-white/10 rounded animate-pulse" />
        </div>
      </section>

      {/* Content skeleton */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Search bar skeleton */}
        <div className="h-14 w-full max-w-2xl bg-nusra/5 rounded-full mb-12 animate-pulse" />

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100"
            >
              <div className="w-full h-48 bg-nusra/5 animate-pulse" />
              <div className="p-6">
                <div className="h-3 w-24 bg-nusra/5 rounded mb-3 animate-pulse" />
                <div className="h-5 w-full bg-nusra/5 rounded mb-2 animate-pulse" />
                <div className="h-4 w-3/4 bg-nusra/5 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}