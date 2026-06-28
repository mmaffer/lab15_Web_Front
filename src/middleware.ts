import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register'];
const ADMIN_ROUTES = ['/admin'];

function getUserFromToken(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload as { id: number; email: string; role: string };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const user = token ? getUserFromToken(token) : null;

  // Si ya está autenticado y visita /login o /register, redirigir a /
  if (PUBLIC_ROUTES.includes(pathname)) {
    if (user) return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.next();
  }

  // Ruta protegida sin token válido → /login
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Rutas solo ADMIN
  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  if (isAdminRoute && user.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Aplica a todas las rutas excepto assets de Next.js, imágenes y favicon
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
