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
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/berita" className="text-emerald-700 hover:underline">← Balik ke berita</Link>

      {article.cover_image && (
        <img
          src={article.cover_image}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg mt-6"
        />
      )}

      <h1 className="text-3xl font-bold mt-6 mb-2">{article.title}</h1>

      <p className="text-sm text-gray-500 mb-8">
        {new Date(article.created_at).toLocaleDateString('id-ID', {
          day: 'numeric', month: 'long', year: 'numeric',
        })}
      </p>

      <div className="prose max-w-none leading-relaxed whitespace-pre-wrap">
        {article.content}
      </div>
    </main>
  )
}