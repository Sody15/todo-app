import React, { FC, useEffect, useState } from 'react';

import { Tag } from '@components';

const TagList: FC<{
  tags?: string[];
  onTagChange: (tags: string[]) => void;
}> = ({ tags, onTagChange }) => {
  const [selectedTags, setSelectedTags] = useState(tags || []);

  const addTag = (text: string) => {
    if (!selectedTags.includes(text)) {
      setSelectedTags((prevTags) => [...prevTags, text]);
    }
  };

  const removeTag = (text: string) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== text));
  };

  useEffect(() => {
    onTagChange(selectedTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  return (
    <>
      {TAGS.map((tag) => (
        <Tag
          key={tag}
          text={tag}
          showText={true}
          selected={tags ? tags.includes(tag) : false}
          onSelect={(t) => addTag(t)}
          onDeSelect={(t) => removeTag(t)}
        />
      ))}
    </>
  );
};

const TAGS = ['work', 'study', 'entertainment', 'family'];

export default TagList;
