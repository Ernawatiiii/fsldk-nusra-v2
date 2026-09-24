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
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 800, margin: '0 auto' }}>
      <h1>Agenda & Kegiatan</h1>

      {events && events.length === 0 && <p>Belum ada agenda.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24 }}>
        {events?.map((e) => (
          <article key={e.id} style={{ borderBottom: '1px solid #eee', paddingBottom: 16 }}>
            <Link href={`/agenda/${e.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2 style={{ marginBottom: 8 }}>{e.title}</h2>
            </Link>
            <p style={{ color: '#666', marginBottom: 4 }}>
              📅 {e.start_date ? new Date(e.start_date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }) : '-'}
              {e.location && ` • 📍 ${e.location}`}
            </p>
            {e.description && <p>{e.description}</p>}
          </article>
        ))}
      </div>
    </main>
  )
}