import Link from 'next/link'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

export default function Footer() {
  return (
    <footer className="bg-nusra-dark text-white relative overflow-hidden mt-auto">
      <div className="absolute inset-0 bg-pattern-nusra opacity-10" />
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="font-black text-3xl tracking-tight inline-block mb-4">
              FSLDK <span className="text-nusra-gold">Nusra</span>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-md">
              Merajut silaturahmi, menguatkan dakwah kampus se-Nusa Tenggara.
            </p>
          </div>

          <div>
            <h3 className="font-black uppercase tracking-widest text-xs text-nusra-gold mb-5">
              Navigasi
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li><Link href="/profil" className="hover:text-nusra-gold transition">Profil</Link></li>
              <li><Link href="/berita" className="hover:text-nusra-gold transition">Berita</Link></li>
              <li><Link href="/agenda" className="hover:text-nusra-gold transition">Agenda</Link></li>
              <li><Link href="/program" className="hover:text-nusra-gold transition">Program</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-black uppercase tracking-widest text-xs text-nusra-gold mb-5">
              Terhubung
            </h3>
            <div className="flex gap-3 mb-5">
              <a href="https://instagram.com/fsldk_nusra" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-nusra-gold hover:text-nusra-dark flex items-center justify-center transition">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://tiktok.com/@fsldknusatenggara_" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-nusra-gold hover:text-nusra-dark flex items-center justify-center transition">
                <FaTiktok className="w-4 h-4" />
              </a>
              <a href="https://youtube.com/@FSLDKNusraTV" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-nusra-gold hover:text-nusra-dark flex items-center justify-center transition">
                <FaYoutube className="w-4 h-4" />
              </a>
              <a href="mailto:fsldknusatenggara@gmail.com" className="w-10 h-10 rounded-full bg-white/10 hover:bg-nusra-gold hover:text-nusra-dark flex items-center justify-center transition">
                <HiOutlineMail className="w-4 h-4" />
              </a>
            </div>
            <Link href="/ldk" className="text-sm text-white/70 hover:text-nusra-gold transition">
              Direktori LDK →
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} FSLDK Nusa Tenggara</p>
          <Link href="/admin" className="hover:text-nusra-gold transition">Admin</Link>
        </div>
      </div>
    </footer>
  )
}