import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useDarkMode(): [boolean, Dispatch<SetStateAction<boolean>>] {
  console.log('inside 1');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode
  useEffect(() => {
    console.log('inside 2');
    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    const applyDark = (mql: MediaQueryList | MediaQueryListEvent) => {
      if (mql.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      setIsDarkMode(mql.matches);
    };

    applyDark(mql);

    mql.onchange = (e) => {
      applyDark(e);
    };
  }, []);

  // Listen for change on state variable
  useEffect(() => {
    console.log('inside 3');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
}
