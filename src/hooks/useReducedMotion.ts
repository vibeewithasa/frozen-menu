import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * `true` cuando el usuario prefiere movimiento reducido.
 * Envuelve el hook de Framer Motion para tener un punto de importación estable.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
