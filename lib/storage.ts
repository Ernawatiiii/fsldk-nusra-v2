import { supabase } from './supabase'

export async function uploadImage(file: File, folder: string = 'umum') {
  const fileExt = file.name.split('.').pop()
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(fileName, file)

  if (uploadError) {
    throw new Error(uploadError.message)
  }

  const { data } = supabase.storage.from('images').getPublicUrl(fileName)
  return data.publicUrl
}