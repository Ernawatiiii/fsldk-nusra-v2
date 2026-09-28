'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload from '@/app/components/ImageUpload'

export default function EditEvent() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }

      const { data, error } = await supabase.from('events').select('*').eq('id', id).single()
      if (error || !data) { setMessage('❌ Event tidak ditemukan'); setLoading(false); return }

      setTitle(data.title)
      setSlug(data.slug)
      setDescription(data.description || '')
      setContent(data.content || '')
      setLocation(data.location || '')
      setStartDate(data.start_date ? data.start_date.slice(0, 16) : '')
      setEndDate(data.end_date ? data.end_date.slice(0, 16) : '')
      setCoverImage(data.cover_image || '')
      setPublished(data.published)
      setLoading(false)
    }
    load()
  }, [id, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setMessage('')

    const { error } = await supabase.from('events').update({
      title, slug, description, content, location,
      start_date: startDate || null,
      end_date: endDate || null,
      cover_image: coverImage,
      published,
    }).eq('id', id)

    if (error) { setMessage(`❌ ${error.message}`); setSaving(false); return }
    setMessage('✅ Tersimpan!')
    setTimeout(() => router.push('/admin/events'), 1000)
  }

  async function handleDelete() {
    if (!confirm('Yakin hapus event ini?')) return
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) { setMessage(`❌ ${error.message}`); return }
    router.push('/admin/events')
  }

  if (loading) return <main style={{ padding: 40 }}>Loading...</main>

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 700 }}>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>Judul
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Slug
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Cover Image
          <ImageUpload value={coverImage} onChange={setCoverImage} folder="event" />
        </label>
        <label>Deskripsi
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Isi
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Lokasi
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Mulai
          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Selesai
          <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Publish
        </label>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={saving} style={{ padding: 12, cursor: 'pointer' }}>
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button type="button" onClick={handleDelete} style={{ padding: 12, cursor: 'pointer', background: '#fee', color: '#c00' }}>
            Hapus
          </button>
        </div>
      </form>
      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </main>
  )
}