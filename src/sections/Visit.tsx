import { Section, SectionHeader } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { site, hasVisitInfo } from "../config/site";

/** Solo se renderiza si hay dirección, horarios o enlace de mapa reales. */
export function Visit() {
  if (!hasVisitInfo()) return null;

  return (
    <Section id="visitanos">
      <SectionHeader eyebrow="Visítanos" title="Pasa por la heladería" />

      <div className="mt-8 grid gap-8 rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          {site.address && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Dirección
              </h3>
              <p className="mt-1 text-lg text-ink">{site.address}</p>
            </div>
          )}

          {site.hours.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Horarios
              </h3>
              <ul className="mt-1 space-y-1 text-ink">
                {site.hours.map((h) => (
                  <li key={h.days}>
                    <span className="font-medium">{h.days}:</span> {h.hours}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {site.mapsUrl && (
            <div>
              <Button
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                Cómo llegar
              </Button>
            </div>
          )}
        </div>

        {site.mapsUrl && (
          <div className="flex items-center justify-center rounded-2xl bg-cream-200/60 p-8 text-center">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft underline decoration-coral-400 decoration-2 underline-offset-4 hover:text-ink"
            >
              Abrir ubicación en Google Maps →
            </a>
          </div>
        )}
      </div>
    </Section>
  );
}
