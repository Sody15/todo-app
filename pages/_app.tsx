import type { AppProps } from 'next/app';
import { Ubuntu } from 'next/font/google';

import { SessionProvider } from 'next-auth/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@/styles/globals.css';
import '@/styles/images.css';

const ubuntu = Ubuntu({ weight: ['300', '500', '700'], subsets: ['latin'] });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // Create Tanstack QueryClient
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <main className={ubuntu.className}>
          <Component {...pageProps} />
        </main>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
}
