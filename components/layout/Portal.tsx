import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal: FC<{ children: ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return createPortal(children, document.getElementById('portal')!);
};

export default Portal;
