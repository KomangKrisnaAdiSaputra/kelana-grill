<?php

namespace App\Data;

use Illuminate\Support\Collection;

class KelanaGrillData
{
  public static function get(?string $language = null): Collection
  {
    $language = $language ?: app()->getLocale();

    if (! in_array($language, ['id', 'en'])) {
      $language = 'id';
    }

    $types = collect([
      [
        'id' => 'type-package',
        'code' => 'package',
        'is_active' => true,
        'sort_order' => 1,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Paket',
            'slug' => 'paket',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Package',
            'slug' => 'package',
          ],
        ],
      ],
      [
        'id' => 'type-alacarte',
        'code' => 'alacarte',
        'is_active' => true,
        'sort_order' => 2,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Ala Carte',
            'slug' => 'alacarte',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'A La Carte',
            'slug' => 'alacarte',
          ],
        ],
      ],
      [
        'id' => 'type-equipment',
        'code' => 'equipment',
        'is_active' => true,
        'sort_order' => 3,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Sewa Alat',
            'slug' => 'sewa-alat',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Equipment Rental',
            'slug' => 'equipment-rental',
          ],
        ],
      ],
    ])->map(function ($type) use ($language) {
      return array_merge($type, [
        'translation' => self::pickTranslation($type['translations'], $language),
      ]);
    });

    $categories = collect([
      [
        'id' => 'cat-package-ramean',
        'is_active' => true,
        'sort_order' => 1,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Paket Ramean',
            'slug' => 'paket-ramean',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Group Package',
            'slug' => 'group-package',
          ],
        ],
      ],
      [
        'id' => 'cat-package-small',
        'is_active' => true,
        'sort_order' => 2,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Paket Kecil',
            'slug' => 'paket-kecil',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Small Package',
            'slug' => 'small-package',
          ],
        ],
      ],
      [
        'id' => 'cat-bbq',
        'is_active' => true,
        'sort_order' => 3,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'BBQ',
            'slug' => 'bbq',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'BBQ',
            'slug' => 'bbq',
          ],
        ],
      ],
      [
        'id' => 'cat-grill-suki',
        'is_active' => true,
        'sort_order' => 4,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Grill & Suki',
            'slug' => 'grill-suki',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Grill & Suki',
            'slug' => 'grill-suki',
          ],
        ],
      ],
      [
        'id' => 'cat-meat',
        'is_active' => true,
        'sort_order' => 5,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Daging',
            'slug' => 'daging',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Meat',
            'slug' => 'meat',
          ],
        ],
      ],
      [
        'id' => 'cat-seafood',
        'is_active' => true,
        'sort_order' => 6,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Seafood',
            'slug' => 'seafood',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Seafood',
            'slug' => 'seafood',
          ],
        ],
      ],
      [
        'id' => 'cat-vegetable',
        'is_active' => true,
        'sort_order' => 7,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Sayuran',
            'slug' => 'sayuran',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Vegetables',
            'slug' => 'vegetables',
          ],
        ],
      ],
      [
        'id' => 'cat-sauce',
        'is_active' => true,
        'sort_order' => 8,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Saus & Bumbu',
            'slug' => 'saus-bumbu',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Sauces & Seasoning',
            'slug' => 'sauces-seasoning',
          ],
        ],
      ],
      [
        'id' => 'cat-equipment',
        'is_active' => true,
        'sort_order' => 9,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Alat Grill',
            'slug' => 'alat-grill',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Grill Equipment',
            'slug' => 'grill-equipment',
          ],
        ],
      ],
    ])->map(function ($category) use ($language) {
      return array_merge($category, [
        'translation' => self::pickTranslation($category['translations'], $language),
      ]);
    });

    $badges = collect([
      [
        'id' => 'badge-best-seller',
        'is_active' => true,
        'sort_order' => 1,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Paling Laris',
            'slug' => 'paling-laris',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Best Seller',
            'slug' => 'best-seller',
          ],
        ],
      ],
      [
        'id' => 'badge-ramean',
        'is_active' => true,
        'sort_order' => 2,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Ramean',
            'slug' => 'ramean',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Group Deal',
            'slug' => 'group-deal',
          ],
        ],
      ],
      [
        'id' => 'badge-premium',
        'is_active' => true,
        'sort_order' => 3,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Premium',
            'slug' => 'premium',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Premium',
            'slug' => 'premium',
          ],
        ],
      ],
      [
        'id' => 'badge-add-on',
        'is_active' => true,
        'sort_order' => 4,
        'translations' => [
          'id' => [
            'language' => 'id',
            'name' => 'Add On',
            'slug' => 'add-on',
          ],
          'en' => [
            'language' => 'en',
            'name' => 'Add On',
            'slug' => 'add-on',
          ],
        ],
      ],
    ])->map(function ($badge) use ($language) {
      return array_merge($badge, [
        'translation' => self::pickTranslation($badge['translations'], $language),
      ]);
    });

    $products = collect([
      self::packageProduct(
        id: 'product-paket-ramean-a',
        nameId: 'Paket Ramean A',
        nameEn: 'Group Package A',
        slugId: 'paket-ramean-a',
        slugEn: 'group-package-a',
        descriptionId: 'Paket BBQ ramean cocok untuk 10-12 orang.',
        descriptionEn: 'BBQ group package suitable for 10-12 people.',
        featuredLabelId: 'Ramean',
        featuredLabelEn: 'Group Deal',
        rate: 699000,
        image: '/images/products/paket-ramean-a.jpg',
        categories: ['cat-package-ramean', 'cat-bbq'],
        badges: ['badge-ramean'],
        variants: [
          self::variant('variant-ramean-a-meat-only', 'Hanya Daging', 'hanya-daging', 699000, 10, 12, 'Paket tanpa kompor.', 1),
          self::variant('variant-ramean-a-with-stove', 'Paket Kompor', 'paket-kompor', 779000, 10, 12, 'Termasuk 2 paket kompor.', 2),
        ],
        items: [
          self::item('product-beef-shortplate', 250, 'gram'),
          self::item('product-beef-sirloin', 250, 'gram'),
          self::item('product-beef-saikoro', 250, 'gram'),
          self::item('product-daging-ayam', 500, 'gram'),
          self::item('product-sosis-ayam', 200, 'gram'),
          self::item('product-bakso-ayam', 250, 'gram'),
          self::item('product-bakso-ikan', 200, 'gram'),
          self::item('product-tempura-ikan', 250, 'gram'),
          self::item('product-udang', 150, 'gram'),
          self::item('product-cumi', 150, 'gram'),
          self::item('product-selada', 2, 'pack'),
          self::item('product-bawang-bombay', 2, 'pack'),
          self::item('product-enoki', 2, 'pack'),
          self::item('product-saos-sambal', 2, 'pack'),
          self::item('product-saos-bbq-teriyaki-bulgogi', 2, 'pack'),
          self::item('product-margarin', 2, 'pack'),
        ],
        sortOrder: 1,
        language: $language,
        isFeatured: true
      ),

      self::packageProduct(
        id: 'product-paket-ramean-b',
        nameId: 'Paket Ramean B',
        nameEn: 'Group Package B',
        slugId: 'paket-ramean-b',
        slugEn: 'group-package-b',
        descriptionId: 'Paket BBQ ramean cocok untuk 20 orang.',
        descriptionEn: 'BBQ group package suitable for 20 people.',
        featuredLabelId: 'Ramean',
        featuredLabelEn: 'Group Deal',
        rate: 1149000,
        image: '/images/products/paket-ramean-b.jpg',
        categories: ['cat-package-ramean', 'cat-bbq'],
        badges: ['badge-ramean'],
        variants: [
          self::variant('variant-ramean-b-meat-only', 'Hanya Daging', 'hanya-daging', 1149000, 20, 20, 'Paket tanpa kompor.', 1),
          self::variant('variant-ramean-b-with-stove', 'Paket Kompor', 'paket-kompor', 1269000, 20, 20, 'Termasuk 3 paket kompor.', 2),
        ],
        items: [
          self::item('product-beef-saikoro', 250, 'gram'),
          self::item('product-beef-shortplate', 250, 'gram'),
          self::item('product-beef-sirloin', 250, 'gram'),
          self::item('product-beef-wagyu-meltique', 250, 'gram'),
          self::item('product-daging-ayam', 500, 'gram'),
          self::item('product-sosis-ayam', 400, 'gram'),
          self::item('product-bakso-ayam', 500, 'gram'),
          self::item('product-bakso-ikan', 250, 'gram'),
          self::item('product-tempura-ikan', 250, 'gram'),
          self::item('product-otak-otak-ikan', 250, 'gram'),
          self::item('product-udang', 300, 'gram'),
          self::item('product-cumi', 300, 'gram'),
          self::item('product-selada', 400, 'gram'),
          self::item('product-bawang-bombay', 3, 'pack'),
          self::item('product-enoki', 3, 'pack'),
          self::item('product-saos-sambal', 4, 'pack'),
          self::item('product-saos-bbq', 3, 'pack'),
          self::item('product-saos-teriyaki-bulgogi', 2, 'pack'),
          self::item('product-margarin', 3, 'pack'),
        ],
        sortOrder: 2,
        language: $language,
        isFeatured: true
      ),

      self::packageProduct(
        id: 'product-paket-shortplate-mix',
        nameId: 'Paket Shortplate Mix',
        nameEn: 'Shortplate Mix Package',
        slugId: 'paket-shortplate-mix',
        slugEn: 'shortplate-mix-package',
        descriptionId: 'Paket shortplate mix cocok untuk 2-3 orang.',
        descriptionEn: 'Shortplate mix package suitable for 2-3 people.',
        featuredLabelId: null,
        featuredLabelEn: null,
        rate: 169000,
        image: '/images/products/paket-shortplate-mix.jpg',
        categories: ['cat-package-small', 'cat-bbq'],
        badges: [],
        variants: [
          self::variant('variant-shortplate-mix-meat-only', 'Hanya Daging', 'hanya-daging', 169000, 2, 3, 'Paket tanpa kompor.', 1),
          self::variant('variant-shortplate-mix-with-stove', 'Paket Kompor', 'paket-kompor', 209000, 2, 3, 'Paket dengan kompor.', 2),
        ],
        items: [
          self::item('product-beef-shortplate', 250, 'gram'),
          self::item('product-daging-ayam', 250, 'gram'),
          self::item('product-sosis-ayam', 200, 'gram'),
          self::item('product-selada', 1, 'pack'),
          self::item('product-bawang-bombay', 1, 'pack'),
          self::item('product-margarin', 1, 'pack'),
          self::item('product-saos-sambal-tomat', 1, 'pack'),
        ],
        sortOrder: 3,
        language: $language
      ),

      self::packageProduct(
        id: 'product-paket-shortplate-komplit',
        nameId: 'Paket Shortplate Komplit',
        nameEn: 'Complete Shortplate Package',
        slugId: 'paket-shortplate-komplit',
        slugEn: 'complete-shortplate-package',
        descriptionId: 'Paket shortplate komplit cocok untuk 3-4 orang.',
        descriptionEn: 'Complete shortplate package suitable for 3-4 people.',
        featuredLabelId: null,
        featuredLabelEn: null,
        rate: 209000,
        image: '/images/products/paket-shortplate-komplit.jpg',
        categories: ['cat-package-small', 'cat-bbq'],
        badges: [],
        variants: [
          self::variant('variant-shortplate-komplit-meat-only', 'Hanya Daging', 'hanya-daging', 209000, 3, 4, 'Paket tanpa kompor.', 1),
          self::variant('variant-shortplate-komplit-with-stove', 'Paket Kompor', 'paket-kompor', 249000, 3, 4, 'Paket dengan kompor.', 2),
        ],
        items: [
          self::item('product-beef-shortplate', 250, 'gram'),
          self::item('product-daging-ayam', 250, 'gram'),
          self::item('product-sosis-ayam', 200, 'gram'),
          self::item('product-bakso-ayam', 250, 'gram'),
          self::item('product-selada', 1, 'pack'),
          self::item('product-bawang-bombay', 1, 'pack'),
          self::item('product-margarin', 1, 'pack'),
          self::item('product-saos-sambal-tomat', 1, 'pack'),
        ],
        sortOrder: 4,
        language: $language
      ),

      self::packageProduct(
        id: 'product-paket-bbq-mantap',
        nameId: 'Paket BBQ Mantap',
        nameEn: 'BBQ Mantap Package',
        slugId: 'paket-bbq-mantap',
        slugEn: 'bbq-mantap-package',
        descriptionId: 'Paket BBQ Mantap cocok untuk 3-4 orang.',
        descriptionEn: 'BBQ Mantap package suitable for 3-4 people.',
        featuredLabelId: null,
        featuredLabelEn: null,
        rate: 179000,
        image: '/images/products/paket-bbq-mantap.jpg',
        categories: ['cat-package-small', 'cat-bbq'],
        badges: [],
        variants: [
          self::variant('variant-bbq-mantap-meat-only', 'Hanya Daging', 'hanya-daging', 179000, 3, 4, 'Paket tanpa kompor.', 1),
          self::variant('variant-bbq-mantap-with-stove', 'Paket Kompor', 'paket-kompor', 219000, 3, 4, 'Paket dengan kompor.', 2),
        ],
        items: [
          self::item('product-beef-sirloin', 250, 'gram'),
          self::item('product-daging-ayam', 250, 'gram'),
          self::item('product-sosis-ayam', 200, 'gram'),
          self::item('product-bakso-ayam', 250, 'gram'),
          self::item('product-selada', 1, 'pack'),
          self::item('product-bawang-bombay', 1, 'pack'),
          self::item('product-margarin', 1, 'pack'),
        ],
        sortOrder: 5,
        language: $language
      ),

      self::packageProduct(
        id: 'product-paket-bbq-premium',
        nameId: 'Paket BBQ Premium',
        nameEn: 'Premium BBQ Package',
        slugId: 'paket-bbq-premium',
        slugEn: 'premium-bbq-package',
        descriptionId: 'Paket BBQ Premium cocok untuk 4-5 orang.',
        descriptionEn: 'Premium BBQ package suitable for 4-5 people.',
        featuredLabelId: 'Premium',
        featuredLabelEn: 'Premium',
        rate: 249000,
        image: '/images/products/paket-bbq-premium.jpg',
        categories: ['cat-package-small', 'cat-bbq'],
        badges: ['badge-premium'],
        variants: [
          self::variant('variant-bbq-premium-meat-only', 'Hanya Daging', 'hanya-daging', 249000, 4, 5, 'Paket tanpa kompor.', 1),
          self::variant('variant-bbq-premium-with-stove', 'Paket Kompor', 'paket-kompor', 289000, 4, 5, 'Paket dengan kompor.', 2),
        ],
        items: [
          self::item('product-beef-saikoro', 250, 'gram'),
          self::item('product-beef-sirloin', 250, 'gram'),
          self::item('product-udang', 150, 'gram'),
          self::item('product-daging-ayam', 250, 'gram'),
          self::item('product-selada', 1, 'pack'),
          self::item('product-bawang-bombay', 1, 'pack'),
          self::item('product-margarin', 1, 'pack'),
          self::item('product-saos-sambal-tomat', 1, 'pack'),
        ],
        sortOrder: 6,
        language: $language,
        isFeatured: true
      ),

      self::packageProduct(
        id: 'product-paket-seru',
        nameId: 'Paket Seru',
        nameEn: 'Fun Package',
        slugId: 'paket-seru',
        slugEn: 'fun-package',
        descriptionId: 'Paket seru cocok untuk 2-3 orang.',
        descriptionEn: 'Fun package suitable for 2-3 people.',
        featuredLabelId: null,
        featuredLabelEn: null,
        rate: 109000,
        image: '/images/products/paket-seru.jpg',
        categories: ['cat-package-small', 'cat-grill-suki'],
        badges: [],
        variants: [
          self::variant('variant-paket-seru-meat-only', 'Hanya Daging', 'hanya-daging', 109000, 2, 3, 'Paket tanpa kompor.', 1),
          self::variant('variant-paket-seru-with-stove', 'Paket Kompor', 'paket-kompor', 119000, 2, 3, 'Paket dengan kompor.', 2),
        ],
        items: [
          self::item('product-sosis-ayam', 200, 'gram'),
          self::item('product-bakso-ayam', 250, 'gram'),
          self::item('product-selada', 1, 'pack'),
          self::item('product-bawang-bombay', 1, 'pack'),
          self::item('product-margarin', 1, 'pack'),
          self::item('product-saos-sambal-tomat', 1, 'pack'),
        ],
        sortOrder: 7,
        language: $language
      ),

      self::packageProduct(
        id: 'product-paket-hemat',
        nameId: 'Paket Hemat',
        nameEn: 'Value Package',
        slugId: 'paket-hemat',
        slugEn: 'value-package',
        descriptionId: 'Paket hemat cocok untuk 2-3 orang.',
        descriptionEn: 'Value package suitable for 2-3 people.',
        featuredLabelId: 'Paling Laris',
        featuredLabelEn: 'Best Seller',
        rate: 79000,
        image: '/images/products/paket-hemat.jpg',
        categories: ['cat-package-small', 'cat-grill-suki'],
        badges: ['badge-best-seller'],
        variants: [
          self::variant('variant-paket-hemat-meat-only', 'Hanya Daging', 'hanya-daging', 79000, 2, 3, 'Paket tanpa kompor.', 1),
          self::variant('variant-paket-hemat-with-stove', 'Paket Kompor', 'paket-kompor', 119000, 2, 3, 'Paket dengan kompor.', 2),
        ],
        items: [
          self::item('product-sosis-ayam', 200, 'gram'),
          self::item('product-bakso-ayam', 250, 'gram'),
          self::item('product-selada', 1, 'pack'),
          self::item('product-bawang-bombay', 1, 'pack'),
          self::item('product-margarin', 1, 'pack'),
          self::item('product-saos-sambal-tomat', 1, 'pack'),
        ],
        sortOrder: 8,
        language: $language,
        isFeatured: true
      ),

      self::packageProduct(
        id: 'product-paket-mix-favorit',
        nameId: 'Paket Mix Favorit',
        nameEn: 'Favorite Mix Package',
        slugId: 'paket-mix-favorit',
        slugEn: 'favorite-mix-package',
        descriptionId: 'Paket mix favorit cocok untuk 3-4 orang.',
        descriptionEn: 'Favorite mix package suitable for 3-4 people.',
        featuredLabelId: null,
        featuredLabelEn: null,
        rate: 139000,
        image: '/images/products/paket-mix-favorit.jpg',
        categories: ['cat-package-small', 'cat-grill-suki'],
        badges: [],
        variants: [
          self::variant('variant-paket-mix-favorit-meat-only', 'Hanya Daging', 'hanya-daging', 139000, 3, 4, 'Paket tanpa kompor.', 1),
          self::variant('variant-paket-mix-favorit-with-stove', 'Paket Kompor', 'paket-kompor', 179000, 3, 4, 'Paket dengan kompor.', 2),
        ],
        items: [
          self::item('product-daging-ayam', 250, 'gram'),
          self::item('product-sosis-ayam', 200, 'gram'),
          self::item('product-tempura-ikan', 250, 'gram'),
          self::item('product-bakso-ikan', 200, 'gram'),
          self::item('product-selada', 1, 'pack'),
          self::item('product-bawang-bombay', 1, 'pack'),
          self::item('product-margarin', 1, 'pack'),
          self::item('product-saos-sambal-tomat', 1, 'pack'),
        ],
        sortOrder: 9,
        language: $language
      ),

      self::alacarte('product-daging-ayam', 'Daging Ayam', 'Chicken Meat', 'daging-ayam', 'chicken-meat', 30000, '250 gram', ['cat-meat'], 101, $language),
      self::alacarte('product-sosis-ayam', 'Sosis Ayam', 'Chicken Sausage', 'sosis-ayam', 'chicken-sausage', 20000, '200 gram', ['cat-meat'], 102, $language),
      self::alacarte('product-bakso-ayam', 'Bakso Ayam', 'Chicken Meatball', 'bakso-ayam', 'chicken-meatball', 25000, '250 gram', ['cat-meat'], 103, $language),
      self::alacarte('product-bakso-ikan', 'Bakso Ikan', 'Fish Meatball', 'bakso-ikan', 'fish-meatball', 30000, '200 gram', ['cat-seafood'], 104, $language),
      self::alacarte('product-sate-bakso-sosis', 'Sate Bakso Sosis', 'Meatball Sausage Skewer', 'sate-bakso-sosis', 'meatball-sausage-skewer', 28000, '10 tusuk', ['cat-meat'], 105, $language),
      self::alacarte('product-cumi', 'Cumi-cumi', 'Squid', 'cumi-cumi', 'squid', 37000, '150 gram', ['cat-seafood'], 106, $language),
      self::alacarte('product-tempura-ikan', 'Tempura Ikan', 'Fish Tempura', 'tempura-ikan', 'fish-tempura', 25000, '250 gram', ['cat-seafood'], 107, $language),
      self::alacarte('product-otak-otak-ikan', 'Otak-otak Ikan', 'Fish Cake', 'otak-otak-ikan', 'fish-cake', 25000, '200 gram', ['cat-seafood'], 108, $language),
      self::alacarte('product-ham-sapi', 'Ham Sapi', 'Beef Ham', 'ham-sapi', 'beef-ham', 26000, '250 gram', ['cat-meat'], 109, $language),
      self::alacarte('product-udang', 'Udang', 'Shrimp', 'udang', 'shrimp', 38000, '150 gram', ['cat-seafood'], 110, $language),
      self::alacarte('product-beef-saikoro', 'Beef Saikoro', 'Beef Saikoro', 'beef-saikoro', 'beef-saikoro', 77000, '250 gram', ['cat-meat'], 111, $language),
      self::alacarte('product-beef-shortplate', 'Beef Shortplate', 'Beef Shortplate', 'beef-shortplate', 'beef-shortplate', 77000, '250 gram', ['cat-meat'], 112, $language),
      self::alacarte('product-beef-sirloin', 'Beef Sirloin', 'Beef Sirloin', 'beef-sirloin', 'beef-sirloin', 65000, '250 gram', ['cat-meat'], 113, $language),
      self::alacarte('product-beef-wagyu-meltique', 'Beef Wagyu Meltique', 'Beef Wagyu Meltique', 'beef-wagyu-meltique', 'beef-wagyu-meltique', 77000, '250 gram', ['cat-meat'], 114, $language),
      self::alacarte('product-bawang-bombay', 'Bawang Bombay', 'Onion', 'bawang-bombay', 'onion', 10000, null, ['cat-vegetable'], 115, $language),
      self::alacarte('product-selada', 'Selada', 'Lettuce', 'selada', 'lettuce', 10000, null, ['cat-vegetable'], 116, $language),
      self::alacarte('product-enoki', 'Enoki', 'Enoki Mushroom', 'enoki', 'enoki-mushroom', 10000, '2 pax', ['cat-vegetable'], 117, $language),
      self::alacarte('product-bihun', 'Bihun', 'Rice Vermicelli', 'bihun', 'rice-vermicelli', 12000, '200 gram', ['cat-grill-suki'], 118, $language),
      self::alacarte('product-mie-kuning', 'Mie Kuning', 'Yellow Noodles', 'mie-kuning', 'yellow-noodles', 12000, '200 gram', ['cat-grill-suki'], 119, $language),
      self::alacarte('product-pasta-tomyam', 'Pasta Tomyam', 'Tom Yum Paste', 'pasta-tomyam', 'tom-yum-paste', 20000, '60 gram', ['cat-sauce'], 120, $language),
      self::alacarte('product-kaldu-ayam', 'Kaldu Ayam', 'Chicken Broth', 'kaldu-ayam', 'chicken-broth', 25000, '1 liter', ['cat-sauce'], 121, $language),
      self::alacarte('product-saos-sambal', 'Saos Sambal', 'Chili Sauce', 'saos-sambal', 'chili-sauce', 7000, '100 ml', ['cat-sauce'], 122, $language),
      self::alacarte('product-saos-sambal-tomat', 'Saos Sambal + Tomat', 'Chili Sauce + Tomato Sauce', 'saos-sambal-tomat', 'chili-tomato-sauce', 7000, '100 ml', ['cat-sauce'], 123, $language),
      self::alacarte('product-saos-bbq', 'Saos BBQ', 'BBQ Sauce', 'saos-bbq', 'bbq-sauce', 10000, '100 ml', ['cat-sauce'], 124, $language),
      self::alacarte('product-saos-teriyaki-bulgogi', 'Saos Teriyaki / Bulgogi', 'Teriyaki / Bulgogi Sauce', 'saos-teriyaki-bulgogi', 'teriyaki-bulgogi-sauce', 10000, '100 ml', ['cat-sauce'], 125, $language),
      self::alacarte('product-saos-bbq-teriyaki-bulgogi', 'Saos BBQ / Bulgogi / Teriyaki', 'BBQ / Bulgogi / Teriyaki Sauce', 'saos-bbq-bulgogi-teriyaki', 'bbq-bulgogi-teriyaki-sauce', 10000, '100 ml', ['cat-sauce'], 126, $language),
      self::alacarte('product-margarin', 'Margarin', 'Margarine', 'margarin', 'margarine', 5000, null, ['cat-sauce'], 127, $language),

      self::equipment('product-kompor', 'Kompor', 'Stove', 'kompor', 'stove', 25000, ['cat-equipment'], 201, $language),
      self::equipment('product-pan-grill-bulat', 'Pan Grill Bulat', 'Round Grill Pan', 'pan-grill-bulat', 'round-grill-pan', 15000, ['cat-equipment'], 202, $language),
      self::equipment('product-pan-grill-kotak', 'Pan Grill Kotak', 'Square Grill Pan', 'pan-grill-kotak', 'square-grill-pan', 20000, ['cat-equipment'], 203, $language),
      self::equipment('product-panci-suki', 'Panci Suki', 'Suki Pot', 'panci-suki', 'suki-pot', 20000, ['cat-equipment'], 204, $language),
      self::equipment('product-mangkok-sedang', 'Mangkok Sedang', 'Medium Bowl', 'mangkok-sedang', 'medium-bowl', 5000, ['cat-equipment'], 205, $language),
      self::equipment('product-mangkok-kecil', 'Mangkok Kecil', 'Small Bowl', 'mangkok-kecil', 'small-bowl', 3000, ['cat-equipment'], 206, $language),
      self::equipment('product-sumpit', 'Sumpit', 'Chopsticks', 'sumpit', 'chopsticks', 2000, ['cat-equipment'], 207, $language),
      self::equipment('product-capitan', 'Capitan', 'Food Tongs', 'capitan', 'food-tongs', 5000, ['cat-equipment'], 208, $language),
      self::equipment('product-sendok-kuah-set', 'Sendok Kuah Set', 'Soup Spoon Set', 'sendok-kuah-set', 'soup-spoon-set', 10000, ['cat-equipment'], 209, $language),
      self::equipment('product-gas-kaleng-beli', 'Gas Kaleng Beli', 'Gas Canister Purchase', 'gas-kaleng-beli', 'gas-canister-purchase', 25000, ['cat-equipment'], 210, $language),
      self::equipment('product-tikar-uk-150x200', 'Tikar UK 150 x 200', 'Mat Size 150 x 200', 'tikar-uk-150x200', 'mat-size-150x200', 15000, ['cat-equipment'], 211, $language),
      self::equipment('product-sendok-ramen', 'Sendok Ramen', 'Ramen Spoon', 'sendok-ramen', 'ramen-spoon', 3000, ['cat-equipment'], 212, $language),
    ]);

    $products = $products->map(function ($product) use ($types, $categories, $badges) {
      $type = $types->firstWhere('id', $product['type_id']);

      $productCategories = $categories
        ->whereIn('id', $product['categories'] ?? [])
        ->values();

      $productBadges = $badges
        ->whereIn('id', $product['badges'] ?? [])
        ->values();

      return array_merge($product, [
        'type' => $type,
        'categories_data' => $productCategories,
        'badges_data' => $productBadges,
      ]);
    });

    $productCategories = $products
      ->flatMap(function ($product) {
        return collect($product['categories'] ?? [])
          ->map(function ($categoryId) use ($product) {
            return [
              'product_id' => $product['id'],
              'category_id' => $categoryId,
            ];
          });
      })
      ->values();

    $productBadges = $products
      ->flatMap(function ($product) {
        return collect($product['badges'] ?? [])
          ->map(function ($badgeId) use ($product) {
            return [
              'product_id' => $product['id'],
              'badge_id' => $badgeId,
            ];
          });
      })
      ->values();

    $productVariants = $products
      ->flatMap(function ($product) {
        return collect($product['variants'] ?? [])
          ->map(function ($variant) use ($product) {
            return array_merge($variant, [
              'product_id' => $product['id'],
            ]);
          });
      })
      ->values();

    $packageItems = $products
      ->where('type_id', 'type-package')
      ->flatMap(function ($package) {
        return collect($package['items'] ?? [])
          ->values()
          ->map(function ($item, $index) use ($package) {
            return [
              'id' => 'package-item-' . $package['id'] . '-' . $item['product_id'],
              'package_id' => $package['id'],
              'product_id' => $item['product_id'],
              'qty' => $item['qty'],
              'unit' => $item['unit'],
              'sort_order' => $index + 1,
            ];
          });
      })
      ->values();

    $languageContents = collect([
      [
        'id' => 'content-landing-hero-title',
        'group' => 'landing',
        'language' => $language,
        'key' => 'hero_title',
        'value' => $language === 'en'
          ? 'Practical Grill Rental for Your Event'
          : 'Sewa Grill Praktis Untuk Acara Kamu',
      ],
      [
        'id' => 'content-landing-hero-subtitle',
        'group' => 'landing',
        'language' => $language,
        'key' => 'hero_subtitle',
        'value' => $language === 'en'
          ? 'Choose BBQ packages, grill, suki, or add a la carte menus as needed.'
          : 'Pilih paket BBQ, grill, suki, atau tambah menu ala carte sesuai kebutuhan.',
      ],
      [
        'id' => 'content-contact-whatsapp',
        'group' => 'contact',
        'language' => $language,
        'key' => 'whatsapp',
        'value' => '081337467442',
      ],
      [
        'id' => 'content-social-instagram',
        'group' => 'social',
        'language' => $language,
        'key' => 'instagram',
        'value' => '@kelanagrill',
      ],
      [
        'id' => 'content-social-tiktok',
        'group' => 'social',
        'language' => $language,
        'key' => 'tiktok',
        'value' => '@kelana.grill',
      ],
      [
        'id' => 'content-note-addon',
        'group' => 'note',
        'language' => $language,
        'key' => 'addon_minimum',
        'value' => $language === 'en'
          ? 'Minimum purchase of 4 meat packs, variants can be mixed if without BBQ package purchase.'
          : 'Minimal pembelian 4 pack daging boleh mix varian jika tanpa pembelian paket BBQ.',
      ],
      [
        'id' => 'content-note-equipment',
        'group' => 'note',
        'language' => $language,
        'key' => 'equipment_duration',
        'value' => $language === 'en'
          ? 'Equipment rental price is valid for 24 hours.'
          : 'Harga alat berlaku untuk 1x24 jam.',
      ],
    ]);

    return collect([
      'locale' => $language,
      'types' => $types,
      'categories' => $categories,
      'badges' => $badges,
      'products' => $products,
      'product_categories' => $productCategories,
      'product_badges' => $productBadges,
      'product_variants' => $productVariants,
      'package_items' => $packageItems,
      'language_contents' => $languageContents,
    ]);
  }

  private static function packageProduct(
    string $id,
    string $nameId,
    string $nameEn,
    string $slugId,
    string $slugEn,
    string $descriptionId,
    string $descriptionEn,
    ?string $featuredLabelId,
    ?string $featuredLabelEn,
    int $rate,
    string $image,
    array $categories,
    array $badges,
    array $variants,
    array $items,
    int $sortOrder,
    string $language,
    bool $isFeatured = false,
    bool $isNew = false,
    bool $isActive = true
  ): array {
    $translations = [
      'id' => [
        'language' => 'id',
        'name' => $nameId,
        'slug' => $slugId,
        'description' => $descriptionId,
        'featured_label' => $featuredLabelId,
      ],
      'en' => [
        'language' => 'en',
        'name' => $nameEn,
        'slug' => $slugEn,
        'description' => $descriptionEn,
        'featured_label' => $featuredLabelEn,
      ],
    ];

    return [
      'id' => $id,
      'type_id' => 'type-package',
      'rate' => $rate,
      'is_featured' => $isFeatured,
      'is_new' => $isNew,
      'is_active' => $isActive,
      'image' => $image,
      'sort_order' => $sortOrder,
      'translations' => $translations,
      'translation' => self::pickTranslation($translations, $language),
      'categories' => $categories,
      'badges' => $badges,
      'variants' => $variants,
      'items' => $items,
    ];
  }

  private static function alacarte(
    string $id,
    string $nameId,
    string $nameEn,
    string $slugId,
    string $slugEn,
    int $rate,
    ?string $portion,
    array $categories,
    int $sortOrder,
    string $language
  ): array {
    $translations = [
      'id' => [
        'language' => 'id',
        'name' => $nameId,
        'slug' => $slugId,
        'description' => $portion ? $nameId . ' ukuran ' . $portion . '.' : $nameId . '.',
        'featured_label' => null,
      ],
      'en' => [
        'language' => 'en',
        'name' => $nameEn,
        'slug' => $slugEn,
        'description' => $portion ? $nameEn . ' size ' . $portion . '.' : $nameEn . '.',
        'featured_label' => null,
      ],
    ];

    return [
      'id' => $id,
      'type_id' => 'type-alacarte',
      'rate' => $rate,
      'is_featured' => false,
      'is_new' => false,
      'is_active' => true,
      'image' => '/images/products/' . $slugId . '.jpg',
      'sort_order' => $sortOrder,
      'translations' => $translations,
      'translation' => self::pickTranslation($translations, $language),
      'categories' => $categories,
      'badges' => ['badge-add-on'],
      'variants' => [
        self::variant(
          id: 'variant-' . $slugId,
          name: $portion ?: 'Default',
          slug: $slugId,
          rate: $rate,
          minPerson: null,
          maxPerson: null,
          description: $portion,
          sortOrder: 1
        ),
      ],
      'items' => [],
    ];
  }

  private static function equipment(
    string $id,
    string $nameId,
    string $nameEn,
    string $slugId,
    string $slugEn,
    int $rate,
    array $categories,
    int $sortOrder,
    string $language
  ): array {
    $translations = [
      'id' => [
        'language' => 'id',
        'name' => $nameId,
        'slug' => $slugId,
        'description' => 'Sewa ' . strtolower($nameId) . ' untuk kebutuhan grill.',
        'featured_label' => null,
      ],
      'en' => [
        'language' => 'en',
        'name' => $nameEn,
        'slug' => $slugEn,
        'description' => 'Rent ' . strtolower($nameEn) . ' for your grill needs.',
        'featured_label' => null,
      ],
    ];

    return [
      'id' => $id,
      'type_id' => 'type-equipment',
      'rate' => $rate,
      'is_featured' => false,
      'is_new' => false,
      'is_active' => true,
      'image' => '/images/products/' . $slugId . '.jpg',
      'sort_order' => $sortOrder,
      'translations' => $translations,
      'translation' => self::pickTranslation($translations, $language),
      'categories' => $categories,
      'badges' => [],
      'variants' => [
        self::variant(
          id: 'variant-' . $slugId,
          name: $language === 'en' ? '24 Hours' : '1x24 Jam',
          slug: $slugId,
          rate: $rate,
          minPerson: null,
          maxPerson: null,
          description: $language === 'en'
            ? 'Price is valid for 24 hours.'
            : 'Harga berlaku untuk 1x24 jam.',
          sortOrder: 1
        ),
      ],
      'items' => [],
    ];
  }

  private static function variant(
    string $id,
    string $name,
    string $slug,
    int $rate,
    ?int $minPerson,
    ?int $maxPerson,
    ?string $description,
    int $sortOrder
  ): array {
    return [
      'id' => $id,
      'name' => $name,
      'slug' => $slug,
      'rate' => $rate,
      'min_person' => $minPerson,
      'max_person' => $maxPerson,
      'description' => $description,
      'sort_order' => $sortOrder,
      'is_active' => true,
    ];
  }

  private static function item(
    string $productId,
    int|float $qty,
    string $unit
  ): array {
    return [
      'product_id' => $productId,
      'qty' => $qty,
      'unit' => $unit,
    ];
  }

  private static function pickTranslation(array $translations, string $language = 'id'): array
  {
    return $translations[$language] ?? $translations['id'];
  }
}
