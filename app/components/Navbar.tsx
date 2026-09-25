import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-emerald-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          FSLDK Nusra
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/berita">Berita</Link>
          <Link href="/agenda">Agenda</Link>
          <Link href="/ldk">Direktori LDK</Link>
          <Link href="/login">Admin</Link>
        </div>
      </div>
    </nav>
  )
}