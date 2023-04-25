import React, { useContext } from 'react';

import { Checkbox, TagList } from '@components';
import NavContext from '@/context/NavContext';

const Nav = () => {
  const { toggleHideDone, updateFilters } = useContext(NavContext);

  return (
    <div className='nav grid grid-cols-2 gap-x-3  md:gap-x-0 md:flex my-12 md:justify-start md:m-0 gap-y-3 md:flex-col dark:text-white'>
      <TagList onTagChange={(tags) => updateFilters(tags)} />
      <div className='hidden md:block py-6'>
        <Checkbox name='hide-done' label='Hide Done Tasks' onChange={toggleHideDone} />
      </div>
    </div>
  );
};

export default Nav;
