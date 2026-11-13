"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "./KomoseIcons";
import { NICHES, WHATSAPP_NUMBER } from "@/config/niches";
import type { NicheConfig } from "@/types/landing";
import { getManagementSystemTitle } from "@/lib/cms";

const NICHE_LAYMAN_META: Record<
  NicheConfig["id"],
  {
    title: string;
    domainPreview: string;
    audience: string;
    benefit: string;
  }
> = {
  patisserie: {
    title: "Toko Kue, Roti & Hampers",
    domainPreview: "rotimomoh.komose.id",
    audience: "Bakery Rumahan, Kue Ulang Tahun & Hampers Cantik",
    benefit: "Pembeli bisa pilih diameter cake, tulisan ucapan lilin, & jam kirim sendiri tanpa drama admin salah catat.",
  },
  florist: {
    title: "Toko Bunga & Kado Wisuda",
    domainPreview: "mawarstudio.komose.id",
    audience: "Florist Bunga Segar, Buket Wisuda & Papan Acara",
    benefit: "Pilihan warna bunga, jenis wrapping, & kartu ucapan tertera jelas — pembeli tinggal klik checkout ke WA.",
  },
  catering: {
    title: "Katering Harian & Nasi Box",
    domainPreview: "dapurrasa.komose.id",
    audience: "Katering Nasi Box, Harian Kantor & Prasmanan",
    benefit: "Paket menu per porsi sudah terhitung otomatis — pembeli korporat & hajatan bisa langsung tentukan jumlah box.",
  },
};

export function KomoseClientAndTemplatesShowcase() {
  const [selectedId, setSelectedId] = useState<NicheConfig["id"]>("patisserie");
  const selectedNiche = NICHES.find((item) => item.id === selectedId) ?? NICHES[0];
  const selectedMeta = NICHE_LAYMAN_META[selectedNiche.id];

  return (
    <section
      id="klien-demo"
      className="bg-[#FFFEFF] py-20 sm:py-28 border-b border-[#1B4328]/10"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF681F]/25 bg-[#FF681F]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FF681F] font-jakarta">
            <SparklesIcon className="w-3.5 h-3.5" />
            Bukan Cuma Teori • Bukti Nyata &amp; Demo Live
          </div>
          <h2 className="mt-4 font-grotesk text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1B4328] leading-[1.1]">
            Website yang Bagus Itu Bukan Cuma Indah, Tapi{" "}
            <span className="text-[#FF681F]">Bikin Pembeli Langsung Transfer</span>.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#1B4328]/75 font-outfit leading-relaxed">
            Lihat bagaimana sistem Komose mengubah alur bisnis nyata: dari layanan kesehatan ClickCare yang melayani ribuan pasien, sampai toko kue dan katering lokal yang kebanjiran orderan WhatsApp.
          </p>
        </div>

        {/* Highlighted Contracted Client: ClickCare.id */}
        <div className="mt-10 sm:mt-14 rounded-[2rem] border border-[#1B4328]/15 bg-[#1B4328] p-6 sm:p-10 text-[#FFFEFF] shadow-[0_24px_60px_rgba(27,67,40,0.16)] overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF681F] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#FFFEFF] font-jakarta">
                  <ShieldCheckIcon className="w-3.5 h-3.5" />
                  Studi Kasus Klien Resmi
                </span>
                <span className="inline-flex items-center rounded-full border border-[#FFFEFF]/20 bg-[#FFFEFF]/10 px-3 py-1 text-[11px] font-semibold text-[#FFFEFF]/90 font-jakarta">
                  Kesehatan &amp; Homecare Jasa
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="inline-flex items-center rounded-2xl bg-[#FFFEFF] px-4 py-2.5 shadow-sm">
                  <Image
                    src="/images/logo/clickcare-logo.png"
                    alt="Logo ClickCare.id"
                    width={132}
                    height={32}
                    className="h-7 w-auto object-contain"
                  />
                </div>
              </div>

              <h3 className="font-grotesk text-2xl sm:text-3xl font-bold leading-snug text-[#FFFEFF]">
                ClickCare.id — Pasien Nggak Perlu Tanya &ldquo;Dokter Ini Masih Buka?&rdquo;, Tinggal Klik &amp; Panggil ke Rumah.
              </h3>

              <p className="text-sm sm:text-base text-[#FFFEFF]/80 font-outfit leading-relaxed">
                Keluarga pasien butuh kepastian cepat tanpa chat berbelit-belit. Website ClickCare dibuat super meyakinkan, terpercaya, dan memangkas waktu booking hanya dalam 3 kali klik di HP.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {[
                  "Auto-dipercaya keluarga pasien & instansi",
                  "Booking perawat & dokter 3x lebih cepat",
                  "Loading ngebut di sinyal HP pas-pasan",
                  "Order langsung masuk rapi ke WhatsApp",
                ].map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-2 rounded-2xl border border-[#FFFEFF]/10 bg-[#FFFEFF]/[0.06] px-3.5 py-2.5 text-xs font-medium text-[#FFFEFF]/90 font-jakarta"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FF681F]" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://clickcare.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FFFEFF] px-5 py-3 text-xs sm:text-sm font-bold text-[#1B4328] hover:bg-[#FF681F] hover:text-[#FFFEFF] transition-colors font-jakarta"
                >
                  Kunjungi Website ClickCare.id
                  <ExternalLinkIcon className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Halo Komose! Saya lihat hasil website ClickCare.id dan tertarik bikin website sekelas itu untuk usaha saya."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#FFFEFF]/25 px-5 py-3 text-xs sm:text-sm font-semibold text-[#FFFEFF] hover:border-[#FF681F] hover:bg-[#FF681F]/15 transition-colors font-jakarta"
                >
                  Mau Website Kustom Seperti Ini
                  <ArrowUpRightIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-[#FFFEFF]/15 bg-[#FFFEFF] p-2.5 shadow-2xl">
                <div className="flex items-center gap-1.5 px-3 pb-2 pt-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF681F]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#1B4328]/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#1B4328]/20" />
                  <span className="ml-2 rounded-full bg-[#1B4328]/5 px-3 py-0.5 text-[11px] font-semibold text-[#1B4328]/70 font-jakarta">
                    clickcare.id
                  </span>
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#1B4328]/10 bg-[#1B4328]/5">
                  <Image
                    src="/images/screenshot/home-clickcare.png"
                    alt="Tampilan Website ClickCare.id"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demo Storefront + CMS Preview */}
        <div className="mt-12 sm:mt-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF681F] font-jakarta">
                Demo Interaktif Toko Online &amp; CMS
              </p>
              <h3 className="mt-1.5 font-grotesk text-2xl sm:text-3xl font-extrabold text-[#1B4328]">
                Pilih Bidang Usaha &amp; Buktikan Sendiri Kemudahannya
              </h3>
            </div>
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 self-start rounded-full border border-[#1B4328]/20 bg-[#FFFEFF] px-4 py-2 text-xs font-bold text-[#1B4328] hover:border-[#FF681F] hover:text-[#FF681F] transition-colors font-jakarta"
            >
              Lihat Semua Contoh Toko
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3 Interactive Cards */}
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {NICHES.map((niche) => {
              const meta = NICHE_LAYMAN_META[niche.id];
              const isSelected = selectedId === niche.id;
              return (
                <div
                  key={niche.id}
                  onClick={() => setSelectedId(niche.id)}
                  className={`cursor-pointer rounded-3xl border p-6 transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? "border-[#FF681F] bg-[#FFFEFF] shadow-[0_18px_40px_rgba(255,104,31,0.12)] ring-2 ring-[#FF681F]/25"
                      : "border-[#1B4328]/15 bg-[#FFFEFF] hover:border-[#1B4328]/35"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#1B4328]/10 bg-[#1B4328]/[0.04] p-2">
                        {niche.dock.emojiImage ? (
                          <Image
                            src={niche.dock.emojiImage}
                            alt={meta.title}
                            width={44}
                            height={44}
                            className="h-10 w-10 object-contain"
                          />
                        ) : (
                          <span className="text-2xl">{niche.dock.emoji}</span>
                        )}
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold font-jakarta ${
                          isSelected
                            ? "bg-[#FF681F] text-[#FFFEFF]"
                            : "bg-[#1B4328]/5 text-[#1B4328]/70"
                        }`}
                      >
                        {isSelected ? "Sedang Dipilih" : "Klik Coba"}
                      </span>
                    </div>

                    <p className="mt-4 text-xs font-semibold text-[#FF681F] font-jakarta">
                      {meta.audience}
                    </p>
                    <h4 className="mt-1 font-grotesk text-xl font-bold text-[#1B4328]">
                      {meta.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-[#1B4328]/75 font-outfit leading-relaxed">
                      {meta.benefit}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#1B4328]/10 space-y-3">
                    <div className="flex items-center gap-2 rounded-xl bg-[#1B4328]/[0.04] px-3 py-2 text-[11px] font-semibold text-[#1B4328]/80 font-jakarta">
                      <GlobeIcon className="w-3.5 h-3.5 text-[#FF681F] shrink-0" />
                      <span className="truncate">Contoh link: {meta.domainPreview}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/templates/${niche.id}`}
                        className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#1B4328] px-3 py-2.5 text-xs font-bold text-[#FFFEFF] hover:bg-[#FF681F] transition-colors font-jakarta"
                      >
                        Buka Toko
                        <ArrowUpRightIcon className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/cms/${niche.id}`}
                        className="inline-flex items-center justify-center gap-1 rounded-xl border border-[#1B4328]/20 bg-[#FFFEFF] px-3 py-2.5 text-xs font-bold text-[#1B4328] hover:border-[#FF681F] hover:text-[#FF681F] transition-colors font-jakarta"
                      >
                        <LayoutDashboardIcon className="w-3.5 h-3.5" />
                        Coba CMS
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live CMS Explanation Strip for Selected Card */}
          <div className="mt-6 rounded-3xl border border-[#1B4328]/15 bg-[#1B4328]/[0.04] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#FF681F] font-jakarta">
                Bisa Edit Sendiri Kapan Saja dari HP
              </p>
              <p className="font-grotesk text-lg sm:text-xl font-bold text-[#1B4328]">
                {getManagementSystemTitle(selectedNiche.brand)}
              </p>
              <p className="text-xs sm:text-sm text-[#1B4328]/75 font-outfit">
                Misal toko Anda <strong className="text-[#1B4328]">Roti Momoh</strong>, maka dashboard pribadi Anda otomatis bernama{" "}
                <strong className="text-[#1B4328]">Roti Momoh Management System</strong> di link{" "}
                <span className="font-semibold text-[#FF681F]">rotimomoh.komose.id/cms</span>. Mau naikin harga 5 ribu, pasang promo Ramadhan, atau tutup menu yang habis? Buka HP 30 detik beres!
              </p>
            </div>
            <Link
              href={`/cms/${selectedNiche.id}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#FF681F] px-5 py-3 text-xs font-bold text-[#FFFEFF] hover:bg-[#1B4328] transition-colors font-jakarta"
            >
              Simulasikan Edit Menu Sekarang
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const KOMOSE_FAQS = [
  {
    q: "Saya gaptek banget soal koding, apakah beneran bisa kelola toko sendiri?",
    a: "Bisa banget! Jangankan anak muda, bapak/ibu pemilik katering saja bisa mengoperasikannya. Tampilan dashboard kami pakai Bahasa Indonesia sederhana mirip ganti status WhatsApp. Mau ganti harga, upload foto baru, atau matikan menu yang habis, tinggal klik dan simpan dari layar HP. Tanpa koding sama sekali!",
  },
  {
    q: "Kenapa harus punya web sendiri kalau jualan di IG atau marketplace masih jalan?",
    a: "Di marketplace, margin keuntungan Anda dipotong 15%–30% dan di bawah produk Anda selalu dijejali toko sebelah yang perang banting harga. Di Instagram, menu lama cepat tenggelam dan pembeli bolak-balik tanya hal yang sama. Di website Komose, pembeli langsung klik link bio, lihat katalog rapi, hitung ongkir sendiri, dan 100% uangnya masuk utuh ke rekening Anda tanpa perantara!",
  },
  {
    q: "Beneran 0% potongan komisi selamanya? Gak ada potongan rahasia?",
    a: "100% BEBAS KOMISI. Komose tidak pernah memotong sepeser pun dari hasil jualan Anda. Mau toko Anda omzet Rp 5 juta atau Rp 500 juta sebulan, seluruh uang pelanggan langsung masuk utuh ke rekening bank pribadi Anda.",
  },
  {
    q: "Nanti nama alamat website toko saya seperti apa?",
    a: "Bisa langsung aktif pakai subdomain resmi kami (misal: rotimomoh.komose.id) yang langsung terlihat bonafide di bio IG & TikTok. Atau kalau mau pakai domain sendiri seperti rotimomoh.com atau rotimomoh.id, tim kami bantu sambungkan sampai aktif sempurna.",
  },
  {
    q: "Berapa lama proses pembuatan toko sampai siap jualan?",
    a: "Cuma 3 sampai 5 hari kerja setelah foto produk dan daftar harga Anda kirimkan via WhatsApp! Anda nggak perlu menunggu berminggu-minggu atau berbulan-bulan seperti bikin website agensi konvensional.",
  },
  {
    q: "Kalau saya super sibuk dan gak sempat update menu sendiri, gimana?",
    a: "Kami siapkan Paket Terima Beres: tim Komose yang rapikan semuanya dari awal sampai Anda tinggal terima beres jualan. Tapi kalau Anda tipe yang sering bikin promo mendadak, Anda bisa ambil Paket Bisnis Mandiri yang sudah dilengkapi dashboard CMS di HP Anda.",
  },
];

export function KomoseFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#FFFEFF] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-full border border-[#1B4328]/15 bg-[#1B4328]/5 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1B4328] font-jakarta">
            Tanya Jawab Blak-blakan
          </span>
          <h2 className="mt-4 font-grotesk text-3xl sm:text-4xl font-extrabold text-[#1B4328]">
            Masih Ragu? Ini Jawaban Jujur Tanpa Bahasa Teknis.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#1B4328]/75 font-outfit">
            Semua hal yang biasa ditanyakan pemilik usaha sebelum memutuskan stop boncos komisi dan buka toko sendiri di Komose.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {KOMOSE_FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className={`rounded-3xl border transition-all ${
                  isOpen
                    ? "border-[#FF681F] bg-[#FFFEFF] shadow-[0_12px_30px_rgba(27,67,40,0.08)]"
                    : "border-[#1B4328]/15 bg-[#FFFEFF] hover:border-[#1B4328]/35"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-grotesk text-sm sm:text-base font-bold text-[#1B4328]">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen
                        ? "bg-[#FF681F] text-[#FFFEFF]"
                        : "bg-[#1B4328]/5 text-[#1B4328]"
                    }`}
                  >
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-0 text-xs sm:text-sm leading-relaxed text-[#1B4328]/80 font-outfit border-t border-[#1B4328]/10">
                    <p className="pt-4">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
