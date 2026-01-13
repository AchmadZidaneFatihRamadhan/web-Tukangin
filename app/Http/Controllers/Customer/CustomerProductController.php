<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class CustomerProductController extends Controller
{
    /**
     * Menampilkan katalog produk/jasa ke customer
     */
    public function index()
    {
        // Ambil semua produk dari database
        $products = Product::all();

        // Kirim ke view customer/products.blade.php
        return view('customer.products', compact('products'));
    }
}
