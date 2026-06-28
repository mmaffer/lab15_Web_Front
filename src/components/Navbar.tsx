'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getUser, logout, AuthUser } from '@/lib/auth';

export default function Navbar() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setUser(getUser());
  }, []);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href
        ? 'text-gray-900'
        : 'text-gray-500 hover:text-gray-900'
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              Product<span className="text-indigo-600">Store</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link href="/" className={linkClass('/')}>Productos</Link>
                {user.role === 'ADMIN' && (
                  <Link href="/admin" className={linkClass('/admin')}>Admin</Link>
                )}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <span className="text-xs text-gray-400 hidden sm:block">{user.email}</span>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors"
                  >
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  Ingresar
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
