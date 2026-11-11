"use client";

import { NicheExperience } from "@/components/NicheExperience";
import { useShowcase } from "@/context/ShowcaseContext";

export function TemplateStage() {
  const { activeNiche, isEmbedded } = useShowcase();

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 ${isEmbedded ? "pb-0" : "pb-24"}`}
      style={{ backgroundColor: activeNiche.theme.background }}
    >
      <NicheExperience />
    </div>
  );
}
