import { useState } from "react";
import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, name: string) => void;
  onAdminLogin: (email: string, name: string) => void;
}

export function LoginModal({ isOpen, onClose, onLogin, onAdminLogin }: LoginModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Check if admin credentials (silent check)
      if (email === 'admin@tukangin.com' && password === 'admin123') {
        onAdminLogin(email, 'Administrator');
        setEmail("");
        setPassword("");
        setName("");
        return;
      }
      
      // Regular user login
      const userName = name || email.split("@")[0];
      onLogin(email, userName);
      setEmail("");
      setPassword("");
      setName("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl mb-6">
          {isRegister ? "Daftar Akun" : "Masuk"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm mb-2">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              placeholder="contoh@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              placeholder="Masukkan password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded transition"
          >
            {isRegister ? "Daftar" : "Masuk"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {isRegister ? (
            <>
              Sudah punya akun?{" "}
              <button
                onClick={() => setIsRegister(false)}
                className="text-orange-500 hover:underline"
              >
                Masuk di sini
              </button>
            </>
          ) : (
            <>
              Belum punya akun?{" "}
              <button
                onClick={() => setIsRegister(true)}
                className="text-orange-500 hover:underline"
              >
                Daftar di sini
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}