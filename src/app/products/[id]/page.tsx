import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { Product, ApiResponse } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const res = await fetch(`${API_URL}/products/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data: ApiResponse<Product> = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        ← Volver a productos
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {product.imageUrl && (
          <div className="relative h-72 w-full bg-gray-100">
            <Image
              src={product.imageUrl}
              alt={product.nombre}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        )}

        <div className="p-8">
          {product.category && (
            <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-3">
              {product.category.nombre}
            </span>
          )}

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.nombre}</h1>

          <div className="inline-flex items-baseline gap-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 mb-6">
            <span className="text-sm text-gray-500 font-medium">S/</span>
            <span className="text-4xl font-bold text-gray-900">
              {Number(product.precio).toFixed(2)}
            </span>
          </div>

          {product.descripcion && (
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Descripción
              </h2>
              <p className="text-gray-700 leading-relaxed">{product.descripcion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
