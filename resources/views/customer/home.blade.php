@extends('layouts.app')

@section('content')
<section class="py-24 text-center">
    <h1 class="text-4xl font-bold mb-4">
        Temukan Tukang Terpercaya
    </h1>

    <p class="text-gray-600 mb-8">
        Platform jasa tukang profesional
    </p>

    <a href="{{ route('customer.products') }}"
       class="bg-blue-600 text-white px-6 py-3 rounded">
        Lihat Produk
    </a>
</section>

<section class="py-16">
    <div class="max-w-7xl mx-auto grid grid-cols-3 gap-8 text-center">

        <div>
            <h3 class="font-bold">Tukang Terverifikasi</h3>
            <p>Tenaga profesional & berpengalaman</p>
        </div>

        <div>
            <h3 class="font-bold">Harga Transparan</h3>
            <p>Tanpa biaya tersembunyi</p>
        </div>

        <div>
            <h3 class="font-bold">Mudah & Cepat</h3>
            <p>Pesan dalam hitungan menit</p>
        </div>

    </div>
</section>

@endsection
