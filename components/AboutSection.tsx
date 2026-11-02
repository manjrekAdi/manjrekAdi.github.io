import { getSiteConfig } from '@/lib/content';

const site = getSiteConfig();

const EDUCATION = [
  {
    school: 'York University, Lassonde School of Engineering',
    credential: 'MSc, Computer Science (thesis-based)',
    detail: 'Fall 2026 to present · Toronto',
    notes: 'Supervised by Dr. Aijun An. Research on reliability in multimodal models and retrieval-augmented generation. Graduate TA for EECS 2030, 3311, and 2031.',
  },
  {
    school: 'York University, Lassonde School of Engineering',
    credential: 'BSc Honours, Computer Science',
    detail: '2021 to 2026 · Toronto',
    notes: 'NLP capstone (EECS 4080) supervised by Dr. Aijun An. Information Networks, Software Design, Advanced Object-Oriented Programming, Database Systems. Eight-month software engineering co-op at TD Bank.',
  },
];

const SKILLS = [
  { category: 'Languages', items: ['Python', 'Java', 'TypeScript', 'SQL', 'C/C++', 'Bash'] },
  { category: 'Machine learning', items: ['PyTorch', 'Hugging Face', 'LoRA', 'scikit-learn', 'pandas', 'NumPy'] },
  { category: 'Multimodal', items: ['Qwen2.5-Omni', 'HuBERT', 'Whisper', 'OpenFace', 'BERT'] },
  { category: 'LLMs and RAG', items: ['LangGraph', 'Azure OpenAI', 'FAISS', 'Context attribution'] },
  { category: 'Engineering', items: ['Spring Boot', 'React', 'Flask', 'PostgreSQL', 'GitHub Actions', 'AWS', 'Linux'] },
];

export default function AboutSection() {
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div data-build>
            <p className="eyebrow text-accent">02 / Behind the research</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
              Not just accuracy.
              <br />
              <span className="text-accent">Where it breaks.</span>
            </h2>
          </div>
          <p data-build className="self-end text-[15px] leading-8 text-bone/75">
            I&apos;m Adi, an MSc student in Computer Science at York University. {site.longBio}
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <p data-build className="eyebrow border-b border-line pb-3 text-dim">Education</p>
            {EDUCATION.map((e) => (
              <div data-build key={e.credential} className="border-b border-line py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold text-bone">{e.school}</h3>
                  <span className="text-[11px] uppercase tracking-wider text-accent">{e.detail}</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-bone/80">{e.credential}</p>
                <p className="mt-3 text-[13px] leading-6 text-dim">{e.notes}</p>
              </div>
            ))}
          </div>

          <div>
            <p data-build className="eyebrow border-b border-line pb-3 text-dim">Toolkit</p>
            {SKILLS.map((s) => (
              <div data-build key={s.category} className="flex flex-col gap-3 border-b border-line py-5 sm:flex-row sm:items-center">
                <span className="w-40 shrink-0 text-[11px] font-bold uppercase tracking-wider text-accent">{s.category}</span>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <span key={i} className="border border-line px-2.5 py-1 text-[12px] text-bone/80 transition-colors hover:border-accent hover:text-bone">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
