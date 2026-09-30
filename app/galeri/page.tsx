import { supabase } from '@/lib/supabase'

export const revalidate = 60

export default async function GaleriPage() {
  const { data: items } = await supabase
    .from('galeri')
    .select('*')
    .eq('published', true)
    .order('order_index')

  const grouped: Record<string, any[]> = {}
  items?.forEach((g) => {
    const key = g.category || 'Umum'
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(g)
  })

  return (
    <main>
      {/* HEADER */}
      <section className="bg-nusra text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-nusra-gold/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-3">
            Dokumentasi
          </p>
          <h1 className="font-black text-5xl md:text-7xl uppercase leading-[0.95] mb-4">
            Galeri
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Momen dari lapangan — dokumentasi kegiatan FSLDK Nusa Tenggara
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {items && items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-nusra-muted text-lg">Belum ada foto.</p>
          </div>
        )}

        {Object.keys(grouped).map((cat) => (
          <div key={cat} className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-black text-3xl md:text-4xl uppercase">{cat}</h2>
              <div className="flex-1 h-0.5 bg-nusra-gold" />
              <span className="text-xs text-nusra-muted uppercase tracking-widest font-bold">
                {grouped[cat].length} Foto
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {grouped[cat].map((g) => (
                <div
                  key={g.id}
                  className="group relative rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-nusra-gold hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={g.image_url}
                    alt={g.title}
                    className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nusra-dark/90 via-nusra-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="font-black text-white text-sm leading-tight">{g.title}</h3>
                    {g.description && (
                      <p className="text-white/70 text-xs mt-1 line-clamp-2">{g.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}