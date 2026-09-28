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
      if (me?.role !== 'admin') {
        router.push('/admin')
        return
      }

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

  if (loading) return <main className="p-10">Loading...</main>

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Kelola Users</h1>

      {message && <p className="mb-4 text-sm">{message}</p>}

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-300 text-left">
            <th className="p-2">Nama</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((p) => (
            <tr key={p.id} className="border-b border-gray-200">
              <td className="p-2">{p.full_name || '-'}</td>
              <td className="p-2 text-sm text-gray-600">{p.email}</td>
              <td className="p-2">
                <select
                  value={p.role}
                  onChange={(e) => handleRoleChange(p.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {profiles.length === 0 && <p className="text-gray-500 mt-4">Belum ada user.</p>}

      <Link href="/admin" className="inline-block mt-6 text-emerald-700 hover:underline">
        ← Balik ke Dashboard
      </Link>
    </main>
  )
}