import { router, usePage } from "@inertiajs/react";

import {
  Languages,
  Menu,
  Moon,
  ShoppingBag,
  Sun,
  X,
} from "lucide-react";

import { useState } from "react";

import { useCart } from "@/contexts/cart-context";

import { useTranslation } from "@/helpers/global";

import useLandingNavItems from "@/hooks/use-landing-nav-items";

import { landing } from "@/routes";

import type { ThemeMode } from "@/types";

import CartDrawer from "./cart-drawer";

type Props = {
  theme: ThemeMode;
  scrolled: boolean;
  onToggleTheme: () => void;
};

type PageProps = {
  params: any;
  switchUrl: string;
};

export default function Navbar({
  theme,
  scrolled,
  onToggleTheme,
}: Props) {
  const props = usePage<PageProps>().props;

  const locale = props.params.locale;

  const switchUrl = props.switchUrl;

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [cartOpen, setCartOpen] =
    useState(false);

  const { __ } = useTranslation();

  const navItems = useLandingNavItems();

  const { totalQty } = useCart();

  const openCart = () => {
    setCartOpen(true);

    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    return router.visit(switchUrl);
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
              ? "border-b border-white/10 bg-black/40 py-3 shadow-2xl shadow-black/10 backdrop-blur-2xl"
              : "border-b border-orange-100 bg-white/70 py-3 shadow-lg backdrop-blur-2xl"
            : "bg-transparent py-4 md:py-5"
          }
        `}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
          <a
            href={
              landing({
                locale,
              }).url
            }
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-orange-500 opacity-40 blur-xl" />

              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-sm font-bold text-white md:h-11 md:w-11">
                G
              </div>
            </div>

            <div>
              <h1 className="text-base font-semibold tracking-tight md:text-lg">
                Kelana
                <span className="text-orange-500">
                  Grill
                </span>
              </h1>

              <p className="text-[10px] text-zinc-500 md:text-xs">
                {__(
                  "Premium BBQ Rental",
                )}
              </p>
            </div>
          </a>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-8 xl:flex">
            {navItems.map((item) => (
              <a
                key={
                  item.href
                }
                href={
                  item.href
                }
                className={`
                  relative text-sm font-medium transition duration-300
                  ${theme ===
                    "dark"
                    ? "text-zinc-300 hover:text-white"
                    : "text-zinc-700 hover:text-orange-500"
                  }
                `}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* DESKTOP ACTION */}

          <div className="hidden items-center gap-2 xl:flex">
            <button
              type="button"
              onClick={
                toggleLanguage
              }
              className={
                pillButtonClass
              }
            >
              <Languages
                size={
                  16
                }
              />

              <span>
                {locale.toUpperCase()}
              </span>
            </button>

            <button
              type="button"
              onClick={
                onToggleTheme
              }
              className={
                buttonClass
              }
            >
              {theme ===
                "dark" ? (
                <Sun
                  size={
                    18
                  }
                />
              ) : (
                <Moon
                  size={
                    18
                  }
                />
              )}
            </button>

            <button
              type="button"
              onClick={
                openCart
              }
              className={`relative ${buttonClass}`}
            >
              <ShoppingBag
                size={
                  18
                }
              />

              {totalQty >
                0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                    {totalQty >
                      99
                      ? "99+"
                      : totalQty}
                  </span>
                )}
            </button>
          </div>

          {/* MOBILE ACTION */}

          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={
                openCart
              }
              className={`relative ${buttonClass}`}
            >
              <ShoppingBag
                size={
                  18
                }
              />

              {totalQty >
                0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                    {totalQty >
                      99
                      ? "99+"
                      : totalQty}
                  </span>
                )}
            </button>

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(
                  (
                    current,
                  ) =>
                    !current,
                )
              }
              className={
                buttonClass
              }
            >
              {mobileMenuOpen ? (
                <X
                  size={
                    19
                  }
                />
              ) : (
                <Menu
                  size={
                    19
                  }
                />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}

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
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={
                    toggleLanguage
                  }
                  className={
                    mobileActionClass
                  }
                >
                  <Languages
                    size={
                      17
                    }
                  />

                  <span>
                    {locale.toUpperCase()}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={
                    onToggleTheme
                  }
                  className={
                    mobileActionClass
                  }
                >
                  {theme ===
                    "dark" ? (
                    <Sun
                      size={
                        17
                      }
                    />
                  ) : (
                    <Moon
                      size={
                        17
                      }
                    />
                  )}

                  <span>
                    {theme ===
                      "dark"
                      ? __(
                        "Light",
                      )
                      : __(
                        "Dark",
                      )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <CartDrawer
        open={cartOpen}
        onClose={() =>
          setCartOpen(false)
        }
      />
    </>
  );
}