import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRightIcon,
  CheckIcon,
  ClockIcon,
  MessageCircleIcon,
  PercentIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  SparklesIcon,
  StoreIcon,
  TrendingUpIcon,
  XIcon,
} from "@/components/komose/KomoseIcons";
import { WHATSAPP_NUMBER } from "@/config/niches";
import { KomoseLogo } from "@/components/komose/KomoseLogo";
import { KomoseNavbar } from "@/components/komose/KomoseNavbar";
import {
  KomoseClientAndTemplatesShowcase,
  KomoseFaqAccordion,
} from "@/components/komose/KomoseShowcase";

export const metadata: Metadata = {
  title: "Komose — Stop Boncos Komisi Aplikasi. Bikin Toko Online Sendiri 0% Potongan",
  description:
    "Toko online brand Anda sendiri yang bikin pembeli langsung transfer ke WhatsApp. 0% komisi selamanya, katalog interaktif bebas PHP, hitung ongkir otomatis, dan CMS kelola toko dari HP.",
  icons: {
    icon: [
      { url: "/favicon-komose.png", type: "image/png" },
      { url: "/favicon-komose.svg", type: "image/svg+xml" },
      { url: "/images/komose/komose-app-icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/komose/komose-app-icon.png" },
    ],
  },
};

const BATTLE_COMPARISON = [
  {
    channel: "Marketplace & Ojol (Shopee / GoFood)",
    badge: "Potongan Bikin Nyesek",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
    isWinner: false,
    points: [
      { text: "Komisi 15% – 30% per transaksi: Jualan capek, untung bersih habis dimakan aplikasi.", bad: true },
      { text: "Perang harga sadis: Bawah foto produk Anda langsung dijejali toko sebelah yang lebih murah.", bad: true },
      { text: "Database pembeli ditahan: Anda dilarang tau nomor WhatsApp pelanggan untuk repeat order.", bad: true },
      { text: "Uang mengendap berhari-hari: Penghasilan ditahan sistem, tidak langsung cair ke rekening.", bad: true },
    ],
  },
  {
    channel: "Link Bio Gratisan / Form Sensus",
    badge: "Bikin Ilfil Pembeli",
    badgeColor: "bg-stone-100 text-stone-700 border-stone-200",
    isWinner: false,
    points: [
      { text: "Tampilan mirip formulir kuesioner: Bikin pembeli malas isi form panjang yang kaku.", bad: true },
      { text: "Ragu transfer ratusan ribu: Toko tidak terlihat bonafide untuk pesanan hampers & kue spesial.", bad: true },
      { text: "Admin tetap repot manual: Masih harus cek ongkir kecamatan dan ketik totalan satu per satu.", bad: true },
      { text: "70% pembeli ghosting: Loading berat di HP bikin calon pembeli kabur sebelum klik order.", bad: true },
    ],
  },
  {
    channel: "Toko Online Komose",
    badge: "S3 Marketing: 100% Margin Anda",
    badgeColor: "bg-[#FF681F] text-white border-transparent",
    isWinner: true,
    points: [
      { text: "0% Potongan Komisi Selamanya: Omzet Rp 10 juta, yang masuk rekening tetap utuh Rp 10 juta.", bad: false },
      { text: "Tampil Mewah Khas Brand Anda: Kelihatan bonafide di bio IG & TikTok, pembeli auto-percaya.", bad: false },
      { text: "Katalog Pintar + Auto-Ongkir WA: Pembeli pilih varian & hitung ongkir sendiri, format order siap bayar.", bad: false },
      { text: "CMS Toko Pribadi dari HP: Ganti harga, stok, & promo musiman dalam 30 detik tanpa ketergantungan.", bad: false },
    ],
  },
];

const MERCHANT_FEATURES = [
  {
    icon: StoreIcon,
    title: "Katalog Visual Anti Tanya-Tanya",
    desc: "Pembeli langsung pilih diameter kue, pilihan lauk, atau warna pita bunga sendiri. Gak ada lagi drama chat 'Kak masih ada rasa apa aja?'",
    tag: "Admin Hemat Waktu",
  },
  {
    icon: ClockIcon,
    title: "Kalkulator Ongkir Kecamatan",
    desc: "Ongkir terhitung otomatis begitu pembeli pilih lokasi. Mencegah pembeli kaget ongkir di akhir chat yang berujung di-ghosting.",
    tag: "Anti PHP Pembeli",
  },
  {
    icon: MessageCircleIcon,
    title: "1 Detik WhatsApp Checkout",
    desc: "Format order masuk ke WhatsApp admin sudah rapi: nama, produk, varian, alamat kirim, & total bayar. Admin tinggal balas nomor rekening.",
    tag: "Langsung Siap Bayar",
  },
  {
    icon: SmartphoneIcon,
    title: "CMS Kelola Toko dari HP",
    desc: "Mau naikin harga 5 ribu? Ada menu musiman Ramadhan? Matikan menu yang sold out? Cukup buka browser HP sambil rebahan 30 detik beres.",
    tag: "Tanpa Bayar Jasa IT",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Kirim Foto Menu & Daftar Harga via WA",
    desc: "Cukup kirim foto produk dari galeri HP dan list harga ke WhatsApp kami. Gak usah pusing bikin dokumen teknis atau proposal rumit.",
  },
  {
    step: "02",
    title: "Tim Komose Sulap Jadi Toko Berkelas",
    desc: "Kami rakitkan tampilan katalog yang estetik, pasang kalkulator ongkir wilayah Anda, dan sambungkan tombol checkout langsung ke WhatsApp admin.",
  },
  {
    step: "03",
    title: "Pasang di Bio Medsos & Siap Panen!",
    desc: "Tinggal tempel link toko di bio Instagram, TikTok, dan Google Maps. Toko Anda resmi buka 24 jam nonstop siap terima orderan masuk.",
  },
];

export default function KomoseLandingPage() {
  const waHeroUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Halo Komose! Saya tertarik konsultasi pembuatan website toko online untuk usaha saya."
  )}`;
  const waBasicUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Halo Komose! Saya tertarik dengan Paket Terima Beres (Website Toko Siap Jualan)."
  )}`;
  const waProUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Halo Komose! Saya tertarik dengan Paket Bisnis Mandiri (+ Dashboard CMS Kelola Toko)."
  )}`;

  return (
    <div id="top" className="min-h-screen bg-[#FFFEFF] text-[#1B4328] selection:bg-[#FF681F] selection:text-[#FFFEFF] font-jakarta">
      {/* ── Komose Floating Navbar ── */}
      <KomoseNavbar />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: COMMERCIAL MERCHANT STOREFRONT BUILDER                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F8F5] via-[#FFFEFF] to-[#FFFEFF] pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-[#1B4328]/10">
        {/* Subtle decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[-10%] h-[460px] w-[460px] rounded-full bg-[#FF681F]/[0.08] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-40 -left-24 h-[400px] w-[400px] rounded-full bg-[#1B4328]/[0.06] blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left: Commercial Copy */}
            <div className="lg:col-span-7">
              {/* Product Badge with Komodo Dragon mark */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1B4328]/15 bg-[#1B4328]/[0.05] px-4 py-1.5 text-xs font-bold text-[#1B4328] font-jakarta">
                <KomoseLogo markOnly height={16} />
                <span>Solusi Anti Boncos Komisi &amp; Anti Chat PHP</span>
              </div>

              <h1 className="mt-5 font-grotesk text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-[#1B4328] leading-[1.1]">
                Bikin Toko Online Brand Anda Sendiri.{" "}
                <span className="text-[#FF681F]">0% Komisi</span>, Pesanan Siap Bayar Langsung Masuk WhatsApp.
              </h1>

              <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#1B4328]/80 font-outfit">
                Khusus toko roti, hampers, florist, katering, dan bisnis jasa. Pembeli bisa pilih rasa, hitung ongkir otomatis, dan langsung kirim format order rapi ke WhatsApp Anda — tanpa drama admin bolak-balik balas &ldquo;Kak masih ada?&rdquo;. 100% laba masuk rekening Anda.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5">
                <a
                  href={waHeroUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#FF681F] px-7 py-4 text-sm font-bold text-[#FFFEFF] shadow-[0_14px_30px_rgba(255,104,31,0.3)] hover:bg-[#1B4328] hover:shadow-[#1B4328]/25 transition-all font-jakarta"
                >
                  <MessageCircleIcon className="w-4 h-4" />
                  Konsultasi Toko Anda via WA (Gratis)
                  <ArrowUpRightIcon className="w-4 h-4" />
                </a>

                <a
                  href="#klien-demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#1B4328]/20 bg-[#FFFEFF] px-6 py-3.5 text-sm font-bold text-[#1B4328] hover:border-[#FF681F] hover:text-[#FF681F] transition-colors font-jakarta"
                >
                  <span>Coba Live Demo Toko</span>
                  <span>↓</span>
                </a>
              </div>

              {/* Trust Niche Bar */}
              <div className="mt-10 pt-6 border-t border-[#1B4328]/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#1B4328]/75 font-jakarta">
                <span className="flex items-center gap-1.5">
                  <span className="text-base">🎂</span> Toko Roti &amp; Kue (Anti Salah Ukuran)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-base">💐</span> Florist &amp; Hampers (Pilihan Pita &amp; Kartu)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-base">🍱</span> Katering &amp; F&amp;B (Hitung Porsi Otomatis)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-base">🏥</span> Klinik &amp; Jasa Medis (Booking Tanpa Antre)
                </span>
              </div>
            </div>

            {/* Right: Live Interactive Store Simulator Card */}
            <div className="lg:col-span-5">
              <div className="rounded-[2.25rem] border-2 border-[#1B4328] bg-[#1B4328] p-5 sm:p-6 text-[#FFFEFF] shadow-[0_28px_60px_rgba(27,67,40,0.22)] relative overflow-hidden">
                {/* Store Top Bar */}
                <div className="flex items-center justify-between border-b border-[#FFFEFF]/15 pb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs font-bold text-[#FFFEFF]">
                      rotimomoh.komose.id
                    </span>
                  </div>
                  <span className="rounded-full bg-[#FF681F] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    0% KOMISI SELAMANYA
                  </span>
                </div>

                {/* Simulated Store Product Card */}
                <div className="mt-4 rounded-2xl bg-[#FFFEFF] p-4 text-[#1B4328]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block rounded-md bg-[#FF681F]/10 px-2 py-0.5 text-[10px] font-bold text-[#FF681F] uppercase tracking-wider">
                        Best Seller • Stok Fresh Hari Ini
                      </span>
                      <h3 className="mt-1 font-grotesk text-base font-extrabold text-[#1B4328]">
                        Belgian Dark Choco Cake
                      </h3>
                      <p className="text-xs text-[#1B4328]/70 font-outfit">
                        Pembeli klik varian &amp; kecamatan sendiri. Bebas bolak-balik tanya admin.
                      </p>
                    </div>
                    <span className="font-grotesk text-base font-extrabold text-[#FF681F] shrink-0">
                      Rp 220.000
                    </span>
                  </div>

                  {/* Interactive Selector Pill */}
                  <div className="mt-3.5 pt-3 border-t border-[#1B4328]/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#1B4328]/70">Pilihan Varian:</span>
                      <span className="font-bold text-[#1B4328]">Diameter 20 cm (8–10 Porsi)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#1B4328]/70">Ongkir Otomatis:</span>
                      <span className="font-bold text-emerald-700">Cilandak, Jaksel (Rp 25.000)</span>
                    </div>
                  </div>
                </div>

                {/* Simulated WhatsApp Order Bubble */}
                <div className="mt-3.5 rounded-2xl border border-[#FF681F]/40 bg-[#FF681F] p-4 text-[#FFFEFF] shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircleIcon className="w-5 h-5 text-white" />
                      <span className="text-xs font-bold font-jakarta">1 Detik Format Order WhatsApp</span>
                    </div>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-mono">Siap Bayar</span>
                  </div>
                  <p className="mt-2.5 rounded-xl bg-[#1B4328]/35 p-3 text-[11px] leading-relaxed font-outfit text-white">
                    &ldquo;Halo Roti Momoh! Saya mau pesan:
                    <br />• 1x Belgian Dark Choco Cake 20cm
                    <br />• Alamat: Cilandak, Jaksel (Ongkir Rp 25.000)
                    <br /><strong>Total: Rp 245.000</strong>. Mohon kirim nomor rekeningnya ya!&rdquo;
                  </p>
                </div>

                {/* Bottom Merchant Benefit */}
                <div className="mt-4 flex items-center justify-between text-xs text-[#FFFEFF]/80 pt-1 font-outfit">
                  <span className="flex items-center gap-1.5">
                    <CheckIcon className="w-4 h-4 text-[#FF681F]" />
                    Admin hemat 15 menit per pesanan
                  </span>
                  <span className="font-mono text-[11px] text-[#FF681F] font-bold">100% Laba Milik Anda</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BATTLE MATRIX: KOMOSE VS MARKETPLACE VS LINK-IN-BIO GRATIS             */}
      {/* ========================================================================= */}
      <section id="masalah-solusi" className="bg-[#1B4328] py-20 sm:py-28 text-[#FFFEFF]">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FFFEFF]/20 bg-[#FFFEFF]/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FF681F] font-jakarta">
              Perbandingan Jujur Tempat Jualan
            </span>
            <h2 className="mt-4 font-grotesk text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Stop Jadi Sapi Perah Komisi Aplikasi. Hitung Sendiri Bedanya:
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#FFFEFF]/80 font-outfit leading-relaxed">
              Jualan laris manis tapi margin bersih habis dipotong 20%, atau link bio gratisan yang bikin pembeli ghosting? Lihat kenapa toko online sendiri di Komose jadi pilihan paling masuk akal:
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 items-stretch">
            {BATTLE_COMPARISON.map((col) => (
              <div
                key={col.channel}
                className={`rounded-[2rem] p-6 sm:p-7 flex flex-col justify-between transition-all ${
                  col.isWinner
                    ? "border-2 border-[#FF681F] bg-[#FFFEFF] text-[#1B4328] shadow-[0_24px_60px_rgba(255,104,31,0.25)] relative sm:-translate-y-2"
                    : "border border-[#FFFEFF]/15 bg-[#FFFEFF]/[0.05] text-[#FFFEFF]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b pb-4 border-current/15">
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider border ${col.badgeColor}`}>
                      {col.badge}
                    </span>
                    {col.isWinner && (
                      <span className="font-bold text-xs text-[#FF681F] font-jakarta">Rekomendasi Mutlak ⭐</span>
                    )}
                  </div>

                  <h3 className={`mt-5 font-grotesk text-xl font-extrabold ${col.isWinner ? "text-[#1B4328]" : "text-[#FFFEFF]"}`}>
                    {col.channel}
                  </h3>

                  <ul className="mt-6 space-y-3.5 text-xs sm:text-sm font-outfit">
                    {col.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        {pt.bad ? (
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700">
                            <XIcon className="w-3 h-3" />
                          </span>
                        ) : (
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B4328] text-white">
                            <CheckIcon className="w-3 h-3" />
                          </span>
                        )}
                        <span className={pt.bad ? (col.isWinner ? "text-[#1B4328]/70" : "text-[#FFFEFF]/70") : "font-semibold text-[#1B4328]"}>
                          {pt.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-current/15">
                  {col.isWinner ? (
                    <a
                      href={waHeroUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF681F] px-5 py-3.5 text-xs font-bold text-white hover:bg-[#1B4328] transition-colors shadow-sm font-jakarta"
                    >
                      <span>Amankan Toko Komose Anda</span>
                      <ArrowUpRightIcon className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="block text-center text-xs text-[#FFFEFF]/50 font-outfit">
                      Tinggalkan cara lama yang menggerus profit
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SHOWCASE KLIEN RESMI (CLICKCARE) & LIVE DEMO STORE                      */}
      {/* ========================================================================= */}
      <KomoseClientAndTemplatesShowcase />

      {/* ========================================================================= */}
      {/* 4. FITUR UTAMA MERCHANT (BUKAN FITUR IT BIASA)                            */}
      {/* ========================================================================= */}
      <section id="keunggulan" className="bg-[#FFFEFF] py-20 sm:py-28 border-b border-[#1B4328]/10">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FF681F]/25 bg-[#FF681F]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FF681F] font-jakarta">
              Rahasia Toko Ramai &amp; Admin Santai
            </span>
            <h2 className="mt-4 font-grotesk text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1B4328] leading-[1.1]">
              4 Fitur Pencetak Transaksi yang Bikin Pembeli Gak Pake Mikir Buat Transfer.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#1B4328]/75 font-outfit leading-relaxed">
              Gak perlu buang waktu debat ongkir atau jawab pertanyaan berulang. Semua alur dirancang agar pengunjung medsos Anda terpesona dan langsung order.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MERCHANT_FEATURES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-[#1B4328]/15 bg-[#1B4328]/[0.02] p-6 flex flex-col justify-between hover:border-[#FF681F]/40 hover:bg-[#FF681F]/[0.03] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1B4328] text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="rounded-full bg-[#FF681F]/15 px-2.5 py-1 text-[10px] font-bold text-[#FF681F] font-jakarta">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 font-grotesk text-lg font-bold text-[#1B4328]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#1B4328]/75 font-outfit leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 3 LANGKAH MUDAH BUKA TOKO (HOW IT WORKS)                                */}
      {/* ========================================================================= */}
      <section className="bg-[#1B4328] py-20 sm:py-28 text-[#FFFEFF]">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FFFEFF]/20 bg-[#FFFEFF]/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FF681F] font-jakarta">
                Gak Pake Ribet Koding
              </span>
              <h2 className="mt-4 font-grotesk text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
                Anda Fokus Siapkan Produk, Biar Tim Komose yang Bikin Toko Anda Siap Panen.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#FFFEFF]/80 font-outfit leading-relaxed">
                Nggak perlu pusing mikirin server, koding, atau sewa agensi jutaan per bulan. Dalam hitungan hari, link toko cantik Anda sudah siap dipajang di bio Instagram &amp; TikTok.
              </p>
            </div>
          </div>

          {/* 3 Step Cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-[#FFFEFF]/15 bg-[#FFFEFF]/[0.06] p-7 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF681F] font-grotesk text-base font-extrabold text-[#FFFEFF]">
                    {item.step}
                  </span>
                  <h3 className="mt-5 font-grotesk text-xl font-bold text-[#FFFEFF]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#FFFEFF]/75 font-outfit leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PILIHAN PAKET & INVESTASI TRANSPARAN                                   */}
      {/* ========================================================================= */}
      <section
        id="paket"
        className="bg-[#FFFEFF] py-20 sm:py-28 border-b border-[#1B4328]/10"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block rounded-full border border-[#FF681F]/25 bg-[#FF681F]/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FF681F] font-jakarta">
              Investasi Cerdas Anti Boncos
            </span>
            <h2 className="mt-4 font-grotesk text-3xl sm:text-5xl font-extrabold text-[#1B4328]">
              Mau Terima Beres atau Mau Edit Sendiri dari HP? Dua-Duanya Balik Modal Cepat.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#1B4328]/75 font-outfit">
              0% biaya komisi transaksi selamanya. Bandingkan dengan potongan marketplace yang bisa menyedot jutaan rupiah tiap bulan dari omzet Anda.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch">
            {/* Package 1: Terima Beres (Tanpa CMS) */}
            <div className="rounded-[2rem] border border-[#1B4328]/20 bg-[#FFFEFF] p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#1B4328]/10 px-3.5 py-1 text-xs font-bold text-[#1B4328] font-jakarta">
                    Paket 01 • Praktis Sekali Bayar
                  </span>
                  <span className="text-xs font-semibold text-[#1B4328]/60 font-jakarta">
                    Tanpa Dashboard CMS
                  </span>
                </div>

                <h3 className="mt-5 font-grotesk text-2xl sm:text-3xl font-extrabold text-[#1B4328]">
                  Paket Terima Beres (Siap Jualan)
                </h3>
                <p className="mt-2 text-sm text-[#1B4328]/75 font-outfit leading-relaxed">
                  Paling pas untuk Anda yang menunya jarang ganti harga dan mau terima beres langsung punya toko bonafide tanpa harus belajar panel admin.
                </p>

                <ul className="mt-7 space-y-3 border-t border-[#1B4328]/10 pt-6">
                  {[
                    "Toko online visual mewah, responsif super cepat di semua layar HP",
                    "Katalog interaktif lengkap: varian ukuran, warna, & kartu ucapan",
                    "Kalkulator ongkir kecamatan otomatis — pembeli tidak kaget ongkir",
                    "Tombol order otomatis kirim format rincian lengkap ke WhatsApp admin",
                    "Pakai alamat link namatoko.komose.id atau domain .com pribadi Anda",
                  ].map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 text-sm text-[#1B4328]/85 font-outfit"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B4328] text-[#FFFEFF]">
                        <CheckIcon className="w-3 h-3" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1B4328]/10">
                <a
                  href={waBasicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#1B4328] bg-[#FFFEFF] px-6 py-4 text-sm font-bold text-[#1B4328] hover:bg-[#1B4328] hover:text-[#FFFEFF] transition-colors font-jakarta"
                >
                  Konsultasi Paket Terima Beres
                  <ArrowUpRightIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Package 2: Bisnis Mandiri (+ CMS & Maintenance) */}
            <div className="rounded-[2rem] border-2 border-[#FF681F] bg-[#1B4328] p-7 sm:p-9 text-[#FFFEFF] shadow-[0_24px_60px_rgba(27,67,40,0.22)] flex flex-col justify-between relative">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#FF681F] px-3.5 py-1 text-xs font-bold text-[#FFFEFF] font-jakarta">
                    Paling Laris • Kontrol Bebas 24 Jam
                  </span>
                  <span className="text-xs font-semibold text-[#FFFEFF]/75 font-jakarta">
                    + Dashboard CMS HP
                  </span>
                </div>

                <h3 className="mt-5 font-grotesk text-2xl sm:text-3xl font-extrabold text-[#FFFEFF]">
                  Paket Bisnis Mandiri (+ CMS)
                </h3>
                <p className="mt-2 text-sm text-[#FFFEFF]/80 font-outfit leading-relaxed">
                  Paling favorit untuk toko yang sering update promo, ada menu musiman (Ramadhan/Natal), dan mau kendali ganti harga langsung dari HP kapan saja.
                </p>

                <ul className="mt-7 space-y-3 border-t border-[#FFFEFF]/15 pt-6">
                  {[
                    "Semua keunggulan lengkap di Paket Terima Beres",
                    "Dashboard pribadi: [Nama Toko] Management System di HP Anda",
                    "Bebas tambah menu baru, ganti harga, & matikan stok habis dalam 30 detik",
                    "Ganti banner promo musiman, nomor WA admin, jam buka & ongkir sendiri",
                    "Prioritas pendampingan teknis langsung via WhatsApp kapan pun butuh bantuan",
                  ].map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 text-sm text-[#FFFEFF]/90 font-outfit"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF681F] text-[#FFFEFF]">
                        <CheckIcon className="w-3 h-3" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#FFFEFF]/15 flex flex-col sm:flex-row gap-3">
                <a
                  href={waProUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#FF681F] px-6 py-4 text-sm font-bold text-[#FFFEFF] hover:bg-[#FFFEFF] hover:text-[#1B4328] transition-colors font-jakarta"
                >
                  Ambil Paket Bisnis Mandiri
                  <ArrowUpRightIcon className="w-4 h-4" />
                </a>
                <Link
                  href="/cms"
                  className="inline-flex items-center justify-center rounded-full border border-[#FFFEFF]/30 px-5 py-4 text-xs font-bold text-[#FFFEFF] hover:border-[#FF681F] hover:text-[#FF681F] transition-colors font-jakarta"
                >
                  Coba Demo CMS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FAQ KHUSUS PEMILIK TOKO & BISNIS                                       */}
      {/* ========================================================================= */}
      <KomoseFaqAccordion />

      {/* ========================================================================= */}
      {/* 8. CLOSING CTA BANNER                                                     */}
      {/* ========================================================================= */}
      <section className="bg-[#FFFEFF] pb-20 px-5 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-[2.25rem] bg-[#1B4328] px-6 py-14 sm:px-14 sm:py-20 text-center text-[#FFFEFF] relative overflow-hidden shadow-[0_24px_60px_rgba(27,67,40,0.2)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-[#FF681F]/25 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-block rounded-full bg-[#FF681F] px-4 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFFEFF] font-jakarta">
              Konsultasi Gratis Tanpa Paksaan
            </span>
            <h2 className="mt-5 font-grotesk text-3xl sm:text-5xl font-extrabold leading-[1.1]">
              Jangan Biarkan Omzet Terus Menguap Karena Komisi Aplikasi &amp; Chat PHP.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#FFFEFF]/80 font-outfit leading-relaxed">
              Ceritakan jenis usaha Anda sekarang lewat WhatsApp. Tim Komose bantu arahkan desain katalog, nama link toko yang estetik, dan hitungan estimasi balik modalnya.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
              <a
                href={waHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF681F] px-8 py-4 text-sm font-bold text-[#FFFEFF] hover:bg-[#FFFEFF] hover:text-[#1B4328] transition-colors font-jakarta"
              >
                <MessageCircleIcon className="w-4 h-4" />
                Chat WhatsApp Komose Sekarang
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>
              <Link
                href="/templates"
                className="inline-flex items-center justify-center rounded-full border border-[#FFFEFF]/25 px-6 py-4 text-sm font-semibold text-[#FFFEFF] hover:border-[#FF681F] hover:text-[#FF681F] transition-colors font-jakarta"
              >
                Lihat Semua Contoh Demo Toko
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. KOMOSE FOOTER                                                          */}
      {/* ========================================================================= */}
      <footer className="bg-[#1B4328] border-t border-[#FFFEFF]/10 text-[#FFFEFF]">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-sm">
              <KomoseLogo variant="light" />
              <p className="text-xs sm:text-sm text-[#FFFEFF]/75 font-outfit leading-relaxed">
                Platform pembuatan website toko online jualan &amp; sistem kelola toko (CMS) mandiri yang praktis untuk UMKM, ritel kreatif, klinik, dan bisnis jasa Indonesia.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm font-semibold font-jakarta">
              <a href="#masalah-solusi" className="text-[#FFFEFF]/80 hover:text-[#FF681F] transition-colors">
                Solusi Komisi
              </a>
              <a href="#klien-demo" className="text-[#FFFEFF]/80 hover:text-[#FF681F] transition-colors">
                Klien &amp; Demo
              </a>
              <Link href="/templates" className="text-[#FFFEFF]/80 hover:text-[#FF681F] transition-colors">
                Katalog Toko
              </Link>
              <Link href="/cms" className="text-[#FFFEFF]/80 hover:text-[#FF681F] transition-colors">
                Demo CMS
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-1 rounded-full border border-[#FFFEFF]/20 px-3.5 py-1.5 text-xs text-[#FFFEFF] hover:border-[#FF681F] hover:text-[#FF681F] transition-colors"
              >
                Ekosistem Yapping Techflow
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#FFFEFF]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FFFEFF]/60 font-outfit">
            <p>&copy; {new Date().getFullYear()} Komose.id — Platform Klien Komersial di bawah naungan Yapping Techflow.</p>
            <p>WhatsApp Admin: 0811-1001-0324</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
