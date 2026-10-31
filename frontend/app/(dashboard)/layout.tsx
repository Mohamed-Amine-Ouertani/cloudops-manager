// app/(dashboard)/layout.tsx
// This layout wraps every dashboard page with the sidebar.
// It is a Server Component — no 'use client' needed.


import { Sidebar }    from '@/components/sidebar';
import { AuthGuard }  from '@/components/auth-guard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-950">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </AuthGuard>
  );
}