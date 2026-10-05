import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ShareButton from '@/app/components/ShareButton'

export const revalidate = 60

const BASE_URL = 'https://fsldk-nusra-v2.vercel.app'

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
    <main>
      {/* HERO IMAGE */}
      {article.cover_image && (
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img
            src={article.cover_image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nusra-dark via-nusra-dark/60 to-transparent" />
        </section>
      )}

      {/* CONTENT */}
      <article className={`max-w-3xl mx-auto px-6 ${article.cover_image ? '-mt-32 relative z-10' : 'py-16'}`}>
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-nusra-gold hover:text-nusra-lime transition mb-6"
        >
          ← Berita
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-4">
            {new Date(article.created_at).toLocaleDateString('id-ID', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </p>

          <h1 className="font-black text-3xl md:text-5xl leading-[1.05] uppercase mb-8">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-lg md:text-xl text-nusra-muted italic mb-8 border-l-4 border-nusra-gold pl-6">
              {article.excerpt}
            </p>
          )}

          <div className="leading-relaxed text-nusra-ink/80 whitespace-pre-wrap text-lg">
            {article.content}
          </div>

          <div className="mt-8">
            <ShareButton
              url={`${BASE_URL}/berita/${article.slug}`}
              title={article.title}
            />
          </div>
        </div>
      </article>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/berita"
          className="inline-block bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all"
        >
          ← Balik ke Berita
        </Link>
      </section>
    </main>
  )
}