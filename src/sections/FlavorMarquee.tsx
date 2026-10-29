import { flavors } from "../data/flavors";
import { flavorColors } from "../lib/flavorTheme";

/**
 * Cinta animada (CSS) con los sabores. Puramente decorativa: enlaza al
 * explorador. Se duplica la lista para un bucle continuo sin salto.
 */
export function FlavorMarquee() {
  if (flavors.length === 0) return null;

  const items = [...flavors, ...flavors];

  return (
    <section aria-hidden="true" className="border-y border-ink/10 bg-cream-200/50 py-4">
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-4 pr-4">
          {items.map((f, i) => {
            const c = flavorColors(f.theme);
            return (
              <span
                key={`${f.id}-${i}`}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-ink-soft"
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: c.base }}
                />
                {f.name}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
