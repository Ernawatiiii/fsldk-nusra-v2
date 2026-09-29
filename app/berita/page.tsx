import { supabase } from '@/lib/supabase'
import Link from 'next/link'

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
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Berita & Artikel</h1>
      <p className="text-gray-600 mb-8">Kabar terbaru dari FSLDK Nusa Tenggara</p>

      <form className="mb-8 flex gap-2" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Cari artikel..."
          className="flex-1 p-3 border rounded"
        />
        <button type="submit" className="px-6 py-3 bg-emerald-600 text-white rounded cursor-pointer">
          Cari
        </button>
      </form>

      {q && (
        <p className="text-sm text-gray-500 mb-6">
          Hasil pencarian untuk "<strong>{q}</strong>" — {count || 0} artikel ditemukan
        </p>
      )}

      {articles && articles.length === 0 && (
        <p className="text-gray-500">Tidak ada artikel ditemukan.</p>
      )}

      <div className="flex flex-col gap-8">
        {articles?.map((a) => (
          <article key={a.id} className="border-b pb-6">
            <Link href={`/berita/${a.slug}`} className="no-underline text-inherit flex gap-6">
              {a.cover_image && (
                <img
                  src={a.cover_image}
                  alt={a.title}
                  className="w-40 h-28 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold mb-2 hover:text-emerald-700">{a.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(a.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </p>
                {a.excerpt && <p className="text-gray-700">{a.excerpt}</p>}
              </div>
            </Link>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1
            const params = new URLSearchParams()
            if (q) params.set('q', q)
            params.set('page', String(pageNum))
            return (
              <Link
                key={pageNum}
                href={`/berita?${params.toString()}`}
                className={`px-4 py-2 border rounded ${currentPage === pageNum ? 'bg-emerald-600 text-white' : 'hover:bg-gray-50'}`}
              >
                {pageNum}
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}