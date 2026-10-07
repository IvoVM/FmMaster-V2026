import { useState } from "react";
import { navLinks } from "../data/library";
import { Logo } from "./ui";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand/10 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Secciones">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-ink/80 transition hover:bg-brand-soft hover:text-brand"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#vivo"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-deep"
          >
            <span className="live-dot inline-block h-2 w-2 rounded-full" />
            Escuchá
          </a>
        </nav>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-brand/20 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span className={`absolute left-0 h-0.5 w-5 bg-current transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute top-1.5 left-0 h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-current transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>
      {open ? (
        <nav id="menu-movil" className="menu-in border-t border-brand/10 bg-white px-5 py-4 md:hidden" aria-label="Secciones">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="block rounded-2xl px-3 py-3 text-base font-semibold text-ink hover:bg-brand-soft hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
