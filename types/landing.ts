export type NicheId = "patisserie" | "florist" | "catering";

export type TemplateMode = "retail" | "bouquet" | "catering";

export interface ThemeTokens {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  accent: string;
  accentContrast: string;
  border: string;
  cardRadius: string;
  buttonRadius: string;
  imageRadius: string;
  fontHeading: string;
  fontBody: string;
  fontUI: string;
}

export interface DockMeta {
  emoji: string;
  label: string;
  shortLabel: string;
}

export interface AnnouncementConfig {
  status: string;
  messages: string[];
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface HeroConfig {
  kicker: string;
  titleLead: string;
  titleAccent: string;
  titleTail: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  badges: string[];
  stats: HeroStat[];
  images: HeroImage[];
  note: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  unitLabel: string;
  image: string;
  imageAlt: string;
  badge?: string;
  badgeTone?: "accent" | "neutral" | "muted";
  highlights: string[];
  specs: ProductSpec[];
  minQty: number;
  step: number;
  deliverySafe?: number;
  soldOutSoon?: boolean;
  cardMessage?: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
  meta: string;
}

export interface ProcessConfig {
  kicker: string;
  title: string;
  description: string;
  steps: ProcessStep[];
}

export interface StoryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface StoryConfig {
  kicker: string;
  title: string;
  paragraphs: string[];
  quote: string;
  quoteAttribution: string;
  images: [StoryImage, StoryImage];
  note: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ShowcaseConfig {
  kicker: string;
  title: string;
  description: string;
  note: string;
}

export interface CtaConfig {
  title: string;
  description: string;
  button: string;
}

export interface FooterConfig {
  tagline: string;
  address: string;
  email: string;
  phone: string;
  instagram: string;
  note: string;
}

export interface NicheFormConfig {
  deliveryNote: string;
  extraNote: string;
}

export interface NicheConfig {
  id: NicheId;
  brand: string;
  brandSuffix: string;
  logo?: string;
  tagline: string;
  mode: TemplateMode;
  dock: DockMeta;
  theme: ThemeTokens;
  announcement: AnnouncementConfig;
  hero: HeroConfig;
  showcase: ShowcaseConfig;
  products: Product[];
  process: ProcessConfig;
  story: StoryConfig;
  faqs: FaqItem[];
  cta: CtaConfig;
  footer: FooterConfig;
  form: NicheFormConfig;
}

export interface CartItem {
  productId: string;
  name: string;
  subtitle: string;
  image: string;
  unitPrice: number;
  quantity: number;
  unitLabel: string;
  minQty: number;
  step: number;
}

export interface NicheFormState {
  fullName: string;
  whatsapp: string;
  district: string;
  address: string;
  batchDate?: string;
  chilledAck?: boolean;
  deliveryDate?: string;
  deliveryWindow?: string;
  senderName?: string;
  recipientName?: string;
  giftMessage?: string;
  eventDate?: string;
  eventType?: string;
  serviceFormat?: string;
  dietary?: string;
}

export type FormErrors = Partial<Record<keyof NicheFormState, string>>;

export interface DistrictOption {
  value: string;
  label: string;
}
