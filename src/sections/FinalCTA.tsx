import { Container } from "../components/ui/Container";
import { CtaButtons } from "../components/ui/CtaButtons";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-flavors-fresa/40 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-flavors-pistacho/40 blur-3xl" />
      </div>

      <Container size="narrow">
        <div className="relative rounded-[2.5rem] border border-ink/10 bg-white/70 p-10 text-center shadow-card backdrop-blur sm:p-14">
          <h2 className="font-display text-display-md font-semibold text-ink">
            ¿Se te antojó?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-ink-soft">
            Haz tu pedido por WhatsApp o ven a visitarnos. Te esperamos con el
            sabor que más te guste.
          </p>
          <CtaButtons align="center" className="mt-8" />
        </div>
      </Container>
    </section>
  );
}
