import { supabase } from '@/lib/supabase'

export const revalidate = 60

export default async function GaleriPage() {
  const { data: items } = await supabase
    .from('galeri')
    .select('*')
    .eq('published', true)
    .order('order_index')

  const grouped: Record<string, any[]> = {}
  items?.forEach((g) => {
    const key = g.category || 'Umum'
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(g)
  })

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Galeri</h1>
      <p className="text-gray-600 mb-12">Dokumentasi kegiatan FSLDK Nusa Tenggara</p>

      {items && items.length === 0 && <p className="text-gray-500">Belum ada foto.</p>}

      {Object.keys(grouped).map((cat) => (
        <section key={cat} className="mb-12">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">{cat}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {grouped[cat].map((g) => (
              <div key={g.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                <img src={g.image_url} alt={g.title} className="w-full h-40 object-cover" />
                <div className="p-2">
                  <p className="text-sm font-semibold">{g.title}</p>
                  {g.description && <p className="text-xs text-gray-500">{g.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}