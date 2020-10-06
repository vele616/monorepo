import React from 'react';
import styled from "styled-components";

const Section = styled.section`
  height: 500px;
  padding: 0%;
`;
const Wrapper = styled.div`
  max-width: 1600px;
  margin: 0px auto;
  flex-direction: column;
  height: 80px;
`;

export const Hero = ({children}) => {
  return (
    <Section>
      <Wrapper>
        {children}
      </Wrapper>
    </Section>
  )
};