import { Dispatch, SetStateAction, createContext } from 'react';

type Context = {
  hideDone: boolean;
  setHideDone: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<Context>({
  hideDone: false,
  setHideDone: () => null,
});

export default AppContext;
