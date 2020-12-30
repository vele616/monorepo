import React from 'react';
import { Flexbox, Tag } from '@crocoder-dev/components';

const HashtagList = ({ tags, className, ...other }) => {
  if (!tags || (typeof tags !== 'string' && !Array.isArray(tags))) return null;

  const tagArray = typeof tags === 'string' ? tags.split(',') : tags;

  return (
    <Flexbox {...other} className={className}>
      {tagArray
        .filter((t) => t !== '')
        .slice(0, 3)
        .map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
    </Flexbox>
  );
};

export default HashtagList;
