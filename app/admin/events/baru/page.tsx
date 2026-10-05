'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/app/components/ImageUpload'
import StatusMessage from '@/app/components/StatusMessage'

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
    setLoading(true); setMessage('')

    const { error } = await supabase.from('events').insert({
      title, slug, description, content, location,
      start_date: startDate || null,
      end_date: endDate || null,
      cover_image: coverImage,
      published,
    })

    if (error) { setMessage(error.message); setLoading(false); return }
    setMessage('Event tersimpan!')
    setTimeout(() => router.push('/admin/events'), 1000)
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href="/admin/events" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Events</Link>
        <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Tambah Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Judul</span>
          <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Slug</span>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition font-mono text-sm" />
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Cover Image</span>
          <ImageUpload value={coverImage} onChange={setCoverImage} folder="event" />
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Deskripsi Singkat</span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Isi Lengkap</span>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Lokasi</span>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Tanggal Mulai</span>
            <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Tanggal Selesai</span>
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
          </label>
        </div>

        <label className="flex items-center gap-3 bg-nusra-sand p-4 rounded-xl cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-5 h-5 cursor-pointer" />
          <span className="font-bold">Publish langsung</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all disabled:opacity-50 cursor-pointer">
            {loading ? 'Menyimpan...' : 'Simpan Event'}
          </button>
          <Link href="/admin/events" className="border-2 border-nusra/20 text-nusra px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:border-nusra transition flex items-center">
            Batal
          </Link>
        </div>

        {message && <StatusMessage message={message} />}
      </form>
    </main>
  )
}