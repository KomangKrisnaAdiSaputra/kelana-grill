export type ProductType = 'package' | 'alacarte' | string;

export type PromoType = 'fixed' | 'percent' | string;

export type ProductPromo = {
    id: string | number;
    type: PromoType;
    value: number;
    label: string | null;
    description: string | null;
};

export type ProductCategory = {
    id: string | number | null;
    key?: string | null;
    slug: string | null;
    label?: string | null;
    name: string | null;
};

export type ProductBadge = {
    id: string | number | null;
    key?: string | null;
    slug: string | null;
    label?: string | null;
    name: string | null;
};

export type ProductVariant = {
    id: string | number;
    key?: string | null;
    slug: string;
    label?: string | null;
    name: string | null;
    description: string | null;
    price?: number;
    rate: number;
    originalPrice?: number | null;
    isDefault?: boolean;
    minPerson: number | null;
    maxPerson: number | null;
};

export type ProductDetailItem = {
    id: string | number;
    name: string;
    slug?: string | null;
    description?: string | null;
    qty: string | number | null;
    unit?: string | null;
};

export type ProductDetail = {
    id: string | number;
    key: string;
    group: string | null;
    items: ProductDetailItem[];
};

export type ProductItem = {
    id: string | number;
    name: string;
    slug: string;
    description: string | null;
    qty: string | number | null;
    unit: string | null;
};

export type Product = {
    id: string | number;
    type?: ProductType;

    name: string | null;
    slug: string;
    description: string | null;
    desc?: string | null;

    featuredLabel: string | null;

    image: string;

    price?: number;
    rate: number;
    originalPrice?: number | null;

    hasPromo?: boolean;
    promo?: ProductPromo | null;

    isFeatured?: boolean;
    featured: boolean;

    isLanding?: boolean;

    isNew?: boolean;
    new: boolean;

    categories: ProductCategory[];
    badges: ProductBadge[];
    variants: ProductVariant[];

    items: ProductItem[];

    details?: ProductDetail[];
};
