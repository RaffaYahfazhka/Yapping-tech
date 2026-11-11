"use client";

import Image from "next/image";
import { useShowcase } from "@/context/ShowcaseContext";
import { cn } from "@/lib/format";

const navByMode = {
  retail: [
    { label: "Menu", href: "#collection" },
    { label: "Studio", href: "#story" },
    { label: "Proses", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
  bouquet: [
    { label: "Koleksi", href: "#collection" },
    { label: "Filosofi", href: "#story" },
    { label: "Atelier", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
  catering: [
    { label: "Paket", href: "#collection" },
    { label: "Heritage", href: "#story" },
    { label: "Protokol", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;

export function SiteNav() {
  const { activeNiche, cartLineCount, openCart } = useShowcase();
  const { mode, brand, brandSuffix, theme } = activeNiche;
  const links = navByMode[mode];

  const logo =
    activeNiche.logo ? (
      <div className="flex items-center">
        <Image
          src={activeNiche.logo}
          alt={brand}
          width={130}
          height={48}
          className="h-8 sm:h-9 w-auto object-contain"
        />
      </div>
    ) : mode === "bouquet" ? (
      <div>
        <div className="font-heading text-[26px] font-light leading-none tracking-[0.12em] text-ink sm:text-[30px]">
          {brand}
        </div>
        <div className="mt-1.5 pl-0.5 text-[8px] uppercase tracking-[0.32em] text-muted sm:text-[9px]">
          {brandSuffix}
        </div>
      </div>
    ) : (
      <div>
        <div className="flex items-center gap-2.5">
          <span
            className="block h-2 w-2"
            style={{ backgroundColor: theme.accent }}
            aria-hidden="true"
          />
          <span className="font-grotesk text-[12px] font-semibold uppercase leading-none tracking-[0.18em] text-ink sm:text-[13px]">
            {brand}
          </span>
        </div>
        <div className="mt-1.5 pl-[18px] text-[8px] uppercase tracking-[0.24em] text-muted sm:text-[9px]">
          {brandSuffix}
        </div>
      </div>
    );

  return (
    <header className="relative z-20 border-b border-line">
      <div
        className={cn(
          "mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8",
          mode === "retail" && "h-[82px]",
          mode === "bouquet" && "h-[92px]",
          mode === "catering" && "h-[76px]",
        )}
      >
        <a href="#top" aria-label={`${brand} — kembali ke atas`} className="shrink-0">
          {logo}
        </a>

        <nav
          className={cn(
            "hidden items-center md:flex",
            mode === "catering" ? "gap-9" : "gap-8",
          )}
          aria-label="Navigasi utama"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "group relative text-ink opacity-80 transition-all duration-300 hover:opacity-100",
                mode === "retail" &&
                  "font-ui text-[11px] font-medium uppercase tracking-[0.18em]",
                mode === "bouquet" &&
                  "font-ui text-[10px] font-normal uppercase tracking-[0.3em]",
                mode === "catering" &&
                  "font-grotesk text-[10px] font-medium uppercase tracking-[0.2em]",
              )}
            >
              {link.label}
              <span
                className="absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-500 ease-silk group-hover:w-full"
                style={{ backgroundColor: theme.accent }}
              />
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={openCart}
          className={cn(
            "group flex shrink-0 items-center gap-2 border transition-all duration-300",
            mode === "retail" &&
              "rounded-full border-line px-4 py-2.5 hover:border-[var(--accent)]",
            mode === "bouquet" &&
              "rounded-full border-line px-4 py-2.5 hover:border-[var(--accent)]",
            mode === "catering" &&
              "rounded-none border-line px-3.5 py-2.5 hover:border-[var(--accent)]",
          )}
          aria-label={`Buka keranjang, ${cartLineCount} item`}
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4 text-ink">
            <path
              d="M5.2 6.5h9.6l-.8 8.2a1.4 1.4 0 0 1-1.4 1.3H7.4a1.4 1.4 0 0 1-1.4-1.3L5.2 6.5Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path
              d="M7.6 6.5V5.4a2.4 2.4 0 0 1 4.8 0v1.1"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
          <span
            className={cn(
              "hidden text-ink sm:inline",
              mode === "catering"
                ? "font-grotesk text-[10px] uppercase tracking-[0.18em]"
                : "font-ui text-[10px] uppercase tracking-[0.16em]",
            )}
          >
            Keranjang
          </span>
          <span
            className={cn(
              "flex h-[18px] min-w-[18px] items-center justify-center px-1 text-[9px] font-semibold",
              mode === "catering" ? "rounded-none" : "rounded-full",
            )}
            style={{
              backgroundColor: theme.accent,
              color: theme.accentContrast,
            }}
          >
            {cartLineCount}
          </span>
        </button>
      </div>

      <nav
        aria-label="Navigasi mobile"
        className="flex items-center justify-between gap-3 border-t border-line px-5 py-3 md:hidden"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              "font-ui text-[9px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink",
              mode === "bouquet" && "tracking-[0.2em]",
              mode === "catering" && "font-grotesk tracking-[0.18em]",
            )}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
