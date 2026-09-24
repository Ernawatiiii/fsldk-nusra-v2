import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

export default async function LdkDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: ldk } = await supabase
    .from('ldk')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (!ldk) notFound()

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <Link href="/ldk">← Balik ke direktori</Link>

      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
        {ldk.logo_url && (
          <img src={ldk.logo_url} alt={ldk.name} style={{ width: 80, height: 80, objectFit: 'contain' }} />
        )}
        <div>
          <h1 style={{ margin: 0 }}>{ldk.name}</h1>
          <p style={{ color: '#666', margin: '4px 0 0 0' }}>{ldk.campus} • {ldk.city}</p>
        </div>
      </div>

      {ldk.description && (
        <p style={{ marginTop: 24, lineHeight: 1.8 }}>{ldk.description}</p>
      )}

      <div style={{ marginTop: 24, display: 'flex', gap: 16 }}>
        {ldk.instagram_url && (
          <a href={ldk.instagram_url} target="_blank" rel="noreferrer">📷 Instagram</a>
        )}
        {ldk.website_url && (
          <a href={ldk.website_url} target="_blank" rel="noreferrer">🌐 Website</a>
        )}
      </div>
    </main>
  )
}