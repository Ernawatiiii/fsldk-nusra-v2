import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import FadeIn from './components/FadeIn'
import { HiOutlineCalendar, HiOutlineLocationMarker } from 'react-icons/hi'

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
    <main>
      {/* HERO */}
      <section className="relative bg-nusra text-white overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-30" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-nusra-gold/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-nusra-lime/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-40">
          <div className="max-w-4xl">
            <span className="inline-block bg-nusra-gold text-nusra-dark px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              Forum Dakwah Kampus Nusa Tenggara
            </span>

            <h1 className="font-black text-5xl md:text-8xl leading-[0.95] mb-8 uppercase">
              Merajut <span className="text-nusra-gold">Silaturahmi</span>,<br />
              Menguatkan Dakwah.
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl font-medium">
              16 Lembaga Dakwah Kampus dari Lombok hingga Sumbawa. Satu forum. Satu gerakan.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/profil"
                className="bg-nusra-gold text-nusra-dark px-10 py-5 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-lime hover:scale-105 transition-all shadow-2xl"
              >
                Kenali Kami
              </Link>
              <Link
                href="/ldk"
                className="border-2 border-white/30 text-white px-10 py-5 rounded-full font-black uppercase tracking-wider text-sm hover:bg-white hover:text-nusra-dark transition-all"
              >
                Lihat 16 LDK →
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-white/10">
              <FadeIn delay={200}>
                <div>
                  <div className="font-black text-5xl md:text-6xl text-nusra-gold">{ldks.length}</div>
                  <div className="text-white/60 uppercase tracking-wider text-xs mt-2">LDK Anggota</div>
                </div>
              </FadeIn>
              <FadeIn delay={400}>
                <div>
                  <div className="font-black text-5xl md:text-6xl text-nusra-gold">4</div>
                  <div className="text-white/60 uppercase tracking-wider text-xs mt-2">Komisi Kerja</div>
                </div>
              </FadeIn>
              <FadeIn delay={600}>
                <div>
                  <div className="font-black text-5xl md:text-6xl text-nusra-gold">2</div>
                  <div className="text-white/60 uppercase tracking-wider text-xs mt-2">Badan Otonom</div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* BERITA */}
      <FadeIn>
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-2">
                Informasi Terbaru
              </p>
              <h2 className="font-black text-4xl md:text-5xl uppercase">Kabar dari Forum</h2>
            </div>
            <Link href="/berita" className="text-nusra hover:text-nusra-gold font-bold text-sm uppercase tracking-wider">
              Lihat Semua →
            </Link>
          </div>

          {articles.length === 0 && <p className="text-nusra-muted">Belum ada berita.</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <FadeIn key={a.id} delay={i * 100}>
                <Link href={`/berita/${a.slug}`} className="no-underline text-inherit group block">
                  <article className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-nusra-gold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                    {a.cover_image ? (
                      <img src={a.cover_image} alt={a.title} className="w-full h-48 object-cover" />
                    ) : (
                      <div className="w-full h-48 bg-nusra/5 flex items-center justify-center text-nusra/30 font-black uppercase text-xs tracking-widest">
                        Tanpa Gambar
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-xs text-nusra-muted uppercase tracking-wider mb-2">
                        {new Date(a.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      <h3 className="font-black text-lg leading-tight mb-3 group-hover:text-nusra transition">
                        {a.title}
                      </h3>
                      {a.excerpt && <p className="text-sm text-nusra-muted line-clamp-3">{a.excerpt}</p>}
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* AGENDA */}
      <FadeIn>
        <section className="bg-nusra text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-2">
                  Agenda
                </p>
                <h2 className="font-black text-4xl md:text-5xl uppercase">Kegiatan Mendatang</h2>
              </div>
              <Link href="/agenda" className="text-nusra-gold hover:text-nusra-lime font-bold text-sm uppercase tracking-wider">
                Lihat Semua →
              </Link>
            </div>

            {events.length === 0 && <p className="text-white/60">Belum ada agenda.</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((e, i) => (
                <FadeIn key={e.id} delay={i * 100}>
                  <Link href={`/agenda/${e.slug}`} className="no-underline text-inherit group block">
                    <article className="bg-white/5 backdrop-blur border-2 border-white/10 hover:border-nusra-gold rounded-2xl p-6 transition-all duration-300 h-full">
                      <p className="text-nusra-gold font-black text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                        <HiOutlineCalendar className="w-4 h-4" />
                        {e.start_date ? new Date(e.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                      </p>
                      <h3 className="font-black text-xl leading-tight mb-3 group-hover:text-nusra-gold transition">
                        {e.title}
                      </h3>
                      {e.location && (
                        <p className="text-white/60 text-sm flex items-center gap-2">
                          <HiOutlineLocationMarker className="w-4 h-4" />
                          {e.location}
                        </p>
                      )}
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="font-black text-4xl md:text-6xl uppercase mb-6">
            Siap <span className="text-nusra-gold">Kolaborasi</span>?
          </h2>
          <p className="text-nusra-muted text-lg mb-8 max-w-2xl mx-auto">
            Punya pertanyaan, ide kolaborasi, atau ingin bergabung? Hubungi kami.
          </p>
          <Link
            href="/profil"
            className="inline-block bg-nusra text-white px-10 py-5 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all shadow-xl"
          >
            Hubungi Kami
          </Link>
        </section>
      </FadeIn>
    </main>
  )
}