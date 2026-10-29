import { flavors, featuredFlavors } from "../data/flavors";
import { site, hasVisitInfo } from "../config/site";

export interface NavItem {
  href: string;
  label: string;
}

/**
 * Ítems de navegación derivados de los datos disponibles.
 * Una sección solo aparece en el menú si tiene contenido real.
 */
export function getNavItems(): NavItem[] {
  const items: NavItem[] = [];
  if (flavors.length) items.push({ href: "#sabores", label: "Sabores" });
  if (featuredFlavors.length)
    items.push({ href: "#destacados", label: "Destacados" });
  if (site.about) items.push({ href: "#nosotros", label: "Nosotros" });
  if (site.gallery.length) items.push({ href: "#galeria", label: "Galería" });
  if (site.reviews.length)
    items.push({ href: "#opiniones", label: "Opiniones" });
  if (hasVisitInfo()) items.push({ href: "#visitanos", label: "Visítanos" });
  return items;
}
