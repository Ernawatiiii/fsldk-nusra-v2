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

  if (loading) return <main className="max-w-7xl mx-auto px-6 py-10"><p className="text-nusra-muted font-bold">Loading...</p></main>

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <Link href="/admin" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Dashboard</Link>
          <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Galeri</h1>
          <p className="text-nusra-muted mt-1">{items.length} foto terdaftar</p>
        </div>
        <Link href="/admin/galeri/baru" className="bg-nusra text-white px-6 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:bg-nusra-gold hover:text-nusra-dark transition">
          + Tambah Foto
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-nusra/20">
          <p className="text-nusra-muted">Belum ada foto.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((g) => (
            <Link key={g.id} href={`/admin/galeri/${g.id}`} className="no-underline text-inherit group">
              <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-nusra-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                {g.image_url && (
                  <img src={g.image_url} alt={g.title} className="w-full h-36 object-cover" />
                )}
                <div className="p-3">
                  <p className="font-bold text-sm truncate">{g.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    {g.category && <p className="text-xs text-nusra-muted truncate">{g.category}</p>}
                    <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${g.published ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}