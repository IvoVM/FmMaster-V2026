import { links } from "../data/library";
import { Reveal, SectionHeading } from "./ui";

export function Semanario() {
  return (
    <section id="semanario" className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mb-8 flex justify-center">
            <img src="/media/brand/semanario.png" alt="El Semanario del Sudeste" className="h-16 w-auto md:h-20" />
          </div>
          <SectionHeading
            kicker="El Semanario"
            title="Las noticias de Miramar"
            text="El formato digital del Grupo Master. Enterate de lo que pasa en la ciudad."
          />
        </Reveal>
        <Reveal delay={100} className="mt-10">
          <div className="overflow-hidden rounded-[1.75rem] bg-white p-2 shadow-[0_24px_60px_-36px_rgba(233,49,115,0.7)] ring-1 ring-brand/10 md:p-3">
            <iframe
              title="El Semanario de Miramar"
              src={links.semanario}
              className="h-[420px] w-full rounded-[1.25rem] bg-brand-soft md:h-[520px]"
            />
          </div>
          <p className="mt-4 text-center">
            <a
              href={links.semanario}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-bold text-brand underline-offset-4 hover:underline"
            >
              Abrir El Semanario en una pestaña nueva
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
