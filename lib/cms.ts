import type {
  CmsReviewItem,
  CmsSectionVisibility,
  CmsSettings,
  NicheConfig,
  NicheId,
} from "@/types/landing";

export const CMS_STORAGE_KEY = "yapping_cms_niches_v1";
export const CMS_PLAN_STORAGE_KEY = "yapping_cms_client_plan_v1";
export const CMS_CHANNEL_NAME = "yapping-cms-sync";

export const DEFAULT_VISIBILITY: CmsSectionVisibility = {
  showAnnouncement: true,
  showCustomizer: true,
  showStory: true,
  showReviews: true,
  showFaq: true,
};

export const CLIENT_PREVIEW_DOMAINS: Record<NicheId, string> = {
  patisserie: "mintpatisserie.id",
  florist: "rumahbouquet.id",
  catering: "glowhouse.id",
};

export const DEFAULT_WHATSAPP_BY_NICHE: Record<NicheId, string> = {
  patisserie: "628989000160",
  florist: "6285966514774",
  catering: "6281999888790",
};

export const DEFAULT_REVIEWS_BY_NICHE: Record<NicheId, CmsReviewItem[]> = {
  patisserie: [
    {
      id: "rev-1",
      category: "bento",
      name: "Clarissa Wijaya",
      location: "Menteng, Jakarta Pusat",
      avatar: "CW",
      stars: 5,
      tag: "Custom Bento Cake 10cm · Cabang Mangga Besar",
      date: "Kemarin",
      review:
        "Bento cake-nya cantik banget persis sama foto referensi Pinterest yang aku kirim! Krimnya super light tipe chiffon Korea, manisnya pas gak eneg sama sekali. Pacarku suka banget!",
    },
    {
      id: "rev-2",
      category: "urgent",
      name: "Kevin Pratama",
      location: "Alam Sutera, Tangerang",
      avatar: "KP",
      stars: 5,
      tag: "Ready 2 Jam Basque Cheesecake · Cabang Alsut",
      date: "3 hari yang lalu",
      review:
        "Penyelamat banget! Lupa pesen kue anniversary, jam 1 siang order yang ready-to-write di cabang Alsut, jam 3 sore udah nyampe rumah dengan tulisan rapi. Free lilin ulir juga!",
    },
    {
      id: "rev-3",
      category: "celebration",
      name: "Devi Maharani",
      location: "Grand Galaxy, Bekasi",
      avatar: "DM",
      stars: 5,
      tag: "Tiered Celebration Cake · Cabang Bekasi",
      date: "1 minggu yang lalu",
      review:
        "Pesen yang tiered cake 2 tingkat buat acara lamaran keluarga. Tamu-tamu pada muji kuenya estetik dan rasa Earl Grey Lavender-nya wangi mewah. Highly recommended!",
    },
    {
      id: "rev-4",
      category: "bento",
      name: "dr. Michelle Chandra",
      location: "Kebayoran Baru, Jakarta Selatan",
      avatar: "MC",
      stars: 5,
      tag: "Petite Chiffon Set · Cabang Mangga Besar",
      date: "2 minggu yang lalu",
      review:
        "Keluarga kami gak suka kue yang terlalu manis. Chiffon berry di Mint Patisserie pas banget di lidah orang tua. Teksturnya super moist dan packaging box-nya sangat higienis.",
    },
  ],
  florist: [
    {
      id: "f-rev-1",
      category: "wisuda",
      name: "Siti Nurhaliza",
      location: "Duren Sawit, Jakarta Timur",
      avatar: "SN",
      stars: 5,
      tag: "Buket Wisuda & Boneka Toga · Self-Pickup",
      date: "2 hari yang lalu",
      review:
        "Pagi jam 9 panik temen sidang jam 1 siang belum ada kado. Hubungi admin Rumah Bouquet via WA langsung dibikinin buket boneka toga + lily. Jam 11.30 udah self-pickup di studio Pondok Kelapa. Kartu ucapannya tulisan tangan rapi banget!",
    },
    {
      id: "f-rev-2",
      category: "money",
      name: "Bagas Triputra",
      location: "Tebet, Jakarta Selatan",
      avatar: "BT",
      stars: 5,
      tag: "Money Bouquet Royal Blue · Grab Instant",
      date: "5 hari yang lalu",
      review:
        "Pesen buket uang susun kipas 30 lembar buat ulang tahun Ibu. Uangnya beneran rapi tanpa dilem atau dirusak sama sekali, bisa dipakai lagi. Ibu saya sampe nangis terharu. Pelayanan 24 jam fast response banget.",
    },
    {
      id: "f-rev-3",
      category: "soap",
      name: "Amanda Putri",
      location: "Rawamangun, Jakarta Timur",
      avatar: "AP",
      stars: 5,
      tag: "Everlasting Soap Flower · COD Ready",
      date: "1 minggu yang lalu",
      review:
        "Beli everlasting soap flower warna pastel. Udah 6 bulan dipajang di kamar masih wangi dan bentuk bunganya tetep mekar sempurna! Buat yang mau kado awet bertahun-tahun rekomen banget ini.",
    },
    {
      id: "f-rev-4",
      category: "urgent",
      name: "Reza Firmansyah",
      location: "Kelapa Gading, Jakarta Utara",
      avatar: "RF",
      stars: 5,
      tag: "Request Budget Buket Medium · Delivery Same-Day",
      date: "2 minggu yang lalu",
      review:
        "Budget pas-pasan 100 ribuan tapi pengen kasih buket cantik buat wisuda adik. Adminnya ramah banget ngebantu sesuaikan bunga dan wrapping-nya biar tetep keliatan mewah. Terima kasih Rumah Bouquet!",
    },
  ],
  catering: [
    {
      id: "g-rev-1",
      category: "slim",
      name: "drg. Nadia Savira",
      location: "SCBD / Kebayoran Baru, Jaksel",
      avatar: "NS",
      stars: 5,
      tag: "-3.8 kg dalam 20 Hari · Kolesterol Turun",
      date: "Kemarin",
      review:
        "Sebagai dokter gigi dengan jadwal praktek padat, sering gak sempat masak makanan sehat. Langganan Glow House 20 hari turun 3.8 kg tanpa lemas atau kelaparan. Rasanya seperti makanan resto bintang lima, bukan makanan diet hambar!",
    },
    {
      id: "g-rev-2",
      category: "diabetes",
      name: "Hendro Wijaya",
      location: "Sudirman, Jakarta Selatan",
      avatar: "HW",
      stars: 5,
      tag: "HbA1c & Gula Darah Terkontrol · Office Delivery",
      date: "4 hari yang lalu",
      review:
        "Gula darah puasa saya stabil di angka 105 setelah 1 bulan program katering Glow House. Porsinya pas, saus dan bumbunya herbal alami tanpa MSG sintetis. Pengiriman ke kantor selalu tepat sebelum jam 11 siang.",
    },
    {
      id: "g-rev-3",
      category: "corporate",
      name: "Rina Anggraini",
      location: "Pondok Indah, Jakarta Selatan",
      avatar: "RA",
      stars: 5,
      tag: "15 Pax Corporate Bento · Gluten-Free Supervised",
      date: "1 minggu yang lalu",
      review:
        "Pesen catering bento box mingguan buat tim eksekutif kantor (15 pax). Kemasan 5 sekatnya sangat rapi dan higienis, presentasinya mewah buat meeting direksi. Ahli gizinya fast response saat kami request bebas gluten.",
    },
    {
      id: "g-rev-4",
      category: "slim",
      name: "Fajar Nugraha",
      location: "Senopati, Jakarta Selatan",
      avatar: "FN",
      stars: 5,
      tag: "Program 20 Hari Healthy Lunch · Anti-Begah",
      date: "2 minggu yang lalu",
      review:
        "Biasanya setelah makan siang kantor bawaannya ngantuk dan begah. Sejak ganti ke menu Glow House, badan enteng dan fokus kerja sore tetap prima. Minyak zaitun dan sayurnya beneran kerasa fresh tiap hari.",
    },
  ],
};

export interface ThemePreset {
  id: string;
  name: string;
  accent: string;
  accentContrast: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "terracotta",
    name: "Terracotta Cream",
    accent: "#C87D65",
    accentContrast: "#FFFFFF",
    background: "#FAF7F5",
    surface: "#FFFFFF",
    text: "#221B18",
    textMuted: "#7C6E68",
    border: "#EFE8E2",
  },
  {
    id: "dusty-rose",
    name: "Dusty Rose",
    accent: "#A85A68",
    accentContrast: "#FFFFFF",
    background: "#FDFBF9",
    surface: "#FFFFFF",
    text: "#241A1E",
    textMuted: "#75636A",
    border: "#EFE6E8",
  },
  {
    id: "royal-plum",
    name: "Royal Clinical",
    accent: "#451176",
    accentContrast: "#FFFFFF",
    background: "#FAF9FC",
    surface: "#FFFFFF",
    text: "#1F1626",
    textMuted: "#6B5E75",
    border: "#E9E3F0",
  },
  {
    id: "sage-botanical",
    name: "Sage Botanical",
    accent: "#2D6A4F",
    accentContrast: "#FFFFFF",
    background: "#F6FAF7",
    surface: "#FFFFFF",
    text: "#16241C",
    textMuted: "#5E7366",
    border: "#DFECE3",
  },
  {
    id: "espresso-gold",
    name: "Espresso Gold",
    accent: "#9C6B30",
    accentContrast: "#FFFFFF",
    background: "#FAF8F3",
    surface: "#FFFFFF",
    text: "#201912",
    textMuted: "#75695B",
    border: "#EAE3D5",
  },
  {
    id: "ocean-slate",
    name: "Ocean Cobalt",
    accent: "#1D4ED8",
    accentContrast: "#FFFFFF",
    background: "#F7FAFC",
    surface: "#FFFFFF",
    text: "#131D2E",
    textMuted: "#5F6E82",
    border: "#E1E8F0",
  },
];

export interface AssetImageItem {
  label: string;
  src: string;
  category: NicheId;
}

export const PRESET_IMAGES: AssetImageItem[] = [
  // Patisserie
  { label: "Bento Cake Pastel", src: "/images/patisserie/bento-cake.jpg", category: "patisserie" },
  { label: "Vintage Celebration Cake", src: "/images/patisserie/vintage-cake.jpg", category: "patisserie" },
  { label: "Korean Cupcake Box", src: "/images/patisserie/cupcake-box.jpg", category: "patisserie" },
  { label: "Same-Day Urgent Cake", src: "/images/patisserie/urgent-cake.jpg", category: "patisserie" },
  { label: "Basque Burnt Cheesecake", src: "/images/patisserie/cheesecake.jpg", category: "patisserie" },
  { label: "Petite Chiffon Berry", src: "/images/patisserie/chiffon-cake.jpg", category: "patisserie" },
  { label: "Cake Decorating Studio", src: "/images/patisserie/cake-decorating.jpg", category: "patisserie" },
  { label: "Artisan Croissant", src: "/images/patisserie/croissant.jpg", category: "patisserie" },
  // Florist
  { label: "Signature Bouquet Hero", src: "/images/florist/hero.jpg", category: "florist" },
  { label: "Money Bouquet Kipas", src: "/images/florist/money-bouquet.jpg", category: "florist" },
  { label: "Money Bouquet Real", src: "/images/florist/money-bouquet-real.jpg", category: "florist" },
  { label: "Buket Wisuda Toga", src: "/images/florist/graduation-bouquet.jpg", category: "florist" },
  { label: "Bunga Sabun Pastel", src: "/images/florist/soap-flower-real.jpg", category: "florist" },
  { label: "Fresh Red Roses", src: "/images/florist/fresh-rose.jpg", category: "florist" },
  { label: "Sunflower Bouquet", src: "/images/florist/sunflower.jpg", category: "florist" },
  { label: "Strawberry Snack Bouquet", src: "/images/florist/snack-fruit.jpg", category: "florist" },
  // Catering
  { label: "Healthy Bento Hero", src: "/images/catering/hero.jpg", category: "catering" },
  { label: "Slim Diet Package", src: "/images/catering/slim-package.jpg", category: "catering" },
  { label: "Medical Nutrition Meal", src: "/images/catering/medical-nutrition.jpg", category: "catering" },
  { label: "Beauty Aging Bento", src: "/images/catering/beauty-package.jpg", category: "catering" },
  { label: "Healthy Daily Balance", src: "/images/catering/healthy-balance.jpg", category: "catering" },
  { label: "Corporate Healthy Box", src: "/images/catering/corporate-healthy.jpg", category: "catering" },
  { label: "Happy Kids Bento", src: "/images/catering/kids-bento.jpg", category: "catering" },
  { label: "Nutritionist Kitchen", src: "/images/catering/nutritionist.jpg", category: "catering" },
];

export function formatBrandTitle(brand: string): string {
  const trimmed = brand.trim();
  if (!trimmed) return "Brand";
  // If entire brand is uppercase (like "MINT PATISSERIE"), convert nicely to Title Case
  if (trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed)) {
    return trimmed
      .toLowerCase()
      .split(/\s+/)
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ");
  }
  return trimmed;
}

export function getManagementSystemTitle(brand: string): string {
  return `${formatBrandTitle(brand)} Management System`;
}

export function getDefaultCmsSettings(niche: NicheConfig): CmsSettings {
  return {
    enabled: true,
    useTextLogo: false,
    whatsappOrderNumber:
      niche.footer.phone.replace(/[^0-9]/g, "") ||
      DEFAULT_WHATSAPP_BY_NICHE[niche.id],
    visibility: { ...DEFAULT_VISIBILITY },
    reviews: DEFAULT_REVIEWS_BY_NICHE[niche.id],
  };
}

export function resolveNicheCms(niche: NicheConfig): NicheConfig & { cms: CmsSettings } {
  const defaults = getDefaultCmsSettings(niche);
  return {
    ...niche,
    cms: {
      enabled: niche.cms?.enabled ?? defaults.enabled,
      useTextLogo: niche.cms?.useTextLogo ?? defaults.useTextLogo,
      whatsappOrderNumber:
        niche.cms?.whatsappOrderNumber ?? defaults.whatsappOrderNumber,
      visibility: {
        ...defaults.visibility,
        ...(niche.cms?.visibility ?? {}),
      },
      reviews: niche.cms?.reviews ?? defaults.reviews,
      updatedAt: niche.cms?.updatedAt,
    },
  };
}

export function loadStoredNiches(): Partial<Record<NicheId, NicheConfig>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<Record<NicheId, NicheConfig>>;
  } catch {
    return {};
  }
}

export function saveStoredNiches(
  overrides: Partial<Record<NicheId, NicheConfig>>,
): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // Ignore storage quota errors
  }
}

export interface ClientPlanPreference {
  wantsCms: boolean;
  selectedNiche: NicheId;
}

export function loadClientPlanPreference(): ClientPlanPreference {
  if (typeof window === "undefined") {
    return { wantsCms: true, selectedNiche: "patisserie" };
  }
  try {
    const raw = window.localStorage.getItem(CMS_PLAN_STORAGE_KEY);
    if (!raw) return { wantsCms: true, selectedNiche: "patisserie" };
    const parsed = JSON.parse(raw) as Partial<ClientPlanPreference>;
    return {
      wantsCms: parsed.wantsCms ?? true,
      selectedNiche: parsed.selectedNiche ?? "patisserie",
    };
  } catch {
    return { wantsCms: true, selectedNiche: "patisserie" };
  }
}

export function saveClientPlanPreference(pref: ClientPlanPreference): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CMS_PLAN_STORAGE_KEY, JSON.stringify(pref));
  } catch {
    // Ignore storage errors
  }
}

