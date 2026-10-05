import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { HiOutlineLocationMarker, HiOutlineGlobeAlt } from 'react-icons/hi'
import { FaInstagram } from 'react-icons/fa'

export const revalidate = 60

export default async function LdkDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: ldk } = await supabase
    .from('ldk')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (!ldk) notFound()

  return (
    <main>
      <section className="bg-nusra text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-nusra-gold/20 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6">
          <Link
            href="/ldk"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-nusra-gold hover:text-nusra-lime transition mb-8"
          >
            ← Direktori LDK
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {ldk.logo_url ? (
              <img
                src={ldk.logo_url}
                alt={ldk.name}
                className="w-32 h-32 object-contain bg-white rounded-2xl p-4 flex-shrink-0"
              />
            ) : (
              <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center font-black text-white/30 flex-shrink-0">
                LOGO
              </div>
            )}

            <div>
              <h1 className="font-black text-4xl md:text-6xl uppercase leading-[0.95] mb-3">
                {ldk.name}
              </h1>
              <p className="text-white/70 text-lg flex flex-wrap items-center gap-2">
                {ldk.campus}
                {ldk.city && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <HiOutlineLocationMarker className="w-4 h-4" />
                      {ldk.city}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        {ldk.description && (
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-black text-2xl uppercase">Tentang</h2>
              <div className="flex-1 h-0.5 bg-nusra-gold" />
            </div>
            <p className="leading-relaxed text-lg text-nusra-ink/80 whitespace-pre-wrap">
              {ldk.description}
            </p>
          </div>
        )}

        {(ldk.instagram_url || ldk.website_url) && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-black text-2xl uppercase">Terhubung</h2>
              <div className="flex-1 h-0.5 bg-nusra-gold" />
            </div>
            <div className="flex flex-wrap gap-4">
              {ldk.instagram_url && (
                <a
                  href={ldk.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-nusra text-white px-6 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:bg-nusra-gold hover:text-nusra-dark transition"
                >
                  <FaInstagram className="w-4 h-4" />
                  Instagram
                </a>
              )}
              {ldk.website_url && (
                <a
                  href={ldk.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border-2 border-nusra text-nusra px-6 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:bg-nusra hover:text-white transition"
                >
                  <HiOutlineGlobeAlt className="w-4 h-4" />
                  Website
                </a>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}