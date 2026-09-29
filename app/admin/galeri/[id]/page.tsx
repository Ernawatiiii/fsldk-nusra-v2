'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload from '@/app/components/ImageUpload'

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
      if (error || !data) { setMessage('❌ Tidak ditemukan'); setLoading(false); return }

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

    if (error) { setMessage(`❌ ${error.message}`); setSaving(false); return }
    setMessage('✅ Tersimpan!')
    setTimeout(() => router.push('/admin/galeri'), 1000)
  }

  async function handleDelete() {
    if (!confirm('Yakin hapus?')) return
    const { error } = await supabase.from('galeri').delete().eq('id', id)
    if (error) { setMessage(`❌ ${error.message}`); return }
    router.push('/admin/galeri')
  }

  if (loading) return <main className="p-10">Loading...</main>

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Foto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>Judul
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded" />
        </label>
        <label>Gambar
          <ImageUpload value={imageUrl} onChange={setImageUrl} folder="galeri" />
        </label>
        <label>Kategori
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded" />
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
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="px-4 py-3 bg-emerald-600 text-white rounded cursor-pointer">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button type="button" onClick={handleDelete} className="px-4 py-3 border rounded cursor-pointer text-red-600">
            Hapus
          </button>
        </div>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  )
}