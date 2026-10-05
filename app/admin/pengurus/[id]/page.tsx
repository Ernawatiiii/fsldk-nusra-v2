'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/app/components/ImageUpload'
import StatusMessage from '@/app/components/StatusMessage'

export default function EditPengurus() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [period, setPeriod] = useState('')
  const [division, setDivision] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [orderIndex, setOrderIndex] = useState(0)
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }

      const { data, error } = await supabase.from('pengurus').select('*').eq('id', id).single()
      if (error || !data) { setMessage('Tidak ditemukan'); setLoading(false); return }

      setName(data.name); setPosition(data.position); setPeriod(data.period || '')
      setDivision(data.division || ''); setPhotoUrl(data.photo_url || '')
      setInstagramUrl(data.instagram_url || ''); setOrderIndex(data.order_index || 0)
      setActive(data.active); setLoading(false)
    }
    load()
  }, [id, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setMessage('')

    const { error } = await supabase.from('pengurus').update({
      name, position, period, division,
      photo_url: photoUrl, instagram_url: instagramUrl,
      order_index: orderIndex, active,
    }).eq('id', id)

    if (error) { setMessage(error.message); setSaving(false); return }
    setMessage('Tersimpan!')
    setTimeout(() => router.push('/admin/pengurus'), 1000)
  }

  async function handleDelete() {
    if (!confirm('Yakin hapus?')) return
    const { error } = await supabase.from('pengurus').delete().eq('id', id)
    if (error) { setMessage(error.message); return }
    router.push('/admin/pengurus')
  }

  if (loading) return <main className="max-w-3xl mx-auto px-6 py-10"><p className="text-nusra-muted font-bold">Loading...</p></main>

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href="/admin/pengurus" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Pengurus</Link>
        <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Edit Pengurus</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Nama</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Jabatan</span>
            <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Divisi</span>
            <input type="text" value={division} onChange={(e) => setDivision(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Periode</span>
            <input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Urutan</span>
            <input type="number" value={orderIndex} onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Foto</span>
          <ImageUpload value={photoUrl} onChange={setPhotoUrl} folder="pengurus" />
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Instagram URL</span>
          <input type="text" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex items-center gap-3 bg-nusra-sand p-4 rounded-xl cursor-pointer">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="w-5 h-5 cursor-pointer" />
          <span className="font-bold">Aktif</span>
        </label>

        <div className="flex gap-3 pt-2 flex-wrap">
          <button type="submit" disabled={saving} className="bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all disabled:opacity-50 cursor-pointer">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
          <Link href="/admin/pengurus" className="border-2 border-nusra/20 text-nusra px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:border-nusra transition flex items-center">
            Batal
          </Link>
          <button type="button" onClick={handleDelete} className="bg-red-50 text-red-600 px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-red-100 transition cursor-pointer ml-auto">
            Hapus
          </button>
        </div>

        {message && <StatusMessage message={message} />}
      </form>
    </main>
  )
}