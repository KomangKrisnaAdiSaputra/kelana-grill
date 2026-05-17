import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ThemeMode } from "@/types";

export type CartItem = {
  id: number | string;
  name: string;
  price: number;
  qty?: number | null;
  category?: string;
  image?: string;
};

type CartOverride = {
  qty?: number;
  removed?: boolean;
};

type CartText = {
  cart: string;
  selectedItem: string;
  emptyCartTitle: string;
  emptyCartDescription: string;
  seeProducts: string;
  subtotal: string;
  total: string;
  clearCart: string;
  checkout: string;
};

type Props = {
  open: boolean;
  theme: ThemeMode;
  cartItems?: CartItem[];
  text: CartText;
  onClose: () => void;
  onCheckout?: (items: CartItem[]) => void;
};

export default function CartDrawer({
  open,
  theme,
  cartItems = [],
  text,
  onClose,
  onCheckout,
}: Props) {
  const [cartOverrides, setCartOverrides] = useState<
    Record<string, CartOverride>
  >({});

  const localCartItems = useMemo<CartItem[]>(() => {
    return cartItems.reduce<CartItem[]>((items, item) => {
      const override = cartOverrides[String(item.id)];

      if (override?.removed) {
        return items;
      }

      items.push({
        ...item,
        qty: override?.qty ?? item.qty ?? 1,
      });

      return items;
    }, []);
  }, [cartItems, cartOverrides]);

  const totalCartQty = useMemo(() => {
    return localCartItems.reduce(
      (total, item) => total + (item.qty ?? 1),
      0
    );
  }, [localCartItems]);

  const cartTotal = useMemo(() => {
    return localCartItems.reduce(
      (total, item) => total + item.price * (item.qty ?? 1),
      0
    );
  }, [localCartItems]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const increaseCartItem = (item: CartItem) => {
    setCartOverrides((currentOverrides) => {
      const currentQty = item.qty ?? 1;

      return {
        ...currentOverrides,
        [String(item.id)]: {
          qty: currentQty + 1,
        },
      };
    });
  };

  const decreaseCartItem = (item: CartItem) => {
    setCartOverrides((currentOverrides) => {
      const nextQty = Math.max((item.qty ?? 1) - 1, 0);

      return {
        ...currentOverrides,
        [String(item.id)]: {
          qty: nextQty,
          removed: nextQty <= 0,
        },
      };
    });
  };

  const removeCartItem = (item: CartItem) => {
    setCartOverrides((currentOverrides) => ({
      ...currentOverrides,
      [String(item.id)]: {
        removed: true,
      },
    }));
  };

  const clearCart = () => {
    setCartOverrides(
      cartItems.reduce<Record<string, CartOverride>>((overrides, item) => {
        overrides[String(item.id)] = {
          removed: true,
        };

        return overrides;
      }, {})
    );
  };

  const checkoutCart = () => {

    if (onCheckout) {
      return onCheckout(localCartItems);
    }

    console.log("checkout cart:", localCartItems);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[999]">
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="absolute right-0 top-0 flex h-full w-full justify-end sm:p-4">
        <div
          className={`
            relative flex h-full w-full flex-col overflow-hidden shadow-2xl sm:max-w-md sm:rounded-[32px]
            ${theme === "dark"
              ? "bg-[#111111] text-white"
              : "bg-white text-zinc-900"
            }
          `}
        >
          <div
            className={`
              flex items-center justify-between border-b p-5
              ${theme === "dark" ? "border-white/10" : "border-orange-100"}
            `}
          >
            <div>
              <h2 className="text-lg font-bold">{text.cart}</h2>

              <p
                className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                  }`}
              >
                {totalCartQty} {text.selectedItem}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className={`
                flex h-10 w-10 items-center justify-center rounded-full border transition hover:scale-105
                ${theme === "dark"
                  ? "border-white/10 bg-white/5 hover:bg-white/10"
                  : "border-orange-100 bg-orange-50 hover:bg-orange-100"
                }
              `}
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {localCartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div
                  className={`
                    mb-4 flex h-20 w-20 items-center justify-center rounded-full
                    ${theme === "dark"
                      ? "bg-white/5 text-zinc-400"
                      : "bg-orange-50 text-orange-500"
                    }
                  `}
                >
                  <ShoppingBag size={34} />
                </div>

                <h3 className="text-base font-bold">
                  {text.emptyCartTitle}
                </h3>

                <p
                  className={`mt-2 max-w-xs text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                    }`}
                >
                  {text.emptyCartDescription}
                </p>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600"
                >
                  {text.seeProducts}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {localCartItems.map((item) => (
                  <div
                    key={item.id}
                    className={`
                      rounded-3xl border p-3
                      ${theme === "dark"
                        ? "border-white/10 bg-white/[0.03]"
                        : "border-orange-100 bg-orange-50/50"
                      }
                    `}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`
                          h-20 w-20 shrink-0 overflow-hidden rounded-2xl
                          ${theme === "dark" ? "bg-white/10" : "bg-white"}
                        `}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-orange-500">
                            <ShoppingBag size={24} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-bold">
                              {item.name}
                            </h3>

                            {item.category && (
                              <p
                                className={`mt-0.5 text-xs ${theme === "dark"
                                    ? "text-zinc-400"
                                    : "text-zinc-500"
                                  }`}
                              >
                                {item.category}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeCartItem(item)}
                            className={`
                              flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition
                              ${theme === "dark"
                                ? "text-zinc-400 hover:bg-white/10 hover:text-red-400"
                                : "text-zinc-500 hover:bg-white hover:text-red-500"
                              }
                            `}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-orange-500">
                              {formatRupiah(item.price)}
                            </p>

                            <p
                              className={`text-xs ${theme === "dark"
                                  ? "text-zinc-400"
                                  : "text-zinc-500"
                                }`}
                            >
                              {text.subtotal}:{" "}
                              {formatRupiah(item.price * (item.qty ?? 1))}
                            </p>
                          </div>

                          <div
                            className={`
                              flex items-center gap-2 rounded-full border p-1
                              ${theme === "dark"
                                ? "border-white/10 bg-black/20"
                                : "border-orange-100 bg-white"
                              }
                            `}
                          >
                            <button
                              type="button"
                              onClick={() => decreaseCartItem(item)}
                              className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-600 transition hover:bg-orange-200"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="min-w-6 text-center text-sm font-bold">
                              {item.qty ?? 1}
                            </span>

                            <button
                              type="button"
                              onClick={() => increaseCartItem(item)}
                              className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white transition hover:bg-orange-600"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className={`
              border-t p-5
              ${theme === "dark" ? "border-white/10" : "border-orange-100"}
            `}
          >
            <div className="mb-4 flex items-center justify-between">
              <span
                className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                  }`}
              >
                {text.total}
              </span>

              <span className="text-xl font-black text-orange-500">
                {formatRupiah(cartTotal)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={localCartItems.length === 0}
                onClick={clearCart}
                className={`
                  rounded-full border px-5 py-3.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50
                  ${theme === "dark"
                    ? "border-white/10 text-zinc-200 hover:bg-white/10"
                    : "border-orange-100 text-zinc-700 hover:bg-orange-50"
                  }
                `}
              >
                {text.clearCart}
              </button>

              <button
                type="button"
                disabled={localCartItems.length === 0}
                onClick={checkoutCart}
                className="rounded-full bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {text.checkout}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}