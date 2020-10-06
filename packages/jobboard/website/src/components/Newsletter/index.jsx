import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  height: 355px;
`;

export const Newsletter = ({children}) => {
  return (
    <Section>
      {children}
    </Section>
  )
};