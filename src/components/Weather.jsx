import { useEffect, useState } from "react";

const CACHE_KEY = "fmmaster-weather";
const CACHE_MS = 30 * 60 * 1000;
const ENDPOINT =
  "https://api.open-meteo.com/v1/forecast?latitude=-38.269&longitude=-57.84&current=temperature_2m,weather_code,is_day&timezone=America%2FArgentina%2FBuenos_Aires";

function describe(code) {
  if (code === 0 || code === 1) return "Despejado";
  if (code === 2) return "Parcial";
  if (code === 3) return "Nublado";
  if (code === 45 || code === 48) return "Niebla";
  if (code >= 51 && code <= 57) return "Llovizna";
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "Lluvia";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "Nieve";
  if (code >= 95) return "Tormenta";
  return "Miramar";
}

function iconKind(code, day) {
  const night = day === 0;
  if (code === 0 || code === 1) return night ? "moon" : "sun";
  if (code === 2) return night ? "night-cloud" : "partly";
  if (code === 3) return "cloud";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if (code >= 95) return "storm";
  return "cloud";
}

function readCache() {
  try {
    const saved = JSON.parse(localStorage.getItem(CACHE_KEY) ?? "");
    if (!saved || Date.now() - saved.at > CACHE_MS) return null;
    if (typeof saved.temp !== "number" || typeof saved.code !== "number") return null;
    return saved;
  } catch {
    return null;
  }
}

function writeCache(weather) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ...weather, at: Date.now() }));
  } catch {
    /* el clima se muestra igual si el navegador no guarda datos */
  }
}

function Cloud({ low = false }) {
  return (
    <path
      fill="currentColor"
      d={
        low
          ? "M6.2 13.2h11.2a3.2 3.2 0 0 0 .4-6.4 4.3 4.3 0 0 0-8.2-1.2 3 3 0 0 0-3.4 7.6z"
          : "M5.4 17.8h12.4a4 4 0 0 0 .5-8 5.2 5.2 0 0 0-10-1.2 3.6 3.6 0 0 0-2.9 9.2z"
      }
    />
  );
}

function WeatherIcon({ kind }) {
  const wet = kind === "drizzle" || kind === "rain" || kind === "snow" || kind === "storm";

  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
      {kind === "sun" && (
        <>
          <circle cx="12" cy="12" r="3.5" fill="#f1d244" />
          <g stroke="#f1d244" strokeWidth="1.7" strokeLinecap="round">
            <path d="M12 2.4v2.3M12 19.3v2.3M4.1 4.1l1.6 1.6M18.3 18.3l1.6 1.6M2.4 12h2.3M19.3 12h2.3M4.1 19.9l1.6-1.6M18.3 5.7l1.6-1.6" />
          </g>
        </>
      )}
      {kind === "moon" && <path fill="#f1d244" d="M14.8 3.1a7.4 7.4 0 1 0 6.2 11.4A6.5 6.5 0 1 1 14.8 3.1z" />}
      {kind === "partly" && (
        <>
          <circle cx="8" cy="7.4" r="2.4" fill="#f1d244" />
          <g stroke="#f1d244" strokeWidth="1.4" strokeLinecap="round">
            <path d="M8 2.2v1.3M3.5 3.2l1 .9M2.6 7.4h1.4M3.5 11.6l1-.9M8 12.4v1.3" />
          </g>
          <path fill="currentColor" d="M9.4 19h8.4a3.3 3.3 0 0 0 .2-6.6 4.3 4.3 0 0 0-8.2-1 3 3 0 0 0-.4 7.6z" />
        </>
      )}
      {kind === "night-cloud" && (
        <>
          <path fill="#f1d244" d="M16.8 3a3.8 3.8 0 1 0 3.2 5.8A3.3 3.3 0 0 1 16.8 3z" />
          <path fill="currentColor" d="M7.6 19.2h8.8a3.3 3.3 0 0 0 .2-6.6 4.2 4.2 0 0 0-8-1.1 3 3 0 0 0-1 7.7z" />
        </>
      )}
      {kind === "cloud" && <Cloud />}
      {kind === "fog" && (
        <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4.5 8h15M3 12h18M5.5 16h13" />
        </g>
      )}
      {wet && <Cloud low />}
      {kind === "drizzle" && (
        <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <path d="M8 16.2v2.1M12 17v2.1M16 16.2v2.1" />
        </g>
      )}
      {kind === "rain" && (
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M8.2 16.6 7 20.4M12 16.9l-1.2 3.8M15.8 16.6 14.6 20.4" />
        </g>
      )}
      {kind === "snow" && (
        <g fill="currentColor">
          <circle cx="8" cy="18.4" r="1" />
          <circle cx="12" cy="19.6" r="1" />
          <circle cx="16" cy="18.4" r="1" />
        </g>
      )}
      {kind === "storm" && <path fill="#f1d244" d="M13.4 14.6h-2.6l.8 2.4H9.4L13.6 22l-.6-3.2h2.4l-2-4.2z" />}
    </svg>
  );
}

export function Weather() {
  const [weather, setWeather] = useState(readCache);

  useEffect(() => {
    if (weather && typeof weather.day === "number") return undefined;

    const controller = new AbortController();

    fetch(ENDPOINT, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("clima");
        return response.json();
      })
      .then((data) => {
        const temp = data?.current?.temperature_2m;
        const code = data?.current?.weather_code;
        const day = data?.current?.is_day;
        if (typeof temp !== "number" || typeof code !== "number") return;
        const next = { temp, code, day: day === 0 || day === 1 ? day : 1 };
        writeCache(next);
        setWeather(next);
      })
      .catch(() => {});

    return () => controller.abort();
  }, [weather]);

  if (!weather) return null;

  const label = `${Math.round(weather.temp)}° ${describe(weather.code)}`;

  return (
    <p className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white">
      <WeatherIcon kind={iconKind(weather.code, weather.day)} />
      <span>{label}</span>
    </p>
  );
}
