export type ProductType = 'package' | 'alacarte' | string;

export type PromoType = 'fixed' | 'percent' | string;

export type ProductPromo = {
    id: number;
    type: PromoType;
    value: number;
    label: string | null;
    description: string | null;
};

export type ProductCategory = {
    id: number | null;
    key: string | null;
    label: string | null;
};

export type ProductBadge = {
    id: number | null;
    key: string | null;
    label: string | null;
};

export type ProductVariant = {
    id: number;
    key: string;
    label: string | null;
    price: number;
    originalPrice: number | null;
    isDefault: boolean;
};

export type ProductDetailItem = {
    id: number;
    name: string;
    qty: string | null;
};

export type ProductDetail = {
    id: number;
    key: string;
    group: string | null;
    items: ProductDetailItem[];
};

export type Product = {
    id: number;
    type: ProductType;
    image: string;

    name: string | null;
    desc: string | null;
    featuredLabel: string | null;

    price: number;
    originalPrice: number | null;

    hasPromo: boolean;
    promo: ProductPromo | null;

    isFeatured: boolean;
    isLanding: boolean;
    isNew: boolean;

    categories: ProductCategory[];
    badges: ProductBadge[];
    variants: ProductVariant[];
    details: ProductDetail[];
};
