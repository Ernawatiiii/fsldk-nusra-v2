import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 60

export default async function BeritaPage() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 800, margin: '0 auto' }}>
      <h1>Berita & Artikel</h1>

      {articles && articles.length === 0 && <p>Belum ada artikel.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24 }}>
        {articles?.map((a) => (
          <article key={a.id} style={{ borderBottom: '1px solid #eee', paddingBottom: 16 }}>
            <Link href={`/berita/${a.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2 style={{ marginBottom: 8 }}>{a.title}</h2>
            </Link>
            <p style={{ color: '#666', marginBottom: 8 }}>
              {new Date(a.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            {a.excerpt && <p>{a.excerpt}</p>}
          </article>
        ))}
      </div>
    </main>
  )
}