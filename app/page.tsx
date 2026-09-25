import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 60

export default async function Home() {
  const [articlesRes, eventsRes, ldksRes] = await Promise.all([
    supabase.from('articles').select('*').eq('published', true).order('created_at', { ascending: false }).limit(3),
    supabase.from('events').select('*').eq('published', true).order('start_date', { ascending: false }).limit(3),
    supabase.from('ldk').select('*').eq('active', true).order('name'),
  ])

  const articles = articlesRes.data || []
  const events = eventsRes.data || []
  const ldks = ldksRes.data || []

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 1000, margin: '0 auto' }}>
      <header style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32 }}>FSLDK Nusa Tenggara</h1>
        <p style={{ color: '#666', fontSize: 18 }}>
          Merajut silaturahmi, menguatkan dakwah kampus se-Nusa Tenggara.
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
          <Link href="/berita">Berita</Link>
          <Link href="/agenda">Agenda</Link>
          <Link href="/ldk">Direktori LDK</Link>
        </div>
      </header>

      <section style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
        <div><strong style={{ fontSize: 28 }}>{ldks.length}</strong><br />LDK Anggota</div>
        <div><strong style={{ fontSize: 28 }}>{articles.length}</strong><br />Artikel</div>
        <div><strong style={{ fontSize: 28 }}>{events.length}</strong><br />Agenda</div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Berita Terbaru</h2>
        {articles.length === 0 && <p style={{ color: '#666' }}>Belum ada berita.</p>}
        {articles.map((a) => (
          <article key={a.id} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
            <Link href={`/berita/${a.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3 style={{ margin: '0 0 4px 0' }}>{a.title}</h3>
            </Link>
            <p style={{ color: '#666', margin: 0, fontSize: 14 }}>
              {new Date(a.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </article>
        ))}
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Agenda Terbaru</h2>
        {events.length === 0 && <p style={{ color: '#666' }}>Belum ada agenda.</p>}
        {events.map((e) => (
          <article key={e.id} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
            <Link href={`/agenda/${e.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3 style={{ margin: '0 0 4px 0' }}>{e.title}</h3>
            </Link>
            <p style={{ color: '#666', margin: 0, fontSize: 14 }}>
              📅 {e.start_date ? new Date(e.start_date).toLocaleDateString('id-ID') : '-'}
              {e.location && ` • 📍 ${e.location}`}
            </p>
          </article>
        ))}
      </section>

      <footer style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #eee', color: '#999', fontSize: 14 }}>
        <Link href="/login">Login Admin</Link>
      </footer>
    </main>
  )
}