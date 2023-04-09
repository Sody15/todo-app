import React, { FC } from 'react';

const Loader: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className || ''}>
      <div className="flex justify-center w-20 h-20 after:content-[''] after:block after:w-28 after:h-18  after:rounded-full after:border-8 after:border-y-[#ffcece] after:border-x-transparent after:animate-spin"></div>
    </div>
  );
};

export default Loader;
