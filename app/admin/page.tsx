'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentProfile } from '@/lib/auth'

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
        return
      }
      setUser(data.user)

      const p = await getCurrentProfile()
      setProfile(p)
      setLoading(false)
    }
    checkUser()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <main className="p-10">Loading...</main>

  const isAdminUser = profile?.role === 'admin'

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border rounded hover:bg-gray-50 cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <p className="text-sm text-gray-600">Login sebagai:</p>
        <p className="font-semibold">{profile?.full_name || user?.email}</p>
        <p className="text-xs text-gray-500 mt-1">
          Role:{' '}
          <span
            className={
              isAdminUser ? 'text-emerald-700 font-bold' : 'text-blue-700 font-bold'
            }
          >
            {profile?.role || 'unknown'}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/artikel" className="no-underline">
          <div className="p-6 border rounded-lg hover:shadow-lg transition cursor-pointer">
            <h3 className="font-semibold text-lg mb-1">📰 Artikel</h3>
            <p className="text-sm text-gray-600">Kelola berita & artikel</p>
          </div>
        </Link>

        <Link href="/admin/events" className="no-underline">
          <div className="p-6 border rounded-lg hover:shadow-lg transition cursor-pointer">
            <h3 className="font-semibold text-lg mb-1">📅 Events</h3>
            <p className="text-sm text-gray-600">Kelola agenda & kegiatan</p>
          </div>
        </Link>

        <Link href="/admin/ldk" className="no-underline">
          <div className="p-6 border rounded-lg hover:shadow-lg transition cursor-pointer">
            <h3 className="font-semibold text-lg mb-1">🏛️ LDK</h3>
            <p className="text-sm text-gray-600">Kelola direktori LDK</p>
          </div>
        </Link>

        <Link href="/admin/pengurus" className="no-underline">
          <div className="p-6 border rounded-lg hover:shadow-lg transition cursor-pointer">
            <h3 className="font-semibold text-lg mb-1">👤 Pengurus</h3>
            <p className="text-sm text-gray-600">Kelola struktur kepengurusan</p>
          </div>
        </Link>

        <Link href="/admin/program" className="no-underline">
          <div className="p-6 border rounded-lg hover:shadow-lg transition cursor-pointer">
            <h3 className="font-semibold text-lg mb-1">📋 Program</h3>
            <p className="text-sm text-gray-600">Kelola program kerja</p>
          </div>
        </Link>

        <Link href="/admin/galeri" className="no-underline">
          <div className="p-6 border rounded-lg hover:shadow-lg transition cursor-pointer">
            <h3 className="font-semibold text-lg mb-1">📸 Galeri</h3>
            <p className="text-sm text-gray-600">Kelola dokumentasi foto</p>
          </div>
        </Link>

        {/* Card Pesan Masuk */}
        <Link href="/admin/pesan" className="no-underline">
          <div className="p-6 border rounded-lg hover:shadow-lg transition cursor-pointer bg-yellow-50 border-yellow-300">
            <h3 className="font-semibold text-lg mb-1">✉️ Pesan Masuk</h3>
            <p className="text-sm text-gray-600">Baca & kelola pesan dari pengunjung</p>
          </div>
        </Link>

        {/* Card Kelola Users (Khusus Admin) */}
        {isAdminUser && (
          <Link href="/admin/users" className="no-underline">
            <div className="p-6 border rounded-lg hover:shadow-lg transition cursor-pointer bg-emerald-50 border-emerald-300">
              <h3 className="font-semibold text-lg mb-1">👥 Users</h3>
              <p className="text-sm text-gray-600">Kelola user & role (khusus admin)</p>
            </div>
          </Link>
        )}
      </div>
    </main>
  )
}