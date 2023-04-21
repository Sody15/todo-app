import { AuthForm } from '@/components';
import Head from 'next/head';

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
