import type { AppProps } from 'next/app';
import { Ubuntu } from 'next/font/google';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@/styles/globals.css';
import '@/styles/images.css';
import DarkModeContext from '@/context/DarkModeContext';
import useDarkMode from '@/hooks/useDarkMode';

export const ubuntu = Ubuntu({ weight: ['300', '400', '700'], subsets: ['latin'] });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

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
      <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        <main className={ubuntu.className}>
          <Component {...pageProps} />
        </main>
      </DarkModeContext.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
