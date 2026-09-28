'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/app/components/ImageUpload'

export default function EventBaru() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [coverImage, setCoverImage] = useState('')
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
    setLoading(true)
    setMessage('')

    const { error } = await supabase.from('events').insert({
      title, slug, description, content, location,
      start_date: startDate || null,
      end_date: endDate || null,
      cover_image: coverImage,
      published,
    })

    if (error) { setMessage(`❌ ${error.message}`); setLoading(false); return }
    setMessage('✅ Event tersimpan!')
    setTimeout(() => router.push('/admin/events'), 1000)
  }

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 700 }}>
      <h1>Tambah Event</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>Judul
          <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Slug
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Cover Image
          <ImageUpload value={coverImage} onChange={setCoverImage} folder="event" />
        </label>
        <label>Deskripsi Singkat
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Isi Lengkap
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Lokasi
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Tanggal Mulai
          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Tanggal Selesai
          <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Publish langsung
        </label>
        <button type="submit" disabled={loading} style={{ padding: 12, cursor: 'pointer' }}>
          {loading ? 'Menyimpan...' : 'Simpan Event'}
        </button>
      </form>
      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </main>
  )
}