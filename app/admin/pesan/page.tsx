'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PesanPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }
      const { data } = await supabase.from('pesan').select('*').order('created_at', { ascending: false })
      setItems(data || [])
      setLoading(false)
    }
    load()
  }, [router])

  async function openPesan(p: any) {
    setSelected(p)
    if (!p.read) {
      await supabase.from('pesan').update({ read: true }).eq('id', p.id)
      setItems((prev) => prev.map((x) => (x.id === p.id ? { ...x, read: true } : x)))
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Yakin hapus pesan ini?')) return
    const { error } = await supabase.from('pesan').delete().eq('id', id)
    if (error) { alert(error.message); return }
    setItems((prev) => prev.filter((p) => p.id !== id))
    setSelected(null)
  }

  if (loading) return <main className="p-10">Loading...</main>

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Pesan Masuk</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-2">Daftar Pesan ({items.length})</h2>
          <div className="border rounded-lg divide-y max-h-[600px] overflow-y-auto">
            {items.map((p) => (
              <button
                key={p.id}
                onClick={() => openPesan(p)}
                className={`w-full text-left p-3 hover:bg-gray-50 cursor-pointer ${selected?.id === p.id ? 'bg-emerald-50' : ''}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {!p.read && <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>}
                  <span className="font-semibold text-sm">{p.name}</span>
                </div>
                <div className="text-sm text-gray-700 truncate">{p.subject}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(p.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </div>
              </button>
            ))}
            {items.length === 0 && <p className="p-4 text-gray-500 text-sm">Belum ada pesan.</p>}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-2">Detail</h2>
          <div className="border rounded-lg p-4 min-h-[200px]">
            {!selected && <p className="text-gray-400 text-sm">Pilih pesan untuk dibaca.</p>}
            {selected && (
              <div>
                <h3 className="text-xl font-bold mb-1">{selected.subject}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Dari: <strong>{selected.name}</strong> &lt;{selected.email}&gt;
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  {new Date(selected.created_at).toLocaleString('id-ID')}
                </p>
                <div className="whitespace-pre-wrap leading-relaxed mb-6">{selected.message}</div>
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="inline-block px-4 py-2 bg-emerald-600 text-white rounded mr-2"
                >
                  Balas via Email
                </a>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="px-4 py-2 border rounded text-red-600 cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Link href="/admin" className="inline-block mt-6 text-emerald-700 hover:underline">← Balik ke Dashboard</Link>
    </main>
  )
}