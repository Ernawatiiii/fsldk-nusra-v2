import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/login'],
      },
    ],
    sitemap: 'https://fsldk-nusra-v2.vercel.app/sitemap.xml',
  }
}