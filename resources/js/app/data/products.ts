import { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Semen Portland 50kg",
    category: "Semen",
    price: 65000,
    unit: "sak",
    image: "https://images.unsplash.com/photo-1523293915678-d126868e96f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZW1lbnQlMjBiYWdzfGVufDF8fHx8MTc2NTk3OTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Semen berkualitas tinggi untuk berbagai kebutuhan konstruksi",
    stock: 250
  },
  {
    id: 2,
    name: "Besi Beton 10mm x 12m",
    category: "Besi & Baja",
    price: 85000,
    unit: "batang",
    image: "https://images.unsplash.com/photo-1763771420746-c75fefab51b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMHJlaW5mb3JjZW1lbnQlMjBiYXJzfGVufDF8fHx8MTc2NTk1MjI0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Besi beton polos untuk struktur bangunan",
    stock: 500
  },
  {
    id: 3,
    name: "Bata Merah Press",
    category: "Bata",
    price: 850,
    unit: "biji",
    image: "https://images.unsplash.com/photo-1584505192555-4feb7834358a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBicmlja3N8ZW58MXx8fHwxNzY2MDQ4MzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Bata merah berkualitas untuk dinding dan pagar",
    stock: 10000
  },
  {
    id: 4,
    name: "Cat Tembok Premium 20L",
    category: "Cat",
    price: 450000,
    unit: "pail",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwcGFpbnR8ZW58MXx8fHwxNzY2MDQ4MzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Cat tembok dengan daya tutup maksimal dan tahan lama",
    stock: 120
  },
  {
    id: 5,
    name: "Keramik 40x40 cm",
    category: "Keramik",
    price: 55000,
    unit: "m²",
    image: "https://images.unsplash.com/photo-1523350165414-082d792c4bcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwdGlsZXN8ZW58MXx8fHwxNzY2MDExMzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Keramik lantai motif modern anti slip",
    stock: 800
  },
  {
    id: 6,
    name: "Pasir Beton",
    category: "Pasir",
    price: 350000,
    unit: "m³",
    image: "https://images.unsplash.com/photo-1605173983206-33cd0f25267e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kJTIwZ3JhdmVsfGVufDF8fHx8MTc2NjA0ODM3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Pasir beton berkualitas untuk adukan cor",
    stock: 50
  },
  {
    id: 7,
    name: "Genteng Keramik",
    category: "Genteng",
    price: 12000,
    unit: "biji",
    image: "https://images.unsplash.com/photo-1518736346281-76873166a64a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwdGlsZXN8ZW58MXx8fHwxNzY1OTU3MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Genteng keramik tahan lama dan anti bocor",
    stock: 5000
  },
  {
    id: 8,
    name: "Pipa PVC 3 inch",
    category: "Pipa",
    price: 45000,
    unit: "batang",
    image: "https://images.unsplash.com/photo-1529269421632-e9253d14d3a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBwaXBlfGVufDF8fHx8MTc2NjA0ODM3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Pipa PVC untuk saluran air dan drainase",
    stock: 300
  }
];

export const categories = [
  "Semua",
  "Semen",
  "Besi & Baja",
  "Bata",
  "Cat",
  "Keramik",
  "Pasir",
  "Genteng",
  "Pipa"
];
