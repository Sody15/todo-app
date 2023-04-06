import Image from 'next/image';
import React, { useState } from 'react';

import logo from '../../public/images/logo.png';
import { createPortal } from 'react-dom';
import AddTaskForm from './AddTaskForm';
import Portal from './Portal';

const Header = () => {
  const [isAddTask, setIsAddTask] = useState(true);

  return (
    <header className="flex justify-between">
      <Image src={logo} alt="logo" width={100} />
      <button
        className="text-6xl text-custom-dark-1"
        type="button"
        onClick={() => setIsAddTask((prevState) => !prevState)}
      >
        +
      </button>
      {isAddTask && (
        <Portal>
          <AddTaskForm onCancel={() => setIsAddTask(false)} />
        </Portal>
      )}
    </header>
  );
};

export default Header;
