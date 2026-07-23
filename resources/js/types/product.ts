export type ProductType = 'PACKAGE' | 'ALACARTE' | string;

export type PromoType = 'fixed' | 'percent' | string;

export type ProductPromo = {
    id: string | number;
    type: PromoType;
    value: number;
    label: string | null;
    description: string | null;
};

export type ProductCategory = {
    id: string;
    name: string;
};

export type ProductBadge = {
    id: string;
    name: string;
};

export type ProductVariant = {
    id?: string | number;

    name: string | null;
    description: string | null;

    rate?: number;

    minPerson?: number | null;
    maxPerson?: number | null;
    marinade: boolean;

    slug?: string | null;

    price?: number;
    originalPrice?: number | null;
};

export type ProductItem = {
    id: string;
    name: string;
    description?: string | null;
    qty: string | number | null;
    qtyItem: string | number | null;
    unit?: {
        code: string | null;
    };
    marinade: boolean;
    type: string;
    choices?: ProductItem[];
};

export type Product = {
    id?: string | number;
    code?: string;

    type?: ProductType;

    name: string | null;
    slug?: string | null;

    description: string | null;

    featuredLabel?: string | null;

    image?: string | null;
    images?: string[];

    rate?: number;

    qty?: number | null;
    unit?: {
        id: string | null;
        name: string | null;
        code: string | null;
    } | null;

    price?: number;
    originalPrice?: number | null;

    hasPromo?: boolean;
    promo?: ProductPromo | null;

    featured?: boolean;

    new?: boolean;
    marinade?: boolean;

    categories?: ProductCategory[];
    badges?: ProductBadge[];

    variants?: ProductVariant[];

    items?: ProductItem[];
};
