import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

// Redirect to Landing Page if session exists or Auth Page if not
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
    redirect: {
      destination: '/auth',
      permanent: false,
    },
  };
};

export default function Slug() {
  return;
}
