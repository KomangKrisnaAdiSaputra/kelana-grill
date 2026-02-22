<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'system' }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
            scroll-behavior: smooth;
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title>{{ config('app.name', 'Kelana Grill') }}</title>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">
    <meta name="bingbot" content="index, follow">
    <meta name="keyword"
        content="Sewa Grill, Rental Grill, Sewa Alat BBQ, Sewa Peralatan Pesta, Sewa Grill Murah, Rental Alat BBQ, Sewa Grill Bali">
    <meta name="description"
        content="Sewa alat BBQ lengkap, bersih, dan siap pakai untuk acara keluarga, komunitas, maupun kantor.">

    <meta property="og:type" content="content">
    <meta property="og:title" content="Kelana Grill - Sewa Alat BBQ">
    <meta property="og:description"
        content="Sewa alat BBQ lengkap, bersih, dan siap pakai untuk acara keluarga, komunitas, maupun kantor.">
    <meta property="og:url" content="https://kelanagrill.wuaze.com">
    <meta property="og:image"
        content="https://res.cloudinary.com/dikjbuftt/image/upload/v1771771575/grill-hero_yfennx.png">

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
