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
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/agenda" className="text-emerald-700 hover:underline">← Balik ke agenda</Link>

      {event.cover_image && (
        <img
          src={event.cover_image}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg mt-6"
        />
      )}

      <h1 className="text-3xl font-bold mt-6 mb-2">{event.title}</h1>

      <p className="text-sm text-gray-500 mb-8">
        📅 {event.start_date ? new Date(event.start_date).toLocaleDateString('id-ID', {
          day: 'numeric', month: 'long', year: 'numeric',
        }) : '-'}
        {event.location && ` • 📍 ${event.location}`}
      </p>

      {event.description && (
        <p className="italic text-gray-700 mb-6">{event.description}</p>
      )}

      <div className="leading-relaxed whitespace-pre-wrap">{event.content}</div>
    </main>
  )
}