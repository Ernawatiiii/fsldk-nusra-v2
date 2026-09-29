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
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Agenda & Kegiatan</h1>
      <p className="text-gray-600 mb-8">Kegiatan FSLDK Nusa Tenggara</p>

      <form className="mb-8 flex gap-2" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Cari agenda..."
          className="flex-1 p-3 border rounded"
        />
        <button type="submit" className="px-6 py-3 bg-emerald-600 text-white rounded cursor-pointer">
          Cari
        </button>
      </form>

      {q && (
        <p className="text-sm text-gray-500 mb-6">
          Hasil pencarian untuk "<strong>{q}</strong>" — {count || 0} agenda ditemukan
        </p>
      )}

      {events && events.length === 0 && (
        <p className="text-gray-500">Tidak ada agenda ditemukan.</p>
      )}

      <div className="flex flex-col gap-8">
        {events?.map((e) => (
          <article key={e.id} className="border-b pb-6">
            <Link href={`/agenda/${e.slug}`} className="no-underline text-inherit flex gap-6">
              {e.cover_image && (
                <img
                  src={e.cover_image}
                  alt={e.title}
                  className="w-40 h-28 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold mb-2 hover:text-emerald-700">{e.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  📅 {e.start_date ? new Date(e.start_date).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  }) : '-'}
                  {e.location && ` • 📍 ${e.location}`}
                </p>
                {e.description && <p className="text-gray-700">{e.description}</p>}
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
                href={`/agenda?${params.toString()}`}
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