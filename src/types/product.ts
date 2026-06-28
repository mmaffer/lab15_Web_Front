export interface Category {
  id: number;
  nombre: string;
}

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  imageUrl?: string;
  CategoryId?: number;
  category?: Category;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
