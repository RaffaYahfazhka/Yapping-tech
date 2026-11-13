import React from "react";
import Image from "next/image";

export interface KomoseLogoProps {
  variant?: "dark" | "light";
  className?: string;
  showWordmark?: boolean;
  markOnly?: boolean;
  useAppIcon?: boolean;
  size?: "sm" | "md" | "lg";
  height?: number;
}

export function KomoseLogo({
  variant = "dark",
  className = "",
  showWordmark = true,
  markOnly = false,
  useAppIcon = false,
  size = "md",
  height: customHeight,
}: KomoseLogoProps) {
  const isLight = variant === "light";

  const defaultHeight = size === "sm" ? 26 : size === "lg" ? 40 : 32;
  const h = customHeight || defaultHeight;

  if (useAppIcon) {
    const iconSize = customHeight || (size === "sm" ? 28 : size === "lg" ? 44 : 36);
    return (
      <span className={`inline-flex items-center select-none ${className}`}>
        <Image
          src="/images/komose/komose-app-icon.png"
          alt="Komose App Icon"
          width={iconSize}
          height={iconSize}
          className="rounded-xl object-contain shadow-2xs"
          priority
        />
      </span>
    );
  }

  if (!showWordmark || markOnly) {
    // Komodo Dragon mark aspect ratio 278 / 134 ≈ 2.0746
    const w = Math.round(h * (278 / 134));
    return (
      <span className={`inline-flex items-center select-none ${className}`}>
        <Image
          src={isLight ? "/images/komose/komose-dragon-light.png" : "/images/komose/komose-dragon.png"}
          alt="Komose Dragon Logo"
          width={w}
          height={h}
          className="object-contain"
          priority
        />
      </span>
    );
  }

  // Full horizontal lockup (Komodo Dragon + KOMOSE wordmark) aspect ratio 796 / 134 ≈ 5.9403
  const w = Math.round(h * (796 / 134));

  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <Image
        src={isLight ? "/images/komose/komose-full-logo-light.png" : "/images/komose/komose-full-logo.png"}
        alt="Komose"
        width={w}
        height={h}
        className="h-7 sm:h-8 w-auto object-contain"
        priority
      />
    </span>
  );
}
