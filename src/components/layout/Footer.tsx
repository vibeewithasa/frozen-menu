import { Container } from "../ui/Container";
import {
  site,
  whatsappUrl,
  instagramUrl,
  facebookUrl,
} from "../../config/site";
import {
  InstagramIcon,
  FacebookIcon,
  WhatsappIcon,
} from "../ui/SocialIcons";

export function Footer() {
  const ig = instagramUrl();
  const fb = facebookUrl();
  const wa = whatsappUrl();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-cream-200/60">
      <Container>
        <div className="flex flex-col items-center gap-6 py-12 text-center">
          <a
            href="#top"
            className="flex items-center gap-2 font-display text-lg font-semibold text-ink"
          >
            <img
              src="/images/logo-helados.png"
              alt=""
              className="h-9 w-9 rounded-full object-cover"
              aria-hidden="true"
            />
            {site.brand}
          </a>

          <div className="flex items-center gap-3">
            {ig && (
              <a
                href={ig}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram de ${site.brand}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink-soft transition-colors hover:border-coral-300 hover:text-coral-600"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            )}
            {fb && (
              <a
                href={fb}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook de ${site.brand}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink-soft transition-colors hover:border-coral-300 hover:text-coral-600"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            )}
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp de ${site.brand}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink-soft transition-colors hover:border-coral-300 hover:text-coral-600"
              >
                <WhatsappIcon className="h-5 w-5" />
              </a>
            )}
          </div>

          {site.hours.length > 0 && (
            <ul className="text-sm text-ink-soft">
              {site.hours.map((h) => (
                <li key={h.days}>
                  <span className="font-medium text-ink">{h.days}:</span>{" "}
                  {h.hours}
                </li>
              ))}
            </ul>
          )}

          {site.address && (
            <p className="max-w-sm text-sm text-ink-soft">{site.address}</p>
          )}

          <p className="text-xs text-ink-muted">
            © {year} {site.brand}. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
