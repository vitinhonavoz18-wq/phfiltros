"use client";

import { useEffect, useRef } from "react";
import { track, type ConversionEvent } from "@/lib/analytics";

/** Dispara um evento uma única vez quando a área aparece na tela. */
export function ViewTracker({ event, label }: { event: ConversionEvent; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        track(event, { label });
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [event, label]);
  return <span ref={ref} aria-hidden className="pointer-events-none absolute left-0 top-1/3 h-px w-px" />;
}
