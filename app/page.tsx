import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_NUMBER } from "@/config/niches";
import { ComproNavbar } from "@/components/ComproNavbar";
import { YappingLogo } from "@/components/YappingLogo";
import { UnifiedProductsServices } from "@/components/UnifiedProductsServices";
import { ComparisonSection } from "@/components/ComparisonSection";
import { FounderSection } from "@/components/FounderSection";
import { FaqSection } from "@/components/FaqSection";
import { ModernFooter } from "@/components/ModernFooter";

export const metadata: Metadata = {
  title: "Yapping Techflow",
  description:
    "Kami tidak sekadar membuat kode. Kami merekayasa aset digital berdaya konversi brutal, membangun ekosistem venture mandiri, dan melipatgandakan valuasi bisnis klien melalui teknologi mutakhir.",
};

export default function CompanyProfilePage() {
  const whatsappPitch = encodeURIComponent(
    "Halo Yapping Techflow, saya membaca profil bisnis Anda dan tertarik berkolaborasi untuk proyek teknologi / pembuatan platform digital.",
  );

  return (
    <div className="relative min-h-screen text-stone-900 selection:bg-stone-900 selection:text-white font-jakarta overflow-x-hidden">
      {/* Dynamic Floating Pill Navbar */}
      <ComproNavbar />

      {/* ========================================================================= */}
      {/* SECTION 1: HERO (Theme: Clean Ivory Luxury with Ethereal Ambient Glows)   */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative px-4 pt-28 pb-16 sm:pt-48 sm:pb-32 text-center overflow-hidden border-b border-stone-200/70 bg-gradient-to-b from-[#FAF8F5] via-[#F4F9F8] to-[#FAF8F5]"
      >
        {/* Iridescent Crystal Aurora Mesh Gradient with Dynamic Fluid Animation */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[900px] w-full max-w-[1500px] -translate-x-1/2 overflow-hidden"
        >
          {/* Animated Cyan / Teal Crystal Orb */}
          <div className="absolute left-[-10%] top-[5%] h-[620px] w-[680px] rounded-full bg-gradient-to-tr from-cyan-400/60 via-teal-300/50 to-emerald-200/40 blur-[90px] anim-crystal-1 will-change-transform" />
          {/* Animated Lavender / Violet / Amber Crystal Prism */}
          <div className="absolute right-[-8%] top-[4%] h-[600px] w-[660px] rounded-full bg-gradient-to-bl from-purple-400/55 via-indigo-300/45 to-amber-300/50 blur-[95px] anim-crystal-2 will-change-transform" />
          {/* Animated Center Luminous Rose & Sky Aura */}
          <div className="absolute left-[20%] top-[15%] h-[520px] w-[680px] rounded-full bg-gradient-to-r from-emerald-300/45 via-rose-300/40 to-sky-300/50 blur-[85px] anim-crystal-3 will-change-transform" />
          {/* Soft Glow Center Accent */}
          <div className="absolute left-1/2 top-10 h-[500px] w-[480px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/70 via-amber-100/30 to-transparent blur-[60px]" />
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Headline S3 Marketing: Berani, Menggigit, Menjual */}
          <h1 className="mt-2 sm:mt-4 text-3xl font-extrabold tracking-tight text-stone-950 sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.08] sm:leading-[1.05]">
            Kami tidak sekadar bikin kode. <br className="hidden sm:inline" />
            Kami cetak{" "}
            <span className="font-display italic font-normal text-stone-900 underline decoration-stone-300 underline-offset-8">
              mesin konversi
            </span>{" "}
            bisnis Anda.
          </h1>

          {/* Subtitle S3 Marketing */}
          <p className="mx-auto mt-5 sm:mt-7 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-lg font-outfit">
            Mayoritas website hanya menghabiskan anggaran. Di{" "}
            <strong className="text-stone-950 font-bold">Yapping Techflow</strong>, kami merancang
            aplikasi ekosistem, superapp terintegrasi, dan landing page mutakhir yang dirancang
            khusus untuk satu tujuan:{" "}
            <span className="text-stone-950 font-semibold underline decoration-emerald-400">
              mendominasi pasar dan melipatgandakan closing
            </span>
            .
          </p>

          {/* Dual CTAs & Trust Badges */}
          <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-6 w-full max-w-md sm:max-w-none mx-auto">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappPitch}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-stone-950 px-7 sm:px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-stone-950/15 transition-all hover:bg-stone-800 hover:scale-[1.02]"
            >
              <span className="tracking-wide">Konsultasi Proyek Eksklusif</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-stone-950 text-[10px] font-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>

            <div className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-white/70 px-4 py-2 border border-stone-200/80 shadow-2xs">
              <div className="flex -space-x-2 overflow-hidden">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-[11px]">
                  🚀
                </span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-sky-400 text-[11px]">
                  💎
                </span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-400 text-[11px]">
                  ⚡
                </span>
              </div>
              <div className="text-left text-xs font-jakarta">
                <div className="flex text-amber-500 font-bold tracking-tight">★★★★★</div>
                <div className="font-semibold text-stone-700">100% Bespoke &amp; Production-Ready</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Metric Bar */}
        <div className="mx-auto mt-14 sm:mt-20 max-w-5xl border-t border-stone-200/90 pt-8 sm:pt-10 pb-6 sm:pb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 font-grotesk">
            Standard Rekayasa Teknologi Skala Perusahaan
          </p>
          <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <span className="font-grotesk text-2xl sm:text-3xl font-extrabold text-stone-950">&lt; 1 Detik</span>
              <span className="mt-1 text-[11px] sm:text-xs text-stone-500 font-medium">Kecepatan Loading Kilat</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-grotesk text-2xl sm:text-3xl font-extrabold text-emerald-600">Nol Hambatan</span>
              <span className="mt-1 text-[11px] sm:text-xs text-stone-500 font-medium">Corong Otomatis WhatsApp</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-grotesk text-2xl sm:text-3xl font-extrabold text-stone-950">Modular</span>
              <span className="mt-1 text-[11px] sm:text-xs text-stone-500 font-medium">Skalabilitas Superapp</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-grotesk text-2xl sm:text-3xl font-extrabold text-stone-950">Kustom</span>
              <span className="mt-1 text-[11px] sm:text-xs text-stone-500 font-medium">Kualitas Tanpa Kompromi</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: UNIFIED PRODUCTS & SERVICES (Plivin, ClickCare & Atelier SS)   */}
      {/* ========================================================================= */}
      <section id="products" className="relative bg-[#F9F7F2] pt-16 sm:pt-24 pb-4 text-center overflow-hidden">
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 md:text-5xl font-grotesk">
            Produk &amp; Layanan
          </h2>
          <p className="mx-auto mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm text-stone-600 font-outfit">
            Jelajahi ekosistem produk mandiri dan platform teknologi skala enterprise besutan Yapping Techflow.
          </p>
        </div>
      </section>
      <UnifiedProductsServices />

      {/* ========================================================================= */}
      {/* SECTION 3: PHILOSOPHY & ABOUT (Seamless Gradient Transition Without Harsh Border) */}
      {/* ========================================================================= */}
      <section
        id="about"
        className="relative bg-[#F9F7F2] px-4 pt-16 pb-20 text-center sm:px-6 sm:pt-28 sm:pb-36 overflow-hidden"
      >
        {/* Background Texture Image with Multi-Stop Smooth Gradient Masks */}
        <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
          <Image
            src="/images/background/bg-image.jpeg"
            alt="Philosophy texture background"
            fill
            className="object-cover object-center opacity-20 mix-blend-multiply"
            unoptimized
          />
          {/* Top seamless gradient fade (menghilangkan garis patah antara Products dan Philosophy) */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#F9F7F2] via-[#F9F7F2]/80 to-transparent" />
          {/* Bottom seamless gradient fade (transisi mulus ke section berikutnya) */}
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#F9F7F2] via-[#F9F7F2]/85 to-transparent" />
          {/* Side soft vignetting */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F9F7F2]/60 via-transparent to-[#F9F7F2]/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Center Heading Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 md:text-5xl font-grotesk">
            Filosofi
          </h2>
          <p className="mx-auto mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm text-stone-600 font-outfit mb-8 sm:mb-12">
            Prinsip fundamental di balik setiap arsitektur kode dan strategi rekayasa produk kami.
          </p>

          <blockquote className="font-cormorant text-2xl sm:text-4xl md:text-6xl font-normal tracking-tight text-stone-950 leading-snug">
            &ldquo;Ide cemerlang tanpa eksekusi brutal hanyalah angan-angan.&rdquo;
          </blockquote>
          <div className="mx-auto mt-6 sm:mt-8 max-w-2xl space-y-3 sm:space-y-4 font-outfit text-xs sm:text-base leading-relaxed text-stone-700">
            <p>
              Nama <strong>Yapping Techflow</strong> berakar dari satu prinsip: kami mengubah percakapan, konsep liar, dan ambisi founder menjadi realitas digital berkecepatan tinggi yang menghasilkan profit riil.
            </p>
            <p className="text-stone-600 text-xs sm:text-sm">
              Kami membuktikannya lewat ekosistem produk kami sendiri seperti <strong>Plivin.co</strong>, rangkaian sales-engine di <strong>Atelier Suite</strong>, dan kepercayaan klien terpercaya kami seperti <strong>ClickCare</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: COMPARISON TABLE — Yapping Techflow vs Konvensional            */}
      {/* ========================================================================= */}
      <ComparisonSection />

      {/* ========================================================================= */}
      {/* SECTION 4.2: FOUNDER & ARCHITECT (Muhammad Raffa Yahfazhka)               */}
      {/* ========================================================================= */}
      <FounderSection />

      {/* ========================================================================= */}
      {/* SECTION 5: FAQ ACCORDION                                                   */}
      {/* ========================================================================= */}
      <FaqSection />

      {/* ========================================================================= */}
      {/* SECTION 6: CLOSING CTA (Theme: Luminous Pearl & Warm Ivory Luxe)          */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#F9F7F2] via-white to-white px-4 py-16 text-center text-stone-900 sm:px-6 sm:py-32 overflow-hidden">
        {/* Soft Ambient Crystal Glow in CTA */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[450px] w-full max-w-[900px] -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-60">
          <div className="absolute left-[15%] top-[10%] h-[320px] w-[380px] rounded-full bg-emerald-200/40 blur-[100px]" />
          <div className="absolute right-[15%] top-[10%] h-[320px] w-[380px] rounded-full bg-sky-200/40 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <h3 className="font-grotesk text-2xl font-extrabold sm:text-4xl md:text-5xl text-stone-950 leading-tight">
            Siap mendominasi kompetitor Anda <br className="hidden sm:inline" />
            bersama Yapping Techflow?
          </h3>

          <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-xs text-stone-600 sm:text-sm leading-relaxed font-outfit">
            Kami hanya mengambil proyek terbatas setiap bulannya agar kualitas eksekusi tetap tanpa tanding. Diskusikan rencana platform digital Anda langsung bersama founder kami hari ini.
          </p>

          <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappPitch}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-stone-950 px-7 sm:px-8 py-3.5 text-xs font-bold text-white transition-all hover:bg-stone-800 hover:scale-[1.02] shadow-xl shadow-stone-950/10"
            >
              Hubungi WhatsApp Founder (0811-1001-0324) ↗
            </a>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3.5 text-xs font-semibold text-stone-800 transition-all hover:bg-stone-50 shadow-2xs"
            >
              Lihat Katalog Template Bisnis
            </Link>
          </div>
        </div>
      </section>

      {/* Minimalist Modern Solace-Style Footer */}
      <ModernFooter />
    </div>
  );
}
