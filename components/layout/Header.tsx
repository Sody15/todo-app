import React, { useState } from 'react';

import { TaskForm, Portal, Logo } from '@components';
import { signOut } from 'next-auth/react';

const Header = () => {
  const [isAddTask, setIsAddTask] = useState(false);

  return (
    <header className='flex justify-between items-center py-3'>
      <Logo />
      <div className='flex justify-center gap-4'>
        <button
          className='text-6xl text-custom-dark-1 -translate-y-1'
          type='button'
          onClick={() => setIsAddTask((prevState) => !prevState)}
        >
          +
        </button>
        <button onClick={() => signOut()}>Logout</button>
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
