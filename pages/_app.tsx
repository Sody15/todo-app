import '@/styles/globals.css';
import '@/styles/images.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {' '}
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
