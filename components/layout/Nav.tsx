import React, { useContext } from 'react';

import { Checkbox, Tag } from '@components';
import { TAGS } from '@/global/constants';
import AppContext from '@/global/context';

const Nav = () => {
  const { hideDone, setHideDone } = useContext(AppContext);

  console.log(hideDone);

  return (
    <div className="flex justify-between my-12 flex-wrap md:justify-start md:m-0 gap-y-3 md:flex-col md:gap-8 md:col-span-1">
      {TAGS.map((tag) => (
        <Tag key={tag} text={tag} showText={true} />
      ))}
      <div className="hidden md:block py-6">
        <Checkbox
          name="hide-done"
          label="Hide Done Tasks"
          onChange={() => setHideDone((prevVal) => !prevVal)}
        />
      </div>
    </div>
  );
};

export default Nav;
