import { getSiteConfig } from '@/lib/content';

const site = getSiteConfig();

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center sm:px-10">
        <span className="font-display text-2xl text-bone">
          {site.logo}<sup className="ml-0.5 text-[10px] text-accent">®</sup>
        </span>
        <div className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wider text-dim sm:items-end">
          <span>© {new Date().getFullYear()} {site.name}. Find the failure, then fix it.</span>
          <span className="normal-case tracking-normal text-dim/70">
            Design based on{' '}
            <a href="https://github.com/krishi-shah/krishi-shah.github.io" target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-2 hover:text-bone">
              Krishi Shah&apos;s portfolio
            </a>
            , used with permission.
          </span>
        </div>
      </div>
    </footer>
  );
}
