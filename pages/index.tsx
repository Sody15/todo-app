import Head from 'next/head';
import Image from 'next/image';
import { Ubuntu } from 'next/font/google';

import Header from '@/components/layout/Header';
import Tags from '@/components/layout/Tags';
import Tasks from '@/components/layout/Tasks';

const ubuntu = Ubuntu({ weight: ['300', '500', '700'], subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />
      <main className={ubuntu.className}>
        <Tags />
        <Tasks />
      </main>
    </>
  );
}
