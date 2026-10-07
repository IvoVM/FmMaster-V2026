import { links } from "../data/library";
import { yearsOnAir } from "../lib/years";
import { Reveal } from "./ui";

export function About() {
  const years = yearsOnAir();
  const stats = [
    { value: "105.3", label: "FM Master" },
    { value: "2000", label: "Año de salida" },
    { value: `+${years}`, label: "Años al aire" },
    { value: "24 hs", label: "En vivo" },
  ];

  return (
    <section id="historia" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="overflow-hidden rounded-[1.75rem] bg-night p-3 shadow-[0_30px_70px_-40px_rgba(233,49,115,0.9)]">
            <img
              src="/media/brand/grupo-master.webp"
              alt="Grupo Master de Comunicación: FM Master 105.3, FM Más 106.5 y El Semanario"
              className="w-full rounded-[1.2rem]"
            />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <p className="mb-3 text-xs font-bold tracking-[0.22em] text-brand uppercase">Nuestra historia</p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
            Grupo Master de <span className="text-brand">Comunicación</span>
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/75">
            <p>
              El 1 de agosto de 2000 empezó a emitir FM Master en el 105.3 MHz, con la dirección de Juan
              Mastrángelo y Graciela Curone. La planta transmisora estaba en avenida 40 n.º 732. Cuatro años
              después, ya con planta y estudio propios en avenida 26 n.º 2001, se formó el Grupo Master de
              Comunicación: se sumaron FM Más 106.5 y el formato digital{" "}
              <a href={links.semanario} target="_blank" rel="noreferrer" className="font-semibold text-brand underline-offset-4 hover:underline">
                El Semanario del Sudeste
              </a>
              .
            </p>
            <p>
              La programación mezcla música e información, con una mirada puesta en lo social: la llegada de
              Papá Noel, los especiales del Día del Niño, del padre y de la madre, y el trabajo de cada
              conductor junto a la comunidad de Miramar.
            </p>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-brand-soft px-3 py-4 text-center">
                <dt className="font-display text-2xl font-extrabold text-brand">{stat.value}</dt>
                <dd className="mt-1 text-xs font-semibold tracking-wide text-ink/70 uppercase">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
