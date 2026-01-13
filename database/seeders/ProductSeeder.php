<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
        ['kategori' => 'Semen', 'nama' => 'Semen Portland 50kg', 'harga' => 65000, 'stok' => 250, 'satuan' => 'sak', 'img' => 'images/semen.jpeg'],
        ['kategori' => 'Besi', 'nama' => 'Besi Beton 10mm x 12m', 'harga' => 85000, 'stok' => 500, 'satuan' => 'batang', 'img' => 'images/besi.jpeg'],
        // ... tambahkan produk lainnya di sini
    ];
    foreach ($data as $val) { \App\Models\Product::create($val); }
    }
}
