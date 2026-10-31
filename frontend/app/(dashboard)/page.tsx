// app/(dashboard)/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

interface Stats {
  teams: number; projects: number; servers: number;
  applications: number; alerts: number; incidents: number;
}

const CARDS = [
  { key: 'teams',        label: 'Teams',          color: 'text-blue-400',   icon: '👥' },
  { key: 'projects',     label: 'Projects',        color: 'text-purple-400', icon: '📁' },
  { key: 'servers',      label: 'Servers',         color: 'text-green-400',  icon: '🖥️' },
  { key: 'applications', label: 'Applications',    color: 'text-green-400',  icon: '📱' },
  { key: 'alerts',       label: 'Active Alerts',   color: 'text-amber-400',  icon: '🚨' },
  { key: 'incidents',    label: 'Open Incidents',  color: 'text-red-400',    icon: '⚡' },
] as const;

export default function DashboardPage() {
  const { data, isLoading } = useQuery<Stats>({
    queryKey: ['dashboard'],
    queryFn:  () => api.get('/dashboard').then(r => r.data),
    // Refresh every 30 seconds automatically
    refetchInterval: 30_000,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-6">Overview of your cloud infrastructure</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CARDS.map(({ key, label, color, icon }) => (
          <div key={key} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-sm">{label}</p>
              <span className="text-xl">{icon}</span>
            </div>
            {isLoading
              ? <div className="h-9 bg-gray-800 rounded animate-pulse" />
              : <p className={'text-3xl font-bold ' + color}>{data?.[key] ?? 0}</p>
            }
          </div>
        ))}
      </div>
    </div>
  );
}