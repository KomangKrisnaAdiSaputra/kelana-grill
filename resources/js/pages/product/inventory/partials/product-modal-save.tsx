import DynamicSelect from '@/components/dynamic-select';
import { InputNumber } from '@/components/input-number';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';

import type {
  Inventory,
  Warehouse,
  Product,
  Unit,
} from './types';

interface InventoryModalSaveProps {
  open: boolean;

  onOpenChange: (value: boolean) => void;

  isEdit: boolean;

  data: Inventory;

  setData: any;

  errors: Record<string, string>;

  processing: boolean;

  warehouses: Warehouse[];

  products: Product[];

  units: Unit[];

  handleSubmit: () => void;
}

export default function InventoryModalSave({
  open,
  onOpenChange,
  isEdit,
  data,
  setData,
  errors,
  processing,
  warehouses,
  products,
  units,
  handleSubmit,
}: InventoryModalSaveProps) {

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="max-h-[90vh] sm:max-w-3xl p-0"
        onInteractOutside={(e) =>
          e.preventDefault()
        }
      >
        <div className="flex h-[90vh] flex-col">

          <DialogHeader className="border-b px-6 py-4">

            <DialogTitle>
              {isEdit
                ? 'Edit Inventory'
                : 'Add Inventory'}
            </DialogTitle>

            <DialogDescription>
              Manage inventory stock.
            </DialogDescription>

          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5">

            <div className="space-y-5">

              {/* Warehouse */}

              <div className="space-y-2">

                <Label>
                  Warehouse
                </Label>

                <DynamicSelect
                  options={warehouses}
                  value={data.warehouseId}
                  onChange={(value) =>
                    setData(
                      'warehouseId',
                      value,
                    )
                  }
                  getValue={(item) =>
                    item.id
                  }
                  getLabel={(item) =>
                    item.name
                  }
                  placeholder="Select Warehouse"
                  error={
                    errors.warehouseId
                  }
                />

              </div>

              {/* Product */}

              <div className="space-y-2">

                <Label>
                  Product
                </Label>

                <DynamicSelect
                  options={products}
                  value={data.productId}
                  onChange={(value) =>
                    setData(
                      'productId',
                      value,
                    )
                  }
                  getValue={(item) =>
                    item.id
                  }
                  getLabel={(item) =>
                    item.name
                  }
                  placeholder="Select Product"
                  error={
                    errors.productId
                  }
                />

              </div>

              {/* Unit */}

              <div className="space-y-2">

                <Label>
                  Unit
                </Label>

                <DynamicSelect
                  options={units}
                  value={data.unitId}
                  onChange={(value) =>
                    setData(
                      'unitId',
                      value,
                    )
                  }
                  getValue={(item) =>
                    item.id
                  }
                  getLabel={(item) =>
                    item.name
                  }
                  placeholder="Select Unit"
                  error={
                    errors.unitId
                  }
                />

              </div>

              {/* Stock */}

              <div className="space-y-2">

                <Label>
                  Stock
                </Label>

                <InputNumber
                  value={data.stock}
                  onChange={(value) =>
                    setData(
                      'stock',
                      value,
                    )
                  }
                  error={errors.stock}
                  placeholder="0"
                />
              </div>

              {/* Note */}

              <div className="space-y-2">

                <Label>
                  Note
                </Label>

                <textarea
                  rows={5}
                  value={data.note ?? ''}
                  onChange={(e) =>
                    setData(
                      'note',
                      e.target.value,
                    )
                  }
                  className="w-full rounded-xl border px-3 py-2"
                  placeholder="Additional information..."
                />

                {errors.note && (
                  <p className="text-sm text-destructive">
                    {errors.note}
                  </p>
                )}

              </div>

              {/* Summary */}

              <div className="rounded-xl border bg-muted/30 p-4">

                <h3 className="font-medium">
                  Inventory Summary
                </h3>

                <div className="mt-3 grid gap-3 md:grid-cols-2">

                  <div>

                    <p className="text-xs text-muted-foreground">
                      Warehouse
                    </p>

                    <p className="font-medium">
                      {warehouses.find(
                        (w) =>
                          w.id ===
                          data.warehouseId,
                      )?.name ?? '-'}
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-muted-foreground">
                      Product
                    </p>

                    <p className="font-medium">
                      {products.find(
                        (p) =>
                          p.id ===
                          data.productId,
                      )?.name ??
                        '-'}
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-muted-foreground">
                      Unit
                    </p>

                    <p className="font-medium">
                      {units.find(
                        (u) =>
                          u.id ===
                          data.unitId,
                      )?.name ?? '-'}
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-muted-foreground">
                      Current Stock
                    </p>

                    <p className="text-lg font-bold">
                      {Number(
                        data.stock ?? 0,
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <DialogFooter className="border-t px-6 py-4">

            <Button
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={processing}
            >
              {processing
                ? 'Saving...'
                : isEdit
                  ? 'Update Inventory'
                  : 'Create Inventory'}
            </Button>

          </DialogFooter>

        </div>

      </DialogContent>

    </Dialog>
  );
}