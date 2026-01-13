<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>TUKANGIN</title>


    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-50">

    @include('layouts.navigation')

    <main>
        @yield('content')
    </main>

    @include('layouts.partials.footer')

</body>
</html>
