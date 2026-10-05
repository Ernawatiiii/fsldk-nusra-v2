import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Program Kerja',
  description: 'Program kerja FSLDK Nusa Tenggara',
}

export const revalidate = 60

const statusLabel: Record<string, string> = {
  'akan-datang': 'Akan Datang',
  'berlangsung': 'Berlangsung',
  'selesai': 'Selesai',
}

export default async function ProgramPage() {
  const { data: programs } = await supabase
    .from('program')
    .select('*')
    .eq('published', true)
    .order('order_index')

  return (
    <main>
      {/* HEADER */}
      <section className="bg-nusra text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-nusra-gold/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-3">
            Kegiatan
          </p>
          <h1 className="font-black text-5xl md:text-7xl uppercase leading-[0.95] mb-4">
            Program Kerja
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Kegiatan yang menghidupkan forum
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {programs && programs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-nusra-muted text-lg">Belum ada program.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs?.map((p) => (
            <Link key={p.id} href={`/program/${p.slug}`} className="no-underline text-inherit group">
              <article className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-nusra-gold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                {p.cover_image ? (
                  <img src={p.cover_image} alt={p.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-nusra/5 flex items-center justify-center text-nusra/30 font-black uppercase text-xs tracking-widest">
                    Tanpa Gambar
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <span className="inline-block bg-nusra-lime text-nusra-dark px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 self-start">
                    {statusLabel[p.status] || p.status}
                  </span>
                  <h3 className="font-black text-lg leading-tight mb-3 group-hover:text-nusra transition">
                    {p.title}
                  </h3>
                  {p.description && <p className="text-sm text-nusra-muted line-clamp-3">{p.description}</p>}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}