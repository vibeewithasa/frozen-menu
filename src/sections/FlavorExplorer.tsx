import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Section, SectionHeader } from "../components/ui/Section";
import { Chip } from "../components/ui/Chip";
import { Badge } from "../components/ui/Badge";
import { cn } from "../lib/cn";
import { flavorColors, flavorStyle } from "../lib/flavorTheme";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { gridItemVariants, fadeVariants, layoutTransition } from "../lib/motion";
import { useFlavorStore } from "../hooks/useFlavorStore";
import {
  flavors,
  getVisibleCategories,
  getCategoryName,
  getFlavorById,
  type Flavor,
} from "../data/flavors";

const INITIAL_VISIBLE = 24;
const STEP = 24;

/** Normaliza para búsqueda: sin acentos, sin distinción de mayúsculas. */
function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function FlavorExplorer() {
  const activeId = useFlavorStore((s) => s.activeFlavor);
  const setActive = useFlavorStore((s) => s.setActiveFlavor);
  const category = useFlavorStore((s) => s.category);
  const setCategory = useFlavorStore((s) => s.setCategory);
  const query = useFlavorStore((s) => s.query);
  const setQuery = useFlavorStore((s) => s.setQuery);

  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const previewRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Mantiene el input fluido mientras el filtrado se difiere (sin dependencias nuevas)
  const deferredQuery = useDeferredValue(query);

  const cats = getVisibleCategories();
  const active = activeId ? getFlavorById(activeId) : undefined;

  const filtered = useMemo(() => {
    const q = normalize(deferredQuery.trim());
    return flavors.filter((f) => {
      const byCat = category ? f.categoryId === category : true;
      const byQuery = q ? normalize(f.name).includes(q) : true;
      return byCat && byQuery;
    });
  }, [category, deferredQuery]);

  const shown = filtered.slice(0, visible);

  // Reinicia paginación al cambiar filtro/búsqueda
  useEffect(() => {
    setVisible(INITIAL_VISIBLE);
  }, [category, deferredQuery]);

  const itemVariants = gridItemVariants(reduced);
  const fade = fadeVariants(reduced);

  // En móvil, al elegir sabor lleva el preview a la vista
  const handleSelect = (id: string) => {
    setActive(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        previewRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  };

  return (
    <Section id="sabores">
      <SectionHeader
        eyebrow="Nuestros sabores"
        title="Explora todos nuestros sabores"
        description="Filtra por tipo o busca tu favorito. Toca un sabor para verlo en grande."
      />

      {/* Controles */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Chip active={category === null} onClick={() => setCategory(null)}>
            Todos
          </Chip>
          {cats.map((c) => (
            <Chip
              key={c.id}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.name}
            </Chip>
          ))}
        </div>

        <label className="relative w-full sm:w-64">
          <span className="sr-only">Buscar sabor</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar sabor…"
            className="w-full rounded-full border border-ink/15 bg-white/70 px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus-visible:border-coral-400 focus-visible:outline-none"
          />
        </label>
      </div>

      {/* Grid + Preview */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        {/* Lista de sabores */}
        <div>
          <m.ul
            layout={!reduced}
            transition={{ layout: layoutTransition(reduced) }}
            className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:gap-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((f) => {
                const isActive = activeId === f.id;
                const c = flavorColors(f.theme);
                const unavailable = f.available === false;
                return (
                  <m.li
                    key={f.id}
                    layout={!reduced}
                    variants={itemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ layout: layoutTransition(reduced) }}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(f.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left text-sm font-medium transition-[background-color,border-color,box-shadow] focus-visible:outline-none",
                        isActive
                          ? "border-transparent shadow-card"
                          : "border-ink/10 bg-white/60 hover:border-ink/25 hover:shadow-soft",
                        unavailable && "opacity-50"
                      )}
                      style={
                        isActive
                          ? { backgroundColor: c.tint, color: c.ink }
                          : undefined
                      }
                    >
                      <span
                        className="h-4 w-4 shrink-0 rounded-full ring-2 ring-white"
                        style={{ backgroundColor: c.base }}
                      />
                      <span className="truncate">{f.name}</span>
                      {f.isNew && (
                        <span className="ml-auto">
                          <Badge tone="new">Nuevo</Badge>
                        </span>
                      )}
                    </button>
                  </m.li>
                );
              })}
            </AnimatePresence>
          </m.ul>

          <AnimatePresence>
            {shown.length === 0 && (
              <m.p
                key="empty"
                variants={fade}
                initial="initial"
                animate="animate"
                exit="exit"
                className="rounded-2xl bg-cream-200/60 px-6 py-12 text-center text-ink-soft"
              >
                No encontramos sabores con esa búsqueda.
              </m.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {filtered.length > shown.length && (
              <m.div
                key="more"
                variants={fade}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-6 text-center"
              >
                <m.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVisible((v) => v + STEP)}
                  className="rounded-full border border-ink/15 bg-white/70 px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
                >
                  Cargar más ({filtered.length - shown.length})
                </m.button>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* Preview reactivo */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            ref={previewRef}
            aria-live="polite"
            className="relative overflow-hidden rounded-3xl border border-ink/10 bg-flavor-tint transition-colors duration-500"
            style={active ? flavorStyle(active.theme) : undefined}
          >
            {active ? (
              <>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Cerrar vista del sabor"
                  className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink shadow-soft transition-colors hover:bg-white focus-visible:outline-none"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </svg>
                </button>
                <FlavorPreview
                  key={active.id}
                  flavor={active}
                  errored={Boolean(imgError[active.id])}
                  onError={() =>
                    setImgError((prev) => ({ ...prev, [active.id]: true }))
                  }
                />
              </>
            ) : (
              <div className="flex min-h-[18rem] flex-col items-center justify-center gap-3 p-8 text-center">
                <span className="text-4xl" aria-hidden="true">
                  🍦
                </span>
                <p className="font-medium text-ink-soft">
                  Elige un sabor para verlo aquí.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

interface FlavorPreviewProps {
  flavor: Flavor;
  errored: boolean;
  onError: () => void;
}

function FlavorPreview({ flavor, errored, onError }: FlavorPreviewProps) {
  const c = flavorColors(flavor.theme);
  const showImage = flavor.image && !errored;

  return (
    <div className="p-6">
      <div className="flex items-center gap-2">
        <Badge tone="neutral">{getCategoryName(flavor.categoryId)}</Badge>
        {flavor.isNew && <Badge tone="new">Nuevo</Badge>}
        {flavor.available === false && <Badge tone="soldout">Agotado</Badge>}
      </div>

      <div className="mt-4 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white/60">
        {showImage ? (
          <img
            src={flavor.image}
            alt={`Helado sabor ${flavor.name}`}
            loading="lazy"
            onError={onError}
            className="h-full w-full object-contain p-3"
          />
        ) : (
          // Fallback elegante: no parece error, no inventa información
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-3"
            style={{ backgroundColor: c.tint }}
          >
            <span
              className="flex h-20 w-20 items-center justify-center rounded-full font-display text-3xl font-semibold text-white shadow-card"
              style={{ backgroundColor: c.base }}
            >
              {flavor.name.charAt(0).toUpperCase()}
            </span>
            <span className="text-sm font-medium" style={{ color: c.ink }}>
              {flavor.name}
            </span>
          </div>
        )}
      </div>

      <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
        {flavor.name}
      </h3>
      {flavor.description && (
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {flavor.description}
        </p>
      )}
    </div>
  );
}
