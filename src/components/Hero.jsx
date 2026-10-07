import { useCountUp } from "../hooks/useCountUp";
import { yearsOnAir } from "../lib/years";
import { Gallery } from "./Gallery";

export function Hero() {
  const years = yearsOnAir();
  const [ref, value] = useCountUp(years);
  const label = `Más de ${years} años siendo TU MEJOR COMPAÑÍA...`;

  return (
    <section id="inicio" className="relative overflow-hidden bg-night text-white">
      <div className="blob pointer-events-none absolute -top-16 -left-20 h-80 w-80 rounded-full bg-brand/80 blur-3xl" />
      <div
        className="blob pointer-events-none absolute top-24 -right-16 h-96 w-96 rounded-full bg-brand-deep blur-3xl"
        style={{ animationDelay: "-6s" }}
      />
      <div className="hero-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-5 pt-14 md:pt-20">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase">
          <span className="live-dot inline-block h-2 w-2 rounded-full" />
          105.3 · LRP 396 · Miramar
        </p>
        <h1 className="max-w-4xl" aria-label={label}>
          <span className="block font-display text-lg font-bold tracking-[0.2em] text-gold uppercase" aria-hidden="true">
            Más de
          </span>
          <span ref={ref} className="mt-1 flex items-end gap-3" aria-hidden="true">
            <span className="year-num font-display text-[clamp(5.5rem,18vw,8.75rem)] leading-[0.82] font-extrabold">
              {value}
            </span>
            <span className="pb-2 font-display text-3xl font-bold md:pb-3 md:text-5xl">años siendo</span>
          </span>
          <span className="mt-3 block font-display text-[clamp(2rem,5.4vw,4.2rem)] leading-[0.95] font-extrabold tracking-wide uppercase text-balance" aria-hidden="true">
            Tu mejor compañía...
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
          La radio de Miramar. Música, información y la comunidad, en el aire desde el 1 de agosto de 2000.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#vivo"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-brand transition hover:-translate-y-0.5 hover:bg-gold hover:text-ink"
          >
            <span className="live-dot inline-block h-2 w-2 rounded-full" />
            Escuchá en vivo
          </a>
          <a
            href="#programacion"
            className="inline-flex items-center rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Ver programación
          </a>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-6xl px-5 pb-16">
        <Gallery />
      </div>

      <svg viewBox="0 0 1440 72" className="block w-full text-blush" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0,32 C180,64 360,8 540,28 C760,52 980,4 1200,28 C1320,42 1380,48 1440,36 L1440,72 L0,72 Z" />
      </svg>
    </section>
  );
}
