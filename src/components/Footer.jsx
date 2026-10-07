import { FOUNDED_YEAR, links } from "../data/library";
import { airPhrase, yearsOnAir } from "../lib/years";
import { Logo } from "./ui";

export function Footer() {
  const year = yearsOnAir() + FOUNDED_YEAR;

  return (
    <footer className="bg-night text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pt-12 pb-24 md:flex-row md:items-end md:justify-between md:pb-12">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-sm font-display text-2xl font-extrabold text-balance">{airPhrase()}</p>
          <p className="mt-2 text-sm text-white/60">Avenida 26 N° 2001 · Miramar · 105.3 FM</p>
        </div>
        <div className="text-sm text-white/70 md:text-right">
          <p>© {year} FM Master</p>
          <p className="mt-2">
            Página desarrollada por{" "}
            <a href={links.developer} target="_blank" rel="noreferrer" className="font-semibold text-gold hover:underline">
              Ivo Mastrángelo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
