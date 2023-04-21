import { useState } from 'react';

import Head from 'next/head';

import { Header, Nav, Tasks } from '@components';
import NavContext from '@/context/NavContext';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

// Redirect to /auth page if no session exists
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const LandingPage = () => {
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
        <meta name='viewport' content='initial-scale=1.0, width=device-width, maximum-scale=1.0' />
        <meta
          name='description'
          content='Simple todo app that helps you keep track of all those little important things in life.'
        />
      </Head>

      <Header />
      <main className='md:grid md:gap-16 md:pt-10 md:grid-cols-[12rem_auto] '>
        <Nav />
        <Tasks />
      </main>
    </NavContext.Provider>
  );
};

export default LandingPage;
