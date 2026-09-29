'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload from '@/app/components/ImageUpload'

export default function EditPengurus() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [period, setPeriod] = useState('')
  const [division, setDivision] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [orderIndex, setOrderIndex] = useState(0)
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }

      const { data, error } = await supabase.from('pengurus').select('*').eq('id', id).single()
      if (error || !data) { setMessage('❌ Tidak ditemukan'); setLoading(false); return }

      setName(data.name); setPosition(data.position); setPeriod(data.period || '')
      setDivision(data.division || ''); setPhotoUrl(data.photo_url || '')
      setInstagramUrl(data.instagram_url || ''); setOrderIndex(data.order_index || 0)
      setActive(data.active); setLoading(false)
    }
    load()
  }, [id, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setMessage('')

    const { error } = await supabase.from('pengurus').update({
      name, position, period, division,
      photo_url: photoUrl, instagram_url: instagramUrl,
      order_index: orderIndex, active,
    }).eq('id', id)

    if (error) { setMessage(`❌ ${error.message}`); setSaving(false); return }
    setMessage('✅ Tersimpan!')
    setTimeout(() => router.push('/admin/pengurus'), 1000)
  }

  async function handleDelete() {
    if (!confirm('Yakin hapus?')) return
    const { error } = await supabase.from('pengurus').delete().eq('id', id)
    if (error) { setMessage(`❌ ${error.message}`); return }
    router.push('/admin/pengurus')
  }

  if (loading) return <main className="p-10">Loading...</main>

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Pengurus</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>Nama
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded" />
        </label>
        <label>Jabatan
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required className="w-full p-2 border rounded" />
        </label>
        <label>Divisi
          <input type="text" value={division} onChange={(e) => setDivision(e.target.value)} className="w-full p-2 border rounded" />
        </label>
        <label>Periode
          <input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full p-2 border rounded" />
        </label>
        <label>Foto
          <ImageUpload value={photoUrl} onChange={setPhotoUrl} folder="pengurus" />
        </label>
        <label>Instagram
          <input type="text" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} className="w-full p-2 border rounded" />
        </label>
        <label>Urutan
          <input type="number" value={orderIndex} onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)} className="w-full p-2 border rounded" />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          Aktif
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