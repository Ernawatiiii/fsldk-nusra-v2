'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/app/components/ImageUpload'
import StatusMessage from '@/app/components/StatusMessage'

export default function EditArtikel() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }

      const { data, error } = await supabase.from('articles').select('*').eq('id', id).single()
      if (error || !data) { setMessage('Artikel tidak ditemukan'); setLoading(false); return }

      setTitle(data.title)
      setSlug(data.slug)
      setExcerpt(data.excerpt || '')
      setContent(data.content || '')
      setCoverImage(data.cover_image || '')
      setPublished(data.published)
      setLoading(false)
    }
    load()
  }, [id, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setMessage('')

    const { error } = await supabase
      .from('articles')
      .update({ title, slug, excerpt, content, cover_image: coverImage, published })
      .eq('id', id)

    if (error) { setMessage(error.message); setSaving(false); return }
    setMessage('Tersimpan!')
    setTimeout(() => router.push('/admin/artikel'), 1000)
  }

  async function handleDelete() {
    if (!confirm('Yakin mau hapus artikel ini?')) return
    const { error } = await supabase.from('articles').delete().eq('id', id)
    if (error) { setMessage(error.message); return }
    router.push('/admin/artikel')
  }

  if (loading) return <main className="max-w-3xl mx-auto px-6 py-10"><p className="text-nusra-muted font-bold">Loading...</p></main>

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href="/admin/artikel" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Artikel</Link>
        <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Edit Artikel</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Judul</span>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Slug (URL)</span>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition font-mono text-sm" />
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Cover Image</span>
          <ImageUpload value={coverImage} onChange={setCoverImage} folder="artikel" />
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Ringkasan</span>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Isi Artikel</span>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex items-center gap-3 bg-nusra-sand p-4 rounded-xl cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-5 h-5 cursor-pointer" />
          <span className="font-bold">Publish</span>
          <span className="text-xs text-nusra-muted ml-auto">
            {published ? 'Publik bisa baca' : 'Simpan sebagai draft'}
          </span>
        </label>

        <div className="flex gap-3 pt-2 flex-wrap">
          <button type="submit" disabled={saving} className="bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all disabled:opacity-50 cursor-pointer">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
          <Link href="/admin/artikel" className="border-2 border-nusra/20 text-nusra px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:border-nusra transition flex items-center">
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