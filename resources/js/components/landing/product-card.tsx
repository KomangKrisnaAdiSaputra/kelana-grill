import { ShoppingBag } from 'lucide-react';
import { useRef } from 'react';

import { formatPrice, useTranslation } from '@/helpers/global';

import type { ThemeMode } from '@/types';
import type { Product, ProductVariant } from '@/types/product';

type ProductCardProps = {
    theme: ThemeMode;

    product: Product;

    selectedVariantId?: string;

    onSelectVariant?: (variant: ProductVariant) => void;

    onDetail?: (
        product: Product,
        variant: ProductVariant,
        buttonEl: HTMLButtonElement,
    ) => void;

    cartQty?: number;

    onAddToCart?: (product: Product, variant: ProductVariant) => void;
};

function getDefaultVariant(product: Product, selectedVariantId?: string) {
    return (
        product.variants.find(
            (variant) => String(variant.id) === String(selectedVariantId),
        ) ?? product.variants[0]
    );
}

export default function ProductCard({
    theme,
    product,
    selectedVariantId,
    onSelectVariant,
    onDetail,
    onAddToCart,
    cartQty = 0,
}: ProductCardProps) {
    const selectedVariant = getDefaultVariant(product, selectedVariantId);

    const category = product.categories?.[0];
    const { __ } = useTranslation();
    const detailButtonRef = useRef<HTMLButtonElement>(null);

    const productImage = product?.image ?? 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop';
    const productPriceValue = selectedVariant?.rate ?? product?.rate ?? 0;
    const productOriginalPriceValue = product?.originalPrice ?? 0;
    const hasPromoPrice = product?.hasPromo ?? (typeof productOriginalPriceValue === 'number' && productOriginalPriceValue > productPriceValue);
    const productPrice = formatPrice(productPriceValue);
    const productOriginalPrice = typeof productOriginalPriceValue === 'number' ? formatPrice(productOriginalPriceValue) : null;

    return (
        <article
            className={`group flex h-full flex-col overflow-hidden rounded-[26px] border transition-all duration-300 hover:-translate-y-1 ${theme === 'dark'
                ? 'theme-card-dark'
                : 'theme-card-light'
                }`}
        >
            {/* IMAGE */}

            <div className="relative h-48 overflow-hidden sm:h-56">
                {product.new && (
                    <div className="absolute top-3 right-3 z-20">
                        <div
                            className="
                flex items-center gap-1.5
                rounded-full
                border border-white/10
                bg-zinc-900/40
                px-3 py-1.5
                backdrop-blur-xl
                shadow-[0_8px_24px_rgba(0,0,0,0.18)]
            "
                        >
                            <span className="text-sm">✨</span>

                            <span className="text-[10px] font-bold tracking-[0.12em] text-white uppercase">
                                New
                            </span>
                        </div>
                    </div>
                )}

                <img
                    src={productImage}
                    alt={product.name ?? 'Product Image'}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

                {category && (
                    <div className="absolute top-3 left-3">
                        <span className="rounded-full bg-orange-500 px-3 py-1 text-[11px] font-semibold text-white shadow-lg">
                            {category.name}
                        </span>
                    </div>
                )}
            </div>

            {/* CONTENT */}

            <div className="flex h-full flex-1 flex-col p-4 sm:p-5">
                {/* TOP CONTENT */}

                <div className="flex-1">
                    <h3
                        className={`line-clamp-1 text-lg font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'
                            }`}
                    >
                        {product.name}
                    </h3>

                    {/* BADGES */}

                    {product.badges?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {product.badges.map((badge) => (
                                <span
                                    key={badge.id}
                                    className={`rounded-full px-2 py-1 text-[10px] font-medium ${theme === 'dark'
                                        ? 'border border-white/10 bg-white/5 text-zinc-300'
                                        : 'border border-zinc-200 bg-zinc-50 text-zinc-600'
                                        }`}
                                >
                                    {badge.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* DESCRIPTION */}

                    <div className="group/tooltip relative mt-2">
                        <div className="min-h-[40px]">
                            <p
                                className={`line-clamp-2 text-[13px] leading-5 ${theme === 'dark'
                                    ? 'text-zinc-400'
                                    : 'text-zinc-600'
                                    }`}
                            >
                                {product.description}
                            </p>
                        </div>

                        {product.description && (
                            <div
                                className={`pointer-events-none absolute bottom-full left-0 z-50 mb-2 hidden w-64 rounded-2xl px-3 py-2 text-xs leading-5 shadow-2xl group-hover/tooltip:block ${theme === 'dark'
                                    ? 'border border-white/10 bg-zinc-900 text-zinc-200'
                                    : 'border border-zinc-200 bg-white text-zinc-700'
                                    }`}
                            >
                                {product.description}
                            </div>
                        )}
                    </div>

                </div>
                {/* VARIANTS */}
                <div className="mt-4">
                    {product.variants.length <= 1 ? (
                        <div className="flex flex-wrap">
                            <span
                                className={`
                    rounded-full px-3 py-1.5 text-[11px] font-medium transition-all duration-200 sm:text-xs
                    ${theme === 'dark'
                                        ? 'border border-white/10 bg-white/5 text-zinc-400'
                                        : 'border border-zinc-200 bg-zinc-50 text-zinc-500'
                                    }
                `}
                            >
                                📦 Best Value
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {product.variants.map((variant) => {
                                const isActive = selectedVariant?.id === variant.id;

                                return (
                                    <button
                                        key={variant.id}
                                        onClick={() => onSelectVariant?.(variant)}
                                        className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-all duration-200 sm:text-xs ${isActive
                                            ? 'bg-orange-500 text-white shadow-md'
                                            : theme === 'dark'
                                                ? 'border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]'
                                                : 'border border-orange-100 bg-orange-50 text-zinc-700 hover:bg-orange-100'
                                            }`}
                                    >
                                        {variant.name}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* FOOTER */}

                <div className="mt-auto pt-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        {/* PRICE */}

                        <div className="min-w-0">
                            {hasPromoPrice && productOriginalPrice && (
                                <p
                                    className={`mb-1 text-xl font-medium line-through md:text-xs ${theme === 'dark'
                                        ? 'text-white'
                                        : 'text-zinc-900'
                                        }`}
                                >
                                    {productOriginalPrice}
                                </p>
                            )}

                            <p
                                className={`text-2xl font-black tracking-tight ${theme === 'dark'
                                    ? 'text-white'
                                    : 'text-zinc-900'
                                    }`}
                            >
                                {productPrice}
                            </p>

                            <p className="mt-1 text-xs text-zinc-500">
                                {__('per paket')}
                            </p>
                        </div>

                        {/* ACTIONS */}

                        <div className="flex w-full gap-2 sm:w-auto">
                            <button
                                ref={detailButtonRef}
                                onClick={() => {
                                    if (!detailButtonRef.current) {
                                        return;
                                    }

                                    onDetail?.(
                                        product,
                                        selectedVariant,
                                        detailButtonRef.current,
                                    );
                                }}
                                className={`h-11 flex-1 rounded-2xl px-4 text-sm font-medium transition-all duration-200 sm:flex-none ${theme === 'dark'
                                    ? 'border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]'
                                    : 'border border-orange-100 bg-orange-50 text-zinc-700 hover:bg-orange-100'
                                    }`}
                            >
                                Detail
                            </button>

                            <button
                                onClick={() =>
                                    onAddToCart?.(product, selectedVariant)
                                }
                                className="relative flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-600 active:scale-[0.98] sm:flex-none"
                            >
                                <ShoppingBag size={16} />

                                <span>{__('Tambah')}</span>

                                {cartQty > 0 && (
                                    <div className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-orange-500 shadow-md">
                                        {cartQty}
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
