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

    return (
        <article
            className={`group overflow-hidden rounded-[30px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10 ${
                theme === 'dark' ? 'theme-card-dark' : 'theme-card-light'
            } `}
        >
            {/* IMAGE */}

            <div className="relative h-56 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name ?? 'Product Image'}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* CATEGORY */}

                {category && (
                    <div className="absolute top-4 left-4">
                        <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                            {category.name}
                        </span>
                    </div>
                )}
            </div>

            {/* CONTENT */}

            <div className="p-5">
                {/* TITLE */}

                <div>
                    <h3
                        className={`text-xl font-semibold tracking-tight ${
                            theme === 'dark' ? 'text-white' : 'text-zinc-900'
                        } `}
                    >
                        {product.name}
                    </h3>

                    <p
                        className={`mt-2 line-clamp-2 text-sm leading-6 ${
                            theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                        } `}
                    >
                        {product.description}
                    </p>
                </div>

                {/* VARIANTS */}

                {product.variants.length > 1 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                        {product.variants.map((variant) => {
                            const isActive = selectedVariant?.id === variant.id;

                            return (
                                <button
                                    key={variant.id}
                                    onClick={() => onSelectVariant?.(variant)}
                                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'bg-orange-500 text-white'
                                            : theme === 'dark'
                                              ? `border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]`
                                              : `border border-orange-100 bg-orange-50 text-zinc-700 hover:bg-orange-100`
                                    } `}
                                >
                                    {variant.name}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* PRICE + ACTIONS */}

                <div className="mt-6 flex items-end justify-between gap-3">
                    {/* PRICE */}

                    <div className="min-w-0">
                        <p
                            className={`text-2xl font-bold tracking-tight ${
                                theme === 'dark'
                                    ? 'text-white'
                                    : 'text-zinc-900'
                            } `}
                        >
                            {formatPrice(selectedVariant?.rate ?? 0)}
                        </p>

                        <p
                            className={`mt-1 text-xs ${
                                theme === 'dark'
                                    ? 'text-zinc-500'
                                    : 'text-zinc-500'
                            } `}
                        >
                            {__('per paket')}
                        </p>
                    </div>

                    {/* ACTIONS */}

                    <div className="flex items-center gap-2">
                        {/* DETAIL */}

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
                            style={{
                                position: 'relative',
                                zIndex: 20,
                            }}
                            className={`relative z-20 h-11 rounded-2xl px-4 text-sm font-medium transition-colors duration-200 ${
                                theme === 'dark'
                                    ? `border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]`
                                    : `border border-orange-100 bg-orange-50 text-zinc-700 hover:bg-orange-100`
                            } `}
                        >
                            Detail
                        </button>

                        {/* ADD TO CART */}

                        <button
                            onClick={() =>
                                onAddToCart?.(product, selectedVariant)
                            }
                            className="relative flex h-11 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-4 text-sm font-medium text-white transition-all duration-300 hover:bg-orange-600 active:scale-[0.98]"
                        >
                            <ShoppingBag size={16} />

                            <span className="hidden sm:block">
                                {__('Tambah')}
                            </span>

                            {cartQty > 0 && (
                                <div className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-orange-500 shadow-md">
                                    {cartQty}
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
