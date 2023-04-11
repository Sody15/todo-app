import { User } from '@/models';
import { createContext } from 'react';

type Context = {
  user: User | null;
};

const initialState: Context = {
  user: null,
};

const UserContext = createContext<Context>(initialState);

export default UserContext;
