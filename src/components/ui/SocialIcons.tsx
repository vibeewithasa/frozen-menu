interface IconProps {
  className?: string;
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.87 6.48 1.87 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.41V9.41c0-2.38 1.42-3.69 3.6-3.69 1.04 0 2.13.18 2.13.18v2.35h-1.2c-1.19 0-1.56.74-1.56 1.51v1.82h2.66l-.43 2.9h-2.23V22c4.78-.8 8.44-4.94 8.44-9.93Z" />
    </svg>
  );
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.04 3C9.4 3 4 8.4 4 15.05c0 2.65.96 5.09 2.56 7L4 29l7.2-2.5a12 12 0 0 0 4.84 1c6.64 0 12.04-5.4 12.04-12.05C28.08 8.4 22.68 3 16.04 3Zm0 21.5c-1.57 0-3.1-.4-4.45-1.15l-.32-.18-4.27 1.49 1.43-4.16-.21-.34a10.04 10.04 0 0 1-1.54-5.32c0-5.55 4.52-10.07 10.08-10.07S26.1 9.19 26.1 14.74 21.6 24.5 16.04 24.5Zm5.52-7.52c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.29-.77.96-.94 1.16-.17.19-.35.22-.65.07-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.29-.02-.45.13-.6.13-.13.3-.34.45-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.22-.24-.58-.48-.5-.67-.5-.17 0-.37 0-.57 0-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.5 0 1.48 1.07 2.91 1.22 3.11.15.2 2.1 3.2 5.1 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.34Z" />
    </svg>
  );
}
