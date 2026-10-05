'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import StatusMessage from '@/app/components/StatusMessage'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    setMessage('Login berhasil!')
    setTimeout(() => {
      router.push('/admin')
      router.refresh()
    }, 800)
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-nusra-gold/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-nusra-lime/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-black text-3xl tracking-tight inline-block mb-4">
            FSLDK <span className="text-nusra-gold">Nusra</span>
          </Link>
          <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-2">
            Admin Panel
          </p>
          <h1 className="font-black text-4xl uppercase">Masuk</h1>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@fsldk-nusra.id"
                className="px-5 py-4 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-nusra-muted">
                Password
              </span>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-5 py-4 pr-14 border-2 border-nusra/10 rounded-xl focus:border-nusra-gold focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-nusra-muted hover:text-nusra transition cursor-pointer"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="w-5 h-5" />
                  ) : (
                    <HiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all disabled:opacity-50 cursor-pointer mt-2"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>

            {message && <StatusMessage message={message} />}
          </form>
        </div>

        <p className="text-center text-sm text-nusra-muted mt-6">
          <Link href="/" className="hover:text-nusra-gold transition">← Balik ke Website</Link>
        </p>
      </div>
    </main>
  )
}