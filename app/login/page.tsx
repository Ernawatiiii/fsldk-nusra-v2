'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(`❌ ${error.message}`)
      setLoading(false)
      return
    }

    setMessage('✅ Login berhasil! Redirect...')
    setTimeout(() => {
      router.push('/')
      router.refresh()
    }, 1000)
  }

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 400 }}>
      <h1>Login Admin</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 10, fontSize: 16 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: 10, fontSize: 16 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: 12, fontSize: 16, cursor: 'pointer' }}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </main>
  )
}