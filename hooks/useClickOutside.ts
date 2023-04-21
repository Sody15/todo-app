import { RefObject, useEffect, useState } from 'react';

const useClickOutside = (open: boolean, elRef: RefObject<HTMLDivElement | HTMLButtonElement>) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (elRef.current && !elRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [elRef]);

  return { isOpen, setIsOpen };
};

export default useClickOutside;
