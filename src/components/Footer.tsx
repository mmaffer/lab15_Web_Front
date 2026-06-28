import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-base font-bold text-gray-900 tracking-tight">
            Product<span className="text-indigo-600">Store</span>
          </span>
          <div className="flex gap-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Productos
            </Link>
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Ingresar
            </Link>
            <Link href="/register" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Registrarse
            </Link>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ProductStore
          </p>
        </div>
      </div>
    </footer>
  );
}
