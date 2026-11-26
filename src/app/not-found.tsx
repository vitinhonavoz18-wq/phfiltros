import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-abyss pt-24 text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_30%,#0a3a6e_0%,#020810_70%)]" />
      <div className="mx-auto max-w-2xl px-5 text-center">
        <p className="font-display text-water text-8xl font-semibold">404</p>
        <h1 className="font-display mt-6 text-3xl font-semibold md:text-4xl">Essa página escorreu pelo ralo.</h1>
        <p className="mt-4 text-white/65">O endereço pode ter mudado. Que tal voltar para o início?</p>
        <Link href="/" className="btn btn-primary mt-9">
          <Icon name="back" className="size-4" />
          Voltar para o início
        </Link>
      </div>
    </section>
  );
}
