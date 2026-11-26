"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { navItems } from "./nav";
import { Icon, WhatsAppGlyph } from "@/components/ui/Icon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open ? "border-b border-white/[.07] bg-abyss/95 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo priority />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.9rem] font-medium text-white/75">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-flow py-1 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppLink location="header" className="btn btn-primary hidden min-h-11 px-5 text-sm md:inline-flex">
            <WhatsAppGlyph className="size-4" />
            Solicitar orçamento
          </WhatsAppLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="size-5" />
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className="h-[calc(100svh-72px)] overflow-y-auto bg-abyss px-5 pb-10 pt-6 lg:hidden">
          <nav aria-label="Menu móvel">
            <ul className="divide-y divide-white/[.07] border-y border-white/[.07]">
              {navItems.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-5 font-display text-2xl font-semibold text-white"
                  >
                    <span>
                      <span className="mr-4 text-sm font-medium text-crystal/80">0{i + 1}</span>
                      {item.label}
                    </span>
                    <Icon name="arrow" className="size-5 text-white/40" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <WhatsAppLink location="menu_mobile" onClick={() => setOpen(false)} className="btn btn-primary mt-8 w-full">
            <WhatsAppGlyph className="size-5" />
            Solicitar meu orçamento
          </WhatsAppLink>
          <p className="mt-6 text-center text-sm text-white/50">Mais de 40 anos de experiência · Salvador e região</p>
        </div>
      )}
    </header>
  );
}
