"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface ShowcaseProject {
  id: string;
  name: string;
  category: string;
  badge: string;
  isClient: boolean;
  highlightHook: string;
  summary: string;
  link: string;
  isExternal: boolean;
  features: string[];
  screenshotUrl: string;
  logoUrl?: string;
  logoHeight?: number;
  badgeColor: string;
}

export const PROJECTS: ShowcaseProject[] = [
  {
    id: "plivin",
    name: "Plivin.co",
    category: "Platform Digital Gifting & Hampers",
    badge: "Produk Mandiri (In-House)",
    isClient: false,
    highlightHook: "Kirim Kado & Hampers Mewah Lewat Satu Link Sinematik",
    summary:
      "Platform gifting interaktif yang mendisrupsi pengiriman kado konvensional dengan e-voucher instan, custom greeting card generator, dan checkout langsung via WhatsApp.",
    link: "https://plivin-digigift.vercel.app/",
    isExternal: true,
    features: [
      "Custom Digital Card Builder",
      "Mesin E-Voucher Instan",
      "Direct WhatsApp Sales Routing",
      "Interactive Festive Experience",
    ],
    screenshotUrl: "/images/screenshot/home-plivin.png",
    logoUrl: "/images/logo/plivin.png",
    logoHeight: 28,
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    id: "clickcare",
    name: "ClickCare.id",
    category: "Infrastruktur Layanan Kesehatan Medis",
    badge: "Platform Klien Resmi",
    isClient: true,
    highlightHook: "Infrastruktur Layanan Medis & Homecare On-Demand",
    summary:
      "Platform kesehatan modern klien kami. Menghubungkan ribuan pasien dengan dokter berizin, dispatch perawat ke rumah, dan sistem booking telekonsultasi 24 jam.",
    link: "https://clickcare.id/",
    isExternal: true,
    features: [
      "Konsultasi Medis 24/7",
      "Dispatch Perawat ke Rumah",
      "Standar Keamanan HIPAA",
      "Arsitektur Zero-Downtime",
    ],
    screenshotUrl: "/images/screenshot/home-clickcare.png",
    logoUrl: "/images/logo/clickcare-logo.png",
    logoHeight: 32,
    badgeColor: "bg-sky-50 text-sky-800 border-sky-200",
  },
  {
    id: "atelier",
    name: "Atelier Suite",
    category: "Mesin Landing Page Multi-Niche",
    badge: "Mesin Web Mandiri",
    isClient: false,
    highlightHook: "Revenue-Engine Landing Page Siap Pakai untuk Bisnis Niche",
    summary:
      "Rangkaian landing page konversi tinggi untuk Bakery, Florist, dan Gourmet Catering. Customizer 2D interaktif, keranjang belanja, dan alur checkout WhatsApp instan.",
    link: "/templates",
    isExternal: false,
    features: [
      "3 Template Siap Pakai",
      "Kustomisasi Produk 2D Interaktif",
      "Performa Cepat Next.js Turbo",
      "Checkout Langsung WhatsApp",
    ],
    screenshotUrl: "/images/screenshot/home-mint-patisserie.png",
    badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
  },
];

export function UnifiedProductsServices() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const project = PROJECTS[selectedIndex];

  return (
    <section
      className="relative bg-[#F9F7F2] text-white overflow-hidden"
    >
      {/* Full-Bleed Embla Carousel — background images only */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {PROJECTS.map((p, idx) => (
            <div
              key={p.id}
              className="relative flex-shrink-0 w-full min-h-[520px] sm:min-h-[600px] h-[82vh] sm:h-[92vh] max-h-[900px]"
            >
              <Image
                src={p.screenshotUrl}
                alt={p.name}
                fill
                className="object-cover object-top"
                priority={idx === 0}
                unoptimized
              />
              {/* Gradient mask top: mulus nyatu dari warna cream background atas (#F9F7F2) */}
              <div className="absolute top-0 inset-x-0 h-32 sm:h-48 bg-gradient-to-b from-[#F9F7F2] via-[#F9F7F2]/60 to-transparent pointer-events-none z-10" />

              {/* Gradient mask bottom: mulus nyatu ke warna cream section Philosophy (#F9F7F2) */}
              <div className="absolute bottom-0 inset-x-0 h-52 sm:h-64 bg-gradient-to-t from-[#F9F7F2] via-[#F9F7F2]/80 to-transparent pointer-events-none z-10" />

              {/* Vignette samping & ambient dark overlay tipis agar kontras tetap terjaga */}
              <div className="absolute inset-0 bg-stone-950/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F9F7F2]/40 via-transparent to-[#F9F7F2]/30 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Persistent Overlay UI ── */}
      <div className="absolute inset-0 flex flex-col pointer-events-none z-20">

        {/* TOP: Progress bars + badge */}
        <div className="pointer-events-auto px-5 sm:px-14 lg:px-20 pt-6 sm:pt-8">
          {/* Progress bar lines */}
          <div className="flex gap-2 mb-3 sm:mb-4">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="flex-1 h-[2px] rounded-full bg-stone-900/20 overflow-hidden cursor-pointer"
              >
                <div
                  className={`h-full rounded-full bg-stone-900 transition-all duration-500 ${
                    i === selectedIndex
                      ? "w-full"
                      : i < selectedIndex
                      ? "w-full opacity-40"
                      : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Badge */}
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedIndex + "-badge"}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-stone-700 font-grotesk"
            >
              {project.badge}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* SPACER */}
        <div className="flex-1" />

        {/* BOTTOM ROW */}
        <div className="pointer-events-auto px-5 sm:px-14 lg:px-20 pb-8 sm:pb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">

          {/* LEFT: Logo + Big Title + Desc + Link */}
          <div className="max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex + "-brand"}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="mb-2 sm:mb-3"
              >
                {project.logoUrl ? (
                  <div className="h-8 sm:h-12 flex items-center">
                    <Image
                      src={project.logoUrl}
                      alt={project.name}
                      width={180}
                      height={project.logoHeight || 36}
                      className="h-8 sm:h-11 w-auto object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display italic text-stone-950 leading-[1.0] tracking-tight">
                    {project.name}
                  </h2>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={selectedIndex + "-desc"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-[15px] text-stone-800 font-outfit leading-relaxed max-w-sm font-medium line-clamp-3 sm:line-clamp-none"
              >
                {project.summary}
              </motion.p>
            </AnimatePresence>

            {/* CTA Link */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex + "-cta"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="mt-3.5 sm:mt-5"
              >
                {project.isExternal ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-950 border-b-2 border-stone-950/30 hover:border-stone-950 pb-0.5 transition-all duration-200"
                  >
                    <span>Kunjungi Live Platform</span>
                    <span className="text-emerald-600 text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                ) : (
                  <Link
                    href={project.link}
                    className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-950 border-b-2 border-stone-950/30 hover:border-stone-950 pb-0.5 transition-all duration-200"
                  >
                    <span>Jelajahi Template Showcase</span>
                    <span className="text-base transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Counter + Prev/Next buttons */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-end gap-3 sm:gap-5 shrink-0 pt-2 sm:pt-0">
            {/* Slide counter */}
            <AnimatePresence mode="wait">
              <motion.p
                key={selectedIndex + "-counter"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-xs sm:text-sm font-bold text-stone-700 tracking-widest tabular-nums"
              >
                0{selectedIndex + 1}&nbsp;/&nbsp;0{PROJECTS.length}
              </motion.p>
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous"
                className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-stone-300 bg-white/70 backdrop-blur-md text-stone-900 hover:bg-white transition-all duration-200 shadow-sm active:scale-95"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next"
                className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-stone-950 text-white hover:bg-stone-800 transition-all duration-200 shadow-lg active:scale-95"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
