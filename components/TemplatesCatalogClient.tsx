"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NICHES, WHATSAPP_NUMBER } from "@/config/niches";
import {
  getManagementSystemTitle,
  loadClientPlanPreference,
  saveClientPlanPreference,
} from "@/lib/cms";

export function TemplatesCatalogClient() {
  const [wantsCms, setWantsCms] = useState(true);

  useEffect(() => {
    const pref = loadClientPlanPreference();
    setWantsCms(pref.wantsCms);
  }, []);

  const handleToggleCms = (next: boolean) => {
    setWantsCms(next);
    const current = loadClientPlanPreference();
    saveClientPlanPreference({ ...current, wantsCms: next });
  };

  return (
    <>
      {/* Interactive Client Package Selector: Dengan CMS vs Tanpa CMS */}
      <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
        <div className="rounded-3xl border border-stone-200/90 bg-white/95 p-5 sm:p-7 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Pilihan Paket Fleksibel
              </span>
              <h2 className="mt-2.5 text-lg sm:text-xl font-extrabold text-stone-950">
                Pilih Kebutuhan Anda: Pakai CMS atau Tanpa CMS?
              </h2>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                {wantsCms
                  ? "Dengan CMS: Anda mendapatkan dashboard pribadi bernama brand Anda ([Nama Brand] Management System) untuk update produk, harga, foto & promo sendiri kapan saja + layanan maintenance bulanan."
                  : "Tanpa CMS (Static): Website ultra-ringan tanpa panel admin. Cocok jika Anda ingin terima beres dan sesekali cukup hubungi tim kami bila ada perubahan konten."}
              </p>
            </div>

            {/* Toggle Switcher */}
            <div className="flex shrink-0 flex-col sm:flex-row gap-2 rounded-2xl border border-stone-200 bg-stone-100/90 p-1.5">
              <button
                type="button"
                onClick={() => handleToggleCms(false)}
                className={`rounded-xl px-4 py-2.5 text-left transition-all ${
                  !wantsCms
                    ? "bg-stone-950 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-950"
                }`}
              >
                <div className="text-xs font-bold">⚡ Tanpa CMS (Static)</div>
                <div
                  className={`text-[10px] ${
                    !wantsCms ? "text-stone-300" : "text-stone-500"
                  }`}
                >
                  Setup sekali jalan · Terima beres
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleToggleCms(true)}
                className={`rounded-xl px-4 py-2.5 text-left transition-all ${
                  wantsCms
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-950"
                }`}
              >
                <div className="text-xs font-bold">
                  🎛️ Dengan CMS + Maintenance
                </div>
                <div
                  className={`text-[10px] ${
                    wantsCms ? "text-emerald-100" : "text-stone-500"
                  }`}
                >
                  [Brand] Management System
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Template Cards Grid */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {NICHES.map((niche) => {
            const cmsTitle = getManagementSystemTitle(niche.brand);
            const planLabel = wantsCms
              ? `DENGAN CMS (${cmsTitle} + Maintenance Bulanan)`
              : "TANPA CMS (Website Static High-Conversion)";
            const nichePitch = encodeURIComponent(
              `Halo Yapping Techflow, saya tertarik pesan template ${niche.brand} (${niche.dock.label}) dengan paket ${planLabel}. Boleh info detail harga dan fiturnya?`,
            );

            return (
              <div
                key={niche.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-stone-200/90 bg-white/95 p-5 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{niche.dock.emoji}</span>
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-bold text-stone-700">
                      {niche.dock.shortLabel}
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-stone-950 group-hover:text-emerald-700 transition-colors">
                    {niche.brand}
                  </h2>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Industri: {niche.dock.label}
                  </p>

                  {/* Dynamic CMS Option Pill */}
                  <div
                    className={`mt-3 rounded-xl border px-3 py-2 text-[11px] font-semibold ${
                      wantsCms
                        ? "border-emerald-200 bg-emerald-50/70 text-emerald-900"
                        : "border-stone-200 bg-stone-50 text-stone-700"
                    }`}
                  >
                    {wantsCms ? (
                      <span>🎛️ Termasuk: {cmsTitle}</span>
                    ) : (
                      <span>⚡ Mode Statis (Tanpa CMS · Setup Sekali)</span>
                    )}
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-stone-600">
                    {niche.hero.description}
                  </p>

                  <div className="mt-5 border-t border-stone-100 pt-4">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-stone-400">
                      Fitur Utama
                    </span>
                    <ul className="mt-2.5 space-y-2 text-xs text-stone-600">
                      {niche.hero.stats.slice(0, 3).map((stat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>
                            <strong className="text-stone-900 font-semibold">
                              {stat.value}
                            </strong>{" "}
                            {stat.label}
                          </span>
                        </li>
                      ))}
                      {wantsCms && (
                        <li className="flex items-center gap-2 text-emerald-800 font-medium">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>Kelola Produk, Harga &amp; Promo di CMS</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-2 pt-4 border-t border-stone-100">
                  <Link
                    href={`/templates/${niche.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-950 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-stone-800 shadow-sm"
                  >
                    <span>Live Preview Website</span>
                    <span>→</span>
                  </Link>

                  <Link
                    href={`/cms/${niche.id}`}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                      wantsCms
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                        : "border border-emerald-200 bg-emerald-50/60 text-emerald-800 hover:bg-emerald-100"
                    }`}
                  >
                    <span>🎛️ Live Preview CMS</span>
                  </Link>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${nichePitch}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-800 transition-colors hover:bg-stone-50"
                  >
                    <span>
                      Pesan ({wantsCms ? "Dengan CMS" : "Tanpa CMS"}) via WA
                    </span>
                    <span className="text-emerald-600">↗</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

