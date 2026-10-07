import { links } from "../data/library";
import { Reveal, SectionHeading } from "./ui";

const cards = [
  {
    title: "Dirección",
    body: "Avenida 26 N° 2001, Miramar",
  },
  {
    title: "Teléfonos",
    body: "42-0300 ó 42-0389",
  },
  {
    title: "Email",
    body: links.email,
    href: `mailto:${links.email}`,
  },
];

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading kicker="Contacto" title="Pasá por el estudio" text="O escribinos. La puerta de avenida 26 está abierta." />
        </Reveal>
        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="grid gap-3">
              {cards.map((card) => (
                <article key={card.title} className="rounded-[1.4rem] bg-white px-5 py-4 ring-1 ring-brand/10">
                  <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">{card.title}</p>
                  {card.href ? (
                    <a href={card.href} className="mt-1 block text-lg font-semibold break-all hover:text-brand">
                      {card.body}
                    </a>
                  ) : (
                    <p className="mt-1 text-lg font-semibold">{card.body}</p>
                  )}
                </article>
              ))}
              <article className="rounded-[1.4rem] bg-white px-5 py-4 ring-1 ring-brand/10">
                <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">Facebook</p>
                <div className="mt-2 flex flex-col gap-1 font-semibold">
                  <a href={links.facebookJuan} target="_blank" rel="noreferrer" className="hover:text-brand">
                    Juan Mastrangelo
                  </a>
                  <a href={links.facebookRadio} target="_blank" rel="noreferrer" className="hover:text-brand">
                    Radio Master
                  </a>
                </div>
              </article>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="h-full overflow-hidden rounded-[1.75rem] bg-white p-2 ring-1 ring-brand/10">
              <iframe
                title="Ubicación del estudio de FM Master en Miramar"
                src={links.map}
                className="h-[420px] w-full rounded-[1.3rem] lg:h-full lg:min-h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
