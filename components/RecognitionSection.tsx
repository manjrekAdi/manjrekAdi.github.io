import { ArrowUpRight } from 'lucide-react';
import { getSiteConfig } from '@/lib/content';

const site = getSiteConfig();

const ITEMS = [
  { title: 'NSERC USRA / LURA Research Award', org: 'York University, Lassonde', year: '2026' },
  { title: 'Research Talk: Emotion AI and Older Faces', org: 'LURA / USRA research workshop', year: '2026' },
  { title: 'Thesis-Based MSc, Computer Science', org: 'York University, supervised by Dr. Aijun An', year: '2026' },
  { title: 'Graduate Teaching Assistant', org: 'EECS 2030, 3311, and 2031 labs', year: '2026' },
  { title: 'Presenter, TD Innovation Week', org: 'LLM document generation tool', year: 'TD' },
  { title: 'Paper in Preparation', org: 'Age bias in multimodal emotion recognition', year: '2027' },
]

export default function RecognitionSection() {
  return (
    <section id="milestones" className="border-y border-line bg-gradient-to-b from-[#0d0d0d] to-ink">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-20 sm:px-10 sm:py-24 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div data-build>
            <p className="eyebrow text-accent">Milestones</p>
            <h2 data-drift className="mt-3 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
              The research.
              <br />
              <span data-drift-line className="text-accent">The milestones.</span>
            </h2>
          </div>
          <div data-build className="mt-10 flex items-center gap-5">
            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-accent/50">
              <div className="absolute inset-2 rounded-full border border-dashed border-accent/30" aria-hidden="true" />
              <span className="font-display text-6xl leading-none text-bone">
                7<span className="text-3xl text-accent">.</span>
              </span>
            </div>
            <div>
              <div className="eyebrow text-accent">LLMs benchmarked</div>
              <p className="mt-1 text-[13px] text-dim">Seven models, 0.5B to 14B parameters</p>
            </div>
          </div>
          <p data-build className="mt-6 max-w-sm text-sm leading-7 text-bone/70">
            Research that starts with a measurement.
            <br />
            Teaching that keeps the basics sharp.
          </p>
          {site.resume && (
            <a
              data-build
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="eyebrow mt-8 inline-flex items-center gap-3 text-bone hover:text-accent"
            >
              View resume <ArrowUpRight className="h-4 w-4 text-accent" />
            </a>
          )}
        </div>

        <ol className="border-t border-line">
          {ITEMS.map((it, i) => (
            <li
              data-build
              key={it.title}
              className="group flex items-center gap-5 border-b border-line py-5 transition-colors hover:bg-white/[0.02]"
            >
              <span className="w-6 text-[11px] font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-bone sm:text-xl">{it.title}</h3>
                <p className="mt-0.5 text-[12px] text-dim">{it.org}</p>
              </div>
              <span className="font-display text-3xl text-accent transition-transform duration-500 ease-out-expo group-hover:-translate-x-2 sm:text-4xl">
                {it.year}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
