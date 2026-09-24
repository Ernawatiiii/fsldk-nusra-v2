'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'

export default function EditArtikel() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !data) {
        setMessage('❌ Artikel tidak ditemukan')
        setLoading(false)
        return
      }

      setTitle(data.title)
      setSlug(data.slug)
      setExcerpt(data.excerpt || '')
      setContent(data.content || '')
      setPublished(data.published)
      setLoading(false)
    }
    load()
  }, [id, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const { error } = await supabase
      .from('articles')
      .update({ title, slug, excerpt, content, published })
      .eq('id', id)

    if (error) {
      setMessage(`❌ ${error.message}`)
      setSaving(false)
      return
    }

    setMessage('✅ Tersimpan!')
    setTimeout(() => router.push('/admin/artikel'), 1000)
  }

  async function handleDelete() {
    if (!confirm('Yakin mau hapus artikel ini?')) return

    const { error } = await supabase.from('articles').delete().eq('id', id)
    if (error) {
      setMessage(`❌ ${error.message}`)
      return
    }

    router.push('/admin/artikel')
  }

  if (loading) return <main style={{ padding: 40 }}>Loading...</main>

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 700 }}>
      <h1>Edit Artikel</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>
          Judul
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: 8, fontSize: 16 }}
          />
        </label>

        <label>
          Slug
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            style={{ width: '100%', padding: 8, fontSize: 16 }}
          />
        </label>

        <label>
          Ringkasan
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            style={{ width: '100%', padding: 8, fontSize: 16 }}
          />
        </label>

        <label>
          Isi
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
            style={{ width: '100%', padding: 8, fontSize: 16 }}
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Publish
        </label>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={saving} style={{ padding: 12, cursor: 'pointer' }}>
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            style={{ padding: 12, cursor: 'pointer', background: '#fee', color: '#c00' }}
          >
            Hapus
          </button>
        </div>
      </form>

      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </main>
  )
}