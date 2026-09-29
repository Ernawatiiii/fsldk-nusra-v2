'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload from '@/app/components/ImageUpload'

export default function EditProgram() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [status, setStatus] = useState('akan-datang')
  const [period, setPeriod] = useState('')
  const [orderIndex, setOrderIndex] = useState(0)
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }

      const { data, error } = await supabase.from('program').select('*').eq('id', id).single()
      if (error || !data) { setMessage('❌ Tidak ditemukan'); setLoading(false); return }

      setTitle(data.title); setSlug(data.slug)
      setDescription(data.description || ''); setContent(data.content || '')
      setCoverImage(data.cover_image || ''); setStatus(data.status || 'akan-datang')
      setPeriod(data.period || ''); setOrderIndex(data.order_index || 0)
      setPublished(data.published); setLoading(false)
    }
    load()
  }, [id, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setMessage('')

    const { error } = await supabase.from('program').update({
      title, slug, description, content,
      cover_image: coverImage, status, period,
      order_index: orderIndex, published,
    }).eq('id', id)

    if (error) { setMessage(`❌ ${error.message}`); setSaving(false); return }
    setMessage('✅ Tersimpan!')
    setTimeout(() => router.push('/admin/program'), 1000)
  }

  async function handleDelete() {
    if (!confirm('Yakin hapus?')) return
    const { error } = await supabase.from('program').delete().eq('id', id)
    if (error) { setMessage(`❌ ${error.message}`); return }
    router.push('/admin/program')
  }

  if (loading) return <main className="p-10">Loading...</main>

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Program</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>Judul
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded" />
        </label>
        <label>Slug
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full p-2 border rounded" />
        </label>
        <label>Cover Image
          <ImageUpload value={coverImage} onChange={setCoverImage} folder="program" />
        </label>
        <label>Deskripsi
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full p-2 border rounded" />
        </label>
        <label>Isi
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
          <input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full p-2 border rounded" />
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