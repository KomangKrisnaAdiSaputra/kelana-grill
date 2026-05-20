import { usePage } from '@inertiajs/react';
import type {
    LocaleCode,
    LocalizedProductItem,
    ProductItem,
} from '@/types/product';
type ReplaceValues = Record<string, string | number>;

type PageProps = {
    language?: Record<string, string>;
};

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

export function useTranslation() {
    const { language = {} } = usePage<PageProps>().props;

    const __ = (key: string, replace: ReplaceValues = {}): string => {
        let translation = language[key] ?? key;

        Object.entries(replace).forEach(([replaceKey, value]) => {
            translation = translation.replaceAll(
                `:${replaceKey}`,
                String(value),
            );
        });

        return translation;
    };

    return { __ };
}
