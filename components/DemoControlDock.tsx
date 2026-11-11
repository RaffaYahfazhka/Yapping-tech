"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WHATSAPP_NUMBER } from "@/config/niches";
import { useShowcase } from "@/context/ShowcaseContext";
import { YappingLogo } from "@/components/YappingLogo";

export function DemoControlDock() {
  const { niches, activeId, activeNiche, setActiveNiche, basePath, isEmbedded } =
    useShowcase();
  const router = useRouter();

  // Cek apakah sedang diakses via custom domain klien (bukan di yappingtechflow.com)
  const isCustomClientDomain =
    typeof window !== "undefined" &&
    !window.location.hostname.includes("yappingtechflow") &&
    window.location.hostname !== "localhost";

  // Kalau sedang di-embed di Live Preview CMS atau live di custom domain klien,
  // sembunyikan floating dock switcher agensi agar 100% white-label milik klien!
  if (isEmbedded || isCustomClientDomain) {
    return null;
  }

  const pitch = encodeURIComponent(
    `Halo Yapping Techflow, saya sedang melihat template ${activeNiche.brand} (${activeNiche.dock.label}) di website Anda. Saya tertarik membuat landing page seperti ini untuk bisnis saya. Boleh info detail paket Tanpa CMS & Dengan CMS?`,
  );

  const handleTabClick = (nicheId: typeof activeId) => {
    setActiveNiche(nicheId);
    if (basePath) {
      router.push(`${basePath}/${nicheId}`);
    }
  };

  return (
    <div className="fixed bottom-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      <aside
        aria-label="Demo Template Switcher"
        className="pointer-events-auto flex h-[54px] w-full max-w-4xl items-center justify-between rounded-full border border-stone-200/90 bg-white/95 px-3 shadow-[0_12px_36px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:px-5 transition-all"
      >
        {/* Left: Agency Brand + Back to Home Button */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            title="Kembali ke Beranda Yapping Techflow"
            className="group flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-[11px] font-bold text-stone-700 transition-all hover:bg-stone-900 hover:text-white sm:px-3"
          >
            <span className="text-sm transition-transform group-hover:-translate-x-0.5">←</span>
            <span className="hidden sm:inline">Home</span>
          </Link>

          <Link
            href="/"
            className="group hidden md:flex shrink-0 items-center transition-opacity hover:opacity-85"
          >
            <YappingLogo className="scale-85 origin-left" />
          </Link>
        </div>

        {/* Center: Niche Switcher Tabs (Active tab has White pill background with soft shadow) */}
        <div
          role="tablist"
          aria-label="Pilih template industri"
          className="flex items-center gap-1 rounded-full bg-stone-100/90 p-1"
        >
          {niches.map((niche) => {
            const isActive = niche.id === activeId;
            return (
              <button
                key={niche.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={niche.dock.label}
                onClick={() => handleTabClick(niche.id)}
                className={`relative flex items-center justify-center rounded-full px-2.5 py-1.5 text-[11px] sm:px-4 sm:text-xs font-semibold transition-all duration-200 ${
                  isActive ? "text-stone-950 font-bold" : "text-stone-500 hover:text-stone-900"
                }`}
              >
                {/* Active Tab Background: White pill with soft shadow (sesuai lampiran gambar) */}
                {isActive && (
                  <motion.span
                    layoutId="activeDockTab"
                    className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-black/[0.04]"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                      mass: 0.7,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-sm leading-none">{niche.dock.emoji}</span>
                  <span className="hidden sm:inline">{niche.dock.label}</span>
                  <span className="sm:hidden">{niche.dock.shortLabel}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: CMS Demo Switcher + Direct WhatsApp CTA */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            href={`/cms/${activeId}`}
            title={`Buka ${activeNiche.brand} Management System (CMS + Live Preview)`}
            className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-800 transition-all hover:bg-emerald-600 hover:text-white hover:border-emerald-600 sm:px-3.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden md:inline">Buka CMS</span>
            <span className="md:hidden">CMS</span>
          </Link>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${pitch}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat Yapping Techflow untuk buat website serupa"
            className="group flex items-center gap-1.5 rounded-full bg-stone-950 px-3 py-1.5 text-[11px] font-semibold text-white transition-all hover:bg-stone-800 sm:px-4 sm:py-2 sm:text-xs shadow-sm"
          >
            <span className="hidden md:inline">Pesan Web Ini</span>
            <span className="hidden sm:inline md:hidden">Order</span>
            <span className="sm:hidden">Order</span>
            <span className="text-emerald-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>
      </aside>
    </div>
  );
}
