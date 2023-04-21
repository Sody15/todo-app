import useClickOutside from '@/hooks/useClickOutside';
import React, { FC, useEffect, useRef, useState } from 'react';

const Menu: FC<{ onEdit: () => void; onDelete: () => void }> = ({ onEdit, onDelete }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const { isOpen: isMenuOpen, setIsOpen: setIsMenuOpen } = useClickOutside(false, menuRef);

  const editHandler = () => {
    onEdit();
    setIsMenuOpen(false);
  };

  const deleteHandler = () => {
    onDelete();
    setIsMenuOpen(false);
  };

  return (
    <div className='relative' ref={menuRef}>
      <button
        type='button'
        onClick={() => setIsMenuOpen((prevState) => !prevState)}
        className='text-3xl text-gray-300 -translate-y-2.5'
      >
        ...
      </button>
      {isMenuOpen && (
        <div className='absolute right-0 bg-white rounded-xl shadow-lg z-10'>
          <button
            className='p-4 border-b-2 w-48 text-left text-gray-400 hover:bg-gray-50 rounded-t-xl'
            onClick={editHandler}
          >
            Edit...
          </button>
          <button className='p-4 w-48 text-left text-gray-400 hover:bg-gray-50 rounded-b-xl' onClick={deleteHandler}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
