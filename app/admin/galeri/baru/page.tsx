'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/app/components/ImageUpload'

export default function GaleriBaru() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [category, setCategory] = useState('')
  const [orderIndex, setOrderIndex] = useState(0)
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!imageUrl) { setMessage('❌ Upload gambar dulu'); return }
    setLoading(true); setMessage('')

    const { error } = await supabase.from('galeri').insert({
      title, description, image_url: imageUrl,
      category, order_index: orderIndex, published,
    })

    if (error) { setMessage(`❌ ${error.message}`); setLoading(false); return }
    setMessage('✅ Tersimpan!')
    setTimeout(() => router.push('/admin/galeri'), 1000)
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Tambah Foto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>Judul
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded" />
        </label>
        <label>Gambar
          <ImageUpload value={imageUrl} onChange={setImageUrl} folder="galeri" />
        </label>
        <label>Kategori
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Rapimda, Jambore, dll" className="w-full p-2 border rounded" />
        </label>
        <label>Deskripsi
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full p-2 border rounded" />
        </label>
        <label>Urutan
          <input type="number" value={orderIndex} onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)} className="w-full p-2 border rounded" />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Publish
        </label>
        <button type="submit" disabled={loading} className="px-4 py-3 bg-emerald-600 text-white rounded cursor-pointer">
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  )
}