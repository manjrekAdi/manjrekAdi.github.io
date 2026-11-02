import { MetadataRoute } from 'next'
import { getSiteConfig } from '@/lib/content'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${getSiteConfig().siteUrl}/sitemap.xml`,
  }
}