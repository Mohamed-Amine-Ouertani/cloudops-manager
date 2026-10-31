'use client';

import { useState, useEffect } from 'react';   
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearAuth, getUser } from '@/lib/auth';
import type { AuthUser } from '@/lib/auth';

const NAV = [
  { href: '/',             icon: '📊', label: 'Dashboard'    },
  { href: '/teams',        icon: '👥', label: 'Teams'        },
  { href: '/projects',     icon: '📁', label: 'Projects'     },
  { href: '/servers',      icon: '🖥️', label: 'Servers'      },
  { href: '/applications', icon: '📱', label: 'Applications' },
  { href: '/monitoring',   icon: '📈', label: 'Monitoring'   },
  { href: '/alerts',       icon: '🚨', label: 'Alerts'       },
  { href: '/incidents',    icon: '⚡', label: 'Incidents'    },
];

export function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  // ← KEY FIX: start as null (matches SSR), populate after mount
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col h-screen sticky top-0 shrink-0">

      <div className="p-4 border-b border-gray-800">
        <p className="text-white font-bold text-sm">☁ CloudOps</p>
        <p className="text-gray-500 text-xs mt-0.5">Manager</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {NAV.map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className={'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ' +
                (active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800')}>
              <span>{icon}</span>{label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800">
        {/* Render placeholder on SSR, real data after mount — no mismatch */}
        <p className="text-gray-400 text-xs mb-2 truncate">
          {user?.email ?? ''}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full">
            {user?.role ?? ''}
          </span>
          <button
            onClick={() => { clearAuth(); router.push('/login'); }}
            className="text-xs text-gray-500 hover:text-red-400 transition-colors">
            logout
          </button>
        </div>
      </div>
    </aside>
  );
}