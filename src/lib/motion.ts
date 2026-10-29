import type { Variants, Transition } from "framer-motion";

/**
 * Identidad de movimiento centralizada.
 * Interacciones ~180–350 ms, easing suave, springs controlados, stagger sutil.
 * Todas las fábricas aceptan `reduced` para respetar prefers-reduced-motion
 * (movimiento → solo opacidad casi instantánea).
 */
export const EASE_SOFT = [0.16, 0.84, 0.44, 1] as const;

export const DURATION = {
  fast: 0.18,
  base: 0.24,
  slow: 0.32,
} as const;

/** Transición de recolocación (layout) suave. */
export function layoutTransition(reduced: boolean): Transition {
  return reduced
    ? { duration: 0 }
    : { type: "spring", stiffness: 500, damping: 40, mass: 0.6 };
}

/** Tarjeta/chip de la grilla: opacity + translateY + scale ligera. */
export function gridItemVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.12 } },
      exit: { opacity: 0, transition: { duration: 0.1 } },
    };
  }
  return {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: DURATION.base, ease: EASE_SOFT },
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.98,
      transition: { duration: DURATION.fast, ease: EASE_SOFT },
    },
  };
}

/** Aparición/desaparición simple (estado vacío, botones). */
export function fadeVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.12 } },
      exit: { opacity: 0, transition: { duration: 0.1 } },
    };
  }
  return {
    initial: { opacity: 0, y: 6 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.base, ease: EASE_SOFT },
    },
    exit: {
      opacity: 0,
      y: 6,
      transition: { duration: DURATION.fast, ease: EASE_SOFT },
    },
  };
}
