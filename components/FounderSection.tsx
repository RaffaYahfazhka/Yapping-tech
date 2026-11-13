"use client";

import Image from "next/image";
import { WHATSAPP_NUMBER } from "@/config/niches";

interface Person {
  name: string;
  role: string;
  image?: string;
  bio: string;
  initials: string;
}

const PEOPLE: Person[] = [
  {
    name: "Muhammad Raffa Yahfazhka",
    role: "Founder & Lead Architect",
    image: "/images/founder/founder.jpg",
    bio: "Fokus pada arsitektur full-stack, rekayasa platform edge berkecepatan tinggi, serta inkubasi produk venture dengan orientasi skalabilitas dan konversi riil.",
    initials: "RY",
  },
  {
    name: "Fakhri Rossi",
    role: "Co-Founder",
    image: undefined, // foto menyusul
    bio: "Mengawal operasional strategis, tata kelola kemitraan bisnis, dan eksekusi platform agar solusi digital yang dibangun tepat sasaran dan bernilai komersial tinggi.",
    initials: "FR",
  },
];

export function FounderSection() {
  const whatsappPitch = encodeURIComponent(
    "Halo, saya tertarik berdiskusi mengenai kebutuhan teknologi dan kolaborasi bisnis bersama tim Yapping Techflow.",
  );

  return (
    <section
      id="founder"
      className="relative px-4 py-20 sm:px-6 sm:py-28 bg-[#FAF8F5] border-b border-stone-200/80 overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[500px] w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-60"
      >
        <div className="absolute right-[10%] top-[20%] h-[320px] w-[360px] rounded-full bg-amber-200/25 blur-[100px]" />
        <div className="absolute left-[10%] bottom-[10%] h-[300px] w-[340px] rounded-full bg-emerald-100/30 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section Header: Natural, Direct & Concise */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-800 mb-2">
            // FOUNDERS &amp; LEAD ARCHITECTS
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-950 font-grotesk leading-tight">
            Di balik arsitektur dan sistem yang kami bangun.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 font-outfit leading-relaxed">
            Kami mengawal langsung arsitektur sistem dari hulu ke hilir tanpa lempar ke pihak ketiga, memastikan setiap venture in-house dan platform klien dibangun di atas fondasi kelas dunia yang siap berekspansi.
          </p>
        </div>

        {/* 2 Founders Square Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {PEOPLE.map((person) => {
            const hasPhoto = Boolean(person.image);

            return (
              <div
                key={person.name}
                className="group relative border border-stone-300/90 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                {/* Photo / Placeholder Container (Strict Square) */}
                <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                  {hasPhoto ? (
                    <>
                      <Image
                        src={person.image!}
                        alt={person.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 420px"
                        priority
                        className="object-cover object-center filter grayscale sepia-[0.25] contrast-[1.08] brightness-[0.95] transition-all duration-700 ease-out group-hover:filter-none group-hover:scale-105"
                      />
                      {/* Vintage Vignette Overlay that fades out on hover */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 transition-opacity duration-500 group-hover:opacity-20" />

                      <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between text-white/90">
                        <span className="text-2xs font-mono uppercase tracking-widest text-stone-300">
                          Hover untuk warna asli
                        </span>
                        <span className="text-xs transition-transform duration-300 group-hover:rotate-45">
                          ↗
                        </span>
                      </div>
                    </>
                  ) : (
                    /* Minimalist Square Placeholder for Fakhri Rossi */
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-stone-100 via-stone-50 to-stone-200 text-center p-6 border-b border-stone-200">
                      <div className="flex h-20 w-20 items-center justify-center border border-stone-300 bg-white text-stone-700 font-grotesk font-black text-2xl shadow-2xs">
                        {person.initials}
                      </div>
                      <span className="mt-4 text-xs font-mono font-medium text-stone-500 uppercase tracking-widest">
                        Foto Segera Diperbarui
                      </span>
                    </div>
                  )}
                </div>

                {/* Identity & Short Bio */}
                <div className="p-5 sm:p-6 bg-white border-t border-stone-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-extrabold text-stone-950 font-grotesk tracking-tight">
                          {person.name}
                        </h3>
                        <p className="text-xs font-medium text-emerald-800 font-mono mt-0.5">
                          {person.role}
                        </p>
                      </div>
                      <div className="flex h-7 w-7 items-center justify-center bg-stone-100 text-stone-800 text-xs font-bold shrink-0">
                        ✦
                      </div>
                    </div>
                    <p className="mt-3 text-xs sm:text-sm text-stone-600 font-outfit leading-relaxed">
                      {person.bio}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Direct CTA */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-stone-200/80">
          <div className="text-xs text-stone-500 font-outfit">
            Konsultasi langsung tanpa perantara sales: arsitektur sistem, estimasi waktu, dan integrasi fitur.
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappPitch}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-stone-950 px-6 py-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-stone-800 shrink-0"
          >
            <span>Diskusi Langsung dengan Tim</span>
            <span className="text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
