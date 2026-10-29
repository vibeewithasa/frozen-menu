import { Container } from "../components/ui/Container";
import { CtaButtons } from "../components/ui/CtaButtons";
import { Reveal } from "../components/ui/Reveal";
import { site } from "../config/site";
import { flavors } from "../data/flavors";

/**
 * Hero. Funciona con o sin fotografía profesional:
 * - Si existe `site.hero.image` se muestra como producto flotante.
 * - Si no, se usa una composición decorativa elegante (blobs + logo real),
 *   sin depender de una foto de baja calidad ni inventar producto.
 */
export function Hero() {
  const hasImage = Boolean(site.hero.image);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24"
    >
      {/* Decoración de fondo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-16 h-80 w-80 rounded-full bg-flavors-fresa/50 blur-3xl" />
        <div className="absolute right-[-10%] top-24 h-96 w-96 rounded-full bg-flavors-pistacho/40 blur-3xl" />
        <div className="absolute bottom-[-20%] left-1/3 h-72 w-72 rounded-full bg-flavors-vainilla/50 blur-3xl" />
      </div>

      <Container>
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          {/* Texto */}
          <Reveal y={32}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-coral-600 backdrop-blur">
              Heladería gourmet
            </span>
            <h1 className="font-display text-display-xl font-semibold text-ink">
              Sabores que se disfrutan en&nbsp;familia
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Una gran variedad de sabores gourmet, del clásico de siempre al
              antojo más atrevido. Elige el tuyo, pídelo por WhatsApp o
              visítanos.
            </p>
            <CtaButtons showFlavors className="mt-8" />
            {flavors.length > 0 && (
              <p className="mt-6 text-sm text-ink-muted">
                {flavors.length} sabores para descubrir
              </p>
            )}
          </Reveal>

          {/* Visual */}
          <Reveal delay={0.15} className="relative flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-md">
              {/* Forma orgánica de fondo */}
              <div className="absolute inset-0 rounded-blob bg-gradient-to-br from-flavors-fresa via-flavors-vainilla to-flavors-pistacho shadow-pop" />
              <div className="absolute inset-0 flex items-center justify-center">
                {hasImage ? (
                  <img
                    src={site.hero.image as string}
                    alt={site.hero.imageAlt ?? ""}
                    className="max-h-[80%] max-w-[80%] animate-float object-contain drop-shadow-2xl"
                  />
                ) : (
                  <img
                    src="/images/logo-helados.png"
                    alt=""
                    aria-hidden="true"
                    className="h-40 w-40 animate-float rounded-full object-cover shadow-card sm:h-52 sm:w-52"
                  />
                )}
              </div>
              {/* Círculos decorativos flotantes */}
              <div className="absolute -right-3 top-6 h-14 w-14 animate-float rounded-full bg-white/70 shadow-soft [animation-delay:-2s]" />
              <div className="absolute bottom-4 -left-4 h-10 w-10 animate-float rounded-full bg-coral-300/80 shadow-soft [animation-delay:-4s]" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
