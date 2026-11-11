"use client";

import Image from "next/image";
import { useState, type ChangeEvent } from "react";
import { PRESET_IMAGES } from "@/lib/cms";
import type { NicheId } from "@/types/landing";

interface ImagePickerModalProps {
  isOpen: boolean;
  currentUrl: string;
  defaultCategory: NicheId;
  onSelect: (url: string) => void;
  onClose: () => void;
}

export function ImagePickerModal({
  isOpen,
  currentUrl,
  defaultCategory,
  onSelect,
  onClose,
}: ImagePickerModalProps) {
  const [filter, setFilter] = useState<NicheId | "all">(defaultCategory);
  const [customUrl, setCustomUrl] = useState(currentUrl);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const filtered = PRESET_IMAGES.filter(
    (img) => filter === "all" || img.category === filter,
  );

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) {
      setErrorMsg("Ukuran gambar maksimal 1.5 MB agar penyimpanan browser tetap ringan.");
      return;
    }
    setErrorMsg("");
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onSelect(reader.result);
        onClose();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Pilih Gambar Media"
    >
      <div className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
          <div>
            <h3 className="text-base font-bold text-stone-950 font-jakarta">
              Pilih Media / Gambar
            </h3>
            <p className="text-xs text-stone-500">
              Pilih dari galeri aset siap pakai, tempel URL gambar, atau unggah foto dari perangkat.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup galeri media"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
          >
            ✕
          </button>
        </div>

        {/* URL & Upload Bar */}
        <div className="border-b border-stone-100 bg-stone-50/70 px-6 py-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Tempel URL gambar (https://... atau /images/...)"
              className="flex-1 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                if (!customUrl.trim()) return;
                onSelect(customUrl.trim());
                onClose();
              }}
              className="rounded-xl bg-stone-950 px-4 py-2 text-xs font-bold text-white hover:bg-stone-800 transition-colors shrink-0"
            >
              Pakai URL Ini
            </button>
            <label className="cursor-pointer rounded-xl border border-stone-300 bg-white px-4 py-2 text-center text-xs font-semibold text-stone-800 hover:bg-stone-100 transition-colors shrink-0">
              Upload Foto
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          {errorMsg && (
            <p className="text-[11px] font-medium text-rose-600">{errorMsg}</p>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(
              [
                { id: "all", label: "Semua Aset" },
                { id: "patisserie", label: "🎂 Patisserie" },
                { id: "florist", label: "💐 Florist" },
                { id: "catering", label: "🥗 Catering" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                  filter === tab.id
                    ? "bg-stone-950 text-white"
                    : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {filtered.map((item) => {
              const isSelected = currentUrl === item.src;
              return (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => {
                    onSelect(item.src);
                    onClose();
                  }}
                  className={`group overflow-hidden rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-emerald-600 ring-2 ring-emerald-500/30 bg-emerald-50/30"
                      : "border-stone-200 bg-white hover:border-stone-400"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      sizes="180px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {isSelected && (
                      <span className="absolute right-2 top-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[9px] font-bold text-white">
                        Aktif
                      </span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="truncate text-[11px] font-semibold text-stone-800">
                      {item.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

