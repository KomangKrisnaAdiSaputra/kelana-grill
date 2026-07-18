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
import type { Product } from '@/types/product';
import InventoryStats from './partials/inventory-stats';
import InventoryTable from './partials/inventory-table';
import InventoryModalSave from './partials/product-modal-save';
import type { Inventory, PaginatedInventories, Unit, Warehouse } from './partials/types';
import { deleteMethod, save } from '@/routes/product/inventory';

// import { deleteMethod, save } from '@/routes/inventory/manage-inventory';

// import InventoryModalSave from './partials/inventory-modal-save';
// import InventoryStats from './partials/inventory-stats';
// import InventoryTable from './partials/inventory-table';

// import type {
//   Inventory,
//   PaginatedInventories,
//   Warehouse,
//   Product,
//   Unit,
// } from './partials/types';

interface Props {
  inventories: PaginatedInventories;

  warehouses: Warehouse[];

  products: Product[];

  units: Unit[];

  filters: {
    search?: string;
    warehouseId?: string;
  };

  stats: {
    total: number;
    lowStock: number;
    outOfStock: number;
    totalStock: number;
  };
}

export default function Index({
  inventories,
  warehouses,
  products,
  units,
  filters,
  stats,
}: Props) {
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedInventory, setSelectedInventory] =
    useState<Inventory | null>(null);

  const isEdit = selectedInventory !== null;

  const {
    data,
    setData,
    post,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm<Inventory>({
    id: null,
    warehouseId: '',
    productId: '',
    unitId: '',
    stock: 0,
    note: '',
  });

  const handleSubmit = () => {
    post(save().url, {
      preserveScroll: true,
      onSuccess: () => {
        setOpenForm(false);
        setSelectedInventory(null);
        reset();
      },
    });
  };

  const handleEdit = (inventory: Inventory) => {

    setSelectedInventory(inventory);

    clearErrors();

    setData({
      id: inventory.id,
      warehouseId: inventory.warehouse.id,
      productId: inventory.product.id,
      unitId: inventory.unit?.id,
      stock: inventory.stock,
      note: inventory.note
    });

    setOpenForm(true);
  };

  const handleDeleteClick = (inventory: Inventory) => {
    setSelectedInventory(inventory);
    setOpenDelete(true);
  };

  const handleDelete = () => {
    if (!selectedInventory?.id) return;

    router.delete(deleteMethod(selectedInventory.id), {
      preserveScroll: true,
      onSuccess: () => {
        setOpenDelete(false);
        setSelectedInventory(null);
      },
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Inventory
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage product stock in each warehouse.
          </p>
        </div>

        <Button
          size="lg"
          className="h-11 rounded-xl"
          onClick={() => {
            setSelectedInventory(null);

            clearErrors();

            reset();

            setData({
              id: null,
              warehouseId: '',
              productId: '',
              unitId: '',
              stock: 0,
              note: '',
            });

            setOpenForm(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Inventory
        </Button>
      </div>

      {/* Stats */}
      <InventoryStats stats={stats} />

      {/* Table */}
      <InventoryTable
        inventories={inventories}
        filters={filters}
        warehouses={warehouses}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Form */}
      <InventoryModalSave
        open={openForm}
        onOpenChange={setOpenForm}
        isEdit={isEdit}
        data={data}
        setData={setData}
        errors={errors}
        processing={processing}
        warehouses={warehouses}
        products={products}
        units={units}
        handleSubmit={handleSubmit}
      />

      {/* Delete */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Inventory</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete inventory for{' '}
            <span className="font-semibold">
              {selectedInventory?.product?.name}
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

            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}