'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import StatusMessage from './StatusMessage'

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
      setStatus(error.message)
      setLoading(false)
      return
    }

    setStatus('Pesan terkirim! Kami akan segera menghubungi kamu.')
    setName(''); setEmail(''); setSubject(''); setMessage('')
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition"
      />
      <input
        type="text"
        placeholder="Subjek"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
        className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition"
      />
      <textarea
        placeholder="Pesan"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={5}
        className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
      {status && <StatusMessage message={status} />}
    </form>
  )
}