"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
} from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { useShowcase } from "@/context/ShowcaseContext";
import { cn, formatIDR, formatPax } from "@/lib/format";

const AUTOPLAY_MS = 5500;

function AutoplayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5" aria-hidden="true">
      <path d="M4 2.5v7M8 2.5v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 12 12" fill="currentColor" className="h-2.5 w-2.5" aria-hidden="true">
      <path d="M3.5 2.4v7.2L9.5 6 3.5 2.4Z" />
    </svg>
  );
}

export function InteractiveShowcaseSlider() {
  const { activeNiche } = useShowcase();
  const { mode, theme, showcase, products } = activeNiche;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [pax, setPax] = useState(15);

  const autoProgress = useMotionValue(0);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    const onScroll = () => {
      scrollProgress.set(emblaApi.scrollProgress());
    };

    onSelect();
    onScroll();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("scroll", onScroll);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, scrollProgress]);

  useEffect(() => {
    if (!emblaApi) return;
    const onDown = () => setIsHovering(true);
    const onUp = () => setIsHovering(false);
    emblaApi.on("pointerDown", onDown);
    emblaApi.on("pointerUp", onUp);
    return () => {
      emblaApi.off("pointerDown", onDown);
      emblaApi.off("pointerUp", onUp);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !autoplay || isHovering) return;

    autoProgress.set(0);
    const controls = animate(autoProgress, 1, {
      duration: AUTOPLAY_MS / 1000,
      ease: "linear",
      onComplete: () => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0);
        }
      },
    });

    return () => controls.stop();
  }, [emblaApi, autoplay, isHovering, selectedIndex, autoProgress]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const radiusClass =
    mode === "catering" ? "rounded-none" : "rounded-full";

  const slideBasis =
    mode === "bouquet"
      ? "flex-[0_0_84%] pr-4 sm:flex-[0_0_46%] lg:flex-[0_0_30.5%]"
      : mode === "catering"
        ? "flex-[0_0_88%] pr-3 sm:flex-[0_0_48%] sm:pr-4 lg:flex-[0_0_33.33%]"
        : "flex-[0_0_86%] pr-3 sm:flex-[0_0_48%] sm:pr-4 lg:flex-[0_0_32%]";

  return (
    <section id="collection" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1440px]">
        {mode === "retail" && (
          <div className="mx-auto max-w-[760px] text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-7" style={{ backgroundColor: theme.accent }} />
              <span className="font-ui text-[9px] uppercase tracking-[0.3em] text-muted">
                {showcase.kicker}
              </span>
              <span className="h-px w-7" style={{ backgroundColor: theme.accent }} />
            </div>
            <h2 className="mt-5 font-heading text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.03em] text-ink">
              {showcase.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[500px] font-body text-[12.5px] leading-[1.85] text-muted">
              {showcase.description}
            </p>
          </div>
        )}

        {mode === "bouquet" && (
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-8" style={{ backgroundColor: theme.accent }} />
                <span className="font-ui text-[9px] uppercase tracking-[0.3em] text-muted">
                  {showcase.kicker}
                </span>
              </div>
              <h2 className="mt-5 max-w-[620px] font-heading text-[clamp(2.5rem,4.8vw,4.4rem)] font-light leading-[0.98] tracking-[-0.01em] text-ink">
                {showcase.title}
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-6">
              <p className="max-w-[380px] font-body text-[12.5px] font-light leading-[1.9] text-muted">
                {showcase.description}
              </p>
              <p className="mt-4 border-t border-line pt-3 font-ui text-[8.5px] uppercase tracking-[0.2em] text-muted">
                {showcase.note}
              </p>
            </div>
          </div>
        )}

        {mode === "catering" && (
          <>
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2" style={{ backgroundColor: theme.accent }} />
                  <span className="font-grotesk text-[9px] uppercase tracking-[0.24em] text-muted">
                    {showcase.kicker}
                  </span>
                </div>
                <h2 className="mt-5 max-w-[620px] font-heading text-[clamp(2.4rem,4.4vw,4.1rem)] leading-[1] tracking-[-0.02em] text-ink">
                  {showcase.title}
                </h2>
              </div>
              <div className="border-line lg:col-span-5 lg:border-l lg:pl-8">
                <p className="max-w-[400px] font-body text-[12.5px] leading-[1.85] text-muted">
                  {showcase.description}
                </p>
                <p className="mt-4 font-grotesk text-[8px] uppercase tracking-[0.18em] text-muted">
                  {showcase.note}
                </p>
              </div>
            </div>

            <div className="mt-8 border border-line bg-surface">
              <div className="grid items-center gap-6 p-5 sm:p-6 lg:grid-cols-[auto_1fr_auto] lg:gap-10">
                <div className="flex items-baseline gap-2">
                  <span className="font-grotesk text-[10px] uppercase tracking-[0.18em] text-muted">
                    Pax
                  </span>
                  <span className="font-grotesk text-[40px] font-medium leading-none tracking-[-0.03em] text-ink">
                    {formatPax(pax)}
                  </span>
                  <span className="font-grotesk text-[9px] uppercase tracking-[0.14em] text-muted">
                    pax
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center justify-between font-grotesk text-[8px] uppercase tracking-[0.16em] text-muted">
                    <span>Pax scale estimator</span>
                    <span>15 — 300</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={300}
                    step={5}
                    value={pax}
                    onChange={(event) => setPax(Number(event.target.value))}
                    className="pax-range mt-3"
                    aria-label="Estimasi jumlah pax"
                  />
                  <div className="mt-2 flex justify-between font-grotesk text-[7.5px] uppercase tracking-[0.14em] text-muted">
                    <span>Intimate</span>
                    <span>Corporate</span>
                    <span>Grand</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 border-line pt-4 lg:border-l lg:pl-8 lg:pt-0">
                  <div>
                    <div className="font-grotesk text-[7.5px] uppercase tracking-[0.16em] text-muted">
                      Porsi disiapkan
                    </div>
                    <div className="mt-1 font-grotesk text-[18px] leading-none text-ink">
                      {formatPax(pax)}
                    </div>
                  </div>
                  <div>
                    <div className="font-grotesk text-[7.5px] uppercase tracking-[0.16em] text-muted">
                      Paket tersedia
                    </div>
                    <div className="mt-1 font-grotesk text-[18px] leading-none text-ink">
                      {String(products.length).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="h-[2px] w-full origin-left transition-transform duration-500"
                style={{
                  backgroundColor: theme.accent,
                  transform: `scaleX(${pax / 300})`,
                }}
              />
            </div>
          </>
        )}

        <div
          className={cn(
            "mt-9 flex items-center justify-between gap-4 border-y border-line py-3",
            mode === "retail" && "mt-10",
          )}
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div
              className={cn(
                "flex items-center gap-2.5 border border-line bg-surface px-3 py-1.5",
                mode === "catering" ? "rounded-none" : "rounded-full",
              )}
            >
              <span className="font-ui text-[9px] font-semibold tabular-nums tracking-[0.08em] text-ink">
                {String(selectedIndex + 1).padStart(2, "0")}
              </span>
              <span className="h-2.5 w-px" style={{ backgroundColor: theme.border }} />
              <span className="font-ui text-[9px] tabular-nums tracking-[0.08em] text-muted">
                {String(products.length).padStart(2, "0")}
              </span>
              <span
                className="relative ml-1 h-[3px] w-12 overflow-hidden rounded-full sm:w-16"
                style={{ backgroundColor: theme.border }}
              >
                <motion.span
                  className="absolute inset-0 origin-left rounded-full"
                  style={{
                    scaleX: autoProgress,
                    backgroundColor: theme.accent,
                    opacity: autoplay ? 1 : 0,
                  }}
                />
                <motion.span
                  className="absolute inset-0 origin-left rounded-full"
                  style={{
                    scaleX: scrollProgress,
                    backgroundColor: theme.accent,
                    opacity: autoplay ? 0 : 1,
                  }}
                />
              </span>
            </div>

            <button
              type="button"
              onClick={() => setAutoplay((current) => !current)}
              className="flex items-center gap-1.5 font-ui text-[9px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
              aria-pressed={autoplay}
            >
              <AutoplayIcon playing={autoplay} />
              <span className="hidden sm:inline">
                {autoplay ? "Pause" : "Autoplay"}
              </span>
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Magnetic strength={0.28}>
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canPrev}
                aria-label="Slide sebelumnya"
                className={cn(
                  "flex h-10 w-10 items-center justify-center border border-line bg-surface text-ink transition-all duration-300 hover:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-30",
                  radiusClass,
                )}
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                  <path
                    d="M13 8H3M7 4 3 8l4 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Magnetic>
            <Magnetic strength={0.28}>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canNext}
                aria-label="Slide berikutnya"
                className={cn(
                  "flex h-10 w-10 items-center justify-center border border-line bg-surface text-ink transition-all duration-300 hover:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-30",
                  radiusClass,
                )}
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Magnetic>
          </div>
        </div>

        <div
          className="relative mt-7"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onFocusCapture={() => setIsHovering(true)}
          onBlurCapture={() => setIsHovering(false)}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y cursor-grab active:cursor-grabbing">
              {products.map((product, index) => (
                <div key={product.id} className={cn("min-w-0 shrink-0 grow-0", slideBasis)}>
                  <ProductCard
                    product={product}
                    index={index}
                    isActive={index === selectedIndex}
                    pax={pax}
                    onPaxChange={setPax}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {mode === "catering" && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 font-grotesk text-[8px] uppercase tracking-[0.16em] text-muted">
            <span>
              Estimasi terendah {formatIDR(products[0].price * pax)} · {products[0].name}
            </span>
            <span>Harga per pax sudah termasuk service &amp; peralatan dasar</span>
          </div>
        )}

        {mode !== "catering" && (
          <p className="mt-5 font-ui text-[8.5px] uppercase tracking-[0.18em] text-muted">
            {showcase.note}
          </p>
        )}
      </div>
    </section>
  );
}
