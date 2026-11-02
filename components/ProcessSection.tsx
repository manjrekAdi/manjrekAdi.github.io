'use client';

import { useCallback, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

/* ElderReact macro-F1, step by step. Real numbers from the experiment log.
   "before" draws every row at the naive-fusion score; "after" adds each step. */
const STEPS = [
  { label: 'Naive late fusion', after: 0.358 },
  { label: '+ Per-label thresholds', after: 0.392 },
  { label: '+ Confidence gate', after: 0.417 },
  { label: '+ 5-seed ensemble', after: 0.434 },
];
const BASE = 0.358;

function Ladder({ tuned }: { tuned: boolean }) {
  const W = 800;
  const H = 420;
  const left = 250;
  const right = 60;
  const top = 40;
  const lo = 0.3;
  const hi = 0.45;
  const x = (v: number) => left + ((v - lo) / (hi - lo)) * (W - left - right);
  const rowH = (H - top - 60) / STEPS.length;
  const font = 'var(--font-manrope), sans-serif';
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-full w-full" aria-hidden="true">
      <rect width={W} height={H} fill={tuned ? '#170905' : '#0f0f0f'} />
      {[0.3, 0.35, 0.4, 0.45].map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={top - 10} y2={H - 50} stroke="rgba(255,255,255,0.06)" />
          <text x={x(t)} y={H - 26} fill="#8a8a8a" fontSize="14" fontFamily={font} fontWeight="700" textAnchor="middle">
            {t.toFixed(2)}
          </text>
        </g>
      ))}
      <line x1={x(BASE)} x2={x(BASE)} y1={top - 10} y2={H - 50} stroke="rgba(255,255,255,0.35)" strokeDasharray="6 6" />
      {STEPS.map((st, i) => {
        const v = tuned ? st.after : BASE;
        const y = top + i * rowH + rowH * 0.2;
        const h = rowH * 0.6;
        return (
          <g key={st.label}>
            <text x={24} y={y + h / 2 + 5} fill={tuned ? '#ededed' : '#8a8a8a'} fontSize="16" fontFamily={font} fontWeight="700">
              {st.label}
            </text>
            <rect x={x(lo)} y={y} width={x(v) - x(lo)} height={h} fill={tuned ? '#d0643a' : '#3a3a3a'} opacity={tuned ? 0.85 : 1} />
            <text x={x(v) + 10} y={y + h / 2 + 6} fill={tuned ? '#ffffff' : '#8a8a8a'} fontSize="17" fontFamily={font} fontWeight="800">
              {v.toFixed(3)}
            </text>
          </g>
        );
      })}
      <text x={W - right} y={H - 8} fill="#8a8a8a" fontSize="13" fontFamily={font} fontWeight="700" letterSpacing="1" textAnchor="end">
        MACRO-F1 (AXIS STARTS AT 0.30)
      </text>
    </svg>
  );
}

export default function ProcessSection() {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);

  const setFromX = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-end">
        <div data-build>
          <p className="eyebrow text-accent">A look under the model</p>
          <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] sm:text-6xl">
            Same model.
            <br />
            <span className="text-accent">Better decisions.</span>
          </h2>
          <p className="mt-6 text-lg font-semibold text-bone">Small data punishes clever training.</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-bone/65">
            On ElderReact, every training-side trick I tried failed to beat the baseline. What worked was deciding
            better: per-label thresholds, a confidence gate on fusion, and averaging five seeds took macro-F1 from
            0.358 to 0.434.
          </p>
          <p className="eyebrow mt-8 text-[10px] text-dim">
            Confidence-gated fusion / 2026
            <br />
            <span className="text-bone/70">Audio · Video · Text · Threshold calibration</span>
          </p>
        </div>

        <div data-build>
          <div
            ref={box}
            className="relative aspect-[800/420] cursor-ew-resize touch-pan-y select-none overflow-hidden border border-line"
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              setFromX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (e.buttons) setFromX(e.clientX);
            }}
            role="slider"
            aria-label="Compare naive fusion with the tuned pipeline"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5));
              if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5));
            }}
          >
            <div className="absolute inset-0">
              <Ladder tuned />
            </div>
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Ladder tuned={false} />
            </div>
            <span className="absolute left-3 top-3 bg-ink/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-dim">
              Naive fusion
            </span>
            <span className="absolute right-3 top-3 bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Gated + calibrated
            </span>
            <div className="absolute inset-y-0 w-px bg-white" style={{ left: `${pos}%` }}>
              <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
                <MoveHorizontal className="h-4 w-4" />
              </span>
            </div>
          </div>
          <div className="eyebrow mt-3 flex flex-wrap justify-between gap-2 text-[10px] text-dim">
            <span>Drag to compare</span>
            <span>ElderReact macro-F1, from the experiment log</span>
          </div>
        </div>
      </div>
    </section>
  );
}
