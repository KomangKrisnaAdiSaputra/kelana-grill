import { router, useForm } from '@inertiajs/react';
import {
    Plus,
    MoreHorizontal,
    Pencil,
    Trash2,
    Search,
    FolderTree,
    CheckCircle2,
    XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';

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
import { Switch } from '@/components/ui/switch';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { deleteMethod, save } from '@/routes/master/category';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface CategoryTranslation {
    name: string;
    slug?: string;
}

interface Category {
    id: string | null;

    active: boolean;

    translations: {
        id: CategoryTranslation;
        en: CategoryTranslation;
    };

    error?: string | null;
}

interface PaginatedCategories {
    data: Category[];

    current_page: number;

    last_page: number;

    per_page: number;

    total: number;

    links: PaginationLink[];
}

interface Props {
    categories: PaginatedCategories;

    filters: {
        search?: string;
        status?: string;
    };

    stats: {
        total: number;
        active: number;
        inactive: number;
    };
}

export default function Index({ categories, filters, stats }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');

    const [status, setStatus] = useState(filters?.status ?? '');

    const [openForm, setOpenForm] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null,
    );

    const [language, setLanguage] = useState<'id' | 'en'>('id');

    const isEdit = selectedCategory !== null;

    const { data, setData, post, processing, reset, errors, clearErrors } =
        useForm<Category>({
            id: null,

            active: true,

            translations: {
                id: {
                    name: '',
                },

                en: {
                    name: '',
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
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, status]);

    const handleSubmit = () => {
        post(save().url, {
            preserveScroll: true,

            onSuccess: () => {
                setOpenForm(false);

                setSelectedCategory(null);

                reset();

                setLanguage('id');
            },
        });
    };

    const handleDelete = () => {
        if (!selectedCategory?.id) {
            return;
        }

        router.delete(deleteMethod(selectedCategory.id), {
            preserveScroll: true,

            onSuccess: () => {
                setOpenDelete(false);

                setSelectedCategory(null);
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
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Categories
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage categories and translations.
                    </p>
                </div>

                <Button
                    size="lg"
                    className="h-11 rounded-xl"
                    onClick={() => {
                        setSelectedCategory(null);

                        reset();

                        clearErrors();

                        setData({
                            id: null,

                            active: true,

                            translations: {
                                id: {
                                    name: '',
                                },

                                en: {
                                    name: '',
                                },
                            },
                        });

                        setLanguage('id');

                        setOpenForm(true);
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Categories
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {stats.total}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-primary/10 p-3">
                            <FolderTree className="h-5 w-5 text-primary" />
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
                                Inactive
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-red-600">
                                {stats.inactive}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-red-500/10 p-3">
                            <XCircle className="h-5 w-5 text-red-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <DataTable>
                <div className="border-b p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="font-semibold">Categories</h2>

                            <p className="text-sm text-muted-foreground">
                                {categories.total} records found
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 md:flex-row">
                            <div className="relative w-full md:w-[320px]">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search category..."
                                    className="pl-9"
                                />
                            </div>

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
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>

                <DataTableContent>
                    {categories.data.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name (ID)</TableHead>

                                    <TableHead>Name (EN)</TableHead>

                                    <TableHead>Slug ID</TableHead>

                                    <TableHead>Slug EN</TableHead>

                                    <TableHead>Status</TableHead>

                                    <TableHead className="w-[80px] text-right">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {categories.data.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-medium">
                                            {category.translations?.id?.name}
                                        </TableCell>

                                        <TableCell>
                                            {category.translations?.en?.name}
                                        </TableCell>

                                        <TableCell>
                                            {category.translations?.id?.slug ??
                                                '-'}
                                        </TableCell>

                                        <TableCell>
                                            {category.translations?.en?.slug ??
                                                '-'}
                                        </TableCell>

                                        <TableCell>
                                            {category.active ? (
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
                                                            setSelectedCategory(
                                                                category,
                                                            );

                                                            clearErrors();

                                                            setData(category);

                                                            setOpenForm(true);
                                                        }}
                                                    >
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        className="text-red-600"
                                                        onClick={() => {
                                                            setSelectedCategory(
                                                                category,
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
                        Showing page {categories.current_page} of{' '}
                        {categories.last_page}
                    </p>

                    <div className="flex flex-wrap gap-1">
                        {categories.links.map((link, index) => {
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

            <Dialog open={openForm} onOpenChange={setOpenForm}>
                <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? 'Edit Category' : 'Add Category'}
                        </DialogTitle>
                    </DialogHeader>

                    {errors.error && (
                        <div className="rounded-md border border-red-200 bg-red-50 p-3">
                            <p className="text-sm text-red-600">
                                {errors.error}
                            </p>
                        </div>
                    )}

                    <div className="rounded-xl border p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Active</p>

                                <p className="text-xs text-muted-foreground">
                                    Category visible
                                </p>
                            </div>

                            <Switch
                                checked={data.active}
                                onCheckedChange={(value) =>
                                    setData('active', value)
                                }
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant={language === 'id' ? 'default' : 'outline'}
                            onClick={() => setLanguage('id')}
                            className="relative"
                        >
                            Indonesia
                            {countLanguageErrors('id') > 0 && (
                                <span className="absolute -top-2 -right-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white">
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
                                <span className="absolute -top-2 -right-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white">
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
                                  ? 'Update Category'
                                  : 'Create Category'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Category</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-muted-foreground">
                        Are you sure you want to delete{' '}
                        <span className="font-semibold">
                            {selectedCategory?.translations.id.name}
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
