import { useCallback, useEffect, useRef, useState } from 'react';

import ProductCard from '@/components/landing/product-card';

import ProductDetailModal from '@/components/landing/product-detail-modal';

import { useCart } from '@/contexts/cart-context';

import { useTranslation } from '@/helpers/global';

import type { ThemeMode } from '@/types';

import type { Product, ProductVariant } from '@/types/product';

type Props = {
    theme: ThemeMode;
    products?: Product[];
};

type SelectedDetail = {
    product: Product;
    variant: ProductVariant;
};

export default function ProductSection({ theme, products = [] }: Props) {
    const { __ } = useTranslation();
    const { addToCart, getItemQty } = useCart();
    const sliderRef = useRef<HTMLDivElement | null>(null);

    const [activeSlide, setActiveSlide] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);
    const [selectedDetail, setSelectedDetail] = useState<SelectedDetail | null>(null);
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
    const [selectedButton, setSelectedButton] = useState<HTMLButtonElement | null>(null);

    const totalSlides = Math.ceil(products.length / itemsPerView);

    const handleScroll = useCallback(() => {
        const slider = sliderRef.current;

        if (!slider || totalSlides <= 1) {
            return setActiveSlide(0);
        }

        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

        if (maxScrollLeft <= 0) {
            return setActiveSlide(0);
        }

        const currentIndex = Math.round((slider.scrollLeft / maxScrollLeft) * (totalSlides - 1));

        setActiveSlide(Math.min(currentIndex, totalSlides - 1));
    }, [totalSlides]);

    const goToSlide = (index: number) => {
        if (!sliderRef.current) {
            return;
        }

        const slides = sliderRef.current.querySelectorAll('[data-product-slide]');
        const targetSlide = slides[index] as HTMLElement;

        targetSlide?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
        });

        setActiveSlide(index);
    };

    useEffect(() => {
        const updateItemsPerView = () => {
            const width = window.innerWidth;

            const nextItemsPerView = width >= 768 && width < 1280 ? 2 : 1;

            setItemsPerView((current) => {
                if (current === nextItemsPerView) {
                    return current;
                }

                return nextItemsPerView;
            });
        };

        updateItemsPerView();

        window.addEventListener('resize', updateItemsPerView);

        return () => {
            window.removeEventListener('resize', updateItemsPerView);
        };
    }, []);

    useEffect(() => {
        const slider = sliderRef.current;

        if (!slider) {
            return;
        }

        slider.scrollTo({
            left: 0,
            behavior: 'auto',
        });
    }, [products.length, itemsPerView]);

    return (
        <section
            id="products"
            className="relative overflow-hidden py-20 md:py-24"
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 md:px-6">
                <div className="text-center">
                    <p className="text-sm tracking-[0.3em] text-orange-500 uppercase">
                        {__('Produk')}
                    </p>

                    <h2
                        className={`mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl ${theme === 'dark' ? 'text-white' : 'text-zinc-950'
                            }`}
                    >
                        {__('Pilih Paket BBQ Kamu.')}
                    </h2>

                    <p
                        className={`mx-auto mt-5 max-w-2xl text-base md:text-lg ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                            }`}
                    >
                        {__(
                            'Pilih paket BBQ atau menu ala carte sesuai kebutuhan acara kamu.',
                        )}
                    </p>
                </div>

                <div
                    ref={sliderRef}
                    onScroll={handleScroll}
                    className="-mx-4 mt-12 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto scroll-smooth px-4 pb-5 [-ms-overflow-style:none] md:-mx-6 md:gap-5 md:px-6 xl:mx-0 xl:grid xl:grid-cols-3 xl:gap-6 xl:overflow-visible xl:px-0 xl:pb-0 [&::-webkit-scrollbar]:hidden"
                >
                    {products.map((product) => {
                        const selectedVariantId = selectedVariants[product?.id ?? ""];

                        const selectedVariant = (product?.variants ?? []).find((variant) => String(variant.id) === selectedVariantId) ?? (product?.variants ?? [])[0];

                        return (
                            <div
                                key={product.id}
                                data-product-slide
                                className="w-[88%] shrink-0 snap-center sm:w-[70%] md:w-[48%] xl:w-auto xl:shrink"
                            >
                                <ProductCard
                                    theme={theme}
                                    product={product}
                                    selectedVariantId={String(
                                        selectedVariant?.id,
                                    )}
                                    cartQty={getItemQty(
                                        `${product.id}-${selectedVariant?.id}`,
                                    )}
                                    onAddToCart={addToCart}
                                    onSelectVariant={(
                                        variant: ProductVariant,
                                    ) =>
                                        setSelectedVariants((current) => ({
                                            ...current,
                                            [product?.id ?? ""]: String(variant.id),
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
                                />
                            </div>
                        );
                    })}
                </div>

                {totalSlides > 1 && (
                    <div className="mt-3 flex items-center justify-center gap-2 xl:hidden">
                        {Array.from({
                            length: totalSlides,
                        }).map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to product page ${index + 1}`}
                                className={`rounded-full transition-all duration-300 ${activeSlide === index
                                    ? 'h-2 w-8 bg-orange-500'
                                    : theme === 'dark'
                                        ? 'h-2 w-2 bg-white/20 hover:bg-white/40'
                                        : 'h-2 w-2 bg-zinc-300 hover:bg-zinc-400'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

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
        </section>
    );
}
