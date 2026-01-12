import { useState } from "react";
import { LogOut, Package, ShoppingBag, TrendingUp, LayoutDashboard } from "lucide-react";
import { ManageProducts } from "./components/admin/ManageProducts";
import { ManageOrders } from "./components/admin/ManageOrders";
import { UpdateStock } from "./components/admin/UpdateStock";
import { Product, Order, Admin } from "./types";
import logo from "figma:asset/f337eeb46b8d5ab9d32522d493011efbb9b2580c.png";

interface AdminDashboardProps {
  admin: Admin;
  products: Product[];
  orders: Order[];
  onLogout: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (id: number, product: Partial<Product>) => void;
  onDeleteProduct: (id: number) => void;
  onUpdateOrderStatus: (orderId: number, status: Order['status']) => void;
  onUpdateStock: (productId: number, newStock: number) => void;
}

export function AdminDashboard({
  admin,
  products,
  orders,
  onLogout,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onUpdateStock
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'stock'>('dashboard');

  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalRevenue = orders
    .filter(o => o.status === 'shipped')
    .reduce((sum, o) => sum + o.totalPrice, 0);
  const lowStockProducts = products.filter(p => p.stock < 10).length;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Tukangin" className="w-12 h-12" />
              <div>
                <h1 className="text-xl">Admin Dashboard</h1>
                <p className="text-xs text-gray-600">Tukangin</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm">{admin.name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition ${
                activeTab === 'dashboard'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition ${
                activeTab === 'products'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="w-4 h-4" />
              Produk
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition relative ${
                activeTab === 'orders'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Pesanan
              {pendingOrders > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingOrders}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('stock')}
              className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition ${
                activeTab === 'stock'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Stok
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600">Total Produk</h3>
                  <Package className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-3xl">{products.length}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600">Pesanan Pending</h3>
                  <ShoppingBag className="w-8 h-8 text-yellow-500" />
                </div>
                <p className="text-3xl">{pendingOrders}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600">Total Pendapatan</h3>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-2xl">{formatPrice(totalRevenue)}</p>
              </div>
            </div>

            {/* Low Stock Alert */}
            {lowStockProducts > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h3 className="text-red-800 mb-2">⚠️ Peringatan Stok Rendah</h3>
                <p className="text-red-700 text-sm">
                  {lowStockProducts} produk memiliki stok kurang dari 10. Segera perbarui stok!
                </p>
              </div>
            )}

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl mb-4">Pesanan Terbaru</h3>
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b last:border-b-0 py-3">
                  <div>
                    <p className="text-sm">Pesanan #{order.id}</p>
                    <p className="text-xs text-gray-500">{order.userName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-orange-600">{formatPrice(order.totalPrice)}</p>
                    <p className="text-xs text-gray-500 capitalize">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <ManageProducts
            products={products}
            onAddProduct={onAddProduct}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
          />
        )}

        {activeTab === 'orders' && (
          <ManageOrders
            orders={orders}
            onUpdateOrderStatus={onUpdateOrderStatus}
          />
        )}

        {activeTab === 'stock' && (
          <UpdateStock
            products={products}
            onUpdateStock={onUpdateStock}
          />
        )}
      </main>
    </div>
  );
}
