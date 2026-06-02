<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\CategoryTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::query()
            ->with([
                'translations',
                'translation'
            ]);

        if ($request->filled('search')) {
            $query->whereHas('translations', function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%");
            });
        }

        if ($request->status !== null && $request->status !== '') {
            $query->where('active', $request->status);
        }

        $categories = $query
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('master/category/index', [
            'categories' => $categories->through(fn($category) => [
                'id' => $category->id,
                'active' => $category->active,
                'translations' => $category->translations->map(fn($translation) => [
                    'language' => $translation->language,
                    'name' => $translation->name,
                    'slug' => $translation->slug,
                ])->keyBy('language'),
            ]),

            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],

            'stats' => [
                'total' => Category::count(),
                'active' => Category::where('active', true)->count(),
                'inactive' => Category::where('active', false)->count(),
            ],
        ]);
    }

    public function save(Request $request)
    {
        $request->validate([
            'active' => ['required', 'boolean'],

            'translations.id.name' => ['required'],
            'translations.en.name' => ['required'],
        ]);

        DB::beginTransaction();

        try {

            $category = Category::find($request->id);

            if (!$category) {
                $category = Category::create([
                    'active' => $request->active,
                ]);
            } else {
                $category->update([
                    'active' => $request->active,
                ]);
            }

            foreach (['id', 'en'] as $lang) {

                $name = $request->translations[$lang]['name'];

                CategoryTranslation::updateOrCreate(
                    [
                        'category_id' => $category->id,
                        'language' => $lang,
                    ],
                    [
                        'name' => $name,
                        'slug' => Str::slug($name),
                    ]
                );
            }

            DB::commit();

            return back()->with('success', true);
        } catch (\Throwable $e) {

            DB::rollBack();

            return back()->withErrors([
                'error' => $e->getMessage()
            ]);
        }
    }
}
