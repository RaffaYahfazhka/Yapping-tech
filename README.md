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
- **Peran:** Brand komersial untuk bisnis freelance dan jasa pembuatan website toko online & sistem CMS mandiri.
- **Portofolio Klien:**
  - **ClickCare** (Klien utama yang sudah terikat kontrak).
  - Klien-klien baru yang akan datang (contoh: Roti Momoh, dsb).
- **Fungsi:**
  - Tempat hosting seluruh website klien: `clickcare.komose.id`, `rotimomoh.komose.id`, dll.
  - Sistem CMS klien: **[Nama Brand] Management System powered by Komose**.
  - Footer web klien: `Powered by Komose · An ecosystem by Yapping Techflow`.

#### 🎯 Spesifikasi & Konsep Komose

##### 📌 Tujuan:
1. **0% Potongan Komisi Selamanya:** Menyelamatkan margin keuntungan merchant dari potongan 15%–30% di marketplace/ojol; seluruh uang langsung masuk utuh ke rekening pribadi pemilik bisnis.
2. **Otomasi Alur WhatsApp Siap Bayar:** Memangkas alur chat manual yang bertele-tele dan mengeliminasi drama pembeli PHP/ghosting dengan format pesanan rapi (produk, varian, alamat, dan total biaya sudah terhitung).
3. **Kredibilitas & Valuasi Brand Toko:** Memberikan storefront toko online berkelas dengan loading sub-1 detik yang tampil bonafide di bio Instagram, TikTok, dan Google Maps.
4. **Kemandirian Operasional Merchant:** Memberdayakan pemilik bisnis agar dapat mengupdate produk, harga, dan promo secara mandiri dari smartphone tanpa bergantung pada jasa IT/programmer.

##### 👥 Jenis-Jenis User:
1. **Merchant / Pemilik Toko (Bisnis Ritel & F&B):**
   - Toko Roti & Kue (Bakery rumahan, custom cake, pastry).
   - Florist, Buket Bunga, & Hampers / Souvenir Wisuda & Pernikahan.
   - Katering Nasi Box, Katering Harian Kantor, & Prasmanan.
   - Merchant F&B dan ritel kreatif lokal lainnya.
2. **Penyedia Jasa & Layanan Spesialis:**
   - Klinik Kesehatan, Dokter & Layanan Homecare (contoh: ClickCare.id).
   - Studio kecantikan, salon, perawat, atau jasa panggilan ke rumah.
3. **Admin Toko / Customer Service:**
   - Mengelola pesanan WhatsApp yang masuk rapi tanpa perlu menghitung ongkir manual atau mengecek ketersediaan varian satu per satu.
4. **Calon Pembeli / Pelanggan Akhir:**
   - Pengunjung toko online yang ingin pengalaman belanja cepat di HP, bebas ribet tanpa perlu download aplikasi atau mengisi form kuesioner yang panjang.

##### 🛠️ Fitur-Fitur:
1. **Katalog Visual Interaktif (Anti Tanya-Tanya):**
   - Pemilihan varian langsung (ukuran kue, diameter, rasa, pilihan pita bunga, jenis lauk katering).
   - Add-on custom (kartu ucapan ucapan spesial, lilin, extra topping).
2. **Kalkulator Ongkir Otomatis per Kecamatan:**
   - Ongkos kirim terhitung otomatis berdasarkan wilayah kecamatan pembeli untuk mencegah drama pembeli kaget ongkir di akhir obrolan.
3. **1-Click WhatsApp Checkout (Format Siap Bayar):**
   - Pembeli langsung dialihkan ke WhatsApp admin dengan teks pesan terformat rapi berisi rincian pesanan, alamat antar, dan total pembayaran yang tinggal diberi nomor rekening.
4. **Dashboard Mandiri ([Nama Brand] Management System / CMS HP):**
   - Dashboard pengelolaan toko mandiri berbahasa Indonesia yang responsif diakses dari HP.
   - Tambah menu baru, ubah harga, matikan stok habis (*sold out*), dan pasang banner promo musiman dalam 30 detik tanpa koding.
5. **Multi-Domain & Subdomain Generator:**
   - Dukungan instan untuk subdomain gratis `namatoko.komose.id` maupun custom domain mandiri `namatoko.com`.
6. **Integrasi Ekosistem Multi-Tenant & Zero Commission Engine:**
   - 100% omzet langsung ke rekening penjual tanpa perantara payment gateway wajib atau potongan komisi platform.

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
