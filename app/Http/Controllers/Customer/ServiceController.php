<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Halaman list layanan / jasa
     * (mapping dari halaman list Figma)
     */
    public function index()
    {
        $services = Product::all(); // sementara pakai Product

        return view('customer.services.index', compact('services'));
    }

    /**
     * Halaman detail layanan
     * (mapping dari halaman detail Figma)
     */
    public function show($id)
    {
        $service = Product::findOrFail($id);

        return view('customer.services.show', compact('service'));
    }
}
