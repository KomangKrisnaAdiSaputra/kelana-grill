<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\WareHouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WareHouseController extends Controller
{
    public function index(Request $request)
    {
        $query = WareHouse::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        if ($request->filled('status')) {
            $query->where('active', $request->status);
        }

        $warehouses = $query
            ->latest()
            ->paginate()
            ->withQueryString();

        return Inertia::render('master/warehouse/index', [
            'warehouses' => $warehouses,

            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],

            'stats' => [
                'total' => WareHouse::count(),
                'active' => WareHouse::where('active', true)->count(),
                'inactive' => WareHouse::where('active', false)->count(),
            ],
        ]);
    }

    public function save(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'active' => ['required', 'boolean'],
        ]);

        DB::beginTransaction();

        try {

            $warehouse = WareHouse::find($request->id);

            if (!$warehouse) {
                $warehouse = new WareHouse();
            }

            $warehouse->fill($validated);
            $warehouse->save();

            DB::commit();

            return back()->with('success', 'Warehouse saved successfully.');
        } catch (\Throwable $e) {

            DB::rollBack();

            return back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function delete(Request $request)
    {

        $id = $request->id;

        DB::beginTransaction();
        try {
            $warehouse = WareHouse::findOrFail($id);
            $warehouse->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors([
                'error' => $th->getMessage()
            ]);
        }

        return back()->with(
            'success',
            'Warehouse deleted successfully.'
        );
    }
}
