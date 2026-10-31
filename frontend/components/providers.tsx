// components/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // One QueryClient per browser session
  const [qc] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,          // data stays fresh for 30s
        retry: 1,                   // retry once on failure
        refetchOnWindowFocus: false, // don't refetch on tab switch
      },
    },
  }));

  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}