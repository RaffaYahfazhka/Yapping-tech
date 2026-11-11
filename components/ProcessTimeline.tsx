"use client";

import { motion } from "framer-motion";
import { useShowcase } from "@/context/ShowcaseContext";
import { cn } from "@/lib/format";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const stepVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export function ProcessTimeline() {
  const { activeNiche } = useShowcase();
  const { mode, theme, process } = activeNiche;

  return (
    <section
      id="process"
      className="border-t border-line px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span
                className={cn(mode === "catering" ? "h-2 w-2" : "h-px w-8")}
                style={{ backgroundColor: theme.accent }}
              />
              <span
                className={cn(
                  "text-[9px] uppercase text-muted",
                  mode === "catering"
                    ? "font-grotesk tracking-[0.24em]"
                    : "font-ui tracking-[0.3em]",
                )}
              >
                {process.kicker}
              </span>
            </div>
            <h2
              className={cn(
                "mt-5 max-w-[640px] text-ink",
                mode === "retail" &&
                  "font-heading text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.04] tracking-[-0.03em]",
                mode === "bouquet" &&
                  "font-heading text-[clamp(2.3rem,4.4vw,3.9rem)] font-light leading-[1] tracking-[-0.01em]",
                mode === "catering" &&
                  "font-heading text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.02] tracking-[-0.02em]",
              )}
            >
              {process.title}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[380px] font-body text-[12.5px] leading-[1.85] text-muted">
              {process.description}
            </p>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-14 sm:mt-16"
        >
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-[var(--border)] md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
              className="h-px w-full origin-left"
              style={{ backgroundColor: theme.accent }}
            />
          </div>

          <div className="absolute bottom-0 left-6 top-0 w-px bg-[var(--border)] md:hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
              className="h-full w-px origin-top"
              style={{ backgroundColor: theme.accent }}
            />
          </div>

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {process.steps.map((step) => (
              <motion.div
                key={step.index}
                variants={stepVariant}
                className="relative pl-16 md:pl-0"
              >
                <div className="absolute left-0 top-0 md:static">
                  {mode === "retail" && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface">
                      <span className="font-heading text-[15px] italic text-accent">
                        {step.index}
                      </span>
                    </div>
                  )}
                  {mode === "bouquet" && (
                    <div className="flex h-12 items-center">
                      <span className="font-heading text-[42px] font-light leading-none text-accent">
                        {step.index}
                      </span>
                    </div>
                  )}
                  {mode === "catering" && (
                    <div className="relative flex h-12 w-12 items-center justify-center border border-line bg-surface">
                      <span className="font-grotesk text-[11px] font-medium tracking-[0.08em] text-ink">
                        {step.index}
                      </span>
                      <span
                        className="absolute -right-px -top-px h-1.5 w-1.5"
                        style={{ backgroundColor: theme.accent }}
                      />
                    </div>
                  )}
                </div>

                <div className="md:mt-8">
                  <h3
                    className={cn(
                      "text-ink",
                      mode === "bouquet"
                        ? "font-heading text-[26px] font-light leading-tight"
                        : "font-heading text-[22px] leading-tight",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[320px] font-body text-[11.5px] leading-[1.85] text-muted">
                    {step.description}
                  </p>
                  <div
                    className={cn(
                      "mt-4 inline-flex items-center gap-2 border-t border-line pt-3 text-[8px] uppercase text-muted",
                      mode === "catering"
                        ? "font-grotesk tracking-[0.14em]"
                        : "font-ui tracking-[0.16em]",
                    )}
                  >
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ backgroundColor: theme.accent }}
                    />
                    {step.meta}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
