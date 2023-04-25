import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useDarkMode(): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set mode on init- OS settings
  useEffect(() => {
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
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
}
