import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import FadeIn from './components/FadeIn'
import { HiOutlineCalendar, HiOutlineLocationMarker, HiArrowRight } from 'react-icons/hi'

export const revalidate = 60

export default async function Home() {
  const [ldksRes, eventsRes, programsRes, articlesRes, galleryRes] = await Promise.all([
    supabase.from('ldk').select('*').eq('active', true).order('name'),
    supabase.from('events').select('*').eq('published', true).order('start_date', { ascending: true }).limit(3),
    supabase.from('program').select('*').eq('published', true).order('order_index').limit(6),
    supabase.from('articles').select('*').eq('published', true).order('created_at', { ascending: false }).limit(3),
    supabase.from('galeri').select('*').eq('published', true).order('created_at', { ascending: false }).limit(3),
  ])

  const ldks = ldksRes.data || []
  const events = eventsRes.data || []
  const programs = programsRes.data || []
  const articles = articlesRes.data || []
  const gallery = galleryRes.data || []

  return (
    <main>
      {/* ===== 1. HERO ===== */}
      <section className="bg-nusra text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-30" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-nusra-gold/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-nusra-lime/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            <FadeIn>
              <span className="inline-block bg-nusra-gold text-nusra-dark px-6 py-2 rounded-full text-base md:text-lg font-black uppercase tracking-wide mb-6">
                Forum Silaturahmi Lembaga Dakwah Kampus Nusa Tenggara
              </span>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="font-black text-5xl md:text-7xl leading-[0.95] mb-6 uppercase">
                Merajut <span className="text-nusra-gold">Silaturahmi</span>,<br />
                Menguatkan Dakwah.
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
                FSLDK Nusa Tenggara adalah forum silaturahmi dan kolaborasi
                Lembaga Dakwah Kampus se-Nusa Tenggara — menyatukan potensi,
                membina karakter, dan melahirkan pemimpin masa depan.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/profil"
                  className="bg-nusra-gold text-nusra-dark px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-lime hover:scale-105 transition-all shadow-2xl"
                >
                  Kenali Kami
                </Link>
                <Link
                  href="/ldk"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-white hover:text-nusra-dark transition-all"
                >
                  Direktori LDK
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== 2. TENTANG + STATS ===== */}
      <FadeIn>
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-3">
                Tentang Kami
              </p>
              <h2 className="font-black text-3xl md:text-5xl uppercase leading-tight mb-6">
                Forum Silaturahmi<br />
                Lembaga Dakwah Kampus
              </h2>
              <p className="text-nusra-muted leading-relaxed mb-4 text-lg">
                FSLDK Nusa Tenggara adalah wadah kolaborasi Lembaga Dakwah
                Kampus yang tersebar dari Lombok hingga Sumbawa dan Bima.
              </p>
              <p className="text-nusra-muted leading-relaxed mb-8">
                Forum ini lahir dari kesadaran bahwa dakwah kampus akan jauh
                lebih kuat jika dijalankan bersama-sama — menyatukan potensi,
                membina karakter, dan melahirkan pemimpin masa depan menuju
                Indonesia madani.
              </p>
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 bg-nusra text-white px-6 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:bg-nusra-gold hover:text-nusra-dark transition-all"
              >
                Profil Lengkap <HiArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-nusra rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
                <div className="relative">
                  <div className="font-black text-4xl md:text-5xl text-nusra-gold mb-2">{ldks.length}</div>
                  <div className="text-xs uppercase tracking-widest text-white/70">LDK yang Tergabung</div>
                </div>
              </div>
              <div className="bg-nusra rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
                <div className="relative">
                  <div className="font-black text-4xl md:text-5xl text-nusra-gold mb-2">16</div>
                  <div className="text-xs uppercase tracking-widest text-white/70">Kampus</div>
                </div>
              </div>
              <div className="bg-nusra rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
                <div className="relative">
                  <div className="font-black text-4xl md:text-5xl text-nusra-gold mb-2">4</div>
                  <div className="text-xs uppercase tracking-widest text-white/70">Komisi</div>
                </div>
              </div>
              <div className="bg-nusra rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
                <div className="relative">
                  <div className="font-black text-4xl md:text-5xl text-nusra-gold mb-2">2</div>
                  <div className="text-xs uppercase tracking-widest text-white/70">Badan Semi Otonom</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ===== 3. AGENDA TERDEKAT ===== */}
      {events.length > 0 && (
        <FadeIn>
          <section className="bg-nusra-sand py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                <div>
                  <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-2">
                    Agenda
                  </p>
                  <h2 className="font-black text-3xl md:text-4xl uppercase">Kegiatan Terdekat</h2>
                </div>
                <Link href="/agenda" className="text-nusra hover:text-nusra-gold font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  Lihat Semua <HiArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {events.map((e, i) => (
                  <FadeIn key={e.id} delay={i * 100}>
                    <Link href={`/agenda/${e.slug}`} className="no-underline text-inherit group block">
                      <article className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-nusra-gold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                        {e.cover_image ? (
                          <img src={e.cover_image} alt={e.title} className="w-full h-40 object-cover" />
                        ) : (
                          <div className="w-full h-40 bg-nusra-lime/20 flex items-center justify-center">
                            <HiOutlineCalendar className="w-12 h-12 text-nusra/30" />
                          </div>
                        )}
                        <div className="p-5 flex-1 flex flex-col">
                          <span className="bg-nusra-gold text-nusra-dark px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 self-start mb-3">
                            <HiOutlineCalendar className="w-3 h-3" />
                            {e.start_date ? new Date(e.start_date).toLocaleDateString('id-ID', {
                              day: 'numeric', month: 'short', year: 'numeric',
                            }) : '-'}
                          </span>
                          <h3 className="font-black text-base leading-tight mb-3 group-hover:text-nusra transition line-clamp-2">
                            {e.title}
                          </h3>
                          {e.location && (
                            <p className="text-xs text-nusra-muted flex items-center gap-1 mt-auto">
                              <HiOutlineLocationMarker className="w-3 h-3" />
                              {e.location}
                            </p>
                          )}
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

      {/* ===== 4. JARINGAN LDK ===== */}
      <FadeIn>
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-3">
              Jaringan
            </p>
            <h2 className="font-black text-3xl md:text-5xl uppercase mb-4">
              LDK se-Nusa Tenggara
            </h2>
            <p className="text-nusra-muted max-w-xl mx-auto">
              Tersebar dari Lombok hingga Sumbawa & Bima
            </p>
          </div>

          {ldks.length === 0 ? (
            <p className="text-center text-nusra-muted">Belum ada LDK.</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {ldks.slice(0, 16).map((l, i) => (
                <FadeIn key={l.id} delay={i * 20}>
                  <Link href={`/ldk/${l.slug}`} className="no-underline text-inherit group block">
                    <div className="bg-white rounded-xl border-2 border-gray-100 hover:border-nusra-gold hover:shadow-md transition-all p-3 flex flex-col items-center text-center aspect-square justify-center">
                      {l.logo_url ? (
                        <img src={l.logo_url} alt={l.name} className="w-10 h-10 object-contain mb-2" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-nusra/5 flex items-center justify-center text-nusra/20 text-[8px] font-black mb-2">
                          LDK
                        </div>
                      )}
                      <p className="font-bold text-[10px] leading-tight line-clamp-2 group-hover:text-nusra transition">
                        {l.name}
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/ldk"
              className="inline-flex items-center gap-2 bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all"
            >
              Direktori Lengkap <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ===== 5. PROGRAM ===== */}
      <FadeIn>
        <section className="bg-nusra text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-nusra-gold/20 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-2">
                  Program Kerja
                </p>
                <h2 className="font-black text-3xl md:text-4xl uppercase">Yang Kami Kerjakan</h2>
                <p className="text-white/60 mt-2 max-w-xl">
                  Rangkaian program untuk menghidupkan dakwah kampus di Nusa Tenggara.
                </p>
              </div>
              <Link href="/program" className="text-nusra-gold hover:text-nusra-lime font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                Lihat Semua <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {programs.length === 0 && <p className="text-white/60">Belum ada program.</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {programs.map((p, i) => (
                <FadeIn key={p.id} delay={i * 100}>
                  <Link href={`/program/${p.slug}`} className="no-underline text-inherit group block">
                    <article className="bg-white/5 backdrop-blur border-2 border-white/10 hover:border-nusra-gold rounded-2xl p-6 transition-all duration-300 h-full flex gap-5">
                      <div className="text-nusra-gold font-black text-4xl flex-shrink-0 leading-none">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-base leading-tight mb-2 group-hover:text-nusra-gold transition line-clamp-2">
                          {p.title}
                        </h3>
                        {p.description && (
                          <p className="text-white/60 text-sm line-clamp-2">{p.description}</p>
                        )}
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ===== 6. BERITA TERBARU ===== */}
      {articles.length > 0 && (
        <FadeIn>
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-2">
                  Informasi
                </p>
                <h2 className="font-black text-3xl md:text-4xl uppercase">Kabar Terbaru</h2>
              </div>
              <Link href="/berita" className="text-nusra hover:text-nusra-gold font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                Lihat Semua <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {articles.map((a, i) => (
                <FadeIn key={a.id} delay={i * 100}>
                  <Link href={`/berita/${a.slug}`} className="no-underline text-inherit group block">
                    <article className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-nusra-gold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                      {a.cover_image ? (
                        <img src={a.cover_image} alt={a.title} className="w-full h-40 object-cover" />
                      ) : (
                        <div className="w-full h-40 bg-nusra/5 flex items-center justify-center text-nusra/20 font-black uppercase text-xs tracking-widest">
                          Tanpa Gambar
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col">
                        <p className="text-xs text-nusra-muted uppercase tracking-wider mb-2">
                          {new Date(a.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                        <h3 className="font-black text-base leading-tight mb-3 group-hover:text-nusra transition line-clamp-2">
                          {a.title}
                        </h3>
                        {a.excerpt && <p className="text-sm text-nusra-muted line-clamp-2">{a.excerpt}</p>}
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      {/* ===== 7. GALERI (3 FOTO TERBARU) ===== */}
      {gallery.length > 0 && (
        <FadeIn>
          <section className="bg-nusra-sand py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                <div>
                  <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-2">
                    Dokumentasi
                  </p>
                  <h2 className="font-black text-3xl md:text-4xl uppercase">Momen Terbaru</h2>
                </div>
                <Link href="/galeri" className="text-nusra hover:text-nusra-gold font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  Lihat Semua <HiArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gallery.map((g, i) => (
                  <FadeIn key={g.id} delay={i * 100}>
                    <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-nusra-gold hover:shadow-2xl transition-all duration-300">
                      <img
                        src={g.image_url}
                        alt={g.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-nusra-dark/90 via-nusra-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                        <h3 className="font-black text-white text-sm leading-tight">{g.title}</h3>
                        {g.category && (
                          <p className="text-white/60 text-xs uppercase tracking-wider mt-1">{g.category}</p>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* ===== 8. CTA ===== */}
      <FadeIn>
        <section className="bg-nusra text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-nusra-gold/20 rounded-full blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
            <h2 className="font-black text-4xl md:text-6xl uppercase mb-6">
              Kenali <span className="text-nusra-gold">FSLDK Nusra</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Pelajari visi, misi, dan perjalanan dakwah kampus kami di Nusa Tenggara.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/profil"
                className="bg-nusra-gold text-nusra-dark px-10 py-5 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-lime hover:scale-105 transition-all shadow-2xl"
              >
                Profil Kami
              </Link>
              <Link
                href="/medsos"
                className="border-2 border-white/30 text-white px-10 py-5 rounded-full font-black uppercase tracking-wider text-sm hover:bg-white hover:text-nusra-dark transition-all"
              >
                Media Sosial
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  )
}