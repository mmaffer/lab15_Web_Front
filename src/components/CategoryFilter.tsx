'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/types/product';

interface Props {
  categories: Category[];
}

export default function CategoryFilter({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('categoryId');

  const select = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set('categoryId', id);
    } else {
      params.delete('categoryId');
    }
    router.push(`/?${params.toString()}`);
  };

  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => select(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
          !active
            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
            : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400 hover:text-indigo-600'
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => select(String(cat.id))}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            active === String(cat.id)
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400 hover:text-indigo-600'
          }`}
        >
          {cat.nombre}
        </button>
      ))}
    </div>
  );
}
