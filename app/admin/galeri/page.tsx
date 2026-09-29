'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function GaleriList() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }
      const { data } = await supabase.from('galeri').select('*').order('order_index')
      setItems(data || [])
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) return <main className="p-10">Loading...</main>

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Kelola Galeri</h1>
      <Link href="/admin/galeri/baru">
        <button className="px-4 py-2 bg-emerald-600 text-white rounded mb-6 cursor-pointer">
          + Tambah Foto
        </button>
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((g) => (
          <Link key={g.id} href={`/admin/galeri/${g.id}`} className="no-underline text-inherit">
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
              {g.image_url && (
                <img src={g.image_url} alt={g.title} className="w-full h-32 object-cover" />
              )}
              <div className="p-2">
                <p className="text-sm font-semibold truncate">{g.title}</p>
                <p className="text-xs text-gray-500">{g.category}</p>
                <p className="text-xs">{g.published ? '✅' : '📝'}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {items.length === 0 && <p className="text-gray-500 mt-4">Belum ada foto.</p>}

      <Link href="/admin" className="inline-block mt-6 text-emerald-700 hover:underline">← Balik</Link>
    </main>
  )
}