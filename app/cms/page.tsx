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
  title: "Dashboard CMS Toko Mandiri — Komose",
  description:
    "Panel kelola toko mandiri ([Nama Brand] Management System) dari Komose. Edit produk, harga, promo, dan alur WhatsApp dengan Live Preview real-time.",
  icons: {
    icon: [
      { url: "/favicon-komose.png", type: "image/png" },
      { url: "/favicon-komose.svg", type: "image/svg+xml" },
      { url: "/images/komose/komose-app-icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/komose/komose-app-icon.png" },
    ],
  },
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

