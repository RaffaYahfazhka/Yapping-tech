# 🌟 Yapping Techflow & Komose Ecosystem — Architecture & Developer Guide

Repository ini merupakan arsitektur terintegrasi yang memadukan **Company Profile Yapping Techflow** (Holding & Venture Studio) dengan platform komersial **Komose** (Layanan Pembuatan Website & CMS untuk Klien Freelance), serta **Plivin** (Startup Produk Mandiri / In-House Venture).

Dibangun menggunakan **Next.js App Router Multi-Tenant Engine**, memungkinkan **1 repository & 1 deployment hosting melayani banyak domain klien, subdomain, serta produk in-house secara independen dan bersih (clean URL tanpa base-path)**.

---

## 🏛️ Konsep Branding & Pembagian Ekosistem

Agar seluruh developer dan tim bisnis satu frekuensi, berikut peta struktur ekosistemnya:

```
                  ┌──────────────────────────────────────────────┐
                  │              YAPPING TECHFLOW                │
                  │   (Holding / Agency / Venture Builder)       │
                  │        Domain: www.yappingtechflow.id        │
                  └──────────────────────┬───────────────────────┘
                                         │
            ┌────────────────────────────┴────────────────────────────┐
            │ menaungi & mengembangkan                                │ mengoperasikan layanan client service
            ▼                                                         ▼
┌───────────────────────────────────────┐                 ┌───────────────────────────────────────┐
│               PLIVIN                  │                 │                KOMOSE                 │
│      (In-House Venture / Startup)     │                 │   (Platform Layanan Klien & Freelance)│
│          Domain: plivin.co            │                 │           Domain: komose.id           │
├───────────────────────────────────────┤                 ├───────────────────────────────────────┤
│ • Produk Digital Gifting & Hampers    │                 │ • Melayani seluruh klien freelance    │
│ • Rencana Produk: Undangan Pernikahan │                 │ • Klien saat ini: ClickCare           │
│   Digital & Interactive Wedding Suite │                 │ • Klien baru berikutnya (contoh:      │
│ • 100% Produk Mandiri (Bukan Komose)  │                 │   Roti Momoh, Catering, Florist, dll) │
└───────────────────────────────────────┘                 └───────────────────┬───────────────────┘
                                                                              │
                                         ┌────────────────────────────────────┴────────────────────────────────────┐
                                         ▼                                                                         ▼
                         ┌───────────────────────────────────────┐                 ┌───────────────────────────────────────┐
                         │      SUBDOMAIN KOMOSE (Default)       │                 │          CUSTOM DOMAIN KLIEN          │
                         │   - clickcare.komose.id               │                 │   - clickcare.id                      │
                         │   - rotimomoh.komose.id               │                 │   - rotimomoh.com                     │
                         │   - glowhouse.komose.id               │                 │   - (Semua terhubung ke Komose CMS)   │
                         └───────────────────────────────────────┘                 └───────────────────────────────────────┘
```

---

### 1. 🏛️ Yapping Techflow (`www.yappingtechflow.id`)
- **Peran:** Induk studio teknologi & holding agensi (Company Profile).
- **Fungsi:** Tempat pitching klien tingkat tinggi, korporat, dan kolaborasi strategis. Menampilkan identitas founder (**Muhammad Raffa Yahfazhka & Fakhri Rossi**), filosofi arsitektur kode, standar performa `<1 detik`, serta showcase ekosistem yang dibangun.

### 2. 🎁 Plivin (`plivin.co`) — *In-House Venture / Startup Mandiri*
- **Peran:** Startup produk mandiri besutan Yapping Techflow (**TIDAK BERADA DI BAWAH KOMOSE**).
- **Lini Produk:**
  1. *Digital Gifting & Hampers:* Kirim kado digital, e-voucher instan, custom greeting card generator, dan sales WhatsApp.
  2. *Upcoming:* **Undangan Pernikahan Digital Sinematik & Interaktif** (Wedding Invitation Suite).
- **Status:** Brand B2C mandiri yang memiliki domain dan identitasnya sendiri (`plivin.co`).

### 3. ⚡ Komose (`komose.id`) — *Platform Layanan Klien & Freelance*
- **Peran:** Brand komersial untuk bisnis freelance dan jasa pembuatan website klien.
- **Portofolio Klien:**
  - **ClickCare** (Klien utama yang sudah terikat kontrak).
  - Klien-klien baru yang akan datang (contoh: Roti Momoh, dsb).
- **Fungsi:**
  - Tempat hosting seluruh website klien: `clickcare.komose.id`, `rotimomoh.komose.id`, dll.
  - Sistem CMS klien: **[Nama Brand] Management System powered by Komose**.
  - Footer web klien: `Powered by Komose · An ecosystem by Yapping Techflow`.

---

## 🌐 Alur Kerja Arsitektur Multi-Domain (Multi-Tenancy)

Satu codebase ini menangani semua skenario request pengunjung secara transparan melalui **Next.js Edge Middleware**:

```
                                [ Request Pengunjung ]
                                           │
                                           ▼
                        ┌──────────────────────────────────────┐
                        │       Next.js Edge Middleware        │  (middleware.ts)
                        │      Membaca `req.headers.host`      │
                        └──────────────────┬───────────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
[ yappingtechflow.id ]           [ clickcare.komose.id ]             [ rotimomoh.com (Custom) ]
         │                                 │                                 │
         ▼                                 ▼                                 ▼
Render Company Profile           Server-side Rewrite ke:            Server-side Rewrite ke:
- Hero High-Conversion           `/templates/clickcare`             `/templates/patisserie`
- Products & Services                      │                                 │
- Filosofi & Founders                      ▼                                 ▼
- Katalog Template & CMS         URL Browser Klien Tetap:           URL Browser Klien Tetap:
  (/templates)                   👉 clickcare.komose.id/            👉 rotimomoh.com/
                                 👉 clickcare.komose.id/cms         👉 rotimomoh.com/cms
                                 (Dock Agensi Otomatis HILANG)      (Dock Agensi Otomatis HILANG)
```

---

## 📦 Skenario Path & URL Klien Komose (Contoh: ClickCare & Roti Momoh)

Ketika ada klien memesan pembuatan website dan CMS melalui Komose:

| Klien | Opsi Custom Domain | Opsi Subdomain Komose | URL Dashboard CMS |
|---|---|---|---|
| **ClickCare** | `https://clickcare.id/` | `https://clickcare.komose.id/` | `.../cms` *(ClickCare Management System)* |
| **Roti Momoh** | `https://rotimomoh.com/` | `https://rotimomoh.komose.id/` | `.../cms` *(Roti Momoh Management System)* |
| **Klien Baru Lainnya**| `https://domainklien.com/` | `https://brand.komose.id/` | `.../cms` *([Brand] Management System)* |

---

## 👨‍💻 Panduan Teknis Developer: Menambahkan Klien Baru di Komose

Semua klien baru di bawah naungan Komose dikonfigurasi **hanya dalam 2 langkah cepat** tanpa perlu membuat repository baru atau deploy server baru:

### Langkah 1: Hubungkan DNS Domain Klien
Jika klien menggunakan domain sendiri (`rotimomoh.com`):
- **Tipe A**: `@` $\rightarrow$ IP Server Hosting / Vercel (`76.76.21.21`).
- **Tipe CNAME**: `www` $\rightarrow$ `cname.vercel-dns.com`.
- Tambahkan domain tersebut ke dashboard project Vercel.

### Langkah 2: Daftarkan Domain di `middleware.ts`
Buka file [`middleware.ts`](file:///Users/raffayahfazhka/Downloads/master/yapping-tech/middleware.ts) dan tambahkan mapping domain ke slug template yang dipilih:

```ts
// middleware.ts
export const CLIENT_DOMAINS: Record<string, string> = {
  // Klien ClickCare (Sudah terikat):
  "clickcare.id": "clickcare",
  "www.clickcare.id": "clickcare",
  "clickcare.komose.id": "clickcare",

  // Klien Baru (Contoh: Roti Momoh):
  "rotimomoh.com": "patisserie",
  "www.rotimomoh.com": "patisserie",
  "rotimomoh.komose.id": "patisserie",

  // Klien Lainnya:
  "bloomboutique.id": "florist",
  "sedapcatering.com": "catering",
};
```

---

## 📂 Struktur Direktori Proyek

```text
yapping-tech/
├── middleware.ts          # Edge Middleware: Router utama Multi-Tenant & Domain Rewrite
├── app/
│   ├── page.tsx           # Company Profile Utama (Yapping Techflow)
│   ├── layout.tsx         # Root Layout, font, metadata, dan favicon resmi
│   ├── icon.svg           # Favicon vektor resmi Yapping Logo
│   ├── templates/
│   │   ├── page.tsx       # Katalog Template Bisnis & Paket CMS
│   │   └── [slug]/
│   │       └── page.tsx   # Dynamic Multi-Niche Engine (Patisserie, Florist, Catering, dll)
│   └── cms/
│       ├── page.tsx       # Hub Dashboard CMS
│       └── [slug]/
│           └── page.tsx   # Dedicated [Brand] Management System per industri
├── components/
│   ├── ComproNavbar.tsx   # Floating Pill Navbar (Auto-active route detection)
│   ├── FounderSection.tsx # Seksi Founder (Muhammad Raffa Yahfazhka & Fakhri Rossi)
│   ├── UnifiedProductsServices.tsx # Editorial Carousel Produk In-House (Plivin, ClickCare)
│   ├── DemoControlDock.tsx# Bottom Switcher Dock (Auto-hidden di domain klien)
│   ├── TemplatesCatalogClient.tsx # Katalog interaktif kartu template & opsi paket
│   ├── CmsShowcaseSection.tsx # Simulator interaktif CMS + Live preview iframe
│   └── cms/
│       ├── CmsWorkspace.tsx    # Workspace editor CMS
│       ├── CmsPreviewFrame.tsx # Frame live preview responsive (Desktop/Tablet/Mobile)
│       └── ImagePickerModal.tsx# Modal pemilihan foto produk & banner
├── config/
│   └── niches.ts          # Konfigurasi data template, produk default, tema & WA
├── lib/
│   └── cms.ts             # Logika sinkronisasi state CMS, domain klien & storage
└── public/
    ├── favicon.svg        # Asset favicon
    └── images/
        ├── emojis/        # Custom 3D Gloss Emojis (Cake, Bouquet, Catering, Rocket, dll)
        ├── founder/       # Foto Founder (founder.jpg)
        └── screenshot/    # Screenshot produk in-house
```

---

## ⚡ Cara Menjalankan Secara Lokal

```bash
# Jalankan development server (bisa diakses via LAN / HP)
./node_modules/.bin/next dev -H 0.0.0.0 -p 3000
```

### Menguji Multi-Domain di Localhost:
- **Company Profile Yapping**: [http://localhost:3000](http://localhost:3000)
- **Katalog Template & CMS**: [http://localhost:3000/templates](http://localhost:3000/templates)
- **Simulasi Klien ClickCare**: [http://clickcare.localhost:3000](http://clickcare.localhost:3000)
- **Simulasi Subdomain Patisserie**: [http://patisserie.localhost:3000](http://patisserie.localhost:3000)
- **Simulasi Subdomain Florist**: [http://florist.localhost:3000](http://florist.localhost:3000)
- **Simulasi Subdomain Catering**: [http://catering.localhost:3000](http://catering.localhost:3000)
- **Simulasi CMS Klien**: [http://patisserie.localhost:3000/cms](http://patisserie.localhost:3000/cms)

---

## 📄 Lisensi
Hak Cipta © 2026 **Yapping Techflow Ecosystem**. Seluruh hak cipta dilindungi undang-undang.
