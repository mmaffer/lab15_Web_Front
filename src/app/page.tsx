import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { Product, Category, ApiResponse } from '@/types/product';
import CategoryFilter from '@/components/CategoryFilter';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function getAuthHeaders(): Promise<HeadersInit> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      headers: await getAuthHeaders(),
      cache: 'no-store',
    });
    const data: ApiResponse<Category[]> = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

async function getProducts(categoryId?: string): Promise<Product[]> {
  try {
    const url = categoryId
      ? `${API_URL}/products?categoryId=${categoryId}`
      : `${API_URL}/products`;
    const res = await fetch(url, {
      headers: await getAuthHeaders(),
      cache: 'no-store',
    });
    const data: ApiResponse<Product[]> = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string }>;
}) {
  const { categoryId } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(categoryId),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
        <p className="text-gray-500 mt-1 text-sm">{products.length} producto{products.length !== 1 ? 's' : ''} disponible{products.length !== 1 ? 's' : ''}</p>
      </div>

      <Suspense>
        <CategoryFilter categories={categories} />
      </Suspense>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-400 text-lg">No hay productos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {product.imageUrl ? (
                <div className="relative h-48 w-full bg-gray-100">
                  <Image
                    src={product.imageUrl}
                    alt={product.nombre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                  <span className="text-gray-300 text-4xl">📦</span>
                </div>
              )}

              <div className="p-5">
                {product.category && (
                  <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mb-2">
                    {product.category.nombre}
                  </span>
                )}
                <h2 className="text-base font-semibold text-gray-900 mb-3 line-clamp-1">
                  {product.nombre}
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    S/ {Number(product.precio).toFixed(2)}
                  </span>
                  <span className="text-xs text-indigo-600 font-medium group-hover:underline">
                    Ver detalle →
                  </span>
                </div>
                {product.descripcion && (
                  <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                    {product.descripcion}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
