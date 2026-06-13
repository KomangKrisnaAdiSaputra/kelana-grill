export type Product = {
    id: string | null;

    typeId: string;

    type?: {
        id: string;
        name: string;
    };

    rate: number | null;

    image: string | File | null;

    featured: boolean;
    new: boolean;
    active: boolean;
    marinade: boolean;

    translations: {
        id: ProductTranslation;
        en: ProductTranslation;
    };

    error?: string | null;

    categories: string[];
    badges: string[];

    variants: ProductVariant[];
    items: ProductItem[];
};

export type ProductTranslation = {
    name: string;
    description: string;
    featuredLabel: string;
};

export type ProductVariant = {
    id: string | null;

    rate: number | null;

    minPerson: number | null;
    maxPerson: number | null;

    active: boolean;
    marinade: boolean;

    translations: {
        id: ProductVariantTranslation;
        en: ProductVariantTranslation;
    };
};

export type ProductVariantTranslation = {
    name: string;
    description: string;
};

export type ProductItem = {
    itemProductId: string;
    qty: number;
    unit: string | null;
};

export type PaginatedProducts = {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type ProductType = {
    id: string;
    name: string;
};

export type ProductCategory = {
    label: string;
    value: string;
};

export type ProductBadge = {
    label: string;
    value: string;
};

export type AlaCarteProduct = {
    id: string;
    name: string;
};
