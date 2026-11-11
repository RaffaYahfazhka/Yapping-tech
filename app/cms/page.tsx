import type { Metadata } from "next";
import { NICHE_MAP } from "@/config/niches";
import { getManagementSystemTitle } from "@/lib/cms";
import { ShowcaseProvider } from "@/context/ShowcaseContext";
import { CmsWorkspace } from "@/components/cms/CmsWorkspace";
import type { NicheId } from "@/types/landing";

interface PageProps {
  searchParams?: Promise<{
    niche?: string;
    template?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Management System CMS + Live Preview — Yapping Techflow",
  description:
    "Dashboard CMS sederhana [Nama Brand] Management System dengan Live Preview real-time untuk mengelola produk, harga, promo, tema, dan kontak WhatsApp.",
};

export default async function CmsIndexPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : undefined;
  const candidate = (params?.niche || params?.template || "patisserie") as NicheId;
  const initialId: NicheId = NICHE_MAP[candidate] ? candidate : "patisserie";
  const initialBrandTitle = getManagementSystemTitle(NICHE_MAP[initialId].brand);

  return (
    <ShowcaseProvider initialNiche={initialId} basePath="/cms">
      <div aria-label={initialBrandTitle}>
        <CmsWorkspace />
      </div>
    </ShowcaseProvider>
  );
}

