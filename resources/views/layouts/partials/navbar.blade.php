<nav class="bg-white shadow">
    <div class="container mx-auto flex justify-between items-center h-16 px-6">

        <!-- Logo -->
        <a href="{{ route('home') }}" class="font-bold text-xl">
            Tukangin
        </a>

        <!-- Menu -->
        <div class="flex gap-6">
            <a href="{{ route('home') }}">Home</a>
            <a href="{{ route('customer.products') }}">Produk</a>
        </div>

        <!-- Auth -->
        @guest
            <div class="flex gap-4">
                <a href="{{ route('login') }}">Login</a>
                <a href="{{ route('register') }}">Register</a>
            </div>
        @endguest

        @auth
            <span>{{ Auth::user()->name }}</span>
        @endauth

    </div>
</nav>
