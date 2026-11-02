import siteData from '@/data/site.json';
import projectsData from '@/data/projects.json';

// Types
export interface SiteConfig {
  name: string;
  firstName: string;
  logo: string;
  title: string;
  siteUrl: string;
  portrait: string;
  resume: string;
  status: string;
  statusShort: string;
  shortBio: string;
  longBio: string;
  location: string;
  email: string;
  personalEmail?: string;
  phone?: string;
  timezone: string;
  heroTaglines: string[];
  badges: string[];
  social: {
    github: string;
    githubHandle: string;
    linkedin: string;
    linkedinHandle: string;
    twitter: string;
    medium: string;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
  };
  stats: Array<{
    value: string;
    suffix?: string;
    label: string;
  }>;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  challenge: string;
  solution: string;
  outcome: string;
  coverImage: string;
  images: string[];
  tags: string[];
  tech: string[];
  role: string;
  timeline: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  repo: string;
  demo: string;
  featured: boolean;
  headline?: string;
  headlineLabel?: string;
}

// Content getters
export function getSiteConfig(): SiteConfig {
  return siteData as SiteConfig;
}

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getFeaturedProjects(): Project[] {
  return (projectsData as Project[]).filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return (projectsData as Project[]).find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return (projectsData as Project[]).map((project) => project.slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  (projectsData as Project[]).forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

// Utility functions
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

