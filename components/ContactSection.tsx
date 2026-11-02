import { ArrowUpRight, Mail } from 'lucide-react';
import { getSiteConfig } from '@/lib/content';

const site = getSiteConfig();

const CHANNELS = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'LinkedIn', value: site.social.linkedinHandle, href: site.social.linkedin },
  { label: 'GitHub', value: site.social.githubHandle, href: site.social.github },
  { label: 'Based in', value: site.location, href: '' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div data-build>
            <p className="eyebrow text-accent">04 / Get in touch</p>
            <h2 className="mt-3 font-display text-6xl uppercase leading-[0.9] sm:text-8xl">
              Let&apos;s build
              <br />
              <span className="text-accent">together.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-bone/70">
              Research collaborations, internships, or a model that needs a hard look. Send me a note.
            </p>
          </div>
          <a
            data-build
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-6 bg-accent px-6 py-4 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-accent-bright"
          >
            Start a conversation <Mail className="h-4 w-4" />
          </a>

          <div className="mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-2">
            {CHANNELS.map((c) => {
              const inner = (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-dim">{c.label}</p>
                  <p className="mt-2 flex items-center gap-2 text-[15px] font-semibold text-bone">
                    {c.value}
                    {c.href && <ArrowUpRight className="h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" />}
                  </p>
                </>
              );
              return c.href ? (
                <a
                  data-build
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group border-b border-line py-5 pr-6"
                >
                  {inner}
                </a>
              ) : (
                <div data-build key={c.label} className="border-b border-line py-5 pr-6">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>

        <div data-build className="relative flex min-h-[380px] flex-col justify-between overflow-hidden bg-accent p-8">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.35) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
            aria-hidden="true"
          />
          <div className="relative flex items-start justify-between">
            <span className="font-display text-3xl text-ink">
              {site.logo}<sup className="text-xs">®</sup>
            </span>
            <span className="text-right text-[10px] font-bold uppercase tracking-wider text-ink/70">
              ML / Research
              <br />
              Multimodal / RAG
            </span>
          </div>
          <p className="relative font-display text-6xl uppercase leading-[0.9] text-ink sm:text-7xl">
            Find the
            <br />
            failure.
          </p>
        </div>
      </div>
    </section>
  );
}
