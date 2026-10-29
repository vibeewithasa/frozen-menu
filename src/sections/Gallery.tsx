import { Section, SectionHeader } from "../components/ui/Section";
import { site } from "../config/site";

/** Solo se renderiza si hay imágenes reales en la galería. */
export function Gallery() {
  if (site.gallery.length === 0) return null;

  return (
    <Section id="galeria">
      <SectionHeader
        eyebrow="Galería"
        title="Un vistazo a la heladería"
        align="center"
      />

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
        {site.gallery.map((img, i) => (
          <figure
            key={img.src}
            className={
              i % 5 === 0
                ? "col-span-2 overflow-hidden rounded-3xl sm:col-span-2 sm:row-span-2"
                : "overflow-hidden rounded-2xl"
            }
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </figure>
        ))}
      </div>
    </Section>
  );
}
