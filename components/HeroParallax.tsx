"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface ParallaxProduct {
  title: string;
  category: string;
  link: string;
  thumbnail: string;
  badge?: string;
}

export const HeroParallax = ({
  products,
}: {
  products: ParallaxProduct[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      id="products"
      className="h-[300vh] py-32 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-[#F4F1EA] border-b border-stone-300/80"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        {/* Row 1 */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 mb-12">
          {firstRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`${product.title}-${idx}`}
            />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div className="flex flex-row mb-12 space-x-12">
          {secondRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`${product.title}-${idx}`}
            />
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12">
          {thirdRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`${product.title}-${idx}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-6xl relative mx-auto py-12 md:py-24 px-4 w-full left-0 top-0">
      <div className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white font-grotesk shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
        In-House Ventures &amp; Product Gallery
      </div>

      <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight text-stone-950 font-display mt-5 leading-[1.08]">
        The Ultimate Digital Ecosystem <br />
        <span className="font-serif italic font-normal text-stone-800">
          Crafted by Yapping Techflow
        </span>
      </h1>

      <p className="max-w-2xl text-sm md:text-lg mt-6 text-stone-600 font-outfit leading-relaxed">
        Jelajahi galeri produk in-house dan template revenue-engine kami. Dari ekosistem festive gifting <strong className="text-stone-900 font-semibold">Plivin.co</strong>, hingga rangkaian interaktif multi-niche <strong className="text-stone-900 font-semibold">Atelier Suite</strong> yang siap meningkatkan penjualan bisnis Anda secara instan.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/templates"
          className="rounded-full bg-stone-950 px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-stone-800 shadow-sm"
        >
          Lihat Live Interactive Suite ↗
        </Link>
        <a
          href="https://plivin-digigift.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-stone-300 bg-white/80 px-6 py-2.5 text-xs font-semibold text-stone-900 transition-all hover:bg-white"
        >
          Kunjungi Plivin.co ↗
        </a>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: ParallaxProduct;
  translate: MotionValue<number>;
}) => {
  const isExternal = product.link.startsWith("http");

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -16,
      }}
      key={product.title}
      className="group/product h-80 w-[24rem] sm:h-96 sm:w-[28rem] relative flex-shrink-0 rounded-3xl overflow-hidden border border-stone-300/80 bg-white shadow-md transition-shadow duration-300 hover:shadow-2xl hover:shadow-stone-950/20"
    >
      {isExternal ? (
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full w-full"
        >
          <Image
            src={product.thumbnail}
            height={600}
            width={600}
            className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-500 group-hover/product:scale-105"
            alt={product.title}
            unoptimized
          />
        </a>
      ) : (
        <Link href={product.link} className="block h-full w-full">
          <Image
            src={product.thumbnail}
            height={600}
            width={600}
            className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-500 group-hover/product:scale-105"
            alt={product.title}
            unoptimized
          />
        </Link>
      )}

      {/* Badge Top Left */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="rounded-full bg-stone-950/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider font-grotesk border border-white/10">
            {product.badge}
          </span>
        </div>
      )}

      {/* Dark Gradient Overlay on Hover */}
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-85 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 pointer-events-none" />

      {/* Bottom Content Info on Hover */}
      <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 text-white pointer-events-none">
        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 font-grotesk">
          {product.category}
        </span>
        <h2 className="text-xl font-bold font-jakarta mt-0.5">{product.title}</h2>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-stone-300 font-outfit">
          Click to Open Experience ↗
        </span>
      </div>
    </motion.div>
  );
};

