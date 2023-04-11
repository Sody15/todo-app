import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { LOCALSTORAGE_USERID, LOCALSTORAGE_USERNAME } from '@/global';
import { User } from '@/models';

const useAuth = () => {
  console.log('useAuth');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem(LOCALSTORAGE_USERID);
    const userName = localStorage.getItem(LOCALSTORAGE_USERNAME);

    if (!userId || !userName) {
      // Redirect the user to the auth page if they are not authenticated
      router.push('/auth');
    } else {
      setUser({ userName, _id: userId });
    }
  }, []);

  console.log(user);
  return user;
};

export default useAuth;
