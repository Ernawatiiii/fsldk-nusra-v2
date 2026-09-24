'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LdkList() {
  const [ldks, setLdks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }

      const { data } = await supabase.from('ldk').select('*').order('name')
      setLdks(data || [])
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) return <main style={{ padding: 40 }}>Loading...</main>

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Kelola LDK</h1>
      <Link href="/admin/ldk/baru">
        <button style={{ padding: 10, marginBottom: 20, cursor: 'pointer' }}>+ Tambah LDK</button>
      </Link>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
            <th style={{ padding: 8 }}>Nama</th>
            <th style={{ padding: 8 }}>Kampus</th>
            <th style={{ padding: 8 }}>Kota</th>
            <th style={{ padding: 8 }}>Status</th>
            <th style={{ padding: 8 }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {ldks.map((l) => (
            <tr key={l.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>{l.name}</td>
              <td style={{ padding: 8 }}>{l.campus}</td>
              <td style={{ padding: 8 }}>{l.city}</td>
              <td style={{ padding: 8 }}>{l.active ? '✅ Aktif' : '❌ Nonaktif'}</td>
              <td style={{ padding: 8 }}><Link href={`/admin/ldk/${l.id}`}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>

      {ldks.length === 0 && <p>Belum ada LDK.</p>}

      <Link href="/admin"><p style={{ marginTop: 20 }}>← Balik ke Dashboard</p></Link>
    </main>
  )
}