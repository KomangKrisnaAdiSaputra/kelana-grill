import { Head, usePage } from "@inertiajs/react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import AmbientBackground from "@/components/landing/ambient-background";
import Footer from "@/components/landing/footer";
import MobileNavbar from "@/components/landing/mobile-navbar";
import Navbar from "@/components/landing/navbar";
import ProductCard from "@/components/landing/product-card";
import ProductDetailModal from "@/components/landing/product-detail-modal";
import AppProvider from "@/contexts/app-provider";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { localizeProducts } from "@/helpers/global";
import type {
  LocalizedProductItem,
  LocalizedProductVariant,
  ProductItem,
} from "@/types/product";

type ProductCatalogPageProps = {
  products?: ProductItem[];
};

type FilterKey = "all" | string;

type SelectedDetail = {
  product: LocalizedProductItem;
  variant: LocalizedProductVariant;
};

const PER_PAGE_OPTIONS = [6, 9, 12, 18];


const navbarCartItems: Array<{
  id: number;
  name: string;
  category: string;
  price: number;
  qty: number;
  image: string;
}> = [];

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function labelFromValue(value: string) {
  if (value === "all") {
    return "Semua";
  }

  return value
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getProductType(product: LocalizedProductItem) {
  return normalizeText(product.type);
}

function getDefaultVariant(
  product: LocalizedProductItem,
  selectedVariantKey?: string,
) {
  return (
    product.variants.find((variant) => variant.key === selectedVariantKey) ??
    product.variants.find((variant) => variant.isDefault) ??
    product.variants[0]
  );
}

function getCartKey(productId: string, variantKey?: string) {
  return `${productId}:${variantKey ?? "default"}`;
}

function getCategoryFilterLabel(
  categoryKey: string,
  products: LocalizedProductItem[],
) {
  if (categoryKey === "all") {
    return "Semua Kategori";
  }

  for (const product of products) {
    const category = product.categories.find((item) => item.key === categoryKey);

    if (category) {
      return category.label;
    }
  }

  return labelFromValue(categoryKey);
}

function ProductCatalogContent() {
  const { theme, toggleTheme } = useTheme();
  const { language, text } = useLanguage();

  const { products = [] } = usePage<ProductCatalogPageProps>().props;

  const sectionText = text.product;

  const [scrolled, setScrolled] = useState(false);
  const [activeType, setActiveType] = useState<FilterKey>("all");
  const [activeCategory, setActiveCategory] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  const [cart, setCart] = useState<Record<string, number>>({});

  const [selectedDetail, setSelectedDetail] = useState<SelectedDetail | null>(
    null,
  );

  const localizedProducts = useMemo(() => {
    return localizeProducts(products, language);
  }, [products, language]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeActiveType = (type: FilterKey) => {
    setActiveType(type);
    setPage(1);
  };

  const changeActiveCategory = (category: FilterKey) => {
    setActiveCategory(category);
    setPage(1);
  };

  const changeQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const changePerPage = (value: number) => {
    setPerPage(value);
    setPage(1);
  };

  const productTypes = useMemo(() => {
    const types = localizedProducts
      .map((product) => getProductType(product))
      .filter(Boolean);

    return ["all", ...Array.from(new Set(types))];
  }, [localizedProducts]);

  const categories = useMemo(() => {
    const items = localizedProducts.flatMap((product) =>
      product.categories.map((category) => category.key),
    );

    return ["all", ...Array.from(new Set(items))];
  }, [localizedProducts]);

  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return localizedProducts.filter((product) => {
      const type = getProductType(product);

      const categoryKeys = product.categories.map((category) => category.key);
      const categoryLabels = product.categories.map((category) => category.label);
      const badgeLabels = product.badges.map((badge) => badge.label);
      const variantLabels = product.variants.map((variant) => variant.label);

      const matchType = activeType === "all" || type === activeType;

      const matchCategory =
        activeCategory === "all" || categoryKeys.includes(activeCategory);

      const searchableText = [
        product.name,
        product.desc,
        type,
        ...categoryKeys,
        ...categoryLabels,
        ...badgeLabels,
        ...variantLabels,
        type === "ala-carte" ? "ala carte alacarte" : "",
        type === "alaCarte" ? "ala carte alacarte" : "",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchQuery = keyword === "" || searchableText.includes(keyword);

      return matchType && matchCategory && matchQuery;
    });
  }, [localizedProducts, activeType, activeCategory, query]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / perPage));
  const currentPage = Math.min(page, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage, perPage]);

  const startItem = totalProducts === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalProducts);

  const totalQty = useMemo(() => {
    return Object.values(cart).reduce((total, qty) => total + qty, 0);
  }, [cart]);

  const updateQty = (
    product: LocalizedProductItem,
    variant: LocalizedProductVariant,
    action: "plus" | "minus",
  ) => {
    const cartKey = getCartKey(product.id, variant.key);

    setCart((prev) => {
      const currentQty = prev[cartKey] || 0;
      const nextQty =
        action === "plus" ? currentQty + 1 : Math.max(currentQty - 1, 0);

      if (nextQty <= 0) {
        const updated = { ...prev };
        delete updated[cartKey];

        return updated;
      }

      return {
        ...prev,
        [cartKey]: nextQty,
      };
    });
  };

  const resetFilter = () => {
    setActiveType("all");
    setActiveCategory("all");
    setQuery("");
    setPage(1);
  };

  const goToPage = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const hasActiveFilter =
    activeType !== "all" || activeCategory !== "all" || query.trim() !== "";

  const pageNumbers = useMemo(() => {
    const maxVisible = 5;
    const pages: number[] = [];

    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let number = start; number <= end; number += 1) {
      pages.push(number);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div
      className={`
        min-h-screen overflow-hidden transition-all duration-500
        ${theme === "dark"
          ? "bg-[#0F0F10] text-white"
          : "bg-gradient-to-br from-[#fff7ed] via-[#fffaf5] to-[#ffe7c2] text-zinc-900"
        }
      `}
    >
      <Head title="Produk & Paket" />

      <AmbientBackground theme={theme} />

      <Navbar
        theme={theme}
        scrolled={scrolled}
        onToggleTheme={toggleTheme}
        cartItems={navbarCartItems}
      />

      <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 md:px-6 md:pt-36">
        <section className="grid gap-6 lg:grid-cols-[1fr_390px] lg:items-end">
          <div>
            <div
              className={`
                mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-xl
                ${theme === "dark"
                  ? "border-orange-400/20 bg-orange-500/10 text-orange-200"
                  : "border-orange-200 bg-white/70 text-orange-700"
                }
              `}
            >
              <SlidersHorizontal size={16} />
              Semua produk dalam satu halaman
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Pilih Produk,
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                {" "}
                Paket,{" "}
              </span>
              atau Promo.
            </h1>

            <p
              className={`
                mt-4 max-w-2xl leading-8
                ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}
              `}
            >
              Semua produk dan paket ditampilkan langsung di halaman ini.
              Customer bisa filter, cari produk, lalu pilih produk yang
              diinginkan.
            </p>
          </div>

          <div
            className={`
              rounded-[28px] border p-4 backdrop-blur-xl
              ${theme === "dark"
                ? "border-white/10 bg-white/[0.04]"
                : "border-orange-100 bg-white/70"
              }
            `}
          >
            <div
              className={`
                flex items-center gap-3 rounded-2xl px-4 py-3
                ${theme === "dark" ? "bg-black/30" : "bg-orange-50"}
              `}
            >
              <Search
                size={18}
                className={theme === "dark" ? "text-zinc-500" : "text-zinc-400"}
              />

              <input
                value={query}
                onChange={(e) => changeQuery(e.target.value)}
                placeholder="Cari produk, paket, kategori..."
                className={`
    w-full bg-transparent text-sm outline-none
    ${theme === "dark"
                    ? "placeholder:text-zinc-500"
                    : "placeholder:text-zinc-400"
                  }
  `}
              />
            </div>
          </div>
        </section>

        <section
          className={`
            sticky top-20 z-30 mt-8 rounded-[28px] border p-3 backdrop-blur-xl
            ${theme === "dark"
              ? "border-white/10 bg-[#0F0F10]/85"
              : "border-orange-100 bg-white/80"
            }
          `}
        >
          <div className="flex gap-2 overflow-x-auto pb-1">
            {productTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => changeActiveType(type)}
                className={`
                  shrink-0 rounded-2xl px-5 py-3 text-sm font-semibold transition
                  ${activeType === type
                    ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/20"
                    : theme === "dark"
                      ? "bg-white/[0.06] text-zinc-300 hover:bg-white/[0.1]"
                      : "bg-orange-50 text-zinc-700 hover:bg-orange-100"
                  }
                `}
              >
                {labelFromValue(type)}
              </button>
            ))}

            {hasActiveFilter && (
              <button
                type="button"
                onClick={resetFilter}
                className={`
                  shrink-0 rounded-2xl border px-5 py-3 text-sm font-semibold transition
                  ${theme === "dark"
                    ? "border-white/10 text-zinc-300 hover:bg-white/[0.08]"
                    : "border-orange-100 text-zinc-700 hover:bg-orange-50"
                  }
                `}
              >
                Reset
              </button>
            )}
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => changeActiveCategory(category)}
                className={`
                  shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition
                  ${activeCategory === category
                    ? theme === "dark"
                      ? "bg-white text-zinc-950"
                      : "bg-zinc-950 text-white"
                    : theme === "dark"
                      ? "bg-white/[0.06] text-zinc-400 hover:bg-white/[0.1]"
                      : "bg-white/70 text-zinc-600 hover:bg-orange-50"
                  }
                `}
              >
                {getCategoryFilterLabel(category, localizedProducts)}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p
              className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-zinc-500"
                }`}
            >
              Menampilkan {startItem}-{endItem} dari {totalProducts}
            </p>

            <h2 className="text-2xl font-semibold">{totalProducts} Produk</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`
                rounded-2xl border px-4 py-3 text-sm capitalize
                ${theme === "dark"
                  ? "border-white/10 bg-white/[0.04] text-zinc-400"
                  : "border-orange-100 bg-white/70 text-zinc-600"
                }
              `}
            >
              {activeCategory !== "all"
                ? getCategoryFilterLabel(activeCategory, localizedProducts)
                : activeType === "all"
                  ? "Semua Kategori"
                  : labelFromValue(activeType)}
            </div>

            <select
              value={perPage}
              onChange={(e) => changePerPage(Number(e.target.value))}
              className={`
                rounded-2xl border px-4 py-3 text-sm outline-none
                ${theme === "dark"
                  ? "border-white/10 bg-white/[0.04] text-white"
                  : "border-orange-100 bg-white/70 text-zinc-700"
                }
              `}
            >
              {PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-zinc-900">
                  {option} / halaman
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => {
              const selectedVariantKey = selectedVariants[product.id];

              const selectedVariant = getDefaultVariant(
                product,
                selectedVariantKey,
              );

              const cartKey = getCartKey(product.id, selectedVariant?.key);

              return (
                <ProductCard
                  key={product.id}
                  theme={theme}
                  product={product}
                  selectedVariantKey={selectedVariant?.key}
                  qty={cart[cartKey] || 0}
                  addButtonLabel={sectionText.addButtonLabel}
                  detailButtonLabel={sectionText.detailButtonLabel}
                  onSelectVariant={(variant) =>
                    setSelectedVariants((current) => ({
                      ...current,
                      [product.id]: variant.key,
                    }))
                  }
                  onDetail={(selectedProduct, selectedProductVariant) =>
                    setSelectedDetail({
                      product: selectedProduct,
                      variant: selectedProductVariant,
                    })
                  }
                  onPlus={(selectedProduct, selectedProductVariant) =>
                    updateQty(selectedProduct, selectedProductVariant, "plus")
                  }
                  onMinus={(selectedProduct, selectedProductVariant) =>
                    updateQty(selectedProduct, selectedProductVariant, "minus")
                  }
                />
              );
            })
          ) : (
            <div
              className={`
                col-span-full rounded-[32px] border p-10 text-center backdrop-blur-xl
                ${theme === "dark"
                  ? "border-white/10 bg-white/[0.04]"
                  : "border-orange-100 bg-white/70"
                }
              `}
            >
              <p className="text-lg font-semibold">Produk tidak ditemukan</p>

              <p
                className={`mt-2 text-sm ${theme === "dark" ? "text-zinc-500" : "text-zinc-500"
                  }`}
              >
                Coba ubah kata pencarian atau kategori.
              </p>

              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={resetFilter}
                  className="mt-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20"
                >
                  Reset Filter
                </button>
              )}
            </div>
          )}
        </section>

        {totalProducts > 0 && totalPages > 1 && (
          <section className="mt-10 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p
              className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-zinc-500"
                }`}
            >
              Halaman {currentPage} dari {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => goToPage(currentPage - 1)}
                className={`
                  flex h-11 w-11 items-center justify-center rounded-2xl border transition disabled:cursor-not-allowed disabled:opacity-40
                  ${theme === "dark"
                    ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                    : "border-orange-100 bg-white/70 hover:bg-orange-50"
                  }
                `}
              >
                <ChevronLeft size={18} />
              </button>

              {pageNumbers[0] > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goToPage(1)}
                    className={`
                      h-11 min-w-11 rounded-2xl border px-4 text-sm font-semibold transition
                      ${theme === "dark"
                        ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                        : "border-orange-100 bg-white/70 hover:bg-orange-50"
                      }
                    `}
                  >
                    1
                  </button>

                  {pageNumbers[0] > 2 && (
                    <span
                      className={
                        theme === "dark" ? "text-zinc-500" : "text-zinc-400"
                      }
                    >
                      ...
                    </span>
                  )}
                </>
              )}

              {pageNumbers.map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => goToPage(number)}
                  className={`
                    h-11 min-w-11 rounded-2xl border px-4 text-sm font-semibold transition
                    ${currentPage === number
                      ? "border-orange-400 bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/20"
                      : theme === "dark"
                        ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                        : "border-orange-100 bg-white/70 hover:bg-orange-50"
                    }
                  `}
                >
                  {number}
                </button>
              ))}

              {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                  {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                    <span
                      className={
                        theme === "dark" ? "text-zinc-500" : "text-zinc-400"
                      }
                    >
                      ...
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => goToPage(totalPages)}
                    className={`
                      h-11 min-w-11 rounded-2xl border px-4 text-sm font-semibold transition
                      ${theme === "dark"
                        ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                        : "border-orange-100 bg-white/70 hover:bg-orange-50"
                      }
                    `}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => goToPage(currentPage + 1)}
                className={`
                  flex h-11 w-11 items-center justify-center rounded-2xl border transition disabled:cursor-not-allowed disabled:opacity-40
                  ${theme === "dark"
                    ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                    : "border-orange-100 bg-white/70 hover:bg-orange-50"
                  }
                `}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </section>
        )}

        {totalQty > 0 && (
          <div className="fixed bottom-24 left-1/2 z-40 w-[calc(100%-24px)] max-w-xl -translate-x-1/2 xl:hidden">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-[26px] bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-4 text-white shadow-2xl shadow-orange-500/30"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />

                <div className="text-left">
                  <p className="text-xs text-white/80">Keranjang</p>
                  <p className="font-semibold">{totalQty} item</p>
                </div>
              </div>

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                Lihat
              </span>
            </button>
          </div>
        )}
      </main>

      {selectedDetail && (
        <ProductDetailModal
          theme={theme}
          product={selectedDetail.product}
          selectedVariant={selectedDetail.variant}
          text={{
            modalTitle: sectionText.modalTitle,
            categoriesLabel: sectionText.categoriesLabel,
            badgesLabel: sectionText.badgesLabel,
            variantsLabel: sectionText.variantsLabel,
            selectedVariantLabel: sectionText.selectedVariantLabel,
            closeLabel: sectionText.closeLabel,
            noDataLabel: sectionText.noDataLabel,
          }}
          onClose={() => setSelectedDetail(null)}
          onSelectVariant={(variant) =>
            setSelectedDetail((current) =>
              current
                ? {
                  ...current,
                  variant,
                }
                : current,
            )
          }
        />
      )}

      <MobileNavbar theme={theme} />

      <div className="h-24 xl:hidden" />

      <Footer theme={theme} />
    </div>
  );
}

export default function ProductCatalogPage() {
  return (
    <AppProvider>
      <ProductCatalogContent />
    </AppProvider>
  );
}