import React, { FC } from 'react';

// Map to hold tag colors based on name
const tags = new Map<string, string>([
  ['work', '#d2ceff'],
  ['study', '#d1e7f7'],
  ['entertainment', '#ffcece'],
  ['family', '#daf2d6'],
]);

export const Tag: FC<{ name: string; showText: Boolean }> = ({
  name,
  showText,
}) => {
  return (
    <button
      key={name}
      className="flex items-center rounded-xl gap-2 text-custom-dark-1"
      type="button"
    >
      <span
        className="rounded-3xl h-10 w-10 inline-block"
        style={{ backgroundColor: tags.get(name) }}
      ></span>
      {showText && name}
    </button>
  );
};
