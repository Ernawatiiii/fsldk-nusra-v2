'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ArtikelList() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }

      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) setArticles(data || [])
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-nusra-muted font-bold">Loading...</p>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <Link href="/admin" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">
            ← Dashboard
          </Link>
          <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">
            Artikel
          </h1>
          <p className="text-nusra-muted mt-1">{articles.length} artikel total</p>
        </div>

        <Link
          href="/admin/artikel/baru"
          className="bg-nusra text-white px-6 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:bg-nusra-gold hover:text-nusra-dark transition"
        >
          + Tambah Artikel
        </Link>
      </div>

      {/* LIST */}
      {articles.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-nusra/20">
          <p className="text-nusra-muted">Belum ada artikel.</p>
          <Link href="/admin/artikel/baru" className="inline-block mt-4 text-nusra-gold font-bold hover:underline">
            Bikin artikel pertama →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-nusra-sand text-left">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-nusra-muted">Judul</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-nusra-muted">Status</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-nusra-muted">Tanggal</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-nusra-muted text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a) => (
                  <tr key={a.id} className="border-t border-gray-100 hover:bg-nusra-sand/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {a.cover_image ? (
                          <img src={a.cover_image} alt={a.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-nusra/5 flex items-center justify-center text-nusra/20 text-xs flex-shrink-0">
                            -
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-sm truncate max-w-xs">{a.title}</p>
                          <p className="text-xs text-nusra-muted truncate max-w-xs">{a.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {a.published ? (
                        <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                          Publish
                        </span>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-nusra-muted">
                      {new Date(a.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/artikel/${a.id}`}
                        className="inline-block bg-nusra/10 text-nusra px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider hover:bg-nusra hover:text-white transition"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  )
}