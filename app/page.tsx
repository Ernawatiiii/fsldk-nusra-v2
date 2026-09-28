import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 60

export default async function Home() {
  const [articlesRes, eventsRes, ldksRes] = await Promise.all([
    supabase.from('articles').select('*').eq('published', true).order('created_at', { ascending: false }).limit(3),
    supabase.from('events').select('*').eq('published', true).order('start_date', { ascending: false }).limit(3),
    supabase.from('ldk').select('*').eq('active', true),
  ])

  const articles = articlesRes.data || []
  const events = eventsRes.data || []
  const ldks = ldksRes.data || []

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">FSLDK Nusa Tenggara</h1>
        <p className="text-xl text-gray-600 mb-6">
          Merajut silaturahmi, menguatkan dakwah kampus se-Nusa Tenggara.
        </p>
        <div className="flex gap-4">
          <Link href="/berita" className="text-emerald-700 hover:underline">Berita</Link>
          <Link href="/agenda" className="text-emerald-700 hover:underline">Agenda</Link>
          <Link href="/ldk" className="text-emerald-700 hover:underline">Direktori LDK</Link>
        </div>
      </header>

      <section className="grid grid-cols-3 gap-6 mb-12">
        <div className="bg-emerald-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-emerald-700">{ldks.length}</div>
          <div className="text-gray-600 text-sm">LDK Anggota</div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-emerald-700">{articles.length}</div>
          <div className="text-gray-600 text-sm">Artikel</div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-emerald-700">{events.length}</div>
          <div className="text-gray-600 text-sm">Agenda</div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Berita Terbaru</h2>
          <Link href="/berita" className="text-emerald-700 text-sm hover:underline">Lihat semua →</Link>
        </div>

        {articles.length === 0 && <p className="text-gray-500">Belum ada berita.</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <Link key={a.id} href={`/berita/${a.slug}`} className="no-underline text-inherit">
              <article className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                {a.cover_image ? (
                  <img src={a.cover_image} alt={a.title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                    Tanpa Gambar
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{a.title}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(a.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Agenda Terbaru</h2>
          <Link href="/agenda" className="text-emerald-700 text-sm hover:underline">Lihat semua →</Link>
        </div>

        {events.length === 0 && <p className="text-gray-500">Belum ada agenda.</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((e) => (
            <Link key={e.id} href={`/agenda/${e.slug}`} className="no-underline text-inherit">
              <article className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                {e.cover_image ? (
                  <img src={e.cover_image} alt={e.title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                    Tanpa Gambar
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{e.title}</h3>
                  <p className="text-xs text-gray-500">
                    📅 {e.start_date ? new Date(e.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                  </p>
                  {e.location && <p className="text-xs text-gray-500">📍 {e.location}</p>}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}