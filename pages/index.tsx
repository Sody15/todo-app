import { FC } from 'react';

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Ubuntu } from 'next/font/google';

import { Header, Tags, Tasks } from '@components';
import { TaskModel } from '@models';
import { API_ENDPOINT } from '@/global/constants';

const ubuntu = Ubuntu({ weight: ['300', '500', '700'], subsets: ['latin'] });

const Home: FC<{ tasks: TaskModel[] }> = ({ tasks }) => {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={ubuntu.className}>
        <Header />
        <main className="md:grid md:grid-cols-4 md:grid-rows-2 xl:grid-cols-8 md:gap-6 ">
          <Tags />
          <Tasks tasks={tasks} />
        </main>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(API_ENDPOINT + 'tasks');

    if (!res.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const tasks = await res.json();

    return {
      props: {
        tasks,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        tasks: null,
      },
    };
  }
};
