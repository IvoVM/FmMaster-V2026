import { player } from "../data/library";
import { Reveal, WaveBars } from "./ui";

export function LivePlayer() {
  return (
    <section id="vivo" className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="mb-3 text-xs font-bold tracking-[0.22em] text-brand uppercase">En vivo</p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
            Escuchá <span className="text-brand">{player.title}</span> las 24 horas
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/70">
            La señal del 105.3, directo desde el estudio de avenida 26. Dejá el reproductor abierto y seguí en la página.
          </p>
          <WaveBars className="mt-6 h-10" />
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-[2rem] bg-white p-3 shadow-[0_30px_80px_-36px_rgba(233,49,115,0.85)] ring-1 ring-brand/15">
            <iframe
              title="Reproductor de FM Master en vivo"
              src={player.url}
              className="h-[320px] w-full rounded-[1.4rem] bg-brand-soft md:h-[360px]"
              allow="autoplay"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
