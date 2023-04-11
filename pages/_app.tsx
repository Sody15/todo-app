import type { AppProps } from 'next/app';
import { Ubuntu } from 'next/font/google';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import useAuth from '@/hooks/useAuth';
import '@/styles/globals.css';
import '@/styles/images.css';
import UserContext from '@/context/UserContext';

const ubuntu = Ubuntu({ weight: ['300', '500', '700'], subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  // Auth hook to navigate user to auth page if not logged in - also sets the auth context
  const user = useAuth();

  // Create Tanstack QueryClient
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user }}>
        <main className={ubuntu.className}>
          <Component {...pageProps} />
        </main>
      </UserContext.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
