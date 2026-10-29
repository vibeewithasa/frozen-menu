import { Section, SectionHeader } from "../components/ui/Section";
import { Badge } from "../components/ui/Badge";
import { Reveal } from "../components/ui/Reveal";
import { featuredFlavors, getCategoryName } from "../data/flavors";
import { flavorColors } from "../lib/flavorTheme";

/** Solo se renderiza si hay sabores marcados como `featured` en los datos. */
export function Featured() {
  if (featuredFlavors.length === 0) return null;

  return (
    <Section id="destacados" className="bg-cream-200/40">
      <SectionHeader
        eyebrow="Los favoritos"
        title="Sabores destacados"
        description="Una selección de los que no te puedes perder."
      />

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredFlavors.map((f, i) => {
          const c = flavorColors(f.theme);
          return (
            <Reveal
              as="li"
              key={f.id}
              delay={i * 0.06}
              className="group h-full overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft transition-shadow hover:shadow-card"
            >
              <div
                className="flex aspect-[4/3] items-center justify-center overflow-hidden"
                style={{ backgroundColor: c.tint }}
              >
                {f.image ? (
                  <img
                    src={f.image}
                    alt={`Helado sabor ${f.name}`}
                    loading="lazy"
                    className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span
                    className="flex h-20 w-20 items-center justify-center rounded-full font-display text-3xl font-semibold text-white shadow-card"
                    style={{ backgroundColor: c.base }}
                  >
                    {f.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <Badge tone="neutral">{getCategoryName(f.categoryId)}</Badge>
                  {f.isNew && <Badge tone="new">Nuevo</Badge>}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                  {f.name}
                </h3>
                {f.description && (
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {f.description}
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
