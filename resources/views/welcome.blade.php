<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tukangin - Toko Bahan Bangunan</title>
    <style>
        body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; color: #333; }

        /* NOTIFIKASI POP-UP */
        .toast-container {
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            z-index: 10001; display: none; width: auto; min-width: 300px;
        }
        .toast {
            background: #eafff3; color: #1e7e34; padding: 12px 25px;
            border-radius: 8px; border: 1px solid #d1f2db;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            display: flex; align-items: center; gap: 10px; font-weight: 500;
        }

        /* HEADER */
        .header {
            display: flex; justify-content: space-between; align-items: center;
            padding: 10px 60px; background: white; border-bottom: 1px solid #eee;
            position: sticky; top: 0; z-index: 1000;
        }
        .logo-area { display: flex; align-items: center; gap: 12px; }
        .logo-area img { width: 40px; height: 40px; }

        .user-menu { display: flex; align-items: center; gap: 20px; font-size: 14px; }
        .btn-auth { background: #ff6a00; color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; }
        .btn-cart {
            background: #fff5ed; color: #ff6a00; border: 1px solid #ff6a00;
            padding: 8px 15px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px;
        }

        /* HERO */
        .hero {
            background: #ff6a00; color: white; text-align: center;
            padding: 50px 20px; margin-bottom: 30px;
        }
        .hero h1 { font-size: 32px; margin: 0; }
        .hero p { margin: 10px 0 25px; opacity: 0.9; }
        .btn-white { background: white; color: #ff6a00; padding: 12px 30px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }

        /* KATEGORI */
        .kategori-wrapper { padding: 0 60px; margin-bottom: 20px; }
        .kategori-list { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 10px; }
        .kategori-list button {
            padding: 8px 20px; border-radius: 6px; border: 1px solid #eee;
            background: white; cursor: pointer; white-space: nowrap; transition: 0.2s;
        }
        .kategori-list button.active { background: #ff6a00; color: white; border-color: #ff6a00; }

        /* GRID PRODUK */
        .main-content { padding: 0 60px 60px; }
        .produk-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;
        }
        .card {
            background: white; border-radius: 8px; border: 1px solid #eee;
            padding: 0; overflow: hidden; position: relative;
        }
        .card img { width: 100%; height: 200px; object-fit: cover; }
        .card-body { padding: 15px; }
        .card-badge {
            position: absolute; top: 10px; right: 10px;
            background: #ff6a00; color: white; font-size: 10px; padding: 3px 8px; border-radius: 4px;
        }
        .card h4 { margin: 0 0 10px; font-size: 16px; font-weight: 600; }
        .card .info-text { font-size: 12px; color: #777; margin: 2px 0; }
        .card .harga { color: #ff6a00; font-weight: bold; font-size: 18px; margin: 10px 0; }
        .card-footer { display: flex; gap: 8px; }
        .btn-action { flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #ff6a00; cursor: pointer; font-size: 13px; }
        .btn-detail { background: white; color: #ff6a00; }
        .btn-beli { background: #ff6a00; color: white; }

        /* MODAL GLOBAL */
        .modal {
            display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5);
            z-index: 10000; justify-content: center; align-items: center;
        }
        .modal-content { background: white; border-radius: 12px; width: 500px; padding: 25px; position: relative; max-width: 90%; }
        .close-modal { position: absolute; top: 15px; right: 20px; cursor: pointer; font-size: 24px; color: #999; }

        /* FORM LOGIN / DAFTAR */
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; font-size: 14px; }
        .form-group input, .form-group select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
        .btn-primary { width: 100%; background: #ff6a00; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; }

        /* DETAIL MODAL CUSTOM */
        .detail-flex { display: flex; gap: 20px; }
        .detail-img { width: 200px; height: 200px; border-radius: 10px; object-fit: cover; }

        .cart-item { display: flex; gap: 15px; padding: 15px 0; border-bottom: 1px solid #f5f5f5; align-items: center; }
        .cart-item img { width: 70px; height: 70px; border-radius: 8px; object-fit: cover; }
        .qty-control { display: flex; align-items: center; gap: 10px; margin-top: 5px; }
        .qty-btn { width: 28px; height: 28px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 4px; }

        footer { background: #1a202c; color: white; text-align: center; padding: 40px; margin-top: 50px; }
    </style>
</head>
<body>

<div id="toastContainer" class="toast-container">
    <div class="toast">
        <span id="toastIcon">✔</span>
        <span id="toastMessage"></span>
    </div>
</div>

<div class="header">
    <div class="logo-area">
        <img src="{{ asset('images/logo.jpeg') }}" alt="Logo">
        <div>
            <strong style="font-size: 18px;">Tukangin</strong><br>
            <small style="color: #888;">Toko Bahan Bangunan</small>
        </div>
    </div>

    <div class="user-menu" id="navAuth">
        <button class="btn-auth" onclick="openModal('loginModal')">Masuk</button>
        <button class="btn-cart" onclick="openCart()">
            🛒 Keranjang <span id="cartCount" style="background: red; color: white; border-radius: 50%; padding: 2px 6px; font-size: 10px; margin-left: 5px;">0</span>
        </button>
    </div>
</div>

<div class="hero">
    <h1>Belanja Bahan Bangunan Online</h1>
    <p>Harga terbaik, kualitas terjamin, pengiriman cepat</p>
    <button class="btn-white">Mulai Belanja Sekarang</button>
</div>

<div class="kategori-wrapper">
    <div class="kategori-list" id="categoryTabs">
        <button class="active" onclick="filterProduk('Semua', this)">Semua</button>
        <button onclick="filterProduk('Semen', this)">Semen</button>
        <button onclick="filterProduk('Besi', this)">Besi & Baja</button>
        <button onclick="filterProduk('Bata', this)">Bata</button>
        <button onclick="filterProduk('Cat', this)">Cat</button>
        <button onclick="filterProduk('Keramik', this)">Keramik</button>
    </div>
</div>

<div class="main-content">
    <h3 id="categoryTitle" style="margin-bottom: 20px;">Semua Produk</h3>
    <div class="produk-grid" id="productGrid"></div>
</div>

<div id="loginModal" class="modal">
    <div class="modal-content">
        <span class="close-modal" onclick="closeModal('loginModal')">&times;</span>
        <h2 style="text-align: center;">Masuk</h2>
        <div class="form-group">
            <label>Login Sebagai</label>
            <select id="loginRole">
                <option value="Pelanggan">Pelanggan</option>
                <option value="Admin">Admin</option>
            </select>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" id="loginEmail" placeholder="contoh@email.com">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" id="loginPass" placeholder="Masukkan password">
        </div>
        <button class="btn-primary" onclick="handleLogin()">Masuk Sekarang</button>
        <p style="text-align: center; font-size: 13px; margin-top: 15px;">
            Belum punya akun? <a href="javascript:void(0)" onclick="openRegister()" style="color: #ff6a00; text-decoration: none; font-weight: bold;">Daftar di sini</a>
        </p>
    </div>
</div>

<div id="registerModal" class="modal">
    <div class="modal-content">
        <span class="close-modal" onclick="closeModal('registerModal')">&times;</span>
        <h2 style="text-align: center;">Daftar Akun</h2>
        <div class="form-group">
            <label>Nama Lengkap</label>
            <input type="text" id="regName" placeholder="Masukkan nama lengkap">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" id="regEmail" placeholder="nama@email.com">
        </div>
        <div class="form-group">
            <label>Buat Password</label>
            <input type="password" placeholder="Minimal 6 karakter">
        </div>
        <button class="btn-primary" onclick="handleRegister()">Daftar</button>
    </div>
</div>

<div id="detailModal" class="modal">
    <div class="modal-content">
        <span class="close-modal" onclick="closeModal('detailModal')">&times;</span>
        <div class="detail-flex">
            <img id="detailImg" class="detail-img" src="" alt="">
            <div>
                <span id="detailBadge" style="background: #ff6a00; color: white; padding: 3px 8px; border-radius: 4px; font-size: 10px;"></span>
                <h2 id="detailNama" style="margin: 10px 0 5px;"></h2>
                <p id="detailDesc" style="font-size: 13px; color: #666; margin-bottom: 15px;">Bahan bangunan berkualitas tinggi untuk kebutuhan konstruksi Anda.</p>
                <div style="background: #fff5ed; padding: 15px; border-radius: 8px;">
                    <span style="color: #ff6a00; font-size: 24px; font-weight: bold;" id="detailHarga"></span>
                    <span style="color: #888;"> / <span id="detailSatuan"></span></span>
                </div>
                <p style="font-size: 13px; margin-top: 10px;">Stok Tersedia: <strong id="detailStok"></strong></p>
                <button class="btn-primary" id="addFromDetail" style="margin-top: 10px;">🛒 Tambah ke Keranjang</button>
            </div>
        </div>
    </div>
</div>

<div id="cartModal" class="modal">
    <div class="modal-content">
        <span class="close-modal" onclick="closeModal('cartModal')">&times;</span>
        <h3>Keranjang Belanja</h3>
        <div id="cartItems"></div>
        <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; margin-bottom: 20px;">
                <span>Total:</span>
                <span id="cartTotalDisplay" style="color: #ff6a00;">Rp 0</span>
            </div>
            <button class="btn-primary" onclick="processCheckout()">Checkout Sekarang</button>
        </div>
    </div>
</div>

<footer>
    <strong>Tukangin</strong><br>
    <p style="font-size: 14px; opacity: 0.7;">Toko bahan bangunan online terpercaya</p>
    <small>© 2025 Tukangin. Semua hak dilindungi.</small>
</footer>

<script>
    const dataProduk = [

        { id: 1, kategori: 'Semen', nama: 'Semen Portland 50kg', harga: 65000, stok: 250, satuan: 'sak', img: "{{ asset('images/semen.jpeg') }}" },

        { id: 2, kategori: 'Besi', nama: 'Besi Beton 10mm x 12m', harga: 85000, stok: 500, satuan: 'batang', img: "{{ asset('images/besi.jpeg') }}" },

        { id: 3, kategori: 'Bata', nama: 'Bata Merah Press', harga: 850, stok: 10000, satuan: 'biji', img: "{{ asset('images/bata.jpeg') }}" },

        { id: 4, kategori: 'Cat', nama: 'Cat Tembok Premium 20L', harga: 450000, stok: 120, satuan: 'pail', img: "{{ asset('images/cat tembok.jpeg') }}" },

        { id: 5, kategori: 'Keramik', nama: 'Keramik 40x40 cm', harga: 55000, stok: 800, satuan: 'm²', img: "{{ asset('images/keramik.jpeg') }}" },

        { id: 6, kategori: 'Pasir', nama: 'Pasir Beton', harga: 350000, stok: 50, satuan: 'm³', img: "{{ asset('images/pasir.jpeg') }}" }

    ];
    
    let cart = [];
    let isLogin = false;
    let userData = null;

    // --- FUNGSI AUTH ---
    function handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const role = document.getElementById('loginRole').value;

        if(email === "") {
            showToast("Masukkan email!");
            return;
        }

        isLogin = true;
        userData = { name: email.split('@')[0], role: role };

        closeModal('loginModal');
        updateNav();
        showToast(`Selamat datang, ${userData.name} (${userData.role})`);
    }

    function handleRegister() {
        showToast("Pendaftaran berhasil! Silakan login.");
        closeModal('registerModal');
        openModal('loginModal');
    }

    function logout() {
        isLogin = false;
        userData = null;
        updateNav();
        showToast("Berhasil keluar akun");
    }

    function updateNav() {
        const nav = document.getElementById('navAuth');
        if(isLogin) {
            nav.innerHTML = `
                <span>👤 ${userData.name}</span>
                <span onclick="logout()" style="cursor:pointer; color: #888;">🚪 Keluar</span>
                <button class="btn-cart" onclick="openCart()">
                    🛒 Keranjang <span id="cartCount" style="background: red; color: white; border-radius: 50%; padding: 2px 6px; font-size: 10px; margin-left: 5px;">${cart.length}</span>
                </button>
            `;
        } else {
            nav.innerHTML = `
                <button class="btn-auth" onclick="openModal('loginModal')">Masuk</button>
                <button class="btn-cart" onclick="openCart()">
                    🛒 Keranjang <span id="cartCount" style="background: red; color: white; border-radius: 50%; padding: 2px 6px; font-size: 10px; margin-left: 5px;">${cart.length}</span>
                </button>
            `;
        }
    }

    // --- FUNGSI PRODUK & DETAIL ---
    function renderProduk(filter = 'Semua') {
        const grid = document.getElementById('productGrid');
        grid.innerHTML = '';
        const filtered = filter === 'Semua' ? dataProduk : dataProduk.filter(p => p.kategori.includes(filter));

        filtered.forEach(p => {
            grid.innerHTML += `
                <div class="card">
                    <div class="card-badge">${p.kategori}</div>
                    <img src="${p.img}" alt="${p.nama}">
                    <div class="card-body">
                        <h4>${p.nama}</h4>
                        <p class="info-text">Stok: ${p.stok} ${p.satuan}</p>
                        <p class="harga">Rp ${p.harga.toLocaleString('id-ID')}</p>
                        <div class="card-footer">
                            <button class="btn-action btn-detail" onclick="showDetail(${p.id})">👁 Detail</button>
                            <button class="btn-action btn-beli" onclick="addToCart(${p.id})">🛒 Beli</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    function showDetail(id) {
        const p = dataProduk.find(x => x.id === id);
        document.getElementById('detailImg').src = p.img;
        document.getElementById('detailNama').innerText = p.nama;
        document.getElementById('detailBadge').innerText = p.kategori;
        document.getElementById('detailHarga').innerText = 'Rp ' + p.harga.toLocaleString('id-ID');
        document.getElementById('detailSatuan').innerText = p.satuan;
        document.getElementById('detailStok').innerText = p.stok + ' ' + p.satuan;

        document.getElementById('addFromDetail').onclick = function() {
            addToCart(p.id);
            closeModal('detailModal');
        };

        openModal('detailModal');
    }

    function filterProduk(kat, el) {
        document.querySelectorAll('#categoryTabs button').forEach(b => b.classList.remove('active'));
        el.classList.add('active');
        document.getElementById('categoryTitle').innerText = kat === 'Semua' ? 'Semua Produk' : kat;
        renderProduk(kat);
    }

    // --- KERANJANG ---
    function addToCart(id) {
        if (!isLogin) {
        showToast("Silakan masuk (Login) terlebih dahulu untuk mulai belanja.");
        openModal('loginModal');
        return;
    }
        const p = dataProduk.find(x => x.id === id);
        const exists = cart.find(item => item.id === id);
        if (exists) {
            exists.qty++;
        } else {
            cart.push({...p, qty: 1});
        }
        updateCartCount();
        showToast(`${p.nama} ditambahkan!`);
    }

    function updateCartCount() {
        const count = cart.reduce((acc, item) => acc + item.qty, 0);
        const countEl = document.getElementById('cartCount');
        if(countEl) countEl.innerText = count;
    }

    function openCart() {
        const container = document.getElementById('cartItems');
        container.innerHTML = cart.length === 0 ? '<p style="text-align:center; padding:20px;">Keranjang kosong</p>' : '';

        let total = 0;
        cart.forEach((item, index) => {
            const subtotal = item.harga * item.qty;
            total += subtotal;
            container.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}">
                    <div style="flex:1">
                        <strong>${item.nama}</strong><br>
                        <small>Rp ${item.harga.toLocaleString('id-ID')} / ${item.satuan}</small>
                        <div class="qty-control">
                            <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                        </div>
                    </div>
                    <div style="text-align:right">
                        <span style="color:red; cursor:pointer; font-size:18px;" onclick="removeItem(${index})">🗑</span><br>
                        <strong style="color:#ff6a00">Rp ${subtotal.toLocaleString('id-ID')}</strong>
                    </div>
                </div>
            `;
        });
        document.getElementById('cartTotalDisplay').innerText = 'Rp ' + total.toLocaleString('id-ID');
        openModal('cartModal');
    }

    function changeQty(index, delta) {
        cart[index].qty += delta;
        if (cart[index].qty < 1) cart.splice(index, 1);
        updateCartCount();
        openCart();
    }

    function removeItem(index) {
        cart.splice(index, 1);
        updateCartCount();
        openCart();
    }

    function processCheckout() {
        if (cart.length === 0) return showToast("Keranjang kosong!");
        // 1. Hitung total harga dari semua item di keranjang
    const totalHarga = cart.reduce((acc, item) => acc + (item.harga * item.qty), 0);

    // 2. Format ke mata uang Rupiah
    const formattedTotal = totalHarga.toLocaleString('id-ID');

    // 3. Tampilkan notifikasi keberhasilan dengan total harga
    showToast(`Checkout berhasil! Total: Rp ${formattedTotal}`);

    // 4. Kosongkan keranjang setelah berhasil
    cart = [];
    updateCartCount();
    closeModal('cartModal');

    // Opsional: tampilkan toast
    showToast("Pesanan Anda sedang kami siapkan!");
    }

    // --- UI HELPERS ---
    function openModal(id) { document.getElementById(id).style.display = 'flex'; }
    function closeModal(id) { document.getElementById(id).style.display = 'none'; }
    function openRegister() { closeModal('loginModal'); openModal('registerModal'); }

    function showToast(message) {
        const container = document.getElementById('toastContainer');
        document.getElementById('toastMessage').innerText = message;
        container.style.display = 'block';
        setTimeout(() => { container.style.display = 'none'; }, 3000);
    }

    window.onload = () => renderProduk('Semua');
</script>

</body>
</html>
