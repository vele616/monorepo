import React, { useCallback } from 'react';
import { navigate } from '@reach/router';
import { Button, Typography } from '@crocoder-dev/components';

const GoBackLink = ({ children, typographyProps, className }) => {
  const goBack = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <Button onClick={goBack} variant="sneaky" className={className}>
      <Typography {...typographyProps}>{children}</Typography>
    </Button>
  );
};

export default GoBackLink;
