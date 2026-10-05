import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { HiOutlineCheckCircle, HiOutlineFire, HiOutlineClock } from 'react-icons/hi'

export const revalidate = 60

const statusLabel: Record<string, string> = {
  'akan-datang': 'Akan Datang',
  'berlangsung': 'Berlangsung',
  'selesai': 'Selesai',
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
    <main>
      {program.cover_image && (
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img
            src={program.cover_image}
            alt={program.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nusra-dark via-nusra-dark/60 to-transparent" />
        </section>
      )}

      <article className={`max-w-3xl mx-auto px-6 ${program.cover_image ? '-mt-32 relative z-10' : 'py-16'}`}>
        <Link
          href="/program"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-nusra-gold hover:text-nusra-lime transition mb-6"
        >
          ← Program
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center gap-2 bg-nusra-lime text-nusra-dark px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              {program.status === 'selesai' ? <HiOutlineCheckCircle className="w-4 h-4" /> : program.status === 'berlangsung' ? <HiOutlineFire className="w-4 h-4" /> : <HiOutlineClock className="w-4 h-4" />}
              {statusLabel[program.status] || program.status}
            </span>
            {program.period && (
              <span className="inline-flex items-center bg-nusra/10 text-nusra px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                {program.period}
              </span>
            )}
          </div>

          <h1 className="font-black text-3xl md:text-5xl leading-[1.05] uppercase mb-8">
            {program.title}
          </h1>

          {program.description && (
            <p className="text-lg md:text-xl text-nusra-muted italic mb-8 border-l-4 border-nusra-gold pl-6">
              {program.description}
            </p>
          )}

          <div className="leading-relaxed text-nusra-ink/80 whitespace-pre-wrap text-lg">
            {program.content}
          </div>
        </div>
      </article>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/program"
          className="inline-block bg-nusra text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-nusra-gold hover:text-nusra-dark transition-all"
        >
          ← Balik ke Program
        </Link>
      </section>
    </main>
  )
}