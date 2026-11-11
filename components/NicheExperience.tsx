"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useShowcase } from "@/context/ShowcaseContext";
import { themeStyle } from "@/context/ShowcaseContext";
import { PatisserieExperience } from "@/components/experiences/PatisserieExperience";
import { FloristExperience } from "@/components/experiences/FloristExperience";
import { CateringExperience } from "@/components/experiences/CateringExperience";

export function NicheExperience() {
  const { activeNiche } = useShowcase();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={activeNiche.id}
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.99 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={themeStyle(activeNiche.theme)}
        className="font-body text-ink"
      >
        {activeNiche.id === "patisserie" && <PatisserieExperience />}
        {activeNiche.id === "florist" && <FloristExperience />}
        {activeNiche.id === "catering" && <CateringExperience />}
      </motion.div>
    </AnimatePresence>
  );
}
