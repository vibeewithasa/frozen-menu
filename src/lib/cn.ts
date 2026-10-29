import { clsx, type ClassValue } from "clsx";

/** Une clases condicionales de forma segura. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
