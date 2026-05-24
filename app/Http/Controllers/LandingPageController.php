<?php

namespace App\Http\Controllers;

use App\Data\KelanaGrillData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index(Request $request)
    {
        $data = KelanaGrillData::get();

        $products = $data['products'];

        return Inertia::render('landing/index', [
            'locale' => $data['locale'],

            'types' => $data['types']->map(fn($item) => $this->generateDataType($item)),

            'featuredProduct' => $this->generateDataProduct($products->firstWhere('featured', true)),
            'products' => $products->where('featured', false)->where('type_id', 'type-package')->take(3)->values()->map(fn($item) => $this->generateDataProduct($item)),

            'categories' => $data['categories']->map(fn($item) => $this->generateDataCategory($item)),
            'badges' => $data['badges']->map(fn($item) => $this->generateDataBadge($item)),
        ]);
    }

    public function indexProduk(Request $request)
    {
        $data = KelanaGrillData::get();

        return Inertia::render('landing/produk', [
            'products' => collect($data['products'] ?? [])->map(fn($item) => $this->generateDataProduct($item)),
        ]);
    }

    function generateDataType($item)
    {
        return [
            'id' => $item['id'],
            'name' => $item['name'],
            'slug' => $item['slug'],
        ];
    }

    function generateDataProduct($item)
    {
        $translate = $item['translation'];
        return [
            'id' => $item['id'],
            'name' => $translate['name'],
            'slug' => $translate['slug'],
            'description' => $translate['description'],
            'featuredLabel' => $item['featured_label'] ?? null,
            'rate' => $item['rate'],
            'image' => $item['image'],
            'featured' => $item['featured'],
            'new' => $item['new'],
            'variants' => $item['variants']->map(fn($variant) => $this->generateDataVariant($variant)),
            'categories' => $item['categories']->map(fn($category) => $this->generateDataCategory($category)),
            'badges' => $item['badges']->map(fn($badge) => $this->generateDataBadge($badge)),
            'items' => $item['items']->map(fn($item) => $this->generateDataItem($item))
        ];
    }

    function generateDataVariant($item)
    {
        $translate = $item['translation'];

        return [
            'id' => $item['id'],
            'name' => $translate['name'],
            'slug' => $translate['slug'],
            'description' => $translate['description'],
            'rate' => $item['rate'],
            'minPerson' => $item['min_person'],
            'maxPerson' => $item['max_person'],
        ];
    }

    function generateDataCategory($item)
    {
        $translate = $item['translation'];

        return [
            'id' => $item['id'],
            'name' => $translate['name'],
            'slug' => $translate['slug'],
        ];
    }

    function generateDataBadge($item)
    {
        $translate = $item['translation'];

        return [
            'id' => $item['id'],
            'name' => $translate['name'],
            'slug' => $translate['slug'],
        ];
    }

    function generateDataItem($item)
    {
        $translate = $item['item_product_translation'];
        return [
            'id' => $item['id'],
            'name' => $translate['name'],
            'slug' => $translate['slug'],
            'description' => $translate['description'],
            'qty' => $item['qty'],
            'unit' => $item['unit'],
        ];
    }
}
