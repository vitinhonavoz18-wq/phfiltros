import type { SVGProps } from "react";

/**
 * Conjunto de ícones próprio da PH Filtros (traço 1.5, grade 24px).
 * Desenhados para manter consistência visual em todo o site.
 */
const paths: Record<string, React.ReactNode> = {
  drop: <path d="M12 3.5c3.2 4 5.5 7.1 5.5 10.2A5.5 5.5 0 0 1 12 19.2a5.5 5.5 0 0 1-5.5-5.5C6.5 10.6 8.8 7.5 12 3.5Z" />,
  faucet: (
    <>
      <path d="M4 10h7a4 4 0 0 1 4 4v1" />
      <path d="M4 7v6" />
      <path d="M8 10V6.5h3" />
      <path d="M6.5 6.5h6" />
      <path d="M15 18.2c.8 1 1.3 1.6 1.3 2.2a1.3 1.3 0 0 1-2.6 0c0-.6.5-1.2 1.3-2.2Z" />
      <path d="M20 21H4" opacity=".4" />
    </>
  ),
  purifier: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="3" />
      <path d="M9 7h6" />
      <path d="M10 12h4v3.5h-4z" />
      <path d="M12 15.5V18" />
      <circle cx="15.5" cy="7" r=".4" fill="currentColor" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5.5L12 3v18" />
      <path d="M12 8.5 20 10v11" />
      <path d="M7 8h2M7 11.5h2M7 15h2M15 13h2M15 16.5h2" />
      <path d="M2.5 21h19" />
    </>
  ),
  system: (
    <>
      <rect x="4" y="5" width="5" height="14" rx="2.5" />
      <rect x="15" y="5" width="5" height="14" rx="2.5" />
      <path d="M2 9h2M9 9h6M20 9h2" />
      <path d="M6.5 9v6M17.5 9v6" opacity=".45" />
    </>
  ),
  cartridge: (
    <>
      <rect x="7" y="5" width="10" height="15" rx="2" />
      <path d="M9.5 5V3h5v2" />
      <path d="M10 9v7M12 9v7M14 9v7" opacity=".6" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0 5 5L21 12.6a6 6 0 0 1-7.4 1.2L7 20.4a2 2 0 0 1-2.8-2.8l6.6-6.6a6 6 0 0 1 1.2-7.4l1.3 1.3a4 4 0 0 0 1.4 1.4Z" />
  ),
  chat: (
    <>
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z" />
      <path d="M12 8.5c1.2 1.5 2 2.6 2 3.6a2 2 0 0 1-4 0c0-1 .8-2.1 2-3.6Z" />
    </>
  ),
  install: (
    <>
      <path d="M12 3v9" />
      <path d="m8.5 8.5 3.5 3.5 3.5-3.5" />
      <rect x="4" y="15" width="16" height="5" rx="1.5" />
      <path d="M8 17.5h.01M11 17.5h5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="m9 14.5 2 2 4-4" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.7-3.7L4 9" />
      <path d="M4 4v5h5" />
      <path d="M4 13a8 8 0 0 0 14.7 3.7L20 15" />
      <path d="M20 20v-5h-5" />
    </>
  ),
  sliders: (
    <>
      <path d="M5 4v16M12 4v16M19 4v16" opacity=".35" />
      <circle cx="5" cy="14" r="2" />
      <circle cx="12" cy="8" r="2" />
      <circle cx="19" cy="15.5" r="2" />
    </>
  ),
  home: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M12 12.5c1.3 1.6 2.1 2.7 2.1 3.7a2.1 2.1 0 0 1-4.2 0c0-1 .8-2.1 2.1-3.7Z" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  pin: (
    <>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="14.5" r="5.5" />
      <path d="M8.5 3h7l-2 6.5M10.5 9.5 8.5 3" />
      <path d="M12 12v5M10.5 13.2 12 12" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19c0 1.5-2 2.5-5 2.5" />
    </>
  ),
  sparkle: <path d="M12 3.5 13.7 10l6.3 2-6.3 2L12 20.5 10.3 14 4 12l6.3-2L12 3.5Z" />,
  family: (
    <>
      <circle cx="8" cy="7" r="2.5" />
      <circle cx="16.5" cy="8.5" r="2" />
      <path d="M3.5 20v-3.5A4.5 4.5 0 0 1 8 12a4.5 4.5 0 0 1 4.5 4.5V20" />
      <path d="M13.5 13.6A3.5 3.5 0 0 1 20 15.5V20" />
    </>
  ),
  taste: (
    <>
      <path d="M6 4h12l-1.6 15.2a2 2 0 0 1-2 1.8H9.6a2 2 0 0 1-2-1.8L6 4Z" />
      <path d="M6.6 9.5c2-1 3.6 1 5.4 0s3.4-1 5.4 0" />
    </>
  ),
  particles: (
    <>
      <circle cx="6" cy="7" r="1.3" />
      <circle cx="12" cy="5" r=".9" />
      <circle cx="17" cy="8" r="1.6" />
      <circle cx="9" cy="11.5" r=".9" />
      <path d="M3.5 15h17" />
      <path d="M8 19h8" opacity=".5" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.2c-.5-.9-1.6-1.4-2.8-1.4-1.6 0-2.8.8-2.8 2.1 0 2.9 5.8 1.5 5.8 4.3 0 1.3-1.3 2.1-3 2.1-1.3 0-2.5-.6-3-1.6M12 6v1.8M12 16.3V18" />
    </>
  ),
  tool: (
    <>
      <path d="m14 7 3-3 3 3-3 3" />
      <path d="M17 7 6.5 17.5" />
      <path d="m4 20 2.5-2.5" />
      <path d="M4 9.5 9.5 4l2 2L6 11.5z" opacity=".6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </>
  ),
  phone: (
    <path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  menu: <path d="M4 8h16M4 16h10" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  back: <path d="M19 12H5M11 6l-6 6 6 6" />,
  apartment: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h1.5M13.5 7H15M9 11h1.5M13.5 11H15M9 15h1.5M13.5 15H15" />
      <path d="M10.5 21v-3h3v3" />
    </>
  ),
  condo: (
    <>
      <rect x="3" y="8" width="7" height="13" rx="1" />
      <rect x="14" y="3" width="7" height="18" rx="1" />
      <path d="M5.5 12h2M5.5 16h2M16.5 7h2M16.5 11h2M16.5 15h2" />
    </>
  ),
  dots: (
    <>
      <circle cx="6" cy="12" r="1.3" fill="currentColor" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
      <circle cx="18" cy="12" r="1.3" fill="currentColor" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.5l2.2 11h10.6L20.5 8H7" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  bolt: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />,
};

export type IconName = keyof typeof paths | string;

export function Icon({ name, className, ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className ?? "size-6"}
      {...rest}
    >
      {paths[name] ?? paths.drop}
    </svg>
  );
}

/** Logotipo oficial do WhatsApp (marca), usado apenas nos botões de contato. */
export function WhatsAppGlyph({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="currentColor">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01Zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}
