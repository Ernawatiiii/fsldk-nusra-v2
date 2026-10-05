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

  if (loading) return <main className="max-w-7xl mx-auto px-6 py-10"><p className="text-nusra-muted font-bold">Loading...</p></main>

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <Link href="/admin" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Dashboard</Link>
          <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Pengurus</h1>
          <p className="text-nusra-muted mt-1">{items.length} pengurus terdaftar</p>
        </div>
        <Link href="/admin/pengurus/baru" className="bg-nusra text-white px-6 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:bg-nusra-gold hover:text-nusra-dark transition">
          + Tambah Pengurus
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-nusra/20">
          <p className="text-nusra-muted">Belum ada pengurus.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((p) => (
            <Link key={p.id} href={`/admin/pengurus/${p.id}`} className="no-underline text-inherit group">
              <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-nusra-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center h-full">
                {p.photo_url ? (
                  <img src={p.photo_url} alt={p.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-nusra/5 mx-auto mb-3 flex items-center justify-center text-nusra/20 text-xs font-black">FOTO</div>
                )}
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className={`w-2 h-2 rounded-full ${p.active ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                  <h3 className="font-black text-sm truncate">{p.name}</h3>
                </div>
                <p className="text-nusra-gold text-xs font-bold uppercase tracking-wider truncate">{p.position}</p>
                {p.division && <p className="text-xs text-nusra-muted mt-1 truncate">{p.division}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}