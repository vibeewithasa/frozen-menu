/**
 * Fuente ÚNICA de sabores y categorías.
 * Para agregar un sabor: añade un objeto a `rawFlavors`. No hace falta tocar
 * componentes ni layouts. La grilla, tabs, buscador y preview se adaptan solos.
 *
 * Imagen: por convención se resuelve a /images/flavors/<categoryId>/<id>.jpg.
 * Si el archivo no existe, la UI muestra un fallback visual elegante (no un error).
 * Puedes sobrescribir la ruta con el campo `image`.
 */

/** Paleta de temas permitidos (tipada). NO se usan para construir clases en runtime;
 *  mapean a CSS custom properties definidas en globals.css (var(--flavor-*)). */
export type FlavorTheme =
  | "vainilla"
  | "fresa"
  | "pistacho"
  | "chocolate"
  | "matcha"
  | "coral"
  | "cielo";

export interface FlavorCategory {
  /** clave estable, coincide con la carpeta de imágenes */
  id: string;
  /** nombre visible en la UI */
  name: string;
  /** orden de aparición de las tabs */
  order: number;
  /** si es false, la categoría (y su tab) no se muestra */
  available: boolean;
}

export interface Flavor {
  /** slug estable y único; coincide con el nombre del archivo de imagen */
  id: string;
  name: string;
  /** referencia a FlavorCategory.id */
  categoryId: string;
  description?: string;
  /** ruta de imagen; si se omite se resuelve por convención */
  image?: string;
  /** tema de color (clave tipada); controla el color reactivo de la UI */
  theme?: FlavorTheme;
  /** aparece en la sección Destacados (decisión de negocio, no del código) */
  featured?: boolean;
  /** disponible para venta; si es false se atenúa y etiqueta */
  available?: boolean;
  /** sabor nuevo o de temporada -> badge */
  isNew?: boolean;
  season?: string;
}

export const categories: FlavorCategory[] = [
  { id: "leche", name: "Base de leche", order: 1, available: true },
  { id: "agua", name: "Base de agua", order: 2, available: true },
  { id: "premium", name: "Premium", order: 3, available: true },
];

/** Definición cruda de sabores (los 26 actuales del proyecto). */
type RawFlavor = Omit<Flavor, "image"> & { image?: string };

const rawFlavors: RawFlavor[] = [
  { id: "oreo", name: "Oreo", categoryId: "leche", theme: "chocolate" },
  { id: "nutella", name: "Nutella", categoryId: "leche", theme: "chocolate" },
  { id: "capuchino", name: "Capuchino", categoryId: "leche", theme: "chocolate" },
  { id: "mazapan", name: "Mazapán", categoryId: "leche", theme: "vainilla" },
  { id: "coco", name: "Coco", categoryId: "leche", theme: "vainilla" },
  { id: "cajeta", name: "Cajeta", categoryId: "leche", theme: "chocolate" },
  { id: "galleta-maria", name: "Galleta María", categoryId: "leche", theme: "vainilla" },
  { id: "bubulubu", name: "Bubulubu", categoryId: "leche", theme: "fresa" },
  { id: "fresas-con-crema", name: "Fresas con Crema", categoryId: "leche", theme: "fresa" },
  { id: "pay-de-limon", name: "Pay de Limón", categoryId: "leche", theme: "pistacho" },
  { id: "vainilla", name: "Vainilla", categoryId: "leche", theme: "vainilla" },
  { id: "chocolate", name: "Chocolate", categoryId: "leche", theme: "chocolate" },
  { id: "queso-crema", name: "Queso Crema", categoryId: "leche", theme: "vainilla" },
  { id: "triple-pecado", name: "Triple Pecado", categoryId: "leche", theme: "chocolate" },
  {
    id: "queso-crema-con-zarzamora",
    name: "Queso Crema con Zarzamora",
    categoryId: "leche",
    theme: "fresa",
  },
  { id: "red-velvet", name: "Red Velvet", categoryId: "leche", theme: "coral" },
  { id: "angelito", name: "Angelito", categoryId: "leche", theme: "cielo" },
  { id: "nuez", name: "Nuez", categoryId: "leche", theme: "chocolate" },
  { id: "pistache", name: "Pistache", categoryId: "leche", theme: "pistacho" },
  { id: "banoffee", name: "Banoffee", categoryId: "leche", theme: "chocolate" },
  { id: "duvalin", name: "Duvalín", categoryId: "leche", theme: "fresa" },
  { id: "chamoy", name: "Chamoy", categoryId: "agua", theme: "coral" },
  { id: "pica-fresa", name: "Pica Fresa", categoryId: "agua", theme: "fresa" },
  { id: "pulparindo", name: "Pulparindo", categoryId: "agua", theme: "coral" },
  { id: "magnum", name: "Magnum", categoryId: "premium", theme: "chocolate" },
  { id: "ferrero-rocher", name: "Ferrero Rocher", categoryId: "premium", theme: "chocolate" },
];

function resolveImage(f: RawFlavor): string {
  return f.image ?? `/images/flavors/${f.categoryId}/${f.id}.jpg`;
}

/** Sabores resueltos (con imagen y `available` por defecto en true). */
export const flavors: Flavor[] = rawFlavors.map((f) => ({
  ...f,
  available: f.available ?? true,
  image: resolveImage(f),
}));

/* ------------------------------------------------------------------ */
/* Derivaciones (para que los componentes no repitan lógica)          */
/* ------------------------------------------------------------------ */

/** Categorías disponibles, ordenadas y solo las que tienen al menos un sabor. */
export function getVisibleCategories(): FlavorCategory[] {
  return categories
    .filter((c) => c.available && flavors.some((f) => f.categoryId === c.id))
    .sort((a, b) => a.order - b.order);
}

export function getCategoryName(id: string): string {
  return categories.find((c) => c.id === id)?.name ?? id;
}

export function getFlavorById(id: string): Flavor | undefined {
  return flavors.find((f) => f.id === id);
}

/** Sabores destacados (solo los marcados en datos). */
export const featuredFlavors: Flavor[] = flavors.filter((f) => f.featured);
