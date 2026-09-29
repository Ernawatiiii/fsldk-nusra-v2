import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="font-bold text-lg mb-2">FSLDK Nusa Tenggara</h3>
            <p className="text-sm text-gray-600">
              Merajut silaturahmi, menguatkan dakwah kampus se-Nusa Tenggara.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Navigasi</h3>
            <ul className="text-sm text-gray-600 flex flex-col gap-1">
              <li><Link href="/profil" className="hover:underline">Profil</Link></li>
              <li><Link href="/berita" className="hover:underline">Berita</Link></li>
              <li><Link href="/agenda" className="hover:underline">Agenda</Link></li>
              <li><Link href="/program" className="hover:underline">Program</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Terhubung</h3>
            <ul className="text-sm text-gray-600 flex flex-col gap-1">
              <li><Link href="/medsos" className="hover:underline">📱 Media Sosial</Link></li>
              <li><Link href="/ldk" className="hover:underline">🏛️ Direktori LDK</Link></li>
              <li><Link href="/pengurus" className="hover:underline">👤 Pengurus</Link></li>
              <li><Link href="/galeri" className="hover:underline">📸 Galeri</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-4 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} FSLDK Nusa Tenggara. All rights reserved.
        </div>
      </div>
    </footer>
  )
}