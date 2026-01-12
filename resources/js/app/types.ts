export interface User {
  email: string;
  name: string;
}

export interface Order {
  id: number;
  userId: string;
  userName: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'rejected';
  createdAt: Date;
}

export interface Admin {
  email: string;
  name: string;
  isAdmin: true;
}