import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center w-20 h-20 after:content-[''] after:block after:w-28 after:h-18  after:rounded-full after:border-8 after:border-y-[#ffcece] after:border-x-transparent after:animate-spin"></div>
  );
};

export default Loader;
