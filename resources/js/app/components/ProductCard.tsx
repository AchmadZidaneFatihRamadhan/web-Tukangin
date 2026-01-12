import { ShoppingCart, Eye } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetail: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetail }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition group">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
          {product.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 min-h-[3rem]">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">
          Stok: {product.stock} {product.unit}
        </p>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-500">Harga</p>
            <p className="text-orange-600 text-lg">
              {formatPrice(product.price)}
            </p>
            <p className="text-xs text-gray-500">/{product.unit}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onViewDetail(product)}
            className="flex-1 flex items-center justify-center gap-2 border border-orange-500 text-orange-500 hover:bg-orange-50 py-2 rounded transition"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm">Detail</span>
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">Beli</span>
          </button>
        </div>
      </div>
    </div>
  );
}
