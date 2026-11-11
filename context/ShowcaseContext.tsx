"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { NICHES, NICHE_MAP } from "@/config/niches";
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
  setActiveNiche: (id: NicheId) => void;
  basePath?: string;
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
}

export function ShowcaseProvider({
  children,
  initialNiche = "patisserie",
  basePath,
}: ShowcaseProviderProps) {
  const [activeId, setActiveId] = useState<NicheId>(initialNiche);
  const [carts, setCarts] = useState<CartMap>(emptyCarts);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const activeNiche = NICHE_MAP[activeId];
  const cartItems = carts[activeId];

  const setActiveNiche = useCallback((id: NicheId) => {
    setActiveId(id);
    setIsCartOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

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
      niches: NICHES,
      activeNiche,
      activeId,
      setActiveNiche,
      basePath,
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
    activeNiche,
    activeId,
    setActiveNiche,
    basePath,
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
