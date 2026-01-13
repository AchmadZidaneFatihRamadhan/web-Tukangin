<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800">Detail Layanan</h2>
    </x-slot>

    <div class="py-6 max-w-4xl mx-auto px-4">
        <div class="bg-white border rounded-lg p-6 shadow-md">
            <img src="{{ $service->image ?? 'https://via.placeholder.com/600' }}" alt="{{ $service->name }}" class="w-full h-64 object-cover rounded mb-4">
            <h1 class="text-3xl font-bold mb-4">{{ $service->name }}</h1>
            <p class="text-gray-600 mb-6">{{ $service->description }}</p>
            <p class="font-semibold text-xl text-blue-600 mb-6">Harga: Rp {{ number_format($service->price) }}</p>
            <form method="POST" action="{{ route('checkout') }}">
                @csrf
                <button type="submit" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">Pesan Sekarang</button>
            </form>
        </div>
    </div>
</x-app-layout>
