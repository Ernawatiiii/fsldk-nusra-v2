import { supabase } from './supabase'

export async function getCurrentProfile() {
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userData.user.id)
    .single()

  return profile
}

export async function isAdmin() {
  const profile = await getCurrentProfile()
  return profile?.role === 'admin'
}

export async function requireAuth(router: any) {
  const { data } = await supabase.auth.getUser()
  if (!data.user) {
    router.push('/login')
    return null
  }
  return data.user
}