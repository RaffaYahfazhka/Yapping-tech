"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { useShowcase } from "@/context/ShowcaseContext";

const RADIUS = 19;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScrollToTop() {
  const { activeNiche } = useShowcase();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });
  const dashOffset = useTransform(
    smoothProgress,
    [0, 1],
    [CIRCUMFERENCE, 0],
  );
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setVisible(value > 0.08);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Kembali ke atas"
          className="group fixed bottom-24 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-lg shadow-black/5 backdrop-blur-md transition-colors duration-300 sm:right-7"
        >
          <svg
            viewBox="0 0 48 48"
            className="absolute inset-0 h-12 w-12 -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <motion.circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke={activeNiche.theme.accent}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
          >
            <path
              d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
