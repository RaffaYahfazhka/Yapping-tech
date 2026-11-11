"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useShowcase } from "@/context/ShowcaseContext";
import { Magnetic } from "@/components/ui/Magnetic";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
};

export function HeroSection() {
  const { activeNiche, openCart } = useShowcase();
  const { mode, hero, theme } = activeNiche;

  if (mode === "retail") {
    return (
      <motion.section
        id="top"
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grain relative overflow-hidden px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.16] blur-3xl"
          style={{
            background: `radial-gradient(circle at center, ${theme.accent} 0%, transparent 68%)`,
          }}
        />
        <div className="relative mx-auto max-w-[1320px]">
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {hero.badges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-muted sm:text-[10px]"
              >
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ backgroundColor: theme.accent }}
                />
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-9 text-center font-ui text-[10px] uppercase tracking-[0.34em] text-muted"
          >
            {hero.kicker}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-5 max-w-[980px] text-center font-heading text-[clamp(2.9rem,7.2vw,6.1rem)] font-normal leading-[0.94] tracking-[-0.035em] text-ink max-[359px]:text-[2.35rem]"
          >
            {hero.titleLead}
            <br />
            <em className="font-light" style={{ color: theme.accent }}>
              {hero.titleAccent}
            </em>
            <span className="block">{hero.titleTail}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-[560px] text-center font-body text-[13px] leading-[1.85] text-muted sm:text-[14px]"
          >
            {hero.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#collection"
                className="flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-ui text-[10px] font-semibold uppercase tracking-[0.18em] transition-shadow duration-500 hover:shadow-[0_18px_40px_-18px_rgba(196,132,88,0.8)] sm:w-auto"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.accentContrast,
                }}
              >
                {hero.primaryCta}
                <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Magnetic>
            <a
              href="#story"
              className="group flex items-center gap-2 font-ui text-[10px] font-medium uppercase tracking-[0.18em] text-ink"
            >
              <span className="border-b border-ink/20 pb-1 transition-colors duration-300 group-hover:border-ink">
                {hero.secondaryCta}
              </span>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="relative mx-auto mt-10 max-w-[560px] lg:hidden">
            <div className="group relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface shadow-[0_30px_60px_-35px_rgba(28,25,23,0.35)]">
              <Image
                src={hero.images[0].src}
                alt={hero.images[0].alt}
                fill
                priority
                sizes="90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <span className="font-ui text-[8px] uppercase tracking-[0.18em] text-white">
                  {hero.images[0].caption}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-12 flex max-w-lg items-center justify-center divide-x divide-[var(--border)]"
          >
            {hero.stats.map((stat) => (
              <div key={stat.label} className="px-5 text-center sm:px-8">
                <div className="font-heading text-[22px] leading-none text-ink sm:text-[26px]">
                  {stat.value}
                </div>
                <div className="mt-1.5 font-ui text-[8px] uppercase tracking-[0.18em] text-muted sm:text-[9px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative mx-auto mt-14 hidden h-[300px] max-w-[1120px] sm:h-[430px] lg:block lg:h-[500px]"
          >
            <div className="absolute left-1/2 top-1/2 z-10 w-[86%] max-w-[720px] -translate-x-1/2 -translate-y-1/2 sm:w-[70%]">
              <div className="group relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface shadow-[0_40px_80px_-40px_rgba(28,25,23,0.35)]">
                <Image
                  src={hero.images[0].src}
                  alt={hero.images[0].alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 720px"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  <span className="font-ui text-[8px] uppercase tracking-[0.18em] text-white">
                    {hero.images[0].caption}
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute left-0 top-8 z-20 hidden w-[190px] animate-floaty sm:block lg:w-[230px]">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-surface p-1.5 shadow-[0_24px_60px_-30px_rgba(28,25,23,0.4)]">
                <div className="relative h-full w-full overflow-hidden rounded-[4px]">
                  <Image
                    src={hero.images[1].src}
                    alt={hero.images[1].alt}
                    fill
                    sizes="230px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <p className="mt-2 pl-1 font-ui text-[8px] uppercase tracking-[0.2em] text-muted">
                {hero.images[1].caption}
              </p>
            </div>

            <div
              className="absolute bottom-2 right-0 z-20 hidden w-[170px] animate-floaty sm:block lg:w-[210px]"
              style={{ animationDelay: "-3.5s" }}
            >
              <div className="group relative aspect-square overflow-hidden rounded-lg border border-line bg-surface p-1.5 shadow-[0_24px_60px_-30px_rgba(28,25,23,0.4)]">
                <div className="relative h-full w-full overflow-hidden rounded-[4px]">
                  <Image
                    src={hero.images[2].src}
                    alt={hero.images[2].alt}
                    fill
                    sizes="210px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <p className="mt-2 text-right font-ui text-[8px] uppercase tracking-[0.2em] text-muted">
                {hero.images[2].caption}
              </p>
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-center font-ui text-[9px] uppercase tracking-[0.22em] text-muted"
          >
            {hero.note}
          </motion.p>
        </div>
      </motion.section>
    );
  }

  if (mode === "bouquet") {
    return (
      <motion.section
        id="top"
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative overflow-hidden px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16"
      >
        <div className="mx-auto grid max-w-[1360px] items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="relative z-10 lg:col-span-6 lg:pl-4 xl:pl-10">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="h-px w-8" style={{ backgroundColor: theme.accent }} />
              <span className="font-ui text-[9px] uppercase tracking-[0.32em] text-muted">
                {hero.kicker}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-7 max-w-[600px] font-heading text-[clamp(3.2rem,6.8vw,6rem)] font-light leading-[0.92] tracking-[-0.02em] text-ink"
            >
              {hero.titleLead}
              <br />
              <em style={{ color: theme.accent }}>{hero.titleAccent}</em>{" "}
              {hero.titleTail}
            </motion.h1>

            <motion.div variants={fadeUp} className="relative mt-8 lg:hidden">
              <div className="relative aspect-[4/3] overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] border border-line bg-surface">
                <Image
                  src={hero.images[0].src}
                  alt={hero.images[0].alt}
                  fill
                  priority
                  sizes="90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B2620]/35 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 font-ui text-[8px] uppercase tracking-[0.24em] text-white/90">
                  {hero.images[0].caption}
                </span>
              </div>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[430px] font-body text-[13px] font-light leading-[1.9] text-muted sm:text-[14px]"
            >
              {hero.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a
                  href="#collection"
                  className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 font-ui text-[10px] font-medium uppercase tracking-[0.22em] transition-transform duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.accentContrast,
                  }}
                >
                  {hero.primaryCta}
                  <span className="h-1 w-1 rounded-full bg-current" />
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={openCart}
                className="group inline-flex items-center gap-2 font-ui text-[10px] uppercase tracking-[0.2em] text-ink"
              >
                <span className="border-b border-ink/20 pb-1 transition-colors group-hover:border-ink">
                  {hero.secondaryCta}
                </span>
                <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-11 max-w-[360px] divide-y divide-[var(--border)] border-y border-line"
            >
              {hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline justify-between py-3"
                >
                  <span className="font-ui text-[9px] uppercase tracking-[0.24em] text-muted">
                    {stat.label}
                  </span>
                  <span className="font-heading text-[24px] font-light leading-none text-ink">
                    {stat.value}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
            >
              {hero.badges.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-2 font-ui text-[9px] uppercase tracking-[0.18em] text-muted"
                >
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: theme.accent }}
                  />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="relative hidden lg:col-span-6 lg:block lg:pl-6"
          >
            <div className="relative mx-auto max-w-[520px]">
              <div className="absolute -inset-3 rounded-tl-[9rem] rounded-br-[9rem] border border-line sm:-inset-5 sm:rounded-tl-[12rem] sm:rounded-br-[12rem]" />
              <div className="group relative z-10 aspect-[4/5] overflow-hidden rounded-tl-[8rem] rounded-br-[8rem] bg-surface shadow-[0_40px_100px_-50px_rgba(27,38,32,0.5)] sm:rounded-tl-[11rem] sm:rounded-br-[11rem]">
                <Image
                  src={hero.images[0].src}
                  alt={hero.images[0].alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B2620]/25 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                  <span className="font-ui text-[8px] uppercase tracking-[0.24em] text-white/90">
                    {hero.images[0].caption}
                  </span>
                  <span className="font-heading text-[13px] italic text-white/90">
                    Nº 01
                  </span>
                </div>
              </div>

              <div
                className="absolute -left-4 top-10 z-20 hidden w-[150px] animate-floaty sm:block lg:-left-10 lg:w-[180px]"
                style={{ animationDelay: "-2s" }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] border border-line bg-surface p-1.5 shadow-[0_30px_70px_-30px_rgba(27,38,32,0.5)]">
                  <div className="relative h-full w-full overflow-hidden rounded-tl-[2rem] rounded-br-[2rem]">
                    <Image
                      src={hero.images[1].src}
                      alt={hero.images[1].alt}
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="relative z-30 mt-2 inline-block border border-line bg-canvas px-2 py-1 font-ui text-[8px] uppercase tracking-[0.22em] text-muted">
                  {hero.images[1].caption}
                </p>
              </div>

              <div
                className="absolute -bottom-5 right-2 z-20 hidden w-[120px] animate-floaty sm:block lg:-right-4 lg:w-[140px]"
                style={{ animationDelay: "-5s" }}
              >
                <div className="relative aspect-square overflow-hidden rounded-full border border-line bg-surface p-1.5 shadow-[0_24px_60px_-28px_rgba(27,38,32,0.5)]">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src={hero.images[2].src}
                      alt={hero.images[2].alt}
                      fill
                      sizes="140px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="mt-2 text-center font-ui text-[8px] uppercase tracking-[0.22em] text-muted">
                  {hero.images[2].caption}
                </p>
              </div>

              <span className="absolute -right-6 top-1/2 hidden -translate-y-1/2 rotate-90 font-ui text-[8px] uppercase tracking-[0.4em] text-muted xl:block">
                Atelier Flora — Jakarta
              </span>
            </div>
          </motion.div>
        </div>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-16 max-w-[1360px] border-t border-line pt-5 font-ui text-[9px] uppercase tracking-[0.24em] text-muted lg:pl-4 xl:pl-10"
        >
          {hero.note}
        </motion.p>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="top"
      variants={stagger}
      initial="hidden"
      animate="show"
      className="relative overflow-hidden border-b border-line"
    >
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
        <div className="relative z-10 border-b border-line px-5 py-12 sm:px-10 sm:py-16 lg:border-b-0 lg:border-r lg:px-14 lg:py-20 xl:px-20">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span
                className="h-2 w-2"
                style={{ backgroundColor: theme.accent }}
              />
              <span className="font-grotesk text-[9px] uppercase tracking-[0.24em] text-muted">
                {hero.kicker}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-8 max-w-[620px] font-heading text-[clamp(2.8rem,5.4vw,5rem)] leading-[0.98] tracking-[-0.02em] text-ink"
            >
              {hero.titleLead}
              <br />
              <span style={{ color: theme.accent }}>{hero.titleAccent}</span>
              <br />
              {hero.titleTail}
            </motion.h1>

            <motion.div variants={fadeUp} className="relative mt-8 lg:hidden">
              <div className="relative aspect-[16/10] overflow-hidden border border-line bg-surface">
                <Image
                  src={hero.images[0].src}
                  alt={hero.images[0].alt}
                  fill
                  priority
                  sizes="90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/55 via-[#1A1412]/10 to-transparent" />
                <div className="absolute left-4 top-4 border border-white/25 bg-black/20 px-3 py-2 backdrop-blur-md">
                  <div className="font-grotesk text-[8px] uppercase tracking-[0.18em] text-white/70">
                    {hero.images[0].caption}
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 border border-white/25 bg-black/20 px-3 py-2 backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  </span>
                  <span className="font-grotesk text-[8px] uppercase tracking-[0.16em] text-white">
                    Event live
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[480px] font-body text-[13px] leading-[1.85] text-muted sm:text-[14px]"
            >
              {hero.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <a
                  href="#collection"
                  className="inline-flex items-center gap-3 px-8 py-4 font-grotesk text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.accentContrast,
                  }}
                >
                  {hero.primaryCta}
                  <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Magnetic>
              <a
                href="#process"
                className="inline-flex items-center gap-3 border border-line bg-surface px-7 py-4 font-grotesk text-[10px] font-medium uppercase tracking-[0.16em] text-ink backdrop-blur-sm transition-colors duration-300 hover:border-[var(--accent)]"
              >
                {hero.secondaryCta}
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-11 grid grid-cols-3 border border-line bg-surface"
            >
              {hero.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={
                    index !== hero.stats.length - 1
                      ? "border-r border-line px-3 py-4 sm:px-5"
                      : "px-3 py-4 sm:px-5"
                  }
                >
                  <div className="font-grotesk text-[22px] font-medium leading-none tracking-[-0.02em] text-ink sm:text-[26px]">
                    {stat.value}
                  </div>
                  <div className="mt-2 font-grotesk text-[8px] uppercase tracking-[0.14em] text-muted sm:text-[9px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-x-5 gap-y-2"
            >
              {hero.badges.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 font-grotesk text-[8px] uppercase tracking-[0.16em] text-muted"
                >
                  <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5" aria-hidden="true">
                    <path
                      d="M2 6.2 4.6 8.8 10 3.4"
                      stroke={theme.accent}
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div variants={fadeUp} className="relative hidden min-h-[420px] lg:block lg:min-h-[680px]">
          <div className="absolute inset-0">
            <Image
              src={hero.images[0].src}
              alt={hero.images[0].alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/55 via-[#1A1412]/10 to-transparent" />
          </div>

          <div className="absolute inset-x-6 top-6 flex items-start justify-between sm:inset-x-8 sm:top-8">
            <div className="border border-white/25 bg-black/20 px-3 py-2 backdrop-blur-md">
              <div className="font-grotesk text-[8px] uppercase tracking-[0.18em] text-white/70">
                {hero.images[0].caption}
              </div>
            </div>
            <div className="flex items-center gap-2 border border-white/25 bg-black/20 px-3 py-2 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
              </span>
              <span className="font-grotesk text-[8px] uppercase tracking-[0.16em] text-white">
                Event live
              </span>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
            <div className="border border-white/20 bg-[#1A1412]/65 p-4 backdrop-blur-xl sm:p-5">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <span className="font-grotesk text-[8px] uppercase tracking-[0.2em] text-white/60">
                  Ketersediaan slot · Oktober 2026
                </span>
                <span className="font-grotesk text-[8px] uppercase tracking-[0.16em] text-emerald-300">
                  3 tersisa
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {[
                  { date: "04 OCT", label: "Corporate Lunch", status: "Reserved", free: false },
                  { date: "11 OCT", label: "Wedding Reception", status: "Available", free: true },
                  { date: "18 OCT", label: "Executive Gathering", status: "Available", free: true },
                ].map((slot) => (
                  <div
                    key={slot.date}
                    className="grid grid-cols-[52px_1fr_auto] items-center gap-3"
                  >
                    <span className="font-grotesk text-[9px] tracking-[0.1em] text-white/50">
                      {slot.date}
                    </span>
                    <span className="font-body text-[11px] text-white/90">
                      {slot.label}
                    </span>
                    <span
                      className={
                        slot.free
                          ? "font-grotesk text-[8px] uppercase tracking-[0.12em] text-emerald-300"
                          : "font-grotesk text-[8px] uppercase tracking-[0.12em] text-white/35"
                      }
                    >
                      {slot.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 font-grotesk text-[8px] uppercase tracking-[0.18em] text-white/55">
              {hero.note}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
