import type { Metadata } from 'next'
import ContactForm from '@/app/components/ContactForm'

export const metadata: Metadata = {
  title: 'Profil',
  description: 'Profil, visi, misi, dan tujuan FSLDK Nusa Tenggara',
}

export default function ProfilPage() {
  return (
    <main>
      {/* HEADER */}
      <section className="bg-nusra text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-nusra-gold/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-3">
            Tentang Kami
          </p>
          <h1 className="font-black text-5xl md:text-7xl uppercase leading-[0.95] mb-4">
            Profil FSLDK<br />Nusa Tenggara
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Mengenal FSLDK Nusa Tenggara lebih dekat
          </p>
        </div>
      </section>

      {/* SEJARAH */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-black text-3xl md:text-4xl uppercase">Sejarah</h2>
          <div className="flex-1 h-0.5 bg-nusra-gold" />
        </div>
        <p className="leading-relaxed text-lg mb-4 text-nusra-ink/80">
          Forum Silaturahmi Lembaga Dakwah Kampus (FSLDK) Nusa Tenggara adalah wadah kolaborasi
          Lembaga Dakwah Kampus yang tersebar dari Lombok hingga Sumbawa dan Bima. Forum ini lahir
          dari kesadaran bahwa dakwah kampus akan jauh lebih kuat jika dijalankan bersama-sama,
          bukan sendiri-sendiri.
        </p>
        <p className="leading-relaxed text-lg text-nusra-ink/80">
          Hingga kini, FSLDK Nusa Tenggara menyatukan 16 LDK dari berbagai kampus di wilayah
          Nusa Tenggara dalam satu forum silaturahmi, pembinaan, dan kolaborasi.
        </p>
      </section>

      {/* VISI */}
      <section className="bg-nusra text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-black text-3xl md:text-4xl uppercase text-nusra-gold">Visi</h2>
            <div className="flex-1 h-0.5 bg-nusra-gold" />
          </div>
          <blockquote className="text-2xl md:text-3xl font-bold leading-snug italic">
            "Terwujudnya sinergi antar Lembaga Dakwah Kampus se-Indonesia menuju Indonesia madani."
          </blockquote>
        </div>
      </section>

      {/* MISI */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-black text-3xl md:text-4xl uppercase">Misi</h2>
          <div className="flex-1 h-0.5 bg-nusra-gold" />
        </div>
        <ol className="flex flex-col gap-5">
          {[
            "Mengoptimalkan pembinaan anggota berlandaskan Al-Qur'an dan As-Sunnah serta menanamkan nilai-nilai kebangsaan.",
            "Menjadi wadah untuk mengupgrade potensi anggota LDK se-Indonesia.",
            "Membangun profesionalitas kerja FSLDK Indonesia.",
            "Menjadi opinion leader dalam menanggapi dan mengelola isu nasional dan internasional.",
            "Mengokohkan karakter, pemahaman, dan nilai Islam dalam tatanan kehidupan bangsa.",
            "Mengaktifkan kolaborasi untuk melejitkan eksistensi LDK se-Indonesia.",
          ].map((item, i) => (
            <li key={i} className="flex gap-5">
              <div className="w-10 h-10 rounded-full bg-nusra-gold text-nusra-dark font-black flex items-center justify-center flex-shrink-0">
                {i + 1}
              </div>
              <p className="leading-relaxed text-nusra-ink/80 pt-1.5">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* TUJUAN */}
      <section className="bg-nusra-sand py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-black text-3xl md:text-4xl uppercase">Tujuan</h2>
            <div className="flex-1 h-0.5 bg-nusra-gold" />
          </div>
          <p className="leading-relaxed text-lg text-nusra-ink/80">
            Sebagai wadah dan forum untuk mempersatukan, mengkolaborasikan, serta mengoptimalkan
            seluruh potensi Lembaga Dakwah Kampus dalam mencetak pemimpin-pemimpin masa depan,
            melestarikan cita-cita dakwah kampus, serta memberikan manfaat nyata bagi anggota,
            Indonesia, dan masyarakat dunia.
          </p>
        </div>
      </section>

      {/* HARAPAN */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-black text-3xl md:text-4xl uppercase">Harapan Kami</h2>
          <div className="flex-1 h-0.5 bg-nusra-gold" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Terciptanya semangat dakwah yang berkelanjutan di setiap Lembaga Dakwah Kampus.",
            "Terciptanya potensi anggota pada masing-masing bidang.",
            "Terciptanya pemimpin-pemimpin masa depan dalam membangun Indonesia madani.",
            "Terbentuknya lingkungan kebaikan sebagai wadah pembinaan diri setiap mahasiswa dan pemuda muslim.",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-nusra-gold transition"
            >
              <div className="text-nusra-gold text-3xl font-black mb-2">"</div>
              <p className="italic text-nusra-ink/80 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KONTAK */}
      <section className="bg-nusra text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-black text-3xl md:text-4xl uppercase text-nusra-gold">Kontak</h2>
            <div className="flex-1 h-0.5 bg-nusra-gold" />
          </div>
          <p className="text-white/70 text-lg mb-8">
            Ada pertanyaan, kerja sama, atau ingin bergabung? Isi formulir di bawah ini.
          </p>
          <div className="bg-white text-nusra-ink rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}