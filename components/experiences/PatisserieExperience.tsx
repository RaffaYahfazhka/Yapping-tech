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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// 3 Real Branches of Mint Patisserie
const BRANCHES = [
  {
    id: "jakbar",
    name: "Jakarta Barat",
    address: "Komplek Loka Indah, Jl. Mangga Besar IX",
    coverage: "Jakbar, Jakpus, Jakut, Jaksel",
    wa: "628989000160",
    phoneDisplay: "0898-9000-160",
    badge: "Kitchen Pusat",
    hours: "08.00 — 20.00 WIB",
  },
  {
    id: "tangerang",
    name: "Tangerang & Tangsel",
    address: "Alam Sutera Town Center (ASTC)",
    coverage: "Alam Sutera, Gading Serpong, BSD, Karawaci",
    wa: "628989000180",
    phoneDisplay: "0898-9000-180",
    badge: "Ready Urgent",
    hours: "08.00 — 20.00 WIB",
  },
  {
    id: "bekasi",
    name: "Bekasi & Sekitarnya",
    address: "Ruko Rose Garden, Grand Galaxy City",
    coverage: "Galaxy, Summarecon, Jatiwaringin, Kalimalang",
    wa: "628989000190",
    phoneDisplay: "0898-9000-190",
    badge: "Ready Urgent",
    hours: "08.00 — 20.00 WIB",
  },
];

// Interactive Cake Customizer Options
const SIZES = [
  {
    id: "bento",
    name: "Bento Box Cake",
    diameter: "10 cm",
    portion: "1-2 Orang",
    basePrice: 95000,
    tag: "Paling Populer",
  },
  {
    id: "petite",
    name: "Petite Cake",
    diameter: "14 cm",
    portion: "3-4 Orang",
    basePrice: 195000,
    tag: "Pas untuk Family",
  },
  {
    id: "celebration",
    name: "Celebration Cake",
    diameter: "16 cm",
    portion: "5-8 Orang",
    basePrice: 285000,
    tag: "Favorit Pesta",
  },
  {
    id: "grand",
    name: "Grand Party Cake",
    diameter: "20 cm",
    portion: "10-15 Orang",
    basePrice: 395000,
    tag: "Acara Besar",
  },
];

const FLAVORS = [
  {
    id: "vanilla-berry",
    name: "Vanilla Berry Chantilly",
    note: "Sponge vanilla lembut berpadu selai berry segar dan chantilly cream.",
    extra: 0,
  },
  {
    id: "dark-choco",
    name: "Dark Choco Ganache",
    note: "Sponge cokelat lembut dilapisi lelehan dark chocolate murni.",
    extra: 15000,
  },
  {
    id: "earl-grey",
    name: "Earl Grey Lavender",
    note: "Aroma wangi teh Earl Grey khas kafe Seoul dengan rasa manis lembut.",
    extra: 20000,
  },
  {
    id: "lotus-biscoff",
    name: "Lotus Biscoff Cream",
    note: "Krim karamel biscoff legit bertabur biskuit lotus crunchy renyah.",
    extra: 20000,
  },
];

const DESIGNS = [
  {
    id: "minimalist",
    name: "Minimalist Lettering",
    desc: "Warna pastel polos dengan tulisan ucapan estetik di atas kue.",
    extra: 0,
  },
  {
    id: "vintage",
    name: "Vintage Ruffle Piping",
    desc: "Ruffle piping klasik renda Korea dengan hiasan buah ceri segar.",
    extra: 25000,
  },
  {
    id: "comic",
    name: "Korean Comic / Line Art",
    desc: "Ilustrasi garis kartun lucu atau doodle simpel di permukaan kue.",
    extra: 35000,
  },
  {
    id: "floral",
    name: "Floral Garden Wreath",
    desc: "Hiasan bunga butter cream mungil melingkar cantik dan elegan.",
    extra: 30000,
  },
];

const PATISSERIE_REVIEWS = [
  {
    id: "rev-1",
    category: "bento",
    name: "Clarissa Wijaya",
    location: "Menteng, Jakarta Pusat",
    avatar: "CW",
    stars: 5,
    tag: "Custom Bento Cake 10cm · Cabang Mangga Besar",
    date: "Kemarin",
    review:
      "Bento cake-nya cantik banget persis sama foto referensi Pinterest yang aku kirim! Krimnya super light tipe chiffon Korea, manisnya pas gak eneg sama sekali. Pacarku suka banget!",
  },
  {
    id: "rev-2",
    category: "urgent",
    name: "Kevin Pratama",
    location: "Alam Sutera, Tangerang",
    avatar: "KP",
    stars: 5,
    tag: "Ready 2 Jam Basque Cheesecake · Cabang Alsut",
    date: "3 hari yang lalu",
    review:
      "Penyelamat banget! Lupa pesen kue anniversary, jam 1 siang order yang ready-to-write di cabang Alsut, jam 3 sore udah nyampe rumah dengan tulisan rapi. Free lilin ulir juga!",
  },
  {
    id: "rev-3",
    category: "celebration",
    name: "Devi Maharani",
    location: "Grand Galaxy, Bekasi",
    avatar: "DM",
    stars: 5,
    tag: "Tiered Celebration Cake · Cabang Bekasi",
    date: "1 minggu yang lalu",
    review:
      "Pesen yang tiered cake 2 tingkat buat acara lamaran keluarga. Tamu-tamu pada muji kuenya estetik dan rasa Earl Grey Lavender-nya wangi mewah. Highly recommended!",
  },
  {
    id: "rev-4",
    category: "bento",
    name: "dr. Michelle Chandra",
    location: "Kebayoran Baru, Jakarta Selatan",
    avatar: "MC",
    stars: 5,
    tag: "Petite Chiffon Set · Cabang Mangga Besar",
    date: "2 minggu yang lalu",
    review:
      "Keluarga kami gak suka kue yang terlalu manis. Chiffon berry di Mint Patisserie pas banget di lidah orang tua. Teksturnya super moist dan packaging box-nya sangat higienis.",
  },
];

export function PatisserieExperience() {
  const { activeNiche, openCart, cartLineCount } = useShowcase();
  const [selectedBranch, setSelectedBranch] = useState(0);
  const [activeSpongeSample, setActiveSpongeSample] = useState(0);
  const [activeReviewFilter, setActiveReviewFilter] = useState("all");

  // Customizer State
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVORS[0]);
  const [selectedDesign, setSelectedDesign] = useState(DESIGNS[0]);
  const [customText, setCustomText] = useState("Happy Birthday!");

  const customEstimatedPrice =
    selectedSize.basePrice + selectedFlavor.extra + selectedDesign.extra;

  const currentBranch = BRANCHES[selectedBranch];

  const handleCustomOrderWA = () => {
    const lines = [
      `Halo Mint Patisserie cabang ${currentBranch.name}, saya ingin konsultasi / pesan Custom Cake:`,
      "",
      `• Ukuran: ${selectedSize.name} (${selectedSize.diameter} · ${selectedSize.portion})`,
      `• Rasa Sponge: ${selectedFlavor.name}`,
      `• Gaya Desain: ${selectedDesign.name}`,
      `• Tulisan di Atas Kue: "${customText}"`,
      `• Estimasi Biaya: ${formatIDR(customEstimatedPrice)}`,
      "",
      "Apakah tanggal kirim / slot urgent hari ini masih tersedia? Terima kasih!",
    ];
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${currentBranch.wa}?text=${text}`, "_blank");
  };

  const SPONGE_SAMPLES = [
    {
      name: "🍓 Vanilla Berry Chantilly",
      note: "Chiffon bertekstur kapas super airy berpadu selai berry asli dan fresh cream ringan khas Seoul.",
    },
    {
      name: "🍫 Dark Choco Ganache",
      note: "Sponge dark cocoa moist berlapis lelehan chocolate ganache murni 70%, manis pas & elegan.",
    },
    {
      name: "🫖 Earl Grey Lavender",
      note: "Wangi seduhan daun teh Earl Grey asli meresap ke dalam chiffon dengan aroma lavender lembut.",
    },
  ];

  return (
    <div className="min-h-screen text-[#221B18]" style={{ backgroundColor: "#FAF7F5" }}>
      {/* 1. HIGH-FASHION CENTERED LOGO HEADER */}
      <header className="border-b border-[#EFE8E2] bg-[#FAF7F5]/95 backdrop-blur-md sticky top-[52px] z-30">
        <div className="mx-auto max-w-[1380px] px-4 py-2 border-b border-[#EFE8E2]/60 flex items-center justify-between text-[9px] font-ui uppercase tracking-[0.2em] text-[#7C6E68]">
          <span className="flex items-center gap-2 font-medium text-[#221B18]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C87D65] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C87D65]" />
            </span>
            {activeNiche.announcement.status}: {activeNiche.announcement.messages[0]}
          </span>
          <span className="hidden sm:inline">3 Dapur: Mangga Besar · Alam Sutera · Grand Galaxy</span>
          <span className="hidden md:inline font-semibold text-[#C87D65]">Ready Kirim 2-3 Jam</span>
        </div>

        {/* Centered Split Navigation Bar */}
        <div className="mx-auto max-w-[1380px] px-5 py-3 sm:px-8 flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 font-ui text-[10px] uppercase tracking-[0.18em] text-[#221B18]/85 font-medium flex-1">
            <a href="#collection" className="hover:text-[#C87D65] transition-colors">
              Katalog Kue
            </a>
            <a href="#custom-builder" className="hover:text-[#C87D65] transition-colors">
              Custom 2D Builder
            </a>
            <a href="#urgent-order" className="hover:text-[#C87D65] transition-colors">
              Urgent 2 Jam
            </a>
          </nav>

          {/* Centered Brand Logo */}
          <div className="flex justify-center items-center px-4">
            <a href="#top" className="group flex items-center justify-center">
              <Image
                src="/images/patisserie/logo.png"
                alt="Mint Pâtisserie 민트"
                width={150}
                height={55}
                priority
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </a>
          </div>

          {/* Right Navigation Links & Cart Button */}
          <div className="flex items-center justify-end gap-5 flex-1">
            <nav className="hidden lg:flex items-center gap-6 font-ui text-[10px] uppercase tracking-[0.18em] text-[#221B18]/85 font-medium">
              <a href="#branches" className="hover:text-[#C87D65] transition-colors">
                3 Cabang
              </a>
              <a href="#reviews" className="hover:text-[#C87D65] transition-colors">
                Ulasan Klien
              </a>
              <a href="#story" className="hover:text-[#C87D65] transition-colors">
                Tentang Kami
              </a>
            </nav>
            <button
              type="button"
              onClick={openCart}
              className="flex items-center gap-2 rounded-full border border-[#EFE8E2] bg-white px-4 py-2 font-ui text-[10px] font-medium uppercase tracking-[0.16em] text-[#221B18] hover:border-[#C87D65] transition-colors shadow-sm"
            >
              <span>Keranjang</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C87D65] text-[9.5px] font-semibold text-white">
                {cartLineCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. ASYMMETRICAL LAYERED EDITORIAL SPREAD HERO */}
      <section id="top" className="relative px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-24 border-b border-[#EFE8E2] overflow-hidden">
        <div className="mx-auto max-w-[1380px]">

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Editorial Narrative & Interactive Sponge Selector */}
            <div className="lg:col-span-6">
              <span className="inline-block border-b-2 border-[#C87D65] pb-1 font-ui text-[9.5px] uppercase tracking-[0.28em] text-[#C87D65] font-semibold">
                EST. 2021 · KOREAN BOUTIQUE BAKERY · JABODETABEK
              </span>
              <h1 className="mt-5 font-heading text-[clamp(2.6rem,5.2vw,4.6rem)] leading-[0.98] tracking-[-0.03em] text-[#221B18]">
                Kue impianmu, <br />
                <span className="italic font-light text-[#C87D65]">dibuat fresh &amp; cantik,</span> <br />
                bisa urgent hari ini.
              </h1>
              <p className="mt-5 max-w-[540px] font-body text-[14px] leading-[1.8] text-[#7C6E68]">
                Custom cake bergaya Korea dengan tekstur chiffon super lembut dan light fresh cream yang manis pas, tidak bikin eneg. Bebas request foto desain referensimu, atau pilih kue ready-to-write yang siap dikirim dalam 2-3 jam.
              </p>

              {/* Interactive Mini Flavor & Sponge Selector Pill */}
              <div className="mt-6 rounded-2xl border border-[#EFE8E2] bg-white/80 p-4 backdrop-blur-sm shadow-xs">
                <div className="flex items-center justify-between text-[9px] font-ui uppercase tracking-[0.16em] text-[#7C6E68]">
                  <span className="font-semibold text-[#221B18]">Cicipi Karakter Rasa:</span>
                  <span className="text-[#C87D65] font-medium">Klik untuk Coba Rasa</span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {SPONGE_SAMPLES.map((sample, idx) => (
                    <button
                      key={sample.name}
                      type="button"
                      onClick={() => setActiveSpongeSample(idx)}
                      className={cn(
                        "rounded-full px-3 py-1 font-ui text-[10px] font-medium transition-all",
                        activeSpongeSample === idx
                          ? "bg-[#C87D65] text-white shadow-xs font-semibold"
                          : "bg-[#FAF7F5] border border-[#EFE8E2] text-[#221B18] hover:border-[#C87D65]"
                      )}
                    >
                      {sample.name}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11.5px] leading-relaxed text-[#7C6E68] italic">
                  {SPONGE_SAMPLES[activeSpongeSample].note}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href="#custom-builder"
                    className="inline-flex items-center gap-3 rounded-full bg-[#221B18] px-7 py-3.5 font-ui text-[10px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#C87D65] transition-colors shadow-md"
                  >
                    Pesan Custom Sekarang
                    <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </Magnetic>
                <a
                  href="#urgent-order"
                  className="inline-flex items-center gap-2 rounded-full border border-[#EFE8E2] bg-white px-6 py-3.5 font-ui text-[10px] font-medium uppercase tracking-[0.16em] text-[#221B18] hover:border-[#C87D65] transition-colors shadow-sm"
                >
                  Urgent Ready 2-3 Jam
                </a>
              </div>

              {/* Trust Features Seal */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#EFE8E2] pt-5">
                <div>
                  <div className="font-heading italic text-[19px] text-[#C87D65]">2-3 Jam</div>
                  <div className="font-ui text-[8.5px] uppercase tracking-[0.18em] text-[#7C6E68] mt-0.5">
                    Urgent Order Siap
                  </div>
                </div>
                <div>
                  <div className="font-heading italic text-[19px] text-[#221B18]">Light Cream</div>
                  <div className="font-ui text-[8.5px] uppercase tracking-[0.18em] text-[#7C6E68] mt-0.5">
                    Manis Pas &amp; Tidak Eneg
                  </div>
                </div>
                <div>
                  <div className="font-heading italic text-[19px] text-[#221B18]">Free Bonus</div>
                  <div className="font-ui text-[8.5px] uppercase tracking-[0.18em] text-[#7C6E68] mt-0.5">
                    Lilin Ulir &amp; Pisau
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Overlapping Gallery Collage (Layered Spread) */}
            <div className="lg:col-span-6 relative pt-4 pb-10">
              <div className="relative mx-auto max-w-[500px]">
                {/* Main Framed Photo */}
                <div className="relative aspect-[4/3.8] rounded-2xl overflow-hidden border border-[#EFE8E2] bg-white p-2.5 shadow-2xl shadow-[#221B18]/10">
                  <div className="relative h-full w-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/patisserie/bento-cake.jpg"
                      alt="Custom Korean Bento Cake cantik warna pastel"
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 520px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                      <div>
                        <span className="font-ui text-[8.5px] uppercase tracking-[0.22em] text-white/80 block">
                          Signature Best Seller · 10cm
                        </span>
                        <span className="font-heading text-[20px] font-normal">
                          Custom Korean Bento Cake
                        </span>
                      </div>
                      <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 font-ui text-[9px] font-semibold uppercase tracking-[0.14em]">
                        Mulai Rp95.000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Overlapping Polaroid Card 1: Top-Right Tilted -3deg */}
                <div className="absolute -top-6 -right-3 sm:-right-6 z-20 w-[170px] sm:w-[195px] rotate-[-3deg] rounded-xl border border-[#EFE8E2] bg-white p-2 shadow-xl shadow-black/10 transition-transform duration-300 hover:rotate-0 hover:scale-105">
                  <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                    <Image
                      src="/images/patisserie/urgent-cake.jpg"
                      alt="Piping detail fresh chiffon"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                    <span className="absolute top-1.5 left-1.5 rounded-full bg-[#C87D65] px-2 py-0.5 text-[7.5px] font-bold text-white uppercase tracking-wider">
                      Ready 2 Jam
                    </span>
                  </div>
                  <div className="pt-2 pb-1 text-center font-heading italic text-[11px] text-[#221B18]">
                    Fresh Chiffon · Hand-Piped
                  </div>
                </div>

                {/* Overlapping Polaroid Card 2: Bottom-Left Tilted +4deg */}
                <div className="absolute -bottom-6 -left-3 sm:-left-6 z-20 w-[180px] sm:w-[210px] rotate-[4deg] rounded-xl border border-[#EFE8E2] bg-white p-2 shadow-xl shadow-black/10 transition-transform duration-300 hover:rotate-0 hover:scale-105">
                  <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                    <Image
                      src="/images/patisserie/cheesecake.jpg"
                      alt="Basque Burnt Cheesecake Lumer"
                      fill
                      sizes="210px"
                      className="object-cover"
                    />
                    <span className="absolute bottom-1.5 right-1.5 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 text-[7.5px] font-semibold text-white">
                      Molten Center
                    </span>
                  </div>
                  <div className="pt-2 pb-1 text-center font-heading italic text-[11px] text-[#221B18]">
                    Basque Cheesecake Lumer
                  </div>
                </div>

                {/* Floating Kitchen Seal */}
                <div className="absolute top-1/2 -left-6 z-30 hidden sm:flex items-center gap-2 rounded-full border border-[#EFE8E2] bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-ui text-[8.5px] uppercase tracking-[0.16em] font-bold text-[#221B18]">
                    Slot Urgent Hari Ini Dibuka
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE PRODUCT SHOWCASE CAROUSEL */}
      <InteractiveShowcaseSlider />

      {/* 4. EXCLUSIVE INTERACTIVE: CAKE CUSTOMIZER & PRICE ESTIMATOR */}
      <section id="custom-builder" className="border-t border-[#EFE8E2] bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1380px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EFE8E2] pb-6">
            <div>
              <span className="font-ui text-[9px] uppercase tracking-[0.3em] text-[#C87D65] font-semibold">
                Interactive Customizer
              </span>
              <h2 className="mt-2 font-heading text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.02] text-[#221B18]">
                Rancang Kue Impianmu: <br />
                <span className="italic font-light text-[#C87D65]">Pilih ukuran, rasa &amp; tulisan.</span>
              </h2>
            </div>
            <p className="max-w-[420px] font-body text-[13px] leading-[1.8] text-[#7C6E68]">
              Sesuaikan dengan kebutuhan acaramu. Hasil rancangan ini bisa langsung dikirim via WhatsApp ke admin kitchen terdekat untuk diproses.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step Selection Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Size */}
              <div>
                <label className="block font-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-[#221B18] mb-3">
                  1. Pilih Ukuran &amp; Porsi Kue
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SIZES.map((sz) => {
                    const isSelected = selectedSize.id === sz.id;
                    return (
                      <button
                        key={sz.id}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={cn(
                          "p-3.5 rounded-xl border text-left transition-all",
                          isSelected
                            ? "border-[#C87D65] bg-[#FAF7F5] shadow-sm ring-1 ring-[#C87D65]"
                            : "border-[#EFE8E2] bg-white hover:border-[#221B18]/30"
                        )}
                      >
                        <span className="font-ui text-[8px] uppercase tracking-[0.16em] text-[#C87D65] font-medium block">
                          {sz.tag}
                        </span>
                        <div className="mt-1 font-heading text-[15px] font-semibold text-[#221B18]">
                          {sz.diameter}
                        </div>
                        <div className="font-body text-[10.5px] text-[#7C6E68] mt-0.5">
                          {sz.portion}
                        </div>
                        <div className="mt-2 font-ui text-[11px] font-bold text-[#221B18]">
                          {formatIDR(sz.basePrice)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Flavor */}
              <div>
                <label className="block font-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-[#221B18] mb-3">
                  2. Pilih Rasa Base Chiffon &amp; Isian
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FLAVORS.map((fl) => {
                    const isSelected = selectedFlavor.id === fl.id;
                    return (
                      <button
                        key={fl.id}
                        type="button"
                        onClick={() => setSelectedFlavor(fl)}
                        className={cn(
                          "p-3.5 rounded-xl border text-left transition-all",
                          isSelected
                            ? "border-[#C87D65] bg-[#FAF7F5] shadow-sm ring-1 ring-[#C87D65]"
                            : "border-[#EFE8E2] bg-white hover:border-[#221B18]/30"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-ui text-[12px] font-bold text-[#221B18]">
                            {fl.name}
                          </span>
                          {fl.extra > 0 && (
                            <span className="font-ui text-[9.5px] text-[#C87D65] font-semibold">
                              +{formatIDR(fl.extra)}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 font-body text-[11px] leading-relaxed text-[#7C6E68]">
                          {fl.note}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Design Style */}
              <div>
                <label className="block font-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-[#221B18] mb-3">
                  3. Pilih Gaya Dekorasi &amp; Piping
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DESIGNS.map((ds) => {
                    const isSelected = selectedDesign.id === ds.id;
                    return (
                      <button
                        key={ds.id}
                        type="button"
                        onClick={() => setSelectedDesign(ds)}
                        className={cn(
                          "p-3.5 rounded-xl border text-left transition-all",
                          isSelected
                            ? "border-[#C87D65] bg-[#FAF7F5] shadow-sm ring-1 ring-[#C87D65]"
                            : "border-[#EFE8E2] bg-white hover:border-[#221B18]/30"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-ui text-[12px] font-bold text-[#221B18]">
                            {ds.name}
                          </span>
                          {ds.extra > 0 && (
                            <span className="font-ui text-[9.5px] text-[#C87D65] font-semibold">
                              +{formatIDR(ds.extra)}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 font-body text-[11px] leading-relaxed text-[#7C6E68]">
                          {ds.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Custom Message */}
              <div>
                <label className="block font-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-[#221B18] mb-2">
                  4. Tulis Kalimat Ucapan di Atas Kue (Maks. 30 Karakter)
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Contoh: Happy Birthday Sarah ♡"
                  className="w-full rounded-xl border border-[#EFE8E2] bg-[#FAF7F5] px-4 py-3 font-ui text-[13px] text-[#221B18] placeholder:text-[#7C6E68]/60 focus:border-[#C87D65] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                />
              </div>
            </div>

            {/* Right: Live Preview Card & Order Button */}
            <div className="lg:col-span-5 rounded-2xl border border-[#EFE8E2] bg-[#FAF7F5] p-6 sm:p-8 sticky top-[120px]">
              <span className="font-ui text-[8.5px] uppercase tracking-[0.24em] text-[#C87D65] font-semibold block">
                Live Cake Preview
              </span>

              {/* Mockup Cake Frame */}
              <div className="mt-4 relative aspect-[4/3] rounded-xl overflow-hidden border border-[#EFE8E2] bg-white flex items-center justify-center p-6 text-center shadow-inner">
                <Image
                  src={
                    selectedSize.id === "bento"
                      ? "/images/patisserie/bento-cake.jpg"
                      : selectedSize.id === "celebration"
                      ? "/images/patisserie/vintage-cake.jpg"
                      : "/images/patisserie/hero-cake.jpg"
                  }
                  alt="Custom Cake Mockup"
                  fill
                  className="object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="relative z-10 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full border border-white/60 shadow-lg max-w-[85%]">
                  <span className="font-heading italic text-[16px] sm:text-[18px] text-[#221B18] line-clamp-1">
                    {customText || "Ucapan Kustom Anda"}
                  </span>
                </div>
              </div>

              {/* Summary List */}
              <div className="mt-5 space-y-2 border-y border-[#EFE8E2] py-4 text-[12px] font-ui">
                <div className="flex justify-between text-[#7C6E68]">
                  <span>Ukuran ({selectedSize.diameter}):</span>
                  <span className="font-semibold text-[#221B18]">{formatIDR(selectedSize.basePrice)}</span>
                </div>
                <div className="flex justify-between text-[#7C6E68]">
                  <span>Varian ({selectedFlavor.name}):</span>
                  <span className="font-semibold text-[#221B18]">
                    {selectedFlavor.extra > 0 ? `+${formatIDR(selectedFlavor.extra)}` : "Termasuk"}
                  </span>
                </div>
                <div className="flex justify-between text-[#7C6E68]">
                  <span>Desain ({selectedDesign.name}):</span>
                  <span className="font-semibold text-[#221B18]">
                    {selectedDesign.extra > 0 ? `+${formatIDR(selectedDesign.extra)}` : "Termasuk"}
                  </span>
                </div>
                <div className="flex justify-between text-[#7C6E68]">
                  <span>Bonus Lilin Ulir &amp; Pisau:</span>
                  <span className="font-semibold text-emerald-600">Gratis (Rp0)</span>
                </div>
              </div>

              {/* Total & Action */}
              <div className="mt-4 flex items-baseline justify-between">
                <span className="font-ui text-[11px] uppercase tracking-[0.16em] text-[#7C6E68]">
                  Estimasi Total
                </span>
                <span className="font-heading text-[24px] font-semibold text-[#221B18]">
                  {formatIDR(customEstimatedPrice)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCustomOrderWA}
                className="mt-5 w-full rounded-full bg-[#221B18] py-3.5 font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#C87D65] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>Pesan Custom via WhatsApp</span>
                <span className="text-stone-300">↗</span>
              </button>

              <p className="mt-2 text-center font-body text-[10px] text-[#7C6E68]">
                Akan diteruskan ke kitchen cabang terdekat ({currentBranch.name})
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. URGENT SAME-DAY ORDER SECTION */}
      <section id="urgent-order" className="border-t border-[#EFE8E2] bg-[#FAF7F5] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1380px]">
          <div className="rounded-2xl border border-[#EFE8E2] bg-white p-6 sm:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="inline-block rounded-full bg-[#C87D65]/10 text-[#C87D65] px-3.5 py-1 font-ui text-[9px] uppercase tracking-[0.2em] font-bold">
                  Butuh Kue Mendadak Hari Ini?
                </span>
                <h3 className="mt-3 font-heading text-[28px] sm:text-[38px] text-[#221B18] leading-tight">
                  Urgent Order Ready to Write, <br />
                  <span className="italic font-light text-[#C87D65]">siap kirim dalam 2-3 jam.</span>
                </h3>
                <p className="mt-3 font-body text-[13.5px] leading-relaxed text-[#7C6E68]">
                  Lupa pesan kue atau ada perayaan dadakan? Kami menyiapkan stok cake ready fresh setiap hari di ketiga kitchen cabang. Tinggal beri tahu ucapan yang ingin ditulis, kurir instan langsung jalan ke alamatmu.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#EFE8E2] pt-5">
                  <div>
                    <span className="font-ui text-[8.5px] uppercase tracking-[0.16em] text-[#C87D65] font-bold block">
                      Langkah 01
                    </span>
                    <span className="font-ui text-[12px] font-semibold text-[#221B18] mt-1 block">
                      Chat Admin Cabang
                    </span>
                    <span className="font-body text-[10.5px] text-[#7C6E68] mt-0.5 block">
                      Cek ketersediaan rasa hari ini.
                    </span>
                  </div>
                  <div>
                    <span className="font-ui text-[8.5px] uppercase tracking-[0.16em] text-[#C87D65] font-bold block">
                      Langkah 02
                    </span>
                    <span className="font-ui text-[12px] font-semibold text-[#221B18] mt-1 block">
                      Tulis Ucapan &amp; Bayar
                    </span>
                    <span className="font-body text-[10.5px] text-[#7C6E68] mt-0.5 block">
                      Langsung dipipakan oleh artist.
                    </span>
                  </div>
                  <div>
                    <span className="font-ui text-[8.5px] uppercase tracking-[0.16em] text-[#C87D65] font-bold block">
                      Langkah 03
                    </span>
                    <span className="font-ui text-[12px] font-semibold text-[#221B18] mt-1 block">
                      Instant Delivery
                    </span>
                    <span className="font-body text-[10.5px] text-[#7C6E68] mt-0.5 block">
                      Tiba aman dalam 2-3 jam.
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#branches"
                    className="inline-flex items-center gap-2 rounded-full bg-[#C87D65] px-6 py-3 font-ui text-[10px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#221B18] transition-colors"
                  >
                    Pilih Cabang Terdekat
                  </a>
                  <span className="font-body text-[11px] text-[#7C6E68]">
                    Tersedia di Mangga Besar, Alam Sutera, dan Bekasi
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative aspect-square rounded-xl overflow-hidden border border-[#EFE8E2]">
                  <Image
                    src="/images/patisserie/urgent-cake.jpg"
                    alt="Urgent Ready Cake"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 3 KITCHEN BRANCH LOCATIONS */}
      <section id="branches" className="border-t border-[#EFE8E2] bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1380px]">
          <div className="max-w-[620px]">
            <span className="font-ui text-[9px] uppercase tracking-[0.3em] text-[#C87D65] font-semibold">
              Titik Pengiriman
            </span>
            <h2 className="mt-2 font-heading text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.04] text-[#221B18]">
              3 Cabang Kitchen Jabodetabek.
            </h2>
            <p className="mt-3 font-body text-[13px] text-[#7C6E68]">
              Pilih cabang paling dekat dengan lokasimu agar ongkos kirim lebih hemat dan cake tiba lebih cepat.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRANCHES.map((b, idx) => (
              <div
                key={b.id}
                className={cn(
                  "rounded-2xl border p-6 transition-all duration-300 relative",
                  selectedBranch === idx
                    ? "border-[#C87D65] bg-[#FAF7F5] shadow-lg ring-1 ring-[#C87D65]"
                    : "border-[#EFE8E2] bg-white hover:border-[#221B18]/30 hover:shadow-md"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-ui text-[8.5px] uppercase tracking-[0.2em] text-[#C87D65] font-bold">
                    {b.badge}
                  </span>
                  <span className="font-ui text-[9px] text-[#7C6E68]">{b.hours}</span>
                </div>

                <h3 className="mt-3 font-heading text-[22px] text-[#221B18]">
                  {b.name}
                </h3>

                <p className="mt-2 font-body text-[12px] text-[#221B18]/90 font-medium">
                  {b.address}
                </p>

                <p className="mt-1 font-body text-[11px] text-[#7C6E68]">
                  Area: {b.coverage}
                </p>

                <div className="mt-6 pt-4 border-t border-[#EFE8E2] flex items-center justify-between">
                  <span className="font-ui text-[11px] font-semibold text-[#221B18]">
                    WA: {b.phoneDisplay}
                  </span>
                  <a
                    href={`https://wa.me/${b.wa}?text=${encodeURIComponent(
                      `Halo Mint Patisserie cabang ${b.name}, saya ingin tanya ketersediaan kue hari ini.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#221B18] px-4 py-2 font-ui text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#C87D65] transition-colors"
                  >
                    <span>Chat WA</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BRAND STORY SECTION */}
      <section id="story" className="border-t border-[#EFE8E2] bg-[#FAF7F5] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1380px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#EFE8E2]">
                <Image
                  src="/images/patisserie/bento-cake.jpg"
                  alt="Korean Bento Cake"
                  fill
                  sizes="350px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#EFE8E2] translate-y-6">
                <Image
                  src="/images/patisserie/cake-decorating.jpg"
                  alt="Cake Decorating Studio"
                  fill
                  sizes="350px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <span className="font-ui text-[9px] uppercase tracking-[0.3em] text-[#C87D65] font-semibold">
              Cerita Mint Patisserie
            </span>
            <h2 className="mt-3 font-heading text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.04] text-[#221B18]">
              Manisnya pas, cantik difoto, <br />
              <span className="italic font-light text-[#C87D65]">lembut di setiap suapan.</span>
            </h2>
            <div className="mt-6 space-y-4 font-body text-[13.5px] leading-[1.85] text-[#7C6E68]">
              <p>
                Bagi kami di Mint Patisserie, kue perayaan bukan sekadar hidangan penutup, melainkan simbol doa, rasa terima kasih, dan senyuman di hari paling berharga bagi orang-orang tersayang.
              </p>
              <p>
                Itulah mengapa kami konsisten menggunakan resep light fresh cream rendah gula yang terasa ringan dan lembut di lidah. Setiap detail piping dibuat tangan dengan penuh ketelitian oleh tim pastry artist kami di 3 dapur produksi Jabodetabek.
              </p>
            </div>

            <div className="mt-8 border-t border-[#EFE8E2] pt-6 flex items-center justify-between">
              <div>
                <div className="font-heading italic text-[16px] text-[#221B18]">
                  Mint Patisserie Team
                </div>
                <div className="font-ui text-[8.5px] uppercase tracking-[0.18em] text-[#7C6E68]">
                  Custom Cake Studio
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/images/patisserie/logo.png"
                  alt="Mint Pâtisserie 민트"
                  width={110}
                  height={40}
                  className="h-7 w-auto object-contain opacity-75"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. AUTHENTIC SOCIAL PROOF & CUSTOMER REVIEWS */}
      <section id="reviews" className="border-t border-[#EFE8E2] bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1380px]">
          {/* Header & Metrics Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EFE8E2] pb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#C87D65]/10 px-3 py-1 font-ui text-[9px] uppercase tracking-[0.2em] font-semibold text-[#C87D65]">
                <span>⭐ 4.9 / 5.0</span>
                <span className="h-1 w-1 rounded-full bg-[#C87D65]" />
                <span>850+ Ulasan Puas</span>
              </div>
              <h2 className="mt-3 font-heading text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.04] text-[#221B18]">
                Cerita Manis dari <br />
                <span className="italic font-light text-[#C87D65]">Pelanggan Setia Mint Pâtisserie.</span>
              </h2>
            </div>

            {/* Quick Proof Pills */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="font-heading text-[24px] font-bold text-[#221B18]">12.000+</div>
                <div className="font-ui text-[8.5px] uppercase tracking-[0.16em] text-[#7C6E68]">
                  Kue Terkirim
                </div>
              </div>
              <div className="h-8 w-px bg-[#EFE8E2]" />
              <div className="text-right">
                <div className="font-heading text-[24px] font-bold text-emerald-600">99.2%</div>
                <div className="font-ui text-[8.5px] uppercase tracking-[0.16em] text-[#7C6E68]">
                  On-Time Instant
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { id: "all", label: "Semua Ulasan (4)" },
              { id: "bento", label: "🎂 Custom Bento & Birthday" },
              { id: "urgent", label: "⚡ Urgent Ready 2 Jam" },
              { id: "celebration", label: "💍 Acara & Lamaran" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveReviewFilter(tab.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 font-ui text-[11px] font-medium transition-all",
                  activeReviewFilter === tab.id
                    ? "bg-[#221B18] text-white shadow-xs font-semibold"
                    : "bg-[#FAF7F5] border border-[#EFE8E2] text-[#7C6E68] hover:text-[#221B18] hover:border-[#C87D65]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PATISSERIE_REVIEWS.filter(
              (r) => activeReviewFilter === "all" || r.category === activeReviewFilter
            ).map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl border border-[#EFE8E2] bg-[#FAF7F5] p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#C87D65]/40"
              >
                <div>
                  {/* Stars & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500 text-xs tracking-wider">
                      {"★".repeat(rev.stars)}
                    </div>
                    <span className="font-ui text-[8px] text-[#7C6E68] uppercase tracking-wider">
                      {rev.date}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="mt-3 font-body text-[12.5px] leading-relaxed text-[#221B18]/90 italic">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#EFE8E2]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C87D65]/15 font-ui text-[10px] font-bold text-[#C87D65]">
                      {rev.avatar}
                    </div>
                    <div>
                      <div className="font-ui text-[11px] font-bold text-[#221B18]">
                        {rev.name}
                      </div>
                      <div className="font-ui text-[9px] text-[#7C6E68]">
                        {rev.location}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 font-ui text-[8.5px] text-[#C87D65] font-medium bg-white px-2 py-0.5 rounded border border-[#EFE8E2] inline-block">
                    {rev.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <FaqAccordion />

      {/* 10. SITE FOOTER */}
      <SiteFooter />
    </div>
  );
}
