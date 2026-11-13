"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { NICHES, NICHE_MAP, WHATSAPP_NUMBER } from "@/config/niches";
import {
  CLIENT_PREVIEW_DOMAINS,
  THEME_PRESETS,
  formatBrandTitle,
  getManagementSystemTitle,
  resolveNicheCms,
} from "@/lib/cms";
import type { NicheConfig, NicheId } from "@/types/landing";

export function CmsShowcaseSection() {
  const [selectedId, setSelectedId] = useState<NicheId>("patisserie");
  const [wantsCms, setWantsCms] = useState<boolean>(true);
  const [customBrand, setCustomBrand] = useState<string>(
    formatBrandTitle(NICHE_MAP.patisserie.brand),
  );
  const [customPromo, setCustomPromo] = useState<string>(
    NICHE_MAP.patisserie.announcement.messages[0],
  );
  const [customAccent, setCustomAccent] = useState<string>(
    NICHE_MAP.patisserie.theme.accent,
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [stageWidth, setStageWidth] = useState(560);

  const handleSelectNiche = (id: NicheId) => {
    setSelectedId(id);
    setIsLoaded(false);
    const n = NICHE_MAP[id];
    setCustomBrand(formatBrandTitle(n.brand));
    setCustomPromo(n.announcement.messages[0]);
    setCustomAccent(n.theme.accent);
  };

  const previewConfig = useMemo<NicheConfig>(() => {
    const base = resolveNicheCms(NICHE_MAP[selectedId]);
    const cleanBrand = customBrand.trim() || formatBrandTitle(base.brand);
    const brandChanged =
      cleanBrand.toLowerCase() !== base.brand.toLowerCase();

    return {
      ...base,
      brand: cleanBrand,
      announcement: {
        ...base.announcement,
        messages: [customPromo, ...base.announcement.messages.slice(1)],
      },
      theme: {
        ...base.theme,
        accent: customAccent,
      },
      cms: {
        ...base.cms,
        enabled: wantsCms,
        useTextLogo: brandChanged,
      },
    };
  }, [selectedId, customBrand, customPromo, customAccent, wantsCms]);

  const syncToIframe = useCallback((cfg: NicheConfig) => {
    const win = iframeRef.current?.contentWindow;
    if (!win || typeof window === "undefined") return;
    win.postMessage(
      {
        type: "YAPPING_CMS_SYNC",
        nicheId: cfg.id,
        config: cfg,
      },
      window.location.origin,
    );
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const update = () => setStageWidth(el.clientWidth);
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      syncToIframe(previewConfig);
    }
  }, [previewConfig, isLoaded, syncToIframe]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "YAPPING_CMS_EMBED_READY") {
        setIsLoaded(true);
        syncToIframe(previewConfig);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [previewConfig, syncToIframe]);

  const logicalWidth = 1280;
  const scale = Math.max(0.24, Math.min(1, stageWidth / logicalWidth));
  const previewHeight = 390;
  const iframeLogicalHeight = Math.round(previewHeight / scale);

  const systemTitle = getManagementSystemTitle(customBrand || previewConfig.brand);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Halo Komose, saya tertarik dengan paket website toko ${
      wantsCms
        ? `DENGAN CMS (${systemTitle} + Maintenance Bulanan)`
        : "TANPA CMS (Website Statis)"
    } untuk bisnis "${customBrand || previewConfig.brand}". Boleh konsultasi?`,
  )}`;

  return (
    <section
      id="cms-system"
      className="relative bg-[#F9F7F2] px-4 py-20 sm:px-6 sm:py-28 overflow-hidden border-t border-stone-200/70"
    >
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute left-1/3 top-10 h-[420px] w-[520px] rounded-full bg-emerald-200/25 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header: Short & Punchy */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-stone-950 font-grotesk">
            Simulasi Live Dashboard CMS
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm text-stone-600 font-outfit">
            Coba ketik nama brand dan promo Anda di simulator bawah ini untuk melihat perubahannya langsung di frame website.
          </p>
        </div>

        {/* 2 Package Option Cards */}
        <div className="grid gap-4 md:grid-cols-2 mb-10">
          <button
            type="button"
            onClick={() => setWantsCms(false)}
            className={`rounded-3xl border p-6 text-left transition-all ${
              !wantsCms
                ? "border-stone-950 bg-white shadow-xl ring-2 ring-stone-950"
                : "border-stone-200/90 bg-white/75 hover:bg-white hover:border-stone-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-700">
                Opsi 01 · Static Website
              </span>
              <span
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                  !wantsCms
                    ? "border-stone-950 bg-stone-950 text-white"
                    : "border-stone-300"
                }`}
              >
                {!wantsCms ? "✓" : ""}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-extrabold text-stone-950 font-jakarta">
              Website Only (Tanpa CMS)
            </h3>
            <p className="mt-1.5 text-xs text-stone-600 font-outfit leading-relaxed">
              Cocok untuk bisnis yang menu &amp; harganya jarang berubah. Super
              ringan, sekali setup, dan tim kami bantu saat sesekali butuh
              revisi.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-stone-700">
              <li>✓ Landing page high-conversion &amp; checkout WhatsApp</li>
              <li>✓ Tanpa biaya sistem CMS tambahan</li>
              <li>✓ Custom domain mandiri &amp; performa sub-1 detik</li>
            </ul>
          </button>

          <button
            type="button"
            onClick={() => setWantsCms(true)}
            className={`rounded-3xl border p-6 text-left transition-all ${
              wantsCms
                ? "border-emerald-600 bg-white shadow-xl ring-2 ring-emerald-600"
                : "border-stone-200/90 bg-white/75 hover:bg-white hover:border-emerald-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Opsi 02 · Website + CMS &amp; Maintenance
              </span>
              <span
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                  wantsCms
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-stone-300"
                }`}
              >
                {wantsCms ? "✓" : ""}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-extrabold text-stone-950 font-jakarta">
              Paket + {systemTitle}
            </h3>
            <p className="mt-1.5 text-xs text-stone-600 font-outfit leading-relaxed">
              Klien dapat dashboard admin pribadi berlabel brand sendiri untuk
              ubah produk, harga, promo, dan foto kapan saja dengan Live
              Preview instan + paket maintenance bulanan.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-stone-700">
              <li>
                ✓ White-label: <strong>[Nama Brand] Management System</strong>
              </li>
              <li>✓ Editor simpel + Live Preview Desktop &amp; Mobile</li>
              <li>✓ Termasuk Cloud Hosting, Backup Otomatis &amp; Support</li>
            </ul>
          </button>
        </div>

        {/* Interactive Live Preview Simulator Box */}
        <div className="overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-2xl shadow-stone-900/[0.06]">
          {/* Simulator Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 bg-stone-50/90 px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg text-xs text-white"
                style={{ backgroundColor: customAccent }}
              >
                {NICHE_MAP[selectedId].dock.emoji}
              </span>
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-stone-950">
                  {wantsCms
                    ? systemTitle
                    : `${formatBrandTitle(customBrand)} — Static Mode`}
                </div>
                <div className="text-[10px] text-stone-500">
                  Simulasi interaktif real-time · Coba ubah nama brand atau
                  warna di kiri
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {NICHES.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => handleSelectNiche(n.id)}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all ${
                    selectedId === n.id
                      ? "bg-stone-950 text-white"
                      : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {n.dock.emoji}{" "}
                  <span className="hidden sm:inline">{n.dock.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Split Mini CMS + Live Preview Iframe */}
          <div className="grid lg:grid-cols-12">
            {/* Left Mini Control Panel */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-stone-200 p-5 sm:p-6 flex flex-col justify-between bg-white">
              {wantsCms ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                      1. Nama Brand Klien (Ubah &amp; Lihat Title CMS)
                    </label>
                    <input
                      type="text"
                      value={customBrand}
                      onChange={(e) => setCustomBrand(e.target.value)}
                      placeholder="Contoh: Kopi Senja"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs font-semibold text-stone-950 focus:border-stone-950 focus:bg-white focus:outline-none"
                    />
                    <p className="mt-1 text-[11px] text-emerald-700 font-medium">
                      Title produk otomatis:{" "}
                      <strong>{systemTitle}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                      2. Teks Promo Banner Atas
                    </label>
                    <input
                      type="text"
                      value={customPromo}
                      onChange={(e) => setCustomPromo(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-stone-950 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                      3. Warna Aksen Brand
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {THEME_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setCustomAccent(preset.accent)}
                          title={preset.name}
                          className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                            customAccent.toLowerCase() ===
                            preset.accent.toLowerCase()
                              ? "border-stone-950 scale-110"
                              : "border-white shadow-sm"
                          }`}
                          style={{ backgroundColor: preset.accent }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="my-auto py-4 space-y-3">
                  <span className="inline-block rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                    Mode Tanpa CMS Aktif
                  </span>
                  <h4 className="text-base font-bold text-stone-950">
                    Website Statis Tanpa Dashboard Admin
                  </h4>
                  <p className="text-xs leading-relaxed text-stone-600">
                    Pengunjung tetap melihat website cepat dan elegan seperti di
                    Live Preview sebelah kanan. Jika sewaktu-waktu butuh ganti
                    teks/foto, tim Yapping Techflow yang mengerjakan.
                  </p>
                  <button
                    type="button"
                    onClick={() => setWantsCms(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
                  >
                    + Bandingkan dengan mode Pakai CMS →
                  </button>
                </div>
              )}

              <div className="mt-6 pt-5 border-t border-stone-100 flex flex-col sm:flex-row gap-2.5">
                <Link
                  href={`/cms/${selectedId}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-stone-950 px-4 py-3 text-xs font-bold text-white hover:bg-stone-800 transition-colors shadow-sm"
                >
                  <span>Buka Full Dashboard CMS</span>
                  <span>→</span>
                </Link>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white px-4 py-3 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors"
                >
                  <span>Konsultasi</span>
                  <span className="text-emerald-600">↗</span>
                </a>
              </div>
            </div>

            {/* Right Live Preview Frame */}
            <div className="lg:col-span-7 bg-stone-100 p-3 sm:p-4">
              <div className="mb-2 flex items-center justify-between px-1 text-[10.5px]">
                <span className="font-mono text-stone-600">
                  🔒 https://{CLIENT_PREVIEW_DOMAINS[selectedId]}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[9.5px] font-bold text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Preview
                </span>
              </div>

              <div
                ref={stageRef}
                className="relative w-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md"
                style={{ height: `${previewHeight}px` }}
              >
                {!isLoaded && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/95 text-xs font-medium text-stone-500">
                    Memuat Live Preview...
                  </div>
                )}
                <iframe
                  key={selectedId}
                  ref={iframeRef}
                  src={`/templates/${selectedId}?embed=1`}
                  title={`Live Preview ${previewConfig.brand}`}
                  onLoad={() => {
                    setIsLoaded(true);
                    syncToIframe(previewConfig);
                  }}
                  style={{
                    width: `${logicalWidth}px`,
                    height: `${iframeLogicalHeight}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    border: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

