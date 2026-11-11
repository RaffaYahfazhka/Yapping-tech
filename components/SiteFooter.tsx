"use client";

import Image from "next/image";
import { WHATSAPP_NUMBER } from "@/config/niches";
import { useShowcase } from "@/context/ShowcaseContext";
import { cn } from "@/lib/format";

export function SiteFooter() {
  const { activeNiche, openCart } = useShowcase();
  const { mode, theme, cta, footer, brand, brandSuffix, dock } = activeNiche;

  const developerHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Halo, saya melihat landing page demo ${brand} (${dock.label}) dan ingin membuat website serupa untuk bisnis saya.`,
  )}`;
  const brandHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Halo ${brand}, saya ingin berdiskusi mengenai kebutuhan saya.`,
  )}`;

  return (
    <footer className="border-t border-line">
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1440px] items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <span
                className={cn(mode === "catering" ? "h-2 w-2" : "h-px w-8")}
                style={{ backgroundColor: theme.accent }}
              />
              <span
                className={cn(
                  "text-[9px] uppercase text-muted",
                  mode === "catering"
                    ? "font-grotesk tracking-[0.24em]"
                    : "font-ui tracking-[0.3em]",
                )}
              >
                Mulai dari sini
              </span>
            </div>
            <h2
              className={cn(
                "mt-5 max-w-[820px] text-ink",
                mode === "retail" &&
                  "font-heading text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.035em]",
                mode === "bouquet" &&
                  "font-heading text-[clamp(2.5rem,5.4vw,4.8rem)] font-light leading-[0.98] tracking-[-0.01em]",
                mode === "catering" &&
                  "font-heading text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.025em]",
              )}
            >
              {cta.title}
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="max-w-[360px] font-body text-[12.5px] leading-[1.85] text-muted">
              {cta.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("collection")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "inline-flex items-center gap-2 px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.02]",
                  mode === "catering"
                    ? "rounded-none font-grotesk"
                    : "rounded-full font-ui",
                )}
                style={{
                  backgroundColor: theme.accent,
                  color: theme.accentContrast,
                }}
              >
                {cta.button}
                <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={openCart}
                className={cn(
                  "inline-flex items-center gap-2 border border-line px-6 py-3.5 text-[10px] uppercase text-ink transition-colors duration-300 hover:border-[var(--accent)]",
                  mode === "catering"
                    ? "rounded-none font-grotesk tracking-[0.16em]"
                    : "rounded-full font-ui tracking-[0.16em]",
                )}
              >
                Keranjang
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-line px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {activeNiche.logo ? (
              <div>
                <Image
                  src={activeNiche.logo}
                  alt={brand}
                  width={150}
                  height={55}
                  className="h-10 w-auto object-contain"
                />
              </div>
            ) : (
              <div
                className={cn(
                  "text-ink",
                  mode === "bouquet" &&
                    "font-heading text-[32px] font-light tracking-[0.1em]",
                  mode === "catering" &&
                    "font-grotesk text-[16px] font-semibold uppercase tracking-[0.18em]",
                )}
              >
                {brand}
              </div>
            )}
            <div className="mt-1.5 font-ui text-[8px] uppercase tracking-[0.28em] text-muted">
              {brandSuffix}
            </div>
            <p className="mt-4 max-w-[320px] font-body text-[11.5px] leading-[1.85] text-muted">
              {footer.tagline}
            </p>
            <a
              href={brandHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-ui text-[9px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
            >
              {footer.instagram}
              <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3" aria-hidden="true">
                <path
                  d="M4 10 10 4M10 4H5M10 4v5"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-ui text-[8px] font-semibold uppercase tracking-[0.2em] text-ink">
              Kunjungi
            </h3>
            <p className="mt-3 max-w-[220px] font-body text-[11px] leading-[1.8] text-muted">
              {footer.address}
            </p>
            <p className="mt-2 font-body text-[10px] leading-relaxed text-muted">
              {footer.note}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-ui text-[8px] font-semibold uppercase tracking-[0.2em] text-ink">
              Hubungi
            </h3>
            <a
              href={`mailto:${footer.email}`}
              className="mt-3 block font-body text-[11px] text-muted transition-colors hover:text-ink"
            >
              {footer.email}
            </a>
            <a
              href={`tel:${footer.phone.replace(/\s/g, "")}`}
              className="mt-1.5 block font-body text-[11px] text-muted transition-colors hover:text-ink"
            >
              {footer.phone}
            </a>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-ui text-[8px] font-semibold uppercase tracking-[0.2em] text-ink">
              Jam
            </h3>
            <p className="mt-3 whitespace-pre-line font-body text-[11px] leading-[1.8] text-muted">
              {mode === "retail" && "Selasa–Minggu\n07.00–19.00 WIB"}
              {mode === "bouquet" && "Selasa–Sabtu\nBy appointment"}
              {mode === "catering" && "Senin–Jumat\n09.00–18.00 WIB"}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-[1440px] flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-ui text-[8px] uppercase tracking-[0.14em] text-muted">
            © 2026 {brand} · Demo landing page
          </p>
          <a
            href={developerHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-ui text-[8px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
          >
            Ingin web seperti ini? Chat developer
            <svg
              viewBox="0 0 14 14"
              fill="none"
              className="h-2.5 w-2.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                d="M4 10 10 4M10 4H5M10 4v5"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
