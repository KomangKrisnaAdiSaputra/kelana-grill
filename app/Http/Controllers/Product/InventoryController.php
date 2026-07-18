<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductInventory;
use App\Models\Unit;
use App\Models\WareHouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index(Request $request)
    {
        $inventories = ProductInventory::when(
            $request->search,
            fn($q, $search) =>
            $q->whereHas(
                'product.translations',
                fn($q) =>
                $q->where('name', 'like', "%{$search}%")
            )
        )

            ->when(
                $request->warehouseId,
                fn($q, $warehouse) =>
                $q->where('warehouse_id', $warehouse)
            )

            ->latest()

            ->paginate(15)

            ->withQueryString()->through(fn($product) => $product->generateData());

        return Inertia::render('product/inventory/index', [
            'inventories' => $inventories,

            'warehouses' => WareHouse::orderBy('name')->get(),

            'products' => Product::with('translations')
                ->where('active', true)
                ->orderBy('created_at')
                ->get()->map->generateDataItem(),

            'units' => Unit::orderBy('name')->get(),

            'filters' => [
                'search' => $request->search,
                'warehouseId' => $request->warehouseId,
            ],

            'stats' => [
                'total' => ProductInventory::count(),

                'lowStock' => ProductInventory::whereBetween('stock', [1, 10])->count(),

                'outOfStock' => ProductInventory::where('stock', 0)->count(),

                'totalStock' => ProductInventory::sum('stock'),
            ],
        ]);
    }

    public function save(Request $request)
    {
        $data = $request->validate([
            'id' => ['nullable', 'uuid'],

            'warehouseId' => [
                'required',
                'exists:ware_houses,id',
            ],

            'productId' => [
                'required',
                'exists:products,id',
            ],

            'unitId' => [
                'required',
                'exists:units,id',
            ],

            'stock' => [
                'required',
                'integer',
                'min:0',
            ],

            'note' => [
                'nullable',
                'string',
            ],
        ]);

        // Cek duplicate warehouse + product
        $exists = ProductInventory::query()
            ->where('warehouse_id', $data['warehouseId'])
            ->where('product_id', $data['productId'])
            ->when(
                $data['id'],
                fn($q) => $q->where('id', '!=', $data['id'])
            )
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'productId' => 'Product already exists in this warehouse.',
            ]);
        }

        ProductInventory::updateOrCreate(
            [
                'id' => $data['id'],
            ],
            [
                'warehouse_id' => $data['warehouseId'],
                'product_id' => $data['productId'],
                'unit_id' => $data['unitId'],
                'stock' => $data['stock'],
                'note' => $data['note'],
            ]
        );

        return back()->with('success', 'Inventory saved successfully.');
    }

    public function delete(Request $request)
    {
        $id = $request->id;

        DB::beginTransaction();
        try {
            $productInventory = ProductInventory::findOrFail($id);

            $productInventory->delete();
            DB::commit();
        } catch (\Throwable $th) {

            DB::rollBack();
            return back()->withErrors([
                'error' => $th->getMessage()
            ]);
        }

        return back()->with([
            'success' => 'Product inventory deleted successfully.',
        ]);
    }
}
