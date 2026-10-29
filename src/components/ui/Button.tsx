import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,color,box-shadow] duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.97]";

const VARIANTS: Record<Variant, string> = {
  // CTA principal — coral sólido (coral-700 para contraste AA con texto blanco)
  primary:
    "bg-coral-700 text-white shadow-card hover:bg-coral-800 hover:shadow-pop",
  // CTA secundario — outline, misma prominencia visual
  secondary:
    "border-2 border-ink/15 bg-white/70 text-ink backdrop-blur hover:border-ink/40 hover:bg-white",
  // Terciario — enlace de texto
  tertiary:
    "text-ink-soft underline decoration-coral-400 decoration-2 underline-offset-4 hover:text-ink",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-base sm:text-lg",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps =
  | (CommonProps &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
        href?: undefined;
      })
  | (CommonProps &
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
        href: string;
      });

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    BASE,
    variant !== "tertiary" && SIZES[size],
    VARIANTS[variant],
    className
  );

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
