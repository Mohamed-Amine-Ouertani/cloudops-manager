// app/(auth)/login/page.tsx
'use client';
import { getToken } from '@/lib/auth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { setAuth } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) window.location.href = '/';
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      setAuth(data.access_token, data.user);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Invalid credentials');
    } finally { setLoading(false); }
  }

  const inp = 'w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 ' +
              'text-white text-sm focus:border-blue-500 focus:outline-none';


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-md">
        <h1 className="text-xl font-bold text-white mb-1">☁ CloudOps Manager</h1>
        <p className="text-gray-400 text-sm mb-6">Sign in to your account</p>

        {error && (
          <div className="bg-red-950 border border-red-800 text-red-400 rounded-lg p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Email</label>
            <input type="email" className={inp} placeholder="admin@cloudops.dev"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Password</label>
            <input type="password" className={inp} placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-medium transition-colors">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-4">
          No account? <a href="/register" className="text-blue-400 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}