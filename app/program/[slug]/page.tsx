import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

const statusLabel: Record<string, string> = {
  'akan-datang': '🕐 Akan Datang',
  'berlangsung': '🔥 Berlangsung',
  'selesai': '✅ Selesai',
}

export default async function ProgramDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: program } = await supabase
    .from('program')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!program) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/program" className="text-emerald-700 hover:underline">← Balik ke program</Link>

      {program.cover_image && (
        <img src={program.cover_image} alt={program.title} className="w-full h-64 object-cover rounded-lg mt-6" />
      )}

      <div className="mt-6 mb-2 text-sm text-gray-500">
        {statusLabel[program.status] || program.status}
        {program.period && ` • ${program.period}`}
      </div>

      <h1 className="text-3xl font-bold mb-6">{program.title}</h1>

      {program.description && (
        <p className="italic text-gray-700 mb-6">{program.description}</p>
      )}

      <div className="leading-relaxed whitespace-pre-wrap">{program.content}</div>
    </main>
  )
}