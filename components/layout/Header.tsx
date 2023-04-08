import Image from 'next/image';
import React, { useState } from 'react';

import logo from '../../public/images/logo.png';
import { AddTaskForm, Portal } from '@components';

const Header = () => {
  const [isAddTask, setIsAddTask] = useState(false);

  return (
    <header className='flex justify-between'>
      <Image src={logo} alt='logo' width={100} priority={true} />
      <button
        className='text-6xl text-custom-dark-1'
        type='button'
        onClick={() => setIsAddTask((prevState) => !prevState)}
      >
        +
      </button>
      {isAddTask && (
        <Portal>
          <AddTaskForm onClose={() => setIsAddTask(false)} />
        </Portal>
      )}
    </header>
  );
};

export default Header;
