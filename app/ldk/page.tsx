import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 60

export default async function LdkPage() {
  const { data: ldks } = await supabase
    .from('ldk')
    .select('*')
    .eq('active', true)
    .order('name')

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <h1>Direktori LDK</h1>
      <p style={{ color: '#666' }}>Lembaga Dakwah Kampus se-Nusa Tenggara</p>

      {ldks && ldks.length === 0 && <p>Belum ada data LDK.</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginTop: 24 }}>
        {ldks?.map((l) => (
          <Link key={l.id} href={`/ldk/${l.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, height: '100%' }}>
              {l.logo_url && (
                <img src={l.logo_url} alt={l.name} style={{ width: 60, height: 60, objectFit: 'contain', marginBottom: 12 }} />
              )}
              <h3 style={{ margin: '0 0 4px 0' }}>{l.name}</h3>
              <p style={{ color: '#666', margin: '0 0 4px 0', fontSize: 14 }}>{l.campus}</p>
              <p style={{ color: '#999', margin: 0, fontSize: 13 }}>📍 {l.city}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}