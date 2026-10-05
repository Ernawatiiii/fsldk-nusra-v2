'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const transforms = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${transforms[direction]}`
      }`}
    >
      {children}
    </div>
  )
}