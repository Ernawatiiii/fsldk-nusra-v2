import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import FadeIn from '@/app/components/FadeIn'
import { HiOutlineHeart, HiArrowRight, HiOutlineCheckCircle } from 'react-icons/hi'

export const revalidate = 60

export default async function DonasiPage() {
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const active = campaigns?.filter(c => {
    if (!c.deadline) return true
    return new Date(c.deadline) > new Date()
  }) || []

  const done = campaigns?.filter(c => {
    if (!c.deadline) return false
    return new Date(c.deadline) <= new Date()
  }) || []

  return (
    <main>
      {/* HEADER */}
      <section className="bg-nusra text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-nusra-gold/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeIn>
            <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-4">
                Donasi
            </p>
            <h1 className="font-black text-5xl md:text-7xl uppercase leading-[0.95] mb-4">
                Salurkan<br />Kebaikan
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Dukung program dan kegiatan dakwah kampus FSLDK Nusa Tenggara.
              Setiap kontribusi adalah bagian dari gerakan kebaikan.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CAMPAIGN AKTIF */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {active.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-nusra/20">
            <HiOutlineHeart className="w-16 h-16 text-nusra/20 mx-auto mb-4" />
            <p className="text-nusra-muted text-lg">Belum ada campaign donasi aktif.</p>
            <p className="text-nusra-muted text-sm mt-2">Pantau terus halaman ini.</p>
          </div>
        )}

        {active.length > 0 && (
          <>
            <div className="mb-10">
              <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-2">
                Campaign Aktif
              </p>
              <h2 className="font-black text-3xl md:text-4xl uppercase">
                {active.length} Campaign Berjalan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {active.map((c, i) => {
                const progress = c.target_amount > 0 ? Math.min(100, Math.round((c.collected_amount / c.target_amount) * 100)) : 0
                return (
                  <FadeIn key={c.id} delay={i * 100}>
                    <Link href={`/donasi/${c.slug}`} className="no-underline text-inherit group block">
                      <article className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-nusra-gold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                        {c.cover_image ? (
                          <img src={c.cover_image} alt={c.title} className="w-full h-48 object-cover" />
                        ) : (
                          <div className="w-full h-48 bg-nusra/5 flex items-center justify-center text-nusra/20 font-black uppercase text-xs tracking-widest">
                            Tanpa Gambar
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-black text-lg leading-tight mb-3 group-hover:text-nusra transition line-clamp-2">
                            {c.title}
                          </h3>
                          {c.description && (
                            <p className="text-sm text-nusra-muted line-clamp-2 mb-4">{c.description}</p>
                          )}

                          <div className="mt-auto">
                            <div className="flex justify-between text-xs mb-2">
                              <span className="text-nusra-muted">Terkumpul</span>
                              <span className="font-black text-nusra-gold text-sm">{progress}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-nusra/10 rounded-full overflow-hidden mb-3">
                              <div
                                className="h-full bg-gradient-to-r from-nusra-gold to-nusra-lime rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="font-black text-nusra">
                                Rp {(c.collected_amount || 0).toLocaleString('id-ID')}
                              </span>
                              <span className="text-nusra-muted">
                                dari Rp {(c.target_amount || 0).toLocaleString('id-ID')}
                              </span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <span className="text-nusra font-black uppercase tracking-wider text-xs inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                Donasi Sekarang <HiArrowRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </FadeIn>
                )
              })}
            </div>
          </>
        )}
      </section>

      {/* CAMPAIGN SELESAI */}
      {done.length > 0 && (
        <FadeIn>
          <section className="bg-nusra-sand py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-10">
                <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-2">
                  Telah Selesai
                </p>
                <h2 className="font-black text-3xl md:text-4xl uppercase">
                  Terima Kasih
                </h2>
                <p className="text-nusra-muted mt-2 max-w-xl">
                  Campaign yang telah berhasil diselesaikan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {done.map((c, i) => (
                  <FadeIn key={c.id} delay={i * 100}>
                    <Link href={`/donasi/${c.slug}`} className="no-underline text-inherit group block">
                      <article className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-nusra-gold transition-all opacity-80 hover:opacity-100 h-full flex flex-col">
                        {c.cover_image ? (
                          <img src={c.cover_image} alt={c.title} className="w-full h-40 object-cover grayscale group-hover:grayscale-0 transition" />
                        ) : (
                          <div className="w-full h-40 bg-nusra/5 flex items-center justify-center text-nusra/20 text-xs font-black">
                            Tanpa Gambar
                          </div>
                        )}
                        <div className="p-5 flex-1">
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                            <HiOutlineCheckCircle className="w-3 h-3" />
                            Selesai
                          </span>
                          <h3 className="font-black text-base leading-tight mb-2 line-clamp-2">{c.title}</h3>
                          <p className="text-xs text-nusra-muted">
                            Terkumpul: <strong className="text-nusra">Rp {(c.collected_amount || 0).toLocaleString('id-ID')}</strong>
                          </p>
                        </div>
                      </article>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* INFO KONTAK */}
      <FadeIn>
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="font-black text-3xl md:text-4xl uppercase mb-4">
            Ada <span className="text-nusra-gold">Pertanyaan?</span>
          </h2>
          <p className="text-nusra-muted text-lg mb-8 max-w-2xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut tentang donasi.
          </p>
          <Link
            href="/medsos"
            className="inline-block bg-nusra text-white px-10 py-5 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all shadow-xl"
          >
            Hubungi Kami
          </Link>
        </section>
      </FadeIn>
    </main>
  )
}