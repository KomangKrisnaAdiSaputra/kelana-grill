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

    /*
        |--------------------------------------------------------------------------
        | TYPES
        |--------------------------------------------------------------------------
        | Type tidak pakai translation.
        */

    $types = collect([
      [
        'id' => 'type-package',
        'name' => 'Package',
        'slug' => 'package',
        'sort_order' => 1,
        'active' => true,
      ],
      [
        'id' => 'type-alacarte',
        'name' => 'Ala Carte',
        'slug' => 'alacarte',
        'sort_order' => 2,
        'active' => true,
      ],
      [
        'id' => 'type-equipment',
        'name' => 'Equipment',
        'slug' => 'equipment',
        'sort_order' => 3,
        'active' => true,
      ],
    ]);

    /*
        |--------------------------------------------------------------------------
        | CATEGORIES
        |--------------------------------------------------------------------------
        */

    $categories = collect([
      [
        'id' => 'cat-package-ramean',
        'sort_order' => 1,
        'active' => true,
      ],
      [
        'id' => 'cat-package-small',
        'sort_order' => 2,
        'active' => true,
      ],
      [
        'id' => 'cat-bbq',
        'sort_order' => 3,
        'active' => true,
      ],
      [
        'id' => 'cat-grill-suki',
        'sort_order' => 4,
        'active' => true,
      ],
      [
        'id' => 'cat-meat',
        'sort_order' => 5,
        'active' => true,
      ],
      [
        'id' => 'cat-seafood',
        'sort_order' => 6,
        'active' => true,
      ],
      [
        'id' => 'cat-vegetable',
        'sort_order' => 7,
        'active' => true,
      ],
      [
        'id' => 'cat-sauce',
        'sort_order' => 8,
        'active' => true,
      ],
      [
        'id' => 'cat-equipment',
        'sort_order' => 9,
        'active' => true,
      ],
    ]);

    $categoryTranslations = collect([
      self::categoryTranslation('cat-package-ramean', 'id', 'Paket Ramean', 'paket-ramean'),
      self::categoryTranslation('cat-package-ramean', 'en', 'Group Package', 'group-package'),

      self::categoryTranslation('cat-package-small', 'id', 'Paket Kecil', 'paket-kecil'),
      self::categoryTranslation('cat-package-small', 'en', 'Small Package', 'small-package'),

      self::categoryTranslation('cat-bbq', 'id', 'BBQ', 'bbq'),
      self::categoryTranslation('cat-bbq', 'en', 'BBQ', 'bbq'),

      self::categoryTranslation('cat-grill-suki', 'id', 'Grill & Suki', 'grill-suki'),
      self::categoryTranslation('cat-grill-suki', 'en', 'Grill & Suki', 'grill-suki'),

      self::categoryTranslation('cat-meat', 'id', 'Daging', 'daging'),
      self::categoryTranslation('cat-meat', 'en', 'Meat', 'meat'),

      self::categoryTranslation('cat-seafood', 'id', 'Seafood', 'seafood'),
      self::categoryTranslation('cat-seafood', 'en', 'Seafood', 'seafood'),

      self::categoryTranslation('cat-vegetable', 'id', 'Sayuran', 'sayuran'),
      self::categoryTranslation('cat-vegetable', 'en', 'Vegetables', 'vegetables'),

      self::categoryTranslation('cat-sauce', 'id', 'Saus & Bumbu', 'saus-bumbu'),
      self::categoryTranslation('cat-sauce', 'en', 'Sauces & Seasoning', 'sauces-seasoning'),

      self::categoryTranslation('cat-equipment', 'id', 'Alat Grill', 'alat-grill'),
      self::categoryTranslation('cat-equipment', 'en', 'Grill Equipment', 'grill-equipment'),
    ]);

    /*
        |--------------------------------------------------------------------------
        | BADGES
        |--------------------------------------------------------------------------
        */

    $badges = collect([
      [
        'id' => 'badge-best-seller',
        'sort_order' => 1,
        'active' => true,
      ],
      [
        'id' => 'badge-ramean',
        'sort_order' => 2,
        'active' => true,
      ],
      [
        'id' => 'badge-premium',
        'sort_order' => 3,
        'active' => true,
      ],
      [
        'id' => 'badge-add-on',
        'sort_order' => 4,
        'active' => true,
      ],
    ]);

    $badgeTranslations = collect([
      self::badgeTranslation('badge-best-seller', 'id', 'Paling Laris', 'paling-laris'),
      self::badgeTranslation('badge-best-seller', 'en', 'Best Seller', 'best-seller'),

      self::badgeTranslation('badge-ramean', 'id', 'Ramean', 'ramean'),
      self::badgeTranslation('badge-ramean', 'en', 'Group Deal', 'group-deal'),

      self::badgeTranslation('badge-premium', 'id', 'Premium', 'premium'),
      self::badgeTranslation('badge-premium', 'en', 'Premium', 'premium'),

      self::badgeTranslation('badge-add-on', 'id', 'Add On', 'add-on'),
      self::badgeTranslation('badge-add-on', 'en', 'Add On', 'add-on'),
    ]);

    /*
        |--------------------------------------------------------------------------
        | PRODUCTS
        |--------------------------------------------------------------------------
        | Product utama tidak simpan name/slug/description.
        */

    $products = collect([
      /*
            |--------------------------------------------------------------------------
            | PACKAGES
            |--------------------------------------------------------------------------
            */

      self::product('product-paket-ramean-a', 'type-package', 699000, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop', 1, true, false),
      self::product('product-paket-ramean-b', 'type-package', 1149000, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop', 2, true, false),
      self::product('product-paket-shortplate-mix', 'type-package', 169000, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop', 3),
      self::product('product-paket-shortplate-komplit', 'type-package', 209000, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop', 4),
      self::product('product-paket-bbq-mantap', 'type-package', 179000, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop', 5),
      self::product('product-paket-bbq-premium', 'type-package', 249000, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop', 6, true, false),
      self::product('product-paket-seru', 'type-package', 109000, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop', 7),
      self::product('product-paket-hemat', 'type-package', 79000, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop', 8, true, false),
      self::product('product-paket-mix-favorit', 'type-package', 139000, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1600&auto=format&fit=crop', 9),

      /*
            |--------------------------------------------------------------------------
            | ALA CARTE
            |--------------------------------------------------------------------------
            */

      self::product('product-daging-ayam', 'type-alacarte', 30000, '/images/products/daging-ayam.jpg', 101, false, false),
      self::product('product-sosis-ayam', 'type-alacarte', 20000, '/images/products/sosis-ayam.jpg', 102, false, false),
      self::product('product-bakso-ayam', 'type-alacarte', 25000, '/images/products/bakso-ayam.jpg', 103, false, false),
      self::product('product-bakso-ikan', 'type-alacarte', 30000, '/images/products/bakso-ikan.jpg', 104, false, false),
      self::product('product-sate-bakso-sosis', 'type-alacarte', 28000, '/images/products/sate-bakso-sosis.jpg', 105, false, false),
      self::product('product-cumi', 'type-alacarte', 37000, '/images/products/cumi-cumi.jpg', 106, false, false),
      self::product('product-tempura-ikan', 'type-alacarte', 25000, '/images/products/tempura-ikan.jpg', 107, false, false),
      self::product('product-otak-otak-ikan', 'type-alacarte', 25000, '/images/products/otak-otak-ikan.jpg', 108, false, false),
      self::product('product-ham-sapi', 'type-alacarte', 26000, '/images/products/ham-sapi.jpg', 109, false, false),
      self::product('product-udang', 'type-alacarte', 38000, '/images/products/udang.jpg', 110, false, false),
      self::product('product-beef-saikoro', 'type-alacarte', 77000, '/images/products/beef-saikoro.jpg', 111, false, false),
      self::product('product-beef-shortplate', 'type-alacarte', 77000, '/images/products/beef-shortplate.jpg', 112, false, false),
      self::product('product-beef-sirloin', 'type-alacarte', 65000, '/images/products/beef-sirloin.jpg', 113, false, false),
      self::product('product-beef-wagyu-meltique', 'type-alacarte', 77000, '/images/products/beef-wagyu-meltique.jpg', 114, false, false),
      self::product('product-bawang-bombay', 'type-alacarte', 10000, '/images/products/bawang-bombay.jpg', 115, false, false),
      self::product('product-selada', 'type-alacarte', 10000, '/images/products/selada.jpg', 116, false, false),
      self::product('product-enoki', 'type-alacarte', 10000, '/images/products/enoki.jpg', 117, false, false),
      self::product('product-bihun', 'type-alacarte', 12000, '/images/products/bihun.jpg', 118, false, false),
      self::product('product-mie-kuning', 'type-alacarte', 12000, '/images/products/mie-kuning.jpg', 119, false, false),
      self::product('product-pasta-tomyam', 'type-alacarte', 20000, '/images/products/pasta-tomyam.jpg', 120, false, false),
      self::product('product-kaldu-ayam', 'type-alacarte', 25000, '/images/products/kaldu-ayam.jpg', 121, false, false),
      self::product('product-saos-sambal', 'type-alacarte', 7000, '/images/products/saos-sambal.jpg', 122, false, false),
      self::product('product-saos-sambal-tomat', 'type-alacarte', 7000, '/images/products/saos-sambal-tomat.jpg', 123, false, false),
      self::product('product-saos-bbq', 'type-alacarte', 10000, '/images/products/saos-bbq.jpg', 124, false, false),
      self::product('product-saos-teriyaki-bulgogi', 'type-alacarte', 10000, '/images/products/saos-teriyaki-bulgogi.jpg', 125, false, false),
      self::product('product-saos-bbq-teriyaki-bulgogi', 'type-alacarte', 10000, '/images/products/saos-bbq-bulgogi-teriyaki.jpg', 126, false, false),
      self::product('product-margarin', 'type-alacarte', 5000, '/images/products/margarin.jpg', 127, false, false),

      /*
            |--------------------------------------------------------------------------
            | EQUIPMENT
            |--------------------------------------------------------------------------
            */

      self::product('product-kompor', 'type-equipment', 25000, '/images/products/kompor.jpg', 201, false, false),
      self::product('product-pan-grill-bulat', 'type-equipment', 15000, '/images/products/pan-grill-bulat.jpg', 202, false, false),
      self::product('product-pan-grill-kotak', 'type-equipment', 20000, '/images/products/pan-grill-kotak.jpg', 203, false, false),
      self::product('product-panci-suki', 'type-equipment', 20000, '/images/products/panci-suki.jpg', 204, false, false),
      self::product('product-mangkok-sedang', 'type-equipment', 5000, '/images/products/mangkok-sedang.jpg', 205, false, false),
      self::product('product-mangkok-kecil', 'type-equipment', 3000, '/images/products/mangkok-kecil.jpg', 206, false, false),
      self::product('product-sumpit', 'type-equipment', 2000, '/images/products/sumpit.jpg', 207, false, false),
      self::product('product-capitan', 'type-equipment', 5000, '/images/products/capitan.jpg', 208, false, false),
      self::product('product-sendok-kuah-set', 'type-equipment', 10000, '/images/products/sendok-kuah-set.jpg', 209, false, false),
      self::product('product-gas-kaleng-beli', 'type-equipment', 25000, '/images/products/gas-kaleng-beli.jpg', 210, false, false),
      self::product('product-tikar-uk-150x200', 'type-equipment', 15000, '/images/products/tikar-uk-150x200.jpg', 211, false, false),
      self::product('product-sendok-ramen', 'type-equipment', 3000, '/images/products/sendok-ramen.jpg', 212, false, false),
    ]);

    /*
        |--------------------------------------------------------------------------
        | PRODUCT TRANSLATIONS
        |--------------------------------------------------------------------------
        */

    $productTranslations = collect([
      /*
            |--------------------------------------------------------------------------
            | PACKAGE TRANSLATIONS
            |--------------------------------------------------------------------------
            */

      self::productTranslation('product-paket-ramean-a', 'id', 'Paket Ramean A', 'paket-ramean-a', 'Paket BBQ ramean cocok untuk 10-12 orang.', 'Ramean'),
      self::productTranslation('product-paket-ramean-a', 'en', 'Group Package A', 'group-package-a', 'BBQ group package suitable for 10-12 people.', 'Group Deal'),

      self::productTranslation('product-paket-ramean-b', 'id', 'Paket Ramean B', 'paket-ramean-b', 'Paket BBQ ramean cocok untuk 20 orang.', 'Ramean'),
      self::productTranslation('product-paket-ramean-b', 'en', 'Group Package B', 'group-package-b', 'BBQ group package suitable for 20 people.', 'Group Deal'),

      self::productTranslation('product-paket-shortplate-mix', 'id', 'Paket Shortplate Mix', 'paket-shortplate-mix', 'Paket Shortplate Mix cocok untuk 2-3 orang.'),
      self::productTranslation('product-paket-shortplate-mix', 'en', 'Shortplate Mix Package', 'shortplate-mix-package', 'Shortplate Mix package suitable for 2-3 people.'),

      self::productTranslation('product-paket-shortplate-komplit', 'id', 'Paket Shortplate Komplit', 'paket-shortplate-komplit', 'Paket Shortplate Komplit cocok untuk 3-4 orang.'),
      self::productTranslation('product-paket-shortplate-komplit', 'en', 'Complete Shortplate Package', 'complete-shortplate-package', 'Complete Shortplate package suitable for 3-4 people.'),

      self::productTranslation('product-paket-bbq-mantap', 'id', 'Paket BBQ Mantap', 'paket-bbq-mantap', 'Paket BBQ Mantap cocok untuk 3-4 orang.'),
      self::productTranslation('product-paket-bbq-mantap', 'en', 'BBQ Mantap Package', 'bbq-mantap-package', 'BBQ Mantap package suitable for 3-4 people.'),

      self::productTranslation('product-paket-bbq-premium', 'id', 'Paket BBQ Premium', 'paket-bbq-premium', 'Paket BBQ Premium cocok untuk 4-5 orang.', 'Premium'),
      self::productTranslation('product-paket-bbq-premium', 'en', 'Premium BBQ Package', 'premium-bbq-package', 'Premium BBQ package suitable for 4-5 people.', 'Premium'),

      self::productTranslation('product-paket-seru', 'id', 'Paket Seru', 'paket-seru', 'Paket Seru cocok untuk 2-3 orang.'),
      self::productTranslation('product-paket-seru', 'en', 'Fun Package', 'fun-package', 'Fun package suitable for 2-3 people.'),

      self::productTranslation('product-paket-hemat', 'id', 'Paket Hemat', 'paket-hemat', 'Paket Hemat cocok untuk 2-3 orang.', 'Paling Laris'),
      self::productTranslation('product-paket-hemat', 'en', 'Value Package', 'value-package', 'Value package suitable for 2-3 people.', 'Best Seller'),

      self::productTranslation('product-paket-mix-favorit', 'id', 'Paket Mix Favorit', 'paket-mix-favorit', 'Paket Mix Favorit cocok untuk 3-4 orang.'),
      self::productTranslation('product-paket-mix-favorit', 'en', 'Favorite Mix Package', 'favorite-mix-package', 'Favorite Mix package suitable for 3-4 people.'),

      /*
            |--------------------------------------------------------------------------
            | ALA CARTE TRANSLATIONS
            |--------------------------------------------------------------------------
            */

      self::productTranslation('product-daging-ayam', 'id', 'Daging Ayam', 'daging-ayam', 'Daging ayam ukuran 250 gram.'),
      self::productTranslation('product-daging-ayam', 'en', 'Chicken Meat', 'chicken-meat', 'Chicken meat size 250 gram.'),

      self::productTranslation('product-sosis-ayam', 'id', 'Sosis Ayam', 'sosis-ayam', 'Sosis ayam ukuran 200 gram.'),
      self::productTranslation('product-sosis-ayam', 'en', 'Chicken Sausage', 'chicken-sausage', 'Chicken sausage size 200 gram.'),

      self::productTranslation('product-bakso-ayam', 'id', 'Bakso Ayam', 'bakso-ayam', 'Bakso ayam ukuran 250 gram.'),
      self::productTranslation('product-bakso-ayam', 'en', 'Chicken Meatball', 'chicken-meatball', 'Chicken meatball size 250 gram.'),

      self::productTranslation('product-bakso-ikan', 'id', 'Bakso Ikan', 'bakso-ikan', 'Bakso ikan ukuran 200 gram.'),
      self::productTranslation('product-bakso-ikan', 'en', 'Fish Meatball', 'fish-meatball', 'Fish meatball size 200 gram.'),

      self::productTranslation('product-sate-bakso-sosis', 'id', 'Sate Bakso Sosis', 'sate-bakso-sosis', 'Sate bakso sosis isi 10 tusuk.'),
      self::productTranslation('product-sate-bakso-sosis', 'en', 'Meatball Sausage Skewer', 'meatball-sausage-skewer', 'Meatball sausage skewer contains 10 skewers.'),

      self::productTranslation('product-cumi', 'id', 'Cumi-cumi', 'cumi-cumi', 'Cumi-cumi ukuran 150 gram.'),
      self::productTranslation('product-cumi', 'en', 'Squid', 'squid', 'Squid size 150 gram.'),

      self::productTranslation('product-tempura-ikan', 'id', 'Tempura Ikan', 'tempura-ikan', 'Tempura ikan ukuran 250 gram.'),
      self::productTranslation('product-tempura-ikan', 'en', 'Fish Tempura', 'fish-tempura', 'Fish tempura size 250 gram.'),

      self::productTranslation('product-otak-otak-ikan', 'id', 'Otak-otak Ikan', 'otak-otak-ikan', 'Otak-otak ikan ukuran 200 gram.'),
      self::productTranslation('product-otak-otak-ikan', 'en', 'Fish Cake', 'fish-cake', 'Fish cake size 200 gram.'),

      self::productTranslation('product-ham-sapi', 'id', 'Ham Sapi', 'ham-sapi', 'Ham sapi ukuran 250 gram.'),
      self::productTranslation('product-ham-sapi', 'en', 'Beef Ham', 'beef-ham', 'Beef ham size 250 gram.'),

      self::productTranslation('product-udang', 'id', 'Udang', 'udang', 'Udang ukuran 150 gram.'),
      self::productTranslation('product-udang', 'en', 'Shrimp', 'shrimp', 'Shrimp size 150 gram.'),

      self::productTranslation('product-beef-saikoro', 'id', 'Beef Saikoro', 'beef-saikoro', 'Beef saikoro ukuran 250 gram.'),
      self::productTranslation('product-beef-saikoro', 'en', 'Beef Saikoro', 'beef-saikoro', 'Beef saikoro size 250 gram.'),

      self::productTranslation('product-beef-shortplate', 'id', 'Beef Shortplate', 'beef-shortplate', 'Beef shortplate ukuran 250 gram.'),
      self::productTranslation('product-beef-shortplate', 'en', 'Beef Shortplate', 'beef-shortplate', 'Beef shortplate size 250 gram.'),

      self::productTranslation('product-beef-sirloin', 'id', 'Beef Sirloin', 'beef-sirloin', 'Beef sirloin ukuran 250 gram.'),
      self::productTranslation('product-beef-sirloin', 'en', 'Beef Sirloin', 'beef-sirloin', 'Beef sirloin size 250 gram.'),

      self::productTranslation('product-beef-wagyu-meltique', 'id', 'Beef Wagyu Meltique', 'beef-wagyu-meltique', 'Beef wagyu meltique ukuran 250 gram.'),
      self::productTranslation('product-beef-wagyu-meltique', 'en', 'Beef Wagyu Meltique', 'beef-wagyu-meltique', 'Beef wagyu meltique size 250 gram.'),

      self::productTranslation('product-bawang-bombay', 'id', 'Bawang Bombay', 'bawang-bombay', 'Bawang bombay untuk pelengkap grill.'),
      self::productTranslation('product-bawang-bombay', 'en', 'Onion', 'onion', 'Onion for grill side dish.'),

      self::productTranslation('product-selada', 'id', 'Selada', 'selada', 'Selada untuk pelengkap grill.'),
      self::productTranslation('product-selada', 'en', 'Lettuce', 'lettuce', 'Lettuce for grill side dish.'),

      self::productTranslation('product-enoki', 'id', 'Enoki', 'enoki', 'Enoki ukuran 2 pax.'),
      self::productTranslation('product-enoki', 'en', 'Enoki Mushroom', 'enoki-mushroom', 'Enoki mushroom size 2 pax.'),

      self::productTranslation('product-bihun', 'id', 'Bihun', 'bihun', 'Bihun ukuran 200 gram.'),
      self::productTranslation('product-bihun', 'en', 'Rice Vermicelli', 'rice-vermicelli', 'Rice vermicelli size 200 gram.'),

      self::productTranslation('product-mie-kuning', 'id', 'Mie Kuning', 'mie-kuning', 'Mie kuning ukuran 200 gram.'),
      self::productTranslation('product-mie-kuning', 'en', 'Yellow Noodles', 'yellow-noodles', 'Yellow noodles size 200 gram.'),

      self::productTranslation('product-pasta-tomyam', 'id', 'Pasta Tomyam', 'pasta-tomyam', 'Pasta tomyam ukuran 60 gram.'),
      self::productTranslation('product-pasta-tomyam', 'en', 'Tom Yum Paste', 'tom-yum-paste', 'Tom yum paste size 60 gram.'),

      self::productTranslation('product-kaldu-ayam', 'id', 'Kaldu Ayam', 'kaldu-ayam', 'Kaldu ayam ukuran 1 liter.'),
      self::productTranslation('product-kaldu-ayam', 'en', 'Chicken Broth', 'chicken-broth', 'Chicken broth size 1 liter.'),

      self::productTranslation('product-saos-sambal', 'id', 'Saos Sambal', 'saos-sambal', 'Saos sambal ukuran 100 ml.'),
      self::productTranslation('product-saos-sambal', 'en', 'Chili Sauce', 'chili-sauce', 'Chili sauce size 100 ml.'),

      self::productTranslation('product-saos-sambal-tomat', 'id', 'Saos Tomat / Sambal', 'saos-sambal-tomat', 'Saos tomat atau sambal ukuran 100 ml.'),
      self::productTranslation('product-saos-sambal-tomat', 'en', 'Tomato / Chili Sauce', 'tomato-chili-sauce', 'Tomato or chili sauce size 100 ml.'),

      self::productTranslation('product-saos-bbq', 'id', 'Saos BBQ', 'saos-bbq', 'Saos BBQ ukuran 100 ml.'),
      self::productTranslation('product-saos-bbq', 'en', 'BBQ Sauce', 'bbq-sauce', 'BBQ sauce size 100 ml.'),

      self::productTranslation('product-saos-teriyaki-bulgogi', 'id', 'Saos Teriyaki / Bulgogi', 'saos-teriyaki-bulgogi', 'Saos teriyaki atau bulgogi ukuran 100 ml.'),
      self::productTranslation('product-saos-teriyaki-bulgogi', 'en', 'Teriyaki / Bulgogi Sauce', 'teriyaki-bulgogi-sauce', 'Teriyaki or bulgogi sauce size 100 ml.'),

      self::productTranslation('product-saos-bbq-teriyaki-bulgogi', 'id', 'Saos BBQ / Bulgogi / Teriyaki', 'saos-bbq-bulgogi-teriyaki', 'Saos BBQ, bulgogi, atau teriyaki ukuran 100 ml.'),
      self::productTranslation('product-saos-bbq-teriyaki-bulgogi', 'en', 'BBQ / Bulgogi / Teriyaki Sauce', 'bbq-bulgogi-teriyaki-sauce', 'BBQ, bulgogi, or teriyaki sauce size 100 ml.'),

      self::productTranslation('product-margarin', 'id', 'Margarin', 'margarin', 'Margarin untuk grill.'),
      self::productTranslation('product-margarin', 'en', 'Margarine', 'margarine', 'Margarine for grill.'),

      /*
            |--------------------------------------------------------------------------
            | EQUIPMENT TRANSLATIONS
            |--------------------------------------------------------------------------
            */

      self::productTranslation('product-kompor', 'id', 'Kompor', 'kompor', 'Sewa kompor untuk kebutuhan grill.'),
      self::productTranslation('product-kompor', 'en', 'Stove', 'stove', 'Rent stove for your grill needs.'),

      self::productTranslation('product-pan-grill-bulat', 'id', 'Pan Grill Bulat', 'pan-grill-bulat', 'Sewa pan grill bulat untuk kebutuhan grill.'),
      self::productTranslation('product-pan-grill-bulat', 'en', 'Round Grill Pan', 'round-grill-pan', 'Rent round grill pan for your grill needs.'),

      self::productTranslation('product-pan-grill-kotak', 'id', 'Pan Grill Kotak', 'pan-grill-kotak', 'Sewa pan grill kotak untuk kebutuhan grill.'),
      self::productTranslation('product-pan-grill-kotak', 'en', 'Square Grill Pan', 'square-grill-pan', 'Rent square grill pan for your grill needs.'),

      self::productTranslation('product-panci-suki', 'id', 'Panci Suki', 'panci-suki', 'Sewa panci suki untuk kebutuhan grill dan suki.'),
      self::productTranslation('product-panci-suki', 'en', 'Suki Pot', 'suki-pot', 'Rent suki pot for your grill and suki needs.'),

      self::productTranslation('product-mangkok-sedang', 'id', 'Mangkok Sedang', 'mangkok-sedang', 'Sewa mangkok sedang.'),
      self::productTranslation('product-mangkok-sedang', 'en', 'Medium Bowl', 'medium-bowl', 'Rent medium bowl.'),

      self::productTranslation('product-mangkok-kecil', 'id', 'Mangkok Kecil', 'mangkok-kecil', 'Sewa mangkok kecil.'),
      self::productTranslation('product-mangkok-kecil', 'en', 'Small Bowl', 'small-bowl', 'Rent small bowl.'),

      self::productTranslation('product-sumpit', 'id', 'Sumpit', 'sumpit', 'Sewa sumpit.'),
      self::productTranslation('product-sumpit', 'en', 'Chopsticks', 'chopsticks', 'Rent chopsticks.'),

      self::productTranslation('product-capitan', 'id', 'Capitan', 'capitan', 'Sewa capitan makanan.'),
      self::productTranslation('product-capitan', 'en', 'Food Tongs', 'food-tongs', 'Rent food tongs.'),

      self::productTranslation('product-sendok-kuah-set', 'id', 'Sendok Kuah Set', 'sendok-kuah-set', 'Sewa sendok kuah set.'),
      self::productTranslation('product-sendok-kuah-set', 'en', 'Soup Spoon Set', 'soup-spoon-set', 'Rent soup spoon set.'),

      self::productTranslation('product-gas-kaleng-beli', 'id', 'Gas Kaleng Beli', 'gas-kaleng-beli', 'Gas kaleng untuk kebutuhan kompor portable.'),
      self::productTranslation('product-gas-kaleng-beli', 'en', 'Gas Canister Purchase', 'gas-canister-purchase', 'Gas canister for portable stove.'),

      self::productTranslation('product-tikar-uk-150x200', 'id', 'Tikar UK 150 x 200', 'tikar-uk-150x200', 'Sewa tikar ukuran 150 x 200.'),
      self::productTranslation('product-tikar-uk-150x200', 'en', 'Mat Size 150 x 200', 'mat-size-150x200', 'Rent mat size 150 x 200.'),

      self::productTranslation('product-sendok-ramen', 'id', 'Sendok Ramen', 'sendok-ramen', 'Sewa sendok ramen.'),
      self::productTranslation('product-sendok-ramen', 'en', 'Ramen Spoon', 'ramen-spoon', 'Rent ramen spoon.'),
    ]);

    /*
        |--------------------------------------------------------------------------
        | PRODUCT VARIANTS
        |--------------------------------------------------------------------------
        */

    $productVariants = collect([
      self::variant('variant-paket-ramean-a-meat-only', 'product-paket-ramean-a', 699000, 10, 12, 1),
      self::variant('variant-paket-ramean-a-with-stove', 'product-paket-ramean-a', 779000, 10, 12, 2),

      self::variant('variant-paket-ramean-b-meat-only', 'product-paket-ramean-b', 1149000, 20, 20, 1),
      self::variant('variant-paket-ramean-b-with-stove', 'product-paket-ramean-b', 1269000, 20, 20, 2),

      self::variant('variant-paket-shortplate-mix-meat-only', 'product-paket-shortplate-mix', 169000, 2, 3, 1),
      self::variant('variant-paket-shortplate-mix-with-stove', 'product-paket-shortplate-mix', 209000, 2, 3, 2),

      self::variant('variant-paket-shortplate-komplit-meat-only', 'product-paket-shortplate-komplit', 209000, 3, 4, 1),
      self::variant('variant-paket-shortplate-komplit-with-stove', 'product-paket-shortplate-komplit', 249000, 3, 4, 2),

      self::variant('variant-paket-bbq-mantap-meat-only', 'product-paket-bbq-mantap', 179000, 3, 4, 1),
      self::variant('variant-paket-bbq-mantap-with-stove', 'product-paket-bbq-mantap', 219000, 3, 4, 2),

      self::variant('variant-paket-bbq-premium-meat-only', 'product-paket-bbq-premium', 249000, 4, 5, 1),
      self::variant('variant-paket-bbq-premium-with-stove', 'product-paket-bbq-premium', 289000, 4, 5, 2),

      self::variant('variant-paket-seru-meat-only', 'product-paket-seru', 109000, 2, 3, 1),
      self::variant('variant-paket-seru-with-stove', 'product-paket-seru', 119000, 2, 3, 2),

      self::variant('variant-paket-hemat-meat-only', 'product-paket-hemat', 79000, 2, 3, 1),
      self::variant('variant-paket-hemat-with-stove', 'product-paket-hemat', 119000, 2, 3, 2),

      self::variant('variant-paket-mix-favorit-meat-only', 'product-paket-mix-favorit', 139000, 3, 4, 1),
      self::variant('variant-paket-mix-favorit-with-stove', 'product-paket-mix-favorit', 179000, 3, 4, 2),
    ]);

    $productVariantTranslations = $productVariants
      ->flatMap(function ($variant) {
        $isWithStove = str_contains($variant['id'], 'with-stove');

        return [
          self::variantTranslation(
            $variant['id'],
            'id',
            $isWithStove ? 'Paket Kompor' : 'Hanya Daging',
            $isWithStove ? 'paket-kompor' : 'hanya-daging',
            $isWithStove ? 'Paket dengan kompor.' : 'Paket tanpa kompor.'
          ),
          self::variantTranslation(
            $variant['id'],
            'en',
            $isWithStove ? 'With Stove Package' : 'Meat Only',
            $isWithStove ? 'with-stove-package' : 'meat-only',
            $isWithStove ? 'Package with stove.' : 'Package without stove.'
          ),
        ];
      })
      ->values();

    /*
        |--------------------------------------------------------------------------
        | ALA CARTE DEFAULT VARIANTS
        |--------------------------------------------------------------------------
        */

    $alacarteIds = $products
      ->where('type_id', 'type-alacarte')
      ->pluck('id');

    $alacarteVariants = $alacarteIds
      ->map(function ($productId) use ($products) {
        $product = $products->firstWhere('id', $productId);

        return self::variant(
          id: 'variant-' . str_replace('product-', '', $productId) . '-default',
          productId: $productId,
          rate: $product['rate'],
          minPerson: null,
          maxPerson: null,
          sortOrder: 1
        );
      })
      ->values();

    $alacarteVariantTranslations = $alacarteVariants
      ->flatMap(function ($variant) {
        return [
          self::variantTranslation($variant['id'], 'id', 'Default', 'default', null),
          self::variantTranslation($variant['id'], 'en', 'Default', 'default', null),
        ];
      })
      ->values();

    /*
        |--------------------------------------------------------------------------
        | EQUIPMENT DEFAULT VARIANTS
        |--------------------------------------------------------------------------
        */

    $equipmentIds = $products
      ->where('type_id', 'type-equipment')
      ->pluck('id');

    $equipmentVariants = $equipmentIds
      ->map(function ($productId) use ($products) {
        $product = $products->firstWhere('id', $productId);

        return self::variant(
          id: 'variant-' . str_replace('product-', '', $productId) . '-daily-rental',
          productId: $productId,
          rate: $product['rate'],
          minPerson: null,
          maxPerson: null,
          sortOrder: 1
        );
      })
      ->values();

    $equipmentVariantTranslations = $equipmentVariants
      ->flatMap(function ($variant) {
        return [
          self::variantTranslation($variant['id'], 'id', '1x24 Jam', '1x24-jam', 'Harga berlaku untuk 1x24 jam.'),
          self::variantTranslation($variant['id'], 'en', '24 Hours', '24-hours', 'Price is valid for 24 hours.'),
        ];
      })
      ->values();

    $productVariants = $productVariants
      ->merge($alacarteVariants)
      ->merge($equipmentVariants)
      ->values();

    $productVariantTranslations = $productVariantTranslations
      ->merge($alacarteVariantTranslations)
      ->merge($equipmentVariantTranslations)
      ->values();

    /*
        |--------------------------------------------------------------------------
        | PRODUCT CATEGORIES
        |--------------------------------------------------------------------------
        */

    $productCategories = collect([
      self::productCategory('product-paket-ramean-a', 'cat-package-ramean'),
      self::productCategory('product-paket-ramean-a', 'cat-bbq'),

      self::productCategory('product-paket-ramean-b', 'cat-package-ramean'),
      self::productCategory('product-paket-ramean-b', 'cat-bbq'),

      self::productCategory('product-paket-shortplate-mix', 'cat-package-small'),
      self::productCategory('product-paket-shortplate-mix', 'cat-bbq'),

      self::productCategory('product-paket-shortplate-komplit', 'cat-package-small'),
      self::productCategory('product-paket-shortplate-komplit', 'cat-bbq'),

      self::productCategory('product-paket-bbq-mantap', 'cat-package-small'),
      self::productCategory('product-paket-bbq-mantap', 'cat-bbq'),

      self::productCategory('product-paket-bbq-premium', 'cat-package-small'),
      self::productCategory('product-paket-bbq-premium', 'cat-bbq'),

      self::productCategory('product-paket-seru', 'cat-package-small'),
      self::productCategory('product-paket-seru', 'cat-grill-suki'),

      self::productCategory('product-paket-hemat', 'cat-package-small'),
      self::productCategory('product-paket-hemat', 'cat-grill-suki'),

      self::productCategory('product-paket-mix-favorit', 'cat-package-small'),
      self::productCategory('product-paket-mix-favorit', 'cat-grill-suki'),
    ]);

    $meatProducts = [
      'product-daging-ayam',
      'product-sosis-ayam',
      'product-bakso-ayam',
      'product-sate-bakso-sosis',
      'product-ham-sapi',
      'product-beef-saikoro',
      'product-beef-shortplate',
      'product-beef-sirloin',
      'product-beef-wagyu-meltique',
    ];

    $seafoodProducts = [
      'product-bakso-ikan',
      'product-cumi',
      'product-tempura-ikan',
      'product-otak-otak-ikan',
      'product-udang',
    ];

    $vegetableProducts = [
      'product-bawang-bombay',
      'product-selada',
      'product-enoki',
    ];

    $sauceProducts = [
      'product-pasta-tomyam',
      'product-kaldu-ayam',
      'product-saos-sambal',
      'product-saos-sambal-tomat',
      'product-saos-bbq',
      'product-saos-teriyaki-bulgogi',
      'product-saos-bbq-teriyaki-bulgogi',
      'product-margarin',
    ];

    $grillSukiProducts = [
      'product-bihun',
      'product-mie-kuning',
    ];

    $equipmentProducts = $products
      ->where('type_id', 'type-equipment')
      ->pluck('id')
      ->all();

    foreach ($meatProducts as $productId) {
      $productCategories->push(self::productCategory($productId, 'cat-meat'));
    }

    foreach ($seafoodProducts as $productId) {
      $productCategories->push(self::productCategory($productId, 'cat-seafood'));
    }

    foreach ($vegetableProducts as $productId) {
      $productCategories->push(self::productCategory($productId, 'cat-vegetable'));
    }

    foreach ($sauceProducts as $productId) {
      $productCategories->push(self::productCategory($productId, 'cat-sauce'));
    }

    foreach ($grillSukiProducts as $productId) {
      $productCategories->push(self::productCategory($productId, 'cat-grill-suki'));
    }

    foreach ($equipmentProducts as $productId) {
      $productCategories->push(self::productCategory($productId, 'cat-equipment'));
    }

    $productCategories = $productCategories->values();

    /*
        |--------------------------------------------------------------------------
        | PRODUCT BADGES
        |--------------------------------------------------------------------------
        */

    $productBadges = collect([
      self::productBadge('product-paket-ramean-a', 'badge-ramean'),
      self::productBadge('product-paket-ramean-b', 'badge-ramean'),
      self::productBadge('product-paket-bbq-premium', 'badge-premium'),
      self::productBadge('product-paket-hemat', 'badge-best-seller'),
    ]);

    foreach ($products->where('type_id', 'type-alacarte')->pluck('id') as $productId) {
      $productBadges->push(self::productBadge($productId, 'badge-add-on'));
    }

    $productBadges = $productBadges->values();

    /*
        |--------------------------------------------------------------------------
        | PRODUCT ITEMS
        |--------------------------------------------------------------------------
        | product_id = parent package
        | item_product_id = item product
        */

    $productItems = collect([
      /*
            |--------------------------------------------------------------------------
            | PAKET RAMEAN A
            |--------------------------------------------------------------------------
            */

      self::productItem('product-paket-ramean-a', 'product-beef-shortplate', 250, 'gram', 1),
      self::productItem('product-paket-ramean-a', 'product-beef-sirloin', 250, 'gram', 2),
      self::productItem('product-paket-ramean-a', 'product-beef-saikoro', 250, 'gram', 3),
      self::productItem('product-paket-ramean-a', 'product-daging-ayam', 500, 'gram', 4),
      self::productItem('product-paket-ramean-a', 'product-sosis-ayam', 200, 'gram', 5),
      self::productItem('product-paket-ramean-a', 'product-bakso-ayam', 250, 'gram', 6),
      self::productItem('product-paket-ramean-a', 'product-bakso-ikan', 200, 'gram', 7),
      self::productItem('product-paket-ramean-a', 'product-tempura-ikan', 250, 'gram', 8),
      self::productItem('product-paket-ramean-a', 'product-udang', 150, 'gram', 9),
      self::productItem('product-paket-ramean-a', 'product-cumi', 150, 'gram', 10),
      self::productItem('product-paket-ramean-a', 'product-selada', 2, 'pack', 11),
      self::productItem('product-paket-ramean-a', 'product-bawang-bombay', 2, 'pack', 12),
      self::productItem('product-paket-ramean-a', 'product-enoki', 2, 'pack', 13),
      self::productItem('product-paket-ramean-a', 'product-saos-sambal', 2, 'pack', 14),
      self::productItem('product-paket-ramean-a', 'product-saos-bbq-teriyaki-bulgogi', 2, 'pack', 15),
      self::productItem('product-paket-ramean-a', 'product-margarin', 2, 'pack', 16),

      /*
            |--------------------------------------------------------------------------
            | PAKET RAMEAN B
            |--------------------------------------------------------------------------
            */

      self::productItem('product-paket-ramean-b', 'product-beef-saikoro', 250, 'gram', 1),
      self::productItem('product-paket-ramean-b', 'product-beef-shortplate', 250, 'gram', 2),
      self::productItem('product-paket-ramean-b', 'product-beef-sirloin', 250, 'gram', 3),
      self::productItem('product-paket-ramean-b', 'product-beef-wagyu-meltique', 250, 'gram', 4),
      self::productItem('product-paket-ramean-b', 'product-daging-ayam', 500, 'gram', 5),
      self::productItem('product-paket-ramean-b', 'product-sosis-ayam', 400, 'gram', 6),
      self::productItem('product-paket-ramean-b', 'product-bakso-ayam', 500, 'gram', 7),
      self::productItem('product-paket-ramean-b', 'product-bakso-ikan', 250, 'gram', 8),
      self::productItem('product-paket-ramean-b', 'product-tempura-ikan', 250, 'gram', 9),
      self::productItem('product-paket-ramean-b', 'product-otak-otak-ikan', 250, 'gram', 10),
      self::productItem('product-paket-ramean-b', 'product-udang', 300, 'gram', 11),
      self::productItem('product-paket-ramean-b', 'product-cumi', 300, 'gram', 12),
      self::productItem('product-paket-ramean-b', 'product-selada', 400, 'gram', 13),
      self::productItem('product-paket-ramean-b', 'product-bawang-bombay', 3, 'pack', 14),
      self::productItem('product-paket-ramean-b', 'product-enoki', 3, 'pack', 15),
      self::productItem('product-paket-ramean-b', 'product-saos-sambal', 4, 'pack', 16),
      self::productItem('product-paket-ramean-b', 'product-saos-bbq', 3, 'pack', 17),
      self::productItem('product-paket-ramean-b', 'product-saos-teriyaki-bulgogi', 2, 'pack', 18),
      self::productItem('product-paket-ramean-b', 'product-margarin', 3, 'pack', 19),

      /*
            |--------------------------------------------------------------------------
            | PAKET SHORTPLATE MIX
            |--------------------------------------------------------------------------
            */

      self::productItem('product-paket-shortplate-mix', 'product-beef-shortplate', 250, 'gram', 1),
      self::productItem('product-paket-shortplate-mix', 'product-daging-ayam', 250, 'gram', 2),
      self::productItem('product-paket-shortplate-mix', 'product-sosis-ayam', 200, 'gram', 3),
      self::productItem('product-paket-shortplate-mix', 'product-selada', 1, 'pack', 4),
      self::productItem('product-paket-shortplate-mix', 'product-bawang-bombay', 1, 'pack', 5),
      self::productItem('product-paket-shortplate-mix', 'product-margarin', 1, 'pack', 6),
      self::productItem('product-paket-shortplate-mix', 'product-saos-sambal-tomat', 1, 'pack', 7),

      /*
            |--------------------------------------------------------------------------
            | PAKET SHORTPLATE KOMPLIT
            |--------------------------------------------------------------------------
            */

      self::productItem('product-paket-shortplate-komplit', 'product-beef-shortplate', 250, 'gram', 1),
      self::productItem('product-paket-shortplate-komplit', 'product-daging-ayam', 250, 'gram', 2),
      self::productItem('product-paket-shortplate-komplit', 'product-sosis-ayam', 200, 'gram', 3),
      self::productItem('product-paket-shortplate-komplit', 'product-bakso-ayam', 250, 'gram', 4),
      self::productItem('product-paket-shortplate-komplit', 'product-selada', 1, 'pack', 5),
      self::productItem('product-paket-shortplate-komplit', 'product-bawang-bombay', 1, 'pack', 6),
      self::productItem('product-paket-shortplate-komplit', 'product-margarin', 1, 'pack', 7),
      self::productItem('product-paket-shortplate-komplit', 'product-saos-sambal-tomat', 1, 'pack', 8),

      /*
            |--------------------------------------------------------------------------
            | PAKET BBQ MANTAP
            |--------------------------------------------------------------------------
            */

      self::productItem('product-paket-bbq-mantap', 'product-beef-sirloin', 250, 'gram', 1),
      self::productItem('product-paket-bbq-mantap', 'product-daging-ayam', 250, 'gram', 2),
      self::productItem('product-paket-bbq-mantap', 'product-sosis-ayam', 200, 'gram', 3),
      self::productItem('product-paket-bbq-mantap', 'product-bakso-ayam', 250, 'gram', 4),
      self::productItem('product-paket-bbq-mantap', 'product-selada', 1, 'pack', 5),
      self::productItem('product-paket-bbq-mantap', 'product-bawang-bombay', 1, 'pack', 6),
      self::productItem('product-paket-bbq-mantap', 'product-margarin', 1, 'pack', 7),

      /*
            |--------------------------------------------------------------------------
            | PAKET BBQ PREMIUM
            |--------------------------------------------------------------------------
            */

      self::productItem('product-paket-bbq-premium', 'product-beef-saikoro', 250, 'gram', 1),
      self::productItem('product-paket-bbq-premium', 'product-beef-sirloin', 250, 'gram', 2),
      self::productItem('product-paket-bbq-premium', 'product-udang', 150, 'gram', 3),
      self::productItem('product-paket-bbq-premium', 'product-daging-ayam', 250, 'gram', 4),
      self::productItem('product-paket-bbq-premium', 'product-selada', 1, 'pack', 5),
      self::productItem('product-paket-bbq-premium', 'product-bawang-bombay', 1, 'pack', 6),
      self::productItem('product-paket-bbq-premium', 'product-margarin', 1, 'pack', 7),
      self::productItem('product-paket-bbq-premium', 'product-saos-sambal-tomat', 1, 'pack', 8),

      /*
            |--------------------------------------------------------------------------
            | PAKET SERU
            |--------------------------------------------------------------------------
            */

      self::productItem('product-paket-seru', 'product-sosis-ayam', 200, 'gram', 1),
      self::productItem('product-paket-seru', 'product-bakso-ayam', 250, 'gram', 2),
      self::productItem('product-paket-seru', 'product-selada', 1, 'pack', 3),
      self::productItem('product-paket-seru', 'product-bawang-bombay', 1, 'pack', 4),
      self::productItem('product-paket-seru', 'product-margarin', 1, 'pack', 5),
      self::productItem('product-paket-seru', 'product-saos-sambal-tomat', 1, 'pack', 6),

      /*
            |--------------------------------------------------------------------------
            | PAKET HEMAT
            |--------------------------------------------------------------------------
            */

      self::productItem('product-paket-hemat', 'product-sosis-ayam', 200, 'gram', 1),
      self::productItem('product-paket-hemat', 'product-bakso-ayam', 250, 'gram', 2),
      self::productItem('product-paket-hemat', 'product-selada', 1, 'pack', 3),
      self::productItem('product-paket-hemat', 'product-bawang-bombay', 1, 'pack', 4),
      self::productItem('product-paket-hemat', 'product-margarin', 1, 'pack', 5),
      self::productItem('product-paket-hemat', 'product-saos-sambal-tomat', 1, 'pack', 6),

      /*
            |--------------------------------------------------------------------------
            | PAKET MIX FAVORIT
            |--------------------------------------------------------------------------
            */

      self::productItem('product-paket-mix-favorit', 'product-daging-ayam', 250, 'gram', 1),
      self::productItem('product-paket-mix-favorit', 'product-sosis-ayam', 200, 'gram', 2),
      self::productItem('product-paket-mix-favorit', 'product-tempura-ikan', 250, 'gram', 3),
      self::productItem('product-paket-mix-favorit', 'product-bakso-ikan', 200, 'gram', 4),
      self::productItem('product-paket-mix-favorit', 'product-selada', 1, 'pack', 5),
      self::productItem('product-paket-mix-favorit', 'product-bawang-bombay', 1, 'pack', 6),
      self::productItem('product-paket-mix-favorit', 'product-margarin', 1, 'pack', 7),
      self::productItem('product-paket-mix-favorit', 'product-saos-sambal-tomat', 1, 'pack', 8),
    ]);

    /*
        |--------------------------------------------------------------------------
        | LANGUAGE CONTENTS
        |--------------------------------------------------------------------------
        */

    $languageContents = collect([
      self::languageContent('landing', 'hero_title', 'id', 'Sewa Grill Praktis Untuk Acara Kamu'),
      self::languageContent('landing', 'hero_title', 'en', 'Practical Grill Rental for Your Event'),

      self::languageContent('landing', 'hero_subtitle', 'id', 'Pilih paket BBQ, grill, suki, atau tambah menu ala carte sesuai kebutuhan.'),
      self::languageContent('landing', 'hero_subtitle', 'en', 'Choose BBQ packages, grill, suki, or add a la carte menus as needed.'),

      self::languageContent('contact', 'whatsapp', 'id', '081337467442'),
      self::languageContent('contact', 'whatsapp', 'en', '081337467442'),

      self::languageContent('social', 'instagram', 'id', '@kelanagrill'),
      self::languageContent('social', 'instagram', 'en', '@kelanagrill'),

      self::languageContent('social', 'tiktok', 'id', '@kelana.grill'),
      self::languageContent('social', 'tiktok', 'en', '@kelana.grill'),

      self::languageContent('note', 'addon_minimum', 'id', 'Minimal pembelian 4 pack daging boleh mix varian jika tanpa pembelian paket BBQ.'),
      self::languageContent('note', 'addon_minimum', 'en', 'Minimum purchase of 4 meat packs, variants can be mixed if without BBQ package purchase.'),

      self::languageContent('note', 'equipment_duration', 'id', 'Harga alat berlaku untuk 1x24 jam.'),
      self::languageContent('note', 'equipment_duration', 'en', 'Equipment rental price is valid for 24 hours.'),
    ]);

    /*
        |--------------------------------------------------------------------------
        | ATTACH CURRENT LOCALE DATA
        |--------------------------------------------------------------------------
        */

    $categories = $categories
      ->map(function ($category) use ($categoryTranslations, $language) {
        return array_merge($category, [
          'translation' => $categoryTranslations
            ->where('category_id', $category['id'])
            ->firstWhere('language', $language),
          'translations' => $categoryTranslations
            ->where('category_id', $category['id'])
            ->values(),
        ]);
      })
      ->values();

    $badges = $badges
      ->map(function ($badge) use ($badgeTranslations, $language) {
        return array_merge($badge, [
          'translation' => $badgeTranslations
            ->where('badge_id', $badge['id'])
            ->firstWhere('language', $language),
          'translations' => $badgeTranslations
            ->where('badge_id', $badge['id'])
            ->values(),
        ]);
      })
      ->values();

    $productVariants = $productVariants
      ->map(function ($variant) use ($productVariantTranslations, $language) {
        return array_merge($variant, [
          'translation' => $productVariantTranslations
            ->where('product_variant_id', $variant['id'])
            ->firstWhere('language', $language),
          'translations' => $productVariantTranslations
            ->where('product_variant_id', $variant['id'])
            ->values(),
        ]);
      })
      ->values();

    $products = $products
      ->map(function ($product) use (
        $types,
        $productTranslations,
        $productVariants,
        $productCategories,
        $productBadges,
        $productItems,
        $categories,
        $badges,
        $language
      ) {
        $categoryIds = $productCategories
          ->where('product_id', $product['id'])
          ->pluck('category_id')
          ->values();

        $badgeIds = $productBadges
          ->where('product_id', $product['id'])
          ->pluck('badge_id')
          ->values();

        $items = $productItems
          ->where('product_id', $product['id'])
          ->map(function ($item) use ($productTranslations, $language) {
            return array_merge($item, [
              'item_product_translation' => $productTranslations
                ->where('product_id', $item['item_product_id'])
                ->firstWhere('language', $language),
            ]);
          })
          ->values();

        return array_merge($product, [
          'type' => $types->firstWhere('id', $product['type_id']),

          'translation' => $productTranslations
            ->where('product_id', $product['id'])
            ->firstWhere('language', $language),

          'translations' => $productTranslations
            ->where('product_id', $product['id'])
            ->values(),

          'variants' => $productVariants
            ->where('product_id', $product['id'])
            ->values(),

          'categories' => $categories
            ->whereIn('id', $categoryIds)
            ->values(),

          'badges' => $badges
            ->whereIn('id', $badgeIds)
            ->values(),

          'items' => $items,
        ]);
      })
      ->values();

    return collect([
      'locale' => $language,

      'types' => $types,

      'products' => $products,
      'product_translations' => $productTranslations,

      'categories' => $categories,
      'category_translations' => $categoryTranslations,

      'badges' => $badges,
      'badge_translations' => $badgeTranslations,

      'product_variants' => $productVariants,
      'product_variant_translations' => $productVariantTranslations,

      'product_categories' => $productCategories,
      'product_badges' => $productBadges,
      'product_items' => $productItems,

      'language_contents' => $languageContents
        ->where('language', $language)
        ->values(),

      'all_language_contents' => $languageContents,
    ]);
  }

  /*
    |--------------------------------------------------------------------------
    | HELPERS
    |--------------------------------------------------------------------------
    */

  private static function product(
    string $id,
    string $typeId,
    int|float $rate,
    ?string $image,
    int $sortOrder,
    bool $featured = false,
    bool $new = true,
    bool $active = true
  ): array {
    return [
      'id' => $id,
      'type_id' => $typeId,
      'rate' => $rate,
      'featured' => $featured,
      'new' => $new,
      'active' => $active,
      'image' => $image,
      'sort_order' => $sortOrder,
    ];
  }

  private static function productTranslation(
    string $productId,
    string $language,
    string $name,
    string $slug,
    ?string $description = null,
    ?string $featuredLabel = null
  ): array {
    return [
      'id' => 'product-translation-' . $productId . '-' . $language,
      'product_id' => $productId,
      'language' => $language,
      'name' => $name,
      'slug' => $slug,
      'description' => $description,
      'featured_label' => $featuredLabel,
    ];
  }

  private static function categoryTranslation(
    string $categoryId,
    string $language,
    string $name,
    string $slug
  ): array {
    return [
      'id' => 'category-translation-' . $categoryId . '-' . $language,
      'category_id' => $categoryId,
      'language' => $language,
      'name' => $name,
      'slug' => $slug,
    ];
  }

  private static function badgeTranslation(
    string $badgeId,
    string $language,
    string $name,
    string $slug
  ): array {
    return [
      'id' => 'badge-translation-' . $badgeId . '-' . $language,
      'badge_id' => $badgeId,
      'language' => $language,
      'name' => $name,
      'slug' => $slug,
    ];
  }

  private static function variant(
    string $id,
    string $productId,
    int|float $rate,
    ?int $minPerson,
    ?int $maxPerson,
    int $sortOrder,
    bool $active = true
  ): array {
    return [
      'id' => $id,
      'product_id' => $productId,
      'rate' => $rate,
      'min_person' => $minPerson,
      'max_person' => $maxPerson,
      'sort_order' => $sortOrder,
      'active' => $active,
    ];
  }

  private static function variantTranslation(
    string $variantId,
    string $language,
    string $name,
    string $slug,
    ?string $description = null
  ): array {
    return [
      'id' => 'variant-translation-' . $variantId . '-' . $language,
      'product_variant_id' => $variantId,
      'language' => $language,
      'name' => $name,
      'slug' => $slug,
      'description' => $description,
    ];
  }

  private static function productCategory(
    string $productId,
    string $categoryId
  ): array {
    return [
      'id' => 'product-category-' . $productId . '-' . $categoryId,
      'product_id' => $productId,
      'category_id' => $categoryId,
    ];
  }

  private static function productBadge(
    string $productId,
    string $badgeId
  ): array {
    return [
      'id' => 'product-badge-' . $productId . '-' . $badgeId,
      'product_id' => $productId,
      'badge_id' => $badgeId,
    ];
  }

  private static function productItem(
    string $productId,
    string $itemProductId,
    int|float $qty,
    ?string $unit,
    int $sortOrder
  ): array {
    return [
      'id' => 'product-item-' . $productId . '-' . $itemProductId,
      'product_id' => $productId,
      'item_product_id' => $itemProductId,
      'qty' => $qty,
      'unit' => $unit,
      'sort_order' => $sortOrder,
    ];
  }

  private static function languageContent(
    string $group,
    string $key,
    string $language,
    ?string $value
  ): array {
    return [
      'id' => 'language-content-' . $group . '-' . $key . '-' . $language,
      'group' => $group,
      'language' => $language,
      'key' => $key,
      'value' => $value,
    ];
  }
}
