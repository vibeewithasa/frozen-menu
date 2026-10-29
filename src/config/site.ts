/**
 * Fuente ÚNICA de datos del negocio.
 * Actualizar información comercial = editar este archivo, sin tocar componentes.
 *
 * IMPORTANTE: los campos en `null` o vacíos representan información que aún no
 * existe. Sus secciones se OCULTAN automáticamente (no se muestran placeholders
 * comerciales en producción). No inventar datos aquí.
 */

export interface BusinessHours {
  /** etiqueta del día o rango, p.ej. "Lunes a Viernes" */
  days: string;
  /** horario, p.ej. "12:00 – 21:00" */
  hours: string;
}

export interface Review {
  author: string;
  text: string;
  /** 1..5 */
  rating?: number;
  source?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface SiteConfig {
  brand: string;
  /** número en formato internacional sin símbolos, p.ej. 526672681984 */
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  /** dirección física; null hasta confirmarla */
  address: string | null;
  /** enlace a Google Maps / "Cómo llegar"; null hasta confirmarlo */
  mapsUrl: string | null;
  /** horarios; [] hasta confirmarlos */
  hours: BusinessHours[];
  /** texto real de "Nosotros"; null hasta tenerlo */
  about: string | null;
  reviews: Review[];
  gallery: GalleryImage[];
  hero: {
    /** imagen principal reemplazable; null -> composición decorativa */
    image: string | null;
    imageAlt?: string;
  };
  seo: {
    title: string;
    description: string;
    /** imagen para Open Graph */
    ogImage: string;
    /** URL canónica del sitio; null hasta desplegar con dominio final */
    url: string | null;
  };
}

export const site: SiteConfig = {
  brand: "Helados Gourmet Leal",
  whatsapp: "526672681984",
  instagram: "helados_gourmet_",
  facebook: "Helados.Gourmet.23",
  address: null,
  mapsUrl: null,
  hours: [],
  about: null,
  reviews: [],
  gallery: [],
  hero: {
    image: null,
    imageAlt: "Helado gourmet de Helados Gourmet Leal",
  },
  seo: {
    title: "Helados Gourmet Leal",
    description:
      "Heladería gourmet con una gran variedad de sabores para disfrutar. Descubre nuestros sabores y visítanos.",
    ogImage: "/images/logo-helados.png",
    url: null,
  },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

export function whatsappUrl(message?: string): string | null {
  if (!site.whatsapp) return null;
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function instagramUrl(): string | null {
  return site.instagram
    ? `https://www.instagram.com/${site.instagram}`
    : null;
}

export function facebookUrl(): string | null {
  return site.facebook ? `https://www.facebook.com/${site.facebook}` : null;
}

/** ¿Hay datos suficientes para mostrar la sección "Visítanos"? */
export function hasVisitInfo(): boolean {
  return Boolean(site.address || site.mapsUrl || site.hours.length > 0);
}
