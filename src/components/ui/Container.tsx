import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** ancho máximo; por defecto el estándar del sitio */
  size?: "default" | "narrow" | "wide";
}

const SIZES: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", SIZES[size], className)}>
      {children}
    </div>
  );
}
