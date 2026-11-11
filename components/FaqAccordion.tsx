"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/config/niches";
import { useShowcase } from "@/context/ShowcaseContext";
import { cn } from "@/lib/format";

export function FaqAccordion() {
  const { activeNiche } = useShowcase();
  const { mode, theme, faqs, brand } = activeNiche;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Halo ${brand}, saya ingin bertanya lebih lanjut mengenai layanan Anda.`,
  )}`;

  return (
    <section
      id="faq"
      className="border-t border-line px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span
              className={cn(mode === "catering" ? "h-2 w-2" : "h-px w-8")}
              style={{ backgroundColor: theme.accent }}
            />
            <span
              className={cn(
                "text-[9px] uppercase text-muted",
                mode === "catering"
                  ? "font-grotesk tracking-[0.24em]"
                  : "font-ui tracking-[0.3em]",
              )}
            >
              Pertanyaan
            </span>
          </div>
          <h2
            className={cn(
              "mt-5 text-ink",
              mode === "retail" &&
                "font-heading text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.04] tracking-[-0.03em]",
              mode === "bouquet" &&
                "font-heading text-[clamp(2.3rem,4.2vw,3.7rem)] font-light leading-[1] tracking-[-0.01em]",
              mode === "catering" &&
                "font-heading text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.04] tracking-[-0.02em]",
            )}
          >
            Hal yang sering
            <br />
            ditanyakan.
          </h2>
          <p className="mt-4 max-w-[300px] font-body text-[12px] leading-[1.85] text-muted">
            Tidak menemukan jawaban yang Anda cari? Tim kami siap membantu
            secara personal.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-5 inline-flex items-center gap-2 border border-line bg-surface px-5 py-3 text-[9px] uppercase text-ink transition-colors duration-300 hover:border-[var(--accent)]",
              mode === "catering"
                ? "rounded-none font-grotesk tracking-[0.16em]"
                : "rounded-full font-ui tracking-[0.16em]",
            )}
          >
            Tanya langsung
            <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3" aria-hidden="true">
              <path
                d="M4 10 10 4M10 4H5M10 4v5"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="border-t border-line">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={cn(
                          "mt-1.5 shrink-0 text-[8px] uppercase tabular-nums text-muted",
                          mode === "catering"
                            ? "font-grotesk tracking-[0.14em]"
                            : "font-ui tracking-[0.12em]",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "text-ink transition-colors duration-300",
                          mode === "retail" &&
                            "font-heading text-[18px] leading-snug tracking-[-0.01em]",
                          mode === "bouquet" &&
                            "font-heading text-[21px] font-light leading-snug",
                          mode === "catering" &&
                            "font-heading text-[18px] leading-snug tracking-[-0.01em]",
                        )}
                      >
                        {faq.question}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-line transition-all duration-300 group-hover:border-[var(--accent)]",
                        mode === "catering" ? "rounded-none" : "rounded-full",
                      )}
                    >
                      <motion.svg
                        viewBox="0 0 12 12"
                        fill="none"
                        className="h-2.5 w-2.5 text-ink"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        aria-hidden="true"
                      >
                        <path
                          d="M6 2v8M2 6h8"
                          stroke="currentColor"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[560px] pb-6 pl-8 font-body text-[12px] leading-[1.9] text-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
