"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShowcase } from "@/context/ShowcaseContext";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SiteFooter } from "@/components/SiteFooter";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn, formatIDR, formatPax } from "@/lib/format";

const GLOW_PHONE = "6281999888790";

const PACKAGES = [
  {
    id: "slim-package",
    name: "Slim Package (Weight Loss)",
    code: "GH-SLIM",
    subtitle: "Defisit Kalori Terkontrol · 400-450 Kcal",
    pricePerPax: 65000,
    minPax: 5,
    calories: "±420 Kcal",
    protein: "35g Protein Tinggi",
    serviceType: "5-Compartment Eco Seal Bento",
    crew: "Kurir Khusus Suhu Terkontrol",
    highlights: ["Dada Ayam Probiotik Panggang", "Beras Merah Organik Pulen", "Brokoli & Zucchini Kukus", "Saus Lemon Herb Homemade"],
    description: "Program turun berat badan tanpa rasa lemas. Kenyang lebih lama, tinggi serat, dan tanpa minyak jenuh.",
    image: "/images/catering/slim-package.jpg",
  },
  {
    id: "medical-nutrition",
    name: "Medical Nutrition & Blood Sugar",
    code: "GH-CLINIC",
    subtitle: "Diabetes, Heart Care & Hipertensi",
    pricePerPax: 85000,
    minPax: 5,
    calories: "Low Glycemic Index",
    protein: "Supervisi Ahli Gizi",
    serviceType: "Personalized Clinical Bento",
    crew: "Supervisi Langsung Nutritionist",
    highlights: ["Salmon Atlantik Panggang", "Quinoa & Shirataki", "Rendah Garam & Bebas Gula", "Minyak Zaitun Extra Virgin"],
    description: "Dirancang khusus sesuai riwayat medis dengan kontrol gula darah ketat dan penjagaan kesehatan jantung.",
    image: "/images/catering/medical-nutrition.jpg",
  },
  {
    id: "beauty-package",
    name: "Beauty & Healthy Aging",
    code: "GH-BEAUTY",
    subtitle: "Kaya Antioksidan & Omega-3",
    pricePerPax: 75000,
    minPax: 5,
    calories: "±480 Kcal",
    protein: "Nutrisi Kulit & Kolagen",
    serviceType: "Premium Antioksidan Bento",
    crew: "Pengiriman Fresh Harian",
    highlights: ["Alpukat Mentega & Edamame", "Salmon / Ayam Organik", "Buah Berry Kaya Antioksidan", "Dressing Olive Oil Murni"],
    description: "Nutrisi kecantikan dan anti-aging dari dalam untuk elastisitas kulit, rambut berkilau, dan energi segar.",
    image: "/images/catering/beauty-package.jpg",
  },
  {
    id: "corporate-healthy",
    name: "Corporate Wellness Catering",
    code: "GH-CORP",
    subtitle: "Meeting Kantor, Seminar & Training",
    pricePerPax: 75000,
    minPax: 10,
    calories: "Anti Food-Coma Lunch",
    protein: "Faktur Pajak & PO Resmi",
    serviceType: "Bento Rapat Box / Buffet Setup",
    crew: "Setup Rapi Tepat Waktu H-0",
    highlights: ["Pilihan Menu Berganti", "Packaging Rapi Elegan", "Bebas Rasa Kantuk Siang", "Bisa Faktur Pajak Resmi"],
    description: "Solusi makan siang sehat untuk rapat direksi dan seminar kantor. Kerja lebih fokus tanpa lelah setelah makan.",
    image: "/images/catering/corporate-healthy.jpg",
  },
];

const COMPARTMENT_DETAILS = [
  {
    id: "protein",
    number: "01",
    title: "Protein Bersih Berkualitas",
    desc: "Salmon Atlantik, dada ayam probiotik tanpa lemak, atau telur omega. Dipanggang dengan minyak zaitun tanpa deep frying.",
    benefit: "Membangun otot & metabolisme aktif",
  },
  {
    id: "carbs",
    number: "02",
    title: "Karbohidrat Kompleks Pilihan",
    desc: "Beras merah organik, shirataki rendah kalori, ubi ungu, atau quinoa dengan indeks glikemik rendah.",
    benefit: "Energi stabil tanpa lonjakan gula darah",
  },
  {
    id: "fiber",
    number: "03",
    title: "Sayuran Segar Kaya Serat",
    desc: "Brokoli, wortel, baby corn, dan zucchini kukus segar tanpa MSG yang mempertahankan vitamin alaminya.",
    benefit: "Pencernaan lancar & rasa kenyang lama",
  },
  {
    id: "fruits",
    number: "04",
    title: "Buah Segar Penuh Vitamin",
    desc: "Potongan buah segar penutup alami seperti melon manis, buah naga, atau anggur segar tanpa sirup pemanis.",
    benefit: "Antioksidan alami & vitamin segar",
  },
  {
    id: "sauce",
    number: "05",
    title: "Saus Sehat Buatan Sendiri",
    desc: "Dibuat fresh setiap hari dari rempah asli, minyak zaitun, sari lemon, dan biji wijen dengan sodium sangat terkontrol.",
    benefit: "Lezat alami tanpa MSG sintetis",
  },
];

const GLOW_REVIEWS = [
  {
    id: "g-rev-1",
    category: "slim",
    name: "drg. Nadia Savira",
    location: "SCBD / Kebayoran Baru, Jaksel",
    avatar: "NS",
    stars: 5,
    tag: "-3.8 kg dalam 20 Hari · Kolesterol Turun",
    date: "Kemarin",
    review:
      "Sebagai dokter gigi dengan jadwal praktek padat, sering gak sempat masak makanan sehat. Langganan Glow House 20 hari turun 3.8 kg tanpa lemas atau kelaparan. Rasanya seperti makanan resto bintang lima, bukan makanan diet hambar!",
  },
  {
    id: "g-rev-2",
    category: "diabetes",
    name: "Hendro Wijaya",
    location: "Sudirman, Jakarta Selatan",
    avatar: "HW",
    stars: 5,
    tag: "HbA1c & Gula Darah Terkontrol · Office Delivery",
    date: "4 hari yang lalu",
    review:
      "Gula darah puasa saya stabil di angka 105 setelah 1 bulan program katering Glow House. Porsinya pas, saus dan bumbunya herbal alami tanpa MSG sintetis. Pengiriman ke kantor selalu tepat sebelum jam 11 siang.",
  },
  {
    id: "g-rev-3",
    category: "corporate",
    name: "Rina Anggraini",
    location: "Pondok Indah, Jakarta Selatan",
    avatar: "RA",
    stars: 5,
    tag: "15 Pax Corporate Bento · Gluten-Free Supervised",
    date: "1 minggu yang lalu",
    review:
      "Pesen catering bento box mingguan buat tim eksekutif kantor (15 pax). Kemasan 5 sekatnya sangat rapi dan higienis, presentasinya mewah buat meeting direksi. Ahli gizinya fast response saat kami request bebas gluten.",
  },
  {
    id: "g-rev-4",
    category: "slim",
    name: "Fajar Nugraha",
    location: "Senopati, Jakarta Selatan",
    avatar: "FN",
    stars: 5,
    tag: "Program 20 Hari Healthy Lunch · Anti-Begah",
    date: "2 minggu yang lalu",
    review:
      "Biasanya setelah makan siang kantor bawaannya ngantuk dan begah. Sejak ganti ke menu Glow House, badan enteng dan fokus kerja sore tetap prima. Minyak zaitun dan sayurnya beneran kerasa fresh tiap hari.",
  },
];

export function CateringExperience() {
  const { activeNiche, addToCart, openCart, cartLineCount } = useShowcase();
  const { brand, brandSuffix, hero, story, announcement, footer, products, cms } = activeNiche;
  const visibility = cms?.visibility ?? {
    showAnnouncement: true,
    showCustomizer: true,
    showStory: true,
    showReviews: true,
    showFaq: true,
  };
  const reviews = cms?.reviews ?? GLOW_REVIEWS;
  const clientWa =
    cms?.whatsappOrderNumber?.replace(/[^0-9]/g, "") ||
    footer.phone.replace(/[^0-9]/g, "") ||
    GLOW_PHONE;
  const displayWa = footer.phone || "0819-9988-8790";

  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0);
  const [paxCount, setPaxCount] = useState(15);
  const [selectedDuration, setSelectedDuration] = useState<"1day" | "5day" | "20day">("1day");
  const [activeCompartment, setActiveCompartment] = useState(0);
  const [heroProgramTab, setHeroProgramTab] = useState(0);
  const [activeCateringFilter, setActiveCateringFilter] = useState("all");

  const HERO_PROGRAMS = [
    {
      id: "slim",
      name: "🥗 Weight Loss (Slim)",
      goal: "Defisit kalori terkontrol, fat-burn & energi stabil",
      calories: "400 - 450 kcal",
      protein: 42,
      carbs: 35,
      fats: 12,
      highlight: "Quinoa serat tinggi, dada ayam herbal, sayuran kukus rendah sodium",
    },
    {
      id: "diabetes",
      name: "🩸 Diabetes & Heart Care",
      goal: "Stabilkan gula darah & jaga profil lipid kardiovaskular",
      calories: "450 - 490 kcal",
      protein: 38,
      carbs: 45,
      fats: 10,
      highlight: "Beras merah organik (Low GI), salmon omega-3, minyak zaitun extra virgin",
    },
    {
      id: "beauty",
      name: "✨ Anti-Aging Beauty",
      goal: "Nutrisi kolagen alami, hidrasi seluler & antioksidan",
      calories: "420 - 460 kcal",
      protein: 40,
      carbs: 38,
      fats: 14,
      highlight: "Alpukat segar, edamame, berry antioxidant, biji chia & pumpkin seeds",
    },
    {
      id: "office",
      name: "🍱 Office Lunch Bento",
      goal: "Fokus kerja maksimal, tanpa rasa kantuk berat siang hari",
      calories: "480 - 520 kcal",
      protein: 46,
      carbs: 48,
      fats: 12,
      highlight: "Daging sirloin rendah lemak, telur organik, salad renyah & homemade dressing",
    },
  ];

  const dynamicPackages = useMemo(() => {
    const source = products.length > 0 ? products : [];
    if (source.length === 0) return PACKAGES;
    return source.map((p, idx) => ({
      id: p.id,
      name: p.name,
      code: p.badge || `PKG-0${idx + 1}`,
      subtitle: p.subtitle,
      pricePerPax: p.price,
      minPax: p.minQty,
      calories: p.specs[0]?.value || "400-500 Kcal",
      protein: p.highlights[0] || "Nutrisi Terukur",
      serviceType: p.specs[1]?.value || "Eco Seal Bento",
      crew: "Pengiriman Suhu Terkontrol",
      highlights: p.highlights,
      description: p.description,
      image: p.image,
      productRef: p,
    }));
  }, [products]);

  const safeIndex = selectedPkgIndex < dynamicPackages.length ? selectedPkgIndex : 0;
  const currentPkg = dynamicPackages[safeIndex] ?? dynamicPackages[0];
  const activeProduct = products.find((p) => p.id === currentPkg.id) ?? products[0];

  const durationMultiplier = selectedDuration === "1day" ? 1 : selectedDuration === "5day" ? 5 : 20;
  const discountMultiplier = selectedDuration === "20day" ? 0.9 : selectedDuration === "5day" ? 0.95 : 1;
  const estimatedSubtotal = Math.round(currentPkg.pricePerPax * paxCount * durationMultiplier * discountMultiplier);

  const handleAddCustomBanquet = () => {
    if (activeProduct) {
      addToCart(activeProduct, paxCount);
      openCart();
    }
  };

  const consultationHref = `https://wa.me/${clientWa}?text=${encodeURIComponent(
    `Halo ${brand}, saya ingin konsultasi program catering sehat untuk ${paxCount} pax paket ${currentPkg.name} (${selectedDuration === "1day" ? "1 kali acara" : selectedDuration === "5day" ? "program 5 hari" : "program bulanan 20 hari"}). Mohon info detailnya, terima kasih!`
  )}`;

  const mainHeroImg = hero.images[0] ?? {
    src: "/images/catering/hero.jpg",
    alt: `Menu Sehat ${brand}`,
    caption: "Personalized Meal Bento",
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* 1. SWISS UTILITARIAN CLINICAL HEADER */}
      <header className="border-b border-line bg-canvas/95 backdrop-blur-md sticky top-0 z-30">
        {visibility.showAnnouncement && (
          <div className="mx-auto max-w-[1440px] px-6 py-2 border-b border-line flex items-center justify-between text-[8.5px] font-ui uppercase tracking-[0.2em] text-muted">
            <span className="flex items-center gap-2 font-medium text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {announcement.status}: {announcement.messages[0]}
            </span>
            <span className="hidden sm:inline font-ui text-accent font-semibold">
              {announcement.messages[1] || footer.address}
            </span>
            <span className="hidden md:inline font-bold text-accent">WA: {displayWa}</span>
          </div>
        )}

        <div className="mx-auto max-w-[1440px] px-6 py-3.5 sm:px-10 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            {activeNiche.logo && !cms?.useTextLogo ? (
              <Image
                src={activeNiche.logo}
                alt={brand}
                width={160}
                height={60}
                priority
                unoptimized={activeNiche.logo.startsWith("data:") || activeNiche.logo.startsWith("http")}
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
              />
            ) : (
              <div>
                <div className="font-grotesk text-[16px] font-bold uppercase tracking-[0.16em] text-ink leading-none">
                  {brand}
                </div>
                <div className="mt-1 font-ui text-[8px] uppercase tracking-[0.22em] text-muted">
                  {brandSuffix}
                </div>
              </div>
            )}
          </a>

          <nav className="hidden lg:flex items-center gap-8 font-ui text-[10.5px] uppercase tracking-[0.16em] text-ink/85 font-medium">
            <a href="#packages" className="hover:text-[var(--accent)] transition-colors">
              Pilihan Program
            </a>
            {visibility.showCustomizer && (
              <a href="#estimator" className="hover:text-[var(--accent)] transition-colors">
                Kalkulator Gizi &amp; Porsi
              </a>
            )}
            <a href="#anatomy" className="hover:text-[var(--accent)] transition-colors">
              Anatomi 5 Sekat
            </a>
            {visibility.showReviews && (
              <a href="#reviews" className="hover:text-[var(--accent)] transition-colors">
                Hasil &amp; Ulasan
              </a>
            )}
            {visibility.showStory && (
              <a href="#story" className="hover:text-[var(--accent)] transition-colors">
                Tentang Kami
              </a>
            )}
            {visibility.showFaq && (
              <a href="#faq" className="hover:text-[var(--accent)] transition-colors">
                FAQ
              </a>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={consultationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-surface px-4 py-2 font-ui text-[10px] font-semibold uppercase tracking-[0.14em] text-accent hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] transition-all shadow-2xs"
            >
              <span>Konsultasi Ahli Gizi ↗</span>
            </a>

            <button
              type="button"
              onClick={openCart}
              className="flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 font-ui text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink hover:border-[var(--accent)] transition-colors shadow-sm"
            >
              <span>Keranjang</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[9.5px] font-semibold text-[var(--accent-contrast)]">
                {cartLineCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HIGH-DENSITY 12-COLUMN BENTO GRID DASHBOARD HERO */}
      <section id="top" className="relative border-b border-line bg-canvas px-6 pt-10 pb-16 sm:px-10 sm:pt-14 sm:pb-24 overflow-hidden">
        <div className="mx-auto max-w-[1440px]">
          {/* Top Swiss Clinical Headline Header */}
          <div className="max-w-[920px]">
            <div className="inline-flex items-center gap-2 rounded-md bg-surface border border-line px-3 py-1 text-[9px] font-ui uppercase tracking-[0.24em] text-accent font-bold">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              {hero.kicker}
            </div>
            <h1 className="mt-4 font-heading text-[clamp(2.6rem,5vw,4.4rem)] leading-[1.0] tracking-[-0.03em] text-ink">
              {hero.titleLead} <br />
              <span className="text-accent italic font-serif">{hero.titleAccent}</span> {hero.titleTail}
            </h1>
            <p className="mt-4 font-body text-[14.5px] leading-[1.8] text-muted max-w-[680px]">
              {hero.description}
            </p>
          </div>

          {/* 12-COLUMN MODULAR BENTO GRID */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Box 1 (Cols 1-7): Interactive Program Dashboard & Live Macro Tracker */}
            <div className="lg:col-span-7 rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-xl shadow-black/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-line">
                  <span className="font-ui text-[9px] uppercase tracking-[0.22em] text-muted font-semibold">
                    1. Pilih Target Program Kesehatan:
                  </span>
                  <span className="font-ui text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Active Formulation
                  </span>
                </div>

                {/* Quick-Switch Program Tabs */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {HERO_PROGRAMS.map((prog, idx) => (
                    <button
                      key={prog.id}
                      type="button"
                      onClick={() => setHeroProgramTab(idx)}
                      className={cn(
                        "rounded-xl p-2.5 text-left transition-all border text-[11px] font-ui flex flex-col justify-between",
                        heroProgramTab === idx
                          ? "bg-accent text-[var(--accent-contrast)] border-[var(--accent)] shadow-md font-semibold"
                          : "bg-canvas text-ink border-line hover:border-[var(--accent)]/50"
                      )}
                    >
                      <span>{prog.name}</span>
                      <span className={cn(
                        "text-[9px] mt-1 block",
                        heroProgramTab === idx ? "opacity-85" : "text-muted"
                      )}>
                        {prog.calories}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Active Program Goal & Macro Breakdown */}
                <div className="mt-6 rounded-2xl bg-canvas border border-line p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-ui text-[8.5px] uppercase tracking-[0.18em] text-accent font-bold block">
                        Fokus Nutrisi Klinis
                      </span>
                      <span className="font-ui text-[13px] font-bold text-ink block mt-0.5">
                        {HERO_PROGRAMS[heroProgramTab].goal}
                      </span>
                    </div>
                    <span className="font-heading text-[18px] font-bold text-accent">
                      {HERO_PROGRAMS[heroProgramTab].calories}
                    </span>
                  </div>

                  {/* Multi-Color Macro Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[9px] font-ui uppercase tracking-[0.14em] text-muted mb-1.5 font-medium">
                      <span>Protein: {HERO_PROGRAMS[heroProgramTab].protein}g</span>
                      <span>Karbo: {HERO_PROGRAMS[heroProgramTab].carbs}g</span>
                      <span>Lemak Sehat: {HERO_PROGRAMS[heroProgramTab].fats}g</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-line overflow-hidden flex">
                      <div
                        style={{ width: `${HERO_PROGRAMS[heroProgramTab].protein}%` }}
                        className="bg-accent h-full"
                        title="Protein"
                      />
                      <div
                        style={{ width: `${HERO_PROGRAMS[heroProgramTab].carbs}%` }}
                        className="bg-emerald-600 h-full"
                        title="Karbo Kompleks"
                      />
                      <div
                        style={{ width: `${HERO_PROGRAMS[heroProgramTab].fats}%` }}
                        className="bg-amber-500 h-full"
                        title="Lemak Sehat"
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] leading-relaxed text-muted italic">
                    Komposisi: {HERO_PROGRAMS[heroProgramTab].highlight}
                  </p>
                </div>

                {/* Verified Checklist */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[10.5px] font-ui text-ink">
                  {hero.badges.slice(0, 3).map((b) => (
                    <div key={b} className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-4 pt-5 border-t border-line">
                <Magnetic>
                  <a
                    href="#packages"
                    className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-3.5 font-ui text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-contrast)] hover:opacity-90 transition-all shadow-md"
                  >
                    {hero.primaryCta}
                    <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </Magnetic>
                <a
                  href={consultationHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-6 py-3.5 font-ui text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors shadow-2xs"
                >
                  {hero.secondaryCta} ↗
                </a>
              </div>
            </div>

            {/* Box 2 (Cols 8-12): Flat-Lay Bento Anatomy Card with Hotspots */}
            <div className="lg:col-span-5 rounded-3xl border border-line bg-surface p-4 shadow-xl shadow-black/5 flex flex-col justify-between">
              <div className="relative aspect-[4/3.8] rounded-2xl overflow-hidden border border-line">
                <Image
                  src={mainHeroImg.src}
                  alt={mainHeroImg.alt}
                  fill
                  priority
                  unoptimized={mainHeroImg.src.startsWith("data:") || mainHeroImg.src.startsWith("http")}
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Hotspot 1 */}
                <div className="absolute top-4 left-4 z-10 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-white border border-white/20 font-ui text-[8.5px] font-medium">
                  ● Salmon Herbal (High Omega-3)
                </div>

                {/* Hotspot 2 */}
                <div className="absolute bottom-16 right-4 z-10 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-white border border-white/20 font-ui text-[8.5px] font-medium">
                  ● Beras Merah Organik (Low GI)
                </div>

                {/* Bottom title */}
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                  <div>
                    <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-purple-200 block font-semibold">
                      Anatomi 5 Sekat
                    </span>
                    <span className="font-heading text-[18px] font-normal">
                      {mainHeroImg.caption || "Signature Healthy Bento"}
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-600 px-3 py-1 font-ui text-[9px] font-bold text-white uppercase tracking-wider">
                    Mulai {formatIDR(currentPkg.pricePerPax)} / pax
                  </span>
                </div>
              </div>

              {/* Delivery Batch Status */}
              <div className="mt-4 rounded-xl border border-line bg-canvas p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-ui text-[10px] text-ink font-semibold">
                    Slot Batch Besok Pagi: <span className="text-accent">Sisa 4 Slot Dapur</span>
                  </span>
                </div>
                <span className="font-ui text-[9px] uppercase tracking-[0.16em] text-muted">
                  {brand}
                </span>
              </div>
            </div>

            {/* Bottom Row - 3 Modular Stat Boxes */}
            {hero.stats.slice(0, 3).map((stat, idx) => (
              <div key={idx} className="lg:col-span-4 rounded-2xl border border-line bg-surface p-5 shadow-sm">
                <div className={cn("font-heading text-[26px] font-bold", idx === 0 ? "text-accent" : idx === 1 ? "text-emerald-700" : "text-ink")}>
                  {stat.value}
                </div>
                <div className="font-ui text-[10px] uppercase tracking-[0.18em] text-ink font-bold mt-1">
                  {stat.label}
                </div>
                <p className="mt-2 font-body text-[12px] leading-relaxed text-muted">
                  {idx === 0
                    ? "Dihitung cermat per box oleh Ahli Gizi. Kenyang tahan lama tanpa rasa lemas atau kantuk berat saat jam kerja."
                    : idx === 1
                    ? "Dikirim hangat se-Jabodetabek dengan kemasan microwave-safe steril dan higienis."
                    : "Bebas konsultasikan pantangan kolesterol, asam urat, alergi, atau target penurunan BB sebelum memulai paket."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE PROGRAM SHOWCASE CARDS */}
      <section id="packages" className="border-b border-line px-6 py-16 sm:px-10 sm:py-24 bg-surface">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-6">
            <div>
              <span className="font-ui text-[9px] uppercase tracking-[0.3em] text-accent font-bold">
                {activeNiche.showcase.kicker}
              </span>
              <h2 className="mt-2 font-heading text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.02] text-ink">
                {activeNiche.showcase.title}
              </h2>
            </div>
            <p className="max-w-[420px] font-body text-[13px] leading-[1.8] text-muted">
              {activeNiche.showcase.description}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dynamicPackages.map((pkg, idx) => {
              const isSelected = safeIndex === idx;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPkgIndex(idx)}
                  className={cn(
                    "cursor-pointer rounded-2xl border transition-all duration-300 p-5 flex flex-col justify-between group",
                    isSelected
                      ? "border-[var(--accent)] bg-canvas shadow-xl ring-2 ring-[var(--accent)] -translate-y-1"
                      : "border-line bg-surface hover:border-[var(--accent)]/40 hover:shadow-lg hover:-translate-y-0.5"
                  )}
                >
                  <div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-line mb-4">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        unoptimized={pkg.image.startsWith("data:") || pkg.image.startsWith("http")}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 right-2.5 rounded-full bg-accent text-[var(--accent-contrast)] px-2.5 py-0.5 font-ui text-[8.5px] font-semibold uppercase tracking-[0.14em] shadow-sm">
                        {pkg.code}
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 rounded-full bg-black/50 backdrop-blur-md text-white px-2.5 py-0.5 font-ui text-[8px] font-semibold uppercase tracking-[0.12em]">
                        {pkg.protein}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-ui text-[8.5px] uppercase tracking-[0.16em] text-accent font-bold block">
                        {pkg.calories}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>

                    <h3 className="mt-1 font-heading text-[18px] text-ink font-semibold leading-snug">
                      {pkg.name}
                    </h3>
                    <p className="mt-1.5 font-body text-[11.5px] text-muted line-clamp-2 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Micro Highlights Pill */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {pkg.highlights.slice(0, 2).map((h) => (
                        <span key={h} className="rounded-md bg-canvas border border-line px-2 py-0.5 text-[9px] font-ui text-ink font-medium">
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line flex items-baseline justify-between">
                    <div>
                      <span className="font-ui text-[8.5px] uppercase tracking-[0.14em] text-muted block">
                        Harga Mulai
                      </span>
                      <span className="font-heading text-[20px] font-semibold text-ink">
                        {formatIDR(pkg.pricePerPax)}
                      </span>
                      <span className="font-ui text-[10px] text-muted"> / pax</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPkgIndex(idx);
                        document.getElementById("estimator")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={cn(
                        "rounded-full px-4 py-2 font-ui text-[9.5px] font-semibold uppercase tracking-[0.14em] transition-all",
                        isSelected
                          ? "bg-accent text-[var(--accent-contrast)] shadow-md"
                          : "border border-line bg-surface text-ink hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
                      )}
                    >
                      Pilih
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CALORIE & MEAL ESTIMATOR */}
      {visibility.showCustomizer && (
      <section id="estimator" className="border-b border-line px-6 py-16 sm:px-10 sm:py-24 bg-canvas">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Controls Column */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E9E3F0] p-6 sm:p-10 shadow-sm">
              <span className="font-ui text-[9px] uppercase tracking-[0.3em] text-[#451176] font-bold">
                Kalkulator Pemesanan &amp; Gizi
              </span>
              <h2 className="mt-2 font-heading text-[clamp(2rem,3.8vw,3.2rem)] leading-tight text-[#1F1626]">
                Hitung Porsi &amp; Anggaran Acara
              </h2>

              {/* Step 1: Package Active */}
              <div className="mt-8">
                <label className="block font-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-[#1F1626] mb-3">
                  1. Paket Aktif Terpilih
                </label>
                <div className="p-4 rounded-2xl border border-[#451176] bg-[#FAF9FC] flex items-center justify-between">
                  <div>
                    <span className="font-ui text-[8.5px] uppercase tracking-[0.16em] text-[#451176] font-bold">
                      {currentPkg.code} · {currentPkg.calories}
                    </span>
                    <div className="font-heading text-[18px] text-[#1F1626] font-semibold mt-0.5">
                      {currentPkg.name}
                    </div>
                  </div>
                  <span className="font-heading text-[20px] font-semibold text-[#451176]">
                    {formatIDR(currentPkg.pricePerPax)} <span className="font-ui text-[10px] text-[#6B5E75]">/ pax</span>
                  </span>
                </div>
              </div>

              {/* Step 2: Duration / Frequency */}
              <div className="mt-8">
                <label className="block font-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-[#1F1626] mb-3">
                  2. Pilih Durasi / Frekuensi
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedDuration("1day")}
                    className={cn(
                      "p-3 rounded-2xl border text-center transition-all",
                      selectedDuration === "1day"
                        ? "border-[#451176] bg-[#FAF9FC] ring-1 ring-[#451176]"
                        : "border-[#E9E3F0] hover:border-[#451176]/40"
                    )}
                  >
                    <div className="font-ui text-[12px] font-bold text-[#1F1626]">1 Hari Event</div>
                    <div className="font-body text-[10px] text-[#6B5E75] mt-0.5">Bento / Rapat</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDuration("5day")}
                    className={cn(
                      "p-3 rounded-2xl border text-center transition-all",
                      selectedDuration === "5day"
                        ? "border-[#451176] bg-[#FAF9FC] ring-1 ring-[#451176]"
                        : "border-[#E9E3F0] hover:border-[#451176]/40"
                    )}
                  >
                    <div className="font-ui text-[12px] font-bold text-[#1F1626]">5 Hari (Senin-Jum)</div>
                    <div className="font-body text-[10px] text-emerald-600 font-semibold mt-0.5">Diskon 5%</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDuration("20day")}
                    className={cn(
                      "p-3 rounded-2xl border text-center transition-all",
                      selectedDuration === "20day"
                        ? "border-[#451176] bg-[#FAF9FC] ring-1 ring-[#451176]"
                        : "border-[#E9E3F0] hover:border-[#451176]/40"
                    )}
                  >
                    <div className="font-ui text-[12px] font-bold text-[#1F1626]">20 Hari (Bulanan)</div>
                    <div className="font-body text-[10px] text-emerald-600 font-semibold mt-0.5">Diskon 10%</div>
                  </button>
                </div>
              </div>

              {/* Step 3: Pax Counter */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-[#1F1626]">
                    3. Jumlah Porsi (Pax)
                  </label>
                  <span className="font-heading text-[22px] font-semibold text-[#451176]">
                    {paxCount} Pax
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={paxCount}
                  onChange={(e) => setPaxCount(Number(e.target.value))}
                  className="w-full accent-[#451176] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-ui text-[#6B5E75] mt-1">
                  <span>5 Pax (Min)</span>
                  <span>25 Pax</span>
                  <span>50 Pax</span>
                  <span>100+ Pax</span>
                </div>
              </div>

              {/* Nutrition Facts Pill */}
              <div className="mt-8 p-4 rounded-2xl bg-[#FAF9FC] border border-[#E9E3F0] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div>
                  <div className="font-ui text-[8px] uppercase tracking-[0.16em] text-[#6B5E75]">Kalori / Box</div>
                  <div className="font-heading text-[16px] font-semibold text-[#1F1626] mt-0.5">±420 Kcal</div>
                </div>
                <div>
                  <div className="font-ui text-[8px] uppercase tracking-[0.16em] text-[#6B5E75]">Protein Bersih</div>
                  <div className="font-heading text-[16px] font-semibold text-[#451176] mt-0.5">35g</div>
                </div>
                <div>
                  <div className="font-ui text-[8px] uppercase tracking-[0.16em] text-[#6B5E75]">Karbo Kompleks</div>
                  <div className="font-heading text-[16px] font-semibold text-[#1F1626] mt-0.5">45g</div>
                </div>
                <div>
                  <div className="font-ui text-[8px] uppercase tracking-[0.16em] text-[#6B5E75]">Sodium (Garam)</div>
                  <div className="font-heading text-[16px] font-semibold text-emerald-600 mt-0.5">Rendah</div>
                </div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E9E3F0] p-6 sm:p-8 shadow-sm sticky top-[120px]">
              <span className="font-ui text-[8.5px] uppercase tracking-[0.24em] text-[#451176] font-bold block">
                Ringkasan Estimasi
              </span>

              <div className="mt-4 pb-4 border-b border-[#E9E3F0]">
                <div className="font-heading text-[20px] text-[#1F1626] font-semibold">
                  {currentPkg.name}
                </div>
                <div className="font-body text-[12px] text-[#6B5E75] mt-0.5">
                  {paxCount} porsi · {selectedDuration === "1day" ? "1 Hari Acara" : selectedDuration === "5day" ? "5 Hari Program" : "20 Hari Program"}
                </div>
              </div>

              <div className="mt-4 space-y-2.5 text-[12px] font-ui border-b border-[#E9E3F0] pb-4">
                <div className="flex justify-between text-[#6B5E75]">
                  <span>Harga per Pax:</span>
                  <span className="font-semibold text-[#1F1626]">{formatIDR(currentPkg.pricePerPax)}</span>
                </div>
                <div className="flex justify-between text-[#6B5E75]">
                  <span>Total Porsi Box:</span>
                  <span className="font-semibold text-[#1F1626]">{paxCount * durationMultiplier} Box</span>
                </div>
                {selectedDuration !== "1day" && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Diskon Program:</span>
                    <span>{selectedDuration === "20day" ? "10% OFF" : "5% OFF"}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6B5E75]">
                  <span>Konsultasi Ahli Gizi:</span>
                  <span className="font-semibold text-emerald-600">Gratis (Rp0)</span>
                </div>
              </div>

              <div className="mt-5 flex items-baseline justify-between">
                <span className="font-ui text-[11px] uppercase tracking-[0.16em] text-[#6B5E75]">
                  Estimasi Total
                </span>
                <span className="font-heading text-[26px] font-semibold text-[#451176]">
                  {formatIDR(estimatedSubtotal)}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={consultationHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-full bg-accent py-3.5 font-ui text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-contrast)] hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2 text-center"
                >
                  <span>Konsultasi &amp; Order via WhatsApp</span>
                  <span>↗</span>
                </a>
                <button
                  type="button"
                  onClick={handleAddCustomBanquet}
                  className="w-full rounded-full border border-line py-3 font-ui text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink hover:border-[var(--accent)] transition-colors text-center"
                >
                  Tambahkan ke Keranjang Web
                </button>
              </div>

              <p className="mt-3 text-center font-body text-[10.5px] text-muted">
                {footer.address} · Bisa terbitkan faktur pajak korporat
              </p>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 5. INTERACTIVE FEATURE: ANATOMI 5 SEKAT (SETIAP DETAIL ADA ALASANNYA) */}
      <section id="anatomy" className="border-b border-[#E9E3F0] px-6 py-16 sm:px-10 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E9E3F0] pb-6">
            <div>
              <span className="font-ui text-[9px] uppercase tracking-[0.3em] text-[#451176] font-bold">
                Standar Kualitas Bento
              </span>
              <h2 className="mt-2 font-heading text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.02] text-[#1F1626]">
                Setiap Detail Ada Alasannya.
              </h2>
            </div>
            <p className="max-w-[420px] font-body text-[13px] leading-[1.8] text-[#6B5E75]">
              Dari pemilihan bahan hingga cara pengolahan, semuanya kami pikirkan untuk kebaikan dan kebugaran tubuh Anda.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Tabs */}
            <div className="lg:col-span-5 space-y-3">
              {COMPARTMENT_DETAILS.map((c, idx) => {
                const isActive = activeCompartment === idx;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCompartment(idx)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl border transition-all duration-300",
                      isActive
                        ? "border-[#451176] bg-[#FAF9FC] shadow-sm ring-1 ring-[#451176]"
                        : "border-[#E9E3F0] bg-white hover:border-[#451176]/30"
                    )}
                  >
                    <div className="flex items-center justify-between text-[8.5px] font-ui uppercase tracking-[0.2em] text-[#6B5E75]">
                      <span>Kompartemen {c.number}</span>
                      <span className="text-[#451176] font-bold">Glow House Standard</span>
                    </div>
                    <div className="mt-1 font-heading text-[17px] text-[#1F1626] font-semibold">
                      {c.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Compartment Explainer Box */}
            <div className="lg:col-span-7 bg-[#FAF9FC] rounded-3xl border border-[#E9E3F0] p-6 sm:p-10 relative overflow-hidden">
              <span className="text-[120px] sm:text-[160px] font-heading text-[#E9E3F0]/40 absolute -top-10 -right-4 pointer-events-none select-none font-bold">
                {COMPARTMENT_DETAILS[activeCompartment].number}
              </span>

              {/* Interactive Visual Bento Box Plate */}
              <div className="relative z-10 mb-6 rounded-2xl border-2 border-dashed border-[#E9E3F0] bg-white p-3.5 sm:p-4 shadow-xs">
                <div className="text-[8.5px] font-ui uppercase tracking-[0.2em] text-[#6B5E75] mb-2.5 font-bold flex items-center justify-between">
                  <span>Layout Bento 5 Sekat Terukur</span>
                  <span className="text-[#451176] font-semibold">Klik sekat untuk cek nutrisi</span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {/* Sekat 1: Protein */}
                  <div
                    onClick={() => setActiveCompartment(0)}
                    className={cn(
                      "col-span-3 rounded-xl border p-2.5 cursor-pointer transition-all flex flex-col justify-between",
                      activeCompartment === 0
                        ? "border-[#451176] bg-[#451176]/10 shadow-sm ring-1 ring-[#451176]"
                        : "border-[#E9E3F0] bg-[#FAF9FC] hover:border-[#451176]/40"
                    )}
                  >
                    <span className="text-[7.5px] font-ui uppercase font-bold text-[#451176]">Sekat 01 · Protein</span>
                    <span className="text-[11px] font-bold text-[#1F1626] line-clamp-1">Salmon / Ayam Probiotik</span>
                  </div>

                  {/* Sekat 2: Karbo */}
                  <div
                    onClick={() => setActiveCompartment(1)}
                    className={cn(
                      "col-span-3 rounded-xl border p-2.5 cursor-pointer transition-all flex flex-col justify-between",
                      activeCompartment === 1
                        ? "border-[#451176] bg-[#451176]/10 shadow-sm ring-1 ring-[#451176]"
                        : "border-[#E9E3F0] bg-[#FAF9FC] hover:border-[#451176]/40"
                    )}
                  >
                    <span className="text-[7.5px] font-ui uppercase font-bold text-[#451176]">Sekat 02 · Karbo</span>
                    <span className="text-[11px] font-bold text-[#1F1626] line-clamp-1">Beras Merah / Quinoa</span>
                  </div>

                  {/* Sekat 3: Sayuran */}
                  <div
                    onClick={() => setActiveCompartment(2)}
                    className={cn(
                      "col-span-2 rounded-xl border p-2 cursor-pointer transition-all flex flex-col justify-between",
                      activeCompartment === 2
                        ? "border-[#451176] bg-[#451176]/10 shadow-sm ring-1 ring-[#451176]"
                        : "border-[#E9E3F0] bg-[#FAF9FC] hover:border-[#451176]/40"
                    )}
                  >
                    <span className="text-[7.5px] font-ui uppercase font-bold text-[#451176]">Sekat 03</span>
                    <span className="text-[10px] font-bold text-[#1F1626] line-clamp-1">Sayuran Kukus</span>
                  </div>

                  {/* Sekat 4: Buah */}
                  <div
                    onClick={() => setActiveCompartment(3)}
                    className={cn(
                      "col-span-2 rounded-xl border p-2 cursor-pointer transition-all flex flex-col justify-between",
                      activeCompartment === 3
                        ? "border-[#451176] bg-[#451176]/10 shadow-sm ring-1 ring-[#451176]"
                        : "border-[#E9E3F0] bg-[#FAF9FC] hover:border-[#451176]/40"
                    )}
                  >
                    <span className="text-[7.5px] font-ui uppercase font-bold text-[#451176]">Sekat 04</span>
                    <span className="text-[10px] font-bold text-[#1F1626] line-clamp-1">Buah Segar</span>
                  </div>

                  {/* Sekat 5: Saus */}
                  <div
                    onClick={() => setActiveCompartment(4)}
                    className={cn(
                      "col-span-2 rounded-xl border p-2 cursor-pointer transition-all flex flex-col justify-between",
                      activeCompartment === 4
                        ? "border-[#451176] bg-[#451176]/10 shadow-sm ring-1 ring-[#451176]"
                        : "border-[#E9E3F0] bg-[#FAF9FC] hover:border-[#451176]/40"
                    )}
                  >
                    <span className="text-[7.5px] font-ui uppercase font-bold text-[#451176]">Sekat 05</span>
                    <span className="text-[10px] font-bold text-[#1F1626] line-clamp-1">Saus Sehat</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <span className="inline-block rounded-full bg-[#451176] text-white px-3.5 py-1 font-ui text-[8.5px] uppercase tracking-[0.16em] font-bold">
                  Kompartemen {COMPARTMENT_DETAILS[activeCompartment].number} · Standar Nutrisi
                </span>

                <h3 className="mt-4 font-heading text-[26px] sm:text-[34px] text-[#1F1626] leading-tight">
                  {COMPARTMENT_DETAILS[activeCompartment].title}
                </h3>

                <p className="mt-3 font-body text-[14.5px] leading-[1.85] text-[#6B5E75]">
                  {COMPARTMENT_DETAILS[activeCompartment].desc}
                </p>

                <div className="mt-6 border-t border-[#E9E3F0] pt-5 flex items-center justify-between">
                  <div>
                    <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-[#6B5E75] block">
                      Manfaat Utama Tubuh
                    </span>
                    <span className="mt-1 block font-heading italic text-[15px] text-[#451176]">
                      “{COMPARTMENT_DETAILS[activeCompartment].benefit}”
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-[#6B5E75] block">
                      Metode
                    </span>
                    <span className="mt-1 block font-ui text-[12px] font-bold text-emerald-600">
                      Clean Cooking
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BRAND STORY & NUTRITIONIST CONSULTATION CALLOUT */}
      {visibility.showStory && (
        <section id="story" className="border-b border-line px-6 py-16 sm:px-10 sm:py-24 bg-canvas">
          <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-line">
                  <Image
                    src={story.images[0]?.src || "/images/catering/hero.jpg"}
                    alt={story.images[0]?.alt || `${brand} healthy meal`}
                    fill
                    unoptimized={(story.images[0]?.src || "").startsWith("data:") || (story.images[0]?.src || "").startsWith("http")}
                    sizes="350px"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-line translate-y-6">
                  <Image
                    src={story.images[1]?.src || "/images/catering/nutritionist.jpg"}
                    alt={story.images[1]?.alt || `Tim ${brand}`}
                    fill
                    unoptimized={(story.images[1]?.src || "").startsWith("data:") || (story.images[1]?.src || "").startsWith("http")}
                    sizes="350px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:pl-6">
              <span className="font-ui text-[9px] uppercase tracking-[0.3em] text-accent font-bold">
                {story.kicker}
              </span>
              <h2 className="mt-3 font-heading text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.04] text-ink">
                {story.title}
              </h2>
              <div className="mt-6 space-y-4 font-body text-[13.5px] leading-[1.85] text-muted">
                {story.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              {story.quote && (
                <blockquote className="mt-5 border-l-2 border-[var(--accent)] pl-4 font-heading italic text-[15px] text-ink/90">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
              )}

              <div className="mt-8 border-t border-line pt-6 flex items-center justify-between">
                <div>
                  <div className="font-heading italic text-[16px] text-ink">
                    {story.quoteAttribution || `${brand} Team`}
                  </div>
                  <div className="font-ui text-[8.5px] uppercase tracking-[0.18em] text-muted">
                    {brandSuffix}
                  </div>
                </div>
                {activeNiche.logo && !cms?.useTextLogo ? (
                  <Image
                    src={activeNiche.logo}
                    alt={brand}
                    width={120}
                    height={45}
                    className="h-8 w-auto object-contain opacity-85"
                  />
                ) : (
                  <span className="font-grotesk text-[13px] font-bold uppercase tracking-[0.16em] text-ink/75">{brand}</span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. AUTHENTIC SOCIAL PROOF & CLINICAL RESULTS */}
      {visibility.showReviews && (
        <section id="reviews" className="border-t border-line bg-surface px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-[1440px]">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md bg-canvas border border-line px-3.5 py-1 font-ui text-[9px] uppercase tracking-[0.24em] font-bold text-accent">
                  <span>⭐ 4.95 / 5.0</span>
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  <span>35.000+ Meal Box Berstandar Gizi</span>
                </div>
                <h2 className="mt-3 font-heading text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.04] text-ink">
                  Hasil Nyata &amp; Transformasi Sehat <br />
                  <span className="italic font-serif text-accent">Klien Setia {brand}.</span>
                </h2>
              </div>

              {/* Quick Proof Pills */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-heading text-[24px] font-bold text-accent">98.4%</div>
                  <div className="font-ui text-[8.5px] uppercase tracking-[0.16em] text-muted">
                    Target BB Tercapai
                  </div>
                </div>
                <div className="h-8 w-px bg-[var(--border)]" />
                <div className="text-right">
                  <div className="font-heading text-[24px] font-bold text-emerald-600">100%</div>
                  <div className="font-ui text-[8.5px] uppercase tracking-[0.16em] text-muted">
                    Supervisi Dietitian
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { id: "all", label: `Semua Hasil (${reviews.length})` },
                { id: "slim", label: "🥗 Weight Loss (Slim)" },
                { id: "diabetes", label: "🩸 Diabetes & Heart Care" },
                { id: "corporate", label: "🍱 Corporate & Executive" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCateringFilter(tab.id)}
                  className={cn(
                    "rounded-full px-4 py-1.5 font-ui text-[11px] font-medium transition-all",
                    activeCateringFilter === tab.id
                      ? "bg-accent text-[var(--accent-contrast)] shadow-xs font-semibold"
                      : "bg-canvas border border-line text-muted hover:text-ink hover:border-[var(--accent)]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Review Cards Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {reviews.filter(
                (r) => activeCateringFilter === "all" || r.category === activeCateringFilter
              ).map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-2xl border border-line bg-canvas p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[var(--accent)]/50"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-500 text-xs tracking-wider">
                        {"★".repeat(rev.stars)}
                      </div>
                      <span className="font-ui text-[8px] text-muted uppercase tracking-wider">
                        {rev.date}
                      </span>
                    </div>

                    <p className="mt-3 font-body text-[12.5px] leading-relaxed text-ink/90 italic">
                      &ldquo;{rev.review}&rdquo;
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-line">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-line font-ui text-[10px] font-bold text-accent">
                        {rev.avatar}
                      </div>
                      <div>
                        <div className="font-ui text-[11px] font-bold text-ink">
                          {rev.name}
                        </div>
                        <div className="font-ui text-[9px] text-muted">
                          {rev.location}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 font-ui text-[8.5px] text-accent font-semibold bg-surface px-2.5 py-1 rounded-md border border-line inline-block shadow-2xs">
                      {rev.tag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. FAQ ACCORDION */}
      {visibility.showFaq && <FaqAccordion />}

      {/* 9. SITE FOOTER */}
      <SiteFooter />
    </div>
  );
}
