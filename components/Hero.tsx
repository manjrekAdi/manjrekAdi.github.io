import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react';

import { getSiteConfig } from '@/lib/content';

const site = getSiteConfig();
const STATS: Array<{ value: string; suffix?: string; label: string; link?: string }> = site.stats;

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-[66px]">
      <div className="relative mx-auto min-h-[calc(100svh-66px)] max-w-[1400px] px-5 pb-10 sm:px-10">
        {/* Top labels */}
        <div className="relative z-20 flex items-start justify-between pt-7">
          <div data-build className="eyebrow leading-5">
            <div className="text-accent">MSc Researcher / ML Engineer</div>
            <div className="text-bone/80">Computer Science · York University</div>
          </div>
          <div data-build className="eyebrow flex items-center gap-2 text-bone/80">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="hidden sm:inline">{site.status}</span>
            <span className="sm:hidden">{site.statusShort}</span>
          </div>
        </div>

        {/* Giant word and portrait. On phones they sit in their own stage at the top;
            from lg up the wrapper is static so both pin to the full hero. */}
        <div
          className={`relative mt-2 lg:static lg:mt-0 lg:h-auto ${
            site.portrait ? 'h-[min(118vw,520px)] sm:h-[560px]' : 'h-[34vw] sm:h-[260px]'
          }`}
        >
          <div
            data-build
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[6%] z-0 select-none lg:top-[13%]"
          >
            <div data-depth="-0.7" data-scroll="0.32" className="hero-word text-center font-display text-[24vw] uppercase will-change-transform lg:text-[22vw] xl:text-[19.5rem]">
              Portfolio
            </div>
          </div>

          {site.portrait && (
            <div
              data-build
              className="absolute inset-x-0 bottom-0 z-10 mx-auto w-[96vw] max-w-[520px] sm:w-[64vw] lg:w-[38vw] lg:max-w-[560px]"
            >
              <div aria-hidden="true" data-depth="0.3" data-scroll="0.18" className="hero-glow absolute -inset-x-[12%] -top-[6%] bottom-[10%] -z-10" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-depth="0.55"
                data-scroll="0.1"
                src={site.portrait}
                alt={site.name}
                width={828}
                height={956}
                className="portrait-tint block h-auto w-full will-change-transform"
              />
            </div>
          )}
        </div>

        {/* Left column */}
        <div className="relative z-20 -mt-16 max-w-[420px] lg:mt-[9vh]">
          <p data-build className="-rotate-6 font-script text-5xl text-bone sm:text-6xl">
            Hello, I&apos;m
          </p>
          <h1 data-build className="mt-1 font-display text-[18vw] uppercase leading-[0.9] text-bone sm:text-[7.5rem]">
            {site.firstName}<span className="accent-dot" />
          </h1>
          <p data-build className="mt-6 text-2xl font-extrabold uppercase leading-tight text-accent sm:text-[28px]">
            Multimodal ML &amp;
            <br />
            <span data-rotate='["Reliable AI","Emotion AI","Evaluation","Grounded RAG"]'>Reliable AI</span>
          </p>
          <p data-build className="mt-5 max-w-[300px] text-[15px] leading-7 text-bone/75">
            I study where multimodal models go wrong and build the pipelines that measure it. Before research, I
            shipped infrastructure at TD Bank.
          </p>
          <a
            data-build
            data-magnetic
            href="#work"
            className="mt-8 inline-flex items-center gap-6 bg-accent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
          >
            See my work <ArrowDown className="h-4 w-4" />
          </a>
          <p data-build className="mt-7 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-dim">
            <MapPin className="h-3.5 w-3.5 text-accent" /> {site.location}
          </p>
        </div>

        {/* Right column */}
        <div className="relative z-20 mt-16 w-full lg:absolute lg:right-10 lg:top-[38%] lg:mt-0 lg:w-[260px]">
          <div data-build className="mb-6 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 text-xl text-accent">
              ✳
            </span>
            <p className="text-[13px] leading-5 text-bone/85">
              Every gain.
              <br />Five seeds deep.
            </p>
          </div>
          {STATS.map((s) => (
            <div data-build key={s.label} className="flex items-center gap-6 border-b border-line py-3.5">
              <div className="w-[88px] font-display text-[44px] leading-none text-accent">
                <span data-count={s.value}>{s.value}</span>
                {s.suffix && <span className="ml-0.5 text-lg">{s.suffix}</span>}
              </div>
              <div className="eyebrow max-w-[140px] text-[10px] font-semibold leading-4 text-dim">
                {s.link ? (
                  <a href={s.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-bone">
                    {s.label} <ArrowUpRight className="h-3 w-3 text-accent" />
                  </a>
                ) : (
                  s.label
                )}
              </div>
            </div>
          ))}
          {site.resume && (
            <a
              data-build
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="eyebrow mt-5 inline-flex items-center gap-3 text-bone/85 hover:text-bone"
            >
              <Download className="h-4 w-4 text-accent" /> Download CV
            </a>
          )}
        </div>
      </div>
      <div className="mx-auto h-px max-w-[1400px] bg-line" />
    </section>
  );
}
