import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 60

export default async function AgendaPage() {
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('published', true)
    .order('start_date', { ascending: false })

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Agenda & Kegiatan</h1>
      <p className="text-gray-600 mb-8">Kegiatan FSLDK Nusa Tenggara</p>

      {events && events.length === 0 && <p className="text-gray-500">Belum ada agenda.</p>}

      <div className="flex flex-col gap-8">
        {events?.map((e) => (
          <article key={e.id} className="border-b pb-6">
            <Link href={`/agenda/${e.slug}`} className="no-underline text-inherit flex gap-6">
              {e.cover_image && (
                <img
                  src={e.cover_image}
                  alt={e.title}
                  className="w-40 h-28 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold mb-2 hover:text-emerald-700">{e.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  📅 {e.start_date ? new Date(e.start_date).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  }) : '-'}
                  {e.location && ` • 📍 ${e.location}`}
                </p>
                {e.description && <p className="text-gray-700">{e.description}</p>}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}