import React from 'react';
import styled from 'styled-components';
import { Typography } from '@crocoder-dev/components';

const Section = styled.section`
  background-color: rgba(82, 203, 226, 0.05);
  padding: 42px 0px;
`;
const Label = styled(Typography)`
  max-width: 1150px;
  width: 90%;
  margin: auto;
`;

export const JobSection = ({ title, children }) => {
  return (
    <Section>
      <Label fontWeight={700} color="gray_2" element="h2" fontSize={30} >{title}</Label>
      {children}
    </Section>
  );
};
