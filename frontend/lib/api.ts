// lib/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach JWT ──────────────────────────────────────
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

// ── Response interceptor: handle 401 ─────────────────────────────────────
let redirecting = false;

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && !redirecting && typeof window !== 'undefined') {
      redirecting = true;
      localStorage.removeItem('access_token');
      localStorage.removeItem('auth_user');
      document.cookie = 'access_token=; path=/; max-age=0';
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);