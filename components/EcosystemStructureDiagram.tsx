"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { YappingLogo } from "./YappingLogo";
import { KomoseLogo } from "./komose/KomoseLogo";

export function EcosystemStructureDiagram() {
  return (
    <div className="mx-auto w-full max-w-[1460px] px-3 sm:px-6 lg:px-10 pt-2 pb-0">
      <div className="w-full rounded-[2.5rem] border border-stone-300/80 bg-white/80 backdrop-blur-md shadow-2xl shadow-stone-900/[0.04] p-6 sm:p-10 lg:p-14 relative overflow-hidden text-left">
          {/* Architectural dot grid */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#1c1917 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* LEVEL 1: HOLDING STUDIO INDUK (TOP CENTER) */}
          <div className="flex flex-col items-center relative z-10">
            <div className="w-full max-w-3xl rounded-2xl border-2 border-stone-800/80 bg-white/95 backdrop-blur-sm p-6 sm:p-7 text-stone-900 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/90 pb-3.5">
                <span className="rounded-full bg-stone-100 text-stone-800 border border-stone-300 px-3.5 py-0.5 text-[11px] font-bold font-mono tracking-wider">
                  Holding Induk &amp; Studio
                </span>
                <span className="font-mono text-xs text-stone-500">yappingtechflow.id</span>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <YappingLogo />
                  <p className="mt-2.5 text-xs sm:text-sm text-stone-600 font-outfit max-w-xl leading-relaxed">
                    Pusat rekayasa arsitektur kode, holding kepemilikan IP teknologi, dan inkubator produk venture digital.
                  </p>
                </div>
                <div className="flex sm:flex-col gap-1.5 shrink-0 text-[11px] font-mono text-stone-700">
                  <span className="rounded-md bg-stone-100 border border-stone-200 px-2.5 py-1">Multi-Tenant Gateway</span>
                  <span className="rounded-md bg-stone-100 border border-stone-200 px-2.5 py-1">Edge Runtime</span>
                </div>
              </div>
            </div>

            {/* Connecting Lines: Level 1 to Level 2 (Branches Left to Plivin, Right to Komose) */}
            <div className="w-full max-w-5xl lg:max-w-6xl h-14 flex items-center justify-center my-1">
              <svg className="w-full h-full" viewBox="0 0 1000 56" fill="none" preserveAspectRatio="none">
                <line x1="500" y1="0" x2="500" y2="28" stroke="#78716c" strokeWidth="2" />
                <line x1="250" y1="28" x2="750" y2="28" stroke="#78716c" strokeWidth="2" />
                <line x1="250" y1="28" x2="250" y2="56" stroke="#1c1917" strokeWidth="2.5" />
                <line x1="750" y1="28" x2="750" y2="56" stroke="#ea580c" strokeWidth="2.5" />
              </svg>
            </div>
          </div>

          {/* LEVEL 2: TWO MAIN STRATEGIC PILLARS (FULL WIDTH SPREAD) */}
          <div className="w-full grid gap-8 lg:gap-10 lg:grid-cols-2 relative z-10 items-start">
            {/* PILLAR 1 (LEFT): PLIVIN.CO (IN-HOUSE VENTURE - SLEEK MONOCHROME THEME) */}
            <div className="rounded-2xl border-2 border-stone-900 bg-white/95 p-6 sm:p-8 shadow-lg shadow-stone-950/[0.04] flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-stone-200/80 pb-3.5">
                  <span className="rounded-full bg-stone-100 text-stone-900 border border-stone-300 px-3.5 py-0.5 text-[11px] font-bold font-jakarta">
                    Venture In-House Mandiri
                  </span>
                  <span className="font-mono text-xs text-stone-500">plivin.co</span>
                </div>

                {/* Logo directly on card without badge wrapper */}
                <div className="mt-5 flex items-center gap-3.5">
                  <Image
                    src="/images/logo/plivin.png"
                    alt="Logo Plivin.co"
                    width={130}
                    height={34}
                    className="h-8 w-auto object-contain"
                  />
                  <div>
                    <p className="text-xs font-semibold text-stone-600 font-jakarta">
                      Lifestyle &amp; Digital Gifting
                    </p>
                  </div>
                </div>

                <p className="mt-3.5 text-xs sm:text-sm text-stone-600 font-outfit leading-relaxed">
                  Startup produk mandiri milik Yapping Techflow yang mendisrupsi pengiriman kado &amp; hampers lewat satu link sinematik, dengan ekspansi ke ekosistem undangan pernikahan digital.
                </p>

                <div className="mt-5 space-y-2 border-t border-stone-100 pt-4 text-xs sm:text-sm text-stone-700 font-jakarta">
                  <div className="flex items-center gap-2.5">
                    <span className="text-stone-950 font-bold">✓</span>
                    <span>Interactive Digital Gifting &amp; Hampers Canvas</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-stone-950 font-bold">✓</span>
                    <span>Instant E-Voucher Generation Engine</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-stone-950 font-bold">✓</span>
                    <span>Segera Hadir: Undangan Nikah Digital</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-stone-950 font-bold">✓</span>
                    <span>100% Kepemilikan IP Yapping Techflow</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-stone-100">
                <a
                  href="https://plivin-digigift.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-stone-800 transition-colors shadow-sm font-jakarta"
                >
                  <span>Kunjungi Platform Plivin.co</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* PILLAR 2 (RIGHT): KOMOSE (COMMERCIAL PLATFORM) WITH LEVEL 3 BRANCHING BELOW */}
            <div className="flex flex-col">
              {/* KOMOSE LEVEL 2 NODE CARD */}
              <div className="rounded-2xl border-2 border-[#1B4328] bg-white/95 p-6 sm:p-8 shadow-lg shadow-[#1B4328]/[0.05] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-orange-100 pb-3.5">
                    <span className="rounded-full bg-orange-100 text-orange-900 border border-orange-300 px-3.5 py-0.5 text-[11px] font-bold font-jakarta">
                      Lini Komersial Klien
                    </span>
                    <span className="font-mono text-xs text-stone-500">komose.id</span>
                  </div>

                  {/* Logo directly on card without badge wrapper */}
                  <div className="mt-5 flex items-center gap-3.5">
                    <KomoseLogo variant="dark" />
                    <div>
                      <p className="text-xs font-semibold text-[#FF681F] font-jakarta">
                        Website Klien &amp; CMS Mandiri
                      </p>
                    </div>
                  </div>

                  <p className="mt-3.5 text-xs sm:text-sm text-stone-600 font-outfit leading-relaxed">
                    Platform pembuatan website komersial dan sistem manajemen toko mandiri ([Nama Brand] Management System) untuk klien ritel, klinik, UMKM, dan jasa profesional dengan 0% komisi.
                  </p>

                  <div className="mt-5 space-y-2 border-t border-stone-100 pt-4 text-xs sm:text-sm text-stone-700 font-jakarta">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#FF681F] font-bold">✓</span>
                      <span>Custom Client Web Design &amp; Multi-Domain Hosting</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#FF681F] font-bold">✓</span>
                      <span>Dashboard Mandiri [Nama Brand] Management System</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#FF681F] font-bold">✓</span>
                      <span>Alur Checkout Terstruktur Masuk ke WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#FF681F] font-bold">✓</span>
                      <span>0% Potongan Komisi Transaksi Selamanya</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-stone-100">
                  <Link
                    href="/komose"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1B4328] px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-[#FF681F] transition-colors shadow-sm font-jakarta"
                  >
                    <span>Buka Landing Page Komose</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Connecting Lines: Komose to Level 3 (Branches Down to ClickCare & UMKM) */}
              <div className="w-full h-12 flex items-center justify-center my-1">
                <svg className="w-full h-full" viewBox="0 0 500 48" fill="none" preserveAspectRatio="none">
                  {/* Vertical trunk from Komose */}
                  <line x1="250" y1="0" x2="250" y2="24" stroke="#ea580c" strokeWidth="2" />
                  {/* Horizontal bar branching left and right */}
                  <line x1="125" y1="24" x2="375" y2="24" stroke="#ea580c" strokeWidth="2" />
                  {/* Left drop to ClickCare */}
                  <line x1="125" y1="24" x2="125" y2="48" stroke="#0284c7" strokeWidth="2.5" />
                  {/* Right drop to UMKM */}
                  <line x1="375" y1="24" x2="375" y2="48" stroke="#d97706" strokeWidth="2.5" />
                </svg>
              </div>

              {/* LEVEL 3: CLIENT SUB-TREE BENEATH KOMOSE (SPACIOUS 2-COL CARDS) */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* LEVEL 3A: CLICKCARE.ID */}
                <div className="rounded-2xl border-2 border-sky-300 bg-white/95 p-5 shadow-md shadow-sky-950/[0.03] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 border-b border-sky-100 pb-2.5">
                      <span className="rounded-full bg-sky-100 text-sky-800 px-2.5 py-0.5 text-[10px] font-bold font-jakarta">
                        Klien Resmi Terikat
                      </span>
                      <span className="font-mono text-[10px] text-stone-500">clickcare.id</span>
                    </div>

                    {/* Logo directly on card without badge wrapper */}
                    <div className="mt-3.5 flex items-center">
                      <Image
                        src="/images/logo/clickcare-logo.png"
                        alt="ClickCare"
                        width={110}
                        height={28}
                        className="h-6 w-auto object-contain"
                      />
                    </div>

                    <p className="mt-2.5 text-xs sm:text-sm text-stone-600 font-outfit leading-relaxed">
                      Layanan Medis &amp; Homecare On-Demand (Dokter, Perawat &amp; Booking 24/7).
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-sky-100">
                    <a
                      href="https://clickcare.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-1 rounded-full border border-sky-300 bg-sky-50 px-3.5 py-2.5 text-xs font-bold text-sky-900 hover:bg-sky-600 hover:text-white transition-colors font-jakarta"
                    >
                      <span>Kunjungi Website</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* LEVEL 3B: JARINGAN UMKM & TOKO */}
                <div className="rounded-2xl border-2 border-amber-300 bg-white/95 p-5 shadow-md shadow-amber-950/[0.03] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 border-b border-amber-100 pb-2.5">
                      <span className="rounded-full bg-amber-100 text-amber-900 px-2.5 py-0.5 text-[10px] font-bold font-jakarta">
                        Multi-Tenant Storefronts
                      </span>
                      <span className="font-mono text-[10px] text-stone-500">rotimomoh.komose.id</span>
                    </div>

                    {/* Emojis directly on card without badge wrapper */}
                    <div className="mt-3.5 flex items-center gap-2.5">
                      <div className="flex -space-x-1 shrink-0">
                        <Image
                          src="/images/emojis/cake.png"
                          alt="Cake"
                          width={26}
                          height={26}
                          className="h-6 w-6 object-contain"
                        />
                        <Image
                          src="/images/emojis/bouquet.png"
                          alt="Bouquet"
                          width={26}
                          height={26}
                          className="h-6 w-6 object-contain"
                        />
                        <Image
                          src="/images/emojis/catering.png"
                          alt="Catering"
                          width={26}
                          height={26}
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-stone-900 font-jakarta">
                        UMKM &amp; Toko
                      </span>
                    </div>

                    <p className="mt-2.5 text-xs sm:text-sm text-stone-600 font-outfit leading-relaxed">
                      Ekosistem Toko Ritel &amp; Jasa (Roti Momoh, Florist, Katering) dengan Dashboard CMS Mandiri.
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-amber-100">
                    <Link
                      href="/komose#klien-demo"
                      className="flex w-full items-center justify-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-xs font-bold text-amber-900 hover:bg-[#1B4328] hover:text-white hover:border-[#1B4328] transition-colors font-jakarta"
                    >
                      <span>Lihat Demo via Komose</span>
                      <span>↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
