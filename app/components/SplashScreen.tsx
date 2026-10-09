'use client'

import { useEffect, useState } from 'react'

type Phase = 'enter' | 'show' | 'exit' | 'done'

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>('enter')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('splash-seen')

    if (seen) {
      setPhase('done')
      return
    }

    setMounted(true)
    document.body.style.overflow = 'hidden'

    const t1 = setTimeout(() => setPhase('show'), 700)
    const t2 = setTimeout(() => setPhase('exit'), 3200)
    const t3 = setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
      sessionStorage.setItem('splash-seen', '1')
    }, 4200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  if (phase === 'done' || !mounted) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-nusra flex items-center justify-center transition-opacity duration-[1000ms] ease-in-out ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Pattern & glow */}
      <div className="absolute inset-0 bg-pattern-nusra opacity-30" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-nusra-gold/25 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-nusra-lime/20 rounded-full blur-3xl animate-pulse-slow" />

      {/* Logo container */}
      <div
        className={`relative flex flex-col items-center gap-6 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          phase === 'enter'
            ? 'opacity-0 scale-[0.6] translate-y-6'
            : phase === 'show'
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-[0.3] -translate-x-[42vw] -translate-y-[42vh]'
        }`}
      >
        <div className="relative">
          {/* Glow ring berlapis */}
          <div className="absolute inset-0 rounded-full bg-nusra-gold/40 blur-3xl animate-glow-pulse" />
          <div className="absolute inset-0 rounded-full bg-nusra-lime/20 blur-3xl animate-glow-pulse-delay" />

          <img
            src="/icon.png"
            alt="FSLDK Nusra"
            className={`relative w-28 h-28 md:w-32 md:h-32 object-contain transition-all duration-[1200ms] ease-out ${
              phase === 'show' ? 'animate-logo-in' : ''
            }`}
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>

        <div
          className={`text-center transition-all duration-700 ease-out ${
            phase === 'show' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <h1 className="font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
            FSLDK <span className="text-nusra-gold">Nusra</span>
          </h1>
          <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.25em] mt-4">
            Forum Silaturahmi Lembaga Dakwah Kampus
          </p>
        </div>

        {/* Loading bar */}
        {phase === 'show' && (
          <div className="w-44 h-0.5 bg-white/10 rounded-full overflow-hidden mt-6">
            <div className="h-full bg-gradient-to-r from-nusra-gold via-nusra-lime to-nusra-gold animate-loading-bar" />
          </div>
        )}
      </div>
    </div>
  )
}