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
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Berita & Artikel</h1>
      <p className="text-gray-600 mb-8">Kabar terbaru dari FSLDK Nusa Tenggara</p>

      {articles && articles.length === 0 && <p className="text-gray-500">Belum ada artikel.</p>}

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
    </main>
  )
}