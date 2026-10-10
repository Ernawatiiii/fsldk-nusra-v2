'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { HiOutlineCheck, HiOutlineX, HiOutlineExternalLink } from 'react-icons/hi'

export default function DonasiAdminPage() {
  const [donations, setDonations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending')
  const [selected, setSelected] = useState<any>(null)
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function load() {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) { router.push('/login'); return }

    let query = supabase
      .from('donations')
      .select('*, campaign:campaigns(title, slug, collected_amount, target_amount)')
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('status', filter)
    }

    const { data } = await query
    setDonations(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [filter])

  async function handleApprove(d: any) {
    if (!confirm(`Approve donasi dari "${d.donor_name}" sebesar Rp ${d.amount.toLocaleString('id-ID')}?`)) return

    setMessage('')

    // Update status donasi
    const { error: updateErr } = await supabase
      .from('donations')
      .update({ status: 'approved' })
      .eq('id', d.id)

    if (updateErr) { setMessage(updateErr.message); return }

    // Update collected_amount di campaign
    const { data: campaign } = await supabase
      .from('campaigns')
      .select('collected_amount')
      .eq('id', d.campaign_id)
      .single()

    if (campaign) {
      const newAmount = (campaign.collected_amount || 0) + d.amount
      await supabase
        .from('campaigns')
        .update({ collected_amount: newAmount })
        .eq('id', d.campaign_id)
    }

    setMessage('Donasi di-approve!')
    setSelected(null)
    load()
  }

  async function handleReject(d: any) {
    if (!confirm(`Reject donasi dari "${d.donor_name}"?`)) return

    setMessage('')
    const { error } = await supabase
      .from('donations')
      .update({ status: 'rejected' })
      .eq('id', d.id)

    if (error) { setMessage(error.message); return }

    setMessage('Donasi di-reject.')
    setSelected(null)
    load()
  }

  const totalPending = donations.filter(d => d.status === 'pending').length

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href="/admin" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Dashboard</Link>
        <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Konfirmasi Donasi</h1>
        <p className="text-nusra-muted mt-1">Verifikasi donasi yang masuk</p>
      </div>

      {message && <p className="mb-6 text-sm font-semibold text-nusra">{message}</p>}

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { key: 'pending', label: 'Pending', color: 'bg-nusra-gold text-nusra-dark' },
          { key: 'approved', label: 'Approved', color: 'bg-emerald-600 text-white' },
          { key: 'rejected', label: 'Rejected', color: 'bg-red-600 text-white' },
          { key: 'all', label: 'Semua', color: 'bg-nusra text-white' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as any)}
            className={`px-5 py-2 rounded-full font-black uppercase tracking-wider text-xs transition cursor-pointer ${
              filter === f.key
                ? f.color
                : 'bg-white border-2 border-gray-100 text-nusra-muted hover:border-nusra'
            }`}
          >
            {f.label}
            {f.key === 'pending' && totalPending > 0 && filter !== 'pending' && (
              <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-[10px]">
                {totalPending}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-nusra-muted font-bold">Loading...</p>
      ) : donations.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-nusra/20">
          <p className="text-nusra-muted">Belum ada konfirmasi donasi dengan status <strong>{filter}</strong>.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LIST */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden max-h-[700px] overflow-y-auto">
              {donations.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelected(d)}
                  className={`w-full text-left p-5 border-b border-gray-100 hover:bg-nusra-sand/50 transition cursor-pointer ${
                    selected?.id === d.id ? 'bg-nusra-sand border-l-4 border-l-nusra-gold' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <span className="font-black text-sm truncate">{d.donor_name}</span>
                    <span className={`flex-shrink-0 inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      d.status === 'approved' ? 'bg-emerald-100 text-emerald-700'
                      : d.status === 'rejected' ? 'bg-red-100 text-red-700'
                      : 'bg-nusra-gold/20 text-nusra-dark'
                    }`}>
                      {d.status}
                    </span>
                  </div>
                  <p className="text-xs text-nusra-muted mb-2 truncate">
                    {d.campaign?.title || 'Campaign dihapus'}
                  </p>
                  <p className="text-xs font-black text-nusra">
                    Rp {(d.amount || 0).toLocaleString('id-ID')}
                  </p>
                  <p className="text-[10px] text-nusra-muted mt-1">
                    {new Date(d.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* DETAIL */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 min-h-[400px]">
              {!selected && (
                <div className="text-center py-20">
                  <p className="text-nusra-muted text-sm">Pilih konfirmasi untuk melihat detail</p>
                </div>
              )}

              {selected && (
                <div>
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 ${
                        selected.status === 'approved' ? 'bg-emerald-100 text-emerald-700'
                        : selected.status === 'rejected' ? 'bg-red-100 text-red-700'
                        : 'bg-nusra-gold/20 text-nusra-dark'
                      }`}>
                        {selected.status}
                      </span>
                      <h2 className="font-black text-2xl">{selected.donor_name}</h2>
                      <p className="text-sm text-nusra-muted">
                        Untuk: <strong className="text-nusra">{selected.campaign?.title || 'Campaign dihapus'}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-nusra-sand rounded-xl p-4">
                      <p className="text-xs uppercase tracking-wider text-nusra-muted font-black mb-1">Nominal</p>
                      <p className="font-black text-xl text-nusra">Rp {(selected.amount || 0).toLocaleString('id-ID')}</p>
                    </div>
                    <div className="bg-nusra-sand rounded-xl p-4">
                      <p className="text-xs uppercase tracking-wider text-nusra-muted font-black mb-1">Tgl Transfer</p>
                      <p className="font-black text-sm">
                        {selected.transfer_date
                          ? new Date(selected.transfer_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                          : '-'}
                      </p>
                    </div>
                  </div>

                  {selected.message && (
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-wider text-nusra-muted font-black mb-2">Pesan / Doa</p>
                      <p className="text-sm text-nusra-ink/80 italic border-l-4 border-nusra-gold pl-4">
                        "{selected.message}"
                      </p>
                    </div>
                  )}

                  {selected.proof_image && (
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-wider text-nusra-muted font-black mb-2">Bukti Transfer</p>
                      <div className="rounded-xl overflow-hidden border-2 border-gray-100 max-w-md">
                        <img
                          src={selected.proof_image}
                          alt="Bukti transfer"
                          className="w-full h-auto"
                        />
                      </div>
                      <a
                        href={selected.proof_image}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-nusra hover:text-nusra-gold mt-2"
                      >
                        <HiOutlineExternalLink className="w-3 h-3" />
                        Buka gambar penuh
                      </a>
                    </div>
                  )}

                  {selected.status === 'pending' && (
                    <div className="flex gap-3 flex-wrap pt-2 border-t border-gray-100">
                      <button
                        onClick={() => handleApprove(selected)}
                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:bg-emerald-700 transition cursor-pointer"
                      >
                        <HiOutlineCheck className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(selected)}
                        className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:bg-red-100 transition cursor-pointer"
                      >
                        <HiOutlineX className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}