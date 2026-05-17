export type LocaleCode = 'id' | 'en';

export type ProductType = 'package' | 'alacarte' | string;

export type TranslationMap<T> = Record<LocaleCode, T>;

export type ProductTranslation = {
    name: string;
    desc: string;
    featuredLabel?: string;
};

export type ProductCategoryTranslation = {
    label: string;
};

export type ProductBadgeTranslation = {
    label: string;
};

export type ProductVariantTranslation = {
    label: string;
};

export type ProductDetailItem = {
    name: string;
    qty: string;
};

export type ProductDetailTranslation = {
    group: string;
    items: ProductDetailItem[];
};

export type ProductCategory = {
    key: string;
    translations: TranslationMap<ProductCategoryTranslation>;
};

export type ProductBadge = {
    key: string;
    translations: TranslationMap<ProductBadgeTranslation>;
};

export type ProductVariant = {
    key: string;
    price: number;
    originalPrice?: number;
    isDefault?: boolean;
    translations: TranslationMap<ProductVariantTranslation>;
};

export type ProductDetail = {
    translations: TranslationMap<ProductDetailTranslation>;
};

export type ProductItem = {
    id: string;
    type: ProductType;
    image: string;
    isFeatured?: boolean;
    isNew?: boolean;
    translations: TranslationMap<ProductTranslation>;
    categories: ProductCategory[];
    badges?: ProductBadge[];
    variants: ProductVariant[];
    details: ProductDetail[];
};

export type LocalizedProductCategory = {
    key: string;
    label: string;
};

export type LocalizedProductBadge = {
    key: string;
    label: string;
};

export type LocalizedProductVariant = {
    key: string;
    label: string;
    price: number;
    originalPrice?: number;
    isDefault?: boolean;
};

export type LocalizedProductDetail = {
    group: string;
    items: ProductDetailItem[];
};

export type LocalizedProductItem = {
    id: string;
    type: ProductType;
    image: string;
    name: string;
    desc: string;
    featuredLabel?: string;
    isFeatured?: boolean;
    isNew?: boolean;
    categories: LocalizedProductCategory[];
    badges: LocalizedProductBadge[];
    variants: LocalizedProductVariant[];
    details: LocalizedProductDetail[];
};
