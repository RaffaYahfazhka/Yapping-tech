"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useShowcase } from "@/context/ShowcaseContext";
import { cn } from "@/lib/format";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function StorySection() {
  const { activeNiche } = useShowcase();
  const { mode, theme, story } = activeNiche;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const slowY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const fastY = useTransform(scrollYProgress, [0, 1], [90, -90]);

  const textOrder =
    mode === "bouquet" ? "order-1" : mode === "catering" ? "order-1 lg:order-2" : "order-1 lg:order-2";
  const imageOrder =
    mode === "bouquet" ? "order-2" : mode === "catering" ? "order-2 lg:order-1" : "order-2 lg:order-1";

  const imageRadius =
    mode === "bouquet"
      ? "rounded-tl-[6rem] rounded-br-[6rem]"
      : mode === "catering"
        ? "rounded-none"
        : "rounded-lg";

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-line px-5 py-16 sm:px-8 sm:py-24"
    >
      {mode === "catering" && (
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" />
      )}

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className={cn("relative lg:col-span-6", imageOrder)}>
          <div className="relative mx-auto h-[440px] max-w-[560px] sm:h-[560px]">
            {mode === "catering" && (
              <div className="absolute -right-3 -top-3 bottom-12 left-12 border border-line" />
            )}

            <motion.div
              style={{ y: slowY }}
              className="absolute left-0 top-0 w-[66%]"
            >
              <div
                className={cn(
                  "group relative aspect-[3/4] overflow-hidden border border-line bg-surface",
                  imageRadius,
                  mode !== "catering" && "p-1.5",
                )}
              >
                <div
                  className={cn(
                    "relative h-full w-full overflow-hidden",
                    mode === "bouquet"
                      ? "rounded-tl-[5.5rem] rounded-br-[5.5rem]"
                      : mode === "retail"
                        ? "rounded-[4px]"
                        : "rounded-none",
                  )}
                >
                  <Image
                    src={story.images[0].src}
                    alt={story.images[0].alt}
                    fill
                    sizes="(max-width: 1024px) 60vw, 380px"
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <p className="mt-2 font-ui text-[8px] uppercase tracking-[0.2em] text-muted">
                {story.images[0].caption}
              </p>
            </motion.div>

            <motion.div
              style={{ y: fastY }}
              className="absolute bottom-0 right-0 w-[52%]"
            >
              <div
                className={cn(
                  "group relative aspect-square overflow-hidden border border-line bg-surface shadow-[0_30px_70px_-40px_rgba(28,25,23,0.5)]",
                  mode === "bouquet"
                    ? "rounded-full p-2"
                    : mode === "catering"
                      ? "rounded-none"
                      : "rounded-lg p-1.5",
                )}
              >
                <div
                  className={cn(
                    "relative h-full w-full overflow-hidden",
                    mode === "bouquet" ? "rounded-full" : "rounded-[3px]",
                  )}
                >
                  <Image
                    src={story.images[1].src}
                    alt={story.images[1].alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 300px"
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <p className="mt-2 text-right font-ui text-[8px] uppercase tracking-[0.2em] text-muted">
                {story.images[1].caption}
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className={cn("lg:col-span-5", textOrder, mode === "catering" ? "lg:col-start-8" : "lg:col-start-8")}
        >
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
              {story.kicker}
            </span>
          </div>

          <h2
            className={cn(
              "mt-5 text-ink",
              mode === "retail" &&
                "font-heading text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.04] tracking-[-0.03em]",
              mode === "bouquet" &&
                "font-heading text-[clamp(2.3rem,4.2vw,3.7rem)] font-light leading-[1.02] tracking-[-0.01em]",
              mode === "catering" &&
                "font-heading text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.04] tracking-[-0.02em]",
            )}
          >
            {story.title}
          </h2>

          <div className="mt-5 space-y-3.5">
            {story.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-body text-[12.5px] leading-[1.9] text-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote
            className={cn(
              "mt-7 border-l pl-5",
              mode === "catering" ? "border-[var(--accent)]" : "border-[var(--accent)]",
            )}
          >
            <p
              className={cn(
                "text-ink",
                mode === "bouquet"
                  ? "font-heading text-[24px] font-light italic leading-[1.3]"
                  : mode === "catering"
                    ? "font-heading text-[22px] leading-[1.35]"
                    : "font-heading text-[21px] italic leading-[1.35]",
              )}
            >
              “{story.quote}”
            </p>
            <footer
              className={cn(
                "mt-3 text-[8px] uppercase text-muted",
                mode === "catering"
                  ? "font-grotesk tracking-[0.16em]"
                  : "font-ui tracking-[0.18em]",
              )}
            >
              {story.quoteAttribution}
            </footer>
          </blockquote>

          <p
            className={cn(
              "mt-7 border-t border-line pt-4 text-[8px] uppercase text-muted",
              mode === "catering"
                ? "font-grotesk tracking-[0.14em]"
                : "font-ui tracking-[0.16em]",
            )}
          >
            {story.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
