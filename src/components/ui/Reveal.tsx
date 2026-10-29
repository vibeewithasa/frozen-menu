import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** retardo en segundos (para escalonar) */
  delay?: number;
  /** desplazamiento vertical inicial en px */
  y?: number;
  /** etiqueta a renderizar (para mantener semántica, p.ej. "li") */
  as?: "div" | "li";
}

/**
 * Revela su contenido al entrar en viewport (fade + translate).
 * Respeta prefers-reduced-motion: si está activo, renderiza sin animación.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = as === "li" ? m.li : m.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 0.84, 0.44, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
