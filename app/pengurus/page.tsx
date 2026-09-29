import { supabase } from '@/lib/supabase'

export const revalidate = 60

export default async function PengurusPage() {
  const { data: items } = await supabase
    .from('pengurus')
    .select('*')
    .eq('active', true)
    .order('order_index')

  const bph = items?.filter((p) => p.division === 'BPH') || []
  const lainnya = items?.filter((p) => p.division !== 'BPH') || []

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Struktur Kepengurusan</h1>
      <p className="text-gray-600 mb-12">Badan Pengurus Harian & Divisi</p>

      {items && items.length === 0 && <p className="text-gray-500">Belum ada data pengurus.</p>}

      {bph.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 pb-2 border-b-2 border-emerald-600">Badan Pengurus Harian</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bph.map((p) => (
              <div key={p.id} className="text-center">
                {p.photo_url ? (
                  <img src={p.photo_url} alt={p.name} className="w-32 h-32 rounded-full object-cover mx-auto mb-3" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center text-gray-400">
                    No Photo
                  </div>
                )}
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-emerald-700">{p.position}</p>
                {p.period && <p className="text-xs text-gray-500">{p.period}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {lainnya.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 pb-2 border-b-2 border-emerald-600">Divisi & Komisi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {lainnya.map((p) => (
              <div key={p.id} className="text-center">
                {p.photo_url ? (
                  <img src={p.photo_url} alt={p.name} className="w-32 h-32 rounded-full object-cover mx-auto mb-3" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center text-gray-400">
                    No Photo
                  </div>
                )}
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-emerald-700">{p.position}</p>
                {p.division && <p className="text-xs text-gray-500">{p.division}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}