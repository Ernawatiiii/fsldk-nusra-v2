'use client'

import { useState } from 'react'
import { FaWhatsapp, FaFacebook, FaXTwitter, FaLink, FaCheck } from 'react-icons/fa6'

export default function ShareButton({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodedTitle}%20-%20${encodedUrl}`,
      Icon: FaWhatsapp,
      color: 'hover:bg-green-500 hover:text-white',
    },
    {
      name: 'X',
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      Icon: FaXTwitter,
      color: 'hover:bg-black hover:text-white',
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FaFacebook,
      color: 'hover:bg-blue-600 hover:text-white',
    },
  ]

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert('Gagal copy link')
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 py-6 border-t border-b border-nusra/10">
      <span className="text-xs font-black uppercase tracking-widest text-nusra-muted">
        Bagikan:
      </span>

      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className={`w-10 h-10 rounded-full border-2 border-nusra/10 text-nusra flex items-center justify-center transition ${link.color}`}
          aria-label={`Share ke ${link.name}`}
        >
          <link.Icon className="w-4 h-4" />
        </a>
      ))}

      <button
        onClick={handleCopy}
        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition cursor-pointer ${
          copied
            ? 'bg-emerald-500 border-emerald-500 text-white'
            : 'border-nusra/10 text-nusra hover:bg-nusra hover:text-white'
        }`}
        aria-label="Copy link"
      >
        {copied ? <FaCheck className="w-4 h-4" /> : <FaLink className="w-4 h-4" />}
      </button>
    </div>
  )
}