"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useShowcase } from "@/context/ShowcaseContext";
import { cn, formatIDR } from "@/lib/format";
import type { Product } from "@/types/landing";

interface ProductCardProps {
  product: Product;
  index: number;
  isActive: boolean;
  pax?: number;
  onPaxChange?: (value: number) => void;
}

function useAddedFlash() {
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const flash = () => {
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1600);
  };

  return { added, flash };
}

function Stepper({
  value,
  min,
  step,
  onChange,
  radius,
  compact,
}: {
  value: number;
  min: number;
  step: number;
  onChange: (next: number) => void;
  radius: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center border border-line bg-surface",
        radius,
        compact ? "h-9" : "h-10",
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - step))}
        disabled={value <= min}
        aria-label={`Kurangi ${step}`}
        className={cn(
          "flex h-full items-center justify-center text-ink transition-colors hover:text-[var(--accent)] disabled:opacity-25",
          compact ? "w-8" : "w-9",
        )}
      >
        <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5" aria-hidden="true">
          <path d="M2 6h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
      <span
        className={cn(
          "min-w-[26px] text-center font-ui text-[11px] font-semibold tabular-nums text-ink",
          compact && "text-[10px]",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + step)}
        aria-label={`Tambah ${step}`}
        className={cn(
          "flex h-full items-center justify-center text-ink transition-colors hover:text-[var(--accent)]",
          compact ? "w-8" : "w-9",
        )}
      >
        <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5" aria-hidden="true">
          <path
            d="M6 2v8M2 6h8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

function AddButton({
  onClick,
  added,
  label,
  radius,
  full,
}: {
  onClick: () => void;
  added: boolean;
  label: string;
  radius: string;
  full?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group/add flex h-10 items-center justify-center gap-2 px-4 font-ui text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300",
        radius,
        full && "w-full",
      )}
      style={{
        backgroundColor: added ? "var(--text)" : "var(--accent)",
        color: "var(--accent-contrast)",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5"
          >
            <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3" aria-hidden="true">
              <path
                d="M2.5 7.2 5.5 10 11.5 3.8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Masuk
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5"
          >
            {label}
            <svg
              viewBox="0 0 14 14"
              fill="none"
              className="h-3 w-3 transition-transform duration-300 group-hover/add:rotate-90"
              aria-hidden="true"
            >
              <path
                d="M7 2v10M2 7h10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function ProductCard({
  product,
  index,
  isActive,
  pax,
  onPaxChange,
}: ProductCardProps) {
  const { activeNiche, addToCart } = useShowcase();
  const { mode, theme } = activeNiche;
  const [localQty, setLocalQty] = useState(product.minQty);
  const [showCard, setShowCard] = useState(false);
  const { added, flash } = useAddedFlash();

  const quantity =
    mode === "catering" ? (pax ?? product.minQty) : localQty;
  const total = quantity * product.price;

  const handleQuantity = (next: number) => {
    if (mode === "catering") {
      onPaxChange?.(Math.max(product.minQty, next));
    } else {
      setLocalQty(Math.max(product.minQty, next));
    }
  };

  const handleAdd = () => {
    addToCart(product, quantity);
    flash();
  };

  const indexLabel = `Nº ${String(index + 1).padStart(2, "0")}`;

  if (mode === "retail") {
    return (
      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-500 ease-silk hover:-translate-y-1 hover:scale-[1.015] hover:shadow-[0_30px_60px_-35px_rgba(28,25,23,0.4)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            unoptimized={product.image.startsWith("data:") || product.image.startsWith("http")}
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {product.badge && (
              <span
                className="rounded-full px-2.5 py-1 font-ui text-[8px] font-semibold uppercase tracking-[0.14em]"
                style={{
                  backgroundColor:
                    product.badgeTone === "accent"
                      ? theme.accent
                      : product.badgeTone === "neutral"
                        ? theme.text
                        : theme.surface,
                  color:
                    product.badgeTone === "accent"
                      ? theme.accentContrast
                      : product.badgeTone === "neutral"
                        ? theme.surface
                        : theme.text,
                }}
              >
                {product.badge}
              </span>
            )}
            {product.soldOutSoon && (
              <span className="rounded-full border border-white/30 bg-black/30 px-2.5 py-1 font-ui text-[8px] uppercase tracking-[0.14em] text-white backdrop-blur-md">
                Sold Out Soon
              </span>
            )}
          </div>
          <span className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/25 px-2 py-1 font-heading text-[10px] italic text-white backdrop-blur-md">
            {indexLabel}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-[22px] leading-tight tracking-[-0.01em] text-ink">
                {product.name}
              </h3>
              <p className="mt-1 font-ui text-[9px] uppercase tracking-[0.16em] text-muted">
                {product.subtitle}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="font-ui text-[13px] font-semibold tabular-nums text-ink">
                {formatIDR(product.price)}
              </div>
              <div className="font-ui text-[8px] uppercase tracking-[0.12em] text-muted">
                / {product.unitLabel}
              </div>
            </div>
          </div>

          <p className="mt-3 line-clamp-2 font-body text-[11.5px] leading-[1.75] text-muted">
            {product.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-line px-2 py-1 font-ui text-[8px] uppercase tracking-[0.1em] text-muted"
              >
                {highlight}
              </span>
            ))}
          </div>

          <dl className="mt-4 divide-y divide-[var(--border)] border-y border-line">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex items-center justify-between py-2">
                <dt className="font-ui text-[8px] uppercase tracking-[0.14em] text-muted">
                  {spec.label}
                </dt>
                <dd className="font-ui text-[9px] font-medium text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex items-center justify-between gap-2 pt-4">
            <Stepper
              value={quantity}
              min={product.minQty}
              step={product.step}
              onChange={handleQuantity}
              radius="rounded-full"
            />
            <AddButton
              onClick={handleAdd}
              added={added}
              label="Tambah"
              radius="rounded-full"
            />
          </div>
        </div>
      </article>
    );
  }

  if (mode === "bouquet") {
    return (
      <article className="group flex h-full flex-col">
        <div
          className={cn(
            "relative aspect-[3/4] overflow-hidden bg-surface",
            theme.imageRadius,
          )}
        >
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            unoptimized={product.image.startsWith("data:") || product.image.startsWith("http")}
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 30vw"
            className={cn(
              "object-cover transition-all duration-[1100ms] ease-silk",
              isActive ? "scale-105" : "scale-100 group-hover:scale-[1.04]",
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2620]/35 via-transparent to-transparent" />

          {product.badge && (
            <span
              className="absolute left-4 top-4 rounded-full px-3 py-1.5 font-ui text-[8px] uppercase tracking-[0.18em]"
              style={{
                backgroundColor:
                  product.badgeTone === "accent"
                    ? theme.accent
                    : theme.surface,
                color:
                  product.badgeTone === "accent"
                    ? theme.accentContrast
                    : theme.text,
              }}
            >
              {product.badge}
            </span>
          )}

          <div className="absolute bottom-16 left-5 right-5 flex items-end justify-between">
            <span className="font-heading text-[13px] italic text-white/85">
              {indexLabel}
            </span>
            <span className="font-ui text-[8px] uppercase tracking-[0.22em] text-white/75">
              Hand-tied
            </span>
          </div>
        </div>

        <div className="relative z-10 -mt-10 mx-2 flex flex-1 flex-col rounded-3xl border border-line bg-surface p-5 shadow-[0_20px_50px_-30px_rgba(27,38,32,0.35)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-[26px] font-light leading-none tracking-[0.01em] text-ink">
                {product.name}
              </h3>
              <p className="mt-1.5 font-ui text-[8px] uppercase tracking-[0.2em] text-muted">
                {product.subtitle}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="font-heading text-[18px] leading-none text-ink">
                {formatIDR(product.price)}
              </div>
              <div className="mt-1 font-ui text-[8px] uppercase tracking-[0.12em] text-muted">
                / {product.unitLabel}
              </div>
            </div>
          </div>

          <p className="mt-3 line-clamp-2 font-body text-[11.5px] font-light leading-[1.8] text-muted">
            {product.description}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, dot) => (
                <span
                  key={dot}
                  className="h-1 w-1 rounded-full"
                  style={{
                    backgroundColor:
                      dot < (product.deliverySafe ?? 0)
                        ? theme.accent
                        : theme.border,
                  }}
                />
              ))}
            </div>
            <span className="font-ui text-[8px] uppercase tracking-[0.14em] text-muted">
              Delivery-safe {product.deliverySafe}/5
            </span>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 border-y border-line py-3">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="font-ui text-[7.5px] uppercase tracking-[0.16em] text-muted">
                  {spec.label}
                </dt>
                <dd className="mt-0.5 font-ui text-[9.5px] text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            onClick={() => setShowCard((current) => !current)}
            className="mt-3 flex items-center justify-between py-1 font-ui text-[8.5px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
            aria-expanded={showCard}
          >
            <span>Preview kartu ucapan</span>
            <svg
              viewBox="0 0 12 12"
              fill="none"
              className={cn(
                "h-2.5 w-2.5 transition-transform duration-300",
                showCard && "rotate-180",
              )}
              aria-hidden="true"
            >
              <path
                d="M2 4.5 6 8.5l4-4"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {showCard && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mb-1 mt-2 rounded-tl-2xl rounded-br-2xl border border-dashed border-line bg-canvas px-4 py-3">
                  <p className="font-ui text-[7.5px] uppercase tracking-[0.2em] text-muted">
                    Kartu tulisan tangan
                  </p>
                  <p className="mt-1.5 font-heading text-[15px] italic leading-snug text-ink">
                    “{product.cardMessage}”
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto flex items-center justify-between gap-2 pt-4">
            <Stepper
              value={quantity}
              min={product.minQty}
              step={product.step}
              onChange={handleQuantity}
              radius="rounded-full"
            />
            <AddButton
              onClick={handleAdd}
              added={added}
              label="Tambah"
              radius="rounded-full"
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col border border-line bg-surface transition-colors duration-500 hover:border-[var(--accent)]">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          unoptimized={product.image.startsWith("data:") || product.image.startsWith("http")}
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/30 via-transparent to-transparent" />
        <div className="absolute left-0 top-0 flex items-center">
          <span className="border-b border-r border-line bg-surface px-2.5 py-1.5 font-grotesk text-[8px] uppercase tracking-[0.16em] text-muted">
            PKG {String(index + 1).padStart(2, "0")} / 05
          </span>
          {product.badge && (
            <span
              className="px-2.5 py-1.5 font-grotesk text-[8px] uppercase tracking-[0.14em]"
              style={{
                backgroundColor: theme.accent,
                color: theme.accentContrast,
              }}
            >
              {product.badge}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-[24px] leading-none tracking-[-0.01em] text-ink">
              {product.name}
            </h3>
            <p className="mt-2 font-grotesk text-[8px] uppercase tracking-[0.16em] text-muted">
              {product.subtitle}
            </p>
          </div>
          <div className="shrink-0 border border-line px-2 py-1.5 text-right">
            <div className="font-grotesk text-[12px] font-medium tabular-nums text-ink">
              {formatIDR(product.price)}
            </div>
            <div className="font-grotesk text-[7px] uppercase tracking-[0.12em] text-muted">
              per pax
            </div>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 font-body text-[11.5px] leading-[1.75] text-muted">
          {product.description}
        </p>

        <ul className="mt-4 space-y-1.5">
          {product.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-center gap-2 font-grotesk text-[9px] uppercase tracking-[0.1em] text-muted"
            >
              <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5 shrink-0" aria-hidden="true">
                <path
                  d="M2 6.2 4.6 8.8 10 3.4"
                  stroke={theme.accent}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {highlight}
            </li>
          ))}
        </ul>

        <dl className="mt-4 divide-y divide-[var(--border)] border-y border-line">
          {product.specs.map((spec) => (
            <div key={spec.label} className="flex items-center justify-between py-2">
              <dt className="font-grotesk text-[8px] uppercase tracking-[0.14em] text-muted">
                {spec.label}
              </dt>
              <dd className="font-grotesk text-[9px] text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 border border-line bg-canvas p-3.5">
          <div className="flex items-center justify-between">
            <span className="font-grotesk text-[7.5px] uppercase tracking-[0.16em] text-muted">
              Estimasi · {quantity} pax
            </span>
            <span className="font-grotesk text-[8px] uppercase tracking-[0.12em] text-accent">
              ≈ {quantity} porsi
            </span>
          </div>
          <div className="mt-1.5 font-grotesk text-[24px] font-medium leading-none tracking-[-0.02em] text-ink">
            {formatIDR(total)}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <Stepper
            value={quantity}
            min={product.minQty}
            step={product.step}
            onChange={handleQuantity}
            radius="rounded-none"
            compact
          />
          <AddButton
            onClick={handleAdd}
            added={added}
            label="Tambah"
            radius="rounded-none"
          />
        </div>
      </div>
    </article>
  );
}
