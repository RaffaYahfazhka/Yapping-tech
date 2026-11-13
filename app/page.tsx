import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_NUMBER } from "@/config/niches";
import { ComproNavbar } from "@/components/ComproNavbar";
import { YappingLogo } from "@/components/YappingLogo";
import { EcosystemStructureDiagram } from "@/components/EcosystemStructureDiagram";
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
            Di{" "}
            <strong className="text-stone-950 font-bold">Yapping Techflow</strong>, kami merekayasa
            aset digital berkecepatan tinggi, menginkubasi venture mandiri seperti{" "}
            <strong className="text-stone-950 font-semibold">Plivin.co</strong>, serta menaungi{" "}
            <strong className="text-stone-950 font-semibold">Komose</strong> untuk menghadirkan
            platform komersial klien yang{" "}
            <span className="text-stone-950 font-semibold underline decoration-emerald-400">
              mendominasi pasar dan melipatgandakan konversi bisnis
            </span>
            .
          </p>

        {/* CTA & Trust Badge */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-6 w-full max-w-md sm:max-w-none mx-auto">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappPitch}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-stone-950 px-7 sm:px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-stone-950/15 transition-all hover:bg-stone-800 hover:scale-[1.02]"
          >
            <span className="tracking-wide">Konsultasi Proyek &amp; Kemitraan</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-stone-950 text-[10px] font-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>

          <div className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-white/80 px-4 py-2 border border-stone-200/90 shadow-2xs backdrop-blur-sm">
            <div className="flex -space-x-2 overflow-hidden">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-amber-50 p-1">
                <Image
                  src="/images/emojis/rocket.png"
                  alt="Rocket"
                  width={20}
                  height={20}
                  className="object-contain"
                  unoptimized
                />
              </span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-sky-50 p-1">
                <Image
                  src="/images/emojis/diamond.png"
                  alt="Diamond"
                  width={20}
                  height={20}
                  className="object-contain"
                  unoptimized
                />
              </span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-50 p-1">
                <Image
                  src="/images/emojis/lightning.png"
                  alt="Lightning"
                  width={20}
                  height={20}
                  className="object-contain"
                  unoptimized
                />
              </span>
            </div>
            <div className="text-left text-xs font-jakarta">
              <div className="flex text-emerald-700 font-bold tracking-wider text-[10px] font-mono uppercase">
                STUDIO REKAYASA &amp; VENTURE
              </div>
              <div className="font-semibold text-stone-800">Arsitektur Edge &amp; Skalabilitas Enterprise</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Metric Bar */}
      <div className="mx-auto mt-14 sm:mt-20 max-w-4xl border-t border-stone-200/90 pt-8 sm:pt-10 pb-6 sm:pb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 font-grotesk">
          Standar Rekayasa Teknologi Yapping Techflow
        </p>
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex flex-col items-center text-center">
            <span className="font-grotesk text-2xl sm:text-3xl font-extrabold text-stone-950">&lt; 1 Detik</span>
            <span className="mt-1 text-xs text-stone-500 font-medium">Performa Loading Edge Sub-Detik</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="font-grotesk text-2xl sm:text-3xl font-extrabold text-emerald-600">100% IP &amp; Kode</span>
            <span className="mt-1 text-xs text-stone-500 font-medium">Kepemilikan Penuh, Bebas Lock-in</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="font-grotesk text-2xl sm:text-3xl font-extrabold text-stone-950">Bespoke Stack</span>
            <span className="mt-1 text-xs text-stone-500 font-medium">Arsitektur Modular Siap Skala Superapp</span>
          </div>
        </div>
      </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: ABOUT US (TENTANG KAMI & STUDIO MANIFESTO)                     */}
      {/* ========================================================================= */}
      <section
        id="about"
        className="group relative bg-[#F9F7F2] px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center sm:px-6 overflow-hidden"
      >
        {/* Background Texture Image with Multi-Stop Smooth Gradient Masks */}
        <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
          <Image
            src="/images/background/bg-image.jpeg"
            alt="About texture background"
            fill
            className="object-cover object-center filter grayscale contrast-[1.08] brightness-[0.95] opacity-25 mix-blend-multiply transition-all duration-700 ease-out group-hover:filter-none group-hover:opacity-60 group-hover:scale-[1.02]"
            unoptimized
          />
          {/* Top seamless gradient fade */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#F9F7F2] via-[#F9F7F2]/80 to-transparent" />
          {/* Bottom seamless gradient fade */}
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#F9F7F2] via-[#F9F7F2]/85 to-transparent" />
          {/* Side soft vignetting */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F9F7F2]/60 via-transparent to-[#F9F7F2]/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          {/* Center Heading Title */}
          <div className="mb-8 sm:mb-10">
            <span className="inline-block rounded-full bg-stone-200/90 border border-stone-300 px-3.5 py-1 text-[11px] font-bold font-mono tracking-wider text-stone-700 uppercase mb-3">
              // TENTANG KAMI &amp; STUDIO MANIFESTO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 md:text-5xl font-grotesk">
              Tentang Kami
            </h2>
            <p className="mx-auto mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm text-stone-600 font-outfit">
              Pusat rekayasa arsitektur perangkat lunak, inkubator produk in-house, dan studio kemitraan ventura.
            </p>
          </div>

          {/* Iconic Manifesto Quote */}
          <blockquote className="font-cormorant text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-stone-950 leading-snug max-w-4xl mx-auto">
            &ldquo;Ide cemerlang tanpa eksekusi brutal hanyalah angan-angan.&rdquo;
          </blockquote>

          {/* Story Narrative */}
          <div className="mx-auto mt-6 sm:mt-8 max-w-3xl space-y-3 sm:space-y-4 font-outfit text-xs sm:text-base leading-relaxed text-stone-700">
            <p>
              Nama <strong>Yapping Techflow</strong> berakar dari filosofi sederhana: percakapan dan ide ambisius seorang founder tidak boleh berhenti di meja obrolan. Kami ada untuk mengubah konsep liar menjadi realitas digital berkecepatan tinggi yang menghasilkan profit dan valuasi riil.
            </p>
            <p className="text-stone-600 text-xs sm:text-sm">
              Kami memposisikan diri bukan sekadar vendor yang mengerjakan pesanan lalu lepas tangan. Kami adalah partner rekayasa arsitektur yang mengawal produk sejak validasi prototipe hingga skala enterprise.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 text-left font-jakarta">
            <div className="rounded-2xl border border-stone-300/80 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold text-sm mb-4">
                01
              </div>
              <h3 className="font-grotesk font-bold text-stone-950 text-base">Model Dual-Engine</h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 font-outfit leading-relaxed">
                Menginkubasi startup in-house mandiri (<strong className="text-stone-900 font-semibold">Plivin.co</strong>) sekaligus menaungi platform komersial klien (<strong className="text-stone-900 font-semibold">Komose</strong> &amp; <strong className="text-stone-900 font-semibold">ClickCare</strong>).
              </p>
            </div>

            <div className="rounded-2xl border border-stone-300/80 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-white font-mono font-bold text-sm mb-4">
                02
              </div>
              <h3 className="font-grotesk font-bold text-stone-950 text-base">Sub-Second Engineering</h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 font-outfit leading-relaxed">
                Fondasi teknologi edge modern, Next.js Turbo, arsitektur multi-tenant domain routing, serta infrastruktur zero-downtime yang siap diekstensi menjadi superapp.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-300/80 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-mono font-bold text-sm mb-4">
                03
              </div>
              <h3 className="font-grotesk font-bold text-stone-950 text-base">100% Kepemilikan IP</h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 font-outfit leading-relaxed">
                Kode, aset digital, dan infrastruktur sepenuhnya menjadi milik Anda. Tanpa sistem sewa lisensi yang mengunci bisnis atau biaya tersembunyi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: ECOSYSTEM ARCHITECTURE & PRODUCTS / SERVICES                   */}
      {/* ========================================================================= */}
      <section id="products" className="relative bg-[#F9F7F2] pt-14 sm:pt-20 pb-16 sm:pb-24 text-center overflow-hidden">
        <div className="relative z-10 mx-auto max-w-4xl px-4 mb-2">
          <span className="inline-block rounded-full bg-stone-200/90 border border-stone-300 px-3.5 py-1 text-[11px] font-bold font-mono tracking-wider text-stone-700 uppercase mb-3">
            // BLUEPRINT &amp; STRUKTUR EKOSISTEM
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 md:text-5xl font-grotesk">
            Produk &amp; Layanan
          </h2>
          <p className="mx-auto mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm text-stone-600 font-outfit">
            Arsitektur ekosistem holding, produk mandiri in-house, dan platform komersial klien besutan Yapping Techflow.
          </p>
        </div>

        {/* Interactive Architecture Diagram Canvas */}
        <EcosystemStructureDiagram />
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
              href="/komose"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3.5 text-xs font-semibold text-stone-800 transition-all hover:bg-stone-50 shadow-2xs"
            >
              Kunjungi Platform Klien Komose
            </Link>
          </div>
        </div>
      </section>

      {/* Minimalist Modern Solace-Style Footer */}
      <ModernFooter />
    </div>
  );
}
