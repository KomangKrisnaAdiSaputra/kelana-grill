import { router } from '@inertiajs/react';
import { MoreHorizontal, Package, Pencil, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DataTable,
  DataTableContent,
  DataTableEmpty,
} from '@/components/ui/data-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Input } from '@/components/ui/input';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { formatPrice } from '@/helpers/global';

import type { Product, PaginatedProducts, ProductType } from './types';

interface ProductTableProps {
  products: PaginatedProducts;

  types: ProductType[];

  filters: {
    search?: string;
    status?: string;
    typeId?: string;
  };

  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,
  types,
  filters,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const [search, setSearch] = useState(filters?.search ?? '');
  const [status, setStatus] = useState(filters?.status ?? '');
  const [typeId, setTypeId] = useState(filters?.typeId ?? '');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(filters?.search ?? '');
      setStatus(filters?.status ?? '');
      setTypeId(filters?.typeId ?? '');
    }, 0);

    return () => clearTimeout(timeout);
  }, [filters]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.get(
        '',
        {
          search,
          status,
          typeId,
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

  const getDisplayRate = (product: Product) => {
    if (product.rate !== null && product.rate > 0) {
      return formatPrice(product.rate);
    }

    if (!product.variants?.length) {
      return formatPrice(0);
    }

    const sortedVariants = [...product.variants].sort(
      (a, b) => (a.rate ?? 0) - (b.rate ?? 0),
    );

    const minRate = sortedVariants[0]?.rate ?? 0;

    const maxRate = sortedVariants[sortedVariants.length - 1]?.rate ?? 0;

    return minRate === maxRate
      ? formatPrice(minRate)
      : `${formatPrice(minRate)} - ${formatPrice(maxRate)}`;
  };

  return (
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
                            alt={
                              product.translations
                                .id.name
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
                            product.translations.id
                              .name
                          }
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{product.type?.name}</TableCell>

                  <TableCell>
                    {getDisplayRate(product)}
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
                          onClick={() =>
                            onEdit(product)
                          }
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() =>
                            onDelete(product)
                          }
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
          Showing page {products.current_page} of {products.last_page}
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
                variant={link.active ? 'default' : 'outline'}
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
  );
}
