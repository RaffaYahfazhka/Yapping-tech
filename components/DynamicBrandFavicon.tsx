"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const KOMOSE_ICON = "/favicon-komose.png";
const YAPPING_ICON = "/icon.png";

export function DynamicBrandFavicon() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const isKomose =
      pathname?.startsWith("/komose") ||
      pathname?.startsWith("/templates") ||
      pathname?.startsWith("/cms");

    const targetIcon = isKomose ? KOMOSE_ICON : YAPPING_ICON;

    // Find or create link elements with rel="icon" or rel="shortcut icon" or rel="apple-touch-icon"
    const links = document.querySelectorAll<HTMLLinkElement>(
      "link[rel*='icon'], link[rel='apple-touch-icon']"
    );

    if (links.length > 0) {
      links.forEach((link) => {
        link.href = `${targetIcon}?v=${Date.now()}`;
        if (!link.rel.includes("apple")) {
          link.type = "image/png";
        }
      });
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = targetIcon;
      newLink.type = "image/png";
      document.head.appendChild(newLink);
    }
  }, [pathname]);

  return null;
}
