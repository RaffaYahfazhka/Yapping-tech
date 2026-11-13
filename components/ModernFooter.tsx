import Link from "next/link";
import { YappingLogo } from "@/components/YappingLogo";

export function ModernFooter({
  className = "bg-white",
}: {
  className?: string;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`relative pt-16 sm:pt-24 pb-12 sm:pb-16 text-stone-900 font-jakarta overflow-hidden ${className}`}>
      <div className="mx-auto max-w-5xl px-6 text-center">
        {/* Center: Large Distinctive Yapping Techflow Icon/Logo */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
            aria-label="Yapping Techflow Home"
          >
            <YappingLogo height={34} />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav
          aria-label="Footer Navigation"
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 sm:gap-7 text-xs sm:text-[13.5px] font-semibold text-stone-800"
        >
          <a href="#hero" className="hover:text-black transition-colors">
            Beranda
          </a>
          <a href="#about" className="hover:text-black transition-colors">
            Tentang Kami
          </a>
          <a href="#products" className="hover:text-black transition-colors">
            Produk &amp; Layanan
          </a>
          <a href="#comparison" className="hover:text-black transition-colors">
            Keunggulan
          </a>
          <a href="#faq" className="hover:text-black transition-colors">
            FAQ
          </a>
          <Link href="/komose" className="hover:text-black transition-colors">
            Platform Komose
          </Link>
          <a
            href="https://plivin-digigift.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            Plivin.co
          </a>
          <a
            href="https://wa.me/6281110010324"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            Kontak
          </a>
        </nav>

        {/* Center: Social Icons Row (X, LinkedIn, Facebook, Threads, Instagram, TikTok, YouTube) */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4 sm:gap-5 text-stone-900">
          {/* X (Twitter) */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="p-1 text-stone-900 hover:text-stone-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-1 text-stone-900 hover:text-stone-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-1 text-stone-900 hover:text-stone-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
              <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
            </svg>
          </a>

          {/* Threads */}
          <a
            href="https://threads.net"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Threads"
            className="p-1 text-stone-900 hover:text-stone-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
              <path d="M12.186 24C5.467 24 0 18.533 0 11.814 0 5.094 5.467 0 12.186 0c6.643 0 11.968 5.253 12.014 11.895-.046 6.845-5.371 12.105-12.014 12.105zm-.102-3.85c3.272 0 5.867-2.072 6.552-5.111-2.046-1.077-4.417-1.428-6.697-1.002-.563.106-1.114.267-1.644.482-.047.53-.047 1.066.002 1.6.43 2.502 2.144 4.031 4.787 4.031zm1.093-8.878c.84-.09 1.684-.047 2.516.128.261-2.473-1.127-4.582-3.609-4.582-2.827 0-4.636 2.457-4.568 5.441.742-.489 1.704-.793 2.766-.917.962-.112 1.932-.102 2.895-.07z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-1 text-stone-900 hover:text-stone-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="p-1 text-stone-900 hover:text-stone-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="p-1 text-stone-900 hover:text-stone-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Elegant Diagonal Hatch Strip Pattern Divider (Persis seperti gambar referensi) */}
      <div className="mt-14 w-full h-11 border-y border-stone-200/80 bg-[repeating-linear-gradient(45deg,#f5f5f4,#f5f5f4_6px,#ffffff_6px,#ffffff_12px)] opacity-90" />

      {/* Bottom Copyright Text */}
      <div className="mt-8 text-center text-[13px] text-stone-400 font-medium">
        <p>© {currentYear} Yapping Techflow. All rights reserved.</p>
      </div>
    </footer>
  );
}

