import { useEffect, useState } from "react";
import { schedule } from "../data/library";
import { buenosAiresNow, isOnAir, prettyTime } from "../lib/schedule";
import { Reveal, SectionHeading } from "./ui";

const ordered = [1, 2, 3, 4, 5, 6, 0].map((day) => schedule.find((item) => item.day === day));

export function Schedule() {
  const [now, setNow] = useState(() => buenosAiresNow());
  const [selected, setSelected] = useState(() => buenosAiresNow().day);
  const current = ordered.find((item) => item.day === selected) ?? ordered[0];

  useEffect(() => {
    const timer = window.setInterval(() => setNow(buenosAiresNow()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="programacion" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <SectionHeading
            kicker="Programación"
            title="La semana en el 105.3"
            text="El día de hoy queda marcado solo, con el programa que está al aire en Miramar."
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Días de la semana">
            {ordered.map((day) => {
              const active = day.day === selected;
              const isToday = day.day === now.day;
              return (
                <button
                  key={day.label}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelected(day.day)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    active ? "bg-brand text-white" : "bg-brand-soft text-ink hover:bg-brand/15"
                  }`}
                >
                  {day.label}
                  {isToday ? (
                    <span className={`ml-2 text-[10px] tracking-wide uppercase ${active ? "text-gold" : "text-brand"}`}>
                      Hoy
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          <ul className="mt-6 space-y-3">
            {current.items.map(([from, to, title]) => {
              const live = selected === now.day && isOnAir(from, to, now.minutes);
              return (
                <li
                  key={`${from}-${title}`}
                  className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-4 transition ${
                    live ? "bg-brand text-white shadow-lg shadow-brand/30" : "bg-blush"
                  }`}
                >
                  <div>
                    <p className={`text-xs font-bold tracking-wide uppercase ${live ? "text-gold" : "text-brand"}`}>
                      {prettyTime(from)} – {prettyTime(to)}
                    </p>
                    <p className="mt-1 font-display text-xl font-extrabold">{title}</p>
                  </div>
                  {live ? (
                    <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-wide uppercase">
                      Al aire
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
