import ContactForm from '../components/ContactForm' 

export default function ProfilPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Tentang Kami</h1>
      <p className="text-gray-600 mb-12">Mengenal FSLDK Nusa Tenggara lebih dekat</p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-emerald-600">Sejarah Singkat</h2>
        <p className="leading-relaxed mb-4">
          Forum Silaturahmi Lembaga Dakwah Kampus (FSLDK) Nusa Tenggara adalah wadah kolaborasi
          Lembaga Dakwah Kampus yang tersebar dari Lombok hingga Sumbawa dan Bima. Forum ini lahir
          dari kesadaran bahwa dakwah kampus akan jauh lebih kuat jika dijalankan bersama-sama,
          bukan sendiri-sendiri.
        </p>
        <p className="leading-relaxed">
          Hingga kini, FSLDK Nusa Tenggara menyatukan 16 LDK dari berbagai kampus di wilayah
          Nusa Tenggara dalam satu forum silaturahmi, pembinaan, dan kolaborasi.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-emerald-600">Visi</h2>
        <blockquote className="border-l-4 border-emerald-600 pl-4 italic text-lg text-gray-700">
          "Terwujudnya sinergi antar Lembaga Dakwah Kampus se-Indonesia menuju Indonesia madani."
        </blockquote>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-emerald-600">Misi</h2>
        <ol className="list-decimal pl-6 flex flex-col gap-3">
          <li>Mengoptimalkan pembinaan anggota berlandaskan Al-Qur'an dan As-Sunnah serta menanamkan nilai-nilai kebangsaan.</li>
          <li>Menjadi wadah untuk mengupgrade potensi anggota LDK se-Indonesia.</li>
          <li>Membangun profesionalitas kerja FSLDK Indonesia.</li>
          <li>Menjadi opinion leader dalam menanggapi dan mengelola isu nasional dan internasional.</li>
          <li>Mengokohkan karakter, pemahaman, dan nilai Islam dalam tatanan kehidupan bangsa.</li>
          <li>Mengaktifkan kolaborasi untuk melejitkan eksistensi LDK se-Indonesia.</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-emerald-600">Tujuan</h2>
        <p className="leading-relaxed">
          Sebagai wadah dan forum untuk mempersatukan, mengkolaborasikan, serta mengoptimalkan
          seluruh potensi Lembaga Dakwah Kampus dalam mencetak pemimpin-pemimpin masa depan,
          melestarikan cita-cita dakwah kampus, serta memberikan manfaat nyata bagi anggota,
          Indonesia, dan masyarakat dunia.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-emerald-600">Harapan Kami</h2>
        <ul className="flex flex-col gap-3">
          <li className="border-l-4 border-emerald-300 pl-4 italic">
            "Terciptanya semangat dakwah yang berkelanjutan di setiap Lembaga Dakwah Kampus."
          </li>
          <li className="border-l-4 border-emerald-300 pl-4 italic">
            "Terciptanya potensi anggota pada masing-masing bidang."
          </li>
          <li className="border-l-4 border-emerald-300 pl-4 italic">
            "Terciptanya pemimpin-pemimpin masa depan dalam membangun Indonesia madani."
          </li>
          <li className="border-l-4 border-emerald-300 pl-4 italic">
            "Terbentuknya lingkungan kebaikan sebagai wadah pembinaan diri setiap mahasiswa dan pemuda muslim."
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-emerald-600">Kontak</h2>
        <p className="text-gray-600 mb-6">
          Ada pertanyaan, kerja sama, atau ingin bergabung? Sampaikan lewat kanal di bawah, atau isi formulir singkat ini.
        </p>
        <div className="flex gap-4 mb-8">
          <a href="#" className="text-emerald-700 hover:underline">Instagram</a>
          <a href="#" className="text-emerald-700 hover:underline">Email</a>
          <a href="#" className="text-emerald-700 hover:underline">WhatsApp</a>
        </div>
        <ContactForm />
      </section>
    </main>
  )
}