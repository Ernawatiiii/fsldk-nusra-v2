'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/app/components/ImageUpload'
import StatusMessage from '@/app/components/StatusMessage'

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
    if (!imageUrl) { setMessage('Upload gambar dulu'); return }
    setLoading(true); setMessage('')

    const { error } = await supabase.from('galeri').insert({
      title, description, image_url: imageUrl,
      category, order_index: orderIndex, published,
    })

    if (error) { setMessage(error.message); setLoading(false); return }
    setMessage('Tersimpan!')
    setTimeout(() => router.push('/admin/galeri'), 1000)
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href="/admin/galeri" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Galeri</Link>
        <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Tambah Foto</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Judul</span>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Gambar</span>
          <ImageUpload value={imageUrl} onChange={setImageUrl} folder="galeri" />
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Kategori</span>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Rapimda, Jambore, Sosial..." className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Deskripsi</span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Urutan</span>
          <input type="number" value={orderIndex} onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex items-center gap-3 bg-nusra-sand p-4 rounded-xl cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-5 h-5 cursor-pointer" />
          <span className="font-bold">Publish</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all disabled:opacity-50 cursor-pointer">
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <Link href="/admin/galeri" className="border-2 border-nusra/20 text-nusra px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:border-nusra transition flex items-center">
            Batal
          </Link>
        </div>

        {message && <StatusMessage message={message} />}
      </form>
    </main>
  )
}