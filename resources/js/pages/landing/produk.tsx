import { Head, usePage } from "@inertiajs/react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
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

import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "@/helpers/global";

import type { Product, ProductVariant } from "@/types/product";

type ProductCatalogPageProps = {
  products: Product[];
};

type SelectedDetail = {
  product: Product;
  variant: ProductVariant;
};

type FilterKey = "all" | string;

const PER_PAGE_OPTIONS = [6, 9, 12, 18];

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function getProductType(product: Product) {
  return normalizeText(product.type);
}

function getDefaultVariantId(product: Product) {
  const defaultVariantId = product.variants?.[0]?.id;

  return defaultVariantId != null
    ? String(defaultVariantId)
    : undefined;
}

export default function ProductCatalogPage() {
  return (
    <AppProvider>
      <ProductCatalogContent />
    </AppProvider>
  );
}

function ProductCatalogContent() {
  const { theme, toggleTheme } = useTheme();

  const { __ } = useTranslation();

  const { products = [] } =
    usePage<ProductCatalogPageProps>().props;

  const [scrolled, setScrolled] = useState(false);

  const [activeType, setActiveType] =
    useState<FilterKey>("all");

  const [activeCategory, setActiveCategory] =
    useState<FilterKey>("all");

  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);

  const [perPage, setPerPage] = useState(9);

  const [showFilters, setShowFilters] = useState(false);

  const [selectedDetail, setSelectedDetail] = useState<SelectedDetail | null>(null);

  const [selectedVariants, setSelectedVariants] =
    useState<Record<string, string>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const productTypes = useMemo(() => {
    const types = products
      .map((product) => getProductType(product))
      .filter(Boolean);

    return ["all", ...Array.from(new Set(types))];
  }, [products]);

  const categories = useMemo(() => {
    const items = products.flatMap((product) =>
      product.categories?.reduce<string[]>(
        (acc, category) => {
          if (category?.id != null) {
            acc.push(String(category.id));
          }

          return acc;
        },
        [],
      ) ?? [],
    );

    return ["all", ...Array.from(new Set(items))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return products.filter((product) => {
      const type = getProductType(product);

      const categoryIds =
        product.categories?.reduce<string[]>(
          (acc, category) => {
            if (category?.id != null) {
              acc.push(String(category.id));
            }

            return acc;
          },
          [],
        ) ?? [];

      const categoryNames =
        product.categories?.map(
          (category) => category.name,
        ) ?? [];

      const badgeNames =
        product.badges?.map(
          (badge) => badge.name,
        ) ?? [];

      const variantNames =
        product.variants?.map(
          (variant) => variant.name,
        ) ?? [];

      const matchType =
        activeType === "all" ||
        type === activeType;

      const matchCategory =
        activeCategory === "all" ||
        categoryIds.includes(activeCategory);

      const searchableText = [
        product.name,
        product.description,
        type,
        ...categoryNames,
        ...badgeNames,
        ...variantNames,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchQuery =
        keyword === "" ||
        searchableText.includes(keyword);

      return (
        matchType &&
        matchCategory &&
        matchQuery
      );
    });
  }, [
    products,
    activeType,
    activeCategory,
    query,
  ]);

  const totalProducts = filteredProducts.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalProducts / perPage),
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * perPage;

    const end = start + perPage;

    return filteredProducts.slice(start, end);
  }, [
    filteredProducts,
    currentPage,
    perPage,
  ]);

  const pageNumbers = useMemo(() => {
    const maxVisible = 5;

    const pages: number[] = [];

    let start = Math.max(
      1,
      currentPage - 2,
    );

    const end = Math.min(
      totalPages,
      start + maxVisible - 1,
    );

    if (end - start + 1 < maxVisible) {
      start = Math.max(
        1,
        end - maxVisible + 1,
      );
    }

    for (
      let number = start;
      number <= end;
      number += 1
    ) {
      pages.push(number);
    }

    return pages;
  }, [currentPage, totalPages]);

  function labelFromValue(value: string) {
    if (value === "all") {
      return __("Semua");
    }

    return value
      .replace(/-/g, " ")
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/\b\w/g, (char) =>
        char.toUpperCase(),
      );
  }

  function getCategoryFilterLabel(
    categoryId: string,
    products: Product[],
  ) {
    if (categoryId === "all") {
      return __("Semua Kategori");
    }

    for (const product of products) {
      const category =
        product.categories?.find(
          (item) =>
            String(item.id) === categoryId,
        );

      if (category) {
        return category.name;
      }
    }

    return labelFromValue(categoryId);
  }

  return (
    <div
      className={`
        min-h-screen transition-all duration-500
        ${theme === "dark"
          ? "bg-[#0F0F10] text-white"
          : "bg-gradient-to-br from-[#fff7ed] via-[#fffaf5] to-[#ffe7c2] text-zinc-900"
        }
      `}
    >
      <Head title={__("Produk")} />

      <AmbientBackground theme={theme} />

      <Navbar
        theme={theme}
        scrolled={scrolled}
        onToggleTheme={toggleTheme}
        cartItems={[]}
      />

      <main className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 md:px-6 md:pt-36">

        {/* HERO */}

        <section>

          <div
            className={`
              inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-xl
              ${theme === "dark"
                ? "border-orange-400/20 bg-orange-500/10 text-orange-200"
                : "border-orange-200 bg-white/70 text-orange-700"
              }
            `}
          >
            <SlidersHorizontal size={16} />
            {__("Semua Produk")}
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            {__("Pilih Produk")}
          </h1>

          <p
            className={`
              mt-4 max-w-2xl leading-7 md:leading-8
              ${theme === "dark"
                ? "text-zinc-400"
                : "text-zinc-600"
              }
            `}
          >
            {__(
              "Temukan berbagai pilihan produk dan paket terbaik dalam satu halaman yang mudah dicari dan difilter.",
            )}
          </p>

        </section>

        {/* STICKY SEARCH + FILTER */}

        <section
          className={`
    sticky top-[72px] md:top-24 z-40 mt-6 md:mt-8
    transition-all duration-300
  `}
        >

          <div
            className={`
      overflow-hidden rounded-[28px]
      backdrop-blur-2xl
      transition-all duration-300
      shadow-[0_8px_30px_rgb(0,0,0,0.04)]
      ${theme === "dark"
                ? "bg-[#111112]/80 ring-1 ring-white/10"
                : "bg-white/80 ring-1 ring-orange-100"
              }
    `}
          >

            {/* SEARCH BAR */}

            <div className="p-3">

              <div className="flex items-center gap-3">

                {/* SEARCH */}

                <div
                  className={`
            flex flex-1 items-center gap-3 rounded-2xl px-4 py-3
            transition-all duration-300
            ${theme === "dark"
                      ? "bg-white/[0.04] focus-within:bg-white/[0.06]"
                      : "bg-orange-50/80 focus-within:bg-orange-50"
                    }
          `}
                >

                  <div
                    className={`
              flex h-9 w-9 items-center justify-center rounded-xl
              ${theme === "dark"
                        ? "bg-white/[0.04]"
                        : "bg-white"
                      }
            `}
                  >
                    <Search
                      size={16}
                      className={
                        theme === "dark"
                          ? "text-zinc-400"
                          : "text-zinc-500"
                      }
                    />
                  </div>

                  <input
                    value={query}
                    onChange={(e) =>
                      setQuery(e.target.value)
                    }
                    placeholder={__(
                      "Cari produk atau paket...",
                    )}
                    className={`
              w-full bg-transparent text-sm outline-none
              ${theme === "dark"
                        ? "placeholder:text-zinc-500"
                        : "placeholder:text-zinc-400"
                      }
            `}
                  />

                </div>

                {/* FILTER BUTTON */}

                <button
                  type="button"
                  onClick={() =>
                    setShowFilters(
                      !showFilters,
                    )
                  }
                  className={`
            flex h-[52px] items-center gap-2 rounded-2xl px-4
            text-sm font-medium
            transition-all duration-300
            ${showFilters
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : theme === "dark"
                        ? "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]"
                        : "bg-orange-50 text-zinc-700 hover:bg-orange-100"
                    }
          `}
                >

                  <SlidersHorizontal size={16} />

                  <span className="hidden sm:block">
                    {__("Filter")}
                  </span>

                </button>

              </div>

            </div>

            {/* COLLAPSIBLE FILTER */}

            <div
              className={`
        overflow-hidden transition-all duration-500 ease-in-out
        ${showFilters
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
                }
      `}
            >

              <div
                className={`
          border-t px-3 pb-4 pt-3
          ${theme === "dark"
                    ? "border-white/10"
                    : "border-orange-100"
                  }
        `}
              >

                {/* PRODUCT TYPES */}

                <div>

                  <p
                    className={`
              mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]
              ${theme === "dark"
                        ? "text-zinc-500"
                        : "text-zinc-400"
                      }
            `}
                  >
                    {__("Tipe Produk")}
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {productTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setActiveType(type);
                          setPage(1);
                        }}
                        className={`
                  rounded-2xl px-4 py-2.5
                  text-xs md:text-sm font-semibold
                  transition-all duration-300
                  ${activeType === type
                            ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/20"
                            : theme === "dark"
                              ? "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]"
                              : "bg-orange-50 text-zinc-700 hover:bg-orange-100"
                          }
                `}
                      >
                        {labelFromValue(type)}
                      </button>
                    ))}

                  </div>

                </div>

                {/* CATEGORIES */}

                <div className="mt-5">

                  <p
                    className={`
              mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]
              ${theme === "dark"
                        ? "text-zinc-500"
                        : "text-zinc-400"
                      }
            `}
                  >
                    {__("Kategori")}
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setActiveCategory(category);
                          setPage(1);
                        }}
                        className={`
                  rounded-2xl px-4 py-2.5
                  text-xs md:text-sm font-medium
                  transition-all duration-300
                  ${activeCategory === category
                            ? theme === "dark"
                              ? "bg-white text-zinc-950 shadow-lg"
                              : "bg-zinc-950 text-white shadow-lg shadow-zinc-950/10"
                            : theme === "dark"
                              ? "bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08]"
                              : "bg-white text-zinc-600 hover:bg-orange-50"
                          }
                `}
                      >
                        {getCategoryFilterLabel(
                          category,
                          products,
                        )}
                      </button>
                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* HEADER */}

        <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p
              className={`
                text-sm
                ${theme === "dark"
                  ? "text-zinc-500"
                  : "text-zinc-500"
                }
              `}
            >
              {totalProducts}{" "}
              {__("Produk")}
            </p>
          </div>

          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(
                Number(e.target.value),
              );

              setPage(1);
            }}
            className={`
              rounded-2xl border px-4 py-3 text-sm outline-none
              transition-all
              ${theme === "dark"
                ? "border-white/10 bg-white/[0.04] text-white"
                : "border-orange-100 bg-white/70 text-zinc-700"
              }
            `}
          >
            {PER_PAGE_OPTIONS.map((option) => (
              <option
                key={option}
                value={option}
                className="text-zinc-900"
              >
                {option} /{" "}
                {__("halaman")}
              </option>
            ))}
          </select>

        </section>

        {/* PRODUCTS */}

        <section className="mt-6 grid gap-4 md:gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                theme={theme}
                product={product}
                selectedVariantId={
                  selectedVariants[
                  product.id
                  ] ??
                  getDefaultVariantId(
                    product,
                  )
                }
                onSelectVariant={(
                  variant,
                ) =>
                  setSelectedVariants(
                    (current) => ({
                      ...current,
                      [product.id]:
                        String(
                          variant.id,
                        ),
                    }),
                  )
                }
                onDetail={(
                  selectedProduct,
                  selectedProductVariant,
                ) =>
                  setSelectedDetail({
                    product: selectedProduct,
                    variant:
                      selectedProductVariant,
                  })
                }
              />
            ))
          ) : (
            <div className="col-span-full py-24 text-center">

              <p className="text-xl font-semibold">
                {__(
                  "Produk tidak ditemukan",
                )}
              </p>

            </div>
          )}

        </section>

        {/* PAGINATION */}

        {totalPages > 1 && (
          <section className="mt-12 flex flex-wrap items-center justify-center gap-2">

            <button
              type="button"
              disabled={
                currentPage <= 1
              }
              onClick={() =>
                setPage(
                  currentPage - 1,
                )
              }
              className={`
                flex h-11 w-11 items-center justify-center rounded-2xl border transition-all
                ${theme === "dark"
                  ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                  : "border-orange-100 bg-white hover:bg-orange-50"
                }
              `}
            >
              <ChevronLeft size={18} />
            </button>

            {pageNumbers.map((number) => (
              <button
                key={number}
                type="button"
                onClick={() =>
                  setPage(number)
                }
                className={`
                  h-11 min-w-11 rounded-2xl px-4 text-sm font-semibold transition-all
                  ${currentPage === number
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : theme === "dark"
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-white hover:bg-orange-50"
                  }
                `}
              >
                {number}
              </button>
            ))}

            <button
              type="button"
              disabled={
                currentPage >=
                totalPages
              }
              onClick={() =>
                setPage(
                  currentPage + 1,
                )
              }
              className={`
                flex h-11 w-11 items-center justify-center rounded-2xl border transition-all
                ${theme === "dark"
                  ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                  : "border-orange-100 bg-white hover:bg-orange-50"
                }
              `}
            >
              <ChevronRight size={18} />
            </button>

          </section>
        )}

      </main>

      <MobileNavbar theme={theme} />

      <div className="h-24 xl:hidden" />

      <Footer theme={theme} />

      {selectedDetail && (
        <ProductDetailModal
          theme={theme}
          product={selectedDetail.product}
          selectedVariant={
            selectedDetail.variant
          }
          text={{
            modalTitle: __("Detail Produk"),
            categoriesLabel: __("Kategori"),
            badgesLabel: __("Badge"),
            variantsLabel: __("Pilihan Paket"),
            selectedVariantLabel: __(
              "Pilihan saat ini",
            ),
            closeLabel: __("Tutup"),
            noDataLabel: __("Tidak ada data."),
          }}
          onClose={() =>
            setSelectedDetail(null)
          }
        />
      )}
    </div>
  );
}