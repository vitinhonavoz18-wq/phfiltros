import Image from "next/image";
import Link from "next/link";

/** Assinatura horizontal: gota oficial + logotipo, extraídos da marca original. */
export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label="PH Filtros — página inicial" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <Image src="/brand/ph-drop.webp" alt="" width={24} height={36} priority={priority} className="h-9 w-auto transition-transform duration-500 group-hover:-translate-y-0.5" />
      <Image src="/brand/ph-wordmark.webp" alt="PH Filtros" width={130} height={22} priority={priority} className="h-[22px] w-auto" />
    </Link>
  );
}
