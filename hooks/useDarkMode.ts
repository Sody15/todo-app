import { useEffect, useState } from 'react';

export default function useDarkMode(): [boolean, () => void] {
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

  // Toggle state
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return [isDarkMode, toggleDarkMode];
}
