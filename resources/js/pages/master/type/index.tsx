import { router, useForm } from '@inertiajs/react';
import {
    Plus,
    MoreHorizontal,
    Pencil,
    Trash2,
    Search,
    FolderKanban,
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
    DialogHeader,
    DialogTitle,
    DialogFooter,
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
import { deleteMethod, save } from '@/routes/master/type';

interface Type {
    id: string | null;
    name: string;
    active: boolean;
    error: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedTypes {
    data: Type[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    types: PaginatedTypes;

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

export default function Index({ types, filters, stats }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');
    const [status, setStatus] = useState(filters?.status ?? '');

    const [openForm, setOpenForm] = useState(false);

    const [selectedType, setSelectedType] = useState<Type | null>(null);
    const { data, setData, post, processing, reset, errors } = useForm<Type>({
        id: null,
        name: '',
        active: true,
        error: null,
    });

    const [openDelete, setOpenDelete] = useState(false);

    const isEdit = selectedType !== null;

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                '', // TODO: WAYFINDER INDEX
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

                reset();

                setData({
                    id: null,
                    name: '',
                    active: true,
                });

                setSelectedType(null);
            },
        });
    };

    const handleDelete = () => {
        if (!selectedType?.id) {
            return;
        }

        router.delete(deleteMethod(selectedType.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                setOpenDelete(false);
                setSelectedType(null);
            },
        });
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Product Types
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage product categories and classifications.
                    </p>
                </div>

                <Button
                    size="lg"
                    className="h-11 rounded-xl"
                    onClick={() => {
                        setSelectedType(null);

                        reset();

                        setData({
                            name: '',
                            active: true,
                        });

                        setOpenForm(true);
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Type
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Types
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {stats.total}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-primary/10 p-3">
                            <FolderKanban className="h-5 w-5 text-primary" />
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

                            <h2 className="mt-2 text-3xl font-bold text-zinc-500">
                                {stats.inactive}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-zinc-500/10 p-3">
                            <XCircle className="h-5 w-5 text-zinc-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Table */}
            <DataTable>
                <div className="border-b p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="font-semibold">Product Types</h2>

                            <p className="text-sm text-muted-foreground">
                                {types.total} records found
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 md:flex-row">
                            <div className="relative w-full md:w-[380px]">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search product type..."
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

                                    router.get(
                                        '',
                                        {},
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                            replace: true,
                                        },
                                    );
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>

                <DataTableContent>
                    {types.data.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-[80px] text-right">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {types.data.map((type) => (
                                    <TableRow
                                        key={type.id}
                                        className="transition-colors hover:bg-muted/40"
                                    >
                                        <TableCell>
                                            <div className="font-medium">
                                                {type.name}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            {type.active ? (
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
                                                            setSelectedType(
                                                                type,
                                                            );

                                                            setData({
                                                                id: type.id,
                                                                name: type.name,
                                                                active: type.active,
                                                            });

                                                            setOpenForm(true);
                                                        }}
                                                    >
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        className="text-red-600"
                                                        onClick={() => {
                                                            setSelectedType(
                                                                type,
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
                        Showing page {types.current_page} of {types.last_page}
                    </p>

                    <div className="flex flex-wrap gap-1">
                        {types.links.map((link, index) => {
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
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? 'Edit Product Type' : 'Add Product Type'}
                        </DialogTitle>

                        {errors.error && (
                            <div className="rounded-md border border-red-200 bg-red-50 p-3">
                                <p className="text-sm text-red-600">
                                    {errors.error}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3">
                            <div>
                                <p className="text-sm font-medium">
                                    Active Status
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    Enable this product type
                                </p>
                            </div>

                            <Switch
                                checked={data.active}
                                onCheckedChange={(checked) =>
                                    setData('active', checked)
                                }
                            />
                        </div>
                    </DialogHeader>

                    <div className="py-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Type Name</Label>

                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData(
                                        'name',
                                        e.target.value.toUpperCase(),
                                    )
                                }
                                placeholder="Enter product type name"
                            />

                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name}
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
                                  ? 'Update Type'
                                  : 'Create Type'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Product Type</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-muted-foreground">
                        Are you sure you want to delete{' '}
                        <span className="font-semibold">
                            {selectedType?.name}
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
