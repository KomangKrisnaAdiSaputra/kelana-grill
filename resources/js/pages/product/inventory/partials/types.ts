export interface Warehouse {
    id: string;
    name: string;
}

export interface Unit {
    id: string;
    name: string;
    code?: string;
}

export interface ProductTranslation {
    name: string;
}

export interface ProductTranslations {
    id: ProductTranslation;
    en?: ProductTranslation;
}

export interface Product {
    id: string;
    translations: ProductTranslations;
}

export interface Inventory {
    id: string | null;

    warehouseId: string;
    productId: string;
    unitId: string;

    stock: number;
    note: string;

    warehouse?: Warehouse;
    product?: Product;
    unit?: Unit;

    created_at?: string;
    updated_at?: string;
}

export interface PaginatedInventories {
    data: Inventory[];

    current_page: number;
    last_page: number;
    per_page: number;
    total: number;

    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}
