'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const statusLabel: Record<string, string> = {
  'akan-datang': '🕐 Akan Datang',
  'berlangsung': '🔥 Berlangsung',
  'selesai': '✅ Selesai',
}

export default function ProgramList() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }
      const { data } = await supabase.from('program').select('*').order('order_index')
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
          <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Program</h1>
          <p className="text-nusra-muted mt-1">{items.length} program terdaftar</p>
        </div>
        <Link href="/admin/program/baru" className="bg-nusra text-white px-6 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:bg-nusra-gold hover:text-nusra-dark transition">
          + Tambah Program
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-nusra/20">
          <p className="text-nusra-muted">Belum ada program.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-nusra-sand text-left">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-nusra-muted">Judul</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-nusra-muted">Status</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-nusra-muted">Periode</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-nusra-muted">Publish</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-nusra-muted text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.id} className="border-t border-gray-100 hover:bg-nusra-sand/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {p.cover_image ? (
                          <img src={p.cover_image} alt={p.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-nusra/5 flex items-center justify-center text-nusra/20 text-xs flex-shrink-0">-</div>
                        )}
                        <p className="font-bold text-sm truncate max-w-xs">{p.title}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{statusLabel[p.status] || p.status}</td>
                    <td className="px-6 py-4 text-sm text-nusra-muted">{p.period || '-'}</td>
                    <td className="px-6 py-4">
                      {p.published ? (
                        <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">Publish</span>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">Draft</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/program/${p.id}`} className="inline-block bg-nusra/10 text-nusra px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider hover:bg-nusra hover:text-white transition">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  )
}