import type {
    LocaleCode,
    LocalizedProductItem,
    ProductItem,
} from '@/types/product';

export function localizeProduct(
    product: ProductItem,
    locale: LocaleCode,
): LocalizedProductItem {
    const translation = product.translations[locale];

    return {
        id: product.id,
        type: product.type,
        image: product.image,
        name: translation.name,
        desc: translation.desc,
        featuredLabel: translation.featuredLabel,
        isFeatured: product.isFeatured,
        isNew: product.isNew,
        categories: product.categories.map((category) => ({
            key: category.key,
            label: category.translations[locale].label,
        })),
        badges: (product.badges ?? []).map((badge) => ({
            key: badge.key,
            label: badge.translations[locale].label,
        })),
        variants: product.variants.map((variant) => ({
            key: variant.key,
            label: variant.translations[locale].label,
            price: variant.price,
            originalPrice: variant.originalPrice,
            isDefault: variant.isDefault,
        })),
        details: product.details.map((detail) => ({
            group: detail.translations[locale].group,
            items: detail.translations[locale].items,
        })),
    };
}

export function localizeProducts(
    products: ProductItem[],
    locale: LocaleCode,
): LocalizedProductItem[] {
    return products.map((product) => localizeProduct(product, locale));
}

export function formatPrice(price?: number, prefix = 'IDR') {
    if (!price) {
        return '-';
    }

    const formattedPrice = new Intl.NumberFormat('id-ID', {
        maximumFractionDigits: 0,
    }).format(price);

    return `${prefix} ${formattedPrice}`;
}
