<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductTranslation;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ManageProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $status = $request->status;
        $typeId = $request->type_id;

        $products = Product::query()
            ->with([
                'type',
                'translations',
            ])
            ->when($search, function ($query) use ($search) {
                $query->whereHas('translations', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->when($status !== null && $status !== '', function ($query) use ($status) {
                $query->where('active', $status);
            })
            ->when($typeId, function ($query) use ($typeId) {
                $query->where('type_id', $typeId);
            })
            ->latest()
            ->paginate(10)
            ->through(function ($product) {
                return [
                    'id' => $product->id,

                    'type_id' => $product->type_id,

                    'type' => [
                        'id' => $product->type?->id,
                        'name' => $product->type?->name,
                    ],

                    'rate' => $product->rate,

                    'image' => $product->image,

                    'featured' => $product->featured,

                    'new' => $product->new,

                    'active' => $product->active,

                    'translations' => [
                        'id' => [
                            'name' => optional(
                                $product->translations->firstWhere('language', 'id')
                            )->name ?? '',

                            'slug' => optional(
                                $product->translations->firstWhere('language', 'id')
                            )->slug ?? '',

                            'description' => optional(
                                $product->translations->firstWhere('language', 'id')
                            )->description ?? '',

                            'featuredLabel' => optional(
                                $product->translations->firstWhere('language', 'id')
                            )->featured_label ?? '',
                        ],

                        'en' => [
                            'name' => optional(
                                $product->translations->firstWhere('language', 'en')
                            )->name ?? '',

                            'slug' => optional(
                                $product->translations->firstWhere('language', 'en')
                            )->slug ?? '',

                            'description' => optional(
                                $product->translations->firstWhere('language', 'en')
                            )->description ?? '',

                            'featuredLabel' => optional(
                                $product->translations->firstWhere('language', 'en')
                            )->featured_label ?? '',
                        ],
                    ],
                ];
            });

        $types = Type::query()
            ->where('active', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
            ]);

        return Inertia::render('product/manage-product/index', [
            'products' => $products,

            'types' => $types,

            'filters' => [
                'search' => $search,
                'status' => $status,
                'type_id' => $typeId,
            ],

            'stats' => [
                'total' => Product::count(),

                'active' => Product::where('active', true)->count(),

                'featured' => Product::where('featured', true)->count(),

                'newest' => Product::where('new', true)->count(),
            ],
        ]);
    }

    public function save(Request $request)
    {
        $validated = $request->validate([
            'id' => ['nullable', 'uuid'],

            'type_id' => ['required', 'exists:types,id'],

            'rate' => ['required', 'numeric', 'min:0'],

            'featured' => ['required', 'boolean'],
            'new' => ['required', 'boolean'],
            'active' => ['required', 'boolean'],

            'image' => ['nullable'],

            'translations.id.name' => ['required', 'string', 'max:255'],
            'translations.id.featuredLabel' => [
                'nullable',
                'required_if:featured,true',
                'string',
                'max:255',
            ],

            'translations.en.name' => ['required', 'string', 'max:255'],
            'translations.en.featuredLabel' => [
                'nullable',
                'required_if:featured,true',
                'string',
                'max:255',
            ],
        ], [
            'type_id.required' => 'Please select a product type.',

            'rate.required' => 'Rate is required.',
            'rate.numeric' => 'Rate must be a valid number.',
            'rate.min' => 'Rate must be greater than or equal to 0.',

            'translations.id.name.required' =>
            'Product name (Indonesia) is required.',

            'translations.en.name.required' =>
            'Product name (English) is required.',

            'translations.id.featuredLabel.required_if' =>
            'Featured label (Indonesia) is required when featured is enabled.',

            'translations.en.featuredLabel.required_if' =>
            'Featured label (English) is required when featured is enabled.',
        ]);

        DB::beginTransaction();
        try {

            $product = Product::find($request->id);

            if (!$product) {
                $product = new Product();
            }

            $product->type_id = $validated['type_id'];
            $product->rate = $validated['rate'];

            $product->featured = $validated['featured'];
            $product->new = $validated['new'];
            $product->active = $validated['active'];

            /*
        |--------------------------------------------------------------------------
        | Upload Image
        |--------------------------------------------------------------------------
        */

            if ($request->hasFile('image')) {

                // if ($product->image) {
                //     Storage::disk('public')->delete($product->image);
                // }

                // $product->image = $request
                //     ->file('image')
                //     ->store('products', 'public');
            }

            $product->save();

            /*
        |--------------------------------------------------------------------------
        | Translations
        |--------------------------------------------------------------------------
        */

            foreach (['id', 'en'] as $language) {

                $translation = ProductTranslation::firstOrNew([
                    'product_id' => $product->id,
                    'language' => $language,
                ]);

                $translation->name = $validated['translations'][$language]['name'];

                $translation->slug = Str::slug($validated['translations'][$language]['name']);

                $translation->description = $validated['translations'][$language]['description'] ?? null;

                $translation->featured_label = $validated['translations'][$language]['featuredLabel'] ?? null;

                $translation->save();
            }

            DB::commit();

            return back()->with([
                'success' => $request->id
                    ? 'Product updated successfully.'
                    : 'Product created successfully.',
            ]);
        } catch (\Throwable $e) {

            DB::rollBack();

            return back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
