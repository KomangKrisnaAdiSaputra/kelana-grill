import { formatPrice, useTranslation } from '@/helpers/global';
import type { ThemeMode } from '@/types';
import type { Product } from '@/types/product';

type Props = {
    theme: ThemeMode;
    featuredProduct?: Product | null;
};

export default function HeroSection({ theme, featuredProduct }: Props) {
    const { __ } = useTranslation();

    return (
        <section className="relative flex min-h-[92vh] items-center pt-20 md:pt-24">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-1 md:px-6 md:py-24 lg:gap-16 xl:grid-cols-2 xl:items-center">
                <div>
                    <div
                        className={`mb-6 inline-flex items-center rounded-full border px-4 py-2 text-xs backdrop-blur-xl md:text-sm ${
                            theme === 'dark'
                                ? 'border-orange-400/20 bg-orange-500/10 text-orange-200'
                                : 'border-orange-200 bg-white/70 text-orange-600'
                        } `}
                    >
                        {__('Pengalaman BBQ Premium')}
                    </div>

                    <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        {__('Sewa Grill')}
                        <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                            {' '}
                            {__('Premium')}
                        </span>
                        <br />
                        {__('untuk BBQ Party Modern')}
                    </h1>

                    <div className="mt-6 block lg:hidden">
                        <HeroImage
                            theme={theme}
                            featuredProduct={featuredProduct}
                        />
                    </div>

                    <p
                        className={`mt-6 max-w-xl text-base leading-7 md:mt-8 md:text-lg md:leading-8 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} `}
                    >
                        {__(
                            'Rental grill modern untuk party, gathering, camping, dan event dengan setup premium.',
                        )}
                    </p>

                    <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row md:mt-10 md:gap-4">
                        <a
                            href="#booking"
                            className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-4 text-center font-medium text-white shadow-xl shadow-orange-500/20 transition hover:scale-[1.03] hover:shadow-orange-500/40"
                        >
                            {__('Sewa Sekarang')}
                        </a>

                        <a
                            href="#products"
                            className={`rounded-full border px-7 py-4 text-center font-medium backdrop-blur-xl transition ${
                                theme === 'dark'
                                    ? 'border-white/10 bg-white/5 hover:bg-white/10'
                                    : 'border-orange-200 bg-white/70 hover:bg-orange-50'
                            } `}
                        >
                            {__('Lihat Paket')}
                        </a>
                    </div>
                </div>

                <div className="relative hidden lg:block">
                    <HeroImage
                        theme={theme}
                        featuredProduct={featuredProduct}
                    />
                </div>
            </div>
        </section>
    );
}

function HeroImage({ theme, featuredProduct }: Props) {
    const { __ } = useTranslation();

    const product = featuredProduct ?? null;

    const defaultVariant =
        product?.variants?.find((variant) => variant.isDefault) ??
        product?.variants?.[0] ??
        null;

    const productBadges = product?.badges ?? [];

    const productImage =
        product?.image ??
        'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop';

    const productLabel =
        product?.featuredLabel ??
        product?.promo?.label ??
        product?.badges?.[0]?.label ??
        product?.badges?.[0]?.name ??
        __('Paket Paling Populer');

    const productName = product?.name ?? __('Family BBQ Set');

    const productDescription = product?.description ?? product?.desc ?? null;

    const productPriceValue =
        defaultVariant?.rate ??
        defaultVariant?.price ??
        product?.rate ??
        product?.price ??
        0;

    const productOriginalPriceValue = product?.originalPrice ?? null;

    const hasPromoPrice =
        product?.hasPromo ??
        (typeof productOriginalPriceValue === 'number' &&
            productOriginalPriceValue > productPriceValue);

    const productPrice = formatPrice(productPriceValue);

    const productOriginalPrice =
        typeof productOriginalPriceValue === 'number'
            ? formatPrice(productOriginalPriceValue)
            : null;

    const defaultVariantLabel =
        defaultVariant?.label ?? defaultVariant?.name ?? null;

    return (
        <div className="relative">
            <div className="absolute top-10 -left-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />

            <div
                className={`relative overflow-hidden rounded-[32px] border shadow-2xl backdrop-blur-2xl md:rounded-[40px] ${
                    theme === 'dark'
                        ? 'border-white/10 bg-white/5'
                        : 'border-orange-100 bg-white/60 shadow-orange-200/40'
                } `}
            >
                <img
                    src={productImage}
                    alt={productName}
                    className="h-[320px] w-full object-cover sm:h-[450px] md:h-[550px] lg:h-[650px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl md:top-6 md:left-6 md:px-5 md:py-4">
                    <div className="flex gap-1 text-yellow-400">★★★★★</div>

                    <p className="mt-2 text-xs text-white md:text-sm">
                        “{__('Setup cepat & grill bersih.')}”
                    </p>
                </div>

                {productBadges.length > 0 && (
                    <div className="absolute top-4 right-4 flex flex-wrap justify-end gap-2 md:top-6 md:right-6">
                        {productBadges.map((badge) => {
                            const badgeText =
                                badge.label ??
                                badge.name ??
                                badge.key ??
                                badge.slug;

                            if (!badgeText) {
                                return null;
                            }

                            return (
                                <span
                                    key={
                                        badge.id ??
                                        badge.key ??
                                        badge.slug ??
                                        badgeText
                                    }
                                    className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-orange-500/30 md:text-sm"
                                >
                                    {badgeText}
                                </span>
                            );
                        })}
                    </div>
                )}

                <div className="absolute right-0 bottom-0 left-0 p-4 md:p-8">
                    <div className="rounded-3xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl md:p-6">
                        <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-xs text-zinc-300 md:text-sm">
                                    {productLabel}
                                </p>

                                <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-white md:text-2xl">
                                    {productName}
                                </h3>
                            </div>

                            <div className="shrink-0 rounded-2xl bg-white/10 px-4 py-3 text-right text-white ring-1 ring-white/15 backdrop-blur-xl md:px-5 md:py-4">
                                {hasPromoPrice && productOriginalPrice && (
                                    <p className="mb-1 text-[11px] font-medium text-white/55 line-through md:text-xs">
                                        {productOriginalPrice}
                                    </p>
                                )}

                                <p className="bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-200 bg-clip-text text-base font-bold text-transparent md:text-xl">
                                    {productPrice}
                                </p>
                            </div>
                        </div>

                        {defaultVariantLabel && (
                            <p className="mt-3 text-xs text-zinc-300 md:text-sm">
                                {defaultVariantLabel}
                            </p>
                        )}

                        {product?.promo?.description && (
                            <p className="mt-2 line-clamp-1 text-xs text-orange-200 md:text-sm">
                                {product.promo.description}
                            </p>
                        )}

                        {productDescription && (
                            <p className="mt-2 line-clamp-2 text-xs text-zinc-400 md:text-sm">
                                {productDescription}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
