'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/app/components/ImageUpload'
import StatusMessage from '@/app/components/StatusMessage'

export default function ArtikelBaru() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
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

    const { error } = await supabase.from('articles').insert({
      title, slug, excerpt, content,
      cover_image: coverImage,
      published,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    setMessage('Artikel berhasil disimpan!')
    setTimeout(() => router.push('/admin/artikel'), 1000)
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href="/admin/artikel" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Artikel</Link>
        <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Tambah Artikel</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Judul</span>
          <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" placeholder="Judul artikel..." />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Slug (URL)</span>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition font-mono text-sm" placeholder="judul-artikel" />
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Cover Image</span>
          <ImageUpload value={coverImage} onChange={setCoverImage} folder="artikel" />
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Ringkasan</span>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" placeholder="Ringkasan singkat artikel..." />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Isi Artikel</span>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" placeholder="Tulis isi artikel di sini..." />
        </label>

        <label className="flex items-center gap-3 bg-nusra-sand p-4 rounded-xl cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-5 h-5 cursor-pointer" />
          <span className="font-bold">Publish langsung</span>
          <span className="text-xs text-nusra-muted ml-auto">
            {published ? 'Publik bisa baca' : 'Simpan sebagai draft'}
          </span>
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all disabled:opacity-50 cursor-pointer">
            {loading ? 'Menyimpan...' : 'Simpan Artikel'}
          </button>
          <Link href="/admin/artikel" className="border-2 border-nusra/20 text-nusra px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:border-nusra transition flex items-center">
            Batal
          </Link>
        </div>

        {message && <StatusMessage message={message} />}
      </form>
    </main>
  )
}