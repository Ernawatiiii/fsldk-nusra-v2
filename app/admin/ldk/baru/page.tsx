'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/app/components/ImageUpload'
import StatusMessage from '@/app/components/StatusMessage'

export default function LdkBaru() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [campus, setCampus] = useState('')
  const [city, setCity] = useState('')
  const [description, setDescription] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  function generateSlug(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  function handleNameChange(value: string) {
    setName(value)
    setSlug(generateSlug(value))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setMessage('')

    const { error } = await supabase.from('ldk').insert({
      name, slug, campus, city, description,
      logo_url: logoUrl, instagram_url: instagramUrl, website_url: websiteUrl, active,
    })

    if (error) { setMessage(error.message); setLoading(false); return }
    setMessage('LDK tersimpan!')
    setTimeout(() => router.push('/admin/ldk'), 1000)
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href="/admin/ldk" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← LDK</Link>
        <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Tambah LDK</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Nama LDK</span>
          <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Slug</span>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition font-mono text-sm" />
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Logo</span>
          <ImageUpload value={logoUrl} onChange={setLogoUrl} folder="ldk" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Kampus</span>
            <input type="text" value={campus} onChange={(e) => setCampus(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Kota</span>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Deskripsi</span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Instagram URL</span>
            <input type="text" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} placeholder="https://instagram.com/..." className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Website URL</span>
            <input type="text" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://..." className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
          </label>
        </div>

        <label className="flex items-center gap-3 bg-nusra-sand p-4 rounded-xl cursor-pointer">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="w-5 h-5 cursor-pointer" />
          <span className="font-bold">LDK Aktif</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all disabled:opacity-50 cursor-pointer">
            {loading ? 'Menyimpan...' : 'Simpan LDK'}
          </button>
          <Link href="/admin/ldk" className="border-2 border-nusra/20 text-nusra px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:border-nusra transition flex items-center">
            Batal
          </Link>
        </div>

        {message && <StatusMessage message={message} />}
      </form>
    </main>
  )
}