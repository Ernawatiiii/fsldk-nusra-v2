'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentProfile } from '@/lib/auth'

export default function UsersPage() {
  const [profiles, setProfiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { router.push('/login'); return }

      const me = await getCurrentProfile()
      if (me?.role !== 'admin') { router.push('/admin'); return }

      const { data } = await supabase.from('profiles').select('*').order('created_at')
      setProfiles(data || [])
      setLoading(false)
    }
    load()
  }, [router])

  async function handleRoleChange(id: string, newRole: string) {
    setMessage('')
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', id)
    if (error) { setMessage(`❌ ${error.message}`); return }
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, role: newRole } : p)))
    setMessage('✅ Role diupdate')
  }

  if (loading) return <main className="max-w-7xl mx-auto px-6 py-10"><p className="text-nusra-muted font-bold">Loading...</p></main>

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href="/admin" className="text-nusra-gold uppercase tracking-widest text-xs font-black hover:text-nusra-lime transition">← Dashboard</Link>
        <h1 className="font-black text-4xl md:text-5xl uppercase leading-none mt-2">Kelola Users</h1>
        <p className="text-nusra-muted mt-1">{profiles.length} user terdaftar</p>
      </div>

      {message && <p className="mb-6 text-sm font-semibold">{message}</p>}

      <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-nusra-sand text-left">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-nusra-muted">Nama</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-nusra-muted">Email</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-nusra-muted">Role</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id} className="border-t border-gray-100 hover:bg-nusra-sand/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-nusra text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                        {(p.full_name || p.email || '?')[0].toUpperCase()}
                      </div>
                      <span className="font-bold text-sm">{p.full_name || '-'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-nusra-muted">{p.email}</td>
                  <td className="px-6 py-4">
                    <select
                      value={p.role}
                      onChange={(e) => handleRoleChange(p.id, e.target.value)}
                      className={`px-4 py-2 rounded-full font-black uppercase tracking-wider text-xs cursor-pointer border-2 focus:outline-none transition ${
                        p.role === 'admin'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-blue-50 border-blue-200 text-blue-700'
                      }`}
                    >
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {profiles.length === 0 && <p className="text-nusra-muted mt-4">Belum ada user.</p>}
    </main>
  )
}