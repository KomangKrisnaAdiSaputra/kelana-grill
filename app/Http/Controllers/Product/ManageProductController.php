<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductTranslation;
use App\Models\ProductVariant;
use App\Models\ProductVariantTranslation;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ManageProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $status = $request->status;
        $typeId = $request->typeId;

        $products = Product::query()->with(['type', 'translations',])
            ->when($search, fn($query) => $query->whereHas('translations', fn($q) => $q->where('name', 'like', "%{$search}%")))
            ->when($status !== null && $status !== '', fn($query) => $query->where('active', $status))
            ->when($typeId, fn($query) => $query->where('type_id', $typeId))
            ->latest()
            ->paginate(10)
            ->through(fn($product) => $this->generateData($product));

        $types = Type::query()->where('active', true)->orderBy('name')->get(['id', 'name']);

        $categories = Category::query()->where('active', true)->get()->map(fn($category) => [
            'label' => $category->translations->firstWhere('language', 'id')->name ?? $category->translations->firstWhere('language', 'en')->name ?? 'Unnamed Category',
            'value' => $category->id,
        ]);

        $badges = Badge::query()->where('active', true)->get()->map(fn($badge) => [
            'label' => $badge->translations->firstWhere('language', 'id')->name ?? $badge->translations->firstWhere('language', 'en')->name ?? 'Unnamed Badge',
            'value' => $badge->id,
        ]);

        $alaCarteProducts = Product::query()->with(['type', 'translations'])
            ->whereHas('type', fn($query) => $query->whereIn('name', ['ALA CARTE', 'MARINADE', 'CHOICE']))
            ->where('active', true)->orderBy('id')->get()->map(fn($product) => [
                'id' => $product->id,
                'name' => $product->translations->firstWhere('language', 'id')?->name  ?? $product->translations->firstWhere('language', 'en')?->name ?? 'Unnamed Product',
                'description' => $product->translations->firstWhere('language', 'id')?->description  ?? $product->translations->firstWhere('language', 'en')?->description ?? '-',
            ])->values();

        return Inertia::render('product/manage-product/index', [
            'products' => $products,
            'types' => $types,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'typeId' => $typeId,
            ],
            'stats' => [
                'total' => Product::count(),
                'active' => Product::where('active', true)->count(),
                'featured' => Product::where('featured', true)->count(),
                'newest' => Product::where('new', true)->count(),
            ],

            'categories' => $categories,
            'badges' => $badges,
            'alaCarteProducts' => $alaCarteProducts,
        ]);
    }

    public function save(Request $request)
    {
        $type = Type::find($request->typeId);
        $isPackage = $type?->name === 'PACKAGE';

        $request->validate([
            'id' => ['nullable', 'uuid'],

            'typeId' => ['required', 'exists:types,id'],

            'rate' => [Rule::requiredIf(fn() => count($request->input('variants', [])) <= 0), 'numeric', 'min:0'],

            'featured' => ['required', 'boolean'],
            'new' => ['required', 'boolean'],
            'active' => ['required', 'boolean'],

            'image' => ['nullable'],

            'categories' => ['required', 'array'],
            'categories.*' => ['required', 'exists:categories,id'],

            'badges' => ['nullable', 'array'],
            'badges.*' => ['exists:badges,id'],

            'translations.id.name' => ['required', 'string', 'max:255'],
            'translations.en.name' => ['required', 'string', 'max:255'],

            'translations.id.featuredLabel' => [
                'nullable',
                'required_if:featured,true',
                'string',
                'max:255',
            ],

            'translations.en.featuredLabel' => [
                'nullable',
                'required_if:featured,true',
                'string',
                'max:255',
            ],
            'variants' => ['nullable', 'array'],

            'variants.*.id' => ['nullable', 'uuid'],

            'variants.*.rate' => [
                'required',
                'numeric',
                'min:0',
            ],

            'variants.*.minPerson' => [
                'nullable',
                'integer',
                'min:1',
            ],

            'variants.*.maxPerson' => [
                'nullable',
                'integer',
                'min:1',
            ],

            'variants.*.active' => [
                'required',
                'boolean',
            ],

            'variants.*.translations.id.name' => [
                'required',
                'string',
                'max:255',
            ],

            'variants.*.translations.en.name' => [
                'required',
                'string',
                'max:255',
            ],

            'items' => [
                Rule::requiredIf($isPackage),
                'array',
                'min:1',
            ],

            'items.*.itemProductId' => [
                'required',
                'exists:products,id',
                'different:id',
            ],

            'items.*.qty' => [
                'required',
                'numeric',
                'min:0.01',
            ],

            // 'items.*.unit' => [
            //     'required',
            //     'string',
            //     'max:50',
            // ],
        ], [
            'typeId.required' => 'Please select a product type.',

            'rate.required' => 'Rate is required.',
            'rate.numeric' => 'Rate must be a valid number.',
            'rate.min' => 'Rate must be greater than or equal to 0.',

            'translations.id.name.required' => 'Product name (Indonesia) is required.',
            'translations.en.name.required' => 'Product name (English) is required.',
            'translations.id.featuredLabel.required_if' => 'Featured label (Indonesia) is required when featured is enabled.',
            'translations.en.featuredLabel.required_if' => 'Featured label (English) is required when featured is enabled.',

            'categories.required' => 'Please select at least one category.',

            'variants.*.rate.required' => 'Variant rate is required.',
            'variants.*.translations.id.name.required' => 'Variant name (Indonesia) is required.',
            'variants.*.translations.en.name.required' => 'Variant name (English) is required.',

            'items.required' => 'Please select at least one items.',
            'items.*.itemProductId.required' => 'Please select a product.',
            'items.*.qty.required' => 'Quantity is required.',
            'items.*.qty.min' => 'Quantity must be greater than 0.',
        ]);

        DB::beginTransaction();

        try {
            $product = Product::find($request->id);

            if (!$product) {
                $product = new Product();
            }

            $product->type_id = $request->typeId;
            $product->rate = $request->rate;
            $product->featured = $request->featured;
            $product->new = $request->new;
            $product->active = $request->active;
            $product->marinade = $request->marinade;

            if ($request->hasFile('image')) {

                // if ($product->image) {
                //     Storage::disk('public')->delete($product->image);
                // }

                // $product->image = $request
                //     ->file('image')
                //     ->store('products', 'public');
            }

            $product->save();

            foreach (['id', 'en'] as $language) {

                $translation = ProductTranslation::firstOrNew([
                    'product_id' => $product->id,
                    'language' => $language,
                ]);

                $translation->name = $request->translations[$language]['name'];
                $translation->slug = Str::slug($request->translations[$language]['name']);
                $translation->description = $request->translations[$language]['description'] ?? null;
                $translation->featured_label = $request->translations[$language]['featuredLabel'] ?? null;
                $translation->save();
            }

            $product->categories()->sync($request->categories);

            $product->badges()->sync($request->badges ?? []);

            $submittedVariantIds = [];
            foreach ($request->variants ?? [] as $variantData) {

                $variant = null;
                if (!empty($variantData['id'])) {

                    $variant = ProductVariant::where('product_id', $product->id)->find($variantData['id']);
                }

                if (!$variant) {
                    $variant = new ProductVariant();
                    $variant->product_id = $product->id;
                }

                $variant->rate = $variantData['rate'];
                $variant->min_person = $variantData['minPerson']  ?? null;
                $variant->max_person = $variantData['maxPerson'] ?? null;
                $variant->active = $variantData['active'];
                $variant->marinade = $variantData['marinade'];
                $variant->save();

                $submittedVariantIds[] = $variant->id;
                foreach (['id', 'en'] as $language) {

                    $translation = ProductVariantTranslation::firstOrNew([
                        'product_variant_id' => $variant->id,
                        'language' => $language,
                    ]);

                    $translation->name = $variantData['translations'][$language]['name'];
                    $translation->slug = Str::slug($variantData['translations'][$language]['name']);
                    $translation->description = $variantData['translations'][$language]['description'] ?? null;
                    $translation->save();
                }
            }

            $product->variants()->whereNotIn('id', $submittedVariantIds)->delete();

            $syncItems = collect($request->items ?? [])
                ->mapWithKeys(fn($item) => [
                    $item['itemProductId'] => [
                        'qty' => $item['qty'],
                        'unit' => $item['unit'] ?? null,
                    ],
                ])->toArray();

            $product->items()->sync($syncItems);

            DB::commit();
            return back()->with([
                'success' => $request->id ? 'Product updated successfully.' : 'Product created successfully.',
            ]);
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
            $product = Product::findOrFail($id);
            $product->categories()->detach();
            $product->badges()->detach();

            $product->items()->detach();

            foreach ($product->variants as $variant) {
                $variant->translations()->delete();
            }

            $product->variants()->delete();
            $product->translations()->delete();

            $product->delete();
            DB::commit();
        } catch (\Throwable $th) {

            DB::rollBack();
            return back()->withErrors([
                'error' => $th->getMessage()
            ]);
        }

        return back()->with([
            'success' => 'Product deleted successfully.',
        ]);
    }

    function generateData(Product $product)
    {
        return [
            'id' => $product->id,
            'typeId' => $product->type_id,
            'type' => [
                'id' => $product->type?->id,
                'name' => $product->type?->name,
            ],
            'rate' => $product->rate,
            'image' => $product->image,
            'featured' => $product->featured,
            'new' => $product->new,
            'active' => $product->active,
            'marinade' => $product->marinade,
            'translations' => $product->translations->mapWithKeys(fn($translation) => [
                $translation->language => [
                    'name' => $translation->name,
                    'slug' => $translation->slug,
                    'description' => $translation->description,
                    'featuredLabel' => $translation->featured_label,
                ]
            ]),
            'categories' => $product->categories->pluck('id')->values(),
            'badges' => $product->badges->pluck('id')->values(),
            'variants' => $product->variants->map(fn($variant) => [
                'id' => $variant->id,
                'rate' => $variant->rate,
                'minPerson' => $variant->min_person,
                'maxPerson' => $variant->max_person,
                'active' => $variant->active,
                'marinade' => $variant->marinade,
                'translations' => $variant->translations->mapWithKeys(fn($translation) => [
                    $translation->language => [
                        'name' => $translation->name,
                        'slug' => $translation->slug,
                        'description' => $translation->description,
                        'featuredLabel' => $translation->featured_label,
                    ]
                ])
            ]),
            'items' => $product->items->map(fn($item) => [
                'itemProductId' => $item->pivot->item_product_id,
                'qty' => $item->pivot->qty,
                'unit' => $item->pivot->unit,
                'description' => $item->translation->description
            ])
        ];
    }
}
