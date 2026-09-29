'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/app/components/ImageUpload'

export default function PengurusBaru() {
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [period, setPeriod] = useState('')
  const [division, setDivision] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [orderIndex, setOrderIndex] = useState(0)
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setMessage('')

    const { error } = await supabase.from('pengurus').insert({
      name, position, period, division,
      photo_url: photoUrl, instagram_url: instagramUrl,
      order_index: orderIndex, active,
    })

    if (error) { setMessage(`❌ ${error.message}`); setLoading(false); return }
    setMessage('✅ Tersimpan!')
    setTimeout(() => router.push('/admin/pengurus'), 1000)
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Tambah Pengurus</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>Nama
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded" />
        </label>
        <label>Jabatan
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required className="w-full p-2 border rounded" />
        </label>
        <label>Divisi
          <input type="text" value={division} onChange={(e) => setDivision(e.target.value)} className="w-full p-2 border rounded" />
        </label>
        <label>Periode
          <input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="2024-2026" className="w-full p-2 border rounded" />
        </label>
        <label>Foto
          <ImageUpload value={photoUrl} onChange={setPhotoUrl} folder="pengurus" />
        </label>
        <label>Instagram URL
          <input type="text" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} className="w-full p-2 border rounded" />
        </label>
        <label>Urutan (kecil = atas)
          <input type="number" value={orderIndex} onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)} className="w-full p-2 border rounded" />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          Aktif
        </label>
        <button type="submit" disabled={loading} className="px-4 py-3 bg-emerald-600 text-white rounded cursor-pointer">
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  )
}