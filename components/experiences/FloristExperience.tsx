"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShowcase } from "@/context/ShowcaseContext";
import { InteractiveShowcaseSlider } from "@/components/InteractiveShowcaseSlider";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SiteFooter } from "@/components/SiteFooter";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn, formatIDR } from "@/lib/format";

const RUMAH_PHONE = "6285966514774";

const CATEGORIES = [
  {
    id: "money",
    tag: "Paling Populer",
    name: "Money Bouquet (Buket Uang)",
    desc: "Buket uang susun kipas atau tarik. Uang baru asli disusun rapi tanpa dilem atau dirusak. Nominal & lembaran bebas request.",
    image: "/images/florist/money-bouquet.jpg",
    priceRange: "Mulai Rp150.000",
  },
  {
    id: "wisuda",
    tag: "Spesial Kelulusan",
    name: "Buket Wisuda & Sidang",
    desc: "Bunga lili pastel berpadu boneka wisuda bertoga dan selempang custom nama. Hadiah paling berkesan untuk momen wisuda.",
    image: "/images/florist/graduation-bouquet.jpg",
    priceRange: "Mulai Rp85.000",
  },
  {
    id: "soap",
    tag: "Awet Bertahun-tahun",
    name: "Bunga Sabun (Soap Flower)",
    desc: "Terbuat dari bahan sabun wangi lembut aromatik yang mekar abadi tanpa layu. Praktis dan indah dipajang di kamar.",
    image: "/images/florist/soap-flower-real.jpg",
    priceRange: "Mulai Rp75.000",
  },
  {
    id: "fresh",
    tag: "Romantis & Harum",
    name: "Fresh Flower Bouquet",
    desc: "Mawar merah beludru segar, lily, dan bunga matahari cerah dengan wrapping matte ala Korea. Segar dan wangi alami.",
    image: "/images/florist/fresh-rose.jpg",
    priceRange: "Mulai Rp120.000",
  },
];

const ORDER_STEPS = [
  {
    number: "01",
    action: "Pilih Model & Request Budget",
    detail: "Kirim foto referensi buket atau sebutkan budget yang kamu punya (mulai Rp50.000). Kami sesuaikan isian terbaik.",
  },
  {
    number: "02",
    action: "Tulis Kartu Ucapan Free",
    detail: "Setiap pesanan sudah free kartu ucapan custom tulisan tangan rapi untuk orang tersayang.",
  },
  {
    number: "03",
    action: "Kirim Cepat / Ambil Sendiri",
    detail: "Bisa kirim instan Grab/Gojek se-Jabodetabek atau langsung self-pickup ke studio Pondok Kelapa, Jakarta Timur.",
  },
];

const FLORIST_REVIEWS = [
  {
    id: "f-rev-1",
    category: "wisuda",
    name: "Siti Nurhaliza",
    location: "Duren Sawit, Jakarta Timur",
    avatar: "SN",
    stars: 5,
    tag: "Buket Wisuda & Boneka Toga · Self-Pickup",
    date: "2 hari yang lalu",
    review:
      "Pagi jam 9 panik temen sidang jam 1 siang belum ada kado. Hubungi admin Rumah Bouquet via WA langsung dibikinin buket boneka toga + lily. Jam 11.30 udah self-pickup di studio Pondok Kelapa. Kartu ucapannya tulisan tangan rapi banget!",
  },
  {
    id: "f-rev-2",
    category: "money",
    name: "Bagas Triputra",
    location: "Tebet, Jakarta Selatan",
    avatar: "BT",
    stars: 5,
    tag: "Money Bouquet Royal Blue · Grab Instant",
    date: "5 hari yang lalu",
    review:
      "Pesen buket uang susun kipas 30 lembar buat ulang tahun Ibu. Uangnya beneran rapi tanpa dilem atau dirusak sama sekali, bisa dipakai lagi. Ibu saya sampe nangis terharu. Pelayanan 24 jam fast response banget.",
  },
  {
    id: "f-rev-3",
    category: "soap",
    name: "Amanda Putri",
    location: "Rawamangun, Jakarta Timur",
    avatar: "AP",
    stars: 5,
    tag: "Everlasting Soap Flower · COD Ready",
    date: "1 minggu yang lalu",
    review:
      "Beli everlasting soap flower warna pastel. Udah 6 bulan dipajang di kamar masih wangi dan bentuk bunganya tetep mekar sempurna! Buat yang mau kado awet bertahun-tahun rekomen banget ini.",
  },
  {
    id: "f-rev-4",
    category: "urgent",
    name: "Reza Firmansyah",
    location: "Kelapa Gading, Jakarta Utara",
    avatar: "RF",
    stars: 5,
    tag: "Request Budget Buket Medium · Delivery Same-Day",
    date: "2 minggu yang lalu",
    review:
      "Budget pas-pasan 100 ribuan tapi pengen kasih buket cantik buat wisuda adik. Adminnya ramah banget ngebantu sesuaikan bunga dan wrapping-nya biar tetep keliatan mewah. Terima kasih Rumah Bouquet!",
  },
];

export function FloristExperience() {
  const { activeNiche, openCart, cartLineCount } = useShowcase();
  const [selectedBudget, setSelectedBudget] = useState(150000);
  const [selectedType, setSelectedType] = useState("Buket Uang (Money Bouquet)");
  const [selectedDelivery, setSelectedDelivery] = useState("Kirim Kurir Instan Jabodetabek");
  const [greetingText, setGreetingText] = useState("Happy Graduation! Semoga ilmunya berkah & sukses selalu ♡");
  const [activeFloristFilter, setActiveFloristFilter] = useState("all");

  const consultHref = `https://wa.me/${RUMAH_PHONE}?text=${encodeURIComponent(
    `Halo Rumah Bouquet, saya ingin konsultasi / pesan buket:\n• Jenis Buket: ${selectedType}\n• Perkiraan Budget: ${formatIDR(selectedBudget)}\n• Opsi Penyerahan: ${selectedDelivery}\n• Pesan Kartu: "${greetingText}"\n\nApakah slot pesanan (urgent/pre-order) masih tersedia? Terima kasih!`
  )}`;

  return (
    <div className="min-h-screen text-[#241A1E]" style={{ backgroundColor: "#FDFBF9" }}>
      {/* 1. BRAND HEADER & MASTHEAD WITH DIRECT WHATSAPP HOTLINE */}
      <header className="border-b border-[#EFE6E8] bg-[#FDFBF9]/95 backdrop-blur-md sticky top-[52px] z-30">
        <div className="mx-auto max-w-[1400px] px-6 py-2.5 border-b border-[#EFE6E8]/60 flex items-center justify-between text-[9px] font-ui uppercase tracking-[0.24em] text-[#75636A]">
          <span className="flex items-center gap-2 font-medium text-[#241A1E]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A85A68] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A85A68]" />
            </span>
            {activeNiche.announcement.status}: {activeNiche.announcement.messages[0]}
          </span>
          <span className="hidden sm:inline">Pondok Kelapa, Duren Sawit · Jakarta Timur</span>
          <span className="hidden md:inline font-semibold text-[#A85A68]">Standby 24 Jam · COD &amp; Instant Jabodetabek</span>
        </div>

        <div className="mx-auto max-w-[1400px] px-6 py-3.5 sm:px-10 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <Image
              src="/images/florist/logo.png"
              alt="Rumah Bouquet Florist & Gift"
              width={150}
              height={65}
              priority
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-8 font-ui text-[10.5px] uppercase tracking-[0.16em] text-[#241A1E]/85 font-medium">
            <a href="#collection" className="hover:text-[#A85A68] transition-colors">
              Koleksi Buket
            </a>
            <a href="#budget-builder" className="hover:text-[#A85A68] transition-colors">
              Request Budget
            </a>
            <a href="#categories" className="hover:text-[#A85A68] transition-colors">
              Jenis Buket
            </a>
            <a href="#reviews" className="hover:text-[#A85A68] transition-colors">
              Testimoni
            </a>
            <a href="#studio" className="hover:text-[#A85A68] transition-colors">
              Studio &amp; Pengiriman
            </a>
            <a href="#faqs" className="hover:text-[#A85A68] transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${RUMAH_PHONE}?text=${encodeURIComponent("Halo Rumah Bouquet, saya ingin pesan/konsultasi buket urgent hari ini.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#A85A68] px-4 py-2 font-ui text-[10px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#8e4552] transition-colors shadow-xs"
            >
              <span>WA 0859-6651-4774</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            </a>

            <button
              type="button"
              onClick={openCart}
              className="flex items-center gap-2 rounded-full border border-[#EFE6E8] bg-white px-4 py-2 font-ui text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#241A1E] hover:border-[#A85A68] transition-colors shadow-sm"
            >
              <span>Keranjang</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#A85A68] text-[9.5px] font-semibold text-white">
                {cartLineCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. CENTERED ARCHITECTURAL MAGAZINE COVER SHOWCASE HERO */}
      <section id="top" className="relative border-b border-[#EFE6E8] bg-gradient-to-b from-[#FDFBF9] via-[#FAF5F6] to-[#FDFBF9] px-6 pt-12 pb-20 sm:px-10 sm:pt-16 sm:pb-28 overflow-hidden">
        <div className="mx-auto max-w-[1360px] text-center">
          {/* Top Centered Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#A85A68]/10 px-4 py-1.5 text-[9.5px] font-ui uppercase tracking-[0.22em] text-[#A85A68] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#A85A68] animate-pulse" />
            Florist &amp; Gift Studio · Pondok Kelapa, Duren Sawit, Jakarta Timur
          </div>

          {/* Quick Category Badges Row */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-[#EFE6E8] bg-white px-3 py-1 font-ui text-[9.5px] font-semibold text-[#241A1E] shadow-2xs">
              💸 Money Bouquet (Uang)
            </span>
            <span className="rounded-full border border-[#EFE6E8] bg-white px-3 py-1 font-ui text-[9.5px] font-semibold text-[#241A1E] shadow-2xs">
              🎓 Buket Wisuda &amp; Boneka Toga
            </span>
            <span className="rounded-full border border-[#EFE6E8] bg-white px-3 py-1 font-ui text-[9.5px] font-semibold text-[#241A1E] shadow-2xs">
              🌹 Bunga Sabun Awet
            </span>
            <span className="rounded-full border border-[#EFE6E8] bg-white px-3 py-1 font-ui text-[9.5px] font-semibold text-[#241A1E] shadow-2xs">
              🍓 Buket Snack &amp; Cokelat
            </span>
          </div>

          {/* Centered Bold Headline */}
          <h1 className="mt-6 font-heading text-[clamp(2.8rem,5.8vw,5.2rem)] leading-[0.98] tracking-[-0.03em] text-[#241A1E]">
            Buket Impian, <br className="sm:hidden" />
            <span className="text-[#A85A68] italic font-light font-serif">Bebas Request Budget.</span> <br />
            Bisa Urgent Hari Ini.
          </h1>

          <p className="mt-5 max-w-[640px] mx-auto font-body text-[14.5px] leading-[1.8] text-[#75636A]">
            Spesialis buket uang rapi tanpa lem, buket wisuda kelulusan dengan boneka toga, bunga sabun awet abadi, dan mawar merah segar. Siap kirim instan se-Jabodetabek atau self-pickup ke studio Pondok Kelapa.
          </p>

          {/* Centered Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href="#collection"
                className="inline-flex items-center gap-3 rounded-full bg-[#A85A68] px-8 py-3.5 font-ui text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#8e4552] transition-all shadow-md shadow-[#A85A68]/25 hover:shadow-lg"
              >
                Lihat Pilihan Buket
                <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnetic>
            <a
              href="#budget-builder"
              className="inline-flex items-center gap-2 rounded-full border border-[#EFE6E8] bg-white px-7 py-3.5 font-ui text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#241A1E] hover:border-[#A85A68] hover:text-[#A85A68] transition-colors shadow-sm"
            >
              Hitung Budget Sendiri ↓
            </a>
            <a
              href={`https://wa.me/${RUMAH_PHONE}?text=${encodeURIComponent("Halo Rumah Bouquet, saya mau tanya slot urgent order buket hari ini.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-ui text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#A85A68] hover:underline px-2 py-3.5"
            >
              <span>Chat WA 24 Jam Standby ↗</span>
            </a>
          </div>

          {/* 3-COLUMN ASYMMETRIC PHOTO MASONRY GALLERY */}
          <div className="mt-14 relative max-w-[1240px] mx-auto">
            {/* Floating Floral Pills around the Masonry */}
            <div className="hidden lg:flex absolute -top-5 left-4 z-20 items-center gap-2 rounded-full border border-[#EFE6E8] bg-white/95 px-4 py-2 shadow-lg backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-ui text-[9px] uppercase tracking-[0.18em] font-bold text-[#241A1E]">
                Bisa Request Budget · Mulai 50k
              </span>
            </div>

            <div className="hidden lg:flex absolute -top-5 right-4 z-20 items-center gap-2 rounded-full border border-[#EFE6E8] bg-white/95 px-4 py-2 shadow-lg backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-ui text-[9px] uppercase tracking-[0.18em] font-bold text-[#241A1E]">
                ⚡ Urgent Order &amp; Grab/Gojek Instant
              </span>
            </div>

            {/* Masonry Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Left Column: Money Bouquet Feature */}
              <div className="md:col-span-3 text-left">
                <div className="group relative aspect-[3.5/4.5] rounded-3xl overflow-hidden border border-[#EFE6E8] bg-white p-2 shadow-xl transition-all duration-500 hover:shadow-2xl">
                  <div className="relative h-full w-full rounded-2xl overflow-hidden">
                    <Image
                      src="/images/florist/money-bouquet-real.jpg"
                      alt="Money Bouquet Kipas Mewah Rumah Bouquet"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-white/80 block font-semibold">
                        Paling Laris
                      </span>
                      <span className="font-heading text-[17px] font-normal block">
                        Money Bouquet
                      </span>
                      <span className="font-ui text-[9px] text-white/90 block mt-0.5">
                        Bebas Request Lembaran Uang
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Column: Elevated Focal Signature Bouquet */}
              <div className="md:col-span-6">
                <div className="group relative aspect-[4/4.8] rounded-3xl overflow-hidden border-2 border-[#A85A68]/30 bg-white p-2.5 shadow-2xl shadow-[#A85A68]/20 transition-all duration-500 hover:border-[#A85A68]">
                  <div className="relative h-full w-full rounded-2xl overflow-hidden">
                    <Image
                      src="/images/florist/hero.jpg"
                      alt="Signature Florist Collection Rumah Bouquet"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 620px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />

                    <div className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-white border border-white/30 font-ui text-[9.5px] font-semibold tracking-wider">
                      💌 Free Kartu Ucapan Custom
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 text-left text-white flex items-end justify-between">
                      <div>
                        <span className="font-ui text-[9px] uppercase tracking-[0.24em] text-rose-200 block font-semibold">
                          Signature Studio Showcase
                        </span>
                        <span className="font-heading text-[24px] sm:text-[28px] font-light leading-tight block mt-1">
                          Rumah Bouquet Florist &amp; Gift
                        </span>
                        <span className="font-ui text-[10px] text-white/80 block mt-1">
                          Pondok Kelapa, Duren Sawit · Jaktim
                        </span>
                      </div>
                      <span className="rounded-full bg-[#A85A68] px-4 py-1.5 font-ui text-[9.5px] font-bold uppercase tracking-[0.14em] text-white shadow-md">
                        Mulai 50k
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Stacked Graduation & Fresh Roses */}
              <div className="md:col-span-3 space-y-4 text-left">
                {/* Top Stack: Graduation Bouquet */}
                <div className="group relative aspect-[16/11] rounded-2xl overflow-hidden border border-[#EFE6E8] bg-white p-1.5 shadow-lg transition-all duration-500 hover:shadow-xl">
                  <div className="relative h-full w-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/florist/graduation-bouquet.jpg"
                      alt="Buket Wisuda Boneka Toga"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <span className="font-ui text-[7.5px] uppercase tracking-[0.18em] text-rose-200 font-semibold block">
                        Spesial Wisuda
                      </span>
                      <span className="font-heading text-[15px] font-normal block">
                        Buket Boneka &amp; Selempang
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Stack: Fresh Red Roses */}
                <div className="group relative aspect-[16/11] rounded-2xl overflow-hidden border border-[#EFE6E8] bg-white p-1.5 shadow-lg transition-all duration-500 hover:shadow-xl">
                  <div className="relative h-full w-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/florist/fresh-rose.jpg"
                      alt="Fresh Red Roses Velvet Mawar Segar"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <span className="font-ui text-[7.5px] uppercase tracking-[0.18em] text-rose-200 font-semibold block">
                        Romantis &amp; Harum
                      </span>
                      <span className="font-heading text-[15px] font-normal block">
                        Classic Velvet Roses
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE SHOWCASE SLIDER */}
      <InteractiveShowcaseSlider />

      {/* 4. INTERACTIVE BUDGET BUILDER (FITUR UNGGULAN: REQUEST BUDGET) */}
      <section id="budget-builder" className="border-t border-[#EFE6E8] px-6 py-16 sm:px-10 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EFE6E8] pb-6">
            <div>
              <span className="font-ui text-[9px] uppercase tracking-[0.3em] text-[#A85A68] font-bold">
                Kalkulator Pemesanan
              </span>
              <h2 className="mt-2 font-heading text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.02] text-[#241A1E]">
                Bisa Request Budget Sesuai Isi Dompetmu.
              </h2>
            </div>
            <p className="max-w-[420px] font-body text-[13px] leading-[1.8] text-[#75636A]">
              Pilih kisaran anggaran dan model buket yang kamu inginkan. Tim kami akan menyiapkan rangkaian terindah yang pas di kantong!
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Controls Column */}
            <div className="lg:col-span-7 bg-[#FDFBF9] rounded-3xl border border-[#EFE6E8] p-6 sm:p-10 shadow-sm space-y-8">
              {/* Step 1: Budget Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-[#241A1E]">
                    1. Tentukan Anggaran Budget Kamu
                  </label>
                  <span className="font-heading text-[24px] font-bold text-[#A85A68]">
                    {formatIDR(selectedBudget)}
                  </span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={1000000}
                  step={25000}
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(Number(e.target.value))}
                  className="w-full accent-[#A85A68] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-ui text-[#75636A] mt-1.5">
                  <span>Rp50.000 (Min)</span>
                  <span>Rp250.000</span>
                  <span>Rp500.000</span>
                  <span>Rp1.000.000+</span>
                </div>
              </div>

              {/* Step 2: Bouquet Type Selection */}
              <div>
                <label className="block font-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-[#241A1E] mb-3">
                  2. Pilih Jenis Buket
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Buket Uang (Money Bouquet)",
                    "Buket Wisuda & Boneka Toga",
                    "Bunga Sabun Awet (Soap Flower)",
                    "Mawar Segar & Lily",
                    "Buket Snack / Strawberry Cokelat",
                  ].map((type) => {
                    const isSelected = selectedType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={cn(
                          "p-3.5 rounded-2xl border text-left transition-all",
                          isSelected
                            ? "border-[#A85A68] bg-white shadow-sm ring-1 ring-[#A85A68]"
                            : "border-[#EFE6E8] bg-white/60 hover:border-[#A85A68]/40"
                        )}
                      >
                        <span className="font-ui text-[11.5px] font-bold text-[#241A1E] block">
                          {type}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Delivery / Pickup Method */}
              <div>
                <label className="block font-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-[#241A1E] mb-3">
                  3. Opsi Penyerahan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Kirim Kurir Instan Jabodetabek",
                    "Self-Pickup Pondok Kelapa",
                  ].map((del) => {
                    const isSelected = selectedDelivery === del;
                    return (
                      <button
                        key={del}
                        type="button"
                        onClick={() => setSelectedDelivery(del)}
                        className={cn(
                          "p-3 rounded-2xl border text-center transition-all",
                          isSelected
                            ? "border-[#A85A68] bg-white shadow-sm ring-1 ring-[#A85A68]"
                            : "border-[#EFE6E8] bg-white/60 hover:border-[#A85A68]/40"
                        )}
                      >
                        <span className="font-ui text-[11px] font-bold text-[#241A1E] block">
                          {del}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Card Message Text */}
              <div>
                <label className="block font-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-[#241A1E] mb-2">
                  4. Pesan Kartu Ucapan (Free Kartu Tulisan Tangan)
                </label>
                <textarea
                  value={greetingText}
                  onChange={(e) => setGreetingText(e.target.value)}
                  rows={2}
                  placeholder="Tulis pesan ucapan di sini..."
                  className="w-full rounded-2xl border border-[#EFE6E8] bg-white px-4 py-3 font-ui text-[12.5px] text-[#241A1E] placeholder:text-[#75636A]/60 focus:border-[#A85A68] focus:outline-none focus:ring-1 focus:ring-[#A85A68] resize-none"
                />
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 bg-[#FDFBF9] rounded-3xl border border-[#EFE6E8] p-6 sm:p-8 shadow-sm sticky top-[120px]">
              <span className="font-ui text-[8.5px] uppercase tracking-[0.24em] text-[#A85A68] font-bold block">
                Ringkasan Request Buket
              </span>

              <div className="mt-4 pb-4 border-b border-[#EFE6E8]">
                <div className="font-heading text-[22px] text-[#241A1E] font-semibold">
                  {selectedType}
                </div>
                <div className="font-body text-[12px] text-[#75636A] mt-0.5">
                  Anggaran: {formatIDR(selectedBudget)} · {selectedDelivery}
                </div>
              </div>

              {/* Envelope Preview */}
              <div className="mt-4 p-4 rounded-2xl bg-white border border-[#EFE6E8] shadow-xs">
                <span className="font-ui text-[8px] uppercase tracking-[0.16em] text-[#A85A68] font-bold block">
                  Preview Kartu Ucapan (Free)
                </span>
                <p className="mt-2 font-heading italic text-[14px] text-[#241A1E] leading-relaxed line-clamp-3">
                  “{greetingText || "Pesan ucapan Anda..."}”
                </p>
                <span className="font-ui text-[8.5px] text-[#75636A] mt-2 block text-right">
                  — Tulisan Tangan Rapi
                </span>
              </div>

              <div className="mt-6 flex items-baseline justify-between">
                <span className="font-ui text-[11px] uppercase tracking-[0.16em] text-[#75636A]">
                  Estimasi Budget
                </span>
                <span className="font-heading text-[26px] font-bold text-[#A85A68]">
                  {formatIDR(selectedBudget)}
                </span>
              </div>

              <a
                href={consultHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full rounded-full bg-[#A85A68] py-3.5 font-ui text-[11px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#8e4552] transition-colors shadow-md flex items-center justify-center gap-2 text-center"
              >
                <span>Kirim Request ke WhatsApp</span>
                <span>↗</span>
              </a>

              <p className="mt-3 text-center font-body text-[10.5px] text-[#75636A]">
                Studio Pondok Kelapa, Jakarta Timur · Respon cepat 24 jam
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CATEGORIES GRID SECTION */}
      <section id="categories" className="border-t border-[#EFE6E8] px-6 py-16 sm:px-10 sm:py-24 bg-[#FDFBF9]">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-[620px]">
            <span className="font-ui text-[9px] uppercase tracking-[0.3em] text-[#A85A68] font-bold">
              Kategori Terlaris
            </span>
            <h2 className="mt-2 font-heading text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.04] text-[#241A1E]">
              Pilihan Buket untuk Beragam Momen.
            </h2>
            <p className="mt-3 font-body text-[13px] text-[#75636A]">
              Semua jenis buket dikerjakan dengan bahan rapi dan berkualitas tinggi.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="rounded-3xl border border-[#EFE6E8] bg-white p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#EFE6E8] mb-4">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 rounded-full bg-[#A85A68] text-white px-2.5 py-0.5 font-ui text-[8px] font-semibold uppercase tracking-[0.14em]">
                      {cat.tag}
                    </div>
                  </div>

                  <h3 className="font-heading text-[18px] text-[#241A1E] font-semibold leading-snug">
                    {cat.name}
                  </h3>
                  <p className="mt-2 font-body text-[11.5px] leading-relaxed text-[#75636A]">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EFE6E8] flex items-baseline justify-between">
                  <span className="font-heading text-[16px] font-bold text-[#A85A68]">
                    {cat.priceRange}
                  </span>
                  <a
                    href={`https://wa.me/${RUMAH_PHONE}?text=${encodeURIComponent(
                      `Halo Rumah Bouquet, saya tertarik dengan kategori ${cat.name}. Boleh minta info katalog dan harganya?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[9.5px] font-ui font-bold uppercase tracking-[0.14em] text-[#241A1E] hover:text-[#A85A68]"
                  >
                    <span>Tanya WA</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STUDIO PONDOK KELAPA & HOW TO ORDER */}
      <section id="studio" className="border-t border-[#EFE6E8] px-6 py-16 sm:px-10 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1400px]">
          <div className="rounded-3xl border border-[#EFE6E8] bg-[#FDFBF9] p-8 sm:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <span className="inline-block rounded-full bg-[#A85A68]/10 text-[#A85A68] px-3.5 py-1 font-ui text-[9px] uppercase tracking-[0.2em] font-bold">
                  Lokasi Studio &amp; Pengiriman
                </span>
                <h3 className="mt-3 font-heading text-[28px] sm:text-[38px] text-[#241A1E] leading-tight">
                  Studio Pondok Kelapa, <br />
                  <span className="italic font-light text-[#A85A68]">siap kirim instan se-Jabodetabek.</span>
                </h3>
                <p className="mt-3 font-body text-[13.5px] leading-relaxed text-[#75636A]">
                  Butuh buket mendadak untuk sidang hari ini atau acara wisuda besok pagi? Lokasi kami di Pondok Kelapa, Jakarta Timur, sangat strategis untuk pengiriman cepat ke Jakarta, Bekasi, Depok, dan sekitarnya.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#EFE6E8] pt-5">
                  {ORDER_STEPS.map((s) => (
                    <div key={s.number}>
                      <span className="font-ui text-[8.5px] uppercase tracking-[0.16em] text-[#A85A68] font-bold block">
                        Langkah {s.number}
                      </span>
                      <span className="font-ui text-[12px] font-semibold text-[#241A1E] mt-1 block">
                        {s.action}
                      </span>
                      <span className="font-body text-[10.5px] text-[#75636A] mt-0.5 block">
                        {s.detail}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={`https://wa.me/${RUMAH_PHONE}?text=${encodeURIComponent(
                      "Halo Rumah Bouquet, saya ingin pesan buket untuk pengiriman hari ini / self pickup di Pondok Kelapa."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#241A1E] px-7 py-3.5 font-ui text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#A85A68] transition-colors"
                  >
                    <span>Hubungi WA Sekarang</span>
                    <span>↗</span>
                  </a>
                  <span className="font-body text-[11px] text-[#75636A]">
                    Pondok Kelapa, Duren Sawit, Jakarta Timur
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#EFE6E8]">
                  <Image
                    src="/images/florist/hero.jpg"
                    alt="Rumah Bouquet Studio"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AUTHENTIC SOCIAL PROOF & CUSTOMER REVIEWS */}
      <section id="reviews" className="border-t border-[#EFE6E8] bg-[#FDFBF9] px-6 py-16 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-[1400px]">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EFE6E8] pb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#A85A68]/10 px-3.5 py-1 font-ui text-[9px] uppercase tracking-[0.2em] font-bold text-[#A85A68]">
                <span>⭐ 4.98 / 5.0</span>
                <span className="h-1 w-1 rounded-full bg-[#A85A68]" />
                <span>8.500+ Buket Terangkai</span>
              </div>
              <h2 className="mt-3 font-heading text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.04] text-[#241A1E]">
                Momen Bahagia Bersama <br />
                <span className="italic font-light text-[#A85A68]">Rumah Bouquet Pondok Kelapa.</span>
              </h2>
            </div>

            {/* Quick Proof Pills */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="font-heading text-[24px] font-bold text-[#A85A68]">8.500+</div>
                <div className="font-ui text-[8.5px] uppercase tracking-[0.16em] text-[#75636A]">
                  Buket Terkirim
                </div>
              </div>
              <div className="h-8 w-px bg-[#EFE6E8]" />
              <div className="text-right">
                <div className="font-heading text-[24px] font-bold text-emerald-600">24 Jam</div>
                <div className="font-ui text-[8.5px] uppercase tracking-[0.16em] text-[#75636A]">
                  Fast Response WA
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { id: "all", label: "Semua Ulasan (4)" },
              { id: "wisuda", label: "🎓 Wisuda & Boneka Toga" },
              { id: "money", label: "💸 Money Bouquet" },
              { id: "soap", label: "🌹 Bunga Sabun Awet" },
              { id: "urgent", label: "⚡ Request Budget & Urgent" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFloristFilter(tab.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 font-ui text-[11px] font-medium transition-all",
                  activeFloristFilter === tab.id
                    ? "bg-[#A85A68] text-white shadow-xs font-semibold"
                    : "bg-white border border-[#EFE6E8] text-[#75636A] hover:text-[#241A1E] hover:border-[#A85A68]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Review Cards Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FLORIST_REVIEWS.filter(
              (r) => activeFloristFilter === "all" || r.category === activeFloristFilter
            ).map((rev) => (
              <div
                key={rev.id}
                className="rounded-3xl border border-[#EFE6E8] bg-white p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#A85A68]/10 hover:border-[#A85A68]/50"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500 text-xs tracking-wider">
                      {"★".repeat(rev.stars)}
                    </div>
                    <span className="font-ui text-[8px] text-[#75636A] uppercase tracking-wider">
                      {rev.date}
                    </span>
                  </div>

                  <p className="mt-3 font-body text-[12.5px] leading-relaxed text-[#241A1E]/90 italic">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#EFE6E8]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#A85A68]/15 font-ui text-[10px] font-bold text-[#A85A68]">
                      {rev.avatar}
                    </div>
                    <div>
                      <div className="font-ui text-[11px] font-bold text-[#241A1E]">
                        {rev.name}
                      </div>
                      <div className="font-ui text-[9px] text-[#75636A]">
                        {rev.location}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 font-ui text-[8.5px] text-[#A85A68] font-medium bg-[#FDFBF9] px-2 py-0.5 rounded-full border border-[#EFE6E8] inline-block">
                    {rev.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <FaqAccordion />

      {/* 9. FOOTER */}
      <SiteFooter />
    </div>
  );
}
