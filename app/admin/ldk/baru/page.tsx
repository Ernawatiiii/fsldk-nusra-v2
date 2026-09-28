'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/app/components/ImageUpload'

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
    setLoading(true)
    setMessage('')

    const { error } = await supabase.from('ldk').insert({
      name, slug, campus, city, description,
      logo_url: logoUrl, instagram_url: instagramUrl, website_url: websiteUrl, active,
    })

    if (error) { setMessage(`❌ ${error.message}`); setLoading(false); return }
    setMessage('✅ LDK tersimpan!')
    setTimeout(() => router.push('/admin/ldk'), 1000)
  }

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 700 }}>
      <h1>Tambah LDK</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>Nama LDK
          <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Slug
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Logo
          <ImageUpload value={logoUrl} onChange={setLogoUrl} folder="ldk" />
        </label>
        <label>Kampus
          <input type="text" value={campus} onChange={(e) => setCampus(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Kota
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Deskripsi
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Instagram URL
          <input type="text" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Website URL
          <input type="text" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          Aktif
        </label>
        <button type="submit" disabled={loading} style={{ padding: 12, cursor: 'pointer' }}>
          {loading ? 'Menyimpan...' : 'Simpan LDK'}
        </button>
      </form>
      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </main>
  )
}