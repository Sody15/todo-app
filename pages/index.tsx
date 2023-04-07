import { FC, useState } from 'react';

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Ubuntu } from 'next/font/google';

import { Header, Nav, Tasks } from '@components';
import { TaskModel } from '@models';
import { API_ENDPOINT } from '@/global/constants';
import AppContext from '@/global/context';

const ubuntu = Ubuntu({ weight: ['300', '500', '700'], subsets: ['latin'] });

const Home = () => {
  const [hideDone, setHideDone] = useState(false);

  return (
    <AppContext.Provider value={{ hideDone, setHideDone }}>
      <Head>
        <title>Todo App</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={ubuntu.className}>
        <Header />
        <main className="md:grid md:gap-16 md:pt-10 md:grid-cols-[12rem_auto] ">
          <Nav />
          <Tasks />
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default Home;

// const Home: FC<{ tasks: TaskModel[] }> = ({ tasks }) => {
//   return (
//     <>
//       <Head>
//         <title>Todo App</title>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       </Head>

//       <div className={ubuntu.className}>
//         <Header />
//         <main className="md:grid md:grid-cols-4 md:grid-rows-2 xl:grid-cols-8 md:gap-6 ">
//           <Tags />
//           <Tasks tasks={tasks} />
//         </main>
//       </div>
//     </>
//   );
// };

// export default Home;

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const res = await fetch(API_ENDPOINT + 'tasks');

//     if (!res.ok) {
//       throw new Error('Failed to fetch tasks');
//     }

//     const tasks = await res.json();

//     return {
//       props: {
//         tasks,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         tasks: null,
//       },
//     };
//   }
// };
