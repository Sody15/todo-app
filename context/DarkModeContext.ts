import { createContext } from 'react';

type Context = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const initialState: Context = {
  isDarkMode: false,
  toggleDarkMode: () => null,
};

const DarkModeContext = createContext<Context>(initialState);

export default DarkModeContext;
