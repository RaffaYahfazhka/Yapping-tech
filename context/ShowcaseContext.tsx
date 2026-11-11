"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { NICHES, NICHE_MAP } from "@/config/niches";
import {
  CMS_CHANNEL_NAME,
  CMS_STORAGE_KEY,
  loadStoredNiches,
  resolveNicheCms,
  saveStoredNiches,
} from "@/lib/cms";
import type {
  CartItem,
  NicheConfig,
  NicheId,
  Product,
  ThemeTokens,
} from "@/types/landing";

export function themeStyle(theme: ThemeTokens): CSSProperties {
  return {
    "--bg": theme.background,
    "--surface": theme.surface,
    "--text": theme.text,
    "--text-muted": theme.textMuted,
    "--accent": theme.accent,
    "--accent-contrast": theme.accentContrast,
    "--border": theme.border,
    "--font-heading": theme.fontHeading,
    "--font-body": theme.fontBody,
    "--font-ui": theme.fontUI,
  } as CSSProperties;
}

type CartMap = Record<NicheId, CartItem[]>;

const emptyCarts: CartMap = {
  patisserie: [],
  florist: [],
  catering: [],
};

interface ShowcaseContextValue {
  niches: NicheConfig[];
  activeNiche: NicheConfig;
  activeId: NicheId;
  setActiveNiche: (id: NicheId, options?: { scrollTop?: boolean }) => void;
  basePath?: string;
  isEmbedded: boolean;
  updateNicheConfig: (
    id: NicheId,
    updater: (prev: NicheConfig) => NicheConfig,
  ) => void;
  replaceNicheConfig: (id: NicheId, next: NicheConfig) => void;
  resetNicheConfig: (id: NicheId) => void;
  hasCustomEdits: (id: NicheId) => boolean;
  cartItems: CartItem[];
  cartLineCount: number;
  cartCount: number;
  subtotal: number;
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const ShowcaseContext = createContext<ShowcaseContextValue | null>(null);

interface ShowcaseProviderProps {
  children: ReactNode;
  initialNiche?: NicheId;
  basePath?: string;
  initialEmbedded?: boolean;
}

export function ShowcaseProvider({
  children,
  initialNiche = "patisserie",
  basePath,
  initialEmbedded = false,
}: ShowcaseProviderProps) {
  const [activeId, setActiveId] = useState<NicheId>(initialNiche);
  const [overrides, setOverrides] = useState<Partial<Record<NicheId, NicheConfig>>>({});
  const [carts, setCarts] = useState<CartMap>(emptyCarts);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(initialEmbedded);
  const channelRef = useRef<BroadcastChannel | null>(null);

  // Sync activeId if initialNiche prop changes (e.g. route navigation between /cms/patisserie and /cms/florist)
  useEffect(() => {
    setActiveId(initialNiche);
  }, [initialNiche]);

  // Detect iframe / embed mode and hydrate CMS overrides from localStorage + BroadcastChannel + postMessage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("embed") === "1" || window.self !== window.top) {
      setIsEmbedded(true);
    }

    setOverrides(loadStoredNiches());

    if ("BroadcastChannel" in window) {
      const ch = new BroadcastChannel(CMS_CHANNEL_NAME);
      channelRef.current = ch;
      ch.onmessage = (event) => {
        if (event.data?.type === "YAPPING_CMS_STORAGE_SYNC") {
          setOverrides(event.data.overrides ?? loadStoredNiches());
        }
      };
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key === CMS_STORAGE_KEY) {
        setOverrides(loadStoredNiches());
      }
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || typeof data !== "object") return;

      if (data.type === "YAPPING_CMS_SYNC" && data.nicheId && data.config) {
        const nicheId = data.nicheId as NicheId;
        setOverrides((prev) => ({
          ...prev,
          [nicheId]: data.config as NicheConfig,
        }));
      }

      if (data.type === "YAPPING_CMS_RESET" && data.nicheId) {
        const nicheId = data.nicheId as NicheId;
        setOverrides((prev) => {
          const next = { ...prev };
          delete next[nicheId];
          return next;
        });
      }

      if (data.type === "YAPPING_CMS_SCROLL" && typeof data.sectionId === "string") {
        if (data.sectionId === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (data.sectionId === "footer") {
          const footer = document.querySelector("footer");
          footer?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          const el = document.getElementById(data.sectionId);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("message", onMessage);

    // Notify parent frame that embed listener is ready
    if (window.self !== window.top) {
      window.parent.postMessage({ type: "YAPPING_CMS_EMBED_READY" }, window.location.origin);
    }

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("message", onMessage);
      channelRef.current?.close();
      channelRef.current = null;
    };
  }, []);

  const broadcastOverrides = useCallback(
    (nextOverrides: Partial<Record<NicheId, NicheConfig>>) => {
      saveStoredNiches(nextOverrides);
      channelRef.current?.postMessage({
        type: "YAPPING_CMS_STORAGE_SYNC",
        overrides: nextOverrides,
      });
    },
    [],
  );

  const niches = useMemo(
    () =>
      NICHES.map((base) => {
        const merged = overrides[base.id] ?? base;
        return resolveNicheCms(merged);
      }),
    [overrides],
  );

  const activeNiche = useMemo(() => {
    const base = overrides[activeId] ?? NICHE_MAP[activeId];
    return resolveNicheCms(base);
  }, [activeId, overrides]);

  const cartItems = carts[activeId];

  const setActiveNiche = useCallback(
    (id: NicheId, options?: { scrollTop?: boolean }) => {
      setActiveId(id);
      setIsCartOpen(false);
      if (typeof window !== "undefined" && options?.scrollTop !== false) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    },
    [],
  );

  const updateNicheConfig = useCallback(
    (id: NicheId, updater: (prev: NicheConfig) => NicheConfig) => {
      setOverrides((current) => {
        const base = resolveNicheCms(current[id] ?? NICHE_MAP[id]);
        const updated = resolveNicheCms(updater(base));
        updated.cms = {
          ...updated.cms,
          updatedAt: new Date().toISOString(),
        };
        const nextOverrides = {
          ...current,
          [id]: updated,
        };
        broadcastOverrides(nextOverrides);
        return nextOverrides;
      });
    },
    [broadcastOverrides],
  );

  const replaceNicheConfig = useCallback(
    (id: NicheId, next: NicheConfig) => {
      setOverrides((current) => {
        const updated = resolveNicheCms(next);
        updated.cms = {
          ...updated.cms,
          updatedAt: new Date().toISOString(),
        };
        const nextOverrides = {
          ...current,
          [id]: updated,
        };
        broadcastOverrides(nextOverrides);
        return nextOverrides;
      });
    },
    [broadcastOverrides],
  );

  const resetNicheConfig = useCallback(
    (id: NicheId) => {
      setOverrides((current) => {
        const nextOverrides = { ...current };
        delete nextOverrides[id];
        broadcastOverrides(nextOverrides);
        return nextOverrides;
      });
    },
    [broadcastOverrides],
  );

  const hasCustomEdits = useCallback(
    (id: NicheId) => Boolean(overrides[id]),
    [overrides],
  );

  const addToCart = useCallback(
    (product: Product, quantity: number) => {
      const mode = activeNiche.mode;
      setCarts((current) => {
        const items = current[activeId];
        const existing = items.find((item) => item.productId === product.id);
        const safeQuantity = Math.max(product.minQty, quantity);

        if (existing) {
          const nextQuantity =
            mode === "catering"
              ? safeQuantity
              : Math.max(
                  product.minQty,
                  existing.quantity + safeQuantity,
                );
          return {
            ...current,
            [activeId]: items.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: nextQuantity }
                : item,
            ),
          };
        }

        const nextItem: CartItem = {
          productId: product.id,
          name: product.name,
          subtitle: product.subtitle,
          image: product.image,
          unitPrice: product.price,
          quantity: safeQuantity,
          unitLabel: product.unitLabel,
          minQty: product.minQty,
          step: product.step,
        };

        return {
          ...current,
          [activeId]: [...items, nextItem],
        };
      });
    },
    [activeId, activeNiche.mode],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setCarts((current) => ({
        ...current,
        [activeId]: current[activeId].map((item) => {
          if (item.productId !== productId) return item;
          const stepped = Math.round(quantity / item.step) * item.step;
          return {
            ...item,
            quantity: Math.max(item.minQty, stepped),
          };
        }),
      }));
    },
    [activeId],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCarts((current) => ({
        ...current,
        [activeId]: current[activeId].filter(
          (item) => item.productId !== productId,
        ),
      }));
    },
    [activeId],
  );

  const clearCart = useCallback(() => {
    setCarts((current) => ({ ...current, [activeId]: [] }));
  }, [activeId]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const value = useMemo<ShowcaseContextValue>(() => {
    const cartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    const subtotal = cartItems.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0,
    );

    return {
      niches,
      activeNiche,
      activeId,
      setActiveNiche,
      basePath,
      isEmbedded,
      updateNicheConfig,
      replaceNicheConfig,
      resetNicheConfig,
      hasCustomEdits,
      cartItems,
      cartLineCount: cartItems.length,
      cartCount,
      subtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
    };
  }, [
    niches,
    activeNiche,
    activeId,
    setActiveNiche,
    basePath,
    isEmbedded,
    updateNicheConfig,
    replaceNicheConfig,
    resetNicheConfig,
    hasCustomEdits,
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
  ]);

  return (
    <ShowcaseContext.Provider value={value}>
      {children}
    </ShowcaseContext.Provider>
  );
}

export function useShowcase(): ShowcaseContextValue {
  const context = useContext(ShowcaseContext);
  if (!context) {
    throw new Error("useShowcase must be used within a ShowcaseProvider");
  }
  return context;
}
