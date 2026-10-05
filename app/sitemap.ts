import { supabase } from '@/lib/supabase'
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://fsldk-nusra-v2.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/profil`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/berita`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/agenda`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/program`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/ldk`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/pengurus`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/galeri`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/medsos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const [articles, events, programs, ldks] = await Promise.all([
    supabase.from('articles').select('slug, created_at').eq('published', true),
    supabase.from('events').select('slug, created_at').eq('published', true),
    supabase.from('program').select('slug, created_at').eq('published', true),
    supabase.from('ldk').select('slug, created_at').eq('active', true),
  ])

  const articleUrls: MetadataRoute.Sitemap = (articles.data || []).map((a) => ({
    url: `${BASE_URL}/berita/${a.slug}`,
    lastModified: new Date(a.created_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const eventUrls: MetadataRoute.Sitemap = (events.data || []).map((e) => ({
    url: `${BASE_URL}/agenda/${e.slug}`,
    lastModified: new Date(e.created_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const programUrls: MetadataRoute.Sitemap = (programs.data || []).map((p) => ({
    url: `${BASE_URL}/program/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const ldkUrls: MetadataRoute.Sitemap = (ldks.data || []).map((l) => ({
    url: `${BASE_URL}/ldk/${l.slug}`,
    lastModified: new Date(l.created_at),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticPages, ...articleUrls, ...eventUrls, ...programUrls, ...ldkUrls]
}