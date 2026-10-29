import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** ancho del contenedor interno; `false` para maquetar sin Container */
  container?: "default" | "narrow" | "wide" | false;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function Section({
  id,
  children,
  className,
  container = "default",
  ...aria
}: SectionProps) {
  const inner =
    container === false ? (
      children
    ) : (
      <Container size={container}>{children}</Container>
    );
  return (
    <section
      id={id}
      className={cn("relative py-16 sm:py-20 lg:py-28", className)}
      {...aria}
    >
      {inner}
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleId?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleId,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-coral-600">
          {eyebrow}
        </span>
      )}
      <h2
        id={titleId}
        className="font-display text-display-md font-semibold text-ink"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
