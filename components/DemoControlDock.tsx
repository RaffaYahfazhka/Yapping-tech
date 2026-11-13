"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WHATSAPP_NUMBER } from "@/config/niches";
import { useShowcase } from "@/context/ShowcaseContext";
import { KomoseLogo } from "@/components/komose/KomoseLogo";

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
    `Halo Komose, saya sedang melihat template toko ${activeNiche.brand} (${activeNiche.dock.label}). Saya tertarik membuat website toko seperti ini untuk bisnis saya. Boleh info paket Tanpa CMS & Dengan CMS?`,
  );

  const handleTabClick = (nicheId: typeof activeId) => {
    setActiveNiche(nicheId);
    if (basePath) {
      router.push(`${basePath}/${nicheId}`);
    }
  };

  return (
    <div className="fixed bottom-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <aside
        aria-label="Demo Template Switcher"
        className="pointer-events-auto inline-flex h-14 max-w-[95vw] items-center gap-2 sm:gap-3 rounded-full border border-stone-200/90 bg-white/95 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.1)] backdrop-blur-xl transition-all"
      >
        {/* Left: Back to Komose + Logo */}
        <div className="flex shrink-0 items-center gap-2 pl-1">
          <Link
            href="/komose"
            title="Kembali ke Platform Komose"
            className="group flex items-center gap-1.5 rounded-full border border-stone-200/90 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700 transition-all hover:bg-[#1B4328] hover:text-white"
          >
            <span className="text-xs transition-transform group-hover:-translate-x-0.5">←</span>
            <span className="hidden sm:inline">Komose</span>
          </Link>

          <Link
            href="/komose"
            className="group hidden xl:flex shrink-0 items-center transition-opacity hover:opacity-85 pr-1"
          >
            <KomoseLogo size="sm" />
          </Link>
        </div>

        {/* Center: Niche Switcher Tabs */}
        <div
          role="tablist"
          aria-label="Pilih template industri"
          className="flex items-center gap-1 rounded-full bg-stone-100/90 p-1 text-xs font-semibold text-stone-600"
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
                className={`relative flex items-center justify-center rounded-full px-3 py-1.5 text-xs transition-colors ${
                  isActive ? "text-stone-950 font-bold" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {/* Active Tab Background: White pill with soft shadow */}
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
                  {niche.dock.emojiImage ? (
                    <Image
                      src={niche.dock.emojiImage}
                      alt={niche.dock.label}
                      width={18}
                      height={18}
                      className="h-4 w-4 object-contain"
                      unoptimized
                    />
                  ) : (
                    <span className="text-xs leading-none">{niche.dock.emoji}</span>
                  )}
                  <span className="hidden sm:inline">{niche.dock.label}</span>
                  <span className="sm:hidden">{niche.dock.shortLabel}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Buka CMS & Pesan Web Ini */}
        <div className="flex shrink-0 items-center gap-1.5 pr-1">
          <Link
            href={`/cms/${activeId}`}
            title={`Buka ${activeNiche.brand} Management System`}
            className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 transition-all hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden md:inline">Buka CMS</span>
            <span className="md:hidden">CMS</span>
          </Link>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${pitch}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pesan website ini via WhatsApp"
            className="group flex items-center gap-1 rounded-full bg-stone-950 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-stone-800 shadow-sm"
          >
            <span className="hidden md:inline">Pesan Web Ini</span>
            <span className="md:hidden">Pesan</span>
            <span className="text-emerald-400 text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>
      </aside>
    </div>
  );
}
