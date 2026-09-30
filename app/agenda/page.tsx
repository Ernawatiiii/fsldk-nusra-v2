import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 60

const PER_PAGE = 6

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q = '', page = '1' } = await searchParams
  const currentPage = parseInt(page) || 1
  const from = (currentPage - 1) * PER_PAGE
  const to = from + PER_PAGE - 1

  let query = supabase
    .from('events')
    .select('*', { count: 'exact' })
    .eq('published', true)

  if (q) {
    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%,location.ilike.%${q}%`)
  }

  const { data: events, count } = await query
    .order('start_date', { ascending: false })
    .range(from, to)

  const totalPages = Math.ceil((count || 0) / PER_PAGE)

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
            Agenda & Kegiatan
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Kegiatan FSLDK Nusa Tenggara
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <form className="mb-12 flex gap-3 max-w-2xl" method="get">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Cari agenda..."
            className="flex-1 px-6 py-4 border-2 border-nusra/10 rounded-full focus:border-nusra-gold focus:outline-none bg-white"
          />
          <button
            type="submit"
            className="bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all cursor-pointer"
          >
            Cari
          </button>
        </form>

        {q && (
          <p className="text-sm text-nusra-muted mb-8">
            Hasil pencarian untuk "<strong className="text-nusra">{q}</strong>" — {count || 0} agenda ditemukan
          </p>
        )}

        {events && events.length === 0 && (
          <div className="text-center py-20">
            <p className="text-nusra-muted text-lg">Tidak ada agenda ditemukan.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((e) => (
            <Link key={e.id} href={`/agenda/${e.slug}`} className="no-underline text-inherit group">
              <article className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-nusra-gold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                {e.cover_image ? (
                  <img src={e.cover_image} alt={e.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-nusra/5 flex items-center justify-center text-nusra/30 font-black uppercase text-xs tracking-widest">
                    Tanpa Gambar
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-nusra-gold font-black text-xs uppercase tracking-widest mb-3">
                    📅 {e.start_date ? new Date(e.start_date).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    }) : '-'}
                  </p>
                  <h3 className="font-black text-lg leading-tight mb-3 group-hover:text-nusra transition">
                    {e.title}
                  </h3>
                  {e.location && <p className="text-sm text-nusra-muted">📍 {e.location}</p>}
                  {e.description && <p className="text-sm text-nusra-muted line-clamp-2 mt-2">{e.description}</p>}
                </div>
              </article>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-16">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1
              const params = new URLSearchParams()
              if (q) params.set('q', q)
              params.set('page', String(pageNum))
              return (
                <Link
                  key={pageNum}
                  href={`/agenda?${params.toString()}`}
                  className={`w-12 h-12 rounded-full font-black flex items-center justify-center transition-all ${
                    currentPage === pageNum
                      ? 'bg-nusra text-white'
                      : 'bg-white border-2 border-nusra/10 text-nusra hover:border-nusra-gold'
                  }`}
                >
                  {pageNum}
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}