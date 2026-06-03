<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use App\Models\BadgeTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BadgeController extends Controller
{
    public function index(Request $request)
    {
        $query = Badge::query()
            ->with([
                'translations',
            ]);

        if ($request->filled('search')) {

            $search = $request->search;

            $query->whereHas('translations', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        if ($request->status !== null && $request->status !== '') {
            $query->where('active', $request->boolean('status'));
        }

        $badges = $query
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $badges->getCollection()->transform(function ($badge) {

            return [
                'id' => $badge->id,

                'active' => $badge->active,

                'translations' => [
                    'id' => optional(
                        $badge->translations
                            ->where('language', 'id')
                            ->first()
                    )->only([
                        'name',
                        'slug',
                    ]),

                    'en' => optional(
                        $badge->translations
                            ->where('language', 'en')
                            ->first()
                    )->only([
                        'name',
                        'slug',
                    ]),
                ],
            ];
        });

        return Inertia::render(
            'master/badge/index',
            [
                'badges' => $badges,

                'filters' => [
                    'search' => $request->search,
                    'status' => $request->status,
                ],

                'stats' => [
                    'total' => Badge::count(),

                    'active' => Badge::where(
                        'active',
                        true
                    )->count(),

                    'inactive' => Badge::where(
                        'active',
                        false
                    )->count(),
                ],
            ]
        );
    }

    public function save(Request $request)
    {
        $validated = $request->validate([
            'id' => ['nullable', 'uuid'],

            'active' => ['required', 'boolean'],

            'translations.id.name' => [
                'required',
                'string',
                'max:255',
            ],

            'translations.en.name' => [
                'required',
                'string',
                'max:255',
            ],
        ]);

        DB::beginTransaction();

        try {

            $badge = Badge::find(
                $request->id
            );

            if (!$badge) {
                $badge = new Badge();
            }

            $badge->active =
                $validated['active'];

            $badge->save();

            foreach (
                ['id', 'en']
                as $language
            ) {

                $translation =
                    BadgeTranslation::firstOrNew([
                        'badge_id' => $badge->id,
                        'language' => $language,
                    ]);

                $translation->name =
                    $validated['translations'][$language]['name'];

                $translation->slug =
                    Str::slug(
                        $validated['translations'][$language]['name']
                    );

                $translation->save();
            }

            DB::commit();

            return back()->with([
                'success' => $request->id
                    ? 'Badge updated successfully.'
                    : 'Badge created successfully.',
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
        try {
            $badge = Badge::findOrFail($request->id);

            $badge->delete();

            return back()->with([
                'success' =>
                'Badge deleted successfully.',
            ]);
        } catch (\Throwable $e) {

            return back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
