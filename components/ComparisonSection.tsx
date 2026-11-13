const COMPARISON_ROWS = [
  {
    feature: "Performa & Kecepatan Loading",
    conventional: "3–8 detik (kehilangan calon klien & bounce rate tinggi)",
    yapping: "Sub-1 Detik — Turbo Stack Next.js & Edge Runtime",
    highlight: false,
  },
  {
    feature: "Arsitektur Konversi",
    conventional: "Form statis kaku yang lambat & jarang direspons",
    yapping: "Integrated Conversion Funnel — Direct API, WhatsApp & Checkout Otomatis",
    highlight: true,
  },
  {
    feature: "Fondasi Rekayasa Kode",
    conventional: "Template monolitik berat, rentan conflict plugin & bloatware",
    yapping: "Modular App Router — Siap Dikembangkan Jadi Superapp Terintegrasi",
    highlight: false,
  },
  {
    feature: "Multi-Domain Routing",
    conventional: "Terkunci vendor atau butuh setup DNS & server rumit",
    yapping: "Multi-Tenant Edge Gateway — Domain Mandiri (namausaha.com) Bersih & Terisolasi Penuh",
    highlight: false,
  },
  {
    feature: "Kepemilikan Penuh (IP)",
    conventional: "Kode disandera langganan platform, susah diekstensi atau dipindah",
    yapping: "100% Kepemilikan Kode & Aset — Deploy Bebas ke Infrastruktur Sendiri",
    highlight: true,
  },
  {
    feature: "Continuous Deployment",
    conventional: "Maintenance manual rawan downtime & biaya konsultan tinggi",
    yapping: "Arsitektur Terpusat — Zero Downtime, CI/CD Pipeline & Monitoring 24/7",
    highlight: false,
  },
  {
    feature: "Desain & Brand Experience",
    conventional: "Template massal pasaran yang mudah ditiru kompetitor",
    yapping: "Bespoke High-Conversion Design — Dirancang Khusus Memperkuat Valuasi Brand",
    highlight: true,
  },
];

export function ComparisonSection() {
  return (
    <section id="comparison" className="relative bg-[#F9F7F2] px-4 py-24 sm:px-6 sm:py-32 overflow-hidden">
      {/* Soft ambient glows */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[600px] rounded-full bg-amber-100/25 blur-[160px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[400px] w-[500px] rounded-full bg-sky-100/20 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-950 sm:text-5xl font-grotesk">
            Yapping Techflow vs Agensi Konvensional
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-stone-600 font-outfit">
            Bukan soal harga. Ini soal <strong className="text-stone-900">keunggulan arsitektur</strong> yang menciptakan perbedaan nyata pada konversi dan skalabilitas bisnis Anda.
          </p>
        </div>

        {/* Table for Desktop / Tablet */}
        <div className="hidden sm:block overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-xl shadow-stone-900/[0.05]">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_1.1fr_1.1fr] border-b border-stone-200/80 bg-stone-50/80">
            <div className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-500 font-grotesk">
              Standar / Fitur
            </div>
            <div className="px-6 py-4 border-l border-stone-200/60">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400 font-grotesk">
                Agensi / Freelancer Konvensional
              </span>
            </div>
            <div className="px-6 py-4 border-l border-stone-200/60">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-700 font-grotesk">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Yapping Techflow Standard
              </span>
            </div>
          </div>

          {/* Table Rows */}
          {COMPARISON_ROWS.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_1.1fr_1.1fr] border-b border-stone-100 last:border-0 transition-colors ${
                row.highlight ? "bg-emerald-50/40" : "bg-white hover:bg-stone-50/50"
              }`}
            >
              {/* Feature label */}
              <div className="px-6 py-5 flex items-center">
                <span className="text-sm font-bold text-stone-900 font-jakarta">
                  {row.feature}
                </span>
              </div>

              {/* Conventional */}
              <div className="px-6 py-5 border-l border-stone-100 flex items-center gap-3">
                <span className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-rose-100 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 2l6 6M8 2l-6 6" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </span>
                <span className="text-xs text-stone-500 font-outfit leading-snug">
                  {row.conventional}
                </span>
              </div>

              {/* Yapping */}
              <div className="px-6 py-5 border-l border-stone-100 flex items-center gap-3">
                <span className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l3 3 4-6" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="text-xs font-semibold text-stone-900 font-outfit leading-snug">
                  {row.yapping}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Stacked Cards (Visible only on < sm screens) */}
        <div className="sm:hidden space-y-3.5">
          {COMPARISON_ROWS.map((row, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-4 shadow-xs transition-all ${
                row.highlight
                  ? "border-emerald-200 bg-gradient-to-b from-emerald-50/70 to-white"
                  : "border-stone-200/90 bg-white"
              }`}
            >
              {/* Feature Title */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-stone-100">
                <span className="text-xs font-bold text-stone-900 font-jakarta">
                  {row.feature}
                </span>
                {row.highlight && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase tracking-wider font-grotesk">
                    Keunggulan Utama
                  </span>
                )}
              </div>

              {/* Conventional */}
              <div className="flex items-start gap-2.5 py-1.5">
                <span className="mt-0.5 flex-shrink-0 h-4.5 w-4.5 rounded-full bg-rose-100 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M2 2l6 6M8 2l-6 6" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-grotesk">Konvensional</p>
                  <p className="text-xs text-stone-500 font-outfit leading-snug">{row.conventional}</p>
                </div>
              </div>

              {/* Yapping */}
              <div className="flex items-start gap-2.5 pt-2 mt-1 border-t border-stone-100/70">
                <span className="mt-0.5 flex-shrink-0 h-4.5 w-4.5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l3 3 4-6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 font-grotesk">Yapping Techflow</p>
                  <p className="text-xs font-semibold text-stone-900 font-outfit leading-snug">{row.yapping}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center mt-6 text-xs text-stone-500 font-outfit">
          Semua standar ini berlaku di <strong className="text-stone-700">setiap proyek</strong> yang kami kerjakan — tanpa pengecualian.
        </p>
      </div>
    </section>
  );
}

