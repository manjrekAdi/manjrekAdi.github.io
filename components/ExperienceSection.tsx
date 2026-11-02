import { ArrowUpRight } from 'lucide-react';
import { getSiteConfig } from '@/lib/content';

const site = getSiteConfig();

const experiences = [
  {
    title: 'Machine Learning Research Assistant (NSERC USRA / LURA), supervised by Dr. Aijun An',
    company: 'York University',
    period: 'May 2026 – Aug 2026',
    location: 'Toronto, ON',
    description: [
      'Benchmarked 7 LLMs from 0.5B to 14B parameters across 20+ configurations for multimodal emotion recognition.',
      'Found an age-related accuracy decline of 2.3 points per decade (p < 0.005), isolated to the visual channel.',
      'A projector-only variant with 0.25% trainable parameters matched LoRA on CREMA-D.',
      'Confidence-gated fusion and threshold calibration lifted ElderReact multi-label macro-F1 from 0.358 to 0.434.',
      'Built the pipeline: OpenFace and HuBERT features, Whisper transcription, and zero-shot Qwen2.5-Omni evaluation over 8,700+ clips.',
    ],
    skills: ['PyTorch', 'Qwen2.5-Omni', 'HuBERT', 'Whisper'],
  },
  {
    title: 'Software Engineer Co-op, DNA Support (E-Reporting / CMOD)',
    company: 'TD Bank',
    period: 'Sep 2025 – Apr 2026',
    location: 'Toronto, ON',
    description: [
      'Built an LLM document generation tool with LangGraph, Azure OpenAI, and FAISS, and presented it at TD Innovation Week.',
      'Wrote a multi-environment deploy pipeline (DEV, SIT, PAT, PROD) in bash with rsync, plus GitHub Actions CI with ShellCheck and Ruff on RHEL9 self-hosted runners and Nexus artifact uploads.',
      'Ran the CyberArk passphrase rotation across test environments and Production, including PGP encryption and decryption checks.',
      'Wrote scripts to find hardcoded credentials in server scripts, including Autosys-triggered jobs, and moved them to CyberArk checkout.',
    ],
    skills: ['Bash', 'GitHub Actions', 'LangGraph', 'CyberArk'],
  },
  {
    title: 'Developer, Connect2Talents platform (via Riipen)',
    company: 'SGMC Canada',
    period: '2026',
    location: 'Remote',
    description: [
      'Set up the AWS foundation: Route 53 domains, SES email with DKIM and DMARC, S3 storage, and IAM access control.',
    ],
    skills: ['AWS', 'Route 53', 'SES', 'IAM'],
  },
  {
    title: 'Software Developer (Freelance)',
    company: 'Checklick',
    period: 'Apr 2025 – Aug 2025',
    location: 'Toronto, ON',
    description: [
      'Built responsive pages in React and Tailwind CSS from Zeplin designs.',
      'Worked with designers on UI accuracy and cross-browser behaviour.',
    ],
    skills: ['React', 'Tailwind CSS'],
  },
  {
    title: 'Software Developer (Freelance)',
    company: 'Draw Dream',
    period: 'Feb 2025 – Apr 2025',
    location: 'Toronto, ON',
    description: [
      'Built an interactive coding practice platform in React, TypeScript, and MySQL with user progress tracking.',
    ],
    skills: ['React', 'TypeScript', 'MySQL'],
  },
  {
    title: 'Data Analytics Intern',
    company: 'Ededge Groups',
    period: 'Jan 2025 – Apr 2025',
    location: 'Remote',
    description: [
      'Exploratory data analysis in Python on business problems such as risk analytics.',
      'Built Tableau reports and machine learning pipelines with a data science team.',
    ],
    skills: ['Python', 'pandas', 'Tableau'],
  },
];

const volunteerExperience = [
  {
    title: 'Graduate Teaching Assistant',
    company: 'York University, EECS',
    period: 'Sep 2026 – Present',
    location: 'Toronto, ON',
    description: [
      'Run labs for EECS 2030 (Advanced Object-Oriented Programming) and EECS 3311 (Software Design), with marking and test invigilation.',
      'Assigned to EECS 2031 for Winter 2027.',
    ],
    skills: ['Java', 'Software Design', 'Teaching'],
  },
];

type Role = { title: string; company: string; period: string; location: string; description: string[]; skills: string[] };

function Row({ r, i }: { r: Role; i: number }) {
  return (
    <article data-build className="group grid gap-4 border-b border-line py-8 lg:grid-cols-[180px_1fr_1.4fr] lg:gap-10">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-accent">{r.period}</p>
        <p className="mt-1 text-[11px] uppercase tracking-wider text-dim">{r.location}</p>
      </div>
      <div>
        <h3 className="font-display text-2xl uppercase leading-tight text-bone sm:text-3xl">{r.company}</h3>
        <p className="mt-2 text-sm font-semibold text-bone/70">{r.title}</p>
      </div>
      <div>
        <ul className="space-y-2">
          {r.description.map((d) => (
            <li key={d} className="flex gap-3 text-[14px] leading-6 text-bone/70">
              <span className="mt-[10px] h-[3px] w-3 shrink-0 bg-accent" />
              {d}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {r.skills.map((s) => (
            <span key={s} className="bg-panel2 px-2 py-1 text-[11px] text-dim">
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ExperienceSection() {
  return (
    <section id="journey" className="border-t border-line bg-[#0c0c0c]">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-build>
            <p className="eyebrow text-accent">03 / The journey</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
              Ship it<span className="text-accent">.</span> Then measure it<span className="text-accent">.</span>
            </h2>
          </div>
          {site.resume && (
            <a
              data-build
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border border-line px-5 py-3 text-[12px] font-bold uppercase tracking-wider text-bone transition-colors hover:border-accent hover:text-accent"
            >
              Resume <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="mt-12 border-t border-line">
          {experiences.map((r, i) => (
            <Row key={r.company + r.period} r={r} i={i} />
          ))}
        </div>

        <p data-build className="eyebrow mt-16 border-b border-line pb-3 text-dim">Teaching</p>
        {volunteerExperience.map((r, i) => (
          <Row key={r.company} r={r} i={i} />
        ))}
      </div>
    </section>
  );
}
