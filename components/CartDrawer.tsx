"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { DISTRICTS, WHATSAPP_NUMBER } from "@/config/niches";
import { themeStyle, useShowcase } from "@/context/ShowcaseContext";
import { cn, formatDateID, formatIDR, todayISO } from "@/lib/format";
import type {
  CartItem,
  FormErrors,
  NicheConfig,
  NicheFormState,
} from "@/types/landing";

const WINDOWS = ["09.00 — 12.00", "12.00 — 15.00", "15.00 — 18.00"];
const EVENT_TYPES = ["Corporate Lunch", "Wedding", "Gathering"];
const SERVICE_FORMATS = ["Pre-packed Bento Box", "Buffet Equipment Setup"];

function buildOrderMessage(
  niche: NicheConfig,
  items: CartItem[],
  subtotal: number,
  form: NicheFormState,
): string {
  const lines: string[] = [];
  const district =
    DISTRICTS.find((option) => option.value === form.district)?.label ??
    form.district;

  lines.push(`Halo ${niche.brand}, saya ingin melakukan pemesanan melalui website.`);
  lines.push("");
  lines.push("— RINGKASAN PESANAN —");
  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.name} — ${item.quantity} ${item.unitLabel}`,
    );
    lines.push(
      `   ${formatIDR(item.unitPrice)} / ${item.unitLabel} · Total ${formatIDR(
        item.unitPrice * item.quantity,
      )}`,
    );
  });
  lines.push("");
  lines.push(`Subtotal: ${formatIDR(subtotal)}`);
  lines.push("(Belum termasuk ongkos kirim)");
  lines.push("");
  lines.push("— DATA PEMESAN —");
  lines.push(`Nama lengkap: ${form.fullName}`);
  lines.push(`WhatsApp: ${form.whatsapp}`);
  lines.push(`Kecamatan: ${district}`);
  lines.push(`Alamat: ${form.address}`);

  if (niche.mode === "retail") {
    lines.push("");
    lines.push("— DETAIL PRE-ORDER —");
    lines.push(`Tanggal batch: ${formatDateID(form.batchDate ?? "")}`);
    lines.push(
      `Persetujuan pengiriman dingin: ${form.chilledAck ? "Ya" : "Belum"}`,
    );
  }

  if (niche.mode === "bouquet") {
    lines.push("");
    lines.push("— DETAIL PENGIRIMAN BUNGA —");
    lines.push(`Tanggal kirim: ${formatDateID(form.deliveryDate ?? "")}`);
    lines.push(`Jendela waktu: ${form.deliveryWindow || "-"}`);
    lines.push(`Nama pengirim: ${form.senderName}`);
    lines.push(`Nama penerima: ${form.recipientName}`);
    lines.push(
      `Pesan kartu: ${form.giftMessage?.trim() ? `"${form.giftMessage.trim()}"` : "Tanpa pesan"}`,
    );
  }

  if (niche.mode === "catering") {
    lines.push("");
    lines.push("— DETAIL ACARA —");
    lines.push(`Tanggal acara: ${formatDateID(form.eventDate ?? "")}`);
    lines.push(`Jenis acara: ${form.eventType || "-"}`);
    lines.push(`Format service: ${form.serviceFormat || "-"}`);
    lines.push(
      `Dietary / alergi: ${form.dietary?.trim() ? form.dietary.trim() : "Tidak ada"}`,
    );
  }

  lines.push("");
  lines.push("Mohon konfirmasi ketersediaan dan total akhirnya. Terima kasih.");
  return lines.join("\n");
}

function Field({
  label,
  error,
  children,
  className,
  hint,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
  hint?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label className="font-ui text-[8px] uppercase tracking-[0.18em] text-muted">
          {label}
        </label>
        {hint && (
          <span className="font-ui text-[7.5px] uppercase tracking-[0.1em] text-muted opacity-70">
            {hint}
          </span>
        )}
      </div>
      {children}
      {error && (
        <p className="mt-1 font-body text-[10px] text-[#B42318]">{error}</p>
      )}
    </div>
  );
}

function CartLine({
  item,
  onQuantity,
  onRemove,
  radius,
}: {
  item: CartItem;
  onQuantity: (next: number) => void;
  onRemove: () => void;
  radius: string;
}) {
  return (
    <div className="flex gap-3 border-b border-line py-4 last:border-b-0">
      <div
        className={cn(
          "relative h-[76px] w-[64px] shrink-0 overflow-hidden bg-canvas",
          radius,
        )}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="truncate font-heading text-[16px] leading-tight text-ink">
              {item.name}
            </h4>
            <p className="mt-0.5 truncate font-ui text-[8px] uppercase tracking-[0.12em] text-muted">
              {formatIDR(item.unitPrice)} / {item.unitLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Hapus ${item.name}`}
            className="shrink-0 text-muted transition-colors hover:text-[#B42318]"
          >
            <svg viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                d="M2 3.5h10M5.5 2h3M4 3.5l.5 8a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1l.5-8"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className={cn("flex h-7 items-center border border-line", radius)}>
            <button
              type="button"
              onClick={() => onQuantity(item.quantity - item.step)}
              disabled={item.quantity <= item.minQty}
              aria-label={`Kurangi ${item.step}`}
              className="flex h-full w-7 items-center justify-center text-ink transition-colors hover:text-[var(--accent)] disabled:opacity-25"
            >
              <svg viewBox="0 0 10 10" fill="none" className="h-2 w-2" aria-hidden="true">
                <path d="M2 5h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
            <span className="min-w-[38px] text-center font-ui text-[9px] font-semibold tabular-nums text-ink">
              {item.quantity} {item.unitLabel}
            </span>
            <button
              type="button"
              onClick={() => onQuantity(item.quantity + item.step)}
              aria-label={`Tambah ${item.step}`}
              className="flex h-full w-7 items-center justify-center text-ink transition-colors hover:text-[var(--accent)]"
            >
              <svg viewBox="0 0 10 10" fill="none" className="h-2 w-2" aria-hidden="true">
                <path d="M5 2v6M2 5h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <span className="font-ui text-[11px] font-semibold tabular-nums text-ink">
            {formatIDR(item.quantity * item.unitPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}

function CheckoutForm({
  niche,
  items,
  subtotal,
}: {
  niche: NicheConfig;
  items: CartItem[];
  subtotal: number;
}) {
  const { mode } = niche;
  const inputRadius =
    mode === "catering" ? "rounded-none" : mode === "bouquet" ? "rounded-xl" : "rounded-lg";

  const [form, setForm] = useState<NicheFormState>({
    fullName: "",
    whatsapp: "",
    district: "",
    address: "",
    batchDate: todayISO(1),
    chilledAck: false,
    deliveryDate: todayISO(1),
    deliveryWindow: "",
    senderName: "",
    recipientName: "",
    giftMessage: "",
    eventDate: todayISO(14),
    eventType: "",
    serviceFormat: "",
    dietary: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [waUrl, setWaUrl] = useState("");

  const inputClass = cn(
    "w-full border border-line bg-surface px-3.5 py-2.5 font-body text-[12px] text-ink outline-none transition-colors duration-300 placeholder:text-muted placeholder:opacity-50 focus:border-[var(--accent)]",
    inputRadius,
  );

  const setField = <K extends keyof NicheFormState>(
    key: K,
    value: NicheFormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSent(false);
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (form.fullName.trim().length < 2) {
      next.fullName = "Mohon isi nama lengkap Anda.";
    }
    if (!/^[0-9+\s-]{9,17}$/.test(form.whatsapp.trim())) {
      next.whatsapp = "Nomor WhatsApp belum valid.";
    }
    if (!form.district) {
      next.district = "Pilih kecamatan pengiriman.";
    }
    if (form.address.trim().length < 10) {
      next.address = "Mohon isi alamat lengkap (min. 10 karakter).";
    }

    if (mode === "retail") {
      if (!form.batchDate) next.batchDate = "Pilih tanggal batch.";
      if (!form.chilledAck) {
        next.chilledAck = "Mohon setujui catatan pengiriman dingin.";
      }
    }

    if (mode === "bouquet") {
      if (!form.deliveryDate) next.deliveryDate = "Pilih tanggal pengiriman.";
      if (!form.deliveryWindow) next.deliveryWindow = "Pilih jendela waktu.";
      if (!form.senderName?.trim()) next.senderName = "Isi nama pengirim.";
      if (!form.recipientName?.trim()) next.recipientName = "Isi nama penerima.";
    }

    if (mode === "catering") {
      if (!form.eventDate) next.eventDate = "Pilih tanggal acara.";
      if (!form.eventType) next.eventType = "Pilih jenis acara.";
      if (!form.serviceFormat) next.serviceFormat = "Pilih format service.";
    }

    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSent(false);
      return;
    }

    const message = buildOrderMessage(niche, items, subtotal, form);
    const targetPhone = niche.footer.phone.replace(/[^0-9]/g, "") || WHATSAPP_NUMBER;
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
    setWaUrl(url);
    setSent(true);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form id="checkout-form" onSubmit={handleSubmit} noValidate>
      <div className="border-t border-line pt-5">
        <div className="flex items-center gap-2">
          <span className="font-ui text-[8px] font-semibold uppercase tracking-[0.22em] text-ink">
            Detail pengiriman
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nama lengkap" error={errors.fullName}>
            <input
              type="text"
              value={form.fullName}
              onChange={(event) => setField("fullName", event.target.value)}
              placeholder="Nama Anda"
              className={inputClass}
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
            />
          </Field>

          <Field label="Nomor WhatsApp" error={errors.whatsapp}>
            <input
              type="tel"
              value={form.whatsapp}
              onChange={(event) => setField("whatsapp", event.target.value)}
              placeholder="0812 3456 7890"
              className={inputClass}
              autoComplete="tel"
              aria-invalid={Boolean(errors.whatsapp)}
            />
          </Field>

          <Field
            label="Kecamatan pengiriman"
            error={errors.district}
            className="sm:col-span-2"
          >
            <div className="relative">
              <select
                value={form.district}
                onChange={(event) => setField("district", event.target.value)}
                className={cn(inputClass, "appearance-none pr-9")}
                aria-invalid={Boolean(errors.district)}
              >
                <option value="">Pilih Jakarta &amp; Bodetabek</option>
                {DISTRICTS.map((district) => (
                  <option key={district.value} value={district.value}>
                    {district.label}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 12 12"
                fill="none"
                className="pointer-events-none absolute right-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-muted"
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
            </div>
          </Field>

          <Field
            label="Alamat lengkap"
            error={errors.address}
            className="sm:col-span-2"
            hint="Jalan, nomor, patokan"
          >
            <textarea
              value={form.address}
              onChange={(event) => setField("address", event.target.value)}
              rows={2}
              placeholder="Contoh: Jl. Senopati No. 18, patokan seberang taman"
              className={cn(inputClass, "resize-none")}
              autoComplete="street-address"
              aria-invalid={Boolean(errors.address)}
            />
          </Field>
        </div>
      </div>

      {mode === "retail" && (
        <div className="mt-5 border-t border-line pt-5">
          <div className="flex items-center gap-2">
            <span className="font-ui text-[8px] font-semibold uppercase tracking-[0.22em] text-ink">
              Detail pre-order
            </span>
            <span className="h-px flex-1 bg-[var(--border)]" />
          </div>

          <div className="mt-4 grid gap-4">
            <Field label="Tanggal batch" error={errors.batchDate}>
              <input
                type="date"
                value={form.batchDate ?? ""}
                min={todayISO(1)}
                onChange={(event) => setField("batchDate", event.target.value)}
                className={cn(inputClass, "[color-scheme:light]")}
                aria-invalid={Boolean(errors.batchDate)}
              />
            </Field>

            <label className="flex cursor-pointer items-start gap-3 border border-line bg-canvas p-3.5">
              <input
                type="checkbox"
                checked={Boolean(form.chilledAck)}
                onChange={(event) => setField("chilledAck", event.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                style={{ accentColor: niche.theme.accent }}
                aria-invalid={Boolean(errors.chilledAck)}
              />
              <span className="font-body text-[10.5px] leading-relaxed text-muted">
                Saya memahami produk dikirim dalam kondisi dingin dengan ice gel
                dan perlu dihangatkan kembali sebelum disantap.
              </span>
            </label>
            {errors.chilledAck && (
              <p className="-mt-2 font-body text-[10px] text-[#B42318]">
                {errors.chilledAck}
              </p>
            )}

            <p className="font-body text-[10px] leading-relaxed text-muted">
              {niche.form.deliveryNote}
            </p>
          </div>
        </div>
      )}

      {mode === "bouquet" && (
        <div className="mt-5 border-t border-line pt-5">
          <div className="flex items-center gap-2">
            <span className="font-ui text-[8px] font-semibold uppercase tracking-[0.22em] text-ink">
              Detail pengiriman bunga
            </span>
            <span className="h-px flex-1 bg-[var(--border)]" />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Tanggal kirim" error={errors.deliveryDate}>
              <input
                type="date"
                value={form.deliveryDate ?? ""}
                min={todayISO(0)}
                onChange={(event) => setField("deliveryDate", event.target.value)}
                className={cn(inputClass, "[color-scheme:light]")}
                aria-invalid={Boolean(errors.deliveryDate)}
              />
            </Field>

            <Field label="Jendela waktu" error={errors.deliveryWindow}>
              <div className="relative">
                <select
                  value={form.deliveryWindow ?? ""}
                  onChange={(event) => setField("deliveryWindow", event.target.value)}
                  className={cn(inputClass, "appearance-none pr-9")}
                  aria-invalid={Boolean(errors.deliveryWindow)}
                >
                  <option value="">Pilih waktu</option>
                  {WINDOWS.map((window) => (
                    <option key={window} value={window}>
                      {window}
                    </option>
                  ))}
                </select>
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  className="pointer-events-none absolute right-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-muted"
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
              </div>
            </Field>

            <Field label="Nama pengirim" error={errors.senderName}>
              <input
                type="text"
                value={form.senderName ?? ""}
                onChange={(event) => setField("senderName", event.target.value)}
                placeholder="Nama Anda"
                className={inputClass}
                aria-invalid={Boolean(errors.senderName)}
              />
            </Field>

            <Field label="Nama penerima" error={errors.recipientName}>
              <input
                type="text"
                value={form.recipientName ?? ""}
                onChange={(event) => setField("recipientName", event.target.value)}
                placeholder="Nama penerima"
                className={inputClass}
                aria-invalid={Boolean(errors.recipientName)}
              />
            </Field>

            <Field
              label="Pesan kartu"
              className="sm:col-span-2"
              hint={`${form.giftMessage?.length ?? 0}/250`}
            >
              <textarea
                value={form.giftMessage ?? ""}
                onChange={(event) =>
                  setField("giftMessage", event.target.value.slice(0, 250))
                }
                rows={3}
                maxLength={250}
                placeholder="Tulis pesan yang akan ditulis tangan oleh tim atelier…"
                className={cn(inputClass, "resize-none")}
              />
            </Field>
          </div>

          <p className="mt-3 font-body text-[10px] leading-relaxed text-muted">
            {niche.form.deliveryNote}
          </p>
        </div>
      )}

      {mode === "catering" && (
        <div className="mt-5 border-t border-line pt-5">
          <div className="flex items-center gap-2">
            <span className="font-ui text-[8px] font-semibold uppercase tracking-[0.22em] text-ink">
              Detail acara
            </span>
            <span className="h-px flex-1 bg-[var(--border)]" />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Tanggal acara" error={errors.eventDate}>
              <input
                type="date"
                value={form.eventDate ?? ""}
                min={todayISO(7)}
                onChange={(event) => setField("eventDate", event.target.value)}
                className={cn(inputClass, "[color-scheme:light]")}
                aria-invalid={Boolean(errors.eventDate)}
              />
            </Field>

            <Field label="Jenis acara" error={errors.eventType}>
              <div className="relative">
                <select
                  value={form.eventType ?? ""}
                  onChange={(event) => setField("eventType", event.target.value)}
                  className={cn(inputClass, "appearance-none pr-9")}
                  aria-invalid={Boolean(errors.eventType)}
                >
                  <option value="">Pilih jenis acara</option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  className="pointer-events-none absolute right-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-muted"
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
              </div>
            </Field>

            <Field
              label="Format service"
              error={errors.serviceFormat}
              className="sm:col-span-2"
            >
              <div className="relative">
                <select
                  value={form.serviceFormat ?? ""}
                  onChange={(event) => setField("serviceFormat", event.target.value)}
                  className={cn(inputClass, "appearance-none pr-9")}
                  aria-invalid={Boolean(errors.serviceFormat)}
                >
                  <option value="">Pilih format service</option>
                  {SERVICE_FORMATS.map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  className="pointer-events-none absolute right-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-muted"
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
              </div>
            </Field>

            <Field
              label="Dietary restrictions / alergi"
              className="sm:col-span-2"
              hint="Opsional"
            >
              <textarea
                value={form.dietary ?? ""}
                onChange={(event) => setField("dietary", event.target.value)}
                rows={2}
                placeholder="Contoh: 4 pax vegetarian, 1 alergi seafood"
                className={cn(inputClass, "resize-none")}
              />
            </Field>
          </div>

          <p className="mt-3 font-body text-[10px] leading-relaxed text-muted">
            {niche.form.deliveryNote}
          </p>
        </div>
      )}

      <p className="mt-5 border-t border-line pt-4 font-body text-[10px] leading-relaxed text-muted">
        {niche.form.extraNote}
      </p>

      {Object.keys(errors).length > 0 && (
        <p className="mt-3 border border-[#B42318]/20 bg-[#B42318]/[0.04] px-3 py-2 font-body text-[10px] text-[#B42318]">
          Mohon lengkapi bagian yang ditandai sebelum melanjutkan.
        </p>
      )}

      {sent && (
        <div className="mt-4 border border-line bg-canvas px-3.5 py-3">
          <p className="font-ui text-[8px] font-semibold uppercase tracking-[0.18em] text-ink">
            Pesanan siap di WhatsApp
          </p>
          <p className="mt-1 font-body text-[10px] leading-relaxed text-muted">
            Jika tab WhatsApp tidak terbuka,{" "}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[var(--accent)] underline-offset-2"
            >
              klik di sini
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}

export function CartDrawer() {
  const {
    activeNiche,
    isCartOpen,
    closeCart,
    cartItems,
    subtotal,
    updateQuantity,
    removeFromCart,
  } = useShowcase();
  const { theme, mode } = activeNiche;

  const itemRadius =
    mode === "catering" ? "rounded-none" : mode === "bouquet" ? "rounded-2xl" : "rounded-lg";

  useEffect(() => {
    if (!isCartOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isCartOpen, closeCart]);

  const totalLabel = useMemo(() => formatIDR(subtotal), [subtotal]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            key="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.aside
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[71] flex h-[100dvh] w-full max-w-[540px] flex-col border-l border-line bg-surface font-body shadow-2xl"
            style={themeStyle(theme)}
            role="dialog"
            aria-modal="true"
            aria-label={`Keranjang ${activeNiche.brand}`}
          >
            <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-5 sm:px-6">
              <div>
                <p className="font-ui text-[8px] uppercase tracking-[0.24em] text-muted">
                  {activeNiche.brand}
                </p>
                <h3 className="mt-1 font-heading text-[24px] leading-none text-ink">
                  Keranjang
                  <span className="ml-2 align-middle font-ui text-[10px] font-normal tracking-[0.1em] text-muted">
                    ({cartItems.length} item)
                  </span>
                </h3>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Tutup keranjang"
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center border border-line text-ink transition-colors hover:border-[var(--accent)]",
                  mode === "catering" ? "rounded-none" : "rounded-full",
                )}
              >
                <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3" aria-hidden="true">
                  <path
                    d="M3 3l8 8M11 3l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            {cartItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center border border-line bg-canvas",
                    mode === "catering" ? "rounded-none" : "rounded-full",
                  )}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-muted" aria-hidden="true">
                    <path
                      d="M6.5 8h11l-1 10.2a1.6 1.6 0 0 1-1.6 1.5H9.1a1.6 1.6 0 0 1-1.6-1.5L6.5 8Z"
                      stroke="currentColor"
                      strokeWidth="1.1"
                    />
                    <path
                      d="M9.2 8V6.8a2.8 2.8 0 0 1 5.6 0V8"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h4 className="mt-5 font-heading text-[22px] text-ink">
                  Keranjang Masih Kosong
                </h4>
                <p className="mt-1.5 max-w-[260px] font-body text-[12px] leading-relaxed text-muted">
                  Yuk, pilih menu favorit Anda dari {activeNiche.brand} untuk melanjutkan pesanan.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    document
                      .getElementById("collection")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={cn(
                    "mt-5 px-6 py-2.5 font-ui text-[10px] font-semibold uppercase tracking-[0.16em]",
                    mode === "catering" ? "rounded-none" : "rounded-full",
                  )}
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.accentContrast,
                  }}
                >
                  Pilih Menu Sekarang
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6">
                  <div className="py-1">
                    {cartItems.map((item) => (
                      <CartLine
                        key={item.productId}
                        item={item}
                        radius={itemRadius}
                        onQuantity={(next) => updateQuantity(item.productId, next)}
                        onRemove={() => removeFromCart(item.productId)}
                      />
                    ))}
                  </div>

                  <div className="border-t border-line py-4">
                    <div className="flex items-baseline justify-between">
                      <span className="font-ui text-[9px] uppercase tracking-[0.18em] text-muted">
                        Subtotal
                      </span>
                      <span className="font-heading text-[20px] text-ink">
                        {totalLabel}
                      </span>
                    </div>
                    <p className="mt-1 font-body text-[9.5px] text-muted">
                      Belum termasuk ongkir. Konfirmasi akhir melalui WhatsApp.
                    </p>
                  </div>

                  <div className="pb-6">
                    <CheckoutForm
                      key={activeNiche.id}
                      niche={activeNiche}
                      items={cartItems}
                      subtotal={subtotal}
                    />
                  </div>
                </div>

                <footer className="shrink-0 border-t border-line bg-surface px-5 pb-5 pt-4 sm:px-6">
                  <div className="flex items-baseline justify-between">
                    <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-muted">
                      Total estimasi
                    </span>
                    <span className="font-heading text-[22px] leading-none text-ink">
                      {totalLabel}
                    </span>
                  </div>
                  <button
                    type="submit"
                    form="checkout-form"
                    className={cn(
                      "group mt-3 flex w-full items-center justify-center gap-2 py-4 font-ui text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:opacity-90",
                      mode === "catering" ? "rounded-none" : "rounded-full",
                    )}
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.accentContrast,
                    }}
                  >
                    Kirim Pesanan ke WhatsApp
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 12 12 4M12 4H6M12 4v6"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <p className="mt-2 text-center font-body text-[8.5px] uppercase tracking-[0.12em] text-muted">
                    Dibalas tim {activeNiche.brand.split(" ")[0]} · rata-rata 15 menit
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
