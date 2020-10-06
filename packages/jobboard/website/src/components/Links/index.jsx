import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  height: 80px;
  padding: 0%;
  margin-top: 42px;
`;
const Wrapper = styled.div`
  max-width: 1600px;
  margin: 0px auto;
  flex-direction: row;
  height: 80px;
`;
const ApplyAndShare = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  @media only screen and (max-width: 1200px) {
    padding: 0 5%;
  }
  @media only screen and (min-width: 1200px) {
    padding: 0 10%;
  }
`;
const Apply = styled.button`
  background-color: #fec343;
  color: white;
  height: 40px;
  width: 200px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  right: 50px;
  top: 15px;
  align-self: center;
  @media only screen and (max-width: 600px) {
    margin-bottom: 50px;
  }
`;
const Share = styled.div`
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  position: relative;
  @media only screen and (min-width: 600px) {
    justify-content: space-between;
  }
  @media only screen and (max-width: 600px) {
    justify-content: center;
    align-self: center;
  }
`;
const ShareText = styled.div`
  text-size-adjust: 100%;
  font-weight: 300;
  @media only screen and (min-width: 600px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 24px;
    align-content: center;
  }
`;
const ShareIcons = styled.div`
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  box-sizing: border-box;
`;
const Icons = styled.img`
  border: 1px solid white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  @media only screen and (max-width: 600px) {
    width: 50px;
    height: 50px;
  }
`;

export const Links = () => {
  return (
    <Section>
      <Wrapper>
        <ApplyAndShare>
          <Apply>APPLY FOR THIS POSITION</Apply>
          <Share>
            <ShareText>SHARE THIS POST</ShareText>
            <ShareIcons>
              <Icons></Icons>
              <Icons></Icons>
              <Icons></Icons>
            </ShareIcons>
          </Share>
        </ApplyAndShare>
      </Wrapper>
    </Section>
  );
};
