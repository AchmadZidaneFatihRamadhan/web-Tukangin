<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800">Daftar Layanan</h2>
    </x-slot>

    <div class="py-6 max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @foreach ($services as $service)
            <div class="bg-white border rounded-lg p-6 shadow-md">
                <img src="{{ $service->image ?? 'https://via.placeholder.com/300' }}" alt="{{ $service->name }}" class="w-full h-48 object-cover rounded mb-4">
                <h3 class="font-bold text-lg">{{ $service->name }}</h3>
                <p class="text-gray-600 mb-4">{{ $service->description ?? 'Deskripsi layanan' }}</p>
                <p class="font-semibold text-blue-600">Rp {{ number_format($service->price) }}</p>
                <a href="{{ route('service.detail', $service->id) }}" class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Lihat Detail</a>
            </div>
            @endforeach
        </div>
    </div>
</x-app-layout>
