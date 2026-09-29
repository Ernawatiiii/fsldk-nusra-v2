import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-emerald-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          FSLDK Nusra
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/profil" className="hover:underline">Profil</Link>
          <Link href="/berita" className="hover:underline">Berita</Link>
          <Link href="/agenda" className="hover:underline">Agenda</Link>
          <Link href="/program" className="hover:underline">Program</Link>
          <Link href="/ldk" className="hover:underline">LDK</Link>
          <Link href="/pengurus" className="hover:underline">Pengurus</Link>
          <Link href="/galeri" className="hover:underline">Galeri</Link>
          <Link href="/medsos" className="hover:underline">Medsos</Link>
          <Link href="/login" className="hover:underline">Admin</Link>
        </div>
      </div>
    </nav>
  )
}