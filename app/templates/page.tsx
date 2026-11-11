import type { Metadata } from "next";
import Link from "next/link";
import { NICHES, WHATSAPP_NUMBER } from "@/config/niches";

export const metadata: Metadata = {
  title: "Katalog Template & Solusi Website Bisnis — Yapping Techflow",
  description:
    "Katalog landing page & website interaktif per industri dari Yapping Techflow. Temukan template yang cocok untuk bisnis F&B, florist, catering, dan lainnya.",
};

export default function TemplatesIndexPage() {
  const generalPitch = encodeURIComponent(
    "Halo Yapping Techflow, saya tertarik ingin konsultasi pembuatan landing page untuk bisnis saya. Boleh info pricelist dan prosesnya?",
  );

  return (
    <main className="min-h-screen bg-[#0C0F12] text-stone-100 selection:bg-emerald-500 selection:text-black">
      {/* Header bar */}
      <nav className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-extrabold tracking-tight text-lg text-white">
              Yapping <span className="text-emerald-400">Techflow</span>
            </span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${generalPitch}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-black transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            Konsultasi Projek ↗
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-25">
          <div className="h-[400px] w-[600px] rounded-full bg-gradient-to-tr from-emerald-600 to-cyan-500 blur-[130px]" />
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
            <span>🚀 High-Conversion Landing Pages</span>
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pilih Template Website Sesuai{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
              Industri Bisnis Anda
            </span>
          </h1>
          <p className="mt-6 text-base text-stone-400 sm:text-lg">
            Semua template dirancang siap konversi, super cepat, interaktif, dan terintegrasi
            langsung dengan WhatsApp & pemesanan instan.
          </p>
        </div>
      </section>

      {/* Template Cards Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {NICHES.map((niche) => {
            const nichePitch = encodeURIComponent(
              `Halo Yapping Techflow, saya tertarik pesan landing page dengan template ${niche.brand} (${niche.dock.label}). Boleh info detailnya?`,
            );

            return (
              <div
                key={niche.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-emerald-500/50 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-emerald-950/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{niche.dock.emoji}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-stone-300">
                      {niche.dock.shortLabel}
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                    {niche.brand}
                  </h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Niche: {niche.dock.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">
                    {niche.hero.description}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-stone-500">
                      Key Highlights
                    </span>
                    <ul className="mt-2 space-y-1.5 text-xs text-stone-300">
                      {niche.hero.stats.slice(0, 3).map((stat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span>
                            <strong className="text-white">{stat.value}</strong> {stat.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-2.5 pt-4">
                  <Link
                    href={`/templates/${niche.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-black transition-all hover:bg-stone-200"
                  >
                    <span>Lihat Live Preview</span>
                    <span>→</span>
                  </Link>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${nichePitch}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/20"
                  >
                    <span>Pesan Template Ini via WA</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-xs text-stone-500">
        <p>© {new Date().getFullYear()} Yapping Techflow. High-performance digital solutions.</p>
      </footer>
    </main>
  );
}

