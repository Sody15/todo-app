import React from 'react';

import { Checkbox, Tag } from '@components';
import { TAGS } from '@/global/constants';

const Tags = () => {
  return (
    <div className="flex justify-between my-12 flex-wrap md:justify-start md:m-0 gap-y-3 md:flex-col md:gap-8 md:col-span-1">
      {TAGS.map((tag) => (
        <Tag key={tag} text={tag} showText={true} />
      ))}
      <Checkbox checked={false} name="hide-done" text="Hide Done Tasks" />
    </div>
  );
};

export default Tags;
