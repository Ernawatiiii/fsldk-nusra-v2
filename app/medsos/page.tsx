const socialLinks = [
  {
    name: 'Instagram',
    handle: '@fsldknusra',
    url: 'https://instagram.com/fsldknusra',
    icon: '📷',
    color: 'bg-gradient-to-r from-pink-500 to-purple-600',
  },
  {
    name: 'TikTok',
    handle: '@fsldknusra',
    url: 'https://tiktok.com/@fsldknusra',
    icon: '🎵',
    color: 'bg-black',
  },
  {
    name: 'YouTube',
    handle: 'FSLDK Nusra',
    url: 'https://youtube.com/@fsldknusra',
    icon: '▶️',
    color: 'bg-red-600',
  },
  {
    name: 'WhatsApp',
    handle: 'Hubungi kami',
    url: 'https://wa.me/6281234567890',
    icon: '💬',
    color: 'bg-green-600',
  },
  {
    name: 'Email',
    handle: 'fsldknusra@gmail.com',
    url: 'mailto:fsldknusra@gmail.com',
    icon: '✉️',
    color: 'bg-emerald-700',
  },
]

export default function MedsosPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-center">Terhubung dengan Kami</h1>
      <p className="text-gray-600 mb-12 text-center">
        Ikuti kanal resmi FSLDK Nusa Tenggara
      </p>

      <div className="flex flex-col gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className={`${link.color} text-white rounded-xl p-5 flex items-center gap-4 hover:opacity-90 transition shadow-md`}
          >
            <span className="text-3xl">{link.icon}</span>
            <div className="flex-1">
              <div className="font-bold text-lg">{link.name}</div>
              <div className="text-sm opacity-90">{link.handle}</div>
            </div>
            <span className="text-2xl">→</span>
          </a>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 mt-12">
        Silakan ganti URL & handle di atas dengan yang asli.
      </p>
    </main>
  )
}