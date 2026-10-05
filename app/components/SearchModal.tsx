'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { HiOutlineSearch, HiX } from 'react-icons/hi'

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{
    articles: any[]
    events: any[]
    ldks: any[]
    programs: any[]
  }>({ articles: [], events: [], ldks: [], programs: [] })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults({ articles: [], events: [], ldks: [], programs: [] })
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      const q = query.trim()

      const [a, e, l, p] = await Promise.all([
        supabase.from('articles').select('id, title, slug').eq('published', true).ilike('title', `%${q}%`).limit(5),
        supabase.from('events').select('id, title, slug').eq('published', true).ilike('title', `%${q}%`).limit(5),
        supabase.from('ldk').select('id, name, slug, city').eq('active', true).or(`name.ilike.%${q}%,city.ilike.%${q}%,campus.ilike.%${q}%`).limit(5),
        supabase.from('program').select('id, title, slug').eq('published', true).ilike('title', `%${q}%`).limit(5),
      ])

      setResults({
        articles: a.data || [],
        events: e.data || [],
        ldks: l.data || [],
        programs: p.data || [],
      })
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const total = results.articles.length + results.events.length + results.ldks.length + results.programs.length

  return (
    <div
      className="fixed inset-0 z-[100] bg-nusra-dark/70 backdrop-blur-sm flex items-start justify-center p-4 pt-20"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* INPUT */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <HiOutlineSearch className="w-5 h-5 text-nusra-muted flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari artikel, event, LDK, program..."
            className="flex-1 outline-none text-lg bg-transparent"
          />
          <button onClick={onClose} className="text-nusra-muted hover:text-nusra cursor-pointer flex-shrink-0">
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {/* RESULTS */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {loading && <p className="text-sm text-nusra-muted text-center py-8">Mencari...</p>}

          {!loading && !query && (
            <p className="text-sm text-nusra-muted text-center py-8">
              Ketik sesuatu untuk mulai mencari
            </p>
          )}

          {!loading && query && total === 0 && (
            <p className="text-sm text-nusra-muted text-center py-8">
              Tidak ada hasil untuk "{query}"
            </p>
          )}

          {!loading && results.articles.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-widest text-nusra-gold mb-3">Artikel</p>
              <div className="flex flex-col gap-1">
                {results.articles.map((a) => (
                  <Link key={a.id} href={`/berita/${a.slug}`} onClick={onClose} className="px-3 py-2 rounded-lg hover:bg-nusra-sand transition text-sm font-semibold">
                    {a.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!loading && results.events.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-widest text-nusra-gold mb-3">Agenda</p>
              <div className="flex flex-col gap-1">
                {results.events.map((e) => (
                  <Link key={e.id} href={`/agenda/${e.slug}`} onClick={onClose} className="px-3 py-2 rounded-lg hover:bg-nusra-sand transition text-sm font-semibold">
                    {e.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!loading && results.ldks.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-widest text-nusra-gold mb-3">LDK</p>
              <div className="flex flex-col gap-1">
                {results.ldks.map((l) => (
                  <Link key={l.id} href={`/ldk/${l.slug}`} onClick={onClose} className="px-3 py-2 rounded-lg hover:bg-nusra-sand transition text-sm">
                    <span className="font-semibold">{l.name}</span>
                    {l.city && <span className="text-nusra-muted ml-2 text-xs">• {l.city}</span>}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!loading && results.programs.length > 0 && (
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-nusra-gold mb-3">Program</p>
              <div className="flex flex-col gap-1">
                {results.programs.map((p) => (
                  <Link key={p.id} href={`/program/${p.slug}`} onClick={onClose} className="px-3 py-2 rounded-lg hover:bg-nusra-sand transition text-sm font-semibold">
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-5 py-3 border-t border-gray-100 text-xs text-nusra-muted text-center">
          Tekan <kbd className="px-1.5 py-0.5 bg-nusra-sand rounded text-nusra font-bold">ESC</kbd> untuk menutup
        </div>
      </div>
    </div>
  )
}