import type { Metadata } from "next";
import Link from "next/link";
import { KomoseNavbar } from "@/components/komose/KomoseNavbar";
import { KomoseLogo } from "@/components/komose/KomoseLogo";
import { TemplatesCatalogClient } from "@/components/TemplatesCatalogClient";
import { CmsShowcaseSection } from "@/components/CmsShowcaseSection";

export const metadata: Metadata = {
  title: "Koleksi Template Toko & Demo CMS — Komose",
  description:
    "Koleksi website siap jualan dan sistem kelola toko mandiri ([Nama Brand] Management System) dari Komose. Terhubung langsung ke WhatsApp dengan 0% komisi transaksi.",
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

export default function TemplatesIndexPage() {
  return (
    <div className="relative min-h-screen bg-[#FAFAF8] text-stone-900 selection:bg-stone-900 selection:text-white font-jakarta overflow-x-hidden">
      {/* Background Soft Mesh Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-[10%] top-[5%] h-[550px] w-[650px] rounded-full bg-emerald-200/25 blur-[140px]" />
        <div className="absolute -right-[10%] top-[8%] h-[580px] w-[680px] rounded-full bg-orange-200/30 blur-[150px]" />
        <div className="absolute left-[35%] top-[35%] h-[450px] w-[500px] rounded-full bg-emerald-100/20 blur-[160px]" />
      </div>

      {/* Komose Floating Navbar */}
      <KomoseNavbar />

      {/* Hero Section */}
      <section className="relative px-4 pt-28 pb-8 sm:pt-36 sm:pb-12 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full bg-[#1B4328]/10 text-[#1B4328] border border-[#1B4328]/20 px-3.5 py-1 text-[11px] font-bold font-jakarta uppercase mb-3">
            KOMOSE STOREFRONT TEMPLATES &amp; CMS
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-950 sm:text-5xl md:text-6xl leading-[1.1] font-grotesk">
            Koleksi Template Toko <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#1B4328]">
              Siap Jualan &amp; Auto-WhatsApp
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-stone-600 font-outfit">
            Pilih desain website toko sesuai jenis usaha Anda di platform <strong>Komose</strong>. Tersedia opsi <strong>Website Statis (terima beres)</strong> atau <strong>Website + CMS Mandiri</strong> untuk kelola produk dan promo sendiri.
          </p>
        </div>
      </section>

      {/* Interactive Package Switcher + Template Cards */}
      <TemplatesCatalogClient />

      {/* Live CMS Showcase & Interactive Live Preview Playground */}
      <div className="border-t border-stone-200/80 mt-4 sm:mt-8">
        <CmsShowcaseSection />
      </div>

      {/* Komose Footer */}
      <footer className="bg-[#1B4328] border-t border-[#FFFEFF]/10 text-[#FFFEFF] mt-12">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-sm">
              <KomoseLogo variant="light" />
              <p className="text-xs sm:text-sm text-[#FFFEFF]/75 font-outfit leading-relaxed">
                Platform pembuatan website jualan &amp; sistem kelola toko (CMS) yang praktis untuk UMKM, toko kreatif, klinik, dan layanan jasa Indonesia.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm font-semibold font-jakarta">
              <Link href="/komose" className="text-[#FFFEFF]/80 hover:text-[#FF681F] transition-colors">
                Platform Komose
              </Link>
              <Link href="/komose#klien-demo" className="text-[#FFFEFF]/80 hover:text-[#FF681F] transition-colors">
                Klien &amp; Demo
              </Link>
              <Link href="/templates" className="text-[#FFFEFF] font-bold">
                Katalog Template
              </Link>
              <Link href="/cms" className="text-[#FFFEFF]/80 hover:text-[#FF681F] transition-colors">
                Demo CMS
              </Link>
              <Link href="/" className="text-[#FFFEFF]/60 hover:text-white transition-colors">
                Yapping Holding ↗
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
