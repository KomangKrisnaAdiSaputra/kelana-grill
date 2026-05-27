<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = $request->locale;

        $availableLocales = ['id', 'en'];

        $segments = $request->segments();

        $currentLocale = in_array($segments[0] ?? null, $availableLocales)
            ? $segments[0]
            : 'id';

        $targetLocale = $currentLocale === 'id' ? 'en' : 'id';

        // Hapus locale lama dari segment pertama
        if (in_array($segments[0] ?? null, $availableLocales)) {
            array_shift($segments);
        }

        // Buat path baru dengan locale target
        $newPath = implode('/', array_filter([
            $targetLocale,
            ...$segments,
        ]));

        // Bawa query string otomatis
        $queryString = $request->getQueryString();

        $switchUrl = $request->getSchemeAndHttpHost() . '/' . $newPath;
        // $currentLocaleUrl = $request->getSchemeAndHttpHost() . '/' . $currentLocale . '/' . implode('/', $segments);

        if ($queryString) {
            $switchUrl .= '?' . $queryString;
            // $currentLocaleUrl .= '?' . $queryString;
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'language' => fn() => $locale != 'id' ? translations() : [],
            "params" => [...$request->route()->parameters(), ...$request->query()],
            "switchUrl" => $switchUrl,
            // "currentLocaleUrl" => $currentLocaleUrl,
        ];
    }
}
