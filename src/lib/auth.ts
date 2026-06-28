const TOKEN_KEY = 'token';
const SEVEN_DAYS = 7 * 24 * 60 * 60;

export interface AuthUser {
  id: number;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export function saveToken(token: string): void {
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${SEVEN_DAYS}; SameSite=Lax`;
}

export function getToken(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${TOKEN_KEY}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function removeToken(): void {
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

export function getUser(): AuthUser | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { id: payload.id, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

export function logout(): void {
  removeToken();
  window.location.href = '/login';
}
