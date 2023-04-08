import React, { useContext, useState } from 'react';

import { Checkbox, Tag, TagList } from '@components';
import NavContext from '@/context/NavContext';

const Nav = () => {
  const { toggleHideDone, updateFilters } = useContext(NavContext);

  return (
    <div className='flex justify-between my-12 flex-wrap md:justify-start md:m-0 gap-y-3 md:flex-col md:gap-8  '>
      <TagList onTagChange={(tags) => updateFilters(tags)} />
      <div className='hidden md:block py-6'>
        <Checkbox
          name='hide-done'
          label='Hide Done Tasks'
          onChange={toggleHideDone}
        />
      </div>
    </div>
  );
};

export default Nav;
