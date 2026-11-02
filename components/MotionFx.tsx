'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/*
  Page-wide motion layer. Everything here reads data attributes, so the
  section components stay plain markup:

    data-depth / data-scroll   parallax (mouse depth, scroll lag)
    data-drift, data-drift-line  headings that shear apart as they scroll past
    data-count                 number that counts up when its block is revealed
    data-rotate                text that cycles through a JSON list
    data-bars + .cover-bar     project-cover bars that grow in, then ripple
    data-tilt                  card that tilts and lights up under the cursor
    data-magnetic              button that leans toward the cursor

  The cursor-build intro fires a bubbling `built` event on each element it
  reveals; reveal-time effects hang off that. With Motion off (or reduced
  motion) none of this runs and every element sits in its final state.
*/

const root = () => document.documentElement;
const motionOn = () => !root().classList.contains('motion-off');
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>*';

function countUp(el: HTMLElement) {
  const final = el.dataset.count ?? el.textContent ?? '';
  const target = parseFloat(final);
  if (Number.isNaN(target)) return () => {};
  const decimals = (final.split('.')[1] || '').length;
  const start = performance.now() + 180;
  const duration = 1500;
  let raf = 0;
  el.textContent = (0).toFixed(decimals);
  const tick = (now: number) => {
    const k = clamp((now - start) / duration, 0, 1);
    el.textContent = (target * easeOutExpo(k)).toFixed(decimals);
    if (k < 1) raf = requestAnimationFrame(tick);
    else el.textContent = final;
  };
  raf = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(raf);
    el.textContent = final;
  };
}

function scramble(el: HTMLElement, next: string, onDone: () => void) {
  const start = performance.now();
  let raf = 0;
  const tick = (now: number) => {
    const t = now - start;
    let out = '';
    let done = true;
    for (let i = 0; i < next.length; i++) {
      const ch = next[i];
      if (ch === ' ' || t > 160 + i * 38) out += ch;
      else {
        done = false;
        out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
    }
    el.textContent = out;
    if (!done) raf = requestAnimationFrame(tick);
    else onDone();
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

function setup(): () => void {
  const cleanups: Array<() => void> = [];
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const small = window.innerWidth < 768;

  /* ---------- Smooth scrolling (mouse and trackpad only) ----------
     Driven from the same frame loop as the parallax below, so the scroll position
     and everything tied to it update in the same frame. */
  let lenis: Lenis | null = null;
  if (fine) {
    lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 0.95, smoothWheel: true, anchors: true, autoRaf: false });
    cleanups.push(() => lenis?.destroy());
  }

  /* ---------- Pointer position, normalised to -1..1 ---------- */
  let mx = 0;
  let my = 0;
  const onPointer = (e: PointerEvent) => {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (fine) {
    window.addEventListener('pointermove', onPointer, { passive: true });
    cleanups.push(() => window.removeEventListener('pointermove', onPointer));
  }

  /* ---------- Per-frame loop: parallax, heading drift, marquee ---------- */
  type Depth = { el: HTMLElement; d: number; s: number; mx: number; my: number; last: string };
  const depth: Depth[] = Array.from(document.querySelectorAll<HTMLElement>('[data-depth]')).map((el) => ({
    el,
    d: parseFloat(el.dataset.depth || '0'),
    s: parseFloat(el.dataset.scroll || '0'),
    mx: 0,
    my: 0,
    last: '',
  }));
  type Drift = { el: HTMLElement; lines: HTMLElement[]; top: number; h: number; last: string };
  const drift: Drift[] = Array.from(document.querySelectorAll<HTMLElement>('[data-drift]')).map((el) => ({
    el,
    lines: Array.from(el.querySelectorAll<HTMLElement>('[data-drift-line]')),
    top: 0,
    h: 0,
    last: '',
  }));
  // Heading positions are measured once (and again when the page resizes), never per frame.
  const measure = () => {
    const y = window.scrollY;
    for (const h of drift) {
      const prev = h.el.style.transform;
      h.el.style.transform = '';
      const r = h.el.getBoundingClientRect();
      h.el.style.transform = prev;
      h.top = r.top + y;
      h.h = r.height;
    }
  };
  measure();
  document.fonts?.ready.then(measure);
  const ro = new ResizeObserver(() => measure());
  ro.observe(document.body);
  cleanups.push(() => ro.disconnect());

  const marqueeAnim = document.querySelector<HTMLElement>('.marquee-track')?.getAnimations()[0];
  const amp = small ? 12 : 30;
  let lastY = window.scrollY;
  let vel = 0;
  let rate = 1;
  let raf = 0;

  const frame = (time: number) => {
    lenis?.raf(time);
    const y = window.scrollY;
    const vh = window.innerHeight;
    vel = lerp(vel, y - lastY, 0.3);
    lastY = y;

    // Hero depth: the mouse part eases, the scroll part tracks the scroll exactly.
    if (y < vh * 1.4) {
      for (const p of depth) {
        p.mx = lerp(p.mx, fine ? mx * p.d * 22 : 0, 0.075);
        p.my = lerp(p.my, fine ? my * p.d * 12 : 0, 0.075);
        const t = `translate3d(${p.mx.toFixed(1)}px, ${(p.my + y * p.s).toFixed(1)}px, 0)`;
        if (t !== p.last) {
          p.el.style.transform = t;
          p.last = t;
        }
      }
    }

    for (const h of drift) {
      const center = h.top + h.h / 2 - y;
      if (center < -vh || center > vh * 2) continue;
      const x = clamp((center - vh / 2) / vh, -1, 1) * amp;
      const t = `translate3d(${x.toFixed(1)}px, 0, 0)`;
      if (t === h.last) continue;
      h.last = t;
      h.el.style.transform = t;
      const lt = `translate3d(${(-x * 2).toFixed(1)}px, 0, 0)`;
      for (const line of h.lines) line.style.transform = lt;
    }

    if (marqueeAnim) {
      const next = lerp(rate, 1 + Math.min(Math.abs(vel) * 0.45, 8), 0.06);
      if (Math.abs(next - rate) > 0.01) {
        rate = next;
        marqueeAnim.playbackRate = rate;
      }
    }

    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  cleanups.push(() => {
    cancelAnimationFrame(raf);
    depth.forEach((p) => (p.el.style.transform = ''));
    drift.forEach((h) => {
      h.el.style.transform = '';
      h.lines.forEach((l) => (l.style.transform = ''));
    });
    if (marqueeAnim) marqueeAnim.playbackRate = 1;
  });

  /* ---------- Bars ripple only while on screen ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-live', e.isIntersecting)),
    { rootMargin: '100px' },
  );
  const watchBars = (scope: ParentNode) =>
    scope.querySelectorAll<HTMLElement>('[data-bars]').forEach((el) => io.observe(el));
  watchBars(document);
  cleanups.push(() => {
    io.disconnect();
    document.querySelectorAll('[data-bars].is-live').forEach((el) => el.classList.remove('is-live'));
  });

  /* ---------- Reveal-time effects ---------- */
  const stopCounts: Array<() => void> = [];
  const onBuilt = (e: Event) => {
    const t = e.target as HTMLElement;
    const counts = [t, ...Array.from(t.querySelectorAll<HTMLElement>('[data-count]'))].filter((el) =>
      el.hasAttribute('data-count'),
    );
    counts.forEach((el) => stopCounts.push(countUp(el)));
    t.querySelectorAll<HTMLElement>('.cover-bar').forEach((bar, i) => {
      bar.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], {
        duration: 850,
        delay: 120 + i * 18,
        easing: EASE,
        fill: 'backwards',
      });
    });
    watchBars(t);
  };
  document.addEventListener('built', onBuilt);
  cleanups.push(() => {
    document.removeEventListener('built', onBuilt);
    stopCounts.forEach((s) => s());
  });

  /* ---------- Rotating tagline ---------- */
  document.querySelectorAll<HTMLElement>('[data-rotate]').forEach((el) => {
    let words: string[] = [];
    try {
      words = JSON.parse(el.dataset.rotate || '[]');
    } catch {}
    if (words.length < 2) return;
    const original = el.textContent || words[0];
    let i = 0;
    let stop: (() => void) | undefined;
    const timer = window.setInterval(() => {
      const block = el.closest('[data-build]');
      if (document.hidden || (block && !block.classList.contains('is-built'))) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      i = (i + 1) % words.length;
      stop = scramble(el, words[i], () => (stop = undefined));
    }, 3200);
    cleanups.push(() => {
      window.clearInterval(timer);
      stop?.();
      el.textContent = original;
    });
  });

  /* ---------- Hover: tilt + spotlight, magnetic buttons ---------- */
  if (fine) {
    let tiltEl: HTMLElement | null = null;
    let magEl: HTMLElement | null = null;

    const resetTilt = () => {
      if (!tiltEl) return;
      tiltEl.classList.remove('is-tilting');
      tiltEl.style.transform = '';
      tiltEl = null;
    };
    const resetMag = () => {
      if (!magEl) return;
      magEl.classList.remove('is-pulling');
      magEl.style.transform = '';
      magEl.querySelectorAll<SVGElement>('svg').forEach((s) => (s.style.transform = ''));
      magEl = null;
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;

      const tilt = target?.closest?.('[data-tilt]') as HTMLElement | null;
      if (tilt !== tiltEl) resetTilt();
      if (tilt) {
        tiltEl = tilt;
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        tilt.classList.add('is-tilting');
        tilt.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
        tilt.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
        tilt.style.transform = `perspective(900px) rotateX(${((0.5 - py) * 7).toFixed(2)}deg) rotateY(${(
          (px - 0.5) *
          9
        ).toFixed(2)}deg)`;
      }

      const mag = target?.closest?.('[data-magnetic]') as HTMLElement | null;
      if (mag !== magEl) resetMag();
      if (mag) {
        magEl = mag;
        const r = mag.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        mag.classList.add('is-pulling');
        mag.style.transform = `translate3d(${(dx * 0.22).toFixed(1)}px, ${(dy * 0.35).toFixed(1)}px, 0)`;
        mag.querySelectorAll<SVGElement>('svg').forEach(
          (s) => (s.style.transform = `translate3d(${(dx * 0.12).toFixed(1)}px, ${(dy * 0.12).toFixed(1)}px, 0)`),
        );
      }
    };
    const onLeaveWindow = () => {
      resetTilt();
      resetMag();
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeaveWindow);
    cleanups.push(() => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow);
      resetTilt();
      resetMag();
    });
  }

  return () => cleanups.splice(0).reverse().forEach((c) => c());
}

export default function MotionFx() {
  useEffect(() => {
    let teardown: (() => void) | undefined = motionOn() ? setup() : undefined;
    const onMotion = () => {
      teardown?.();
      teardown = motionOn() ? setup() : undefined;
    };
    window.addEventListener('motionchange', onMotion);
    return () => {
      window.removeEventListener('motionchange', onMotion);
      teardown?.();
    };
  }, []);

  return null;
}
