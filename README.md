# 🌟 Yapping Techflow — Multi-Tenant Ecosystem & Digital Studio Platform

Repository ini merupakan platform komprehensif yang memadukan **Company Profile Yapping Techflow** dengan **Multi-Tenant Niche Engine (Atelier Suite)**. Dibangun menggunakan arsitektur modern Next.js yang memungkinkan **satu codebase / satu repository melayani banyak domain klien mandiri secara bersih (clean URL tanpa base-path)**.

---

## 🌐 Cara Kerja Arsitektur Multi-Domain (Multi-Tenancy)

Salah satu keunggulan utama dari repository ini adalah kemampuannya menampung banyak website dan domain klien berbeda dalam **1 Repository & 1 Deployment**, tanpa membuat aplikasi berat dan tanpa URL berantakan (`/templates/...`).

### 1. Diagram Alur Kerja (Workflow)

```
                            [ Permintaan Pengunjung ]
                                        │
                                        ▼
                         ┌─────────────────────────────┐
                         │   Next.js Edge Middleware   │  (middleware.ts)
                         │   Membaca `req.headers.host`│
                         └──────────────┬──────────────┘
                                        │
           ┌────────────────────────────┴────────────────────────────┐
           ▼                                                         ▼
[ Domain Utama: yappingtechflow.com ]              [ Custom Domain Klien: rotienak.com ]
           │                                                         │
           ▼                                                         ▼
Tampilkan Company Profile & Studio                 Diam-diam REWRITE di level server:
- Hero S3 Marketing Copy                           `NextResponse.rewrite('/templates/patisserie')`
- Products & Services Slider                                         │
- Katalog Template Demo (/templates)                                 ▼
- Filosofi & Closing CTA                           URL Browser Klien TETAP BERSIH:
                                                   👉 https://rotienak.com/
                                                   👉 Floating Dock Agensi Otomatis HILANG!
```

---

### 2. Kenapa Tidak Berat Walaupun 1 Repo?

Banyak yang mengira menampung puluhan website dalam 1 repo akan membuat aplikasi lambat. Faktanya, arsitektur ini **sangat ringan dan cepat** karena:

1. **Automatic Code Splitting (Next.js App Router)**:
   - Pengunjung yang membuka `rotienak.com` **hanya mendownload** aset dan kode untuk template Patisserie.
   - Kode Company Profile, template Florist, Catering, dll **TIDAK PERNAH dikirimkan** ke browser pengunjung tersebut.
2. **Server-Side URL Rewrite (Edge)**:
   - Proses pencocokan domain terjadi di level Edge Middleware dalam waktu kurang dari **10 milidetik (sub-10ms)** sebelum halaman di-render.
3. **Database/Config-Driven Multi-Tenancy**:
   - Satu komponen template dapat digunakan oleh ratusan klien berbeda, hanya datanya (nama toko, harga produk, gambar, nomor WhatsApp) yang disesuaikan.
4. **Maintenance Super Cepat**:
   - Jika ada perbaikan bug atau update fitur di keranjang belanja, Anda hanya perlu mengedit kode di **1 tempat saja**. Seketika itu juga, **seluruh website klien otomatis ter-update** tanpa perlu deploy puluhan repo terpisah.

---

### 3. Panduan Menambahkan Domain Klien Baru

Ketika ada klien baru yang membeli template dan menggunakan domain pribadi mereka sendiri:

#### Langkah 1: Arahkan DNS Domain Klien
Minta klien (atau Anda sendiri) untuk mengarahkan DNS domain mereka ke Vercel/server hosting proyek:
- **Tipe A Record**: `@` diarahkan ke IP Server / Vercel (`76.76.21.21`).
- **Tipe CNAME**: `www` diarahkan ke `cname.vercel-dns.com` (atau domain hosting Anda).
- Di dashboard Vercel: Tambahkan domain tersebut ke dalam daftar domain proyek.

#### Langkah 2: Daftarkan Domain di `middleware.ts`
Buka file `middleware.ts`, lalu tambahkan baris domain klien ke objek `CLIENT_DOMAINS`:

```ts
// middleware.ts
export const CLIENT_DOMAINS: Record<string, string> = {
  // Contoh Domain Klien Nyata:
  "rotienak.com": "patisserie",
  "www.rotienak.com": "patisserie",
  "bloomboutique.id": "florist",
  "sedapcatering.com": "catering",

  // Local testing preview:
  "patisserie.localhost:3000": "patisserie",
  "florist.localhost:3000": "florist",
  "catering.localhost:3000": "catering",
};
```

Selesai! Saat `rotienak.com` diakses, pengunjung langsung melihat website toko kue tersebut secara penuh dan bersih di `https://rotienak.com/`.

---

### 4. White-Label Otomatis
Komponen `DemoControlDock.tsx` secara otomatis mendeteksi nama domain yang sedang aktif:
- **Di domain agensi (`yappingtechflow.com` / `localhost:3000`)**: Floating dock aktif untuk kebutuhan demo & pitching ke calon klien.
- **Di custom domain klien (`rotienak.com`)**: Floating dock **otomatis dinonaktifkan (hidden)** sehingga website klien tampil 100% profesional dan independen tanpa branding agensi yang mengganggu.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components & Dynamic Routing)
- **UI Library**: [React](https://react.dev/) 19 & React DOM 19
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/) (Full Type-Safety)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v3 (Responsive, Fluid Theme Tokens)
- **Motion & UI**: [Framer Motion](https://www.framer.com/motion/) & [Embla Carousel](https://www.embla-carousel.com/)

---

## 📂 Struktur Direktori Utama

```text
yapping-tech/
├── middleware.ts          # Edge Middleware: Otak Multi-Tenant URL Rewrite
├── app/
│   ├── page.tsx           # Company Profile Yapping Techflow (Domain Utama)
│   ├── templates/
│   │   ├── page.tsx       # Katalog Direktori Template Bisnis
│   │   └── [slug]/
│   │       └── page.tsx   # Dynamic Multi-Niche Engine (/patisserie, /florist, /catering)
├── components/
│   ├── ComproNavbar.tsx   # Floating Pill Navbar Company Profile
│   ├── UnifiedProductsServices.tsx # Editorial Carousel Portofolio & Deployments
│   ├── DemoControlDock.tsx# Switcher Dock (Otomatis White-Label di domain klien)
│   ├── experiences/       # Modul pengalaman per niche (Patisserie, Florist, Catering)
│   └── CartDrawer.tsx     # Alur keranjang & checkout langsung ke WhatsApp
├── config/
│   └── niches.ts          # Database konfigurasi template, produk, & nomor WhatsApp
└── types/                 # Definisi tipe data TypeScript
```

---

## 🚀 Menjalankan Proyek Secara Lokal

### 1. Instalasi
```bash
npm install
# atau
yarn install
```

### 2. Jalankan Server Dev
```bash
npm run dev
# atau
yarn dev
```

### 3. Menguji Multi-Domain di Localhost
Buka browser dan coba URL berikut:
- **Company Profile Utama**: [http://localhost:3000](http://localhost:3000)
- **Katalog Template**: [http://localhost:3000/templates](http://localhost:3000/templates)
- **Subdomain Patisserie Klien**: [http://patisserie.localhost:3000](http://patisserie.localhost:3000)
- **Subdomain Florist Klien**: [http://florist.localhost:3000](http://florist.localhost:3000)
- **Subdomain Catering Klien**: [http://catering.localhost:3000](http://catering.localhost:3000)

---

## 📄 Lisensi
Hak Cipta © 2026 **Yapping Techflow**. Seluruh hak cipta dilindungi undang-undang.
