import { Button } from "./Button";
import { MagneticButton } from "./MagneticButton";
import { cn } from "../../lib/cn";
import { site, whatsappUrl } from "../../config/site";
import { WhatsappIcon } from "./SocialIcons";

interface CtaButtonsProps {
  /** mensaje prellenado para WhatsApp */
  message?: string;
  /** incluir enlace terciario "Ver sabores" */
  showFlavors?: boolean;
  size?: "sm" | "md" | "lg";
  align?: "start" | "center";
  className?: string;
}

/**
 * Dos CTA principales de igual importancia (Pedir por WhatsApp / Cómo llegar),
 * diferenciados por estilo (sólido vs outline), nunca por jerarquía.
 * "Cómo llegar" solo aparece cuando existe una URL real de mapa.
 * "Ver sabores" es terciario y opcional.
 */
export function CtaButtons({
  message,
  showFlavors = false,
  size = "lg",
  align = "start",
  className,
}: CtaButtonsProps) {
  const wa = whatsappUrl(
    message ?? `Hola, me gustaría hacer un pedido de ${site.brand}.`
  );

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3",
        align === "center" && "justify-center",
        className
      )}
    >
      {wa && (
        <MagneticButton>
          <Button
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size={size}
          >
            <WhatsappIcon className="h-5 w-5" />
            Pedir por WhatsApp
          </Button>
        </MagneticButton>
      )}

      {site.mapsUrl && (
        <Button
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size={size}
        >
          Cómo llegar
        </Button>
      )}

      {showFlavors && (
        <Button href="#sabores" variant="tertiary">
          Ver sabores
        </Button>
      )}
    </div>
  );
}
