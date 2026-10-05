'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/app/components/ImageUpload'
import StatusMessage from '@/app/components/StatusMessage'

export default function EditGaleri() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [category, setCategory] = useState('')
  const [orderIndex, setOrderIndex] = useState(0)
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }

      const { data, error } = await supabase.from('galeri').select('*').eq('id', id).single()
      if (error || !data) { setMessage('Tidak ditemukan'); setLoading(false); return }

      setTitle(data.title); setDescription(data.description || '')
      setImageUrl(data.image_url || ''); setCategory(data.category || '')
      setOrderIndex(data.order_index || 0); setPublished(data.published)
      setLoading(false)
    }
    load()
  }, [id, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setMessage('')

    const { error } = await supabase.from('galeri').update({
      title, description, image_url: imageUrl,
      category, order_index: orderIndex, published,
    }).eq('id', id)

    if (error) { setMessage(error.message); setSaving(false); return }
    setMessage('Tersimpan!')
    setTimeout(() => router.push('/admin/galeri'), 1000)
  }

  async function handleDelete() {
    if (!confirm('Yakin hapus?')) return
    const { error } = await supabase.from('galeri').delete().eq('id', id)
    if (error) { setMessage(error.message); return }
    router.push('/admin/galeri')
  }

  if (loading) return <main className="max-w-3xl mx-auto px-6 py-10"><p className="text-nusra-muted font-bold">Loading...</p></main>

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href="/admin/galeri" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Galeri</Link>
        <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Edit Foto</h1>
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
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
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

        <div className="flex gap-3 pt-2 flex-wrap">
          <button type="submit" disabled={saving} className="bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all disabled:opacity-50 cursor-pointer">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
          <Link href="/admin/galeri" className="border-2 border-nusra/20 text-nusra px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:border-nusra transition flex items-center">
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