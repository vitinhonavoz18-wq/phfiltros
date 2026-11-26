import type { NextConfig } from "next";

/**
 * Exportação estática: o site inteiro é gerado como HTML/CSS/JS no build
 * e servido pela Cloudflare (Workers Static Assets). Cabeçalhos de segurança
 * e cache ficam em public/_headers.
 */
const nextConfig: NextConfig = {
  output: "export",
  // Momento do build: garante que servidor e navegador escolham a mesma campanha.
  env: { NEXT_PUBLIC_BUILD_TIME: String(Date.now()) },
  poweredByHeader: false,
  // As imagens já são WebP otimizadas na pasta public/brand.
  images: { unoptimized: true },
};

export default nextConfig;
