"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { themeStyle, useShowcase } from "@/context/ShowcaseContext";

export function AnnouncementBar() {
  const { activeNiche } = useShowcase();
  const [index, setIndex] = useState(0);
  const messages = activeNiche.announcement.messages;

  useEffect(() => {
    setIndex(0);
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [activeNiche.id, messages.length]);

  return (
    <div
      className="sticky top-[76px] z-40 border-b border-line font-ui backdrop-blur-xl"
      style={{
        ...themeStyle(activeNiche.theme),
        backgroundColor: `${activeNiche.theme.surface}F0`,
      }}
    >
      <div className="mx-auto flex h-10 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-8">
        <div className="flex shrink-0 items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ backgroundColor: activeNiche.theme.accent }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: activeNiche.theme.accent }}
            />
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-ink">
            {activeNiche.announcement.status}
          </span>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden text-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`${activeNiche.id}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="truncate text-[10px] tracking-wide text-muted sm:text-[11px]"
            >
              {messages[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="hidden shrink-0 items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-muted sm:flex">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3 w-3">
            <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1" />
            <path d="M8 4.5V8l2.2 1.4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          Jakarta · WIB
        </div>
      </div>
    </div>
  );
}
