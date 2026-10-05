import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Struktur Kepengurusan',
  description: 'Struktur kepengurusan FSLDK Nusa Tenggara',
}

export const revalidate = 60

export default async function PengurusPage() {
  const { data: items } = await supabase
    .from('pengurus')
    .select('*')
    .eq('active', true)
    .order('order_index')

  const bph = items?.filter((p) => p.division === 'BPH') || []
  const lainnya = items?.filter((p) => p.division !== 'BPH') || []

  return (
    <main>
      {/* HEADER */}
      <section className="bg-nusra text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-nusra-gold/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-3">
            Struktur
          </p>
          <h1 className="font-black text-5xl md:text-7xl uppercase leading-[0.95] mb-4">
            Kepengurusan
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Badan Pengurus Harian & Divisi
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {items && items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-nusra-muted text-lg">Belum ada data pengurus.</p>
          </div>
        )}

        {bph.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-black text-3xl md:text-4xl uppercase">Badan Pengurus Harian</h2>
              <div className="flex-1 h-0.5 bg-nusra-gold" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {bph.map((p) => (
                <div key={p.id} className="text-center group">
                  <div className="relative inline-block mb-4">
                    {p.photo_url ? (
                      <img
                        src={p.photo_url}
                        alt={p.name}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto border-4 border-nusra-gold group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-nusra/10 mx-auto flex items-center justify-center text-nusra/30 font-black text-xs border-4 border-nusra-gold">
                        NO PHOTO
                      </div>
                    )}
                  </div>
                  <h3 className="font-black text-base md:text-lg leading-tight mb-1">{p.name}</h3>
                  <p className="text-nusra-gold font-bold text-sm uppercase tracking-wider">{p.position}</p>
                  {p.period && <p className="text-xs text-nusra-muted mt-1">{p.period}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {lainnya.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-black text-3xl md:text-4xl uppercase">Divisi & Komisi</h2>
              <div className="flex-1 h-0.5 bg-nusra-gold" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {lainnya.map((p) => (
                <div key={p.id} className="text-center group">
                  <div className="relative inline-block mb-4">
                    {p.photo_url ? (
                      <img
                        src={p.photo_url}
                        alt={p.name}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto border-4 border-nusra/10 group-hover:border-nusra-gold group-hover:scale-105 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-nusra/10 mx-auto flex items-center justify-center text-nusra/30 font-black text-xs border-4 border-nusra/10">
                        NO PHOTO
                      </div>
                    )}
                  </div>
                  <h3 className="font-black text-base md:text-lg leading-tight mb-1">{p.name}</h3>
                  <p className="text-nusra font-bold text-sm uppercase tracking-wider">{p.position}</p>
                  {p.division && (
                    <p className="text-xs text-nusra-muted mt-1 uppercase tracking-wider">{p.division}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}