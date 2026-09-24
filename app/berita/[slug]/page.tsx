import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

export default async function ArtikelDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!article) notFound()

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <Link href="/berita">← Balik ke daftar berita</Link>

      <h1 style={{ marginTop: 24 }}>{article.title}</h1>

      <p style={{ color: '#666' }}>
        {new Date(article.created_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>

      <div style={{ marginTop: 24, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
        {article.content}
      </div>
    </main>
  )
}