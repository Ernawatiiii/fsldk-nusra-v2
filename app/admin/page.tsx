'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentProfile } from '@/lib/auth'
import {
  HiOutlineNewspaper,
  HiOutlineCalendar,
  HiOutlineOfficeBuilding,
  HiOutlineUsers,
  HiOutlineClipboardList,
  HiOutlinePhotograph,
  HiOutlineMail,
  HiOutlineUserGroup,
} from 'react-icons/hi'

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState({ artikel: 0, events: 0, ldk: 0, pesan: 0 })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)

      const p = await getCurrentProfile()
      setProfile(p)

      const [a, e, l, m] = await Promise.all([
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('ldk').select('*', { count: 'exact', head: true }),
        supabase.from('pesan').select('*', { count: 'exact', head: true }).eq('read', false),
      ])

      setStats({
        artikel: a.count || 0,
        events: e.count || 0,
        ldk: l.count || 0,
        pesan: m.count || 0,
      })

      setLoading(false)
    }
    load()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-nusra-muted font-bold">Loading...</p>
      </main>
    )
  }

  const isAdminUser = profile?.role === 'admin'

  const cards = [
    { href: '/admin/artikel', title: 'Artikel', desc: 'Berita & artikel', Icon: HiOutlineNewspaper, count: stats.artikel },
    { href: '/admin/events', title: 'Events', desc: 'Agenda & kegiatan', Icon: HiOutlineCalendar, count: stats.events },
    { href: '/admin/ldk', title: 'LDK', desc: 'Direktori LDK', Icon: HiOutlineOfficeBuilding, count: stats.ldk },
    { href: '/admin/pengurus', title: 'Pengurus', desc: 'Struktur kepengurusan', Icon: HiOutlineUsers },
    { href: '/admin/program', title: 'Program', desc: 'Program kerja', Icon: HiOutlineClipboardList },
    { href: '/admin/galeri', title: 'Galeri', desc: 'Dokumentasi foto', Icon: HiOutlinePhotograph },
    { href: '/admin/pesan', title: 'Pesan', desc: 'Pesan masuk', Icon: HiOutlineMail, count: stats.pesan, highlight: stats.pesan > 0 },
  ]

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-10">
        <div>
          <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-2">
            Admin Panel
          </p>
          <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mb-2">
            Dashboard
          </h1>
          <p className="text-nusra-muted">
            Halo, <strong className="text-nusra">{profile?.full_name || user?.email}</strong>
            {' '}—{' '}
            <span className={isAdminUser ? 'text-emerald-700 font-bold' : 'text-blue-700 font-bold'}>
              {profile?.role || 'unknown'}
            </span>
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/"
            className="border-2 border-nusra/20 text-nusra px-5 py-2 rounded-full font-black uppercase tracking-wider text-xs hover:border-nusra transition"
          >
            Lihat Website
          </Link>
          <button
            onClick={handleLogout}
            className="bg-nusra text-white px-5 py-2 rounded-full font-black uppercase tracking-wider text-xs hover:bg-nusra-gold hover:text-nusra-dark transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="no-underline text-inherit group">
            <div className={`relative bg-white rounded-2xl p-6 border-2 ${c.highlight ? 'border-nusra-gold' : 'border-gray-100'} hover:border-nusra-gold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full`}>
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${c.highlight ? 'bg-nusra-gold text-nusra-dark' : 'bg-nusra/5 text-nusra'} group-hover:bg-nusra group-hover:text-white transition-colors`}>
                  <c.Icon className="w-7 h-7" />
                </div>
                {c.count !== undefined && (
                  <span className={`font-black text-3xl ${c.highlight ? 'text-nusra-gold' : 'text-nusra'}`}>
                    {c.count}
                  </span>
                )}
              </div>
              <h3 className="font-black text-lg uppercase leading-tight mb-1 group-hover:text-nusra transition">
                {c.title}
              </h3>
              <p className="text-sm text-nusra-muted">{c.desc}</p>
            </div>
          </Link>
        ))}

        {isAdminUser && (
          <Link href="/admin/users" className="no-underline text-inherit group">
            <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-200 hover:border-nusra-gold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-600 text-white group-hover:bg-nusra-gold group-hover:text-nusra-dark transition-colors">
                  <HiOutlineUserGroup className="w-7 h-7" />
                </div>
              </div>
              <h3 className="font-black text-lg uppercase leading-tight mb-1 group-hover:text-nusra transition">
                Users
              </h3>
              <p className="text-sm text-nusra-muted">Kelola user & role</p>
            </div>
          </Link>
        )}
      </div>
    </main>
  )
}