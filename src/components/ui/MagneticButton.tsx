import { useRef, type ReactNode } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** intensidad del desplazamiento (0-1) */
  strength?: number;
}

/**
 * Envoltorio que atrae suavemente su contenido hacia el cursor (desktop).
 * Se desactiva en dispositivos táctiles y con prefers-reduced-motion.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </m.div>
  );
}
