"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
        <div className="rounded-2xl border border-stone-200/90 bg-white/95 p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-stone-950">
                Pilih Opsi Paket
              </h2>
              <p className="mt-0.5 text-xs text-stone-500">
                {wantsCms
                  ? "Termasuk panel CMS pribadi ([Nama Brand] Management System) & maintenance bulanan."
                  : "Website statis siap pakai tanpa panel admin, cepat & terima beres."}
              </p>
            </div>

            {/* Compact Toggle Switcher */}
            <div className="inline-flex shrink-0 items-center rounded-xl border border-stone-200 bg-stone-100 p-1">
              <button
                type="button"
                onClick={() => handleToggleCms(false)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  !wantsCms
                    ? "bg-white text-stone-950 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Tanpa CMS (Statis)
              </button>

              <button
                type="button"
                onClick={() => handleToggleCms(true)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  wantsCms
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                + Opsi CMS
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
              `Halo Komose, saya tertarik pesan website toko ${niche.brand} (${niche.dock.label}) dengan paket ${planLabel}. Boleh info detail harga dan langkah pembuatannya?`,
            );

            return (
              <div
                key={niche.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-stone-200/90 bg-white/95 p-5 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    {niche.dock.emojiImage ? (
                      <div className="relative h-9 w-9">
                        <Image
                          src={niche.dock.emojiImage}
                          alt={niche.dock.label}
                          width={36}
                          height={36}
                          className="h-9 w-9 object-contain"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <span className="text-3xl">{niche.dock.emoji}</span>
                    )}
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

                <div className="mt-6 flex flex-col gap-2 pt-4 border-t border-stone-100">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/templates/${niche.id}`}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-stone-950 px-3 py-2.5 text-xs font-bold text-white transition-all hover:bg-stone-800 shadow-sm"
                    >
                      <span>Lihat Web</span>
                      <span>→</span>
                    </Link>

                    <Link
                      href={`/cms/${niche.id}`}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-xs font-semibold text-stone-700 transition-all hover:bg-stone-100"
                    >
                      <span>Coba CMS</span>
                      <span>↗</span>
                    </Link>
                  </div>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${nichePitch}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-800 transition-colors hover:bg-emerald-100"
                  >
                    <span>Pesan via WhatsApp</span>
                    <span>↗</span>
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

