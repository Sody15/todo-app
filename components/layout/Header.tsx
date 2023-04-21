import React, { useEffect, useRef, useState } from 'react';

import { TaskForm, Portal, Logo } from '@components';
import { signOut } from 'next-auth/react';

import { IoMdSettings } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';

const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddTask, setIsAddTask] = useState(false);

  const settingsRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setIsSettingsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='flex justify-between items-center py-3'>
      <Logo />
      <div className='flex justify-center gap-4 items-center'>
        <button type='button' onClick={() => setIsAddTask((prevState) => !prevState)}>
          <GoPlus size={40} />
        </button>
        <button className='relative' onClick={() => setIsSettingsOpen((prevVal) => !prevVal)} ref={settingsRef}>
          <IoMdSettings size={40} />
          {isSettingsOpen && (
            <div className='absolute right-0 top-full bg-white rounded-xl shadow-lg z-10'>
              <div className='p-4 w-48 text-left text-gray-400 hover:bg-gray-50 rounded-t-xl' onClick={() => signOut()}>
                Logout
              </div>
            </div>
          )}
        </button>
      </div>
      {isAddTask && (
        <Portal>
          <TaskForm onClose={() => setIsAddTask(false)} />
        </Portal>
      )}
    </header>
  );
};

export default Header;
