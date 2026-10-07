import { useCallback, useEffect, useRef, useState } from "react";
import { carouselFiles, slidePaths } from "../data/library";

const DURATION = 5600;

const slides = carouselFiles.map((_, index) => ({
  ...slidePaths(index),
  alt: `Foto ${index + 1} de FM Master junto a la comunidad de Miramar`,
}));

function Chevron({ dir }) {
  const d = dir === "left" ? "M14 6 L8 12 L14 18" : "M10 6 L16 12 L10 18";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Gallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(null);
  const thumbs = useRef(null);
  const total = slides.length;
  const reduceMotion = usePrefersReducedMotion();

  const go = useCallback((next) => {
    setIndex(((next % total) + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const timeout = window.setTimeout(() => go(index + 1), DURATION);
    return () => window.clearTimeout(timeout);
  }, [go, index, paused, reduceMotion]);

  useEffect(() => {
    const image = new Image();
    image.src = slides[(index + 1) % total].src;
  }, [index, total]);

  useEffect(() => {
    const parent = thumbs.current;
    const thumb = parent?.children[index];
    if (!parent || !thumb) return;
    const left = thumb.offsetLeft - parent.clientWidth / 2 + thumb.clientWidth / 2;
    parent.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, [index, reduceMotion]);

  const slide = slides[index];

  return (
    <div
      className="outline-none"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(index + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(index - 1);
        }
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div
        className="relative overflow-hidden rounded-[1.75rem] bg-night shadow-[0_40px_90px_-46px_rgba(42,12,24,0.85)] ring-1 ring-white/15"
        onPointerDown={(event) => {
          startX.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (startX.current == null) return;
          const delta = event.clientX - startX.current;
          if (delta > 48) go(index - 1);
          else if (delta < -48) go(index + 1);
          startX.current = null;
        }}
      >
        <div className="relative aspect-video touch-pan-y">
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={1600}
            height={900}
            className="slide-in absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night/70 to-transparent" />
          <p className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
            {paused || reduceMotion ? null : (
              <div
                key={index}
                className="progress-bar h-full bg-gold"
                style={{ animationDuration: `${DURATION}ms` }}
              />
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => go(index - 1)}
          className="absolute top-1/2 left-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-brand shadow-lg transition hover:scale-105"
          aria-label="Foto anterior"
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          className="absolute top-1/2 right-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-brand shadow-lg transition hover:scale-105"
          aria-label="Foto siguiente"
        >
          <Chevron dir="right" />
        </button>
      </div>

      <div ref={thumbs} className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {slides.map((item, itemIndex) => {
          const active = itemIndex === index;
          return (
            <button
              key={item.src}
              type="button"
              onClick={() => go(itemIndex)}
              aria-label={`Ver foto ${itemIndex + 1}`}
              aria-current={active ? "true" : undefined}
              className={`h-16 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                active ? "border-gold opacity-100" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={item.thumb} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduce;
}
