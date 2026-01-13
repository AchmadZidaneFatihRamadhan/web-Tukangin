<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index() {
        // Ambil data dari DB dan pastikan URL gambar benar
        $produks = Product::all()->map(function($p) {
            $p->img = asset($p->img);
            return $p;
        });
        return view('welcome', compact('produks'));
    }
}
