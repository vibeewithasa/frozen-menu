import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { cn } from "../../lib/cn";
import { getNavItems } from "../../lib/sections";
import { site, whatsappUrl } from "../../config/site";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { EASE_SOFT } from "../../lib/motion";
import { Container } from "../ui/Container";
import { WhatsappIcon } from "../ui/SocialIcons";

const ORDER_MESSAGE = `Hola, me gustaría hacer un pedido de ${site.brand}.`;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const items = getNavItems();
  const wa = whatsappUrl(ORDER_MESSAGE);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape cierra el menú
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink/10 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between py-3">
          <a
            href="#top"
            className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink"
          >
            <img
              src="/images/logo-helados.png"
              alt=""
              className="h-8 w-8 rounded-full object-cover"
              aria-hidden="true"
            />
            <span>{site.brand}</span>
          </a>

          {/* Navegación desktop */}
          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-7 md:flex"
          >
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {it.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full bg-coral-700 px-4 py-2 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-coral-800 sm:inline-flex"
              >
                <WhatsappIcon className="h-4 w-4" />
                Pedir por WhatsApp
              </a>
            )}

            {/* Toggle móvil */}
            <button
              ref={toggleRef}
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
            >
              <span className="sr-only">Menú</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="7" x2="21" y2="7" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="17" x2="21" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Panel móvil (mismo diseño original; solo animación de apertura/cierre) */}
      <AnimatePresence>
        {open && (
          <m.div
            key="mobile-menu"
            id="mobile-menu"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduced ? 0.12 : 0.2, ease: EASE_SOFT }}
            className="border-t border-ink/10 bg-cream/95 backdrop-blur-md md:hidden"
          >
            <Container>
              <nav aria-label="Navegación móvil" className="flex flex-col py-2">
                {items.map((it) => (
                  <a
                    key={it.href}
                    href={it.href}
                    onClick={closeMenu}
                    className="rounded-lg px-2 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    {it.label}
                  </a>
                ))}
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-coral-700 px-4 py-3 text-base font-semibold text-white"
                  >
                    <WhatsappIcon className="h-5 w-5" />
                    Pedir por WhatsApp
                  </a>
                )}
              </nav>
            </Container>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
