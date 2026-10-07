import { useInView } from "../hooks/useInView";

export function Logo({ onDark = false }) {
  const ink = onDark ? "text-white" : "text-ink";

  return (
    <a href="#inicio" className="inline-flex flex-col leading-none">
      <span className="inline-flex items-center gap-1.5 font-display whitespace-nowrap">
        <span className="rounded-md bg-brand px-1.5 py-1 text-xs font-extrabold text-white">FM</span>
        <span className={`text-lg font-extrabold tracking-tight ${ink}`}>Master</span>
        <span className="text-lg font-extrabold tracking-tight text-brand">105.3</span>
      </span>
      <span className={`mt-1 pl-0.5 text-[11px] font-semibold tracking-wide ${onDark ? "text-gold" : "text-brand"}`}>
        Tu mejor compañía...
      </span>
    </a>
  );
}

export function Reveal({ children, className = "", delay = 0 }) {
  const [ref, shown] = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({ kicker, title, text, align = "center" }) {
  const alignment = align === "left" ? "text-left" : "mx-auto max-w-2xl text-center";

  return (
    <div className={alignment}>
      <p className="mb-3 text-xs font-bold tracking-[0.22em] text-brand uppercase">{kicker}</p>
      <h2 className="font-display text-4xl font-extrabold tracking-tight text-balance text-ink md:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-lg leading-relaxed text-ink/70">{text}</p> : null}
    </div>
  );
}

export function WaveBars({ className = "h-8" }) {
  const heights = ["55%", "100%", "70%", "90%", "40%", "80%"];

  return (
    <div className={`flex items-end gap-1 ${className}`} aria-hidden="true">
      {heights.map((height, index) => (
        <span
          key={height + index}
          className="wave-bar"
          style={{ height, animationDelay: `${index * 0.12}s` }}
        />
      ))}
    </div>
  );
}
