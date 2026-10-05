import type { Metadata } from 'next'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import FadeIn from '@/app/components/FadeIn'

export const metadata: Metadata = {
  title: 'Media Sosial',
  description: 'Kanal resmi FSLDK Nusa Tenggara',
}

const socialLinks = [
  {
    name: 'Instagram FSLDK Nusra',
    handle: '@fsldk_nusra',
    url: 'https://instagram.com/fsldk_nusra',
    Icon: FaInstagram,
  },
  {
    name: 'Instagram Nisa Tenggara',
    handle: '@nisatenggara_',
    url: 'https://instagram.com/nisatenggara_',
    Icon: FaInstagram,
  },
  {
    name: 'TikTok',
    handle: '@fsldknusatenggara_',
    url: 'https://tiktok.com/@fsldknusatenggara_',
    Icon: FaTiktok,
  },
  {
    name: 'YouTube',
    handle: 'FSLDKNusraTV',
    url: 'https://youtube.com/@FSLDKNusraTV',
    Icon: FaYoutube,
  },
  {
    name: 'Email',
    handle: 'fsldknusatenggara@gmail.com',
    url: 'mailto:fsldknusatenggara@gmail.com',
    Icon: HiOutlineMail,
  },
]

export default function MedsosPage() {
  return (
    <main>
      <section className="bg-nusra text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-nusra opacity-20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-nusra-gold/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="text-nusra-gold uppercase tracking-widest text-xs font-black mb-3">
            Kanal Resmi
          </p>
          <h1 className="font-black text-5xl md:text-7xl uppercase leading-[0.95] mb-4">
            Terhubung<br />dengan Kami
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Ikuti kanal resmi FSLDK Nusa Tenggara
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-col">
          {socialLinks.map((link, i) => (
            <FadeIn key={link.name} delay={i * 100}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-5 py-6 border-b border-nusra/10 hover:border-nusra-gold transition-colors"
              >
                <link.Icon className="w-6 h-6 text-nusra group-hover:text-nusra-gold transition-colors flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-base">{link.name}</div>
                  <div className="text-sm text-nusra-muted truncate">{link.handle}</div>
                </div>
                <svg
                  className="w-5 h-5 text-nusra-muted group-hover:text-nusra-gold group-hover:translate-x-1 transition-all flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  )
}