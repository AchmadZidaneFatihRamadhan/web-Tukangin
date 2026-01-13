<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        // sementara, nanti diisi logic order
        return redirect()->back()->with('success', 'Checkout berhasil (dummy)');
    }
}
