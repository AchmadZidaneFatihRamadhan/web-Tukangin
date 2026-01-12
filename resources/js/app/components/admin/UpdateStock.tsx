import { useState } from "react";
import { Package, Plus, Minus } from "lucide-react";
import { Product } from "../../types";
import { toast } from "sonner";

interface UpdateStockProps {
  products: Product[];
  onUpdateStock: (productId: number, newStock: number) => void;
}

export function UpdateStock({ products, onUpdateStock }: UpdateStockProps) {
  const [stockUpdates, setStockUpdates] = useState<{ [key: number]: number }>({});

  const handleStockChange = (productId: number, change: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const currentValue = stockUpdates[productId] ?? 0;
    const newValue = currentValue + change;
    
    setStockUpdates({
      ...stockUpdates,
      [productId]: newValue
    });
  };

  const handleUpdateStock = (product: Product) => {
    const change = stockUpdates[product.id] ?? 0;
    const newStock = product.stock + change;
    
    if (newStock < 0) {
      toast.error('Stok tidak boleh negatif');
      return;
    }

    onUpdateStock(product.id, newStock);
    setStockUpdates({
      ...stockUpdates,
      [product.id]: 0
    });
    toast.success(`Stok ${product.name} diperbarui`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-8 h-8 text-orange-500" />
        <h2 className="text-2xl">Update Stok</h2>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm">Produk</th>
                <th className="px-4 py-3 text-left text-sm">Kategori</th>
                <th className="px-4 py-3 text-left text-sm">Harga</th>
                <th className="px-4 py-3 text-left text-sm">Stok Saat Ini</th>
                <th className="px-4 py-3 text-left text-sm">Perubahan</th>
                <th className="px-4 py-3 text-left text-sm">Stok Baru</th>
                <th className="px-4 py-3 text-left text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const change = stockUpdates[product.id] ?? 0;
                const newStock = product.stock + change;
                
                return (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStockChange(product.id, -10)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          value={change}
                          onChange={(e) => setStockUpdates({
                            ...stockUpdates,
                            [product.id]: Number(e.target.value)
                          })}
                          className="w-20 text-center py-1 border border-gray-300 rounded"
                        />
                        <button
                          onClick={() => handleStockChange(product.id, 10)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`${newStock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                        {newStock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleUpdateStock(product)}
                        disabled={change === 0}
                        className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white px-4 py-1 rounded text-sm transition"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
