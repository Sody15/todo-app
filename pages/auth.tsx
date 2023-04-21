import { AuthForm } from '@/components';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

// Redirect to landing page if session exists
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const AuthPage = () => {
  return (
    <>
      <Head>
        <title>Todo- Auth</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width, maximum-scale=1.0' />
        <meta
          name='description'
          content='Auth page for simple todo app that helps you keep track of all those little important things in life.'
        />
      </Head>
      <div className='flex justify-center mt-10 -mx-6'>
        <AuthForm />
      </div>
    </>
  );
};

export default AuthPage;
