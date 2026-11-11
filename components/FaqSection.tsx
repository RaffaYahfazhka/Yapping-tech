"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Apakah saya bisa menggunakan domain milik saya sendiri?",
    a: "Ya, tentu. Semua proyek yang kami bangun mendukung custom domain mandiri. Klien cukup mengarahkan DNS domain mereka ke server kami, dan website mereka langsung bisa diakses di URL bersih seperti tokokue.com tanpa embel-embel apapun. Kami juga membantu proses setup DNS dari awal hingga selesai.",
  },
  {
    q: "Berapa lama proses pembuatan hingga website bisa live?",
    a: "Rata-rata 7–14 hari kerja tergantung kompleksitas fitur. Klien yang memilih paket template siap pakai (Atelier Suite) bisa live dalam 3–5 hari kerja. Proyek kustom seperti platform On-Demand atau SaaS biasanya membutuhkan sprint 2–4 minggu dengan milestone yang terukur dan transparan.",
  },
  {
    q: "Apakah saya bisa ganti foto produk dan harga secara mandiri?",
    a: "Ya. Setiap proyek yang kami serahkan dilengkapi dengan panduan pengelolaan konten yang praktis. Untuk klien yang membutuhkan kemudahan lebih, kami bisa mengintegrasikan CMS (Content Management System) sederhana sehingga klien bisa update produk, harga, dan gambar sendiri tanpa perlu menyentuh kode.",
  },
  {
    q: "Bagaimana alur checkout dan pemesanan dari website ke saya sebagai pemilik bisnis?",
    a: "Setiap transaksi atau request pemesanan dari website langsung diteruskan secara otomatis ke WhatsApp bisnis Anda dalam format pesan yang rapi dan terstruktur — termasuk nama produk, jumlah, total harga, dan lokasi pengiriman. Tidak perlu aplikasi tambahan. Tidak perlu bayar komisi ke marketplace.",
  },
  {
    q: "Jika bisnis saya berkembang dan butuh fitur lebih canggih, apakah bisa dikembangkan?",
    a: "Inilah mengapa kami membangun setiap proyek dengan arsitektur modular Next.js yang scalable. Anda bisa mulai dari landing page sederhana, lalu bertahap kami tambahkan modul seperti: dashboard analitik, sistem loyalty poin, booking online, hingga ekosistem superapp terintegrasi — semuanya dalam satu platform yang sudah ada.",
  },
  {
    q: "Berapa investasi untuk membangun website bersama Yapping Techflow?",
    a: "Investasi bergantung pada scope proyek. Template Atelier Suite siap pakai tersedia dengan paket terjangkau untuk UMKM dan usaha niche. Proyek kustom seperti platform On-Demand atau B2B SaaS dihitung berdasarkan complexity sprint. Hubungi kami langsung via WhatsApp untuk konsultasi gratis dan estimasi anggaran yang transparan.",
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
            Jawaban transparan untuk pertanyaan terbesar sebelum Anda memutuskan berkolaborasi bersama kami.
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

