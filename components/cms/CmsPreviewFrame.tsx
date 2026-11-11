"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CLIENT_PREVIEW_DOMAINS } from "@/lib/cms";
import type { NicheConfig } from "@/types/landing";

export type PreviewViewport = "desktop" | "tablet" | "mobile";

interface CmsPreviewFrameProps {
  niche: NicheConfig;
  cmsEnabled: boolean;
  viewport: PreviewViewport;
  onViewportChange: (vp: PreviewViewport) => void;
  scrollCommand?: { sectionId: string; nonce: number } | null;
}

const LOGICAL_WIDTH: Record<PreviewViewport, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 390,
};

export function CmsPreviewFrame({
  niche,
  cmsEnabled,
  viewport,
  onViewportChange,
  scrollCommand,
}: CmsPreviewFrameProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [stageSize, setStageSize] = useState({ width: 720, height: 640 });
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const syncToIframe = useCallback(
    (targetNiche: NicheConfig) => {
      const win = iframeRef.current?.contentWindow;
      if (!win || typeof window === "undefined") return;
      win.postMessage(
        {
          type: "YAPPING_CMS_SYNC",
          nicheId: targetNiche.id,
          config: targetNiche,
        },
        window.location.origin,
      );
    },
    [],
  );

  // Measure available preview stage dimensions
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const update = () => {
      setStageSize({
        width: el.clientWidth,
        height: el.clientHeight,
      });
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Push every CMS change immediately into the live preview iframe
  useEffect(() => {
    if (isLoaded) {
      syncToIframe(niche);
    }
  }, [niche, isLoaded, syncToIframe]);

  // Listen for iframe ready ping
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "YAPPING_CMS_EMBED_READY") {
        setIsLoaded(true);
        syncToIframe(niche);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [niche, syncToIframe]);

  // Scroll preview iframe when user clicks a section or switches CMS tab
  useEffect(() => {
    if (!scrollCommand || !isLoaded) return;
    const win = iframeRef.current?.contentWindow;
    if (!win || typeof window === "undefined") return;
    win.postMessage(
      {
        type: "YAPPING_CMS_SCROLL",
        sectionId: scrollCommand.sectionId,
      },
      window.location.origin,
    );
  }, [scrollCommand, isLoaded]);

  // Reset loaded flag when niche route changes
  useEffect(() => {
    setIsLoaded(false);
  }, [niche.id, iframeKey]);

  const logicalWidth = LOGICAL_WIDTH[viewport];
  const padX = viewport === "desktop" ? 16 : 32;
  const padY = viewport === "desktop" ? 16 : 28;
  const availWidth = Math.max(300, stageSize.width - padX);
  const availHeight = Math.max(360, stageSize.height - padY);

  const scale = Math.max(0.28, Math.min(1, availWidth / logicalWidth));
  const scaledWidth = Math.round(logicalWidth * scale);
  const maxVisualHeight =
    viewport === "mobile"
      ? Math.min(availHeight, Math.round(800 * scale))
      : availHeight;
  const iframeLogicalHeight = Math.max(400, Math.round(maxVisualHeight / scale));

  const previewUrlDomain = CLIENT_PREVIEW_DOMAINS[niche.id];

  return (
    <div className="flex h-full flex-col bg-stone-100/90">
      {/* Browser Top Chrome */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 bg-white px-4 py-2.5">
        {/* Left: Traffic Lights + Simulated Custom Domain */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[11px] font-medium text-stone-700 min-w-0">
            <span className="text-emerald-600 text-[10px]">🔒</span>
            <span className="truncate font-mono text-[11px]">
              https://{previewUrlDomain}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-800 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {/* Right: Viewport Switcher + Reload + Open Fullscreen */}
        <div className="flex items-center gap-1.5">
          <div
            className="flex items-center rounded-full border border-stone-200 bg-stone-100 p-0.5"
            role="group"
            aria-label="Pilih ukuran layar preview"
          >
            {(
              [
                { id: "desktop", label: "Desktop", short: "🖥️" },
                { id: "tablet", label: "Tablet", short: "📱" },
                { id: "mobile", label: "Mobile", short: "📲" },
              ] as const
            ).map((vp) => (
              <button
                key={vp.id}
                type="button"
                onClick={() => onViewportChange(vp.id)}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-semibold transition-all ${
                  viewport === vp.id
                    ? "bg-white text-stone-950 shadow-xs"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                <span>{vp.short}</span>
                <span className="hidden md:inline">{vp.label}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIframeKey((k) => k + 1)}
            title="Muat ulang Live Preview"
            aria-label="Muat ulang Live Preview"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white text-xs text-stone-600 hover:bg-stone-50 hover:text-stone-950 transition-colors"
          >
            ↻
          </button>

          <Link
            href={`/templates/${niche.id}`}
            target="_blank"
            title="Buka website penuh di tab baru"
            className="inline-flex items-center gap-1 rounded-full bg-stone-950 px-3 py-1.5 text-[10.5px] font-bold text-white hover:bg-stone-800 transition-colors"
          >
            <span className="hidden sm:inline">Full Web</span>
            <span>↗</span>
          </Link>
        </div>
      </div>

      {/* Mode Indicator Ribbon */}
      <div className="flex items-center justify-between border-b border-stone-200/70 bg-stone-50 px-4 py-1.5 text-[10.5px]">
        <div className="flex items-center gap-2 text-stone-600">
          <span className="font-semibold text-stone-800">
            Preview Real-Time:
          </span>
          <span>
            {cmsEnabled
              ? "Perubahan di panel kiri langsung tampil seketika di layar ini."
              : "Mode Website Statis (Tanpa CMS) — tampilan tetap live & siap pakai."}
          </span>
        </div>
        <span className="hidden sm:inline font-mono text-[10px] text-stone-400">
          {logicalWidth}px · {Math.round(scale * 100)}%
        </span>
      </div>

      {/* Responsive Device Stage */}
      <div
        ref={stageRef}
        className="relative flex flex-1 items-start justify-center overflow-hidden p-2 sm:p-3.5"
      >
        <div
          className={`relative overflow-hidden bg-white transition-all duration-200 ${
            viewport === "mobile"
              ? "rounded-[28px] border-[6px] border-stone-900 shadow-2xl"
              : viewport === "tablet"
              ? "rounded-2xl border-4 border-stone-800 shadow-2xl"
              : "rounded-xl border border-stone-200 shadow-xl"
          }`}
          style={{
            width: `${scaledWidth}px`,
            height: `${maxVisualHeight}px`,
          }}
        >
          {!isLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-white/95">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900" />
              <span className="text-xs font-medium text-stone-500">
                Memuat Live Preview {niche.brand}...
              </span>
            </div>
          )}

          <iframe
            key={`${niche.id}-${iframeKey}`}
            ref={iframeRef}
            src={`/templates/${niche.id}?embed=1`}
            title={`Live Preview ${niche.brand}`}
            onLoad={() => {
              setIsLoaded(true);
              syncToIframe(niche);
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
  );
}

