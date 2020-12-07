import React from 'react';
import { Flexbox, Tag } from '@crocoder-dev/components';

const HashtagList = ({ tags, className, ...other }) => (
  <Flexbox {...other} className={className}>
    {tags &&
      tags
        .split(',')
        .filter((t) => t !== '')
        .slice(0, 3)
        .map((tag) => <Tag key={tag}>{tag}</Tag>)}
  </Flexbox>
);

export default HashtagList;
