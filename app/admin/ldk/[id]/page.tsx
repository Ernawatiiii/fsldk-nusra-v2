'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'

export default function EditLdk() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [campus, setCampus] = useState('')
  const [city, setCity] = useState('')
  const [description, setDescription] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }

      const { data, error } = await supabase.from('ldk').select('*').eq('id', id).single()
      if (error || !data) { setMessage('❌ Tidak ditemukan'); setLoading(false); return }

      setName(data.name); setSlug(data.slug); setCampus(data.campus || '')
      setCity(data.city || ''); setDescription(data.description || '')
      setLogoUrl(data.logo_url || ''); setInstagramUrl(data.instagram_url || '')
      setWebsiteUrl(data.website_url || ''); setActive(data.active)
      setLoading(false)
    }
    load()
  }, [id, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setMessage('')

    const { error } = await supabase.from('ldk').update({
      name, slug, campus, city, description,
      logo_url: logoUrl, instagram_url: instagramUrl, website_url: websiteUrl, active,
    }).eq('id', id)

    if (error) { setMessage(`❌ ${error.message}`); setSaving(false); return }
    setMessage('✅ Tersimpan!')
    setTimeout(() => router.push('/admin/ldk'), 1000)
  }

  async function handleDelete() {
    if (!confirm('Yakin hapus LDK ini?')) return
    const { error } = await supabase.from('ldk').delete().eq('id', id)
    if (error) { setMessage(`❌ ${error.message}`); return }
    router.push('/admin/ldk')
  }

  if (loading) return <main style={{ padding: 40 }}>Loading...</main>

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 700 }}>
      <h1>Edit LDK</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>Nama
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Slug
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required style={{ width: '100%', padding: 8 }} />
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
        <label>Logo URL
          <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Instagram
          <input type="text" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>
        <label>Website
          <input type="text" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          Aktif
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