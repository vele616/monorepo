import React from 'react';
import { Typography, Icon } from '@crocoder-dev/components';

const VisitWebsite = ({ hiddenClassName, className, href }) => (
  <Typography className={className}>
    <a href={href} className="link">
      Visit <span className={hiddenClassName}>company</span> site{' '}
      <span className={hiddenClassName}> </span>
      <Icon className={hiddenClassName} icon="forward" />
    </a>
  </Typography>
);

export default VisitWebsite;
