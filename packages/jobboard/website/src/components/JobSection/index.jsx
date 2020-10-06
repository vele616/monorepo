import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background-color: rgba(82, 203, 226, 0.05);
  padding: 42px 0px;
`;
const Wrapper = styled.div`
  max-width: 1600px;
  margin: 0px auto;
`;
const List = styled.div`
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  display: flex;
  width: 100%;
`;
const Label = styled.div`
  font-weight: 600;
  padding-bottom: 21px;
  @media only screen and (min-width: 1200px) {
    box-sizing: border-box;
    width: 60%;
    position: relative;
    left: -61px;
    font-size: 22px;
  }
  @media only screen and (max-width: 1200px) {
    font-size: 20px;
    text-size-adjust: 100%;
    display: flex;
    width: 90%;
    min-width: 600px;
  }
`;

export const JobSection = ({title, children}) => {
  return (
    <Section>
      <Wrapper>
        <List>
          <Label>{title}</Label>
          {children}
        </List>
      </Wrapper>
    </Section>
  );
};
