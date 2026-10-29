import { Section } from "../components/ui/Section";
import { site } from "../config/site";

/** Solo se renderiza si existe texto real de "Nosotros" en la configuración. */
export function Story() {
  if (!site.about) return null;

  const paragraphs = site.about.split("\n").filter((p) => p.trim().length > 0);

  return (
    <Section id="nosotros" container="narrow">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -left-6 -top-8 h-24 w-24 rounded-blob bg-flavors-fresa/40 blur-2xl"
        />
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-coral-600">
          Nosotros
        </span>
        <h2 className="font-display text-display-md font-semibold text-ink">
          Nuestra historia
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
