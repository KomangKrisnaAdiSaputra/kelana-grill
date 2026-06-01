import { router, useForm } from '@inertiajs/react';
import {
    Plus,
    MoreHorizontal,
    Pencil,
    Trash2,
    Search,
    Package,
    CheckCircle2,
    Star,
    Sparkles,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { InputNumber } from '@/components/input-number';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import {
    DataTable,
    DataTableContent,
    DataTableEmpty,
} from '@/components/ui/data-table';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatPrice } from '@/helpers/global';
import { save } from '@/routes/product/manage-product';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface ProductTranslation {
    name: string;
    description: string;
    featuredLabel: string;
}

interface Product {
    id: string | null;

    type_id: string;

    type?: {
        id: string;
        name: string;
    };

    rate: number | null;

    image: string | File | null;

    featured: boolean;
    new: boolean;
    active: boolean;

    translations: {
        id: ProductTranslation;
        en: ProductTranslation;
    };

    error?: string | null;
}

interface ProductType {
    id: string;
    name: string;
}

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    products: PaginatedProducts;

    types: ProductType[];

    filters: {
        search?: string;
        status?: string;
        type_id?: string;
    };

    stats: {
        total: number;
        active: number;
        featured: number;
        newest: number;
    };
}

export default function Index({ products, types, filters, stats }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');

    const [status, setStatus] = useState(filters?.status ?? '');

    const [typeId, setTypeId] = useState(filters?.type_id ?? '');

    const [openForm, setOpenForm] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );

    const [language, setLanguage] = useState<'id' | 'en'>('id');

    const isEdit = selectedProduct !== null;

    const { data, setData, post, processing, reset, errors, clearErrors } =
        useForm<Product>({
            id: null,

            type_id: '',

            rate: null,

            image: null,

            featured: false,

            new: true,

            active: true,

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
        });

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                '',
                {
                    search,
                    status,
                    type_id: typeId,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, status, typeId]);

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

        router.delete(`/master/product/${selectedProduct.id}`, {
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

                            type_id: '',

                            rate: null,

                            image: null,

                            featured: false,

                            new: true,

                            active: true,

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
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Products
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {stats.total}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-primary/10 p-3">
                            <Package className="h-5 w-5 text-primary" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Active
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-emerald-600">
                                {stats.active}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-emerald-500/10 p-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Featured
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-amber-600">
                                {stats.featured}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-amber-500/10 p-3">
                            <Star className="h-5 w-5 text-amber-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                New Product
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-sky-600">
                                {stats.newest}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-sky-500/10 p-3">
                            <Sparkles className="h-5 w-5 text-sky-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Table */}
            <DataTable>
                <div className="border-b p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="font-semibold">Products</h2>

                            <p className="text-sm text-muted-foreground">
                                {products.total} records found
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 md:flex-row">
                            <div className="relative w-full md:w-[320px]">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search product..."
                                    className="pl-9"
                                />
                            </div>

                            <select
                                value={typeId}
                                onChange={(e) => setTypeId(e.target.value)}
                                className="h-10 rounded-xl border bg-background px-3 text-sm"
                            >
                                <option value="">All Types</option>

                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="h-10 rounded-xl border bg-background px-3 text-sm"
                            >
                                <option value="">All Status</option>

                                <option value="1">Active</option>

                                <option value="0">Inactive</option>
                            </select>

                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearch('');
                                    setStatus('');
                                    setTypeId('');
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>

                <DataTableContent>
                    {products.data.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>

                                    <TableHead>Type</TableHead>

                                    <TableHead>Rate</TableHead>

                                    <TableHead>Featured</TableHead>

                                    <TableHead>New</TableHead>

                                    <TableHead>Status</TableHead>

                                    <TableHead className="w-[80px] text-right">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {products.data.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 overflow-hidden rounded-lg border">
                                                    {product.image ? (
                                                        <img
                                                            src={
                                                                product.image as string
                                                            }
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center bg-muted">
                                                            <Package className="h-4 w-4" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="font-medium">
                                                        {
                                                            product.translations
                                                                .id.name
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            {product.type?.name}
                                        </TableCell>

                                        <TableCell>
                                            {product.rate !== null
                                                ? formatPrice(
                                                      product.rate,
                                                  ).toLocaleString()
                                                : '-'}
                                        </TableCell>

                                        <TableCell>
                                            {product.featured ? 'Yes' : 'No'}
                                        </TableCell>

                                        <TableCell>
                                            {product.new ? 'Yes' : 'No'}
                                        </TableCell>

                                        <TableCell>
                                            {product.active ? (
                                                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                                                    Inactive
                                                </span>
                                            )}
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setSelectedProduct(
                                                                product,
                                                            );
                                                            clearErrors();

                                                            setData(product);

                                                            setOpenForm(true);
                                                        }}
                                                    >
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        className="text-red-600"
                                                        onClick={() => {
                                                            setSelectedProduct(
                                                                product,
                                                            );

                                                            setOpenDelete(true);
                                                        }}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <DataTableEmpty />
                    )}
                </DataTableContent>
                <div className="flex flex-col gap-3 border-t p-4 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing page {products.current_page} of{' '}
                        {products.last_page}
                    </p>

                    <div className="flex flex-wrap gap-1">
                        {products.links.map((link, index) => {
                            const label = link.label
                                .replace('&laquo;', '')
                                .replace('&raquo;', '')
                                .replace('Previous', 'Prev')
                                .replace('pagination.previous', 'Prev')
                                .replace('pagination.next', 'Next')
                                .trim();

                            return (
                                <Button
                                    key={index}
                                    size="sm"
                                    variant={
                                        link.active ? 'default' : 'outline'
                                    }
                                    disabled={!link.url}
                                    onClick={() => {
                                        if (!link.url) {
                                            return;
                                        }

                                        router.visit(link.url, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: label,
                                        }}
                                    />
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </DataTable>

            {/* FORM DIALOG */}
            <Dialog open={openForm} onOpenChange={setOpenForm}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? 'Edit Product' : 'Add Product'}
                        </DialogTitle>
                    </DialogHeader>

                    {errors.error && (
                        <div className="rounded-md border border-red-200 bg-red-50 p-3">
                            <p className="text-sm text-red-600">
                                {errors.error}
                            </p>
                        </div>
                    )}

                    {/* FLAGS */}
                    <div className="grid gap-3 md:grid-cols-3">
                        <div className="flex items-center justify-between rounded-xl border p-4">
                            <div>
                                <p className="font-medium">Active</p>

                                <p className="text-xs text-muted-foreground">
                                    Product visible
                                </p>
                            </div>

                            <Switch
                                checked={data.active}
                                onCheckedChange={(value) =>
                                    setData('active', value)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-xl border p-4">
                            <div>
                                <p className="font-medium">Featured</p>

                                <p className="text-xs text-muted-foreground">
                                    Highlight product
                                </p>
                            </div>

                            <Switch
                                checked={data.featured}
                                onCheckedChange={(value) =>
                                    setData('featured', value)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-xl border p-4">
                            <div>
                                <p className="font-medium">New Product</p>

                                <p className="text-xs text-muted-foreground">
                                    Show new badge
                                </p>
                            </div>

                            <Switch
                                checked={data.new}
                                onCheckedChange={(value) =>
                                    setData('new', value)
                                }
                            />
                        </div>
                    </div>

                    {/* BASIC INFO */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Type</Label>

                            <Select
                                value={data.type_id}
                                onValueChange={(value) =>
                                    setData('type_id', value)
                                }
                            >
                                <SelectTrigger className="h-10 w-full rounded-xl">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>

                                <SelectContent className="bg-background text-foreground">
                                    {types.map((type) => (
                                        <SelectItem
                                            key={type.id}
                                            value={type.id}
                                        >
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.type_id && (
                                <p className="text-sm text-destructive">
                                    {errors.type_id}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Rate</Label>

                            <InputNumber
                                currency
                                prefix="IDR"
                                value={data.rate}
                                onChange={(value) => setData('rate', value)}
                                error={errors.rate}
                            />
                        </div>
                    </div>

                    {/* IMAGE */}
                    <div className="space-y-2">
                        <Label>Image</Label>

                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (!file) {
                                    return;
                                }

                                setData('image', file);
                            }}
                        />

                        {typeof data.image === 'string' && data.image && (
                            <img
                                src={data.image}
                                className="mt-2 h-32 rounded-xl border object-cover"
                            />
                        )}
                    </div>

                    {/* LANGUAGE TAB */}
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant={language === 'id' ? 'default' : 'outline'}
                            onClick={() => setLanguage('id')}
                            className="relative"
                        >
                            Indonesia
                            {countLanguageErrors('id') > 0 && (
                                <span className="absolute -top-2 -right-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground text-white">
                                    {countLanguageErrors('id')}
                                </span>
                            )}
                        </Button>

                        <Button
                            type="button"
                            variant={language === 'en' ? 'default' : 'outline'}
                            onClick={() => setLanguage('en')}
                            className="relative"
                        >
                            English
                            {countLanguageErrors('en') > 0 && (
                                <span className="absolute -top-2 -right-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground text-white">
                                    {countLanguageErrors('en')}
                                </span>
                            )}
                        </Button>
                    </div>

                    <div className="space-y-4 rounded-xl border p-4">
                        <div className="space-y-2">
                            <Label>Name</Label>

                            <Input
                                value={data.translations[language].name}
                                onChange={(e) =>
                                    setData('translations', {
                                        ...data.translations,
                                        [language]: {
                                            ...data.translations[language],
                                            name: e.target.value,
                                        },
                                    })
                                }
                            />

                            {errors[`translations.${language}.name`] && (
                                <p className="text-sm text-destructive">
                                    {errors[`translations.${language}.name`]}
                                </p>
                            )}
                        </div>

                        {data.featured && (
                            <div className="space-y-2">
                                <Label>Featured Label</Label>

                                <Input
                                    value={
                                        data.translations[language]
                                            .featuredLabel
                                    }
                                    onChange={(e) =>
                                        setData('translations', {
                                            ...data.translations,
                                            [language]: {
                                                ...data.translations[language],
                                                featuredLabel: e.target.value,
                                            },
                                        })
                                    }
                                />

                                {errors[
                                    `translations.${language}.featuredLabel`
                                ] && (
                                    <p className="text-sm text-destructive">
                                        {
                                            errors[
                                                `translations.${language}.featuredLabel`
                                            ]
                                        }
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label>Description</Label>

                            <textarea
                                rows={5}
                                value={data.translations[language].description}
                                onChange={(e) =>
                                    setData('translations', {
                                        ...data.translations,
                                        [language]: {
                                            ...data.translations[language],
                                            description: e.target.value,
                                        },
                                    })
                                }
                                className="w-full rounded-xl border px-3 py-2"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpenForm(false)}
                        >
                            Cancel
                        </Button>

                        <Button onClick={handleSubmit} disabled={processing}>
                            {processing
                                ? 'Saving...'
                                : isEdit
                                  ? 'Update Product'
                                  : 'Create Product'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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
