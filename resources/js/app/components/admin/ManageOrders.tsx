import { Package, Check, X, Truck } from "lucide-react";
import { Order } from "../../types";
import { toast } from "sonner";

interface ManageOrdersProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: number, status: Order['status']) => void;
}

export function ManageOrders({ orders, onUpdateOrderStatus }: ManageOrdersProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleProcess = (orderId: number) => {
    onUpdateOrderStatus(orderId, 'processing');
    toast.success('Pesanan sedang diproses');
  };

  const handleShip = (orderId: number) => {
    onUpdateOrderStatus(orderId, 'shipped');
    toast.success('Pesanan telah dikirim');
  };

  const handleReject = (orderId: number) => {
    if (confirm('Yakin ingin menolak pesanan ini?')) {
      onUpdateOrderStatus(orderId, 'rejected');
      toast.error('Pesanan ditolak');
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };

    const labels = {
      pending: 'Menunggu',
      processing: 'Diproses',
      shipped: 'Dikirim',
      rejected: 'Ditolak'
    };

    return (
      <span className={`px-3 py-1 rounded text-sm ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-8 h-8 text-orange-500" />
        <h2 className="text-2xl">Kelola Pesanan</h2>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Belum ada pesanan</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="mb-1">Pesanan #{order.id}</h3>
                  <p className="text-sm text-gray-600">Pelanggan: {order.userName}</p>
                  <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  {getStatusBadge(order.status)}
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t border-b py-4 mb-4">
                <h4 className="text-sm mb-3">Item Pesanan:</h4>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p>{item.product.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} {item.product.unit} × {formatPrice(item.product.price)}
                          </p>
                        </div>
                      </div>
                      <p className="text-orange-600">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total and Actions */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Pembayaran:</p>
                  <p className="text-xl text-orange-600">{formatPrice(order.totalPrice)}</p>
                </div>
                
                <div className="flex gap-2">
                  {order.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleProcess(order.id)}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                      >
                        <Check className="w-4 h-4" />
                        Proses
                      </button>
                      <button
                        onClick={() => handleReject(order.id)}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                      >
                        <X className="w-4 h-4" />
                        Tolak
                      </button>
                    </>
                  )}
                  
                  {order.status === 'processing' && (
                    <button
                      onClick={() => handleShip(order.id)}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                    >
                      <Truck className="w-4 h-4" />
                      Kirim
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
