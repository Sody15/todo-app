import { Dispatch, SetStateAction, createContext } from 'react';

type Context = {
  hideDone: boolean;
  toggleHideDone: () => void;
  tagFilters: string[];
  updateFilters: (tags: string[]) => void;
};

const initialState: Context = {
  hideDone: false,
  toggleHideDone: () => null,
  tagFilters: [],
  updateFilters: () => null,
};

const NavContext = createContext<Context>(initialState);

export default NavContext;
