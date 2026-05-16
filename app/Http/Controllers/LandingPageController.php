<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    function index()
    {
        return Inertia::render("landing", [
            "navItems" => $this->navItems()
        ]);
    }

    function indexProduk()
    {
        return Inertia::render("landing/produk", [
            "navItems" => $this->navItems()
        ]);
    }

    function navItems()
    {
        return [
            [
                "name" => "About",
                "href" => "#"
            ],
            [
                "name" => "Produk",
                "href" => route("landing.produk")
            ],
            [
                "name" => "Form",
                "href" => "#"
            ],
        ];
    }
}
