import { MetadataRoute } from 'next';
import { getProjectSlugs, getSiteConfig } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteConfig().siteUrl;
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    ...getProjectSlugs().map((slug) => ({
      url: `${base}/projects/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
