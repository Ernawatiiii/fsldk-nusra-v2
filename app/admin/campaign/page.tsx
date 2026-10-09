'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CampaignList() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }
      const { data } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false })
      setItems(data || [])
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) return <main className="max-w-7xl mx-auto px-6 py-10"><p className="text-nusra-muted font-bold">Loading...</p></main>

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <Link href="/admin" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Dashboard</Link>
          <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Campaign</h1>
          <p className="text-nusra-muted mt-1">{items.length} campaign</p>
        </div>
        <Link href="/admin/campaign/baru" className="bg-nusra text-white px-6 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:bg-nusra-gold hover:text-nusra-dark transition">
          + Tambah Campaign
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-nusra/20">
          <p className="text-nusra-muted">Belum ada campaign.</p>
          <Link href="/admin/campaign/baru" className="inline-block mt-4 text-nusra-gold font-bold hover:underline">
            Bikin campaign pertama →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((c) => {
            const progress = c.target_amount > 0 ? Math.min(100, Math.round((c.collected_amount / c.target_amount) * 100)) : 0
            return (
              <Link key={c.id} href={`/admin/campaign/${c.id}`} className="no-underline text-inherit group block">
                <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-nusra-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {c.cover_image ? (
                    <img src={c.cover_image} alt={c.title} className="w-full h-36 object-cover" />
                  ) : (
                    <div className="w-full h-36 bg-nusra/5 flex items-center justify-center text-nusra/20 text-xs font-black">TANPA GAMBAR</div>
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${c.published ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                      <span className="text-[10px] uppercase tracking-wider text-nusra-muted font-black">
                        {c.published ? 'Publish' : 'Draft'}
                      </span>
                    </div>
                    <h3 className="font-black text-sm leading-tight mb-3 line-clamp-2 group-hover:text-nusra transition">
                      {c.title}
                    </h3>
                    <div className="mt-auto">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-nusra-muted">Terkumpul</span>
                        <span className="font-black text-nusra">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-nusra/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-nusra-gold to-nusra-lime rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-nusra-muted mt-2">
                        <strong className="text-nusra">Rp {(c.collected_amount || 0).toLocaleString('id-ID')}</strong>
                        {' '}/ Rp {(c.target_amount || 0).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}