import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { getAllProjects, getProjectBySlug, getProjectSlugs, getSiteConfig } from '@/lib/content';

const site = getSiteConfig();

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | ${site.name}`,
      description: project.shortDescription,
    },
  };
}

const BLOCKS = [
  { key: 'challenge', label: 'The problem' },
  { key: 'solution', label: 'What I did' },
  { key: 'outcome', label: 'What came out of it' },
] as const;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const all = getAllProjects();
  const index = all.findIndex((p) => p.slug === slug);
  const next = all[(index + 1) % all.length];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex h-[66px] max-w-[1400px] items-center justify-between px-5 sm:px-10">
          <a href="/" className="font-display text-[26px] leading-none tracking-tight text-bone">
            {site.logo}
            <sup className="ml-0.5 align-super text-[11px] text-accent">®</sup>
          </a>
          <a href="/#work" className="flex items-center gap-2 text-[13px] text-dim transition-colors hover:text-bone">
            <ArrowLeft className="h-4 w-4" /> All work
          </a>
        </div>
      </header>

      <main className="pt-[66px]">
        <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-14 sm:px-10 sm:pt-20">
          <p className="eyebrow text-accent">
            {String(index + 1).padStart(2, '0')} / {project.tags[0]}
          </p>
          <h1 className="mt-3 max-w-5xl font-display text-6xl uppercase leading-[0.92] text-bone sm:text-8xl">
            {project.title}
            <span className="accent-dot" />
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-bone/75">{project.longDescription}</p>

          <div className="mt-10 grid grid-cols-1 border-t border-line sm:grid-cols-3">
            <div className="border-b border-line py-5 pr-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-dim">Role</p>
              <p className="mt-2 text-[15px] font-semibold text-bone">{project.role}</p>
            </div>
            <div className="border-b border-line py-5 pr-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-dim">When</p>
              <p className="mt-2 text-[15px] font-semibold text-bone">{project.timeline}</p>
            </div>
            <div className="border-b border-line py-5 pr-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-dim">Stack</p>
              <p className="mt-2 text-[15px] font-semibold text-bone">{project.tech.join(' · ')}</p>
            </div>
          </div>
        </section>

        {project.metrics.length > 0 && (
          <section className="border-y border-line bg-gradient-to-b from-[#0d0d0d] to-ink">
            <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-5 py-12 sm:grid-cols-3 sm:px-10">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-display text-6xl leading-none text-accent sm:text-7xl">{m.value}</div>
                  <div className="eyebrow mt-3 text-[10px] text-dim">{m.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-20">
          <div className="border-t border-line">
            {BLOCKS.map((b, i) =>
              project[b.key] ? (
                <div key={b.key} className="grid gap-4 border-b border-line py-8 lg:grid-cols-[260px_1fr] lg:gap-10">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-4xl leading-none text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-bone">{b.label}</h2>
                  </div>
                  <p className="max-w-3xl text-[16px] leading-8 text-bone/75">{project[b.key]}</p>
                </div>
              ) : null,
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-6 bg-accent px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-bright"
              >
                Live site <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-line px-5 py-3.5 text-[12px] font-bold uppercase tracking-wider text-bone transition-colors hover:border-accent hover:text-accent"
              >
                <Github className="h-4 w-4" /> Source on GitHub
              </a>
            )}
            {!project.repo && (
              <p className="self-center text-[12px] text-dim">Code is private or part of ongoing research.</p>
            )}
          </div>
        </section>

        {next && next.slug !== project.slug && (
          <a href={`/projects/${next.slug}/`} className="group block border-t border-line">
            <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-5 py-14 sm:px-10">
              <div>
                <p className="eyebrow text-dim">Next project</p>
                <p className="mt-3 font-display text-4xl uppercase leading-none text-bone transition-colors group-hover:text-accent sm:text-6xl">
                  {next.title}
                </p>
              </div>
              <ArrowUpRight className="h-8 w-8 shrink-0 text-dim transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
            </div>
          </a>
        )}
      </main>
    </>
  );
}
