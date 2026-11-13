"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon, ArrowUpRightIcon, MessageCircleIcon } from "./KomoseIcons";
import { WHATSAPP_NUMBER } from "@/config/niches";
import { KomoseLogo } from "./KomoseLogo";

const NAV_LINKS = [
  { id: "masalah-solusi", label: "Solusi", href: "#masalah-solusi" },
  { id: "klien-demo", label: "Klien & Demo", href: "#klien-demo" },
  { id: "keunggulan", label: "Keunggulan", href: "#keunggulan" },
  { id: "paket", label: "Paket", href: "#paket" },
  { id: "faq", label: "FAQ", href: "#faq" },
];

export function KomoseNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("masalah-solusi");
  const [mobileOpen, setMobileOpen] = useState(false);

  const waOrderUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Halo Komose! Saya mau konsultasi pembuatan website untuk usaha saya."
  )}`;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const sectionIds = NAV_LINKS.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0.01 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="mx-auto max-w-6xl pointer-events-auto">
        <div
          className={`flex items-center justify-between rounded-full border transition-all duration-300 px-4 sm:px-5 py-2.5 ${
            scrolled
              ? "bg-[#FFFEFF]/95 border-[#1B4328]/15 shadow-[0_12px_36px_rgba(27,67,40,0.12)] backdrop-blur-md"
              : "bg-[#FFFEFF]/90 border-[#1B4328]/10 shadow-[0_6px_24px_rgba(27,67,40,0.06)] backdrop-blur-sm"
          }`}
        >
          {/* Brand */}
          <Link href="#top" className="flex items-center">
            <KomoseLogo variant="dark" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full bg-[#1B4328]/[0.04] p-1 border border-[#1B4328]/10">
            {NAV_LINKS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold font-jakarta transition-all ${
                    isActive
                      ? "bg-[#1B4328] text-[#FFFEFF] shadow-sm"
                      : "text-[#1B4328]/80 hover:text-[#1B4328] hover:bg-[#1B4328]/5"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <Link
              href="/templates"
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-semibold font-jakarta text-[#FF681F] hover:bg-[#FF681F]/10 transition-colors"
            >
              Demo & CMS
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>
          </nav>

          {/* Right CTA + Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <a
              href={waOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#FF681F] px-4 py-2 text-xs font-bold font-jakarta text-[#FFFEFF] shadow-sm shadow-[#FF681F]/25 hover:bg-[#1B4328] transition-colors"
            >
              <MessageCircleIcon className="w-3.5 h-3.5" />
              Buat Website
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#1B4328]/15 bg-[#FFFEFF] text-[#1B4328] hover:bg-[#1B4328]/5 transition-colors"
            >
              {mobileOpen ? <XIcon className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden mt-2.5 rounded-3xl border border-[#1B4328]/15 bg-[#FFFEFF] p-4 shadow-[0_20px_50px_rgba(27,67,40,0.16)]">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-2xl px-4 py-2.5 text-sm font-semibold font-jakarta transition-colors ${
                    activeId === item.id
                      ? "bg-[#1B4328] text-[#FFFEFF]"
                      : "text-[#1B4328] hover:bg-[#1B4328]/5"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/templates"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-semibold font-jakarta text-[#FF681F] hover:bg-[#FF681F]/10 transition-colors"
              >
                <span>Katalog Demo & CMS</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-3 pt-3 border-t border-[#1B4328]/10">
              <a
                href={waOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF681F] px-4 py-3 text-sm font-bold font-jakarta text-[#FFFEFF] hover:bg-[#1B4328] transition-colors"
              >
                <MessageCircleIcon className="w-4 h-4" />
                Konsultasi Gratis via WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
