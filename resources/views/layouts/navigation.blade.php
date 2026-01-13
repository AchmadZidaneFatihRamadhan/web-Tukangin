<nav x-data="{ open: false }" class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex items-center space-x-8">
                <a href="{{ url('/') }}" class="font-bold text-lg">Tukangin</a>
                <div class="hidden sm:flex space-x-6">
                    <a href="{{ url('/') }}" class="text-gray-600 hover:text-black">Home</a>
                    <a href="{{ route('services') }}" class="text-gray-600 hover:text-black">Layanan</a>
                    @auth
                    @if(auth()->user()->role === 'customer')
                    <a href="#" class="text-gray-600 hover:text-black">Pesanan Saya</a>
                    @endif
                    @if(auth()->user()->role === 'admin')
                    <a href="{{ url('/admin/products') }}" class="text-gray-600 hover:text-black">Dashboard Admin</a>
                    @endif
                    @endauth
                </div>
            </div>
            <div class="flex items-center space-x-4">
                @guest
                <a href="{{ route('login') }}" class="text-sm text-gray-600">Login</a>
                <a href="{{ route('register') }}" class="bg-black text-white px-4 py-2 rounded text-sm">Register</a>
                @endguest
                @auth
                <div class="relative">
                    <button @click="open = !open" class="flex items-center text-sm focus:outline-none">
                        <span class="mr-2">{{ auth()->user()->name }}</span> ⌄
                    </button>
                    <div x-show="open" @click.away="open = false" class="absolute right-0 mt-2 w-40 bg-white shadow rounded">
                        <a href="{{ route('profile.edit') }}" class="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                        </form>
                    </div>
                </div>
                @endauth
            </div>
        </div>
    </div>
</nav>
