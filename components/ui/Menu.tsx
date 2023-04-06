import React, { FC, useState } from 'react';

const Menu: FC<{ onEdit: () => void; onDelete: () => void }> = ({
  onEdit,
  onDelete,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsMenuOpen((prevState) => !prevState)}
        className="text-3xl text-gray-300 -translate-y-2.5"
      >
        ...
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 bg-white rounded-xl shadow-lg z-10">
          <button
            className="p-4 border-b-2 w-48 text-left hover:bg-gray-50 rounded-t-xl"
            onClick={onEdit}
          >
            Edit...
          </button>
          <button
            className="p-4 w-48 text-left hover:bg-gray-50 rounded-b-xl"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
