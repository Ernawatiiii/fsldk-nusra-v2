import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Berita & Artikel',
  description: 'Kabar terbaru dari FSLDK Nusa Tenggara',
}

export const revalidate = 60

const PER_PAGE = 6

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q = '', page = '1' } = await searchParams
  const currentPage = parseInt(page) || 1
  const from = (currentPage - 1) * PER_PAGE
  const to = from + PER_PAGE - 1

  let query = supabase
    .from('articles')
    .select('*', { count: 'exact' })
    .eq('published', true)

  if (q) {
    query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%,content.ilike.%${q}%`)
  }

  const { data: articles, count } = await query
    .order('created_at', { ascending: false })
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
            Informasi
          </p>
          <h1 className="font-black text-5xl md:text-7xl uppercase leading-[0.95] mb-4">
            Berita & Artikel
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Kabar terbaru dari FSLDK Nusa Tenggara
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* SEARCH */}
        <form className="mb-12 flex gap-3 max-w-2xl" method="get">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Cari artikel..."
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
            Hasil pencarian untuk "<strong className="text-nusra">{q}</strong>" — {count || 0} artikel ditemukan
          </p>
        )}

        {articles && articles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-nusra-muted text-lg">Tidak ada artikel ditemukan.</p>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.map((a) => (
            <Link key={a.id} href={`/berita/${a.slug}`} className="no-underline text-inherit group">
              <article className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-nusra-gold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                {a.cover_image ? (
                  <img src={a.cover_image} alt={a.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-nusra/5 flex items-center justify-center text-nusra/30 font-black uppercase text-xs tracking-widest">
                    Tanpa Gambar
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs text-nusra-muted uppercase tracking-wider mb-2">
                    {new Date(a.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                  </p>
                  <h3 className="font-black text-lg leading-tight mb-3 group-hover:text-nusra transition">
                    {a.title}
                  </h3>
                  {a.excerpt && <p className="text-sm text-nusra-muted line-clamp-3">{a.excerpt}</p>}
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* PAGINATION */}
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
                  href={`/berita?${params.toString()}`}
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