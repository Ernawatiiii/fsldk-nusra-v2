'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    const { error } = await supabase.from('pesan').insert({
      name, email, subject, message,
    })

    if (error) {
      setStatus(`❌ ${error.message}`)
      setLoading(false)
      return
    }

    setStatus('✅ Pesan terkirim! Kami akan segera menghubungi kamu.')
    setName(''); setEmail(''); setSubject(''); setMessage('')
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-lg">
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="p-3 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-3 border rounded"
      />
      <input
        type="text"
        placeholder="Subjek"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
        className="p-3 border rounded"
      />
      <textarea
        placeholder="Pesan"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={5}
        className="p-3 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-3 bg-emerald-600 text-white rounded cursor-pointer hover:bg-emerald-700"
      >
        {loading ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
      {status && <p className="text-sm">{status}</p>}
    </form>
  )
}