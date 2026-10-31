// app/(auth)/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { setAuth } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '', password: '', firstName: '', lastName: '', teamId: '',
  });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/auth/register', form);
      setAuth(data.access_token, data.user);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Registration failed');
    } finally { setLoading(false); }
  }

  const inp = 'w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 ' +
              'text-white text-sm focus:border-blue-500 focus:outline-none';
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-md">
        <h1 className="text-xl font-bold text-white mb-1">☁ CloudOps Manager</h1>
        <p className="text-gray-400 text-sm mb-6">Create an account</p>

        {error && (
          <div className="bg-red-950 border border-red-800 text-red-400 rounded-lg p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">First name</label>
              <input className={inp} value={form.firstName} onChange={set('firstName')} required />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Last name</label>
              <input className={inp} value={form.lastName} onChange={set('lastName')} required />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Email</label>
            <input type="email" className={inp} value={form.email} onChange={set('email')} required />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Password (min 8 chars)</label>
            <input type="password" className={inp} value={form.password}
              onChange={set('password')} required minLength={8} />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">
              Team ID <span className="text-gray-600">— UUID from seed or GET /teams</span>
            </label>
            <input className={inp} value={form.teamId}
              onChange={set('teamId')} placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" required />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-medium transition-colors">
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-4">
          Already have one? <a href="/login" className="text-blue-400 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
}