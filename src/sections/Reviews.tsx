import { Section, SectionHeader } from "../components/ui/Section";
import { site } from "../config/site";

/** Solo se renderiza si hay reseñas reales. No se inventan opiniones. */
export function Reviews() {
  if (site.reviews.length === 0) return null;

  return (
    <Section id="opiniones" className="bg-cream-200/40">
      <SectionHeader
        eyebrow="Opiniones"
        title="Lo que dicen nuestros clientes"
        align="center"
      />

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.reviews.map((r, i) => (
          <li
            key={i}
            className="flex flex-col rounded-3xl border border-ink/10 bg-white p-6 shadow-soft"
          >
            {typeof r.rating === "number" && (
              <div
                className="text-coral-500"
                aria-label={`${r.rating} de 5 estrellas`}
              >
                {"★".repeat(Math.round(r.rating))}
                <span className="text-ink/15">
                  {"★".repeat(Math.max(0, 5 - Math.round(r.rating)))}
                </span>
              </div>
            )}
            <blockquote className="mt-3 flex-1 text-ink-soft">
              “{r.text}”
            </blockquote>
            <footer className="mt-4 text-sm font-semibold text-ink">
              {r.author}
              {r.source && (
                <span className="font-normal text-ink-muted"> · {r.source}</span>
              )}
            </footer>
          </li>
        ))}
      </ul>
    </Section>
  );
}
