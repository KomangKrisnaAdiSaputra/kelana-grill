<?php

use App\Helpers\MetaHelper;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Str;

function translations()
{
  return Lang::get("index", [], null, false);
}

function maskPhone(?string $phone, ?bool $hide = true): ?string
{
  if (!$phone) {
    return null;
  }

  if (!$hide) {
    return $phone;
  }

  return substr($phone, 0, 4) . str_repeat('*', max(strlen($phone) - 7, 0)) . substr($phone, -3);
}

function maskEmail(?string $email, ?bool $hide = true): ?string
{
  if (!$email || !str_contains($email, '@')) {
    return $email;
  }

  if (!$hide) {
    return $email;
  }

  [$name, $domain] = explode('@', $email);

  return substr($name, 0, 2) . str_repeat('*', max(strlen($name) - 2, 0)) . '@' . $domain;
}

function translate(string $text, string $file = 'index'): string
{
  if (app()->getLocale() !== 'id') {
    $translate = __("{$file}.{$text}");
    return str_replace("{$file}.", "", $translate);
  }

  return $text;
}

function accountBankLists(): array
{
  return [
    [
      'bank' => 'BCA',
      'name' => 'I Komang Krisna Adi Saputra',
      'no' => '6955216435',
    ],
    [
      'bank' => 'Mandiri',
      'name' => 'Putu Diah Gayatri Purnama Dewi',
      'no' => '1450015296474',
    ],
    [
      'bank' => 'Seabank',
      'name' => 'I Komang Krisna Adi Saputra',
      'no' => '901414714730',
    ],
  ];
}

function setupSeo(array $data = [], $breadcrumbs = []): void
{
  $locale = app()->getLocale();

  $title = $data['title'] ?? config('app.name');

  $description = Str::limit(
    strip_tags(
      $data['description'] ??
        'Sewa Grill BBQ Bali dengan harga terbaik. Tersedia grill portable, paket BBQ, alat barbeque lengkap, dan layanan antar ke seluruh Bali.'
    ),
    160
  );

  $image = $data['image'] ?? config('app.logo');

  $url = $data['url'] ?? url()->current();

  $type = $data['type'] ?? 'website';

  $keywords = is_array($data['keywords'] ?? null) ? implode(', ', $data['keywords'] ?? []) : ($data['keywords'] ?? '');

  $ogLocale = match ($locale) {
    'id' => 'id_ID',
    'en' => 'en_US',
    default => 'id_ID',
  };

  MetaHelper::setTitle($title);

  MetaHelper::setCanonical($url);

  MetaHelper::addMeta('description', $description);
  MetaHelper::addMeta('keywords', $keywords);
  MetaHelper::addMeta('robots', 'index,follow');
  MetaHelper::addMeta('author', config('app.name'));

  /*
    |--------------------------------------------------------------------------
    | Open Graph
    |--------------------------------------------------------------------------
    */

  MetaHelper::addOpenGraph('type', $type);
  MetaHelper::addOpenGraph('site_name', config('app.name'));
  MetaHelper::addOpenGraph('locale', $ogLocale);
  MetaHelper::addOpenGraph('title', $title);
  MetaHelper::addOpenGraph('description', $description);
  MetaHelper::addOpenGraph('url', $url);
  MetaHelper::addOpenGraph('image', $image);

  /*
    |--------------------------------------------------------------------------
    | Twitter
    |--------------------------------------------------------------------------
    */

  MetaHelper::addTwitter('card', 'summary_large_image');
  MetaHelper::addTwitter('title', $title);
  MetaHelper::addTwitter('description', $description);
  MetaHelper::addTwitter('image', $image);

  /*
    |--------------------------------------------------------------------------
    | Breadcrumb
    |--------------------------------------------------------------------------
    */

  MetaHelper::addBreadcrumbLists(
    collect($breadcrumbs)->toArray()
  );

  /*
    |--------------------------------------------------------------------------
    | Organization
    |--------------------------------------------------------------------------
    */

  MetaHelper::addSchema([
    '@context' => 'https://schema.org',
    '@type' => 'Organization',

    'name' => config('app.name'),
    'url' => url('/'),
    'logo' => config('app.logo'),
    'image' => config('app.logo'),
    'description' => $description,
  ]);

  /*
    |--------------------------------------------------------------------------
    | Local Business
    |--------------------------------------------------------------------------
    */

  MetaHelper::addSchema([
    '@context' => 'https://schema.org',
    '@type' => 'LocalBusiness',

    'name' => config('app.name'),
    'url' => url('/'),
    'image' => config('app.logo'),

    'telephone' => config('app.landing.contact.whatsapp_number'),
    'email' => config('app.landing.contact.email'),

    'priceRange' => '$$',

    'areaServed' => [
      [
        '@type' => 'AdministrativeArea',
        'name' => 'Bali'
      ]
    ]
  ]);

  /*
    |--------------------------------------------------------------------------
    | Website
    |--------------------------------------------------------------------------
    */

  MetaHelper::addSchema([
    '@context' => 'https://schema.org',
    '@type' => 'WebSite',

    'name' => config('app.name'),
    'url' => url('/')
  ]);

  /*
    |--------------------------------------------------------------------------
    | Service
    |--------------------------------------------------------------------------
    */

  MetaHelper::addSchema([
    '@context' => 'https://schema.org',
    '@type' => 'Service',

    'name' => $title,
    'description' => $description,
    'url' => $url,
    'image' => $image,

    'provider' => [
      '@type' => 'Organization',
      'name' => config('app.name')
    ]
  ]);
}

function addProductSchema(array $product): void
{
  MetaHelper::addSchema([
    '@context' => 'https://schema.org',
    '@type' => 'Product',

    'name' => $product['name'],

    'image' => [
      $product['image'] ?? config('app.logo')
    ],

    'description' => strip_tags(
      $product['description'] ?? ''
    ),

    'brand' => [
      '@type' => 'Brand',
      'name' => config('app.name')
    ],

    'offers' => [
      '@type' => 'Offer',

      'url' => url()->current(),

      'priceCurrency' => 'IDR',

      'availability' => 'https://schema.org/InStock'
    ]
  ]);
}

function addFaqSchema(): void
{
  MetaHelper::addSchema([
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',

    'mainEntity' => [

      [
        '@type' => 'Question',

        'name' => 'Apakah tersedia layanan antar?',

        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'Ya, kami melayani pengiriman ke seluruh Bali.'
        ]
      ],

      [
        '@type' => 'Question',

        'name' => 'Apakah bisa sewa harian?',

        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'Ya, tersedia paket sewa harian maupun beberapa hari.'
        ]
      ],

      [
        '@type' => 'Question',

        'name' => 'Apakah tersedia paket lengkap?',

        'acceptedAnswer' => [
          '@type' => 'Answer',
          'text' => 'Ya, tersedia paket grill, alat BBQ, dan perlengkapannya.'
        ]
      ]

    ]
  ]);
}
