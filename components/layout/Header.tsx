import React, { useContext, useRef, useState } from 'react';

import { TaskForm, Portal, Logo } from '@components';
import { signOut } from 'next-auth/react';

import { IoMdSettings } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import useClickOutside from '@/hooks/useClickOutside';
import { MAX_TASKS } from '@/global';
import DarkModeContext from '@/context/DarkModeContext';

const Header = ({ numTasks }: { numTasks: number }) => {
  const [isAddTask, setIsAddTask] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const settingsRef = useRef<HTMLButtonElement>(null);

  const { isOpen: isSettingsOpen, setIsOpen: setIsSettingsOpen } = useClickOutside(false, settingsRef);

  const addTask = () => {
    if (numTasks < MAX_TASKS) {
      setIsAddTask((prevState) => !prevState);
    }
  };

  return (
    <header className='flex justify-between items-center py-3 dark:text-white'>
      <Logo />
      <div className='flex justify-center gap-4 items-center'>
        <button type='button' onClick={addTask} name='add-task'>
          <GoPlus size={40} />
        </button>
        <button
          className='relative'
          onClick={() => setIsSettingsOpen((prevVal) => !prevVal)}
          ref={settingsRef}
          name='dark-mode'
        >
          <IoMdSettings size={40} />
          {isSettingsOpen && (
            <div className='absolute right-0 top-full bg-white rounded-xl shadow-lg z-10'>
              <div className='p-4 w-48 text-left text-gray-400 hover:bg-gray-50 rounded-t-xl' onClick={() => signOut()}>
                Logout
              </div>
              <div
                className='p-4 w-48 text-left text-gray-400 hover:bg-gray-50 rounded-b-xl flex items-center gap-3'
                onClick={toggleDarkMode}
              >
                Dark Mode
                {isDarkMode && <MdDarkMode size={30} />}
                {!isDarkMode && <MdOutlineDarkMode size={30} />}
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
