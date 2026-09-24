'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }
      setLoading(false)
    }
    getUser()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <main style={{ padding: 40 }}>Loading...</main>

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Admin Dashboard</h1>
      <p>Login sebagai: <strong>{user?.email}</strong></p>

      <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
        <Link href="/admin/artikel" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ padding: 24, border: '1px solid #ccc', borderRadius: 8, cursor: 'pointer', minWidth: 200 }}>
            <h3>📰 Artikel</h3>
            <p style={{ color: '#666', margin: 0 }}>Kelola berita & artikel</p>
          </div>
        </Link>

        <Link href="/admin/events" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ padding: 24, border: '1px solid #ccc', borderRadius: 8, cursor: 'pointer', minWidth: 200 }}>
            <h3>📅 Events</h3>
            <p style={{ color: '#666', margin: 0 }}>Kelola agenda & kegiatan</p>
          </div>
        </Link>

        <Link href="/admin/ldk" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ padding: 24, border: '1px solid #ccc', borderRadius: 8, cursor: 'pointer', minWidth: 200 }}>
            <h3>🏛️ LDK</h3>
            <p style={{ color: '#666', margin: 0 }}>Kelola direktori LDK</p>
          </div>
        </Link>
      </div>

      <button onClick={handleLogout} style={{ marginTop: 40, padding: '8px 16px', cursor: 'pointer' }}>
        Logout
      </button>
    </main>
  )
}