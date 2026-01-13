@extends('layouts.app')

@section('content')
<div class="container mx-auto py-16 grid grid-cols-3 gap-8">

    @foreach ($products as $product)
        <div class="border rounded p-4">
            <h3 class="font-bold">{{ $product->name }}</h3>
            <p>{{ $product->price }}</p>
        </div>
    @endforeach

</div>
@endsection
