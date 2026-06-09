import { useEffect, useRef, useState, useCallback } from 'react';

import { formatPrice } from '@/helpers/global';

import type { ThemeMode } from '@/types';

import type { Product, ProductVariant } from '@/types/product';

type ProductDetailModalText = {
    modalTitle: string;
    categoriesLabel: string;
    badgesLabel: string;
    variantsLabel: string;
    selectedVariantLabel: string;
    closeLabel: string;
    noDataLabel: string;
};

type ProductDetailModalProps = {
    theme: ThemeMode;
    product: Product;
    selectedVariant: ProductVariant;
    text: ProductDetailModalText;
    buttonEl: HTMLButtonElement | null;
    onClose: () => void;
};

export default function ProductDetailModal({
    theme,
    product,
    selectedVariant,
    text,
    buttonEl,
    onClose,
}: ProductDetailModalProps) {
    const isDark = theme === 'dark';
    const modalRef = useRef<HTMLDivElement>(null);
    const productImage = product?.image ?? 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop';


    const [showContent, setShowContent] = useState(false);
    console.log(product);

    const getButtonRect = useCallback(() => {
        if (!buttonEl) {
            return {
                top: window.innerHeight / 2,
                left: window.innerWidth / 2,
                width: 0,
                height: 0,
            };
        }

        const rect = buttonEl.getBoundingClientRect();

        return rect;
    }, [buttonEl]);

    useEffect(() => {
        const modal = modalRef.current;

        if (!modal) {
            return;
        }

        const rect = getButtonRect();

        // RESET
        modal.style.transition = 'none';

        modal.style.top = `${rect.top}px`;
        modal.style.left = `${rect.left}px`;

        modal.style.width = `${rect.width}px`;
        modal.style.height = `${rect.height}px`;

        modal.style.borderRadius = `18px`;

        modal.style.opacity = `1`;

        void modal.offsetHeight;

        modal.style.transition = `
    top .45s cubic-bezier(.2,.8,.2,1),
    left .45s cubic-bezier(.2,.8,.2,1),
    width .45s cubic-bezier(.2,.8,.2,1),
    height .45s cubic-bezier(.2,.8,.2,1),
    border-radius .45s cubic-bezier(.2,.8,.2,1)
  `;

        requestAnimationFrame(() => {
            const modalWidth = Math.min(window.innerWidth - 32, 1100);

            const modalHeight = window.innerHeight - 40;

            modal.style.top = `20px`;

            modal.style.left = `${window.innerWidth / 2 - modalWidth / 2}px`;

            modal.style.width = `${modalWidth}px`;

            modal.style.height = `${modalHeight}px`;

            modal.style.borderRadius = `34px`;

            setTimeout(() => {
                setShowContent(true);
            }, 180);
        });
    }, [getButtonRect]);

    function handleClose() {
        const modal = modalRef.current;

        if (!modal) {
            onClose();

            return;
        }

        setShowContent(false);

        const rect = getButtonRect();

        modal.style.top = `${rect.top}px`;
        modal.style.left = `${rect.left}px`;

        modal.style.width = `${rect.width}px`;
        modal.style.height = `${rect.height}px`;

        modal.style.borderRadius = `18px`;

        setTimeout(() => {
            onClose();
        }, 450);
    }

    return (
        <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            onClick={handleClose}
        >
            <div
                ref={modalRef}
                onClick={(event) => event.stopPropagation()}
                className={`fixed z-[60] flex flex-col overflow-hidden border shadow-2xl will-change-[top,left,width,height] ${isDark
                    ? 'border-white/10 bg-zinc-950 text-white'
                    : 'border-orange-100 bg-white text-zinc-950'
                    } `}
            >
                <div
                    className={`flex h-full flex-col transition-all duration-300 ${showContent
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0'
                        } `}
                >
                    {/* IMAGE */}

                    <div className="relative h-[34dvh] min-h-[260px] overflow-hidden md:h-80">
                        <img
                            src={productImage}
                            alt={product.name ?? 'Product Image'}
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

                        {/* CLOSE */}

                        <button
                            type="button"
                            onClick={handleClose}
                            aria-label={text.closeLabel}
                            className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-2xl font-semibold text-white ring-1 ring-white/15 backdrop-blur-xl transition hover:bg-black/65"
                        >
                            ×
                        </button>

                        {/* HEADER */}

                        <div className="absolute right-0 bottom-0 left-0 p-5 md:p-7">
                            <div className="mb-3 flex flex-wrap gap-2">
                                {product.categories?.map((category) => (
                                    <span
                                        key={category}
                                        className="rounded-full bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white"
                                    >
                                        {category}
                                    </span>
                                ))}

                                {product.new && (
                                    <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white">
                                        New
                                    </span>
                                )}

                                {product.featured && (
                                    <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xl">
                                        Featured
                                    </span>
                                )}

                                {product.badges?.map((badge) => (
                                    <span
                                        key={badge}
                                        className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xl"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            <p className="text-xs font-semibold tracking-[0.25em] text-orange-300 uppercase">
                                {text.modalTitle}
                            </p>

                            <h3 className="mt-2 text-2xl leading-tight font-bold text-white md:text-4xl">
                                {product.name}
                            </h3>

                            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/80 md:text-base">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* CONTENT */}

                    <div className="min-h-0 flex-1 overflow-y-auto">
                        <div className="space-y-5 p-5 md:p-7">
                            {/* VARIANT */}

                            {product.variants.length > 0 && (
                                <div
                                    className={`rounded-[28px] border p-5 ${isDark
                                        ? 'theme-card-dark'
                                        : 'theme-card-light'
                                        } `}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p
                                                className={`text-xs font-semibold tracking-[0.2em] uppercase ${isDark
                                                    ? 'text-zinc-400'
                                                    : 'text-zinc-500'
                                                    }`}
                                            >
                                                {text.variantsLabel}
                                            </p>

                                            <h4 className="mt-2 text-lg font-semibold">
                                                {/* {selectedVariant.name} */}
                                            </h4>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-orange-400">
                                                {formatPrice(selectedVariant.rate)}
                                            </p>

                                            {(selectedVariant.minPerson ||
                                                selectedVariant.maxPerson) && (
                                                    <p
                                                        className={`mt-1 text-xs ${isDark
                                                            ? 'text-zinc-500'
                                                            : 'text-zinc-500'
                                                            }`}
                                                    >
                                                        {selectedVariant.minPerson}-
                                                        {selectedVariant.maxPerson}{' '}
                                                        orang
                                                    </p>
                                                )}
                                        </div>
                                    </div>

                                    {/* OTHER VARIANTS */}

                                    {product.variants.length > 1 && (
                                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                            {product.variants.map((variant) => {
                                                const isSelected =
                                                    selectedVariant.id ===
                                                    variant.id;

                                                return (
                                                    <div
                                                        key={variant.id}
                                                        className={`rounded-2xl border p-4 transition ${isSelected
                                                            ? 'border-orange-400 bg-orange-500/10'
                                                            : isDark
                                                                ? 'border-white/10 bg-black/20'
                                                                : 'border-orange-100 bg-white'
                                                            } `}
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div>
                                                                <p className="text-sm font-semibold">
                                                                    {variant.name}
                                                                </p>

                                                                {variant.description && (
                                                                    <p
                                                                        className={`mt-1 text-xs ${isDark
                                                                            ? 'text-zinc-400'
                                                                            : 'text-zinc-500'
                                                                            }`}
                                                                    >
                                                                        {
                                                                            variant.description
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>

                                                            {isSelected && (
                                                                <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-semibold text-white">
                                                                    Aktif
                                                                </span>
                                                            )}
                                                        </div>

                                                        <p className="mt-3 text-xl font-bold text-orange-400">
                                                            {formatPrice(
                                                                variant.rate,
                                                            )}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ITEMS */}

                            {product?.items.length > 0 ? (
                                <div
                                    className={`rounded-[28px] border p-5 ${isDark
                                        ? 'border-white/10 bg-white/[0.04]'
                                        : 'border-zinc-100 bg-white'
                                        } `}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <h4 className="text-lg font-semibold">
                                            Isi Paket
                                        </h4>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${isDark
                                                ? 'bg-white/10 text-zinc-300'
                                                : 'bg-zinc-100 text-zinc-500'
                                                } `}
                                        >
                                            {product.items.length} item
                                        </span>
                                    </div>

                                    <div className="mt-4 grid gap-2">
                                        {product.items.map((item) => (
                                            <div
                                                key={item.name}
                                                className={`flex items-start justify-between gap-4 rounded-2xl px-4 py-3 text-sm ${isDark
                                                    ? 'bg-black/20 text-zinc-300'
                                                    : 'bg-zinc-50 text-zinc-700'
                                                    } `}
                                            >
                                                <div className="min-w-0">
                                                    <p className="font-semibold">
                                                        {item.name}
                                                    </p>

                                                    {item.description && (
                                                        <p
                                                            className={`mt-1 text-xs ${isDark
                                                                ? 'text-zinc-400'
                                                                : 'text-zinc-500'
                                                                }`}
                                                        >
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>

                                                <span
                                                    className={`shrink-0 font-semibold ${isDark
                                                        ? 'text-zinc-400'
                                                        : 'text-zinc-500'
                                                        }`}
                                                >
                                                    {item.qty} {item.unit}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`rounded-[28px] border p-5 text-sm ${isDark
                                        ? 'border-white/10 bg-white/[0.04] text-zinc-400'
                                        : 'border-zinc-100 bg-zinc-50 text-zinc-500'
                                        } `}
                                >
                                    {text.noDataLabel}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* FOOTER */}

                    <div
                        className={`border-t p-4 md:p-5 ${isDark
                            ? 'border-white/10 bg-zinc-950/95'
                            : 'border-zinc-100 bg-white/95'
                            } `}
                    >
                        <button
                            type="button"
                            onClick={handleClose}
                            className={`w-full rounded-2xl px-5 py-3 text-sm font-semibold transition ${isDark
                                ? 'bg-white text-zinc-950 hover:bg-orange-100'
                                : 'bg-zinc-950 text-white hover:bg-orange-500'
                                } `}
                        >
                            {text.closeLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
