import React from 'react';
import styled from 'styled-components';
import styles from '@crocoder-dev/components/lib/scss/main.module.scss';
import {
  Typography,
  Section,
} from '@crocoder-dev/components';

const Label = styled(Typography)`
  max-width: ${styles.cardContentMaxWidth};
  margin: auto;

  @media (max-width: ${styles.tabletPortrait}) {
    padding: 30px 15px 0 15px;
  }
`;

const JobSection = ({ title, children, style }) => {
  return (
    <Section backgroundColor="blue_6" removeMobilePadding>
      <Label fontWeight={700} color="gray_2" element="h2">
        {title}
      </Label>
      {children}
    </Section>
  );
};

export default JobSection;
