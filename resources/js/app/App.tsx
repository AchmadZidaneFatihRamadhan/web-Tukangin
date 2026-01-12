import { useState } from "react";
import { Header } from "./components/Header";
import { LoginModal } from "./components/LoginModal";
import { ProductCard } from "./components/ProductCard";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { CartModal } from "./components/CartModal";
import { AdminDashboard } from "./AdminDashboard";
import { products as initialProducts, categories } from "./data/products";
import { User, Product, CartItem, Order, Admin } from "./types";
import { toast } from "sonner";
import { Toaster } from "sonner";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleLogin = (email: string, name: string) => {
    setUser({ email, name });
    setShowLoginModal(false);
    toast.success(`Selamat datang, ${name}!`);
  };

  const handleAdminLogin = (email: string, name: string) => {
    setAdmin({ email, name, isAdmin: true });
    setShowLoginModal(false);
    toast.success(`Selamat datang, ${name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setAdmin(null);
    setCartItems([]);
    toast.success("Anda telah keluar");
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    if (!user) {
      toast.error("Silakan login terlebih dahulu");
      setShowLoginModal(true);
      return;
    }

    const existingItem = cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        toast.error(`Stok tidak mencukupi. Stok tersedia: ${product.stock}`);
        return;
      }
      setCartItems(
        cartItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } else {
      if (quantity > product.stock) {
        toast.error(`Stok tidak mencukupi. Stok tersedia: ${product.stock}`);
        return;
      }
      setCartItems([...cartItems, { product, quantity }]);
    }
    
    toast.success(`${product.name} ditambahkan ke keranjang`);
    setSelectedProduct(null);
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    const item = cartItems.find(item => item.product.id === productId);
    
    if (!item) return;
    
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    if (newQuantity > item.product.stock) {
      toast.error(`Stok tidak mencukupi. Maksimal: ${item.product.stock}`);
      return;
    }

    setCartItems(
      cartItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(cartItems.filter(item => item.product.id !== productId));
    toast.success("Item dihapus dari keranjang");
  };

  const handleCheckout = () => {
    if (!user) return;
    
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    
    const newOrder: Order = {
      id: orders.length + 1,
      userId: user.email,
      userName: user.name,
      items: [...cartItems],
      totalPrice: total,
      status: 'pending',
      createdAt: new Date()
    };

    setOrders([newOrder, ...orders]);
    
    const formattedTotal = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(total);

    toast.success(`Checkout berhasil! Total: ${formattedTotal}`);
    setCartItems([]);
    setShowCartModal(false);
  };

  // Admin functions
  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Math.max(...products.map(p => p.id)) + 1
    };
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (id: number, productData: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...productData } : p));
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: number, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleUpdateStock = (productId: number, newStock: number) => {
    setProducts(products.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  };

  // If admin is logged in, show admin dashboard
  if (admin) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <AdminDashboard
          admin={admin}
          products={products}
          orders={orders}
          onLogout={handleLogout}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onUpdateStock={handleUpdateStock}
        />
      </>
    );
  }

  const filteredProducts = selectedCategory === "Semua"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" richColors />
      
      <Header
        user={user}
        cartCount={cartCount}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        onCartClick={() => setShowCartModal(true)}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Belanja Bahan Bangunan Online
          </h2>
          <p className="text-lg md:text-xl text-orange-100 mb-6">
            Harga terbaik, kualitas terjamin, pengiriman cepat
          </p>
          {!user && (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Mulai Belanja Sekarang
            </button>
          )}
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-12">
        <h3 className="text-2xl mb-6">
          {selectedCategory === "Semua" ? "Semua Produk" : selectedCategory}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onViewDetail={setSelectedProduct}
            />
          ))}
        </div>
      </section>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onAdminLogin={handleAdminLogin}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl mb-2">Tukangin</h3>
          <p className="text-gray-400 mb-4">
            Toko bahan bangunan online terpercaya
          </p>
          <p className="text-sm text-gray-500">
            © 2025 Tukangin. Semua hak dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;