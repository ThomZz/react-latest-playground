import { render as baseRender, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function renderWithDefaultProviders(ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return baseRender(ui, { wrapper, ...options });
}
