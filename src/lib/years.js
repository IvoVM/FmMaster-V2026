import { FOUNDED_YEAR } from "../data/library";

/**
 * Años de aire según el calendario de Miramar.
 * 2026 → 26, 2027 → 27. Cambia solo cada 1 de enero.
 */
export function yearsOnAir(date = new Date()) {
  const year = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
  }).format(date);
  return Number(year) - FOUNDED_YEAR;
}

export function airPhrase(date = new Date()) {
  const years = yearsOnAir(date);
  return `Más de ${years} ${years === 1 ? "año" : "años"} siendo TU MEJOR COMPAÑÍA...`;
}
