import { ShoppingCart, User, LogOut } from "lucide-react";
import logo from "figma:asset/f337eeb46b8d5ab9d32522d493011efbb9b2580c.png";
import { User as UserType } from "../types";

interface HeaderProps {
  user: UserType | null;
  cartCount: number;
  onLoginClick: () => void;
  onLogout: () => void;
  onCartClick: () => void;
}

export function Header({ user, cartCount, onLoginClick, onLogout, onCartClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Tukangin" className="w-12 h-12 md:w-16 md:h-16" />
            <div>
              <h1 className="text-xl md:text-2xl">Tukangin</h1>
              <p className="text-xs text-gray-600 hidden md:block">Toko Bahan Bangunan</p>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-500" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:inline text-sm">Keluar</span>
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
              >
                <User className="w-5 h-5" />
                <span className="text-sm">Masuk</span>
              </button>
            )}

            <button
              onClick={onCartClick}
              className="relative flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded transition"
            >
              <ShoppingCart className="w-5 h-5 text-orange-500" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="hidden md:inline text-sm">Keranjang</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
