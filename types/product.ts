export interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}