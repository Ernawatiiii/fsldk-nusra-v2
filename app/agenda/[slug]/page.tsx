import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!event) notFound()

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <Link href="/agenda">← Balik ke agenda</Link>

      <h1 style={{ marginTop: 24 }}>{event.title}</h1>

      <p style={{ color: '#666' }}>
        📅 {event.start_date ? new Date(event.start_date).toLocaleDateString('id-ID', {
          day: 'numeric', month: 'long', year: 'numeric',
        }) : '-'}
        {event.location && ` • 📍 ${event.location}`}
      </p>

      {event.description && (
        <p style={{ marginTop: 16, fontStyle: 'italic' }}>{event.description}</p>
      )}

      <div style={{ marginTop: 24, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
        {event.content}
      </div>
    </main>
  )
}