import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import FadeIn from '@/app/components/FadeIn'
import { HiOutlineLocationMarker } from 'react-icons/hi'

export const metadata: Metadata = {
  title: 'Direktori LDK',
  description: 'Direktori Lembaga Dakwah Kampus se-Nusa Tenggara',
}

export const revalidate = 60

const PER_PAGE = 12

export default async function LdkPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q = '', page = '1' } = await searchParams
  const currentPage = parseInt(page) || 1
  const from = (currentPage - 1) * PER_PAGE
  const to = from + PER_PAGE - 1

  let query = supabase
    .from('ldk')
    .select('*', { count: 'exact' })
    .eq('active', true)

  if (q) {
    query = query.or(`name.ilike.%${q}%,campus.ilike.%${q}%,city.ilike.%${q}%`)
  }

  const { data: ldks, count } = await query
    .order('name')
    .range(from, to)

  const totalPages = Math.ceil((count || 0) / PER_PAGE)

  return (
    <main>
      <section className="bg-nusra text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-nusra-gold/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-3">
            Jaringan
          </p>
          <h1 className="font-black text-5xl md:text-7xl uppercase leading-[0.95] mb-4">
            Direktori LDK
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Lembaga Dakwah Kampus se-Nusa Tenggara
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <form className="mb-12 flex gap-3 max-w-2xl" method="get">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Cari LDK, kampus, atau kota..."
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
            Hasil pencarian untuk "<strong className="text-nusra">{q}</strong>" — {count || 0} LDK ditemukan
          </p>
        )}

        {ldks && ldks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-nusra-muted text-lg">Tidak ada LDK ditemukan.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ldks?.map((l, i) => (
            <FadeIn key={l.id} delay={i * 50}>
              <Link href={`/ldk/${l.slug}`} className="no-underline text-inherit group block">
                <article className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-nusra-gold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex gap-5">
                  {l.logo_url ? (
                    <img
                      src={l.logo_url}
                      alt={l.name}
                      className="w-20 h-20 object-contain flex-shrink-0 rounded-xl"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-nusra/5 rounded-xl flex items-center justify-center text-nusra/30 font-black text-xs flex-shrink-0">
                      LOGO
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-base leading-tight mb-2 group-hover:text-nusra transition">
                      {l.name}
                    </h3>
                    {l.campus && <p className="text-sm text-nusra-muted truncate">{l.campus}</p>}
                    {l.city && (
                      <p className="text-xs text-nusra-muted uppercase tracking-wider mt-2 flex items-center gap-1">
                        <HiOutlineLocationMarker className="w-3 h-3" />
                        {l.city}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            </FadeIn>
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
                  href={`/ldk?${params.toString()}`}
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