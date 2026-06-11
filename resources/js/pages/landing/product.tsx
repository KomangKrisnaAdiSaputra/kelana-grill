import { Head, usePage } from '@inertiajs/react';

import {
    ChevronLeft,
    ChevronRight,
    Search,
    SlidersHorizontal,
} from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';

import AmbientBackground from '@/components/landing/ambient-background';

import Footer from '@/components/landing/footer';

import MobileNavbar from '@/components/landing/mobile-navbar';

import Navbar from '@/components/landing/navbar';

import ProductCard from '@/components/landing/product-card';

import ProductDetailModal from '@/components/landing/product-detail-modal';

import AppProvider from '@/contexts/app-provider';

import { useCart } from '@/contexts/cart-context';

import { useTheme } from '@/contexts/theme-context';

import { useTranslation } from '@/helpers/global';

import type { Product, ProductVariant } from '@/types/product';

type ProductCatalogPageProps = {
    products: Product[];
};

type SelectedDetail = {
    product: Product;
    variant: ProductVariant;
};

type FilterKey = 'all' | string;

const PER_PAGE_OPTIONS = [6, 9, 12, 18];

function normalizeText(value: unknown) {
    return String(value ?? '').trim();
}

function getProductType(product: Product) {
    return normalizeText(product.type);
}

function getDefaultVariantId(product: Product) {
    const defaultVariantId = product.variants?.[0]?.id;

    return defaultVariantId != null ? String(defaultVariantId) : undefined;
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

    const { products = [] } = usePage<ProductCatalogPageProps>().props;

    const { addToCart, getItemQty } = useCart();

    const [scrolled, setScrolled] = useState(false);

    const [activeType, setActiveType] = useState<FilterKey>('all');

    const [activeCategory, setActiveCategory] = useState<FilterKey>('all');

    const [query, setQuery] = useState('');

    const [page, setPage] = useState(1);

    const [perPage, setPerPage] = useState(9);

    const [showFilters, setShowFilters] = useState(false);

    const [selectedDetail, setSelectedDetail] = useState<SelectedDetail | null>(
        null,
    );

    const [selectedButton, setSelectedButton] =
        useState<HTMLButtonElement | null>(null);

    const [selectedVariants, setSelectedVariants] = useState<
        Record<string, string>
    >({});

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const productTypes = useMemo(() => {
        const types = products
            .map((product) => getProductType(product))
            .filter(Boolean);

        return ['all', ...Array.from(new Set(types))];
    }, [products]);

    const categories = useMemo(() => {
        const items = products.flatMap(
            (product) =>
                product.categories?.reduce<string[]>((acc, category) => {
                    if (category?.id != null) {
                        acc.push(String(category.id));
                    }

                    return acc;
                }, []) ?? [],
        );

        return ['all', ...Array.from(new Set(items))];
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

            const searchableText = [
                product.name,
                product.description,
                type,
                ...(product.categories?.map((category) => category.name) ?? []),
                ...(product.badges?.map((badge) => badge.name) ?? []),
                ...(product.variants?.map((variant) => variant.name) ?? []),
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            const matchType = activeType === 'all' || type === activeType;

            const matchCategory =
                activeCategory === 'all' ||
                categoryIds.includes(activeCategory);

            const matchQuery =
                keyword === '' || searchableText.includes(keyword);

            return matchType && matchCategory && matchQuery;
        });
    }, [products, activeType, activeCategory, query]);

    const totalProducts = filteredProducts.length;

    const totalPages = Math.max(1, Math.ceil(totalProducts / perPage));

    const currentPage = Math.min(page, totalPages);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * perPage;

        return filteredProducts.slice(start, start + perPage);
    }, [filteredProducts, currentPage, perPage]);

    const pageNumbers = useMemo(() => {
        const maxVisible = 4;

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

    function labelFromValue(value: string) {
        if (value === 'all') {
            return __('Semua');
        }

        return value
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    function getCategoryFilterLabel(categoryId: string, products: Product[]) {
        if (categoryId === 'all') {
            return __('Semua Kategori');
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
            className={`min-h-screen overflow-hidden transition-all duration-500 ${theme === 'dark' ? 'bg-theme-dark' : 'bg-theme-light'} `}
        >
            <Head title={__('Produk')} />

            <AmbientBackground theme={theme} />

            <Navbar
                theme={theme}
                scrolled={scrolled}
                onToggleTheme={toggleTheme}
            />

            <main className="relative mx-auto max-w-7xl px-4 pt-28 pb-24 md:px-6 md:pt-36">
                {/* HERO */}

                <section>
                    <div
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-xl ${theme === 'dark'
                                ? 'border-orange-400/20 bg-orange-500/10 text-orange-200'
                                : 'border-orange-200 bg-white/70 text-orange-700'
                            } `}
                    >
                        <SlidersHorizontal size={16} />

                        {__('Semua Produk')}
                    </div>

                    <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                        {__('Pilih Produk')}
                    </h1>

                    <p
                        className={`mt-4 max-w-2xl leading-7 md:leading-8 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                            } `}
                    >
                        {__(
                            'Temukan berbagai pilihan produk dan paket terbaik dalam satu halaman yang mudah dicari dan difilter.',
                        )}
                    </p>
                </section>

                {/* FILTER */}

                <section className="sticky top-[72px] z-40 mt-6 md:top-24 md:mt-8">
                    <div
                        className={`overflow-hidden rounded-[28px] backdrop-blur-2xl ${theme === 'dark'
                                ? 'theme-card-dark'
                                : 'theme-card-light'
                            } `}
                    >
                        <div className="p-3">
                            <div className="flex items-center gap-3">
                                {/* SEARCH */}

                                <div
                                    className={`flex flex-1 items-center gap-3 rounded-2xl px-4 py-3 ${theme === 'dark'
                                            ? 'bg-white/[0.04]'
                                            : 'bg-orange-50/80'
                                        } `}
                                >
                                    <Search
                                        size={16}
                                        className={
                                            theme === 'dark'
                                                ? 'text-zinc-400'
                                                : 'text-zinc-500'
                                        }
                                    />

                                    <input
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder={__(
                                            'Cari produk atau paket...',
                                        )}
                                        className={`w-full bg-transparent text-sm outline-none ${theme === 'dark'
                                                ? 'text-white placeholder:text-zinc-500'
                                                : 'text-zinc-800 placeholder:text-zinc-400'
                                            } `}
                                    />
                                </div>

                                {/* FILTER BUTTON */}

                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex h-[52px] items-center gap-2 rounded-2xl bg-orange-500 px-4 text-white transition-all duration-300 hover:bg-orange-600"
                                >
                                    <SlidersHorizontal size={16} />
                                    Filter
                                </button>
                            </div>
                        </div>

                        {/* FILTER CONTENT */}

                        {showFilters && (
                            <div
                                className={`border-t px-3 pt-3 pb-4 ${theme === 'dark'
                                        ? 'border-white/10'
                                        : 'border-orange-100'
                                    } `}
                            >
                                {/* TYPE */}

                                <div className="flex flex-wrap gap-2">
                                    {productTypes.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                setActiveType(type);

                                                setPage(1);
                                            }}
                                            className={`rounded-2xl px-4 py-2 text-sm transition-all ${activeType === type
                                                    ? 'bg-orange-500 text-white'
                                                    : theme === 'dark'
                                                        ? `bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]`
                                                        : `bg-orange-50 text-zinc-700 hover:bg-orange-100`
                                                } `}
                                        >
                                            {labelFromValue(type)}
                                        </button>
                                    ))}
                                </div>

                                {/* CATEGORY */}

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                setActiveCategory(category);

                                                setPage(1);
                                            }}
                                            className={`rounded-2xl px-4 py-2 text-sm transition-all ${activeCategory === category
                                                    ? 'bg-orange-500 text-white'
                                                    : theme === 'dark'
                                                        ? `bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]`
                                                        : `bg-white text-zinc-700 hover:bg-orange-50`
                                                } `}
                                        >
                                            {getCategoryFilterLabel(
                                                category,
                                                products,
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* HEADER */}

                <section className="mt-8 flex items-center justify-between">
                    <p
                        className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                            } `}
                    >
                        {totalProducts} {__('produk')}
                    </p>

                    <select
                        value={perPage}
                        onChange={(e) => {
                            setPerPage(Number(e.target.value));

                            setPage(1);
                        }}
                        className={`rounded-2xl border px-4 py-3 text-sm transition-all outline-none ${theme === 'dark'
                                ? `border-white/10 bg-white/[0.04] text-white`
                                : `border-orange-100 bg-white text-zinc-800`
                            } `}
                    >
                        {PER_PAGE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option} /{__('halaman')}
                            </option>
                        ))}
                    </select>
                </section>

                {/* PRODUCTS */}

                <section className="mt-6 grid gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-3">
                    {paginatedProducts.map((product) => {
                        const selectedVariantId =
                            selectedVariants[product.id] ??
                            getDefaultVariantId(product);

                        return (
                            <ProductCard
                                key={product.id}
                                theme={theme}
                                product={product}
                                selectedVariantId={selectedVariantId}
                                onSelectVariant={(variant) =>
                                    setSelectedVariants((current) => ({
                                        ...current,
                                        [product.id]: String(variant.id),
                                    }))
                                }
                                onDetail={(
                                    selectedProduct,
                                    selectedVariant,
                                    buttonEl,
                                ) => {
                                    setSelectedButton(buttonEl);

                                    setSelectedDetail({
                                        product: selectedProduct,
                                        variant: selectedVariant,
                                    });
                                }}
                                cartQty={getItemQty(`${product.id}${selectedVariantId ? `-${selectedVariantId}` : ''}`)}
                                onAddToCart={addToCart}
                            />
                        );
                    })}
                </section>

                {/* MODAL */}

                {selectedDetail && (
                    <ProductDetailModal
                        buttonEl={selectedButton}
                        theme={theme}
                        product={selectedDetail.product}
                        selectedVariant={selectedDetail.variant}
                        text={{
                            modalTitle: __('Detail Produk'),
                            categoriesLabel: __('Kategori'),
                            badgesLabel: __('Badge'),
                            variantsLabel: __('Pilihan Paket'),
                            selectedVariantLabel: __('Pilihan saat ini'),
                            closeLabel: __('Tutup'),
                            noDataLabel: __('Tidak ada data.'),
                        }}
                        onClose={() => setSelectedDetail(null)}
                    />
                )}

                {/* PAGINATION */}

                {totalPages > 1 && (
                    <section className="mt-12 flex flex-wrap items-center justify-center gap-2">
                        <button
                            disabled={currentPage <= 1}
                            onClick={() => setPage(currentPage - 1)}
                            className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all ${theme === 'dark'
                                    ? `border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]`
                                    : `border-orange-100 bg-white text-zinc-700 hover:bg-orange-50`
                                } `}
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                onClick={() => setPage(number)}
                                className={`h-11 min-w-11 rounded-2xl px-4 text-sm font-semibold transition-all ${currentPage === number
                                        ? 'bg-orange-500 text-white'
                                        : theme === 'dark'
                                            ? `border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]`
                                            : `border border-orange-100 bg-white text-zinc-700 hover:bg-orange-50`
                                    } `}
                            >
                                {number}
                            </button>
                        ))}

                        <button
                            disabled={currentPage >= totalPages}
                            onClick={() => setPage(currentPage + 1)}
                            className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all ${theme === 'dark'
                                    ? `border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]`
                                    : `border-orange-100 bg-white text-zinc-700 hover:bg-orange-50`
                                } `}
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
