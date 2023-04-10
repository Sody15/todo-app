import { useState } from 'react';

import Head from 'next/head';
import { Ubuntu } from 'next/font/google';

import { Header, Nav, Tasks } from '@components';
import NavContext from '@/context/NavContext';

const ubuntu = Ubuntu({ weight: ['300', '500', '700'], subsets: ['latin'] });

const Home = () => {
  // Nav Context
  const [hideDone, setHideDone] = useState(false);
  const [tagFilters, setTagFilters] = useState<string[]>([]);

  const toggleHideDone = () => {
    setHideDone((prevVal) => !prevVal);
  };

  const updateFilters = (tags: string[]) => {
    setTagFilters(tags);
  };

  return (
    <NavContext.Provider
      value={{
        hideDone,
        toggleHideDone,
        tagFilters,
        updateFilters,
      }}
    >
      <Head>
        <title>Todo</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content='Simple todo app that helps you keep track of all those little important things in life.'
        />
      </Head>

      <div className={ubuntu.className}>
        <Header />
        <main className='md:grid md:gap-16 md:pt-10 md:grid-cols-[12rem_auto] '>
          <Nav />
          <Tasks />
        </main>
      </div>
    </NavContext.Provider>
  );
};

export default Home;
