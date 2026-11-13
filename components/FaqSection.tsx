"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Apa peran utama Yapping Techflow sebagai studio teknologi?",
    a: "Yapping Techflow beroperasi sebagai holding teknologi dan venture builder studio. Kami tidak beroperasi seperti software house konvensional yang sekadar 'mengerjakan pesanan lalu lepas tangan'. Fokus utama kami adalah menginkubasi produk digital in-house kami sendiri (seperti Plivin.co), menaungi lini komersial klien (Komose), serta menjadi partner teknologi strategis untuk platform berskala besar.",
  },
  {
    q: "Bagaimana pembagian peran antara Yapping Techflow, Plivin.co, dan Komose?",
    a: "Yapping Techflow adalah induk ekosistem teknologi. Plivin.co adalah venture startup in-house kami yang bergerak di industri digital gifting & hampers, dan segera berekspansi ke ekosistem undangan pernikahan digital. Sementara itu, Komose adalah brand komersial kami yang khusus melayani pembuatan website interaktif, sistem kelola toko (CMS), dan solusi digital klien seperti ClickCare.id.",
  },
  {
    q: "Jika saya adalah pemilik bisnis yang ingin membuat website jualan atau katalog toko, harus ke mana?",
    a: "Untuk kebutuhan website bisnis, UMKM, toko ritel, klinik, maupun jasa profesional dengan alur pesanan rapi ke WhatsApp dan sistem CMS mandiri, Anda dapat langsung mengunjungi platform komersial kami di Komose (akses via komose.id atau menu Komose ↗ di navbar). Di sana tersedia pilihan paket terima beres maupun paket mandiri dengan pengerjaan cepat 3–5 hari.",
  },
  {
    q: "Apakah Yapping Techflow membuka peluang kemitraan ventura atau Tech Co-Founder?",
    a: "Ya. Kami sangat terbuka untuk model kemitraan strategis, venture building bersama founder terpilih, serta kerja sama berbasis milestone produk atau equity partnership untuk bisnis yang memiliki validasi pasar kuat dan membutuhkan keunggulan rekayasa perangkat lunak tingkat tinggi.",
  },
  {
    q: "Standar arsitektur dan teknologi apa yang diterapkan di setiap produk?",
    a: "Seluruh produk di bawah ekosistem kami dibangun menggunakan modern edge stack: Next.js Turbo, TypeScript ketat, arsitektur multi-tenant domain routing, performa loading sub-1 detik, dan infrastruktur cloud zero-downtime yang siap diekstensi secara modular menjadi superapp terintegrasi.",
  },
  {
    q: "Bagaimana cara mendiskusikan kerja sama platform kustom atau inisiatif ventura?",
    a: "Anda dapat langsung menghubungi dan berdiskusi dengan founder kami via WhatsApp di 0811-1001-0324. Kami membatasi jumlah proyek dan inisiatif strategis setiap kuartalnya untuk memastikan eksekusi kode, arsitektur, dan peluncuran produk berada pada standar kualitas tertinggi.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative bg-[#F9F7F2] px-4 py-24 sm:px-6 sm:py-32 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[500px] rounded-full bg-emerald-100/30 blur-[150px]" />
      <div className="pointer-events-none absolute left-0 bottom-1/4 h-[400px] w-[500px] rounded-full bg-sky-100/30 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-950 sm:text-5xl font-grotesk">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-stone-600 font-outfit">
            Transparansi seputar visi studio, kemitraan ventura, dan ekosistem produk teknologi Yapping Techflow.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-stone-300 bg-white shadow-md"
                    : "border-stone-200/70 bg-white/50 hover:bg-white hover:border-stone-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-stone-900 font-jakarta leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-stone-900 bg-stone-900 text-white rotate-45"
                        : "border-stone-300 bg-transparent text-stone-500"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 1v10M1 6h10" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px w-full bg-stone-200/70 mb-4" />
                        <p className="text-sm text-stone-600 font-outfit leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

