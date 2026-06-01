<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TypeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $status = $request->status;

        $types = Type::query()
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")->orWhere('slug', 'like', "%{$search}%");
                });
            })
            ->when($status !== null && $status !== '', function ($query) use ($status) {
                $query->where('active', $status);
            })
            ->latest()
            ->paginate()
            ->withQueryString();

        return Inertia::render('master/type/index', [
            'types' => $types,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
            'stats' => [
                'total' => Type::count(),
                'active' => Type::where('active', true)->count(),
                'inactive' => Type::where('active', false)->count(),
            ],
        ]);
    }

    public function save(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'active' => ['required', 'boolean'],
        ]);

        DB::beginTransaction();
        try {
            $type = Type::find($request->id);
            if ($type) {
                $type->update([
                    'name' => $validated['name'],
                    'active' => $validated['active']
                ]);
            } else {
                Type::Create([
                    'name' => $validated['name'],
                    'slug' => Str::slug($validated['name']),
                    'active' => $validated['active'],
                ],);
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors([
                'error' => $th->getMessage()
            ]);
        }

        return back()->with('success', 'Type saved successfully.');
    }
    public function delete(Request $request)
    {
        $id = $request->id;

        DB::beginTransaction();
        try {
            $type = Type::findOrFail($id);
            $type->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors([
                'error' => $th->getMessage()
            ]);
        }

        return back()->with(
            'success',
            'Type deleted successfully.'
        );
    }
}
