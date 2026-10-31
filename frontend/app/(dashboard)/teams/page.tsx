// app/(dashboard)/teams/page.tsx
'use client';

import { useState } from 'react';
import { useTeams, useCreateTeam, useDeleteTeam } from '@/hooks/useTeams';

export default function TeamsPage() {
  const [search,   setSearch]   = useState('');
  const [showForm, setShowForm] = useState(false);
  const [name,     setName]     = useState('');
  const [desc,     setDesc]     = useState('');

  const { data: teams, isLoading } = useTeams(search || undefined);
  const create = useCreateTeam();
  const del    = useDeleteTeam();

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await create.mutateAsync({ name, description: desc || undefined });
    setName(''); setDesc(''); setShowForm(false);
  }

  const inp = 'bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none';

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Teams</h1>
        <button onClick={() => setShowForm(v => !v)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + New Team
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form onSubmit={handleCreate}
          className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4 space-y-3">
          <input className={'w-full ' + inp} placeholder="Team name *"
            value={name} onChange={e => setName(e.target.value)} required />
          <input className={'w-full ' + inp} placeholder="Description (optional)"
            value={desc} onChange={e => setDesc(e.target.value)} />
          <div className="flex gap-2">
            <button type="submit" disabled={create.isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50">
              {create.isPending ? 'Creating…' : 'Create'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-white text-sm px-3 py-2">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Search */}
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search teams…"
        className={'w-full mb-4 ' + inp} />

      {/* List */}
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-900 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {teams?.map(team => (
            <div key={team.id}
              className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{team.name}</p>
                {team.description && (
                  <p className="text-gray-400 text-sm mt-0.5">{team.description}</p>
                )}
                {team._count && (
                  <p className="text-gray-600 text-xs mt-1">
                    {team._count.users} members · {team._count.projects} projects
                  </p>
                )}
              </div>
              <button onClick={() => del.mutate(team.id)}
                disabled={del.isPending}
                className="text-gray-600 hover:text-red-400 text-sm transition-colors ml-6 disabled:opacity-50">
                delete
              </button>
            </div>
          ))}
          {teams?.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-10">
              No teams yet — create one above.
            </p>
          )}
        </div>
      )}
    </div>
  );
}