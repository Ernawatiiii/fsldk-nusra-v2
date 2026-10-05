'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { HiOutlineLocationMarker } from 'react-icons/hi'

export default function LdkList() {
  const [ldks, setLdks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }
      const { data } = await supabase.from('ldk').select('*').order('name')
      setLdks(data || [])
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
          <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">LDK</h1>
          <p className="text-nusra-muted mt-1">{ldks.length} LDK terdaftar</p>
        </div>
        <Link href="/admin/ldk/baru" className="bg-nusra text-white px-6 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:bg-nusra-gold hover:text-nusra-dark transition">
          + Tambah LDK
        </Link>
      </div>

      {ldks.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-nusra/20">
          <p className="text-nusra-muted">Belum ada LDK.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ldks.map((l) => (
            <Link key={l.id} href={`/admin/ldk/${l.id}`} className="no-underline text-inherit group">
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-nusra-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex gap-4">
                {l.logo_url ? (
                  <img src={l.logo_url} alt={l.name} className="w-16 h-16 object-contain flex-shrink-0 rounded-xl" />
                ) : (
                  <div className="w-16 h-16 bg-nusra/5 rounded-xl flex items-center justify-center text-nusra/20 text-xs font-black flex-shrink-0">LOGO</div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-black text-base leading-tight truncate">{l.name}</h3>
                    <span className={`flex-shrink-0 inline-block w-2 h-2 rounded-full ${l.active ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                  </div>
                  {l.campus && <p className="text-xs text-nusra-muted truncate">{l.campus}</p>}
                  {l.city && (
                  <p className="text-xs text-nusra-muted mt-1 flex items-center gap-1">
                    <HiOutlineLocationMarker className="w-3 h-3" />
                    {l.city}
                  </p>
                )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}