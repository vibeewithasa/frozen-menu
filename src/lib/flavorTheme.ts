import type { CSSProperties } from "react";
import type { FlavorTheme } from "../data/flavors";

export interface ThemeColors {
  /** color de acento saturado */
  base: string;
  /** tinte pastel para fondos */
  tint: string;
  /** tinta legible sobre el tinte */
  ink: string;
}

/**
 * Paleta permitida. Cada clave de `FlavorTheme` mapea a valores concretos que
 * se aplican como CSS custom properties (var(--flavor*)). Así el color reactivo
 * al sabor NO depende de clases Tailwind construidas en runtime.
 */
const PALETTE: Record<FlavorTheme, ThemeColors> = {
  vainilla: { base: "#E7C98F", tint: "#F7ECD5", ink: "#5A4A2A" },
  fresa: { base: "#F28BA0", tint: "#FBDCE2", ink: "#7A2E3C" },
  pistacho: { base: "#93C583", tint: "#DAEBCF", ink: "#33502A" },
  chocolate: { base: "#8A5A48", tint: "#E8D8CF", ink: "#3A241C" },
  matcha: { base: "#A3C686", tint: "#DDEBCC", ink: "#3A4A28" },
  coral: { base: "#FF6B6B", tint: "#FFE0E0", ink: "#8A2323" },
  cielo: { base: "#6FBEDD", tint: "#CDE8F3", ink: "#1F4A5C" },
};

const DEFAULT_THEME: ThemeColors = PALETTE.coral;

export function flavorColors(theme?: FlavorTheme): ThemeColors {
  return theme ? PALETTE[theme] : DEFAULT_THEME;
}

/** Devuelve el objeto de estilo con las CSS vars para aplicar el tema del sabor. */
export function flavorStyle(theme?: FlavorTheme): CSSProperties {
  const c = flavorColors(theme);
  return {
    "--flavor": c.base,
    "--flavor-tint": c.tint,
    "--flavor-ink": c.ink,
  } as CSSProperties;
}
