// hooks/useTeams.ts  ← copy this pattern for every module
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Team } from '@/types';

// ── Read ─────────────────────────────────────────────────────────────────

export function useTeams(search?: string) {
  return useQuery<Team[]>({
    queryKey: ['teams', search],
    queryFn:  () => api.get('/teams', { params: { search } }).then(r => r.data),
  });
}

export function useTeam(id: string) {
  return useQuery<Team>({
    queryKey: ['teams', id],
    queryFn:  () => api.get('/teams/' + id).then(r => r.data),
    enabled:  !!id,
  });
}

// ── Create ────────────────────────────────────────────────────────────────

export function useCreateTeam() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: { name: string; description?: string }) =>
      api.post('/teams', dto).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['teams'] }),
  });
}

// ── Update ────────────────────────────────────────────────────────────────

export function useUpdateTeam() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...dto }: { id: string; name?: string; description?: string }) =>
      api.patch('/teams/' + id, dto).then(r => r.data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['teams'] });
      qc.invalidateQueries({ queryKey: ['teams', id] });
    },
  });
}

// ── Delete ────────────────────────────────────────────────────────────────

export function useDeleteTeam() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete('/teams/' + id).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['teams'] }),
  });
}

// ─── Pattern for other modules ───────────────────────────────────────────
// Copy this file, swap Team → Project/Server/etc., update the endpoint path
// and the queryKey. The rest is identical.