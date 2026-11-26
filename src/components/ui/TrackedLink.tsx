"use client";

import type { ReactNode } from "react";
import { track, type ConversionEvent } from "@/lib/analytics";

export function TrackedLink({
  href,
  event,
  location,
  className,
  children,
  external,
  ariaLabel,
}: {
  href: string;
  event: ConversionEvent;
  location: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => track(event, { location })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
