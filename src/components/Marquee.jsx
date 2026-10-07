import { yearsOnAir } from "../lib/years";

export function Marquee() {
  const years = yearsOnAir();
  const items = [
    "105.3 FM",
    "En vivo las 24 hs",
    "Miramar",
    `Más de ${years} años siendo tu mejor compañía...`,
    "LRP 396",
  ];

  return (
    <div className="marquee overflow-hidden bg-brand text-white">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <p
            key={copy}
            className="flex shrink-0 items-center gap-8 px-4 py-3 text-sm font-semibold tracking-[0.18em] uppercase"
            aria-hidden={copy === 1}
          >
            {items.map((item) => (
              <span key={item} className="inline-flex items-center gap-8">
                {item}
                <span className="text-gold" aria-hidden="true">
                  ●
                </span>
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}
