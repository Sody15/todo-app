import { useEffect, useState } from 'react';

import { LOCALSTORAGE_USERID, LOCALSTORAGE_USERNAME } from '@/global';
import { User } from '@/models';

const useUser = () => {
  console.log('useUser');

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem(LOCALSTORAGE_USERID);
    const userName = localStorage.getItem(LOCALSTORAGE_USERNAME);
    if (userId && userName) {
      setUser({ _id: userId, userName });
    }
  }, []);

  return { user, setUser };
};

export default useUser;
