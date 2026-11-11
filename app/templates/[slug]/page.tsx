import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NICHE_MAP, NICHES } from "@/config/niches";
import type { NicheId } from "@/types/landing";
import { CartDrawer } from "@/components/CartDrawer";
import { DemoControlDock } from "@/components/DemoControlDock";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TemplateStage } from "@/components/TemplateStage";
import { ShowcaseProvider } from "@/context/ShowcaseContext";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    embed?: string;
  }>;
}

export async function generateStaticParams() {
  return NICHES.map((niche) => ({
    slug: niche.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const niche = NICHE_MAP[slug as NicheId];

  if (!niche) {
    return {
      title: "Template Not Found — Yapping Techflow",
    };
  }

  return {
    title: `${niche.brand} — Template Website ${niche.dock.label} | Yapping Techflow`,
    description: `Preview template website modern & interaktif untuk bisnis ${niche.dock.label}. Desain elegan, responsif, dan siap tingkatkan penjualan bersama Yapping Techflow.`,
    openGraph: {
      title: `${niche.brand} — Template ${niche.dock.label} by Yapping Techflow`,
      description: `Solusi landing page performa tinggi untuk ${niche.dock.label}. Preview interaktif & pesan sekarang.`,
      type: "website",
    },
  };
}

export default async function TemplatePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const isEmbedded = resolvedSearchParams?.embed === "1";
  const niche = NICHE_MAP[slug as NicheId];

  if (!niche) {
    notFound();
  }

  return (
    <ShowcaseProvider
      initialNiche={slug as NicheId}
      basePath="/templates"
      initialEmbedded={isEmbedded}
    >
      <DemoControlDock />
      <TemplateStage />
      <CartDrawer />
      <ScrollToTop />
    </ShowcaseProvider>
  );
}

