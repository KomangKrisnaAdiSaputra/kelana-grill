import { router, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';


import { deleteMethod, save } from '@/routes/product/manage-product';
import ProductModalSave from './partials/product-modal-save';
import ProductStats from './partials/product-stats';
import ProductTable from './partials/product-table';
import type { AlaCarteProduct, PaginatedProducts, Product, ProductBadge, ProductCategory, ProductType } from './partials/types';

interface Props {
    products: PaginatedProducts;

    types: ProductType[];

    categories: ProductCategory[];

    badges: ProductBadge[];
    alaCarteProducts: AlaCarteProduct[];

    filters: {
        search?: string;
        status?: string;
        typeId?: string;
    };

    stats: {
        total: number;
        active: number;
        featured: number;
        newest: number;
    };
}

export default function Index({
    products,
    types,
    filters,
    stats,
    categories,
    badges,
    alaCarteProducts,
}: Props) {
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [language, setLanguage] = useState<'id' | 'en'>('id');

    const isEdit = selectedProduct !== null;

    const { data, setData, post, processing, reset, errors, clearErrors } = useForm<Product>({
        id: null,
        typeId: '',
        rate: null,
        image: null,
        featured: false,
        new: true,
        active: true,
        marinade: false,
        translations: {
            id: {
                name: '',
                description: '',
                featuredLabel: '',
            },
            en: {
                name: '',
                description: '',
                featuredLabel: '',
            },
        },
        categories: [],
        badges: [],
        variants: [],
        items: [],
    });

    const handleSubmit = () => {
        post(save().url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setOpenForm(false);
                setSelectedProduct(null);
                reset();
                setLanguage('id');
            },
        });
    };

    const handleDelete = () => {
        if (!selectedProduct?.id) {
            return;
        }

        router.delete(deleteMethod(selectedProduct.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenDelete(false);
                setSelectedProduct(null);
            },
        });
    };

    const countLanguageErrors = (lang: 'id' | 'en') => {
        return Object.keys(errors).filter((key) =>
            key.startsWith(`translations.${lang}.`),
        ).length;
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        clearErrors();
        setData(product);
        setOpenForm(true);
    };

    const handleDeleteClick = (product: Product) => {
        setSelectedProduct(product);
        setOpenDelete(true);
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Products
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage products and translations.
                    </p>
                </div>

                <Button
                    size="lg"
                    className="h-11 rounded-xl"
                    onClick={() => {
                        setSelectedProduct(null);

                        reset();
                        clearErrors();
                        setData({
                            id: null,
                            typeId: '',
                            rate: null,
                            image: null,
                            featured: false,
                            new: true,
                            active: true,
                            marinade: false,
                            translations: {
                                id: {
                                    name: '',
                                    description: '',
                                    featuredLabel: '',
                                },
                                en: {
                                    name: '',
                                    description: '',
                                    featuredLabel: '',
                                },
                            },
                            categories: [],
                            badges: [],
                            variants: [],
                            items: [],
                        });

                        setLanguage('id');

                        setOpenForm(true);
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            {/* Stats */}
            <ProductStats stats={stats} />

            {/* Table */}
            <ProductTable
                products={products}
                filters={filters}
                types={types}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            {/* FORM DIALOG */}
            <ProductModalSave
                open={openForm}
                onOpenChange={setOpenForm}
                isEdit={isEdit}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                language={language}
                setLanguage={setLanguage}
                types={types}
                categories={categories}
                badges={badges}
                alaCarteProducts={alaCarteProducts}
                countLanguageErrors={countLanguageErrors}
                handleSubmit={handleSubmit}
            />

            {/* DELETE DIALOG */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-muted-foreground">
                        Are you sure you want to delete{' '}
                        <span className="font-semibold">
                            {selectedProduct?.translations.id.name}
                        </span>
                        ?
                    </p>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpenDelete(false)}
                        >
                            Cancel
                        </Button>

                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
