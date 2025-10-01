export interface Product {
  id: string;
  title: string;
  categoryId: string;
  price: number;
  rating: number;
  thumbnail: string;
  description: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductCardProps {
  product: Product;
}