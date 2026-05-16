<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    function index()
    {
        return Inertia::render("landing");
    }

    function indexProduk()
    {
        return Inertia::render("landing/produk");
    }
}
