// lib/auth.ts
const TOKEN = 'access_token';
const USER  = 'auth_user';

export interface AuthUser {
  id: string;
  email: string;
  role: 'ADMIN' | 'DEVOPS' | 'VIEWER';
}

// Called after a successful login or register
export function setAuth(token: string, user: AuthUser): void {
  localStorage.setItem(TOKEN, token);
  localStorage.setItem(USER, JSON.stringify(user));
  // Cookie for middleware (Edge Runtime can't read localStorage)
  document.cookie = TOKEN + '=' + token + '; path=/; max-age=' + 7 * 24 * 60 * 60;
}

export function clearAuth(): void {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER);
  document.cookie = TOKEN + '=; path=/; max-age=0';
}

export function getToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN) : null;
}

export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER);
  return raw ? JSON.parse(raw) : null;
}

// lib/auth.ts — add export to the interface (it may already be there)
export interface AuthUser {
  id: string;
  email: string;
  role: 'ADMIN' | 'DEVOPS' | 'VIEWER';
}