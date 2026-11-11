import type { Metadata } from "next";
import { ComproNavbar } from "@/components/ComproNavbar";
import { ModernFooter } from "@/components/ModernFooter";
import { TemplatesCatalogClient } from "@/components/TemplatesCatalogClient";
import { CmsShowcaseSection } from "@/components/CmsShowcaseSection";

export const metadata: Metadata = {
  title: "Katalog Template & Solusi Website Bisnis — Yapping Techflow",
  description:
    "Katalog landing page & website interaktif per industri dari Yapping Techflow. Bisa pilih paket Tanpa CMS atau Dengan CMS ([Nama Brand] Management System).",
};

export default function TemplatesIndexPage() {
  return (
    <div className="relative min-h-screen bg-[#FAFAF8] text-stone-900 selection:bg-stone-900 selection:text-white font-jakarta overflow-x-hidden">
      {/* Background Soft Mesh Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-[10%] top-[5%] h-[550px] w-[650px] rounded-full bg-sky-200/35 blur-[140px]" />
        <div className="absolute -right-[10%] top-[8%] h-[580px] w-[680px] rounded-full bg-amber-200/40 blur-[150px]" />
        <div className="absolute left-[35%] top-[35%] h-[450px] w-[500px] rounded-full bg-rose-100/25 blur-[160px]" />
      </div>

      {/* Dynamic Floating Pill Navbar with Mobile Drawer */}
      <ComproNavbar />

      {/* Hero Section */}
      <section className="relative px-4 pt-28 pb-10 sm:pt-40 sm:pb-14 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-950 sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            Pilih template website sesuai <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-stone-900">
              industri bisnis Anda
            </span>
          </h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-xs sm:text-base leading-relaxed text-stone-600">
            Semua template dirancang siap konversi, super cepat, interaktif, dan
            bisa dipilih <strong>Tanpa CMS</strong> atau{" "}
            <strong>Dengan CMS ([Nama Brand] Management System)</strong>.
          </p>
        </div>
      </section>

      {/* Interactive Package Switcher + Template Cards */}
      <TemplatesCatalogClient />

      {/* Live CMS Showcase & Interactive Live Preview Playground */}
      <div className="border-t border-stone-200/80">
        <CmsShowcaseSection />
      </div>

      {/* Footer Seamlessly Blended with Page Background */}
      <ModernFooter className="bg-[#FAFAF8]" />
    </div>
  );
}
