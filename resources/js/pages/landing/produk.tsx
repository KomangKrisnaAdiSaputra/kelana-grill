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

import AppProvider from "@/contexts/app-provider";

import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "@/helpers/global";

import type { Product } from "@/types/product";

type ProductCatalogPageProps = {
  products: Product[];
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
      product.categories?.reduce<string[]>((acc, category) => {
        if (category?.id != null) {
          acc.push(String(category.id));
        }

        return acc;
      }, []) ?? [],
    );

    return ["all", ...Array.from(new Set(items))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return products.filter((product) => {
      const type = getProductType(product);

      const categoryIds =
        product.categories?.reduce<string[]>((acc, category) => {
          if (category?.id != null) {
            acc.push(String(category.id));
          }

          return acc;
        }, []) ?? [];

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
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function getCategoryFilterLabel(
    categoryId: string,
    products: Product[],
  ) {

    if (categoryId === "all") {
      return __("Semua Kategori");
    }

    for (const product of products) {
      const category = product.categories?.find(
        (item) => String(item.id) === categoryId,
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
        min-h-screen overflow-hidden transition-all duration-500
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
              {__("Semua Produk")}
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              {__("Pilih Produk")}
            </h1>

            <p
              className={`
                mt-4 max-w-2xl leading-8
                ${theme === "dark"
                  ? "text-zinc-400"
                  : "text-zinc-600"
                }
              `}
            >
              {__(
                "Semua produk dan paket tersedia dalam satu halaman.",
              )}
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
                ${theme === "dark"
                  ? "bg-black/30"
                  : "bg-orange-50"
                }
              `}
            >
              <Search
                size={18}
                className={
                  theme === "dark"
                    ? "text-zinc-500"
                    : "text-zinc-400"
                }
              />

              <input
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder={__(
                  __("Cari produk..."),
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
          <div className="flex gap-2 overflow-x-auto pb-2">

            {productTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setActiveType(type);
                  setPage(1);
                }}
                className={`
                  shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition
                  ${activeType === type
                    ? "bg-orange-500 text-white"
                    : theme === "dark"
                      ? "bg-white/5 text-zinc-300"
                      : "bg-orange-50 text-zinc-700"
                  }
                `}
              >
                {labelFromValue(type)}
              </button>
            ))}

          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setPage(1);
                }}
                className={`
                  shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition
                  ${activeCategory === category
                    ? "bg-zinc-950 text-white"
                    : theme === "dark"
                      ? "bg-white/5 text-zinc-300"
                      : "bg-white text-zinc-700"
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
        </section>

        <section className="mt-8 flex items-center justify-between">

          <div>
            <p
              className={`text-sm ${theme === "dark"
                ? "text-zinc-500"
                : "text-zinc-500"
                }`}
            >
              {totalProducts} {__("Produk")}
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
                {option} / {__("halaman")}
              </option>
            ))}
          </select>
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

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
                onSelectVariant={(variant) =>
                  setSelectedVariants(
                    (current) => ({
                      ...current,
                      [product.id]:
                        String(variant.id),
                    }),
                  )
                }
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">

              <p className="text-xl font-semibold">
                {__("Produk tidak ditemukan")}
              </p>

            </div>
          )}
        </section>

        {totalPages > 1 && (
          <section className="mt-10 flex items-center justify-center gap-2">

            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() =>
                setPage(currentPage - 1)
              }
              className="flex h-11 w-11 items-center justify-center rounded-2xl border"
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
                  h-11 min-w-11 rounded-2xl px-4 text-sm font-semibold
                  ${currentPage === number
                    ? "bg-orange-500 text-white"
                    : theme === "dark"
                      ? "bg-white/5"
                      : "bg-white"
                  }
                `}
              >
                {number}
              </button>
            ))}

            <button
              type="button"
              disabled={
                currentPage >= totalPages
              }
              onClick={() =>
                setPage(currentPage + 1)
              }
              className="flex h-11 w-11 items-center justify-center rounded-2xl border"
            >
              <ChevronRight size={18} />
            </button>

          </section>
        )}
      </main>

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