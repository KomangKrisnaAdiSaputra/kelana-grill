import {
  Languages,
  Menu,
  Minus,
  Moon,
  Plus,
  ShoppingBag,
  Sun,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { LandingNavItem, ThemeMode } from "@/types";

type LanguageMode = "id" | "en";

export type CartItem = {
  id: number | string;
  name: string;
  price: number;
  qty?: number;
  category?: string;
  image?: string;
};

type Props = {
  theme: ThemeMode;
  scrolled: boolean;
  navItems: LandingNavItem[];
  onToggleTheme: () => void;

  cartItems?: CartItem[];
};

export default function Navbar({
  theme,
  scrolled,
  navItems,
  onToggleTheme,
  cartItems = [],
}: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>(() =>
    cartItems.map((item) => ({
      ...item,
      qty: item.qty ?? 1,
    }))
  );

  const [language, setLanguage] = useState<LanguageMode>(() => {
    if (typeof window === "undefined") {
      return "id";
    }

    const savedLanguage = localStorage.getItem("language");

    return savedLanguage === "en" || savedLanguage === "id"
      ? savedLanguage
      : "id";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

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

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const toggleLanguage = () => {
    setLanguage((currentLanguage) =>
      currentLanguage === "id" ? "en" : "id"
    );
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openCart = () => {
    setCartOpen(true);
    setMobileMenuOpen(false);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  useEffect(() => {
    if (!cartOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const increaseCartItem = (item: CartItem) => {
    setLocalCartItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem.id === item.id
          ? {
            ...cartItem,
            qty: (cartItem.qty ?? 1) + 1,
          }
          : cartItem
      )
    );
  };

  const decreaseCartItem = (item: CartItem) => {
    setLocalCartItems((currentItems) =>
      currentItems
        .map((cartItem) =>
          cartItem.id === item.id
            ? {
              ...cartItem,
              qty: Math.max((cartItem.qty ?? 1) - 1, 0),
            }
            : cartItem
        )
        .filter((cartItem) => (cartItem.qty ?? 0) > 0)
    );
  };

  const removeCartItem = (item: CartItem) => {
    setLocalCartItems((currentItems) =>
      currentItems.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  const clearCart = () => {
    setLocalCartItems([]);
  };

  const checkoutCart = () => {
    console.log("checkout cart:", localCartItems);

    // Kalau nanti pakai Inertia, bisa ganti:
    // router.visit("/checkout");

    // Kalau mau WhatsApp, bisa ganti:
    // window.open("https://wa.me/628xxxxxxxxxx", "_blank");
  };

  const buttonClass = `
    flex h-10 w-10 items-center justify-center rounded-full border
    transition-all duration-300 hover:scale-105 md:h-11 md:w-11
    ${theme === "dark"
      ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
      : "border-orange-200 bg-white/80 text-zinc-800 hover:bg-orange-50"
    }
  `;

  const pillButtonClass = `
    flex h-10 items-center justify-center gap-2 rounded-full border px-4
    text-xs font-semibold transition-all duration-300 hover:scale-105 md:h-11
    ${theme === "dark"
      ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
      : "border-orange-200 bg-white/80 text-zinc-800 hover:bg-orange-50"
    }
  `;

  const mobileActionClass = `
    flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition
    ${theme === "dark"
      ? "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
      : "border-orange-100 bg-orange-50 text-zinc-700 hover:bg-orange-100"
    }
  `;

  return (
    <>
      <header
        className={`
          fixed left-0 top-0 z-50 w-full transition-all duration-500
          ${scrolled || mobileMenuOpen
            ? theme === "dark"
              ? "border-b border-white/10 bg-black/40 py-3 shadow-2xl shadow-black/10 backdrop-blur-2xl backdrop-saturate-150"
              : "border-b border-orange-100 bg-white/70 py-3 shadow-lg shadow-orange-100/50 backdrop-blur-2xl backdrop-saturate-150"
            : "bg-transparent py-4 md:py-5"
          }
        `}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
          <a
            href="/"
            className="flex items-center gap-3"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-orange-500 opacity-40 blur-xl" />

              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-sm font-bold text-white shadow-lg shadow-orange-500/30 md:h-11 md:w-11 md:text-lg">
                G
              </div>
            </div>

            <div>
              <h1 className="text-base font-semibold tracking-tight md:text-lg">
                Kelana<span className="text-orange-500">Grill</span>
              </h1>

              <p className="text-[10px] text-zinc-500 md:text-xs">
                Premium BBQ Rental
              </p>
            </div>
          </a>

          <nav
            className={`
              hidden items-center gap-8 px-6 py-3 xl:flex
              ${theme === "dark" ? "white/[0.03]" : "white/70"}
            `}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`
                  relative text-sm font-medium transition duration-300
                  ${theme === "dark"
                    ? "text-zinc-300 hover:text-white"
                    : "text-zinc-700 hover:text-orange-500"
                  }
                  after:absolute after:bottom-[-6px] after:left-0
                  after:h-[2px] after:w-0 after:bg-orange-500
                  after:transition-all after:duration-300 hover:after:w-full
                `}
              >
                {item.name || item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <button
              type="button"
              onClick={toggleLanguage}
              className={pillButtonClass}
            >
              <Languages size={16} />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className={buttonClass}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              type="button"
              onClick={openCart}
              className={`relative ${buttonClass}`}
            >
              <ShoppingBag size={18} />

              {totalCartQty > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white shadow-lg shadow-orange-500/30">
                  {totalCartQty > 99 ? "99+" : totalCartQty}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={openCart}
              className={`relative ${buttonClass}`}
            >
              <ShoppingBag size={18} />

              {totalCartQty > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white shadow-lg shadow-orange-500/30">
                  {totalCartQty > 99 ? "99+" : totalCartQty}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((current) => !current)}
              className={buttonClass}
            >
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mx-auto mt-3 max-w-7xl px-4 md:px-6 xl:hidden">
            <div
              className={`
                overflow-hidden rounded-[28px] border p-3 shadow-2xl backdrop-blur-2xl
                ${theme === "dark"
                  ? "border-white/10 bg-[#111111]/95 shadow-black/30"
                  : "border-orange-100 bg-white/95 shadow-orange-100/60"
                }
              `}
            >

              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className={mobileActionClass}
                >
                  <Languages size={17} />
                  <span>{language.toUpperCase()}</span>
                </button>

                <button
                  type="button"
                  onClick={onToggleTheme}
                  className={mobileActionClass}
                >
                  {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                  <span>{theme === "dark" ? "Light" : "Dark"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {cartOpen && (
        <div className="fixed inset-0 z-[999]">
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
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
                  <h2 className="text-lg font-bold">Keranjang</h2>
                  <p
                    className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                      }`}
                  >
                    {totalCartQty} item dipilih
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeCart}
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
                      Keranjang masih kosong
                    </h3>

                    <p
                      className={`mt-2 max-w-xs text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                        }`}
                    >
                      Pilih produk atau paket grill terlebih dahulu untuk
                      dimasukkan ke keranjang.
                    </p>

                    <button
                      type="button"
                      onClick={closeCart}
                      className="mt-5 rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600"
                    >
                      Lihat Produk
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
                              ${theme === "dark"
                                ? "bg-white/10"
                                : "bg-white"
                              }
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
                                  Subtotal:{" "}
                                  {formatRupiah(
                                    item.price * (item.qty ?? 1)
                                  )}
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
                    Total
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
                    Kosongkan
                  </button>

                  <button
                    type="button"
                    disabled={localCartItems.length === 0}
                    onClick={checkoutCart}
                    className="rounded-full bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}