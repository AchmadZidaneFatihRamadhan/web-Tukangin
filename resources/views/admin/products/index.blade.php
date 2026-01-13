<h1>Data Produk</h1>

<a href="{{ route('products.create') }}">Tambah Produk</a>

<ul>
@foreach($products as $product)
    <li>
        {{ $product->name }} - Rp{{ number_format($product->price) }}
        <a href="{{ route('products.edit', $product->id) }}">Edit</a>
    </li>
@endforeach
</ul>
