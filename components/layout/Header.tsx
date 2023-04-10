import React, { useState } from 'react';

import { TaskForm, Portal, Logo } from '@components';

const Header = () => {
  const [isAddTask, setIsAddTask] = useState(false);

  return (
    <header className='flex justify-between items-center py-3'>
      <Logo />
      <button
        className='text-6xl text-custom-dark-1 -translate-y-1'
        type='button'
        onClick={() => setIsAddTask((prevState) => !prevState)}
      >
        +
      </button>
      {isAddTask && (
        <Portal>
          <TaskForm onClose={() => setIsAddTask(false)} />
        </Portal>
      )}
    </header>
  );
};

export default Header;
