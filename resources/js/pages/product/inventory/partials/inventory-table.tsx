import { router } from '@inertiajs/react';
import { MoreHorizontal, Pencil, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type {
  Inventory,
  PaginatedInventories,
  Warehouse,
} from './types';

interface Props {
  inventories: PaginatedInventories;

  warehouses: Warehouse[];

  filters: {
    search?: string;
    warehouseId?: string;
  };

  onEdit: (inventory: Inventory) => void;

  onDelete: (inventory: Inventory) => void;
}

export default function InventoryTable({
  inventories,
  warehouses,
  filters,
  onEdit,
  onDelete,
}: Props) {
  const [search, setSearch] = useState(filters.search ?? '');
  const [warehouseId, setWarehouseId] = useState(
    filters.warehouseId ?? 'all',
  );

  const reload = (
    keyword: string,
    warehouse: string,
  ) => {
    router.get(
      window.location.pathname,
      {
        search: keyword || undefined,
        warehouseId:
          warehouse === 'all'
            ? undefined
            : warehouse,
      },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      },
    );
  };

  const stockBadge = (stock: number) => {
    if (stock <= 0) {
      return (
        <Badge variant="destructive">
          Out of Stock
        </Badge>
      );
    }

    if (stock <= 10) {
      return (
        <Badge variant="secondary">
          Low Stock
        </Badge>
      );
    }

    return (
      <Badge>
        In Stock
      </Badge>
    );
  };

  return (
    <Card>
      <CardContent className="space-y-5 p-6">

        {/* FILTER */}

        <div className="flex flex-col gap-3 md:flex-row">

          <div className="relative flex-1">

            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              value={search}
              placeholder="Search product..."
              className="pl-9"
              onChange={(e) => {
                setSearch(e.target.value);

                reload(
                  e.target.value,
                  warehouseId,
                );
              }}
            />

          </div>

          <Select
            value={warehouseId}
            onValueChange={(value) => {
              setWarehouseId(value);

              reload(search, value);
            }}
          >

            <SelectTrigger className="w-full md:w-64">

              <SelectValue placeholder="Warehouse" />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                All Warehouse
              </SelectItem>

              {warehouses.map((warehouse) => (

                <SelectItem
                  key={warehouse.id}
                  value={warehouse.id}
                >
                  {warehouse.name}
                </SelectItem>

              ))}

            </SelectContent>

          </Select>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto rounded-xl border">

          <table className="w-full">

            <thead className="bg-muted/50">

              <tr className="text-left">

                <th className="p-4">Warehouse</th>

                <th className="p-4">Product</th>

                <th className="p-4">Unit</th>

                <th className="p-4 text-center">
                  Stock
                </th>

                <th className="p-4 text-center">
                  Status
                </th>

                <th className="p-4">
                  Updated
                </th>

                <th className="w-16"></th>

              </tr>

            </thead>

            <tbody>

              {inventories.data.length === 0 && (

                <tr>

                  <td
                    colSpan={7}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No inventory found.
                  </td>

                </tr>

              )}

              {inventories.data.map((inventory) => (

                <tr
                  key={inventory.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {inventory.warehouse?.name}
                  </td>

                  <td className="p-4 font-medium">
                    {
                      inventory.product.name
                    }
                  </td>

                  <td className="p-4">
                    {inventory.unit?.name}
                  </td>

                  <td className="p-4 text-center font-semibold">
                    {inventory.stock}
                  </td>

                  <td className="p-4 text-center">
                    {stockBadge(
                      inventory.stock,
                    )}
                  </td>

                  <td className="p-4 text-sm text-muted-foreground">
                    {inventory.updated_at}
                  </td>

                  <td>

                    <DropdownMenu>

                      <DropdownMenuTrigger
                        asChild
                      >

                        <Button
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>

                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                      >

                        <DropdownMenuItem
                          onClick={() =>
                            onEdit(
                              inventory,
                            )
                          }
                        >
                          <Pencil className="mr-2 h-4 w-4" />

                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() =>
                            onDelete(
                              inventory,
                            )
                          }
                        >
                          <Trash2 className="mr-2 h-4 w-4" />

                          Delete
                        </DropdownMenuItem>

                      </DropdownMenuContent>

                    </DropdownMenu>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}

        <div className="flex items-center justify-between">

          <p className="text-sm text-muted-foreground">

            Showing{' '}
            <strong>
              {inventories.data.length}
            </strong>{' '}
            of{' '}
            <strong>
              {inventories.total}
            </strong>{' '}
            inventories

          </p>

          <div className="flex gap-2">

            {inventories.links.map((link, index) => (

              <Button
                key={index}
                variant={
                  link.active
                    ? 'default'
                    : 'outline'
                }
                disabled={!link.url}
                onClick={() =>
                  link.url &&
                  router.visit(link.url, {
                    preserveState: true,
                    preserveScroll: true,
                  })
                }
                dangerouslySetInnerHTML={{
                  __html: link.label,
                }}
              />

            ))}

          </div>

        </div>

      </CardContent>
    </Card>
  );
}