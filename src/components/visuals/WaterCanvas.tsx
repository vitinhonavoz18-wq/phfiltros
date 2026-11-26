"use client";

import { useEffect, useRef } from "react";

/**
 * Superfície de água interativa (simulação de ondulação em baixa resolução).
 * - Reage ao movimento do mouse/toque e recebe "gotas" aleatórias.
 * - Pausa automaticamente fora da tela e com a aba oculta.
 * - Desativada para quem prefere movimento reduzido.
 */
export function WaterCanvas({ className = "", scale = 5, intensity = 1 }: { className?: string; scale?: number; intensity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const lowPower = (navigator.hardwareConcurrency || 4) <= 4;
    const cellScale = lowPower ? scale + 2 : scale;
    let w = 0,
      h = 0,
      a: Float32Array,
      b: Float32Array,
      img: ImageData;
    let raf = 0,
      running = false,
      last = 0,
      lastDrop = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(32, Math.ceil(r.width / cellScale));
      h = Math.max(32, Math.ceil(r.height / cellScale));
      canvas.width = w;
      canvas.height = h;
      a = new Float32Array(w * h);
      b = new Float32Array(w * h);
      img = ctx.createImageData(w, h);
    };

    const disturb = (x: number, y: number, radius: number, strength: number) => {
      const cx = Math.floor(x),
        cy = Math.floor(y);
      for (let j = -radius; j <= radius; j++) {
        for (let i = -radius; i <= radius; i++) {
          const px = cx + i,
            py = cy + j;
          if (px < 1 || py < 1 || px >= w - 1 || py >= h - 1) continue;
          const d = Math.sqrt(i * i + j * j);
          if (d <= radius) a[py * w + px] += strength * (1 - d / (radius + 1));
        }
      }
    };

    const step = () => {
      const damping = 0.975;
      for (let y = 1; y < h - 1; y++) {
        const row = y * w;
        for (let x = 1; x < w - 1; x++) {
          const i = row + x;
          b[i] = ((a[i - 1] + a[i + 1] + a[i - w] + a[i + w]) * 0.5 - b[i]) * damping;
        }
      }
      const t = a;
      a = b;
      b = t;
    };

    const render = () => {
      const data = img.data;
      const k = 3.2 * intensity;
      for (let y = 1; y < h - 1; y++) {
        const row = y * w;
        for (let x = 1; x < w - 1; x++) {
          const i = row + x;
          const dx = a[i - 1] - a[i + 1];
          const dy = a[i - w] - a[i + w];
          const light = dx * 0.6 + dy; // luz vinda de cima/esquerda
          const p = i * 4;
          if (light > 0) {
            const v = Math.min(255, light * k * 22);
            data[p] = 120;
            data[p + 1] = 225;
            data[p + 2] = 255;
            data[p + 3] = v;
          } else {
            const v = Math.min(140, -light * k * 10);
            data[p] = 0;
            data[p + 1] = 10;
            data[p + 2] = 25;
            data[p + 3] = v;
          }
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (lowPower && now - last < 32) return;
      last = now;
      if (now - lastDrop > 700 + Math.random() * 900) {
        lastDrop = now;
        disturb(Math.random() * w, Math.random() * h, 2, 9);
      }
      step();
      render();
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * w;
      const y = ((e.clientY - r.top) / r.height) * h;
      if (x < 0 || y < 0 || x > w || y > h) return;
      disturb(x, y, 2, e.pointerType === "touch" ? 10 : 5);
    };

    resize();
    // Só começa depois que a página terminou de carregar (não disputa com o conteúdo principal).
    let ready = false;
    const startIfVisible = () => {
      ready = true;
      const r = canvas.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight && !document.hidden) start();
    };
    const idle = window.setTimeout(startIfVisible, 1800);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (ready && entry.isIntersecting && !document.hidden ? start() : stop()));
    io.observe(canvas);
    const onVis = () => (document.hidden || !ready ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    const host = canvas.parentElement ?? window;
    host.addEventListener("pointermove", onMove as EventListener, { passive: true });

    return () => {
      window.clearTimeout(idle);
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove as EventListener);
    };
  }, [scale, intensity]);

  return <canvas ref={ref} aria-hidden="true" style={{ filter: "blur(1.5px)" }} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
