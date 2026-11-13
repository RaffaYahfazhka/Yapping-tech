"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type ChangeEvent } from "react";
import { WHATSAPP_NUMBER } from "@/config/niches";
import { useShowcase } from "@/context/ShowcaseContext";
import {
  DEFAULT_REVIEWS_BY_NICHE,
  THEME_PRESETS,
  formatBrandTitle,
  getManagementSystemTitle,
  resolveNicheCms,
} from "@/lib/cms";
import { formatIDR } from "@/lib/format";
import {
  CmsCard,
  CmsField,
  CmsToggle,
  cmsInputClass,
} from "@/components/cms/CmsFields";
import {
  CmsPreviewFrame,
  type PreviewViewport,
} from "@/components/cms/CmsPreviewFrame";
import { ImagePickerModal } from "@/components/cms/ImagePickerModal";
import type {
  CmsReviewItem,
  NicheConfig,
  NicheId,
  Product,
} from "@/types/landing";

type CmsTabId =
  | "overview"
  | "brand"
  | "hero"
  | "products"
  | "content"
  | "contact";

interface CmsTabDef {
  id: CmsTabId;
  emoji: string;
  label: string;
  previewSection: string;
}

const CMS_TABS: CmsTabDef[] = [
  { id: "overview", emoji: "📊", label: "Ringkasan", previewSection: "top" },
  { id: "brand", emoji: "🎨", label: "Brand & Tema", previewSection: "top" },
  { id: "hero", emoji: "✨", label: "Hero & Promo", previewSection: "top" },
  { id: "products", emoji: "🛍️", label: "Produk & Harga", previewSection: "collection" },
  { id: "content", emoji: "💬", label: "Cerita & FAQ", previewSection: "story" },
  { id: "contact", emoji: "📱", label: "Kontak & WA", previewSection: "footer" },
];

export function CmsWorkspace() {
  const router = useRouter();
  const {
    niches,
    activeNiche: rawActiveNiche,
    activeId,
    setActiveNiche,
    updateNicheConfig,
    replaceNicheConfig,
    resetNicheConfig,
    hasCustomEdits,
  } = useShowcase();

  const activeNiche = useMemo(
    () => resolveNicheCms(rawActiveNiche),
    [rawActiveNiche],
  );
  const cms = activeNiche.cms;
  const managementTitle = getManagementSystemTitle(activeNiche.brand);
  const isEdited = hasCustomEdits(activeId);

  const [activeTab, setActiveTab] = useState<CmsTabId>("overview");
  const [mobilePane, setMobilePane] = useState<"editor" | "preview">("editor");
  const [viewport, setViewport] = useState<PreviewViewport>("desktop");
  const [scrollCommand, setScrollCommand] = useState<{
    sectionId: string;
    nonce: number;
  } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [importError, setImportError] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  // Products CRUD state
  const [productSearch, setProductSearch] = useState("");
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Content sub-tab state
  const [contentSubTab, setContentSubTab] = useState<"story" | "reviews" | "faq">(
    "story",
  );

  // Image Picker Modal state
  const [pickerState, setPickerState] = useState<{
    isOpen: boolean;
    currentUrl: string;
    onSelect: (url: string) => void;
  }>({
    isOpen: false,
    currentUrl: "",
    onSelect: () => {},
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((curr) => (curr === msg ? "" : curr));
    }, 2600);
  };

  const triggerPreviewScroll = (sectionId: string) => {
    setScrollCommand({ sectionId, nonce: Date.now() });
  };

  const handleTabChange = (tab: CmsTabDef) => {
    setActiveTab(tab.id);
    setEditingProductId(null);
    triggerPreviewScroll(tab.previewSection);
  };

  const handleSwitchTenant = (nicheId: NicheId) => {
    setActiveNiche(nicheId, { scrollTop: false });
    setEditingProductId(null);
    setConfirmReset(false);
    router.push(`/cms/${nicheId}`);
  };

  const patchNiche = (updater: (prev: NicheConfig) => NicheConfig) => {
    updateNicheConfig(activeId, updater);
  };

  const toggleCmsEnabled = (enabled: boolean) => {
    patchNiche((prev) => {
      const resolved = resolveNicheCms(prev);
      return {
        ...resolved,
        cms: {
          ...resolved.cms,
          enabled,
        },
      };
    });
    showToast(
      enabled
        ? `${managementTitle} diaktifkan`
        : "Beralih ke Mode Website Statis (Tanpa CMS)",
    );
  };

  // Product helpers
  const filteredProducts = activeNiche.products.filter((p) =>
    `${p.name} ${p.subtitle} ${p.badge ?? ""}`
      .toLowerCase()
      .includes(productSearch.toLowerCase()),
  );

  const editingProduct = activeNiche.products.find(
    (p) => p.id === editingProductId,
  );

  const updateProduct = (productId: string, patch: Partial<Product>) => {
    patchNiche((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === productId ? { ...p, ...patch } : p,
      ),
    }));
  };

  const handleAddProduct = () => {
    const newId = `custom-${Date.now()}`;
    const defaultImg =
      activeNiche.products[0]?.image || "/images/patisserie/bento-cake.jpg";
    const defaultUnit =
      activeNiche.mode === "catering"
        ? "pax"
        : activeNiche.mode === "bouquet"
        ? "bouquet"
        : "box";
    const newProduct: Product = {
      id: newId,
      name: "Produk Baru",
      subtitle: "Varian Spesial · Siap Dipesan",
      description:
        "Deskripsi singkat keunggulan produk ini agar calon pembeli langsung tertarik.",
      price: 125000,
      unitLabel: defaultUnit,
      image: defaultImg,
      imageAlt: "Produk baru",
      badge: "Terbaru",
      badgeTone: "accent",
      highlights: ["Kualitas Premium", "Bisa Custom Pesanan"],
      specs: [
        { label: "Porsi / Ukuran", value: "Standar" },
        { label: "Pengiriman", value: "Instant Ready" },
      ],
      minQty: activeNiche.mode === "catering" ? 5 : 1,
      step: activeNiche.mode === "catering" ? 5 : 1,
      deliverySafe: 5,
      soldOutSoon: false,
      cardMessage: "Ucapan spesial untuk orang tersayang.",
    };
    patchNiche((prev) => ({
      ...prev,
      products: [newProduct, ...prev.products],
    }));
    setEditingProductId(newId);
    triggerPreviewScroll("collection");
    showToast("Produk baru ditambahkan");
  };

  const handleDuplicateProduct = (product: Product) => {
    const copy: Product = {
      ...product,
      id: `${product.id}-copy-${Date.now()}`,
      name: `${product.name} (Salinan)`,
    };
    patchNiche((prev) => ({
      ...prev,
      products: [copy, ...prev.products],
    }));
    setEditingProductId(copy.id);
    showToast("Produk berhasil diduplikat");
  };

  const handleDeleteProduct = (productId: string) => {
    patchNiche((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== productId),
    }));
    if (editingProductId === productId) {
      setEditingProductId(null);
    }
    showToast("Produk dihapus");
  };

  const handleMoveProduct = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= activeNiche.products.length) return;
    patchNiche((prev) => {
      const next = [...prev.products];
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      return { ...prev, products: next };
    });
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(activeNiche, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeNiche.id}-cms-config.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Konfigurasi JSON berhasil diunduh");
  };

  const handleImportJson = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as NicheConfig;
        if (!parsed || !Array.isArray(parsed.products) || !parsed.hero) {
          setImportError("Format file JSON tidak valid untuk template ini.");
          return;
        }
        setImportError("");
        replaceNicheConfig(activeId, { ...parsed, id: activeId });
        showToast("Konfigurasi JSON berhasil dimuat ke Live Preview");
      } catch {
        setImportError("Gagal membaca file JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const openImagePicker = (
    currentUrl: string,
    onSelect: (url: string) => void,
  ) => {
    setPickerState({ isOpen: true, currentUrl, onSelect });
  };

  const reviewsList: CmsReviewItem[] =
    cms.reviews ?? DEFAULT_REVIEWS_BY_NICHE[activeId];

  const pitchCtaUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Halo Komose, saya baru mencoba Live Preview "${managementTitle}" (${cms.enabled ? "Paket Dengan CMS" : "Paket Tanpa CMS"}). Saya tertarik membuat website toko seperti ini!`,
  )}`;

  return (
    <div className="flex h-[100dvh] flex-col bg-[#F6F5F1] text-stone-900 font-jakarta overflow-hidden">
      {/* =================================================================== */}
      {/* TOP BAR: [NAMA BRAND] MANAGEMENT SYSTEM                             */}
      {/* =================================================================== */}
      <header className="shrink-0 border-b border-stone-200 bg-white px-3 py-2.5 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Back + Dynamic Product Name */}
          <div className="flex items-center gap-2.5 min-w-0">
            <Link
              href="/templates"
              className="flex h-8 shrink-0 items-center gap-1 rounded-full border border-stone-200 bg-stone-50 px-2.5 text-[11px] font-bold text-stone-700 hover:bg-stone-950 hover:text-white transition-colors"
            >
              <span>←</span>
              <span className="hidden sm:inline">Katalog</span>
            </Link>

            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm shadow-xs"
                style={{
                  backgroundColor: activeNiche.theme.accent,
                  color: activeNiche.theme.accentContrast,
                }}
              >
                {activeNiche.dock.emoji}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="truncate text-sm sm:text-base font-extrabold tracking-tight text-stone-950">
                    {managementTitle}
                  </h1>
                  <span className="hidden lg:inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9.5px] font-bold text-emerald-700 shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Sync
                  </span>
                </div>
                <p className="truncate text-[10px] text-stone-500">
                  Powered by Yapping Techflow ·{" "}
                  {isEdited ? "Ada perubahan kustom" : "Template standar"}
                </p>
              </div>
            </div>
          </div>

          {/* Center: Brand Tenant Switcher */}
          <div className="hidden xl:flex items-center gap-1 rounded-full border border-stone-200 bg-stone-100/80 p-1">
            {niches.map((n) => {
              const isCurrent = n.id === activeId;
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => handleSwitchTenant(n.id)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                    isCurrent
                      ? "bg-white text-stone-950 shadow-xs font-bold"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  <span>{n.dock.emoji}</span>
                  <span>{formatBrandTitle(n.brand)}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Client Package Toggle (Dengan CMS vs Tanpa CMS) + Reset */}
          <div className="flex items-center gap-2">
            {/* Client CMS Package Selector */}
            <div
              className="flex items-center rounded-full border border-stone-200 bg-stone-100 p-0.5"
              title="Simulasi pilihan paket klien: Dengan CMS atau Tanpa CMS"
            >
              <button
                type="button"
                onClick={() => toggleCmsEnabled(true)}
                className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold transition-all ${
                  cms.enabled
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                Dengan CMS
              </button>
              <button
                type="button"
                onClick={() => toggleCmsEnabled(false)}
                className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold transition-all ${
                  !cms.enabled
                    ? "bg-stone-900 text-white shadow-xs"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                Tanpa CMS
              </button>
            </div>

            {/* Reset button */}
            {isEdited &&
              (confirmReset ? (
                <div className="flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-1">
                  <button
                    type="button"
                    onClick={() => {
                      resetNicheConfig(activeId);
                      setConfirmReset(false);
                      setEditingProductId(null);
                      showToast("Konten dikembalikan ke default");
                    }}
                    className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white"
                  >
                    Ya, Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="px-1.5 text-[10px] font-semibold text-stone-600"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="hidden sm:inline-flex items-center rounded-full border border-stone-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-600 hover:border-rose-300 hover:text-rose-700 transition-colors"
                >
                  Reset Default
                </button>
              ))}

            <a
              href={pitchCtaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-stone-950 px-3.5 py-1.5 text-[11px] font-bold text-white hover:bg-stone-800 transition-colors"
            >
              <span>Pesan Paket Ini</span>
              <span className="text-emerald-400">↗</span>
            </a>
          </div>
        </div>

        {/* Mobile / Tablet Tenant + Editor/Preview Switcher */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-2 lg:hidden">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {niches.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => handleSwitchTenant(n.id)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${
                  n.id === activeId
                    ? "bg-stone-950 text-white"
                    : "bg-stone-100 text-stone-600"
                }`}
              >
                {n.dock.emoji} {n.dock.shortLabel}
              </button>
            ))}
          </div>

          <div className="flex items-center rounded-full border border-stone-200 bg-stone-100 p-0.5">
            <button
              type="button"
              onClick={() => setMobilePane("editor")}
              className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                mobilePane === "editor"
                  ? "bg-white text-stone-950 shadow-xs"
                  : "text-stone-500"
              }`}
            >
              ✏️ Editor CMS
            </button>
            <button
              type="button"
              onClick={() => setMobilePane("preview")}
              className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                mobilePane === "preview"
                  ? "bg-white text-stone-950 shadow-xs"
                  : "text-stone-500"
              }`}
            >
              👁️ Live Preview
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-stone-950 px-4 py-2 text-xs font-semibold text-white shadow-xl">
          ✓ {toastMsg}
        </div>
      )}

      {/* =================================================================== */}
      {/* MAIN SPLIT WORKSPACE: EDITOR (LEFT) + LIVE PREVIEW (RIGHT)          */}
      {/* =================================================================== */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* LEFT PANE: CMS DASHBOARD */}
        <aside
          className={`flex h-full w-full flex-col border-r border-stone-200 bg-[#F8F7F4] lg:w-[48%] xl:w-[46%] ${
            mobilePane === "preview" ? "hidden lg:flex" : "flex"
          }`}
        >
          {!cms.enabled ? (
            /* --------------------------------------------------------------- */
            /* MODE TANPA CMS (STATIC WEBSITE) SIMULATOR                       */
            /* --------------------------------------------------------------- */
            <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-10 text-center overflow-y-auto">
              <div className="max-w-md rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-2xl">
                  ⚡
                </div>
                <span className="mt-4 inline-block rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                  Opsi 1 · Tanpa CMS (Static Managed)
                </span>
                <h2 className="mt-3 text-xl font-extrabold text-stone-950">
                  Website Statis Tanpa Dashboard CMS
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-stone-600">
                  Pada mode ini, klien memilih paket{" "}
                  <strong>Tanpa CMS</strong>. Website tetap tampil lengkap &amp;
                  berkecepatan kilat (seperti di Live Preview sebelah kanan),
                  namun tanpa akses editor mandiri — pembaruan harga/produk
                  ditangani oleh tim Yapping Techflow.
                </p>

                <div className="mt-5 space-y-2 rounded-2xl border border-stone-100 bg-stone-50 p-4 text-left text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Tanpa perlu login atau kelola database</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Biaya awal lebih hemat (tanpa modul CMS)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 font-bold">•</span>
                    <span className="text-stone-500">
                      Ingin edit produk, harga, dan banner sendiri setiap saat?
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleCmsEnabled(true)}
                  className="mt-6 w-full rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-colors"
                >
                  Aktifkan {managementTitle} →
                </button>
              </div>
            </div>
          ) : (
            /* --------------------------------------------------------------- */
            /* MODE DENGAN CMS ([NAMA BRAND] MANAGEMENT SYSTEM)                */
            /* --------------------------------------------------------------- */
            <>
              {/* Module Navigation Bar */}
              <nav
                aria-label="Menu CMS"
                className="flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-stone-200 bg-white px-3 py-2.5 no-scrollbar"
              >
                {CMS_TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabChange(tab)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-stone-950 text-white shadow-xs font-bold"
                          : "bg-stone-100/80 text-stone-600 hover:bg-stone-200/70 hover:text-stone-950"
                      }`}
                    >
                      <span>{tab.emoji}</span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Scrollable Editor Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {/* ========================================================= */}
                {/* TAB 1: RINGKASAN (OVERVIEW)                               */}
                {/* ========================================================= */}
                {activeTab === "overview" && (
                  <>
                    {/* Welcome Banner */}
                    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                            ● Paket Aktif: Website + CMS
                          </span>
                          <h2 className="mt-2 text-lg font-extrabold text-stone-950">
                            Selamat Datang di {managementTitle}
                          </h2>
                          <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                            Semua perubahan teks, produk, harga, foto, warna,
                            dan nomor WhatsApp langsung muncul di{" "}
                            <strong>Live Preview</strong> dan otomatis tersimpan.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setMobilePane("preview")}
                          className="lg:hidden rounded-xl bg-stone-950 px-3 py-2 text-xs font-bold text-white"
                        >
                          Lihat Live Preview 👁️
                        </button>
                      </div>

                      {/* Quick Stats */}
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="rounded-xl border border-stone-100 bg-stone-50 p-3">
                          <div className="text-[10px] font-bold uppercase text-stone-400">
                            Produk Aktif
                          </div>
                          <div className="mt-1 text-xl font-extrabold text-stone-950">
                            {activeNiche.products.length}
                          </div>
                        </div>
                        <div className="rounded-xl border border-stone-100 bg-stone-50 p-3">
                          <div className="text-[10px] font-bold uppercase text-stone-400">
                            Item FAQ
                          </div>
                          <div className="mt-1 text-xl font-extrabold text-stone-950">
                            {activeNiche.faqs.length}
                          </div>
                        </div>
                        <div className="rounded-xl border border-stone-100 bg-stone-50 p-3">
                          <div className="text-[10px] font-bold uppercase text-stone-400">
                            Ulasan
                          </div>
                          <div className="mt-1 text-xl font-extrabold text-stone-950">
                            {reviewsList.length}
                          </div>
                        </div>
                        <div className="rounded-xl border border-stone-100 bg-stone-50 p-3">
                          <div className="text-[10px] font-bold uppercase text-stone-400">
                            Status Web
                          </div>
                          <div className="mt-1 text-sm font-extrabold text-emerald-600">
                            ● Online
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <CmsCard
                      title="Aksi Cepat"
                      description="Langsung lompat ke bagian yang paling sering diubah oleh pemilik bisnis."
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            handleTabChange(CMS_TABS[3]);
                            handleAddProduct();
                          }}
                          className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-left text-xs font-bold text-stone-900 hover:border-stone-950 hover:bg-white transition-all"
                        >
                          <span>+ Tambah Produk Baru</span>
                          <span>→</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTabChange(CMS_TABS[2])}
                          className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-left text-xs font-bold text-stone-900 hover:border-stone-950 hover:bg-white transition-all"
                        >
                          <span>✨ Ubah Promo Banner</span>
                          <span>→</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTabChange(CMS_TABS[1])}
                          className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-left text-xs font-bold text-stone-900 hover:border-stone-950 hover:bg-white transition-all"
                        >
                          <span>🎨 Ganti Nama &amp; Warna</span>
                          <span>→</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTabChange(CMS_TABS[5])}
                          className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-left text-xs font-bold text-stone-900 hover:border-stone-950 hover:bg-white transition-all"
                        >
                          <span>📱 Ubah Nomor WhatsApp</span>
                          <span>→</span>
                        </button>
                      </div>
                    </CmsCard>

                    {/* Monthly Maintenance & Client Choice Info */}
                    <CmsCard
                      title="Status Paket & Maintenance Bulanan"
                      description="Nilai tambah mengapa klien tetap berlangganan maintenance bulanan sambil kelola konten mandiri."
                    >
                      <div className="space-y-2 text-xs text-stone-700">
                        <div className="flex items-center justify-between rounded-xl bg-emerald-50/70 border border-emerald-200/70 px-3.5 py-2.5">
                          <span className="font-semibold text-emerald-950">
                            Lisensi {managementTitle}
                          </span>
                          <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold text-white">
                            Aktif
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11.5px] text-stone-600">
                          <div className="rounded-xl border border-stone-100 bg-stone-50 p-2.5">
                            ✓ Cloud Hosting &amp; SSL Certificate
                          </div>
                          <div className="rounded-xl border border-stone-100 bg-stone-50 p-2.5">
                            ✓ Backup Data Mingguan Otomatis
                          </div>
                          <div className="rounded-xl border border-stone-100 bg-stone-50 p-2.5">
                            ✓ Update Keamanan &amp; Performa Next.js
                          </div>
                          <div className="rounded-xl border border-stone-100 bg-stone-50 p-2.5">
                            ✓ Support Teknis Prioritas via WA
                          </div>
                        </div>
                      </div>
                    </CmsCard>

                    {/* Backup & Export JSON */}
                    <CmsCard
                      title="Cadangan Data (Export / Import JSON)"
                      description="Simpan salinan konfigurasi konten website Anda kapan saja."
                    >
                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={handleExportJson}
                          className="rounded-xl bg-stone-950 px-4 py-2 text-xs font-bold text-white hover:bg-stone-800 transition-colors"
                        >
                          ↓ Download Backup JSON
                        </button>
                        <label className="cursor-pointer rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors">
                          ↑ Import File JSON
                          <input
                            type="file"
                            accept="application/json"
                            onChange={handleImportJson}
                            className="hidden"
                          />
                        </label>
                      </div>
                      {importError && (
                        <p className="mt-2 text-xs text-rose-600">{importError}</p>
                      )}
                    </CmsCard>
                  </>
                )}

                {/* ========================================================= */}
                {/* TAB 2: BRAND & TEMA                                       */}
                {/* ========================================================= */}
                {activeTab === "brand" && (
                  <>
                    <CmsCard
                      title="Identitas Brand"
                      description="Ubah nama brand di sini — judul CMS otomatis menyesuaikan menjadi [Nama Brand] Management System."
                    >
                      <div className="space-y-3.5">
                        <CmsField
                          label="Nama Brand"
                          hint={`Title: ${managementTitle}`}
                        >
                          <input
                            type="text"
                            value={activeNiche.brand}
                            onChange={(e) =>
                              patchNiche((prev) => ({
                                ...prev,
                                brand: e.target.value,
                              }))
                            }
                            className={cmsInputClass}
                          />
                        </CmsField>

                        <CmsField label="Subjudul / Niche Bisnis">
                          <input
                            type="text"
                            value={activeNiche.brandSuffix}
                            onChange={(e) =>
                              patchNiche((prev) => ({
                                ...prev,
                                brandSuffix: e.target.value,
                              }))
                            }
                            className={cmsInputClass}
                          />
                        </CmsField>

                        <CmsField label="Tagline Utama">
                          <input
                            type="text"
                            value={activeNiche.tagline}
                            onChange={(e) =>
                              patchNiche((prev) => ({
                                ...prev,
                                tagline: e.target.value,
                              }))
                            }
                            className={cmsInputClass}
                          />
                        </CmsField>

                        <CmsToggle
                          label="Gunakan Logo Teks (Nama Brand) di Navbar"
                          description="Aktifkan jika Anda baru mengganti nama brand agar langsung tampil sebagai logo teks yang rapi."
                          checked={cms.useTextLogo}
                          onChange={(next) =>
                            patchNiche((prev) => {
                              const r = resolveNicheCms(prev);
                              return {
                                ...r,
                                cms: { ...r.cms, useTextLogo: next },
                              };
                            })
                          }
                        />

                        {!cms.useTextLogo && (
                          <CmsField label="URL Logo Gambar">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={activeNiche.logo ?? ""}
                                onChange={(e) =>
                                  patchNiche((prev) => ({
                                    ...prev,
                                    logo: e.target.value,
                                  }))
                                }
                                placeholder="/images/..."
                                className={cmsInputClass}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  openImagePicker(
                                    activeNiche.logo ?? "",
                                    (url) =>
                                      patchNiche((prev) => ({
                                        ...prev,
                                        logo: url,
                                      })),
                                  )
                                }
                                className="shrink-0 rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-800 hover:bg-stone-50"
                              >
                                Pilih
                              </button>
                            </div>
                          </CmsField>
                        )}
                      </div>
                    </CmsCard>

                    <CmsCard
                      title="Palet Warna & Tema Visual"
                      description="Pilih palet warna siap pakai atau atur warna aksen brand secara manual."
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {THEME_PRESETS.map((preset) => {
                          const isSelected =
                            activeNiche.theme.accent.toLowerCase() ===
                            preset.accent.toLowerCase();
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  theme: {
                                    ...prev.theme,
                                    accent: preset.accent,
                                    accentContrast: preset.accentContrast,
                                    background: preset.background,
                                    surface: preset.surface,
                                    text: preset.text,
                                    textMuted: preset.textMuted,
                                    border: preset.border,
                                  },
                                }))
                              }
                              className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                                isSelected
                                  ? "border-stone-950 bg-stone-50 ring-1 ring-stone-950"
                                  : "border-stone-200 bg-white hover:border-stone-400"
                              }`}
                            >
                              <span
                                className="h-6 w-6 shrink-0 rounded-full border border-black/10"
                                style={{ backgroundColor: preset.accent }}
                              />
                              <span className="text-[11px] font-semibold text-stone-900 leading-tight">
                                {preset.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-stone-100">
                        <CmsField label="Warna Aksen Kustom">
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={activeNiche.theme.accent}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  theme: {
                                    ...prev.theme,
                                    accent: e.target.value,
                                  },
                                }))
                              }
                              className="h-9 w-12 cursor-pointer rounded-lg border border-stone-200 bg-white p-0.5"
                            />
                            <input
                              type="text"
                              value={activeNiche.theme.accent}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  theme: {
                                    ...prev.theme,
                                    accent: e.target.value,
                                  },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </div>
                        </CmsField>

                        <CmsField label="Warna Latar Halaman">
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={activeNiche.theme.background}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  theme: {
                                    ...prev.theme,
                                    background: e.target.value,
                                  },
                                }))
                              }
                              className="h-9 w-12 cursor-pointer rounded-lg border border-stone-200 bg-white p-0.5"
                            />
                            <input
                              type="text"
                              value={activeNiche.theme.background}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  theme: {
                                    ...prev.theme,
                                    background: e.target.value,
                                  },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </div>
                        </CmsField>
                      </div>
                    </CmsCard>

                    <CmsCard
                      title="Tampilkan / Sembunyikan Seksi Halaman"
                      description="Nyalakan atau matikan modul halaman sesuai kebutuhan bisnis saat ini."
                    >
                      <div className="space-y-2.5">
                        {(
                          [
                            {
                              key: "showAnnouncement",
                              label: "Banner Promo Atas",
                              desc: "Bar pengumuman promo & slot urgent di paling atas.",
                            },
                            {
                              key: "showCustomizer",
                              label: "Kalkulator / Customizer Interaktif",
                              desc: "Widget hitung budget / custom cake / hitung porsi.",
                            },
                            {
                              key: "showStory",
                              label: "Cerita Brand & Studio",
                              desc: "Profil bisnis, nilai brand, dan lokasi studio.",
                            },
                            {
                              key: "showReviews",
                              label: "Ulasan & Testimoni Pelanggan",
                              desc: "Bukti sosial rating dan review pembeli.",
                            },
                            {
                              key: "showFaq",
                              label: "Bagian FAQ (Tanya Jawab)",
                              desc: "Daftar pertanyaan yang sering diajukan.",
                            },
                          ] as const
                        ).map((item) => (
                          <CmsToggle
                            key={item.key}
                            label={item.label}
                            description={item.desc}
                            checked={cms.visibility[item.key]}
                            onChange={(next) =>
                              patchNiche((prev) => {
                                const r = resolveNicheCms(prev);
                                return {
                                  ...r,
                                  cms: {
                                    ...r.cms,
                                    visibility: {
                                      ...r.cms.visibility,
                                      [item.key]: next,
                                    },
                                  },
                                };
                              })
                            }
                          />
                        ))}
                      </div>
                    </CmsCard>
                  </>
                )}

                {/* ========================================================= */}
                {/* TAB 3: HERO & PROMO                                       */}
                {/* ========================================================= */}
                {activeTab === "hero" && (
                  <>
                    <CmsCard
                      title="Banner Promo & Pengumuman Atas"
                      description="Tampil di bar paling atas website untuk menginfokan promo atau slot urgent hari ini."
                    >
                      <div className="space-y-3">
                        <CmsField label="Label Status Promo">
                          <input
                            type="text"
                            value={activeNiche.announcement.status}
                            onChange={(e) =>
                              patchNiche((prev) => ({
                                ...prev,
                                announcement: {
                                  ...prev.announcement,
                                  status: e.target.value,
                                },
                              }))
                            }
                            className={cmsInputClass}
                          />
                        </CmsField>

                        <CmsField label="Teks Pengumuman Utama">
                          <input
                            type="text"
                            value={activeNiche.announcement.messages[0] ?? ""}
                            onChange={(e) =>
                              patchNiche((prev) => {
                                const msgs = [...prev.announcement.messages];
                                msgs[0] = e.target.value;
                                return {
                                  ...prev,
                                  announcement: {
                                    ...prev.announcement,
                                    messages: msgs,
                                  },
                                };
                              })
                            }
                            className={cmsInputClass}
                          />
                        </CmsField>

                        <CmsField label="Info Cabang / Area (Baris Tengah)">
                          <input
                            type="text"
                            value={activeNiche.announcement.messages[1] ?? ""}
                            onChange={(e) =>
                              patchNiche((prev) => {
                                const msgs = [...prev.announcement.messages];
                                msgs[1] = e.target.value;
                                return {
                                  ...prev,
                                  announcement: {
                                    ...prev.announcement,
                                    messages: msgs,
                                  },
                                };
                              })
                            }
                            className={cmsInputClass}
                          />
                        </CmsField>
                      </div>
                    </CmsCard>

                    <CmsCard
                      title="Headline & Copy Hero Utama"
                      description="Bagian pertama yang langsung dilihat calon pembeli saat membuka website."
                    >
                      <div className="space-y-3.5">
                        <CmsField label="Kicker / Label Lokasi">
                          <input
                            type="text"
                            value={activeNiche.hero.kicker}
                            onChange={(e) =>
                              patchNiche((prev) => ({
                                ...prev,
                                hero: { ...prev.hero, kicker: e.target.value },
                              }))
                            }
                            className={cmsInputClass}
                          />
                        </CmsField>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <CmsField label="Judul Baris 1">
                            <input
                              type="text"
                              value={activeNiche.hero.titleLead}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  hero: {
                                    ...prev.hero,
                                    titleLead: e.target.value,
                                  },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>
                          <CmsField label="Kata Highlight (Warna)">
                            <input
                              type="text"
                              value={activeNiche.hero.titleAccent}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  hero: {
                                    ...prev.hero,
                                    titleAccent: e.target.value,
                                  },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>
                          <CmsField label="Judul Baris 3">
                            <input
                              type="text"
                              value={activeNiche.hero.titleTail}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  hero: {
                                    ...prev.hero,
                                    titleTail: e.target.value,
                                  },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>
                        </div>

                        <CmsField label="Deskripsi Hero">
                          <textarea
                            rows={3}
                            value={activeNiche.hero.description}
                            onChange={(e) =>
                              patchNiche((prev) => ({
                                ...prev,
                                hero: {
                                  ...prev.hero,
                                  description: e.target.value,
                                },
                              }))
                            }
                            className={cmsInputClass}
                          />
                        </CmsField>

                        <div className="grid grid-cols-2 gap-2.5">
                          <CmsField label="Tombol CTA Utama">
                            <input
                              type="text"
                              value={activeNiche.hero.primaryCta}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  hero: {
                                    ...prev.hero,
                                    primaryCta: e.target.value,
                                  },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>
                          <CmsField label="Tombol CTA Kedua">
                            <input
                              type="text"
                              value={activeNiche.hero.secondaryCta}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  hero: {
                                    ...prev.hero,
                                    secondaryCta: e.target.value,
                                  },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>
                        </div>
                      </div>
                    </CmsCard>

                    <CmsCard
                      title="Statistik Keunggulan (3 Poin)"
                      description="Angka kepercayaan yang tampil di bagian Hero."
                    >
                      <div className="space-y-3">
                        {activeNiche.hero.stats.map((stat, idx) => (
                          <div
                            key={idx}
                            className="grid grid-cols-2 gap-2.5 rounded-xl border border-stone-100 bg-stone-50/70 p-2.5"
                          >
                            <CmsField label={`Angka #${idx + 1}`}>
                              <input
                                type="text"
                                value={stat.value}
                                onChange={(e) =>
                                  patchNiche((prev) => {
                                    const nextStats = [...prev.hero.stats];
                                    nextStats[idx] = {
                                      ...nextStats[idx],
                                      value: e.target.value,
                                    };
                                    return {
                                      ...prev,
                                      hero: { ...prev.hero, stats: nextStats },
                                    };
                                  })
                                }
                                className={cmsInputClass}
                              />
                            </CmsField>
                            <CmsField label={`Keterangan #${idx + 1}`}>
                              <input
                                type="text"
                                value={stat.label}
                                onChange={(e) =>
                                  patchNiche((prev) => {
                                    const nextStats = [...prev.hero.stats];
                                    nextStats[idx] = {
                                      ...nextStats[idx],
                                      label: e.target.value,
                                    };
                                    return {
                                      ...prev,
                                      hero: { ...prev.hero, stats: nextStats },
                                    };
                                  })
                                }
                                className={cmsInputClass}
                              />
                            </CmsField>
                          </div>
                        ))}
                      </div>
                    </CmsCard>

                    <CmsCard
                      title="Foto Galeri Hero"
                      description="Klik 'Ganti Foto' untuk mengganti foto utama atau foto polaroid di Hero."
                    >
                      <div className="space-y-3">
                        {activeNiche.hero.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50/60 p-2.5"
                          >
                            <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-white">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1.5">
                              <input
                                type="text"
                                value={img.caption ?? ""}
                                placeholder="Caption foto..."
                                onChange={(e) =>
                                  patchNiche((prev) => {
                                    const imgs = [...prev.hero.images];
                                    imgs[idx] = {
                                      ...imgs[idx],
                                      caption: e.target.value,
                                    };
                                    return {
                                      ...prev,
                                      hero: { ...prev.hero, images: imgs },
                                    };
                                  })
                                }
                                className={cmsInputClass}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                openImagePicker(img.src, (url) =>
                                  patchNiche((prev) => {
                                    const imgs = [...prev.hero.images];
                                    imgs[idx] = { ...imgs[idx], src: url };
                                    return {
                                      ...prev,
                                      hero: { ...prev.hero, images: imgs },
                                    };
                                  }),
                                )
                              }
                              className="shrink-0 rounded-xl border border-stone-300 bg-white px-3 py-2 text-[11px] font-bold text-stone-800 hover:bg-stone-100"
                            >
                              Ganti Foto
                            </button>
                          </div>
                        ))}
                      </div>
                    </CmsCard>
                  </>
                )}

                {/* ========================================================= */}
                {/* TAB 4: PRODUK & HARGA (CRUD PENUH)                        */}
                {/* ========================================================= */}
                {activeTab === "products" && (
                  <>
                    {editingProduct ? (
                      /* Product Edit Form */
                      <CmsCard
                        title={`Edit Produk: ${editingProduct.name}`}
                        description="Perubahan harga, foto, atau deskripsi langsung tampil di Katalog Live Preview."
                        action={
                          <button
                            type="button"
                            onClick={() => setEditingProductId(null)}
                            className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-bold text-stone-800 hover:bg-stone-100"
                          >
                            ← Kembali ke Daftar
                          </button>
                        }
                      >
                        <div className="space-y-4">
                          {/* Image + Quick Picker */}
                          <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-stone-50/70 p-3">
                            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-white">
                              <Image
                                src={editingProduct.image}
                                alt={editingProduct.name}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="text-xs font-bold text-stone-900">
                                Foto Produk
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    openImagePicker(editingProduct.image, (url) =>
                                      updateProduct(editingProduct.id, {
                                        image: url,
                                      }),
                                    )
                                  }
                                  className="rounded-xl bg-stone-950 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-stone-800"
                                >
                                  Pilih dari Galeri / Upload
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <CmsField label="Nama Produk">
                              <input
                                type="text"
                                value={editingProduct.name}
                                onChange={(e) =>
                                  updateProduct(editingProduct.id, {
                                    name: e.target.value,
                                  })
                                }
                                className={cmsInputClass}
                              />
                            </CmsField>
                            <CmsField label="Subtitle Singkat">
                              <input
                                type="text"
                                value={editingProduct.subtitle}
                                onChange={(e) =>
                                  updateProduct(editingProduct.id, {
                                    subtitle: e.target.value,
                                  })
                                }
                                className={cmsInputClass}
                              />
                            </CmsField>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            <CmsField label="Harga (Rp)">
                              <input
                                type="number"
                                min={0}
                                step={1000}
                                value={editingProduct.price}
                                onChange={(e) =>
                                  updateProduct(editingProduct.id, {
                                    price: Math.max(0, Number(e.target.value)),
                                  })
                                }
                                className={cmsInputClass}
                              />
                            </CmsField>
                            <CmsField label="Satuan">
                              <input
                                type="text"
                                value={editingProduct.unitLabel}
                                onChange={(e) =>
                                  updateProduct(editingProduct.id, {
                                    unitLabel: e.target.value,
                                  })
                                }
                                className={cmsInputClass}
                              />
                            </CmsField>
                            <CmsField label="Min. Order">
                              <input
                                type="number"
                                min={1}
                                value={editingProduct.minQty}
                                onChange={(e) =>
                                  updateProduct(editingProduct.id, {
                                    minQty: Math.max(1, Number(e.target.value)),
                                  })
                                }
                                className={cmsInputClass}
                              />
                            </CmsField>
                            <CmsField label="Kelipatan">
                              <input
                                type="number"
                                min={1}
                                value={editingProduct.step}
                                onChange={(e) =>
                                  updateProduct(editingProduct.id, {
                                    step: Math.max(1, Number(e.target.value)),
                                  })
                                }
                                className={cmsInputClass}
                              />
                            </CmsField>
                          </div>

                          <CmsField label="Deskripsi Produk">
                            <textarea
                              rows={3}
                              value={editingProduct.description}
                              onChange={(e) =>
                                updateProduct(editingProduct.id, {
                                  description: e.target.value,
                                })
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <CmsField label="Label Badge (Opsional)">
                              <input
                                type="text"
                                value={editingProduct.badge ?? ""}
                                placeholder="Misal: Best Seller"
                                onChange={(e) =>
                                  updateProduct(editingProduct.id, {
                                    badge: e.target.value,
                                  })
                                }
                                className={cmsInputClass}
                              />
                            </CmsField>

                            <CmsField label="Warna Badge">
                              <select
                                value={editingProduct.badgeTone ?? "accent"}
                                onChange={(e) =>
                                  updateProduct(editingProduct.id, {
                                    badgeTone: e.target.value as Product["badgeTone"],
                                  })
                                }
                                className={cmsInputClass}
                              >
                                <option value="accent">Warna Aksen Brand</option>
                                <option value="neutral">Gelap / Kontras</option>
                                <option value="muted">Netral Terang</option>
                              </select>
                            </CmsField>
                          </div>

                          <CmsField
                            label="Poin Keunggulan (pisahkan dengan koma)"
                            hint="Contoh: Free Lilin, Fresh Cream"
                          >
                            <input
                              type="text"
                              value={editingProduct.highlights.join(", ")}
                              onChange={(e) =>
                                updateProduct(editingProduct.id, {
                                  highlights: e.target.value
                                    .split(",")
                                    .map((s) => s.trim())
                                    .filter(Boolean),
                                })
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>

                          <CmsToggle
                            label="Tandai 'Sold Out Soon' / Stok Terbatas"
                            description="Menampilkan badge peringatan stok menipis di kartu produk."
                            checked={Boolean(editingProduct.soldOutSoon)}
                            onChange={(next) =>
                              updateProduct(editingProduct.id, {
                                soldOutSoon: next,
                              })
                            }
                          />

                          <div className="flex items-center justify-between border-t border-stone-100 pt-3">
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(editingProduct.id)}
                              className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100"
                            >
                              Hapus Produk
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingProductId(null)}
                              className="rounded-xl bg-stone-950 px-5 py-2 text-xs font-bold text-white hover:bg-stone-800"
                            >
                              Selesai Edit ✓
                            </button>
                          </div>
                        </div>
                      </CmsCard>
                    ) : (
                      /* Product List + Showcase Header */
                      <>
                        <CmsCard
                          title="Judul Katalog Produk"
                          description="Atur teks bagian pengantar katalog produk di website."
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <CmsField label="Kicker Katalog">
                              <input
                                type="text"
                                value={activeNiche.showcase.kicker}
                                onChange={(e) =>
                                  patchNiche((prev) => ({
                                    ...prev,
                                    showcase: {
                                      ...prev.showcase,
                                      kicker: e.target.value,
                                    },
                                  }))
                                }
                                className={cmsInputClass}
                              />
                            </CmsField>
                            <CmsField label="Judul Katalog">
                              <input
                                type="text"
                                value={activeNiche.showcase.title}
                                onChange={(e) =>
                                  patchNiche((prev) => ({
                                    ...prev,
                                    showcase: {
                                      ...prev.showcase,
                                      title: e.target.value,
                                    },
                                  }))
                                }
                                className={cmsInputClass}
                              />
                            </CmsField>
                          </div>
                        </CmsCard>

                        <CmsCard
                          title={`Daftar Produk & Menu (${activeNiche.products.length})`}
                          description="Tambah, ubah harga, ganti foto, atau geser urutan produk."
                          action={
                            <button
                              type="button"
                              onClick={handleAddProduct}
                              className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
                            >
                              + Tambah Produk
                            </button>
                          }
                        >
                          <input
                            type="text"
                            value={productSearch}
                            onChange={(e) => setProductSearch(e.target.value)}
                            placeholder="Cari nama produk..."
                            className={`${cmsInputClass} mb-3`}
                          />

                          <div className="space-y-2.5">
                            {filteredProducts.map((product, idx) => (
                              <div
                                key={product.id}
                                className="flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-stone-50/60 p-2.5 hover:bg-white hover:border-stone-300 transition-all"
                              >
                                <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-white">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                  />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <h4 className="truncate text-xs font-bold text-stone-950">
                                      {product.name}
                                    </h4>
                                    {product.badge && (
                                      <span className="shrink-0 rounded-full bg-stone-200 px-2 py-0.5 text-[9px] font-bold text-stone-700">
                                        {product.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="truncate text-[11px] text-stone-500">
                                    {formatIDR(product.price)} / {product.unitLabel} ·{" "}
                                    {product.subtitle}
                                  </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleMoveProduct(idx, -1)}
                                    disabled={idx === 0}
                                    title="Geser ke atas"
                                    className="h-7 w-7 rounded-lg border border-stone-200 bg-white text-xs text-stone-600 hover:bg-stone-100 disabled:opacity-30"
                                  >
                                    ↑
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleMoveProduct(idx, 1)}
                                    disabled={idx === filteredProducts.length - 1}
                                    title="Geser ke bawah"
                                    className="h-7 w-7 rounded-lg border border-stone-200 bg-white text-xs text-stone-600 hover:bg-stone-100 disabled:opacity-30"
                                  >
                                    ↓
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDuplicateProduct(product)
                                    }
                                    title="Duplikat"
                                    className="hidden sm:inline-flex h-7 items-center rounded-lg border border-stone-200 bg-white px-2 text-[10px] font-semibold text-stone-700 hover:bg-stone-100"
                                  >
                                    Duplikat
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingProductId(product.id)}
                                    className="h-7 rounded-lg bg-stone-950 px-2.5 text-[11px] font-bold text-white hover:bg-stone-800"
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            ))}

                            {filteredProducts.length === 0 && (
                              <p className="py-6 text-center text-xs text-stone-500">
                                Tidak ada produk yang cocok dengan pencarian Anda.
                              </p>
                            )}
                          </div>
                        </CmsCard>
                      </>
                    )}
                  </>
                )}

                {/* ========================================================= */}
                {/* TAB 5: CERITA, ULASAN & FAQ                               */}
                {/* ========================================================= */}
                {activeTab === "content" && (
                  <>
                    {/* Sub-tab Switcher */}
                    <div className="flex items-center gap-1.5 rounded-2xl border border-stone-200 bg-white p-1.5">
                      {(
                        [
                          { id: "story", label: "📖 Cerita Brand", section: "story" },
                          { id: "reviews", label: "⭐ Ulasan", section: "reviews" },
                          { id: "faq", label: "❓ FAQ", section: "faq" },
                        ] as const
                      ).map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => {
                            setContentSubTab(st.id);
                            triggerPreviewScroll(st.section);
                          }}
                          className={`flex-1 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                            contentSubTab === st.id
                              ? "bg-stone-950 text-white"
                              : "text-stone-600 hover:bg-stone-100"
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>

                    {contentSubTab === "story" && (
                      <CmsCard
                        title="Cerita Brand & Filosofi"
                        description="Ceritakan keunggulan usaha Anda untuk membangun kepercayaan calon pembeli."
                      >
                        <div className="space-y-3.5">
                          <CmsField label="Label Kicker">
                            <input
                              type="text"
                              value={activeNiche.story.kicker}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  story: { ...prev.story, kicker: e.target.value },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>
                          <CmsField label="Judul Cerita">
                            <input
                              type="text"
                              value={activeNiche.story.title}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  story: { ...prev.story, title: e.target.value },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>
                          <CmsField label="Paragraf 1">
                            <textarea
                              rows={3}
                              value={activeNiche.story.paragraphs[0] ?? ""}
                              onChange={(e) =>
                                patchNiche((prev) => {
                                  const nextP = [...prev.story.paragraphs];
                                  nextP[0] = e.target.value;
                                  return {
                                    ...prev,
                                    story: { ...prev.story, paragraphs: nextP },
                                  };
                                })
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>
                          <CmsField label="Paragraf 2">
                            <textarea
                              rows={3}
                              value={activeNiche.story.paragraphs[1] ?? ""}
                              onChange={(e) =>
                                patchNiche((prev) => {
                                  const nextP = [...prev.story.paragraphs];
                                  nextP[1] = e.target.value;
                                  return {
                                    ...prev,
                                    story: { ...prev.story, paragraphs: nextP },
                                  };
                                })
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>
                          <CmsField label="Kutipan / Quote">
                            <input
                              type="text"
                              value={activeNiche.story.quote}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  story: { ...prev.story, quote: e.target.value },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {activeNiche.story.images.map((sImg, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50/70 p-2.5"
                              >
                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-stone-200">
                                  <Image
                                    src={sImg.src}
                                    alt={sImg.alt}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    openImagePicker(sImg.src, (url) =>
                                      patchNiche((prev) => {
                                        const nextImgs: [
                                          typeof prev.story.images[0],
                                          typeof prev.story.images[1],
                                        ] = [...prev.story.images] as [
                                          typeof prev.story.images[0],
                                          typeof prev.story.images[1],
                                        ];
                                        nextImgs[idx] = {
                                          ...nextImgs[idx],
                                          src: url,
                                        };
                                        return {
                                          ...prev,
                                          story: {
                                            ...prev.story,
                                            images: nextImgs,
                                          },
                                        };
                                      }),
                                    )
                                  }
                                  className="rounded-lg border border-stone-300 bg-white px-2.5 py-1.5 text-[11px] font-bold text-stone-800 hover:bg-stone-100"
                                >
                                  Ganti Foto #{idx + 1}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CmsCard>
                    )}

                    {contentSubTab === "reviews" && (
                      <CmsCard
                        title={`Kelola Ulasan Pelanggan (${reviewsList.length})`}
                        description="Tambahkan testimoni terbaru dari pembeli untuk meningkatkan konversi."
                        action={
                          <button
                            type="button"
                            onClick={() => {
                              const nextRev: CmsReviewItem = {
                                id: `rev-${Date.now()}`,
                                category:
                                  reviewsList[0]?.category || "all",
                                name: "Pelanggan Baru",
                                location: "Jakarta Selatan",
                                avatar: "PB",
                                stars: 5,
                                tag: `Order via ${activeNiche.brand}`,
                                date: "Hari ini",
                                review:
                                  "Pelayanan cepat, hasil sangat memuaskan dan rapi!",
                              };
                              patchNiche((prev) => {
                                const r = resolveNicheCms(prev);
                                return {
                                  ...r,
                                  cms: {
                                    ...r.cms,
                                    reviews: [nextRev, ...reviewsList],
                                  },
                                };
                              });
                              showToast("Ulasan baru ditambahkan");
                            }}
                            className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                          >
                            + Tambah Ulasan
                          </button>
                        }
                      >
                        <div className="space-y-3">
                          {reviewsList.map((rev, idx) => (
                            <div
                              key={rev.id}
                              className="space-y-2.5 rounded-2xl border border-stone-200 bg-stone-50/70 p-3.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-bold text-stone-500">
                                  Ulasan #{idx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    patchNiche((prev) => {
                                      const r = resolveNicheCms(prev);
                                      return {
                                        ...r,
                                        cms: {
                                          ...r.cms,
                                          reviews: reviewsList.filter(
                                            (item) => item.id !== rev.id,
                                          ),
                                        },
                                      };
                                    })
                                  }
                                  className="text-[11px] font-bold text-rose-600 hover:underline"
                                >
                                  Hapus
                                </button>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={rev.name}
                                  placeholder="Nama pelanggan"
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const initials = val
                                      .split(/\s+/)
                                      .slice(0, 2)
                                      .map((w) => w[0]?.toUpperCase() ?? "")
                                      .join("");
                                    patchNiche((prev) => {
                                      const r = resolveNicheCms(prev);
                                      return {
                                        ...r,
                                        cms: {
                                          ...r.cms,
                                          reviews: reviewsList.map((item) =>
                                            item.id === rev.id
                                              ? {
                                                  ...item,
                                                  name: val,
                                                  avatar: initials || "CL",
                                                }
                                              : item,
                                          ),
                                        },
                                      };
                                    });
                                  }}
                                  className={cmsInputClass}
                                />
                                <input
                                  type="text"
                                  value={rev.location}
                                  placeholder="Kota / Lokasi"
                                  onChange={(e) =>
                                    patchNiche((prev) => {
                                      const r = resolveNicheCms(prev);
                                      return {
                                        ...r,
                                        cms: {
                                          ...r.cms,
                                          reviews: reviewsList.map((item) =>
                                            item.id === rev.id
                                              ? { ...item, location: e.target.value }
                                              : item,
                                          ),
                                        },
                                      };
                                    })
                                  }
                                  className={cmsInputClass}
                                />
                              </div>
                              <textarea
                                rows={2}
                                value={rev.review}
                                onChange={(e) =>
                                  patchNiche((prev) => {
                                    const r = resolveNicheCms(prev);
                                    return {
                                      ...r,
                                      cms: {
                                        ...r.cms,
                                        reviews: reviewsList.map((item) =>
                                          item.id === rev.id
                                            ? { ...item, review: e.target.value }
                                            : item,
                                        ),
                                      },
                                    };
                                  })
                                }
                                className={cmsInputClass}
                              />
                            </div>
                          ))}
                        </div>
                      </CmsCard>
                    )}

                    {contentSubTab === "faq" && (
                      <CmsCard
                        title={`Kelola FAQ (${activeNiche.faqs.length})`}
                        description="Jawab pertanyaan umum agar calon pembeli lebih yakin sebelum chat WhatsApp."
                        action={
                          <button
                            type="button"
                            onClick={() => {
                              patchNiche((prev) => ({
                                ...prev,
                                faqs: [
                                  ...prev.faqs,
                                  {
                                    question: "Pertanyaan baru dari pelanggan?",
                                    answer:
                                      "Tulis jawaban yang singkat, jelas, dan meyakinkan di sini.",
                                  },
                                ],
                              }));
                              showToast("Pertanyaan FAQ ditambahkan");
                            }}
                            className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                          >
                            + Tambah FAQ
                          </button>
                        }
                      >
                        <div className="space-y-3">
                          {activeNiche.faqs.map((faq, idx) => (
                            <div
                              key={idx}
                              className="space-y-2 rounded-2xl border border-stone-200 bg-stone-50/70 p-3.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-stone-500">
                                  FAQ #{idx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    patchNiche((prev) => ({
                                      ...prev,
                                      faqs: prev.faqs.filter((_, i) => i !== idx),
                                    }))
                                  }
                                  className="text-[11px] font-bold text-rose-600 hover:underline"
                                >
                                  Hapus
                                </button>
                              </div>
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) =>
                                  patchNiche((prev) => ({
                                    ...prev,
                                    faqs: prev.faqs.map((f, i) =>
                                      i === idx
                                        ? { ...f, question: e.target.value }
                                        : f,
                                    ),
                                  }))
                                }
                                className={cmsInputClass}
                              />
                              <textarea
                                rows={2}
                                value={faq.answer}
                                onChange={(e) =>
                                  patchNiche((prev) => ({
                                    ...prev,
                                    faqs: prev.faqs.map((f, i) =>
                                      i === idx
                                        ? { ...f, answer: e.target.value }
                                        : f,
                                    ),
                                  }))
                                }
                                className={cmsInputClass}
                              />
                            </div>
                          ))}
                        </div>
                      </CmsCard>
                    )}
                  </>
                )}

                {/* ========================================================= */}
                {/* TAB 6: KONTAK, WHATSAPP & CTA                             */}
                {/* ========================================================= */}
                {activeTab === "contact" && (
                  <>
                    <CmsCard
                      title="Routing Order WhatsApp"
                      description="Semua tombol pesan dan checkout keranjang akan mengarah ke nomor WhatsApp ini."
                    >
                      <div className="space-y-3.5">
                        <CmsField
                          label="Nomor WhatsApp Order (format 628...)"
                          hint={`Link: wa.me/${cms.whatsappOrderNumber}`}
                        >
                          <input
                            type="text"
                            value={cms.whatsappOrderNumber}
                            onChange={(e) =>
                              patchNiche((prev) => {
                                const r = resolveNicheCms(prev);
                                const digits = e.target.value.replace(/[^0-9]/g, "");
                                return {
                                  ...r,
                                  cms: {
                                    ...r.cms,
                                    whatsappOrderNumber: digits,
                                  },
                                };
                              })
                            }
                            placeholder="6281234567890"
                            className={cmsInputClass}
                          />
                        </CmsField>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <CmsField label="Nomor Tampil di Footer">
                            <input
                              type="text"
                              value={activeNiche.footer.phone}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  footer: { ...prev.footer, phone: e.target.value },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>
                          <CmsField label="Instagram">
                            <input
                              type="text"
                              value={activeNiche.footer.instagram}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  footer: {
                                    ...prev.footer,
                                    instagram: e.target.value,
                                  },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <CmsField label="Email Bisnis">
                            <input
                              type="email"
                              value={activeNiche.footer.email}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  footer: { ...prev.footer, email: e.target.value },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>
                          <CmsField label="Jam Operasional">
                            <input
                              type="text"
                              value={activeNiche.footer.note}
                              onChange={(e) =>
                                patchNiche((prev) => ({
                                  ...prev,
                                  footer: { ...prev.footer, note: e.target.value },
                                }))
                              }
                              className={cmsInputClass}
                            />
                          </CmsField>
                        </div>

                        <CmsField label="Alamat Studio / Dapur">
                          <textarea
                            rows={2}
                            value={activeNiche.footer.address}
                            onChange={(e) =>
                              patchNiche((prev) => ({
                                ...prev,
                                footer: { ...prev.footer, address: e.target.value },
                              }))
                            }
                            className={cmsInputClass}
                          />
                        </CmsField>
                      </div>
                    </CmsCard>

                    <CmsCard
                      title="CTA Penutup & Catatan Checkout"
                      description="Tampil di bagian bawah halaman dan formulir keranjang belanja."
                    >
                      <div className="space-y-3.5">
                        <CmsField label="Judul CTA Penutup">
                          <input
                            type="text"
                            value={activeNiche.cta.title}
                            onChange={(e) =>
                              patchNiche((prev) => ({
                                ...prev,
                                cta: { ...prev.cta, title: e.target.value },
                              }))
                            }
                            className={cmsInputClass}
                          />
                        </CmsField>
                        <CmsField label="Deskripsi CTA Penutup">
                          <textarea
                            rows={2}
                            value={activeNiche.cta.description}
                            onChange={(e) =>
                              patchNiche((prev) => ({
                                ...prev,
                                cta: {
                                  ...prev.cta,
                                  description: e.target.value,
                                },
                              }))
                            }
                            className={cmsInputClass}
                          />
                        </CmsField>
                        <CmsField label="Teks Tombol CTA">
                          <input
                            type="text"
                            value={activeNiche.cta.button}
                            onChange={(e) =>
                              patchNiche((prev) => ({
                                ...prev,
                                cta: { ...prev.cta, button: e.target.value },
                              }))
                            }
                            className={cmsInputClass}
                          />
                        </CmsField>
                        <CmsField label="Catatan Pengiriman di Keranjang">
                          <input
                            type="text"
                            value={activeNiche.form.deliveryNote}
                            onChange={(e) =>
                              patchNiche((prev) => ({
                                ...prev,
                                form: {
                                  ...prev.form,
                                  deliveryNote: e.target.value,
                                },
                              }))
                            }
                            className={cmsInputClass}
                          />
                        </CmsField>
                      </div>
                    </CmsCard>
                  </>
                )}
              </div>
            </>
          )}
        </aside>

        {/* RIGHT PANE: LIVE PREVIEW STAGE */}
        <main
          className={`h-full flex-1 flex-col min-w-0 ${
            mobilePane === "editor" ? "hidden lg:flex" : "flex"
          }`}
        >
          <CmsPreviewFrame
            niche={activeNiche}
            cmsEnabled={cms.enabled}
            viewport={viewport}
            onViewportChange={setViewport}
            scrollCommand={scrollCommand}
          />
        </main>
      </div>

      {/* Visual Media Picker Modal */}
      <ImagePickerModal
        isOpen={pickerState.isOpen}
        currentUrl={pickerState.currentUrl}
        defaultCategory={activeId}
        onSelect={pickerState.onSelect}
        onClose={() => setPickerState((s) => ({ ...s, isOpen: false }))}
      />
    </div>
  );
}

