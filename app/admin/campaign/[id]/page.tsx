'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/app/components/ImageUpload'
import StatusMessage from '@/app/components/StatusMessage'

export default function EditCampaign() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [collectedAmount, setCollectedAmount] = useState('')
  const [deadline, setDeadline] = useState('')
  const [bankInfo, setBankInfo] = useState('')
  const [contactWa, setContactWa] = useState('')
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }

      const { data, error } = await supabase.from('campaigns').select('*').eq('id', id).single()
      if (error || !data) { setMessage('Tidak ditemukan'); setLoading(false); return }

      setTitle(data.title)
      setSlug(data.slug)
      setDescription(data.description || '')
      setContent(data.content || '')
      setCoverImage(data.cover_image || '')
      setTargetAmount(data.target_amount?.toString() || '')
      setCollectedAmount(data.collected_amount?.toString() || '')
      setDeadline(data.deadline ? data.deadline.slice(0, 16) : '')
      setBankInfo(data.bank_info || '')
      setContactWa(data.contact_wa || '')
      setPublished(data.published)
      setLoading(false)
    }
    load()
  }, [id, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setMessage('')

    const { error } = await supabase.from('campaigns').update({
      title, slug, description, content,
      cover_image: coverImage,
      target_amount: parseInt(targetAmount) || 0,
      collected_amount: parseInt(collectedAmount) || 0,
      deadline: deadline || null,
      bank_info: bankInfo,
      contact_wa: contactWa,
      published,
    }).eq('id', id)

    if (error) { setMessage(error.message); setSaving(false); return }
    setMessage('Tersimpan!')
    setTimeout(() => router.push('/admin/campaign'), 1000)
  }

  async function handleDelete() {
    if (!confirm('Yakin hapus campaign ini?')) return
    const { error } = await supabase.from('campaigns').delete().eq('id', id)
    if (error) { setMessage(error.message); return }
    router.push('/admin/campaign')
  }

  if (loading) return <main className="max-w-3xl mx-auto px-6 py-10"><p className="text-nusra-muted font-bold">Loading...</p></main>

  const progress = parseInt(targetAmount) > 0 ? Math.min(100, Math.round((parseInt(collectedAmount) / parseInt(targetAmount)) * 100)) : 0

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href="/admin/campaign" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Campaign</Link>
        <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Edit Campaign</h1>
      </div>

      {/* Progress ringkasan */}
      <div className="bg-nusra text-white rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
        <div className="relative">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs uppercase tracking-widest text-white/60 font-black">Progress</span>
            <span className="font-black text-2xl text-nusra-gold">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-nusra-gold to-nusra-lime rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm mt-3 text-white/70">
            <strong className="text-nusra-gold">Rp {(parseInt(collectedAmount) || 0).toLocaleString('id-ID')}</strong>
            {' '}/ Rp {(parseInt(targetAmount) || 0).toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Judul</span>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Slug</span>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition font-mono text-sm" />
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Cover Image</span>
          <ImageUpload value={coverImage} onChange={setCoverImage} folder="campaign" />
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Deskripsi Singkat</span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Isi Lengkap</span>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Target Dana (Rp)</span>
            <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Dana Terkumpul (Rp)</span>
            <input type="number" value={collectedAmount} onChange={(e) => setCollectedAmount(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Deadline</span>
          <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Info Rekening / QRIS</span>
          <textarea value={bankInfo} onChange={(e) => setBankInfo(e.target.value)} rows={5} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition font-mono text-sm" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Kontak WhatsApp</span>
          <input type="text" value={contactWa} onChange={(e) => setContactWa(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition font-mono text-sm" />
        </label>

        <label className="flex items-center gap-3 bg-nusra-sand p-4 rounded-xl cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-5 h-5 cursor-pointer" />
          <span className="font-bold">Publish</span>
        </label>

        <div className="flex gap-3 pt-2 flex-wrap">
          <button type="submit" disabled={saving} className="bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all disabled:opacity-50 cursor-pointer">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
          <Link href="/admin/campaign" className="border-2 border-nusra/20 text-nusra px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:border-nusra transition flex items-center">
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