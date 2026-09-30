'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-nusra/95 backdrop-blur-md text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-black text-xl tracking-tight">
          FSLDK <span className="text-nusra-gold">Nusra</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider">
          <Link href="/profil" className="hover:text-nusra-gold transition">Profil</Link>
          <Link href="/berita" className="hover:text-nusra-gold transition">Berita</Link>
          <Link href="/agenda" className="hover:text-nusra-gold transition">Agenda</Link>
          <Link href="/program" className="hover:text-nusra-gold transition">Program</Link>
          <Link href="/ldk" className="hover:text-nusra-gold transition">LDK</Link>
          <Link href="/pengurus" className="hover:text-nusra-gold transition">Pengurus</Link>
          <Link href="/galeri" className="hover:text-nusra-gold transition">Galeri</Link>
          <Link href="/medsos" className="hover:text-nusra-gold transition">Medsos</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="hidden lg:inline-block bg-nusra-gold text-nusra-dark px-5 py-2 rounded-full font-black text-xs uppercase tracking-wider hover:bg-nusra-lime transition"
          >
            Admin
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-2xl cursor-pointer"
            aria-label="Menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-nusra-dark border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-4 text-sm font-semibold uppercase tracking-wider">
            <Link href="/profil" onClick={() => setOpen(false)}>Profil</Link>
            <Link href="/berita" onClick={() => setOpen(false)}>Berita</Link>
            <Link href="/agenda" onClick={() => setOpen(false)}>Agenda</Link>
            <Link href="/program" onClick={() => setOpen(false)}>Program</Link>
            <Link href="/ldk" onClick={() => setOpen(false)}>LDK</Link>
            <Link href="/pengurus" onClick={() => setOpen(false)}>Pengurus</Link>
            <Link href="/galeri" onClick={() => setOpen(false)}>Galeri</Link>
            <Link href="/medsos" onClick={() => setOpen(false)}>Medsos</Link>
            <Link href="/admin" onClick={() => setOpen(false)} className="text-nusra-gold">Admin</Link>
          </div>
        </div>
      )}
    </nav>
  )
}