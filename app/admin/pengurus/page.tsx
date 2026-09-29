'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PengurusList() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }
      const { data } = await supabase.from('pengurus').select('*').order('order_index')
      setItems(data || [])
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) return <main className="p-10">Loading...</main>

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Kelola Pengurus</h1>
      <Link href="/admin/pengurus/baru">
        <button className="px-4 py-2 bg-emerald-600 text-white rounded mb-6 cursor-pointer">
          + Tambah Pengurus
        </button>
      </Link>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-300 text-left">
            <th className="p-2">Nama</th>
            <th className="p-2">Jabatan</th>
            <th className="p-2">Divisi</th>
            <th className="p-2">Periode</th>
            <th className="p-2">Status</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id} className="border-b border-gray-200">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.position}</td>
              <td className="p-2">{p.division}</td>
              <td className="p-2">{p.period}</td>
              <td className="p-2">{p.active ? '✅' : '❌'}</td>
              <td className="p-2"><Link href={`/admin/pengurus/${p.id}`} className="text-emerald-700">Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>

      {items.length === 0 && <p className="text-gray-500 mt-4">Belum ada pengurus.</p>}

      <Link href="/admin" className="inline-block mt-6 text-emerald-700 hover:underline">← Balik</Link>
    </main>
  )
}