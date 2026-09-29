import { supabase } from '@/lib/supabase'
import Link from 'next/link'

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
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Direktori LDK</h1>
      <p className="text-gray-600 mb-8">Lembaga Dakwah Kampus se-Nusa Tenggara</p>

      <form className="mb-8 flex gap-2 max-w-md" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Cari LDK, kampus, atau kota..."
          className="flex-1 p-3 border rounded"
        />
        <button type="submit" className="px-6 py-3 bg-emerald-600 text-white rounded cursor-pointer">
          Cari
        </button>
      </form>

      {q && (
        <p className="text-sm text-gray-500 mb-6">
          Hasil pencarian untuk "<strong>{q}</strong>" — {count || 0} LDK ditemukan
        </p>
      )}

      {ldks && ldks.length === 0 && (
        <p className="text-gray-500">Tidak ada LDK ditemukan.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ldks?.map((l) => (
          <Link key={l.id} href={`/ldk/${l.slug}`} className="no-underline text-inherit">
            <div className="border rounded-lg p-4 hover:shadow-lg transition h-full flex gap-4">
              {l.logo_url && (
                <img src={l.logo_url} alt={l.name} className="w-16 h-16 object-contain flex-shrink-0" />
              )}
              <div>
                <h3 className="font-semibold">{l.name}</h3>
                <p className="text-sm text-gray-600">{l.campus}</p>
                <p className="text-xs text-gray-500">📍 {l.city}</p>
              </div>
            </div>
          </Link>
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
                href={`/ldk?${params.toString()}`}
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