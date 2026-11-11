"use client";

import type { ReactNode } from "react";

export function CmsCard({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 pb-3.5 mb-4">
        <div>
          <h3 className="text-sm font-bold text-stone-950 font-jakarta">
            {title}
          </h3>
          {description && (
            <p className="mt-0.5 text-xs text-stone-500">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function CmsField({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
          {label}
        </label>
        {hint && (
          <span className="text-[10px] text-stone-400">{hint}</span>
        )}
      </div>
      {children}
    </div>
  );
}

export const cmsInputClass =
  "w-full rounded-xl border border-stone-200 bg-stone-50/70 px-3.5 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:bg-white focus:outline-none transition-colors";

export function CmsToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-stone-200/80 bg-stone-50/60 px-3.5 py-2.5 hover:bg-stone-50 transition-colors">
      <div>
        <div className="text-xs font-semibold text-stone-900">{label}</div>
        {description && (
          <div className="text-[11px] text-stone-500">{description}</div>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-emerald-600" : "bg-stone-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </label>
  );
}

