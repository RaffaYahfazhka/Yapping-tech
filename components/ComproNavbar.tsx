"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/config/niches";
import { YappingLogo } from "@/components/YappingLogo";

interface NavItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Beranda", href: "/#hero" },
  { id: "products", label: "Produk", href: "/#products" },
  { id: "about", label: "Filosofi", href: "/#about" },
  { id: "founder", label: "Founder", href: "/#founder" },
  { id: "comparison", label: "Keunggulan", href: "/#comparison" },
  { id: "faq", label: "FAQ", href: "/#faq" },
  { id: "templates", label: "Templates & CMS ↗", href: "/templates", isExternal: true },
];

export function ComproNavbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Compute the current active navigation item ID based on route or scroll position
  const currentActive =
    pathname?.startsWith("/templates") || pathname?.startsWith("/cms")
      ? "templates"
      : activeSection;

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      const sections = ["faq", "comparison", "founder", "about", "products", "hero"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId === "hero" ? "home" : sectionId);
            return;
          }
        }
      }

      if (window.scrollY < 300) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveSection(hash === "hero" ? "home" : hash);
      }
    };
    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHash);
    };
  }, [pathname]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const whatsappPitch = encodeURIComponent(
    "Halo Yapping Techflow, saya tertarik untuk kolaborasi dan mendiskusikan kebutuhan digital / produk teknologi untuk bisnis saya.",
  );

  return (
    <>
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto flex h-14 w-full max-w-5xl items-center justify-between rounded-full border border-stone-200/90 bg-white/85 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl transition-all sm:px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center transition-opacity hover:opacity-85">
            <YappingLogo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 rounded-full bg-stone-100/90 p-1 text-xs font-semibold text-stone-600">
            {NAV_ITEMS.map((item) => {
              const isActive = currentActive === item.id;
              const activePill = isActive && (
                <motion.span
                  layoutId="activeComproNav"
                  className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-black/[0.04]"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 34,
                    mass: 0.7,
                  }}
                />
              );

              return item.isExternal ? (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative whitespace-nowrap rounded-full px-3 py-1.5 transition-colors ${
                    isActive
                      ? "text-stone-950 font-bold"
                      : "text-emerald-700 hover:text-emerald-800 font-bold"
                  }`}
                >
                  {activePill}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ) : (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative whitespace-nowrap rounded-full px-3 py-1.5 transition-colors ${
                    isActive ? "text-stone-950 font-bold" : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {activePill}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappPitch}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex group items-center gap-1.5 rounded-full bg-stone-950 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-stone-800 shadow-sm"
            >
              <span>Mari Kolaborasi</span>
              <span className="text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>

            {/* Hamburger button — mobile/tablet */}
            <button
              type="button"
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex flex-col items-center justify-center h-9 w-9 rounded-full border border-stone-200 bg-white/80 gap-[5px] transition-colors hover:bg-stone-50"
            >
              <span
                className={`block h-[1.5px] w-4 rounded-full bg-stone-800 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-4 rounded-full bg-stone-800 transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-4 rounded-full bg-stone-800 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
              />
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            />

            {/* Panel */}
            <motion.div
              key="mobile-panel"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="fixed top-20 inset-x-4 z-50 rounded-3xl border border-stone-200/80 bg-white/95 backdrop-blur-xl shadow-2xl p-6 lg:hidden"
            >
              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = currentActive === item.id;
                  return item.isExternal ? (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                        isActive
                          ? "bg-stone-950 text-white font-bold"
                          : "text-emerald-700 hover:bg-emerald-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileOpen(false);
                      }}
                      className={`flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-stone-950 text-white font-bold"
                          : "text-stone-700 hover:bg-stone-100"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-5 pt-5 border-t border-stone-100">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappPitch}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-950 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-stone-800"
                >
                  <span>Mari Kolaborasi</span>
                  <span className="text-emerald-400">↗</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

