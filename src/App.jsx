import { useEffect, useState } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { LivePlayer } from "./components/LivePlayer";
import { Marquee } from "./components/Marquee";
import { Navbar } from "./components/Navbar";
import { Schedule } from "./components/Schedule";
import { Semanario } from "./components/Semanario";
import { Team } from "./components/Team";
import { airPhrase } from "./lib/years";

export default function App() {
  useEffect(() => {
    document.title = `FM Master 105.3 · ${airPhrase()}`;
  }, []);

  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main>
        <Hero />
        <LivePlayer />
        <Marquee />
        <Semanario />
        <About />
        <Team />
        <Schedule />
        <Contact />
      </main>
      <Footer />
      <LiveFab />
    </>
  );
}

function LiveFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#vivo"
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand/40 md:hidden"
    >
      <span className="live-dot inline-block h-2.5 w-2.5 rounded-full" />
      En vivo
    </a>
  );
}
