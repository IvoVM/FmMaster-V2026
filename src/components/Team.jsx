import { useRef } from "react";
import { team, teamPhoto } from "../data/library";
import { Reveal, SectionHeading } from "./ui";

export function Team() {
  const scroller = useRef(null);

  const move = (direction) => {
    scroller.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  return (
    <section id="equipo" className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              align="left"
              kicker="Familia Master"
              title="Master tiene equipo"
              text="Las voces que acompañan la programación de la semana."
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => move(-1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-brand/20 bg-white text-brand transition hover:bg-brand hover:text-white"
                aria-label="Ver anteriores"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-brand/20 bg-white text-brand transition hover:bg-brand hover:text-white"
                aria-label="Ver siguientes"
              >
                ›
              </button>
            </div>
          </div>
        </Reveal>
        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        >
          {team.map((person) => (
            <article
              key={person.name}
              className="w-[240px] shrink-0 snap-start rounded-[1.6rem] bg-white p-3 shadow-[0_18px_40px_-28px_rgba(233,49,115,0.9)] ring-1 ring-brand/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(233,49,115,0.95)]"
            >
              <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1.2rem] bg-gradient-to-b from-white to-brand-soft">
                <img
                  src={teamPhoto(person.file)}
                  alt={person.name}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-4 px-1 font-display text-lg leading-tight font-extrabold">{person.name}</h3>
              {person.show ? <p className="mt-1 px-1 pb-2 text-sm font-semibold text-brand">{person.show}</p> : <div className="pb-2" />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
