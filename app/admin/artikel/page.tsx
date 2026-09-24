'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ArtikelList() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) setArticles(data || [])
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) return <main style={{ padding: 40 }}>Loading...</main>

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Kelola Artikel</h1>
      <Link href="/admin/artikel/baru">
        <button style={{ padding: 10, marginBottom: 20, cursor: 'pointer' }}>
          + Tambah Artikel
        </button>
      </Link>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
            <th style={{ padding: 8 }}>Judul</th>
            <th style={{ padding: 8 }}>Status</th>
            <th style={{ padding: 8 }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>{a.title}</td>
              <td style={{ padding: 8 }}>{a.published ? '✅ Publish' : '📝 Draft'}</td>
              <td style={{ padding: 8 }}>
                <Link href={`/admin/artikel/${a.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {articles.length === 0 && <p>Belum ada artikel.</p>}

      <Link href="/admin">
        <p style={{ marginTop: 20 }}>← Balik ke Dashboard</p>
      </Link>
    </main>
  )
}