import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================================================
// DAFTAR DOMAIN & SUBDOMAIN KLIEN (Multi-Tenant Mapping)
// ============================================================================
// Nanti jika ada klien baru beli domain sendiri (misal: rotienak.com atau client.com),
// cukup daftarkan domain mereka di sini ke slug template masing-masing!
export const KOMOSE_DOMAINS = new Set<string>([
  "komose.id",
  "www.komose.id",
  "komose.localhost:3000",
]);

export const CLIENT_DOMAINS: Record<string, string> = {
  // Contoh Domain Asli Klien:
  // "rotienak.com": "patisserie",
  // "www.rotienak.com": "patisserie",
  // "bloomboutique.id": "florist",
  // "sedapcatering.com": "catering",

  // Subdomain klien di bawah Komose (komose.id):
  "patisserie.komose.id": "patisserie",
  "rotimomoh.komose.id": "patisserie",
  "florist.komose.id": "florist",
  "catering.komose.id": "catering",

  // Local testing & preview subdomains (bisa langsung dicoba di browser):
  "patisserie.localhost:3000": "patisserie",
  "bakery.localhost:3000": "patisserie",
  "rotimomoh.localhost:3000": "patisserie",
  "florist.localhost:3000": "florist",
  "catering.localhost:3000": "catering",

  // Production subdomains preview (legacy):
  "patisserie.yappingtechflow.com": "patisserie",
  "florist.yappingtechflow.com": "florist",
  "catering.yappingtechflow.com": "catering",
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = (req.headers.get("host") || "").toLowerCase();

  // Abaikan request untuk file statis Next.js, gambar, favicon, atau api
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/images") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Jika diakses lewat domain Komose (komose.id / www.komose.id / komose.localhost:3000),
  // tampilkan landing page Komose di '/' dan biarkan /templates serta /cms tetap bisa diakses.
  if (KOMOSE_DOMAINS.has(hostname) && url.pathname === "/") {
    return NextResponse.rewrite(new URL("/komose", req.url));
  }

  // Cek apakah hostname yang diakses terdaftar sebagai custom domain klien
  const matchedSlug = CLIENT_DOMAINS[hostname];

  if (matchedSlug) {
    // Jika klien mengakses /cms atau /admin di domain mereka sendiri,
    // arahkan langsung ke [Nama Brand] Management System milik mereka!
    if (url.pathname === "/cms" || url.pathname === "/admin") {
      return NextResponse.rewrite(new URL(`/cms/${matchedSlug}`, req.url));
    }

    // Jika klien mengakses root '/' (contoh: rotienak.com/)
    // Rewrites diam-diam di server ke template mereka tanpa merubah URL di browser!
    if (url.pathname === "/") {
      return NextResponse.rewrite(new URL(`/templates/${matchedSlug}`, req.url));
    }

    // Jika klien mengakses subpath (contoh: rotienak.com/customizer)
    return NextResponse.rewrite(new URL(`/templates/${matchedSlug}${url.pathname}`, req.url));
  }

  // Jika bukan custom domain klien (artinya domain utama yappingtechflow.com),
  // jalankan seperti biasa
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

