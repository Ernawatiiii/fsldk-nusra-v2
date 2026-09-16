import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data, error } = await supabase.from('_test').select('*')
  
  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Test Koneksi Supabase</h1>
      {error ? (
        <p style={{ color: 'red' }}>
          ✅ Terkoneksi! (Error wajar: {error.message})
        </p>
      ) : (
        <p style={{ color: 'green' }}>
          ✅ Terkoneksi! Data: {JSON.stringify(data)}
        </p>
      )}
    </main>
  )
}