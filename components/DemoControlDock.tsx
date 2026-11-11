"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WHATSAPP_NUMBER } from "@/config/niches";
import { useShowcase } from "@/context/ShowcaseContext";

export function DemoControlDock() {
  const { niches, activeId, activeNiche, setActiveNiche, basePath } = useShowcase();
  const router = useRouter();

  const pitch = encodeURIComponent(
    `Halo Yapping Techflow, saya sedang melihat template ${activeNiche.brand} (${activeNiche.dock.label}) di website Anda. Saya tertarik membuat landing page seperti ini untuk bisnis saya. Boleh info detail dan paketnya?`,
  );

  const handleTabClick = (nicheId: typeof activeId) => {
    setActiveNiche(nicheId);
    if (basePath) {
      router.push(`${basePath}/${nicheId}`);
    }
  };

  return (
    <aside
      aria-label="Demo Template Switcher"
      className="fixed inset-x-0 top-0 z-50 h-[52px] border-b border-black/10 bg-white/95 shadow-sm backdrop-blur-xl"
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-2 px-3 sm:px-6">
        {/* Left: Agency Brand & Status Beacon */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 transition-opacity hover:opacity-85"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-black tracking-tight text-stone-900 uppercase">
              Yapping <span className="text-emerald-600">Techflow</span>
            </span>
            <span className="hidden lg:inline-block rounded bg-stone-100 px-1.5 py-0.5 text-[9px] font-semibold text-stone-500">
              Template Suite
            </span>
          </div>
          <span className="mx-1 hidden h-4 w-px bg-black/10 sm:block" />
        </Link>

        {/* Center: 3 Niche Switcher Tabs */}
        <div
          role="tablist"
          aria-label="Pilih template industri"
          className="flex items-center gap-1 rounded-full bg-stone-100 p-1"
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
                className="relative flex items-center justify-center rounded-full px-2.5 py-1.5 text-[11px] font-medium transition-colors duration-200 sm:px-4 sm:text-xs"
                style={{ color: isActive ? niche.theme.accentContrast : "#57534e" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full shadow-sm"
                    style={{ backgroundColor: niche.theme.accent }}
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
                  <span className="hidden sm:inline font-semibold">{niche.dock.label}</span>
                  <span className="sm:hidden font-semibold">{niche.dock.shortLabel}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Direct Conversion CTA WhatsApp */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${pitch}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat Yapping Techflow untuk buat website serupa"
            className="group flex items-center gap-1.5 rounded-full bg-stone-900 px-3 py-1.5 text-[10.5px] font-semibold text-white transition-all duration-300 hover:bg-stone-700 sm:px-4 sm:py-2 sm:text-xs shadow-sm"
          >
            <span className="hidden md:inline">Mau Web Seperti Ini? Chat Yapping Techflow</span>
            <span className="hidden sm:inline md:hidden">Pesan Web Ini</span>
            <span className="sm:hidden">Order</span>
            <span className="text-emerald-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>
    </aside>
  );
}
