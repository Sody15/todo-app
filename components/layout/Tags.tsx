import React from 'react';

import { Tag } from '../ui/Tag';
import { tags } from '@/global/constants';

const Tags = () => {
  return (
    <div className="flex justify-between my-12 flex-wrap gap-y-3">
      {tags.map((tag) => (
        <Tag key={tag} name={tag} showText={true} />
      ))}
    </div>
  );
};

export default Tags;
