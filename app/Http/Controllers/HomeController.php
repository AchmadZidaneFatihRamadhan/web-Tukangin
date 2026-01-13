<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::all();
        $products = Product::with('category')->get();

        return view('home', compact('categories','products'));
    }
}
