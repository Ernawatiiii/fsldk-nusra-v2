'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { HiOutlineMail } from 'react-icons/hi'

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

  if (loading) return <main className="max-w-7xl mx-auto px-6 py-10"><p className="text-nusra-muted font-bold">Loading...</p></main>

  const unread = items.filter((p) => !p.read).length

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href="/admin" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Dashboard</Link>
        <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Pesan Masuk</h1>
        <p className="text-nusra-muted mt-1">
          {items.length} pesan total
          {unread > 0 && <span className="ml-2 inline-block bg-nusra-gold text-nusra-dark px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">{unread} belum dibaca</span>}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LIST */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden max-h-[700px] overflow-y-auto">
            {items.length === 0 && <p className="p-6 text-nusra-muted text-sm">Belum ada pesan.</p>}
            {items.map((p) => (
              <button
                key={p.id}
                onClick={() => openPesan(p)}
                className={`w-full text-left p-5 border-b border-gray-100 hover:bg-nusra-sand/50 transition cursor-pointer ${selected?.id === p.id ? 'bg-nusra-sand border-l-4 border-l-nusra-gold' : ''}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {!p.read && <span className="w-2 h-2 bg-nusra-gold rounded-full flex-shrink-0"></span>}
                  <span className="font-black text-sm truncate">{p.name}</span>
                </div>
                <p className="text-sm text-nusra-ink/80 truncate mb-1">{p.subject}</p>
                <p className="text-xs text-nusra-muted">
                  {new Date(p.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* DETAIL */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 min-h-[400px]">
            {!selected && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-nusra/5 text-nusra/40 mb-4">
                  <HiOutlineMail className="w-10 h-10" />
                </div>
                <p className="text-nusra-muted">Pilih pesan untuk dibaca</p>
              </div>
            )}
            {selected && (
              <div>
                <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-3">Pesan</p>
                <h2 className="font-black text-2xl md:text-3xl leading-tight mb-4">{selected.subject}</h2>

                <div className="bg-nusra-sand rounded-xl p-4 mb-6">
                  <p className="text-sm"><strong>Dari:</strong> {selected.name}</p>
                  <p className="text-sm text-nusra-muted">{selected.email}</p>
                  <p className="text-xs text-nusra-muted mt-2">
                    {new Date(selected.created_at).toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="leading-relaxed whitespace-pre-wrap text-nusra-ink/80 mb-8">
                  {selected.message}
                </div>

                <div className="flex gap-3 flex-wrap">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="bg-nusra text-white px-6 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:bg-nusra-gold hover:text-nusra-dark transition"
                  >
                    Balas via Email
                  </a>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="bg-red-50 text-red-600 px-6 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:bg-red-100 transition cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}