'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/app/components/ImageUpload'
import StatusMessage from '@/app/components/StatusMessage'

export default function CampaignBaru() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [collectedAmount, setCollectedAmount] = useState('')
  const [deadline, setDeadline] = useState('')
  const [bankInfo, setBankInfo] = useState('Info donasi akan segera diumumkan.\nUntuk konfirmasi, hubungi admin via WhatsApp di bawah.')
  const [contactWa, setContactWa] = useState('')
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

    const { error } = await supabase.from('campaigns').insert({
      title, slug, description, content,
      cover_image: coverImage,
      target_amount: parseInt(targetAmount) || 0,
      collected_amount: parseInt(collectedAmount) || 0,
      deadline: deadline || null,
      bank_info: bankInfo,
      contact_wa: contactWa,
      published,
    })

    if (error) { setMessage(error.message); setLoading(false); return }
    setMessage('Campaign tersimpan!')
    setTimeout(() => router.push('/admin/campaign'), 1000)
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href="/admin/campaign" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Campaign</Link>
        <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Tambah Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border-2 border-gray-100 flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Judul Campaign</span>
          <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} required placeholder="Bantuan Palestina, Renovasi Sekretariat..." className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
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
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="1-2 kalimat ringkas tentang campaign ini" className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Isi Lengkap</span>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} placeholder="Detail lengkap: latar belakang, tujuan, penggunaan dana..." className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Target Dana (Rp)</span>
            <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} placeholder="50000000" className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
            <span className="text-xs text-nusra-muted">Masukkan angka aja, tanpa titik. Contoh: 50000000 = Rp 50 juta</span>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Dana Terkumpul (Rp)</span>
            <input type="number" value={collectedAmount} onChange={(e) => setCollectedAmount(e.target.value)} placeholder="0" className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Deadline (opsional)</span>
          <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Info Rekening / QRIS</span>
          <textarea value={bankInfo} onChange={(e) => setBankInfo(e.target.value)} rows={5} placeholder="Bank NTB Syariah&#10;No. Rek: 1234567890&#10;A/N: FSLDK Nusa Tenggara" className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition font-mono text-sm" />
          <span className="text-xs text-nusra-muted">Bisa diedit nanti kalau info resmi udah keluar</span>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Kontak WhatsApp Admin</span>
          <input type="text" value={contactWa} onChange={(e) => setContactWa(e.target.value)} placeholder="6281234567890" className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition font-mono text-sm" />
          <span className="text-xs text-nusra-muted">Format: 628xxx (tanpa + atau 0 di depan)</span>
        </label>

        <label className="flex items-center gap-3 bg-nusra-sand p-4 rounded-xl cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-5 h-5 cursor-pointer" />
          <span className="font-bold">Publish campaign</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all disabled:opacity-50 cursor-pointer">
            {loading ? 'Menyimpan...' : 'Simpan Campaign'}
          </button>
          <Link href="/admin/campaign" className="border-2 border-nusra/20 text-nusra px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:border-nusra transition flex items-center">
            Batal
          </Link>
        </div>

        {message && <StatusMessage message={message} />}
      </form>
    </main>
  )
}