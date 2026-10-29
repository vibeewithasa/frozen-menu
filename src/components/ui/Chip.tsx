import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

/**
 * Pill seleccionable genérica (tabs de categoría, filtros).
 * Cuando está activa usa el color de tema reactivo (var(--flavor)).
 */
export function Chip({ active = false, children, className, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none",
        active
          ? "border-transparent bg-ink text-cream"
          : "border-ink/15 bg-white/60 text-ink-soft hover:border-ink/30 hover:text-ink",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
