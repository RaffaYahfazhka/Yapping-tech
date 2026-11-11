# 🌟 Atelier Showcase — Client Landing Page Template & Prototype

Repository ini merupakan **interactive landing page & showcase prototype** yang dirancang sebagai sampel layout presentasi/pitching untuk calon klien. Proyek ini memamerkan desain modern, interaktif, responsif, serta kemampuan kustomisasi tema/layout untuk berbagai jenis bisnis (*niche*).

---

## 🎯 Tujuan Proyek

1. **Portfolio & Client Demo**: Digunakan sebagai demonstrasi langsung (live interactive prototype) ke calon klien mengenai standar desain, animasi, alur checkout/katalog, dan responsivitas web modern.
2. **Multi-Niche Layout Switcher**: Dilengkapi dengan fitur demo switchable layout (misal: *Patisserie*, *Florist*, *Catering*, dll.) melalui `DemoControlDock` untuk memperlihatkan fleksibilitas template dalam menyesuaikan branding klien.
3. **Interactive E-Commerce / Showcase Feel**: Memiliki elemen interaktif seperti slider katalog, FAQ accordion, cart drawer preview, visual storytelling, dan micro-interactions yang halus.

---

## 🛠️ Tech Stack & Dependencies

Proyek ini dibangun menggunakan arsitektur web modern yang cepat, scalable, dan type-safe:

### **Core Framework & Runtime**
- **[Next.js](https://nextjs.org/) (v16 App Router)**: Framework React full-stack performa tinggi dengan fitur modern (Server/Client Components, routing dinamis, dan optimasi aset).
- **[React](https://react.dev/) 19 & React DOM 19**: Library UI terkini untuk reaktivitas dan komponen berbasis deklaratif.
- **[TypeScript](https://www.typescriptlang.org/)**: Memberikan static type-checking yang ketat untuk skalabilitas kode dan minim bug.

### **Styling & UI Design**
- **[Tailwind CSS](https://tailwindcss.com/) (v3)**: Utility-first CSS framework untuk styling cepat, desain konsisten, dan fleksibilitas responsif di semua ukuran layar (Mobile, Tablet, Desktop).
- **[PostCSS](https://postcss.org/) & Autoprefixer**: Tooling CSS modern untuk kompatibilitas browser lintas platform.

### **Motion & Interactions**
- **[Framer Motion](https://www.framer.com/motion/)**: Library animasi standar industri untuk micro-interactions, layout transitions, drawer slide-ins, dan page transitions yang halus.
- **[Embla Carousel React](https://www.embla-carousel.com/)**: Carousel library yang sangat ringan, fluid, dan touch-friendly untuk slider produk/showcase interaktif.

---

## 📂 Struktur Direktori Utama

```text
landing-page/
├── app/                  # Next.js App Router (Layouts & Pages)
├── components/           # Komponen UI utama
│   ├── experiences/      # Template layout spesifik niche (Catering, Florist, Patisserie)
│   ├── ui/               # Reusable UI primitives
│   ├── CartDrawer.tsx    # Komponen keranjang belanja / preview checkout
│   ├── DemoControlDock.tsx# Kontrol floating dock untuk switch template/tema demo
│   ├── HeroSection.tsx   # Hero banner utama
│   ├── InteractiveShowcaseSlider.tsx # Carousel slider produk/portofolio
│   └── ...
├── config/               # Konfigurasi data & konten demo
├── context/              # State management React Context (ShowcaseContext)
├── lib/                  # Helper utilities & class merging (cn)
├── public/               # Asset statis (gambar, icon, font)
└── types/                # Definisi TypeScript interface & types
```

---

## 🚀 Memulai Proyek (Local Development)

### 1. Prasyarat
Pastikan Anda telah menginstal **Node.js** (v18.x atau yang lebih baru) dan package manager (**npm**, **yarn**, atau **pnpm**).

### 2. Instalasi Dependensi
```bash
yarn install
# atau
npm install
```

### 3. Menjalankan Server Pengembangan
```bash
yarn dev
# atau
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat preview landing page.

### 4. Build untuk Production
```bash
yarn build
yarn start
```

---

## 💡 Nilai Jual untuk Klien

- **Tailored Branding**: Layout dan palet warna dapat dengan mudah disesuaikan mengikuti brand guideline klien.
- **Mobile First & Responsive**: Tampilan optimal di perangkat smartphone, tablet, maupun desktop.
- **High Performance & SEO Ready**: Dioptimasi menggunakan Next.js App Router untuk performa loading cepat dan struktur SEO yang rapi.
- **Conversion-Focused**: Dilengkapi CTA (Call to Action) yang jelas, navigasi intuitif, dan simulasi alur pemesanan interaktif.

