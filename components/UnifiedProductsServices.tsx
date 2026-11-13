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
  ctaLabel?: string;
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
    category: "Digital Gifting & Upcoming Wedding Platform",
    badge: "Venture Mandiri (In-House)",
    isClient: false,
    highlightHook: "Kado Digital, Hampers & Ekosistem Undangan Pernikahan",
    summary:
      "Startup internal di bawah Yapping Techflow. Memudahkan kirim kado & hampers mewah lewat satu link interaktif, dan segera hadir dengan fitur undangan pernikahan digital.",
    link: "https://plivin-digigift.vercel.app/",
    isExternal: true,
    features: [
      "Custom Digital Card Builder",
      "Mesin E-Voucher Instan",
      "Segera Hadir: Undangan Nikah Digital",
      "Direct WhatsApp Sales Routing",
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
    badge: "Klien Resmi (via Komose)",
    isClient: true,
    highlightHook: "Infrastruktur Layanan Medis & Homecare On-Demand",
    summary:
      "Klien aktif kami yang dikelola lewat ekosistem Komose. Menghubungkan ribuan pasien dengan dokter berizin, dispatch perawat ke rumah, dan booking telekonsultasi 24 jam.",
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
    id: "komose",
    name: "Komose",
    category: "Platform Komersial Website Klien & CMS",
    badge: "Lini Komersial Klien",
    isClient: false,
    highlightHook: "Website Komersial Klien + CMS Mandiri Berkecepatan Sub-Detik",
    summary:
      "Lini komersial di bawah Yapping Techflow yang melayani perancangan website berkinerja tinggi dan dashboard kelola toko mandiri ([Nama Brand] Management System) untuk klien bisnis, ritel, dan UMKM dengan 0% komisi transaksi.",
    link: "/komose",
    isExternal: false,
    ctaLabel: "Kunjungi Landing Page Komose",
    features: [
      "Dipercaya Klien Terikat ClickCare.id",
      "Dashboard CMS per Brand Klien",
      "Performa Loading Sub-1 Detik",
      "Order Checkout Masuk ke WhatsApp",
    ],
    screenshotUrl: "/images/screenshot/home-mint-patisserie.png",
    logoUrl: "/images/komose/komose-full-logo.png",
    logoHeight: 28,
    badgeColor: "bg-orange-50 text-orange-900 border-orange-200",
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

              {/* Vignette samping halus */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F9F7F2]/20 via-transparent to-[#F9F7F2]/20 pointer-events-none" />
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
              className="inline-block rounded-full bg-white/80 px-3 py-1 border border-stone-200/80 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-stone-700 font-grotesk backdrop-blur-md shadow-2xs"
            >
              {project.badge}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* SPACER */}
        <div className="flex-1" />

        {/* BOTTOM ROW */}
        <div className="pointer-events-auto px-5 sm:px-14 lg:px-20 pb-8 sm:pb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">

          {/* LEFT: Logo + Big Title + Desc + Link dalam Card Kaca yang Nyaman Dibaca */}
          <div className="max-w-md rounded-2xl border border-stone-200/80 bg-white/90 p-5 sm:p-6 shadow-xl backdrop-blur-xl">
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
                  <div className="h-8 sm:h-10 flex items-center">
                    <Image
                      src={project.logoUrl}
                      alt={project.name}
                      width={160}
                      height={project.logoHeight || 32}
                      className="h-7 sm:h-9 w-auto object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <h2 className="text-2xl sm:text-4xl font-bold font-display italic text-stone-950 leading-[1.0] tracking-tight">
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
                className="mt-2 text-xs sm:text-sm text-stone-700 font-outfit leading-relaxed line-clamp-3 sm:line-clamp-none"
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
                className="mt-4"
              >
                {project.isExternal ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-950 border-b border-stone-950/30 hover:border-stone-950 pb-0.5 transition-all duration-200"
                  >
                    <span>Kunjungi Live Platform</span>
                    <span className="text-emerald-600 text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                ) : (
                  <Link
                    href={project.link}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-950 border-b border-stone-950/30 hover:border-stone-950 pb-0.5 transition-all duration-200"
                  >
                    <span>{project.ctaLabel || "Kunjungi Platform"}</span>
                    <span className="text-sm transition-transform group-hover:translate-x-0.5">
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
                className="font-mono text-xs sm:text-sm font-bold text-stone-700 tracking-widest tabular-nums rounded-full bg-white/70 px-3 py-1 border border-stone-200/80 backdrop-blur-md"
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
