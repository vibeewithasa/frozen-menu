import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Tone = "new" | "featured" | "soldout" | "neutral";

const TONES: Record<Tone, string> = {
  new: "bg-coral-700 text-white",
  featured: "bg-ink text-cream",
  soldout: "bg-ink/10 text-ink-soft",
  neutral: "bg-flavor-tint text-flavor-ink",
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
