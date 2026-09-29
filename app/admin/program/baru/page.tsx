'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/app/components/ImageUpload'

export default function ProgramBaru() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [status, setStatus] = useState('akan-datang')
  const [period, setPeriod] = useState('')
  const [orderIndex, setOrderIndex] = useState(0)
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  function generateSlug(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  function handleTitleChange(value: string) {
    setTitle(value)
    setSlug(generateSlug(value))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setMessage('')

    const { error } = await supabase.from('program').insert({
      title, slug, description, content,
      cover_image: coverImage, status, period,
      order_index: orderIndex, published,
    })

    if (error) { setMessage(`❌ ${error.message}`); setLoading(false); return }
    setMessage('✅ Tersimpan!')
    setTimeout(() => router.push('/admin/program'), 1000)
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Tambah Program</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>Judul
          <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} required className="w-full p-2 border rounded" />
        </label>
        <label>Slug
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full p-2 border rounded" />
        </label>
        <label>Cover Image
          <ImageUpload value={coverImage} onChange={setCoverImage} folder="program" />
        </label>
        <label>Deskripsi Singkat
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full p-2 border rounded" />
        </label>
        <label>Isi Lengkap
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} className="w-full p-2 border rounded" />
        </label>
        <label>Status
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border rounded">
            <option value="akan-datang">Akan Datang</option>
            <option value="berlangsung">Berlangsung</option>
            <option value="selesai">Selesai</option>
          </select>
        </label>
        <label>Periode
          <input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="2024-2026" className="w-full p-2 border rounded" />
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