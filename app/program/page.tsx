import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 60

const statusLabel: Record<string, string> = {
  'akan-datang': '🕐 Akan Datang',
  'berlangsung': '🔥 Berlangsung',
  'selesai': '✅ Selesai',
}

export default async function ProgramPage() {
  const { data: programs } = await supabase
    .from('program')
    .select('*')
    .eq('published', true)
    .order('order_index')

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Program Kerja</h1>
      <p className="text-gray-600 mb-12">Kegiatan yang menghidupkan forum</p>

      {programs && programs.length === 0 && <p className="text-gray-500">Belum ada program.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs?.map((p) => (
          <Link key={p.id} href={`/program/${p.slug}`} className="no-underline text-inherit">
            <article className="border rounded-lg overflow-hidden hover:shadow-lg transition h-full flex flex-col">
              {p.cover_image ? (
                <img src={p.cover_image} alt={p.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                  Tanpa Gambar
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col">
                <span className="text-xs text-gray-500 mb-2">{statusLabel[p.status] || p.status}</span>
                <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
                {p.description && <p className="text-sm text-gray-600 line-clamp-3">{p.description}</p>}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}