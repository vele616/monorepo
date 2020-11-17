import React from 'react';
import styled, { css } from 'styled-components';

const Card = styled.div`
  ${(props) =>
    props.large &&
    css`
      flex-direction: column;
      display: flex;
      font-weight: 300;
      line-height: 2;
      width: 195px;
      padding-right: 10%;
      @media only screen and (min-width: 600px) {
        font-size: 20px;
      }
      @media only screen and (max-width: 1200px) {
        padding-right: 5%;
      }
      @media only screen and (max-width: 600px) {
        display: none;
      }
    `}
  ${(props) =>
    !props.large &&
    css`
      @media only screen and (min-width: 600px) {
        display: none;
      }
    `}
`;
const Wrapper = styled.div`
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  min-width: 195px;
  @media only screen and (min-width: 600px) {
    align-items: center;
  }
`;
const CompanyLogo = styled.img`
  position: relative;
  border-radius: 50%;
  width: 125px;
  height: 125px;
  right: 0;
  transform: none;
  margin-bottom: 0px;
  list-style: none;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
const CompanyName = styled.div`
  text-size-adjust: 100%;
  font-weight: 400;
  border-bottom: 1px solid black;
  @media only screen and (min-width: 600px) {
    font-size: 28px;
    text-align: center;
    padding: 30px 0 10px 0;
  }
  @media only screen and (max-width: 600px) {
    font-size: 30px;
    text-align: left;
    padding-top: 3%;
    padding: 20px 0 10px 0;
    width: fit-content;
  }
`;
const LocationAndWebsite = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  position: relative;
  @media only screen and (min-width: 600px) {
    text-align: center;
    align-items: center;
  }
  @media only screen and (max-width: 600px) {
    font-size: 20px;
  }
`;
const Location = styled.div`
  display: flex;
  position: relative;
  line-height: 2;
`;
const WebsiteGoTo = styled.a`
  display: flex;
  position: relative;
  color: black;
  text-decoration: none;
  line-height: 2;
`;
/*const IconGoTo = styled.img`
  width: 15px;
  height: 15px;
  padding-left: 30%;
  padding-bottom: 30%;
`;*/

export const CompanyCard = ({
  logoUrl,
  companyName,
  companyLocation,
  companyWebsite,
  large,
}) => {
  return (
    <Card large={large}>
      <Wrapper>
        <CompanyLogo src={logoUrl}></CompanyLogo>
        <CompanyName>{companyName}</CompanyName>
        <LocationAndWebsite>
          <Location>{companyLocation}</Location>
          <WebsiteGoTo target="_blank" href={companyWebsite}>website</WebsiteGoTo>
        </LocationAndWebsite>
      </Wrapper>
    </Card>
  );
};
