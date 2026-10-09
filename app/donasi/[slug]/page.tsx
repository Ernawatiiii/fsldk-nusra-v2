import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ShareButton from '@/app/components/ShareButton'
import { HiOutlineClock, HiOutlineHeart, HiOutlineCheckCircle, HiOutlineChat, HiOutlineCreditCard } from 'react-icons/hi'

export const revalidate = 60

const BASE_URL = 'https://fsldk-nusra-v2.vercel.app'

export default async function CampaignDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: campaign } = await supabase
    .from('campaigns')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!campaign) notFound()

  const progress = campaign.target_amount > 0
    ? Math.min(100, Math.round((campaign.collected_amount / campaign.target_amount) * 100))
    : 0

  const daysLeft = campaign.deadline
    ? Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null

  const isDone = daysLeft !== null && daysLeft <= 0

  const waLink = campaign.contact_wa
    ? `https://wa.me/${campaign.contact_wa.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalamualaikum, saya ingin konfirmasi donasi untuk campaign "${campaign.title}"`)}`
    : null

  return (
    <main>
      {campaign.cover_image && (
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img
            src={campaign.cover_image}
            alt={campaign.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nusra-dark via-nusra-dark/60 to-transparent" />
        </section>
      )}

      <article className={`max-w-4xl mx-auto px-6 ${campaign.cover_image ? '-mt-32 relative z-10' : 'py-16'}`}>
        <Link
          href="/donasi"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-nusra-gold hover:text-nusra-lime transition mb-6"
        >
          ← Donasi
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          {/* Status */}
          <div className="flex flex-wrap gap-3 mb-6">
            {isDone ? (
              <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                <HiOutlineCheckCircle className="w-3 h-3" />
                Campaign Selesai
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-nusra-gold text-nusra-dark px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                <HiOutlineHeart className="w-3 h-3" />
                Sedang Berjalan
              </span>
            )}

            {daysLeft !== null && daysLeft > 0 && (
              <span className="inline-flex items-center gap-2 bg-nusra/10 text-nusra px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                <HiOutlineClock className="w-3 h-3" />
                {daysLeft} hari lagi
              </span>
            )}
          </div>

          <h1 className="font-black text-3xl md:text-5xl leading-[1.05] uppercase mb-6">
            {campaign.title}
          </h1>

          {campaign.description && (
            <p className="text-lg text-nusra-muted mb-8 leading-relaxed">
              {campaign.description}
            </p>
          )}

          {/* PROGRESS BOX */}
          <div className="bg-nusra text-white rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60 font-black mb-1">Terkumpul</p>
                  <p className="font-black text-2xl md:text-4xl text-nusra-gold">
                    Rp {(campaign.collected_amount || 0).toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-3xl md:text-5xl text-white/90">{progress}%</p>
                </div>
              </div>

              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-nusra-gold to-nusra-lime rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-sm text-white/70">
                Target: <strong className="text-white">Rp {(campaign.target_amount || 0).toLocaleString('id-ID')}</strong>
              </p>
            </div>
          </div>

          {/* CARA DONASI */}
          {!isDone && (
            <div className="mb-8">
              <h2 className="font-black text-2xl uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-nusra-gold text-nusra-dark flex items-center justify-center">
                  <HiOutlineCreditCard className="w-4 h-4" />
                </span>
                Cara Donasi
              </h2>

              <div className="bg-nusra-sand rounded-2xl p-6 border-2 border-nusra/10">
                <pre className="whitespace-pre-wrap font-mono text-sm text-nusra-ink/80 leading-relaxed">
                  {campaign.bank_info || 'Info donasi akan segera diumumkan.'}
                </pre>
              </div>

              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-emerald-700 transition-all shadow-lg"
                >
                  <HiOutlineChat className="w-5 h-5" />
                  Konfirmasi via WhatsApp
                </a>
              )}
            </div>
          )}

          {/* KONTEN */}
          {campaign.content && (
            <div className="mb-8">
              <h2 className="font-black text-2xl uppercase mb-4">Detail Campaign</h2>
              <div className="leading-relaxed text-nusra-ink/80 whitespace-pre-wrap text-lg">
                {campaign.content}
              </div>
            </div>
          )}

          <div className="mt-8">
            <ShareButton
              url={`${BASE_URL}/donasi/${campaign.slug}`}
              title={campaign.title}
            />
          </div>
        </div>
      </article>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/donasi"
          className="inline-block bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all"
        >
          ← Balik ke Donasi
        </Link>
      </section>
    </main>
  )
}