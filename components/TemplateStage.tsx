"use client";

import { NicheExperience } from "@/components/NicheExperience";
import { useShowcase } from "@/context/ShowcaseContext";

export function TemplateStage() {
  const { activeNiche } = useShowcase();

  return (
    <div
      className="relative min-h-screen pt-[52px] transition-colors duration-300"
      style={{ backgroundColor: activeNiche.theme.background }}
    >
      <NicheExperience />
    </div>
  );
}
