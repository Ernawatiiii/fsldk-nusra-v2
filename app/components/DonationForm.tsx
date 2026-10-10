'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import ImageUpload from './ImageUpload'
import StatusMessage from './StatusMessage'
import { HiOutlineX, HiOutlineCreditCard } from 'react-icons/hi'

export default function DonationForm({
  campaignId,
  campaignTitle,
}: {
  campaignId: number
  campaignTitle: string
}) {
  const [open, setOpen] = useState(false)
  const [donorName, setDonorName] = useState('')
  const [amount, setAmount] = useState('')
  const [transferDate, setTransferDate] = useState('')
  const [proofImage, setProofImage] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!proofImage) { setStatus('Upload bukti transfer dulu'); return }

    setLoading(true)
    setStatus('')

    const { error } = await supabase.from('donations').insert({
      campaign_id: campaignId,
      donor_name: donorName,
      amount: parseInt(amount) || 0,
      transfer_date: transferDate || null,
      proof_image: proofImage,
      message,
      status: 'pending',
    })

    if (error) {
      setStatus(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)

    setTimeout(() => {
      setOpen(false)
      setSuccess(false)
      setDonorName('')
      setAmount('')
      setTransferDate('')
      setProofImage('')
      setMessage('')
    }, 3000)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-3 bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all shadow-lg cursor-pointer"
      >
        <HiOutlineCreditCard className="w-5 h-5" />
        Sudah Transfer? Konfirmasi
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-nusra-dark/70 backdrop-blur-sm flex items-start justify-center p-4 pt-20 overflow-y-auto"
          onClick={() => !loading && setOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <p className="text-nusra-gold uppercase tracking-widest text-xs font-black">
                  Konfirmasi Donasi
                </p>
                <h3 className="font-black text-lg leading-tight line-clamp-1">
                  {campaignTitle}
                </h3>
              </div>
              <button
                onClick={() => !loading && setOpen(false)}
                className="text-nusra-muted hover:text-nusra cursor-pointer flex-shrink-0"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6">
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-black text-xl uppercase mb-2">Terima Kasih!</h3>
                  <p className="text-nusra-muted text-sm">
                    Konfirmasi kamu sedang diverifikasi admin.
                    Setelah divalidasi, nama kamu akan muncul di daftar donatur.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Nama / Samaran</span>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      placeholder="Hamba Allah, Ahmad, atau nama bebas..."
                      className="px-4 py-3 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Nominal Transfer (Rp)</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      placeholder="50000"
                      className="px-4 py-3 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Tanggal Transfer</span>
                    <input
                      type="date"
                      value={transferDate}
                      onChange={(e) => setTransferDate(e.target.value)}
                      required
                      className="px-4 py-3 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition"
                    />
                  </label>

                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Bukti Transfer</span>
                    <ImageUpload value={proofImage} onChange={setProofImage} folder="donations" />
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">Pesan / Doa (opsional)</span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="Semoga berkah, semoga bermanfaat..."
                      className="px-4 py-3 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-nusra text-white px-6 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all disabled:opacity-50 cursor-pointer mt-2"
                  >
                    {loading ? 'Mengirim...' : 'Kirim Konfirmasi'}
                  </button>

                  {status && <StatusMessage message={status} />}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}