import clsx from 'clsx';
import React, { FC, useState } from 'react';

// Map to hold tag colors based on name
const tags = new Map<string, string>([
  ['work', '#d2ceff'],
  ['study', '#d1e7f7'],
  ['entertainment', '#ffcece'],
  ['family', '#daf2d6'],
]);

const Tag: FC<{ text: string; showText: boolean; selected?: boolean }> = ({
  text,
  showText,
  selected = false,
}) => {
  const [isSelected, setIsSelected] = useState(selected);

  return (
    <button
      key={text}
      className={clsx(
        'flex items-center rounded-xl gap-2 text-custom-dark-1 font-normal',
        {
          'bg-gray-100': isSelected,
          'py-2 px-3': showText,
        }
      )}
      type="button"
      onClick={() => setIsSelected((prevState) => !prevState)}
    >
      <span
        className="rounded-3xl h-10 w-10 inline-block"
        style={{ backgroundColor: tags.get(text) }}
      ></span>
      {showText && text}
    </button>
  );
};

export default Tag;
