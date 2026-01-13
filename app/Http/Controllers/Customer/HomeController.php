<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Product;

class HomeController extends Controller
{
    public function index()
    {
        return view('customer.home', [
            'products' => Product::all()
        ]);
    }
}
